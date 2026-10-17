import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isLive } from "@/lib/env";
import { loadBriefs } from "@/data";
import { loadProductBriefs } from "@/data/products";
import { runAll } from "@/pipeline";
import { assignDailyFeatures, persistReports } from "@/pipeline/persist";
import { runAllProducts } from "@/pipeline/products";
import { assignProductFeatures, persistProducts } from "@/pipeline/products/persist";

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

  const products = await runAllProducts(loadProductBriefs(), { live });
  await persistProducts(products);
  await assignProductFeatures(14);

  // Bust the ISR caches so the new rotation/reports are live immediately
  // instead of waiting for the hourly revalidation window.
  const revalidated = ["/", "/idea-of-the-day", "/idea/[slug]", "/products", "/product-of-the-day", "/product/[slug]"];
  revalidatePath("/");
  revalidatePath("/idea-of-the-day");
  revalidatePath("/idea/[slug]", "page");
  revalidatePath("/products");
  revalidatePath("/product-of-the-day");
  revalidatePath("/product/[slug]", "page");

  return NextResponse.json({
    ok: true,
    mode: live ? "live" : "offline",
    ideas: reports.length,
    gregsPicks: reports.filter((r) => r.gregsPick).length,
    products: products.length,
    productPicks: products.filter((p) => p.gregsPick).length,
    liveSources: [...new Set(products.flatMap((p) => p.sources))].filter((s) => s.endsWith(":live")),
    scheduledDays: 14,
    revalidated,
    ms: Date.now() - started,
  });
}
