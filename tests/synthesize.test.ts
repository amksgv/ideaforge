import { describe, expect, it } from "vitest";
import { brief, reportFor } from "./helpers";

describe("synthesizeOffline", () => {
  it("carries searchGrowthYoY from the bundle so both UI cards agree", async () => {
    const src = brief();
    const r = await reportFor(src);
    expect(r.searchGrowthYoY).toBe(src.signals.searchGrowthYoY);
    const trendsSignal = r.proofSignals.signals.find((s) => s.source === "google_trends");
    expect(trendsSignal?.growth).toBe(r.searchGrowthYoY);
  });

  it.each([
    [8, 8, "Category King"],
    [8, 3, "Tech Novelty"],
    [3, 8, "Commodity Play"],
    [3, 3, "Low Impact"],
    [6, 6, "Category King"], // boundary: >= 6 counts as high
    [5, 6, "Commodity Play"],
  ])("uniqueness %i / value %i → %s", async (u, v, quadrant) => {
    const src = brief();
    src.marketMatrix = { uniqueness: u, value: v, rationale: "t" };
    const r = await reportFor(src);
    expect(r.frameworks.marketMatrix.quadrant).toBe(quadrant);
  });

  it("uses the brief's explicit value-equation score when provided, else derives one", async () => {
    const explicit = brief();
    explicit.valueEquation.score = 7.5;
    expect((await reportFor(explicit)).frameworks.valueEquation.score).toBe(7.5);

    const derived = brief();
    delete derived.valueEquation.score;
    const s = (await reportFor(derived)).frameworks.valueEquation.score;
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(10);
  });

  it("writes a value-ladder note that walks lead → core → backend", async () => {
    const r = await reportFor();
    const note = r.frameworks.valueLadderNote;
    expect(note).toMatch(/Ascend buyers/);
    const lead = r.offer.find((o) => o.kind === "lead")!;
    const backend = r.offer.find((o) => o.kind === "backend")!;
    expect(note.indexOf(lead.name)).toBeLessThan(note.indexOf(backend.name));
  });

  it("stamps generatedAt as ISO and preserves slug/id identity", async () => {
    const r = await reportFor();
    expect(() => new Date(r.generatedAt).toISOString()).not.toThrow();
    expect(r.id).toBe(r.slug);
    expect(r.slug).toBe(brief().slug);
  });
});
