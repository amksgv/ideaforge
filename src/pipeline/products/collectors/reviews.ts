import type { ReviewPain } from "@/lib/productTypes";
import type { ProductBrief } from "@/pipeline/products/brief";

// ---------------------------------------------------------------------------
// Reilly Engine 2: Amazon 1–3★ review mining.
//
// There is no public Amazon reviews API and scraping product pages is both
// fragile and against ToS, so this collector is FIXTURE-BACKED. The report
// surfaces a manual step (see manualChecks) and this file is the extension
// point: plug in an approved data provider (e.g. a licensed reviews dataset or
// the Product Advertising API where permitted) by implementing `live()`.
// ---------------------------------------------------------------------------

async function live(_brief: ProductBrief): Promise<ReviewPain[] | null> {
  return null; // intentionally unimplemented — see header
}

export async function collectReviewPains(
  brief: ProductBrief,
  ctx: { live: boolean },
): Promise<ReviewPain[]> {
  if (ctx.live) {
    const r = await live(brief);
    if (r) return r;
  }
  return brief.fixtures.reviewPains;
}

/** Manual validation steps surfaced on every product report. */
export function manualChecksFor(brief: ProductBrief): string[] {
  const q = brief.seedQuery;
  return [
    `Etsy: type "${q}" into Etsy search and append a–z one letter at a time; note every autocomplete phrase (Etsy blocks automated access).`,
    `Amazon: open the 3–5 best-selling books/tools for "${q}", read 1–3★ reviews, and list what buyers say is missing, confusing, or over-promised.`,
    `Gumroad: open gumroad.com/discover?query=${encodeURIComponent(q)} and eyeball the top 10 — are covers, titles and reviews weak? That's your opening.`,
  ];
}
