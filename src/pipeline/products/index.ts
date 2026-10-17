import type { ProductReport } from "@/lib/productTypes";
import type { ProductBrief } from "./brief";
import { collectProductSignals } from "./collectors";
import { deriveProductScores } from "./scoring";
import { synthesizeProduct } from "./synthesize";

export type { ProductBrief } from "./brief";

/** collect → score → synthesize for one product brief. */
export async function runProduct(brief: ProductBrief, ctx: { live: boolean }): Promise<ProductReport> {
  const { signals, sources } = await collectProductSignals(brief, ctx);
  const scores = deriveProductScores({ signals, suggestedFormat: brief.suggestedFormat }, Boolean(brief.singaporeAngle));
  return synthesizeProduct(brief, signals, scores, sources);
}

/** Top ~30% by overall earn the pick badge; explicit overrides respected. */
export function curateProducts(reports: ProductReport[]): ProductReport[] {
  const ranked = [...reports].sort((a, b) => b.scores.overall - a.scores.overall);
  const n = Math.max(1, Math.round(ranked.length * 0.3));
  const picked = new Set(ranked.slice(0, n).map((r) => r.slug));
  for (const r of reports) if (!r.gregsPick) r.gregsPick = picked.has(r.slug);
  return reports;
}

export async function runAllProducts(briefs: ProductBrief[], ctx: { live: boolean }): Promise<ProductReport[]> {
  const out: ProductReport[] = [];
  for (const b of briefs) out.push(await runProduct(b, ctx));
  return curateProducts(out);
}
