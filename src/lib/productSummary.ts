import type { ProductReport, ProductSummary } from "@/lib/productTypes";

/** Pure projection for cards/lists; persisted in Product.summary. */
export function productToSummary(r: ProductReport): ProductSummary {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    emoji: r.emoji,
    niche: r.niche,
    tags: r.tags,
    bestFormat: r.scores.bestFormat,
    priceTier: r.pricing.tier,
    recommendedUsd: r.pricing.recommendedUsd,
    competitorCount: r.signals.gumroad.total,
    scores: {
      trend: r.scores.trend,
      buyingIntent: r.scores.buyingIntent,
      competition: r.scores.competition,
      gapStrength: r.scores.gapStrength,
      overall: r.scores.overall,
    },
    gregsPick: r.gregsPick,
  };
}

/** Lowercased haystack for LIKE search. */
export function productSearchText(r: ProductReport): string {
  return [r.title, r.tagline, r.niche, r.seedQuery, r.tags.join(" "), r.gapCloser.theGap, r.positioning.statement, r.singaporeAngle ?? ""]
    .join(" \n ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
