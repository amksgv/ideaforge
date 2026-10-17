import { describe, expect, it } from "vitest";
import { aggregate } from "@/pipeline/aggregate";
import { brief } from "./helpers";

describe("aggregate (offline mode)", () => {
  it("runs every collector and reports fixture sources", async () => {
    const b = await aggregate(brief(), { live: false });
    expect(b.sources.sort()).toEqual(
      ["facebook:fixture", "google_trends:fixture", "keywords:fixture", "reddit:fixture", "youtube:fixture"].sort(),
    );
  });

  it("merges community signals from reddit, facebook and youtube in that order", async () => {
    const b = await aggregate(brief(), { live: false });
    const platforms = b.communitySignals.map((c) => c.platform);
    const first = platforms.indexOf("reddit");
    const fb = platforms.indexOf("facebook");
    expect(first).toBeGreaterThanOrEqual(0);
    if (fb >= 0) expect(fb).toBeGreaterThan(first);
    expect(b.communitySignals.length).toBe(brief().signals.communities.length);
  });

  it("includes a signal from every source plus brief extras", async () => {
    const src = brief();
    const b = await aggregate(src, { live: false });
    const sources = new Set(b.signals.map((s) => s.source));
    for (const s of ["google_trends", "keywords", "reddit", "youtube", "facebook"]) {
      expect(sources.has(s as never)).toBe(true);
    }
    // prymer carries an X extra signal
    expect(sources.has("x")).toBe(src.signals.extraSignals!.some((e) => e.source === "x"));
    for (const s of b.signals) {
      expect(s.confidence).toBeGreaterThanOrEqual(0);
      expect(s.confidence).toBeLessThanOrEqual(100);
    }
  });

  it("derives metrics that match the brief's signal hints", async () => {
    const src = brief();
    const b = await aggregate(src, { live: false });
    const expectedVolume = src.signals.keywords.reduce((a, k) => a + k.volume, 0);
    expect(b.metrics.totalSearchVolume).toBe(expectedVolume);
    expect(b.metrics.searchGrowthYoY).toBe(src.signals.searchGrowthYoY);
    expect(b.metrics.redditMentions).toBe(src.signals.redditMentionsPerMonth);
    expect(b.metrics.youtubeVideos).toBe(src.signals.youtubeVideosTracked);
    const expectedPains = src.signals.communities.reduce((a, c) => a + c.keyPains.length, 0);
    expect(b.metrics.painCount).toBe(expectedPains);
    expect(b.metrics.communityReach).toBe(src.signals.communities.reduce((a, c) => a + c.reach, 0));
  });

  it("produces a 12-point trend with YYYY-MM labels and a positive slope for a rising shape", async () => {
    const b = await aggregate(brief(), { live: false });
    expect(b.trend).toHaveLength(12);
    for (const p of b.trend) expect(p.period).toMatch(/^\d{4}-\d{2}$/);
    expect(b.metrics.trendSlope).toBeGreaterThan(0);
    expect(b.metrics.trendSlope).toBeLessThanOrEqual(1);
  });

  it("reports a negative slope for a falling trend shape", async () => {
    const falling = brief();
    falling.signals.trendShape = [90, 85, 80, 72, 66, 60, 55, 50, 44, 40, 35, 30];
    const b = await aggregate(falling, { live: false });
    expect(b.metrics.trendSlope).toBeLessThan(0);
  });

  it("handles a brief with no communities or extra signals", async () => {
    const bare = brief();
    bare.signals.communities = [];
    bare.signals.extraSignals = undefined;
    const b = await aggregate(bare, { live: false });
    expect(b.communitySignals).toEqual([]);
    expect(b.metrics.painCount).toBe(0);
    expect(b.metrics.communityReach).toBe(0);
    expect(b.signals.length).toBeGreaterThan(0);
  });

  it("falls back to fixtures in live mode when no API keys are present", async () => {
    const b = await aggregate(brief(), { live: true });
    expect(b.sources.every((s) => s.endsWith(":fixture"))).toBe(true);
  });
});
