import { beforeAll, describe, expect, it } from "vitest";
import type { ProductSignals } from "@/lib/productTypes";
import { PRODUCT_FORMATS } from "@/lib/productTypes";
import { collectProductSignals } from "@/pipeline/products/collectors";
import { deriveProductScores, rankFormats, scoreBuyingIntent, scoreCompetition, scoreGapStrength } from "@/pipeline/products/scoring";
import { BIMODAL_SPREAD, MIN_PAID_SAMPLE, recommendPricing, relevantListings } from "@/pipeline/products/pricing";
import { perimenopauseSleepProtocol as brief } from "@/data/products/perimenopause-sleep-protocol";

let signals: ProductSignals;
beforeAll(async () => {
  ({ signals } = await collectProductSignals(brief, { live: false }));
});

const clone = <T,>(x: T): T => structuredClone(x);
const inRange = (v: number, lo: number, hi: number) => v >= lo && v <= hi;

describe("product scorer", () => {
  it("keeps every dimension in 0–10, overall in 0–100, formats ranked best-first", () => {
    const s = deriveProductScores({ signals });
    for (const d of [s.trend, s.buyingIntent, s.competition, s.gapStrength, s.uniqueValue]) expect(inRange(d.value, 0, 10)).toBe(true);
    expect(inRange(s.overall, 0, 100)).toBe(true);
    expect(s.formats).toHaveLength(PRODUCT_FORMATS.length);
    for (let i = 1; i < s.formats.length; i++) expect(s.formats[i - 1].score).toBeGreaterThanOrEqual(s.formats[i].score);
    expect(s.bestFormat).toBe(s.formats[0].format);
  });

  it("is deterministic", () => {
    expect(deriveProductScores({ signals })).toEqual(deriveProductScores({ signals: clone(signals) }));
  });

  it("competition openness falls as Gumroad listings grow (log scale)", () => {
    const few = clone(signals); few.gumroad.total = 10;
    const many = clone(signals); many.gumroad.total = 10_000;
    expect(scoreCompetition(few).value).toBeGreaterThan(scoreCompetition(many).value);
    expect(scoreCompetition(few).rationale).toMatch(/10 Gumroad listings/);
  });

  it("strong, well-reviewed incumbents reduce openness", () => {
    const weak = clone(signals); weak.gumroad.avgRating = 3.2; weak.gumroad.reviewVolume = 2;
    const strong = clone(signals); strong.gumroad.avgRating = 4.9; strong.gumroad.reviewVolume = 5_000;
    expect(scoreCompetition(weak).value).toBeGreaterThan(scoreCompetition(strong).value);
  });

  it("buying intent ignores Amazon (physical-goods) phrases and never penalises an empty Amazon result", () => {
    const base = clone(signals);
    const noAmazon = clone(signals);
    const az = noAmazon.autocomplete.find((a) => a.source === "amazon")!;
    az.suggestions = []; az.clusters = [];
    // Removing Amazon can only drop the small adjacency bonus, never more.
    expect(scoreBuyingIntent(base).value - scoreBuyingIntent(noAmazon).value).toBeLessThanOrEqual(0.5);
    expect(scoreBuyingIntent(noAmazon).rationale).toMatch(/digital-only/);
  });

  it("gap strength rises with high-frequency review complaints", () => {
    const none = clone(signals); none.reviewPains = [];
    const many = clone(signals); many.reviewPains = Array.from({ length: 4 }, (_, i) => ({ source: "amazon-reviews" as const, complaint: `pain ${i}`, frequency: "High" as const }));
    expect(scoreGapStrength(many).value).toBeGreaterThan(scoreGapStrength(none).value);
  });

  it("format ranking follows demand language and only nudges toward the author's hint", () => {
    const sheety = clone(signals);
    sheety.keywords = [{ term: "budget spreadsheet tracker", volume: 1000, growth: 10, competition: "Low" }, { term: "expense tracker excel", volume: 500, growth: 10, competition: "Low" }];
    sheety.autocomplete.forEach((a) => { a.suggestions = ["x spreadsheet", "x tracker template", "x google sheets"]; });
    sheety.gumroad.sample = []; sheety.gumroad.adjacentTags = [];
    const ranked = rankFormats(sheety);
    expect(ranked[0].format).toBe("spreadsheet");
    // A hint for a format with zero demand language should NOT win.
    const hinted = rankFormats(sheety, "prompt-stack");
    expect(hinted[0].format).toBe("spreadsheet");
    expect(hinted.find((f) => f.format === "prompt-stack")!.rationale).toMatch(/author's hint/);
  });

  it("'guide' carries a saturation penalty versus an equally-matched utility format", () => {
    const even = clone(signals);
    even.keywords = []; even.gumroad.sample = []; even.gumroad.adjacentTags = [];
    even.autocomplete.forEach((a) => { a.suggestions = ["x"]; });
    const r = rankFormats(even);
    const guide = r.find((f) => f.format === "guide")!.score;
    const checklist = r.find((f) => f.format === "checklist")!.score;
    expect(guide).toBeLessThan(checklist);
  });
});

describe("pricing anchored to Gumroad", () => {
  const snap = () => clone(signals.gumroad);

  it("returns a charm price within hard bounds and a tier consistent with it", () => {
    const p = recommendPricing(snap(), "spreadsheet", 7);
    expect(p.recommendedUsd).toBeGreaterThanOrEqual(7);
    expect(p.recommendedUsd).toBeLessThanOrEqual(497);
    expect(["tripwire", "core", "premium"]).toContain(p.tier);
    expect(p.anchor).toMatch(/\$/);
  });

  it("a stronger gap earns a higher price, all else equal", () => {
    const lo = recommendPricing(snap(), "spreadsheet", 2).recommendedUsd;
    const hi = recommendPricing(snap(), "spreadsheet", 10).recommendedUsd;
    expect(hi).toBeGreaterThanOrEqual(lo);
  });

  it("REGRESSION: a thin paid sample (one $397 course) is NOT treated as the market median", () => {
    const g = snap();
    g.sample = [{ name: "Big course", priceUsd: 397, currency: "USD", ratingAvg: 5, ratingCount: 2, seller: "x", url: "" }, { name: "Free", priceUsd: 0, currency: "USD", ratingAvg: null, ratingCount: 0, seller: "y", url: "" }];
    g.price = { p25: 397, median: 397, p75: 397, min: 397, max: 397 };
    const p = recommendPricing(g, "template-bundle", 7);
    expect(p.recommendedUsd).toBeLessThan(200);
    expect(p.anchor).toMatch(/only 1 paid relevant listing/);
    expect(MIN_PAID_SAMPLE).toBeGreaterThanOrEqual(3);
  });

  it("caps a first launch relative to the market: 1.6× p75 with no gap, up to 2.6× p75 with a maximal gap", () => {
    const g = snap();
    g.query = "p";
    g.sample = Array.from({ length: 6 }, (_, i) => ({ name: `p${i}`, priceUsd: 10 + i, currency: "USD", ratingAvg: 4, ratingCount: 1, seller: "", url: "" }));
    g.price = { p25: 11, median: 12, p75: 14, min: 10, max: 15 };
    const noGap = recommendPricing(g, "notion-system", 0); // format bias pulls high; cap must hold
    expect(noGap.recommendedUsd).toBeLessThanOrEqual(Math.max(14 * 1.6, 12 * 2) + 5); // + charm slack
    const maxGap = recommendPricing(g, "notion-system", 10);
    expect(maxGap.recommendedUsd).toBeGreaterThanOrEqual(noGap.recommendedUsd);
    expect(maxGap.recommendedUsd).toBeLessThanOrEqual(14 * 2.6 + 5);
    expect(maxGap.anchor).toMatch(/p75|median|band/);
  });

  it("REGRESSION (real data): Kajabi $647 themes matched by the word 'template' must not set the price for an Etsy SEO bundle", () => {
    const L = (name: string, priceUsd: number): import("@/lib/productTypes").GumroadListing => ({ name, priceUsd, currency: "USD", ratingAvg: null, ratingCount: 0, seller: "", url: "" });
    const g = snap();
    g.query = "etsy listing template";
    g.sample = [
      L("My 14 Day AI Digital Product Launch System", 19.9),
      L("KAJABI & Canva | Course Creator Bundle | Navy", 647),
      L("KAJABI & Canva | Course Creator Bundle | Summer", 647),
      L("KAJABI & Canva | Course Creator Bundle | Bronwyn", 647),
      L("5 Pre-Mapped Products. 3-Day Launch Plan", 25),
      L("KAJABI Website Theme | Summer", 397),
      L("THE ULTIMATE KDP MOCKUP VAULT | 200+ Canva Mockups", 10.4),
      L("KAJABI & Canva | Course Creator Bundle | Arwyn", 647),
      L("Etsy Listing SEO Kit for Digital Downloads", 29),
      L("Etsy listing description templates", 17),
      L("Etsy SEO listing title formulas", 22),
    ];
    g.price = { p25: 25, median: 397, p75: 647, min: 10.4, max: 647 };
    // Relevance filter keeps the 'etsy'/'listing' items (≥3), drops Kajabi.
    const rel = relevantListings(g.sample, g.query);
    expect(rel.every((s) => /etsy|listing/i.test(s.name))).toBe(true);
    expect(rel.length).toBeGreaterThanOrEqual(3);
    const p = recommendPricing(g, "template-bundle", 7.6);
    expect(p.recommendedUsd).toBeLessThan(100);
    expect(p.anchor).toMatch(/off-topic listing/);
  });

  it("a genuinely bimodal relevant market anchors to the accessible band (p25), not the median", () => {
    const L = (name: string, priceUsd: number): import("@/lib/productTypes").GumroadListing => ({ name, priceUsd, currency: "USD", ratingAvg: null, ratingCount: 0, seller: "", url: "" });
    const g = snap();
    g.query = "nclex study plan";
    g.sample = [L("nclex plan a", 12), L("nclex plan b", 15), L("nclex plan c", 19), L("nclex plan d", 297), L("nclex plan e", 397), L("nclex plan f", 497)];
    g.price = { p25: 15, median: 158, p75: 397, min: 12, max: 497 }; // spread 26 > BIMODAL_SPREAD
    expect(397 / 15).toBeGreaterThan(BIMODAL_SPREAD);
    const p = recommendPricing(g, "spreadsheet", 6);
    expect(p.anchor).toMatch(/bimodal market/);
    expect(p.recommendedUsd).toBeLessThanOrEqual(47);
  });

  it("with no paid listings prices from format norms", () => {
    const g = snap(); g.sample = []; g.price = { p25: 0, median: 0, p75: 0, min: 0, max: 0 };
    const p = recommendPricing(g, "checklist", 5);
    expect(p.anchor).toMatch(/no paid relevant listings/);
    expect(p.tier).toBe("tripwire");
  });

  it("a silent market is tempered by the author's core price instead of the bare tier midpoint", () => {
    const g = snap(); g.sample = []; g.price = { p25: 0, median: 0, p75: 0, min: 0, max: 0 };
    const bare = recommendPricing(g, "spreadsheet", 6).recommendedUsd; // tier mid ≈ $122 × gap
    const tempered = recommendPricing(g, "spreadsheet", 6, 49).recommendedUsd;
    expect(tempered).toBeLessThan(bare);
    expect(tempered).toBeGreaterThanOrEqual(47); // still a core-tier product
  });

  it("a strong gap can clear a cheap generic market (gap-sensitive cap)", () => {
    const L = (name: string, priceUsd: number): import("@/lib/productTypes").GumroadListing => ({ name, priceUsd, currency: "USD", ratingAvg: null, ratingCount: 0, seller: "", url: "" });
    const g = snap(); g.query = "freelancer tax spreadsheet";
    g.sample = [L("tax tracker a", 5), L("tax tracker b", 7), L("tax tracker c", 7), L("tax tracker d", 9)];
    g.price = { p25: 5, median: 7, p75: 7, min: 5, max: 9 };
    const weak = recommendPricing(g, "spreadsheet", 2).recommendedUsd;
    const strong = recommendPricing(g, "spreadsheet", 10).recommendedUsd;
    expect(strong).toBeGreaterThan(weak);
    expect(strong).toBeLessThanOrEqual(7 * 2.6 + 5); // ceiling 2.6× p75 (+ charm slack)
  });
});
