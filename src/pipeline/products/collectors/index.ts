import type { ProductSignals } from "@/lib/productTypes";
import type { ProductBrief } from "@/pipeline/products/brief";
import { shapeToTrend } from "@/pipeline/collectors/util";
import { collectAutocomplete } from "./autocomplete";
import { collectGumroad } from "./gumroad";
import { collectReviewPains } from "./reviews";

export interface ProductCollection {
  signals: ProductSignals;
  sources: string[];
}

/** Fan out to every product collector and fold into one ProductSignals. */
export async function collectProductSignals(
  brief: ProductBrief,
  ctx: { live: boolean },
): Promise<ProductCollection> {
  const [autocomplete, gumroad, reviewPains] = await Promise.all([
    collectAutocomplete(brief, ctx),
    collectGumroad(brief, ctx),
    collectReviewPains(brief, ctx),
  ]);

  const sources = [
    ...autocomplete.map((a) => `${a.source}-autocomplete:${a.live ? "live" : "fixture"}`),
    `gumroad:${gumroad.live ? "live" : "fixture"}`,
    `amazon-reviews:fixture`,
    `google_trends:fixture`,
    `keywords:fixture`,
  ];

  return {
    signals: {
      autocomplete,
      gumroad,
      reviewPains,
      keywords: brief.fixtures.keywords,
      trend: shapeToTrend(brief.fixtures.trendShape),
      searchGrowthYoY: brief.fixtures.searchGrowthYoY,
      communityPains: brief.fixtures.communityPains,
    },
    sources,
  };
}
