import { prisma } from "@/lib/db";
import { rotationIndex, utcDateKey } from "@/lib/dates";
import { productSearchText, productToSummary } from "@/lib/productSummary";
import type { ProductReport } from "@/lib/productTypes";

export async function persistProducts(reports: ProductReport[]): Promise<void> {
  for (const r of reports) {
    const data = {
      slug: r.slug,
      title: r.title,
      tagline: r.tagline,
      niche: r.niche,
      emoji: r.emoji,
      seedQuery: r.seedQuery,
      overallScore: r.scores.overall,
      trendScore: r.scores.trend.value,
      intentScore: r.scores.buyingIntent.value,
      competitionScore: r.scores.competition.value,
      gapScore: r.scores.gapStrength.value,
      bestFormat: r.scores.bestFormat,
      priceTier: r.pricing.tier,
      recommendedUsd: r.pricing.recommendedUsd,
      competitorCount: r.signals.gumroad.total,
      hasSingapore: Boolean(r.singaporeAngle),
      gregsPick: r.gregsPick,
      confidence: r.confidence,
      tags: r.tags.join(",").toLowerCase(),
      searchText: productSearchText(r),
      summary: JSON.stringify(productToSummary(r)),
      report: JSON.stringify(r),
    };
    await prisma.product.upsert({ where: { slug: r.slug }, update: data, create: data });
  }
}

/** Same rotation contract as ideas: picks first, day-index, never overwrite. */
export async function assignProductFeatures(days = 14): Promise<void> {
  const rotation = await prisma.product.findMany({
    orderBy: [{ gregsPick: "desc" }, { overallScore: "desc" }, { slug: "asc" }],
    select: { id: true },
  });
  if (!rotation.length) return;
  for (let d = 0; d < days; d++) {
    const date = utcDateKey(new Date(Date.now() + d * 86_400_000));
    const p = rotation[rotationIndex(date, rotation.length)];
    await prisma.productFeature.upsert({ where: { date }, update: {}, create: { date, productId: p.id } });
  }
}
