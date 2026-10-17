import { describe, expect, it } from "vitest";
import { deriveConfidence, deriveScores } from "@/pipeline/scoring";
import { bundleFor, bundleWith } from "./helpers";

const inRange = (v: number, lo: number, hi: number) => v >= lo && v <= hi;

describe("deriveScores", () => {
  it("keeps every dimension within 0-10 and overall within 0-100", async () => {
    const s = deriveScores(await bundleFor());
    for (const d of [s.opportunity, s.problem, s.feasibility, s.whyNow]) {
      expect(inRange(d.value, 0, 10)).toBe(true);
    }
    expect(inRange(s.overall, 0, 100)).toBe(true);
    expect(Number.isInteger(s.overall)).toBe(true);
  });

  it("is deterministic for identical input", async () => {
    const b = await bundleFor();
    expect(deriveScores(b)).toEqual(deriveScores(structuredClone(b)));
  });

  it("stays bounded under extreme metrics", async () => {
    const base = await bundleFor();
    const huge = deriveScores(
      bundleWith(base, {
        metrics: { totalSearchVolume: 1e9, searchGrowthYoY: 5000, trendSlope: 1, painCount: 500, redditMentions: 1e6 },
      }),
    );
    const zero = deriveScores(
      bundleWith(base, {
        metrics: { totalSearchVolume: 0, searchGrowthYoY: -100, trendSlope: -1, painCount: 0, redditMentions: 0 },
      }),
    );
    for (const s of [huge, zero]) {
      expect(s.opportunity.value).toBeLessThanOrEqual(10);
      expect(s.opportunity.value).toBeGreaterThanOrEqual(0);
      expect(s.whyNow.value).toBeLessThanOrEqual(10);
      expect(s.whyNow.value).toBeGreaterThanOrEqual(0);
      expect(s.overall).toBeLessThanOrEqual(100);
      expect(s.overall).toBeGreaterThanOrEqual(0);
      expect(Number.isNaN(s.overall)).toBe(false);
    }
  });

  it("rewards more search volume with a higher opportunity score", async () => {
    const base = await bundleFor();
    const lo = deriveScores(bundleWith(base, { metrics: { totalSearchVolume: 500 } }));
    const hi = deriveScores(bundleWith(base, { metrics: { totalSearchVolume: 500_000 } }));
    expect(hi.opportunity.value).toBeGreaterThan(lo.opportunity.value);
  });

  it("rewards growth and a rising trend in the Why Now score", async () => {
    const base = await bundleFor();
    const cooling = deriveScores(bundleWith(base, { metrics: { searchGrowthYoY: -20, trendSlope: -0.8 } }));
    const surging = deriveScores(bundleWith(base, { metrics: { searchGrowthYoY: 250, trendSlope: 0.9 } }));
    expect(surging.whyNow.value).toBeGreaterThan(cooling.whyNow.value);
    expect(surging.whyNow.rationale).toMatch(/rising/);
    expect(cooling.whyNow.rationale).toMatch(/cooling/);
  });

  it("penalises founder burden in feasibility", async () => {
    const base = await bundleFor();
    const easy = deriveScores(bundleWith(base, { technical: "Low", investment: "Low" }));
    const hard = deriveScores(bundleWith(base, { technical: "High", investment: "High" }));
    expect(easy.feasibility.value).toBeGreaterThan(hard.feasibility.value);
  });

  it("raises the problem score with more pain signals", async () => {
    const base = await bundleFor();
    const few = deriveScores(bundleWith(base, { metrics: { painCount: 1 } }));
    const many = deriveScores(bundleWith(base, { metrics: { painCount: 12 } }));
    expect(many.problem.value).toBeGreaterThan(few.problem.value);
  });

  it("attaches a rationale that cites the underlying numbers", async () => {
    const s = deriveScores(await bundleFor());
    expect(s.opportunity.rationale).toMatch(/searches/);
    expect(s.opportunity.rationale).toMatch(/%/);
    expect(s.problem.rationale).toMatch(/pain signals/);
    expect(s.feasibility.rationale).toMatch(/technical lift/);
  });
});

describe("deriveConfidence", () => {
  it("returns an integer in 0-100", async () => {
    const c = deriveConfidence(await bundleFor());
    expect(Number.isInteger(c)).toBe(true);
    expect(inRange(c, 0, 100)).toBe(true);
  });

  it("drops when fewer sources contributed", async () => {
    const full = await bundleFor();
    const sparse = structuredClone(full);
    sparse.sources = sparse.sources.slice(0, 1);
    expect(deriveConfidence(sparse)).toBeLessThan(deriveConfidence(full));
  });
});
