import { describe, expect, it } from "vitest";
import { GumroadResponseSchema, parseGumroad, quantiles } from "@/pipeline/products/collectors/gumroad";
import {
  classifyIntent,
  clusterSuggestions,
  intentDensity,
  normalizeSuggestions,
} from "@/pipeline/products/collectors/autocompleteCluster";
import { seedsFor } from "@/pipeline/products/collectors/autocomplete";
import { manualChecksFor } from "@/pipeline/products/collectors/reviews";
import { perimenopauseSleepProtocol as brief } from "@/data/products/perimenopause-sleep-protocol";

describe("Gumroad response parsing (undocumented endpoint, schema-guarded)", () => {
  const raw = {
    total: 745,
    tags_data: [{ key: "notion second brain", doc_count: 400 }, { key: "notion template", doc_count: 300 }, { key: "pkm", doc_count: 50 }],
    products: [
      { name: "A", price_cents: 1900, currency_code: "usd", ratings: { count: 10, average: 4.8 }, seller: { name: "s1" }, url: "https://x/a" },
      { name: "B", price_cents: 3000, currency_code: "eur", ratings: { count: 0, average: null }, seller: { name: "s2" }, url: "https://x/b" },
      { name: "C", price_cents: 0, currency_code: "usd", ratings: { count: 3, average: 5 } },
      { name: "D", price_cents: 5900, currency_code: "usd" },
    ],
  };

  it("accepts the real shape and tolerates missing optional fields", () => {
    expect(GumroadResponseSchema.safeParse(raw).success).toBe(true);
    expect(GumroadResponseSchema.safeParse({ total: 0 }).success).toBe(true); // empty market
    expect(GumroadResponseSchema.safeParse({ status: "error" }).success).toBe(false); // the no-XHR-header response
  });

  it("normalizes prices to USD, excludes free items from quantiles, and drops the seed tag", () => {
    const snap = parseGumroad("notion second brain", GumroadResponseSchema.parse(raw), true);
    expect(snap.total).toBe(745);
    expect(snap.sample).toHaveLength(4);
    expect(snap.sample[1].priceUsd).toBeCloseTo(32.4, 1); // 30 EUR × 1.08
    expect(snap.price.min).toBe(19);
    expect(snap.price.max).toBe(59);
    expect(snap.price.median).toBeGreaterThan(19);
    expect(snap.avgRating).toBe(4.9); // mean of rated items only (4.8, 5)
    expect(snap.reviewVolume).toBe(13);
    expect(snap.adjacentTags.map((t) => t.tag)).toEqual(["notion template", "pkm"]);
    expect(snap.live).toBe(true);
  });

  it("quantiles handle empty, single and even-length inputs", () => {
    expect(quantiles([])).toEqual({ p25: 0, median: 0, p75: 0, min: 0, max: 0 });
    expect(quantiles([10])).toEqual({ p25: 10, median: 10, p75: 10, min: 10, max: 10 });
    const q = quantiles([10, 20, 30, 40]);
    expect(q.min).toBe(10); expect(q.max).toBe(40); expect(q.median).toBeGreaterThanOrEqual(20);
  });
});

describe("autocomplete intent + clustering", () => {
  it("classifies buying vs problem vs informational", () => {
    expect(classifyIntent("perimenopause sleep tracker printable")).toBe("buying");
    expect(classifyIntent("why can't i sleep perimenopause")).toBe("problem");
    expect(classifyIntent("perimenopause sleep apnea")).toBe("informational");
  });

  it("intent density is 0–1 and 0 for empty", () => {
    expect(intentDensity([])).toBe(0);
    const d = intentDensity(["x template", "how to x", "x history"]);
    expect(d).toBeCloseTo(2 / 3, 5);
  });

  it("REGRESSION: strips the seed only at a word boundary ('sleepiness' ≠ cluster 'iness')", () => {
    const clusters = clusterSuggestions("perimenopause sleep", ["perimenopause sleepiness", "perimenopause sleep aid", "perimenopause sleep issues"]);
    const labels = clusters.map((c) => c.label);
    expect(labels).not.toContain("iness");
    expect(labels).toContain("perimenopause sleepiness");
    expect(labels).toContain("aid");
  });

  it("clusters lead-word variants and marks the exact seed", () => {
    const clusters = clusterSuggestions("notion template", ["notion template", "best notion template", "free notion template", "notion template for students"]);
    const byLabel = Object.fromEntries(clusters.map((c) => [c.label, c]));
    expect(byLabel["(exact)"]).toBeTruthy();
    expect(byLabel["best"]).toBeTruthy();
    // Every phrase contains "template", so each cluster carries buying intent.
    expect(byLabel["for students"].intent).toBe("buying");
    expect(byLabel["free"].intent).toBe("buying");
    // A cluster with no intent words at all is informational.
    const plain = clusterSuggestions("perimenopause sleep", ["perimenopause sleep apnea", "perimenopause sleep hormones"]);
    expect(plain.every((c) => c.intent === "informational")).toBe(true);
  });

  it("normalizes: dedupes, lowercases, drops the seed itself, caps length", () => {
    const out = normalizeSuggestions("X", ["X", "x", "X  for  y", "x for y", "z"], 2);
    expect(out).toEqual(["x for y", "z"]);
  });

  it("builds a bounded, deduped seed set per brief", () => {
    const seeds = seedsFor(brief);
    expect(seeds[0]).toBe(brief.seedQuery);
    expect(seeds.length).toBeLessThanOrEqual(6);
    expect(new Set(seeds).size).toBe(seeds.length);
  });
});

describe("manual checks for fixture-backed sources", () => {
  it("names Etsy, Amazon and Gumroad with the seed query embedded", () => {
    const m = manualChecksFor(brief);
    expect(m).toHaveLength(3);
    expect(m[0]).toMatch(/Etsy/); expect(m[1]).toMatch(/Amazon/); expect(m[2]).toMatch(/Gumroad/);
    expect(m.join(" ")).toContain(brief.seedQuery);
  });
});
