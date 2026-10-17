import type { GumroadListing, GumroadSnapshot, PriceTier, Pricing, ProductFormat } from "@/lib/productTypes";
import { PRICE_TIER_RANGES } from "@/lib/productTypes";
import { quantiles } from "./collectors/gumroad";

const STOP = new Set(["the", "and", "for", "with", "your", "template", "templates", "guide", "bundle", "kit", "pack", "system", "planner", "tracker", "checklist"]);
function seedTokens(query: string): string[] {
  return query.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 3 && !STOP.has(t));
}

/**
 * Gumroad's search matches on generic words ("template"), so a sample for
 * "etsy listing template" can be full of $647 Kajabi website themes. Keep only
 * listings whose name shares a *distinctive* seed word; if that leaves too few,
 * fall back to the full sample (the caller decides whether to trust it).
 */
export function relevantListings(sample: GumroadListing[], query: string): GumroadListing[] {
  const toks = seedTokens(query);
  if (!toks.length) return sample;
  const rel = sample.filter((s) => { const n = s.name.toLowerCase(); return toks.some((t) => n.includes(t)); });
  return rel.length >= MIN_PAID_SAMPLE ? rel : sample;
}

/** p75/p25 above this means a bimodal market (cheap printables + $600 courses). */
export const BIMODAL_SPREAD = 6;

// ---------------------------------------------------------------------------
// Pricing anchored to the OBSERVED Gumroad distribution for the seed query,
// nudged by format (a prompt stack is a tripwire; a Notion system is core) and
// gap strength (a sharp gap earns a premium over the median).
// ---------------------------------------------------------------------------

const FORMAT_TIER_BIAS: Record<ProductFormat, PriceTier> = {
  checklist: "tripwire",
  "prompt-stack": "tripwire",
  spreadsheet: "core",
  "template-bundle": "core",
  "notion-system": "core",
  guide: "tripwire",
};

function tierFor(usd: number): PriceTier {
  if (usd < PRICE_TIER_RANGES.core.min) return "tripwire";
  if (usd < PRICE_TIER_RANGES.premium.min) return "core";
  return "premium";
}

const ROUND_POINTS = [7, 9, 12, 17, 19, 27, 29, 37, 47, 59, 67, 79, 97, 127, 147, 197, 247, 297, 397, 497];
function roundToCharm(usd: number): number {
  return ROUND_POINTS.reduce((best, p) => (Math.abs(p - usd) < Math.abs(best - usd) ? p : best), ROUND_POINTS[0]);
}

/** Minimum paid listings before we trust the market median as an anchor. */
export const MIN_PAID_SAMPLE = 3;
const HARD_MIN = 7;
const HARD_MAX = PRICE_TIER_RANGES.premium.max;

/** Parse "$39", "$39/mo", "$1,200" → 39 / 39 / 1200; null if not a price. */
export function parseUsd(label: string | undefined): number | null {
  if (!label) return null;
  const m = label.replace(/,/g, "").match(/\$\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

export function recommendPricing(
  gumroad: GumroadSnapshot,
  bestFormat: ProductFormat,
  gapStrength: number,
  /** The brief author's core-tier price, used to temper format norms when the market is silent. */
  authorCoreUsd?: number | null,
): Pricing {
  // 1) Relevance-filter the sample, 2) recompute quantiles on paid items only.
  const relevant = relevantListings(gumroad.sample, gumroad.query);
  const paid = relevant.map((s) => s.priceUsd).filter((x) => x > 0);
  const paidCount = paid.length;
  const { median, p25, p75 } = paidCount ? quantiles(paid) : gumroad.price;
  const marketTrusted = median > 0 && paidCount >= MIN_PAID_SAMPLE;
  const filteredOut = gumroad.sample.length - relevant.length;
  // 3) Bimodal market (cheap printables next to $600 courses): a first launch
  //    should anchor to the accessible band (p25), not a meaningless median.
  const bimodal = marketTrusted && p25 > 0 && p75 / p25 > BIMODAL_SPREAD;
  const anchorPrice = bimodal ? p25 : median;

  const bias = FORMAT_TIER_BIAS[bestFormat];
  const biasRange = PRICE_TIER_RANGES[bias];

  const tierMid = (biasRange.min + biasRange.max) / 2;
  // With no (or a too-thin) paid sample there is no market to anchor to. Use
  // the format's tier norm, tempered by the author's own core price when given
  // — a bare tier midpoint ($122 for "core") is not a recommendation for an
  // uncontested $1-listing niche.
  const silentMarketBase =
    authorCoreUsd && authorCoreUsd > 0 ? (tierMid + authorCoreUsd) / 2 : tierMid;
  // The market sets the anchor (70%); the format's natural tier nudges it (30%).
  let base = marketTrusted ? anchorPrice * 0.7 + tierMid * 0.3 : silentMarketBase;

  // A strong, unaddressed gap earns a premium up to +35%; a weak one sits at/below median.
  const gap01 = Math.max(0, Math.min(10, gapStrength)) / 10;
  const gapMult = 0.85 + gap01 * 0.5;
  base *= gapMult;

  // Cap a first launch relative to the anchor band — but let a genuinely
  // differentiated product (strong gap) clear a cheap, generic market:
  // ceiling multiplier runs 1.6× (no gap) → 2.6× (gap 10) of p75.
  if (marketTrusted) {
    // Bimodal: the median is an artefact of two unrelated price bands, so it
    // must NOT act as a floor — the ceiling is a multiple of the accessible band.
    const ceil = bimodal ? p25 * (2.5 + gap01 * 1.5) : Math.max(p75 * (1.6 + gap01), median * 2);
    base = Math.min(base, ceil);
  }

  const recommended = Math.min(HARD_MAX, Math.max(HARD_MIN, roundToCharm(base)));
  const tier = tierFor(recommended);

  const relNote = filteredOut > 0 ? ` (${filteredOut} off-topic listing${filteredOut === 1 ? "" : "s"} excluded)` : "";
  const where = !marketTrusted
    ? paidCount === 0
      ? `no paid relevant listings in the sample${relNote} — priced from format norms`
      : `only ${paidCount} paid relevant listing${paidCount === 1 ? "" : "s"}${relNote} (median $${median} not trusted) — priced from format norms`
    : bimodal
      ? `bimodal market${relNote}: p25 $${p25} vs p75 $${p75} — anchored to the accessible band for a first launch`
      : recommended < p25
        ? `below the market p25 ($${p25})${relNote} — an entry/tripwire play`
        : recommended <= p75
          ? `inside the market's p25–p75 band ($${p25}–$${p75}; median $${median})${relNote}`
          : `above the p75 ($${p75})${relNote} — justified only by the gap and accelerators`;

  return {
    tier,
    recommendedUsd: recommended,
    anchor: `${PRICE_TIER_RANGES[tier].label}; ${where}.`,
  };
}
