import type { IdeaReport } from "@/lib/types";

/**
 * Human-in-the-loop curation layer. Mirrors ideabrowser's "Greg's Pick":
 * promote the strongest ideas. Explicit per-brief overrides are respected;
 * otherwise the top ~30% by overall score earn the badge.
 */
export function curate(reports: IdeaReport[]): IdeaReport[] {
  const ranked = [...reports].sort((a, b) => b.scores.overall - a.scores.overall);
  const pickCount = Math.max(1, Math.round(ranked.length * 0.3));
  const picked = new Set(ranked.slice(0, pickCount).map((r) => r.slug));
  for (const r of reports) {
    if (!r.gregsPick) r.gregsPick = picked.has(r.slug);
  }
  return reports;
}
