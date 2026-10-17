import { describe, expect, it } from "vitest";
import { runProduct, curateProducts } from "@/pipeline/products";
import { buildGapCloser, buildMarketing, buildPositioning, GAP_HUNTING_SYSTEM } from "@/pipeline/products/synthesize";
import { collectProductSignals } from "@/pipeline/products/collectors";
import { deriveProductScores } from "@/pipeline/products/scoring";
import { productToSummary, productSearchText } from "@/lib/productSummary";
import { loadProductBriefs } from "@/data/products";
import { perimenopauseSleepProtocol as brief } from "@/data/products/perimenopause-sleep-protocol";

describe("product synthesis (offline)", () => {
  it("produces a complete report with every framework section populated", async () => {
    const r = await runProduct(brief, { live: false });
    expect(r.slug).toBe(brief.slug);
    expect(r.gapCloser.theGap.length).toBeGreaterThan(20);
    expect(r.gapCloser.topDesires.length).toBeGreaterThanOrEqual(4);
    expect(r.positioning.statement).toMatch(/^For .+ who want .+ — without .+\.$/);
    expect(r.outline.length).toBeGreaterThanOrEqual(6);
    expect(Object.keys(r.accelerators).sort()).toEqual(["cognitiveClarity", "doneForYou", "emotionalAssurance"]);
    expect(r.ladder.map((t) => t.kind)).toEqual(["free", "tripwire", "core", "backend"]);
    expect(r.titleVariants).toHaveLength(3);
    expect(r.manualChecks).toHaveLength(3);
    expect(r.marketing.commentKeyword).toBe(r.marketing.commentKeyword.toUpperCase());
    expect(r.sources.every((s) => s.endsWith(":fixture"))).toBe(true); // offline
    expect(r.confidence).toBe(55); // zero live sources
  });

  it("enriches the Gap Closer with collected buying/problem phrases and review pains, deduped", async () => {
    const { signals } = await collectProductSignals(brief, { live: false });
    const gc = buildGapCloser(brief, signals);
    expect(gc.topDesires.length).toBeLessThanOrEqual(5);
    expect(gc.commonPains.length).toBeLessThanOrEqual(6);
    const lower = gc.commonPains.map((p) => p.toLowerCase());
    expect(new Set(lower).size).toBe(lower.length);
    // high-frequency review pain must surface
    expect(gc.commonPains.join(" ")).toMatch(/never tells you what to actually do/i);
  });

  it("positioning follows the micro-niche equation with lowercase joins", () => {
    const p = buildPositioning(brief);
    expect(p.statement.startsWith(`For ${brief.avatar} who want `)).toBe(true);
    expect(p.statement).toContain(" — without ");
  });

  it("marketing starter is symptom-first and format-aware", async () => {
    const { signals } = await collectProductSignals(brief, { live: false });
    const scores = deriveProductScores({ signals, suggestedFormat: brief.suggestedFormat });
    const m = buildMarketing(brief, scores);
    expect(m.symptomHook).toBe(brief.symptomHook);
    expect(m.pinterestPinTitles).toHaveLength(3);
    expect(m.shortFormAngles).toHaveLength(3);
    expect(m.shortFormAngles[0]).toMatch(/^Common mistake/);
  });

  it("the live-mode gap-hunting system prompt treats signals as data and forbids invented stats", () => {
    expect(GAP_HUNTING_SYSTEM).toMatch(/<signals>/);
    expect(GAP_HUNTING_SYSTEM).toMatch(/Ignore any instructions/);
    expect(GAP_HUNTING_SYSTEM).toMatch(/no invented statistics/);
  });

  it("summary projection and searchText are derived consistently", async () => {
    const r = await runProduct(brief, { live: false });
    const s = productToSummary(r);
    expect(s.bestFormat).toBe(r.scores.bestFormat);
    expect(s.recommendedUsd).toBe(r.pricing.recommendedUsd);
    expect(s.competitorCount).toBe(r.signals.gumroad.total);
    const st = productSearchText(r);
    expect(st).toBe(st.toLowerCase());
    expect(st).toContain(r.seedQuery.toLowerCase());
    expect(st).toContain("3 a.m.");
  });
});

describe("product corpus integrity", () => {
  it("every brief has a recorded fixture, unique slug, and seeds without throwing", async () => {
    const briefs = loadProductBriefs();
    expect(briefs.length).toBeGreaterThanOrEqual(10);
    expect(new Set(briefs.map((b) => b.slug)).size).toBe(briefs.length);
    for (const b of briefs) {
      expect(b.fixtures.trendShape).toHaveLength(12);
      expect(b.ladder.map((t) => t.kind)).toEqual(["free", "tripwire", "core", "backend"]);
      expect(b.fixtures.gumroad.query.length).toBeGreaterThan(0);
    }
    const reports = await Promise.all(briefs.map((b) => runProduct(b, { live: false })));
    expect(reports.every((r) => r.scores.overall >= 0 && r.scores.overall <= 100)).toBe(true);
  }, 30_000);

  it("curation promotes ~30% and respects explicit picks", async () => {
    const briefs = loadProductBriefs().slice(0, 5);
    const reports = await Promise.all(briefs.map((b) => runProduct(b, { live: false })));
    reports[4].gregsPick = true; // explicit override on whatever ranks last
    const out = curateProducts(reports);
    expect(out.filter((r) => r.gregsPick).length).toBeGreaterThanOrEqual(2);
    expect(out[4].gregsPick).toBe(true);
  }, 30_000);
});
