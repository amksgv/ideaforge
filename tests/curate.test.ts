import { describe, expect, it } from "vitest";
import { curate } from "@/pipeline/curate";
import { fakeReport } from "./helpers";

describe("curate", () => {
  it("promotes roughly the top 30% by overall score", () => {
    const reports = Array.from({ length: 10 }, (_, i) => fakeReport(`i${i}`, 50 + i * 5));
    const out = curate(reports);
    const picked = out.filter((r) => r.gregsPick).map((r) => r.slug).sort();
    expect(picked).toEqual(["i7", "i8", "i9"]); // 95, 90, 85
  });

  it("always promotes at least one idea", () => {
    const out = curate([fakeReport("only", 40)]);
    expect(out.filter((r) => r.gregsPick)).toHaveLength(1);
  });

  it("respects explicit gregsPick overrides even for low scorers", () => {
    const reports = [
      fakeReport("low-but-chosen", 30, true),
      fakeReport("a", 90),
      fakeReport("b", 85),
      fakeReport("c", 80),
      fakeReport("d", 70),
    ];
    const out = curate(reports);
    expect(out.find((r) => r.slug === "low-but-chosen")!.gregsPick).toBe(true);
    // top 30% of 5 → round(1.5) = 2 → a, b
    expect(out.find((r) => r.slug === "a")!.gregsPick).toBe(true);
    expect(out.find((r) => r.slug === "b")!.gregsPick).toBe(true);
    expect(out.find((r) => r.slug === "c")!.gregsPick).toBe(false);
  });

  it("does not reorder the input array", () => {
    const reports = [fakeReport("z", 10), fakeReport("y", 99), fakeReport("x", 50)];
    const out = curate(reports);
    expect(out.map((r) => r.slug)).toEqual(["z", "y", "x"]);
  });

  it("returns an empty array for empty input", () => {
    expect(curate([])).toEqual([]);
  });
});
