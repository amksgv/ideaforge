import type { IdeaReport, IdeaSummary } from "@/lib/types";

/**
 * Lightweight projection of a report for cards and list views. Persisted as
 * its own JSON column so the Idea Database never hydrates full reports.
 * Pure — no DB import — so it's shared by the pipeline, the repo, and tests.
 */
export function reportToSummary(r: IdeaReport): IdeaSummary {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    emoji: r.emoji,
    category: r.category,
    businessModel: r.businessModel,
    tags: r.tags,
    scores: r.scores,
    revenueLabel: r.businessFit.revenuePotential.label,
    founderFit: r.founderFit,
    gregsPick: r.gregsPick,
  };
}
