import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isLive } from "@/lib/env";
import { loadBriefs } from "@/data";
import { runAll } from "@/pipeline";
import { assignDailyFeatures, persistReports } from "@/pipeline/persist";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Daily job: re-run the pipeline and extend the Idea-of-the-Day schedule.
 *
 * Protected by CRON_SECRET. Trigger it once a day from Vercel Cron
 * (`vercel.json` → "crons"), GitHub Actions, or any scheduler:
 *
 *   curl -H "Authorization: Bearer $CRON_SECRET" https://your.app/api/cron/daily
 *
 * Returns 503 when CRON_SECRET is unset so the endpoint is never silently open.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured; cron endpoint disabled." },
      { status: 503 },
    );
  }
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const live = isLive();
  const reports = await runAll(loadBriefs(), { live });
  await persistReports(reports);
  await assignDailyFeatures(14);

  // Bust the ISR caches so the new rotation/reports are live immediately
  // instead of waiting for the hourly revalidation window.
  revalidatePath("/");
  revalidatePath("/idea-of-the-day");
  revalidatePath("/idea/[slug]", "page");

  return NextResponse.json({
    ok: true,
    mode: live ? "live" : "offline",
    ideas: reports.length,
    gregsPicks: reports.filter((r) => r.gregsPick).length,
    scheduledDays: 14,
    revalidated: ["/", "/idea-of-the-day", "/idea/[slug]"],
    ms: Date.now() - started,
  });
}
