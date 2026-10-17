import { NextRequest, NextResponse } from "next/server";
import { getAllReports, reportToSummary } from "@/lib/repo";
import { getAllProductReports } from "@/lib/productRepo";
import { productToSummary } from "@/lib/productSummary";
import type { Level } from "@/lib/types";
import { compareByConvergence, convergenceFit, hasConvergence } from "@/lib/convergence";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { GenerateBodySchema, badRequest, readJson } from "@/lib/validation";

export const dynamic = "force-dynamic";

const RANK: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };

/**
 * "Idea Generator" — ranks the catalogue against a founder profile:
 * founder-fit (skills/capital, ideabrowser-style) PLUS Beau Norton's 5-Part
 * Convergence (skills · struggles · hobbies · vocation · passions), which
 * rewards subjects the founder has lived. Returns idea matches and, when a
 * convergence is given, the best-fitting digital-product briefs too.
 */
export async function POST(req: NextRequest) {
  const rl = rateLimit(`generate:${clientIp(req)}`, { limit: 30, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const body = await readJson(req);
  if (body === null) return NextResponse.json({ error: "Invalid or oversized JSON body" }, { status: 400 });
  const parsed = GenerateBodySchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error);

  const { technical: tech, capital: cap, categories: cats, convergence } = parsed.data;
  const useConv = hasConvergence(convergence);
  const [reports, products] = await Promise.all([getAllReports(), useConv ? getAllProductReports() : Promise.resolve([])]);

  const matches = reports
    .map((r) => {
      let fit = r.scores.overall;
      const reasons: string[] = [];

      if (RANK[r.founderFit.technicalSkill] <= RANK[tech]) { fit += 12; reasons.push("matches your technical level"); }
      else { fit -= 18; reasons.push(`needs ${r.founderFit.technicalSkill.toLowerCase()} technical skill`); }

      if (RANK[r.founderFit.investment] <= RANK[cap]) { fit += 12; reasons.push("fits your capital"); }
      else { fit -= 18; reasons.push(`needs ${r.founderFit.investment.toLowerCase()} capital`); }

      if (cats.length && cats.includes(r.category)) { fit += 15; reasons.push(`in ${r.category}`); }

      let convergenceMatch: ReturnType<typeof convergenceFit> | undefined;
      if (useConv) {
        convergenceMatch = convergenceFit(
          convergence,
          [r.title, r.tagline, r.tags.join(" "), r.category, r.frameworks.acp.audience, r.narrative].join(" "),
        );
        if (convergenceMatch.bonus > 0) {
          fit += convergenceMatch.bonus;
          reasons.unshift(`in your zone of genius (${convergenceMatch.matched.slice(0, 3).join(", ")})`);
        }
      }

      return {
        idea: reportToSummary(r),
        fitScore: Math.max(0, Math.min(100, Math.round(fit))),
        reason: reasons.slice(0, 2).join(" · "),
        convergence: convergenceMatch,
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore);

  const productMatches = useConv
    ? products
        .map((p) => {
          const m = convergenceFit(
            convergence,
            [p.title, p.tagline, p.tags.join(" "), p.niche, p.positioning.avatar, p.gapCloser.theGap].join(" "),
          );
          const fitScore = Math.max(0, Math.min(100, Math.round(p.scores.overall + m.bonus)));
          return { product: productToSummary(p), fitScore, reason: m.matched.length ? `matches ${m.matched.slice(0, 3).join(", ")}` : "scored on opportunity only", convergence: m };
        })
        // The section is "products in your zone of genius": anything that actually
        // matches the convergence lists first; within each group, by fit score.
        .sort(compareByConvergence)
        .slice(0, 6)
    : [];

  return NextResponse.json({ matches, productMatches, usedConvergence: useConv });
}
