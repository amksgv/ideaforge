import { NextRequest, NextResponse } from "next/server";
import { getAllReports, reportToSummary } from "@/lib/repo";
import type { Level } from "@/lib/types";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { GenerateBodySchema, badRequest, readJson } from "@/lib/validation";

export const dynamic = "force-dynamic";

const RANK: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };

/**
 * "Idea Generator" — ranks the catalog against a founder profile, mirroring
 * ideabrowser's founder-fit matching (filter by skills/capital/time).
 */
export async function POST(req: NextRequest) {
  const rl = rateLimit(`generate:${clientIp(req)}`, { limit: 30, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const body = await readJson(req);
  if (body === null) {
    return NextResponse.json({ error: "Invalid or oversized JSON body" }, { status: 400 });
  }
  const parsed = GenerateBodySchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error);

  const { technical: tech, capital: cap, categories: cats } = parsed.data;
  const reports = await getAllReports();

  const ranked = reports
    .map((r) => {
      let fit = r.scores.overall; // base on quality
      const reasons: string[] = [];

      if (RANK[r.founderFit.technicalSkill] <= RANK[tech]) {
        fit += 12;
        reasons.push("matches your technical level");
      } else {
        fit -= 18;
        reasons.push(`needs ${r.founderFit.technicalSkill.toLowerCase()} technical skill`);
      }

      if (RANK[r.founderFit.investment] <= RANK[cap]) {
        fit += 12;
        reasons.push("fits your capital");
      } else {
        fit -= 18;
        reasons.push(`needs ${r.founderFit.investment.toLowerCase()} capital`);
      }

      if (cats.length && cats.includes(r.category)) {
        fit += 15;
        reasons.push(`in ${r.category}`);
      }

      return {
        idea: reportToSummary(r),
        fitScore: Math.max(0, Math.min(100, Math.round(fit))),
        reason: reasons.slice(0, 2).join(" · "),
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore);

  return NextResponse.json({ matches: ranked });
}
