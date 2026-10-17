import { describe, expect, it } from "vitest";
import { daysSinceEpoch, rotationIndex, utcDateKey } from "@/lib/dates";

describe("utcDateKey", () => {
  it("formats as YYYY-MM-DD in UTC regardless of local offset", () => {
    expect(utcDateKey(new Date("2026-10-13T23:59:59Z"))).toBe("2026-10-13");
    expect(utcDateKey(new Date("2026-10-14T00:00:00Z"))).toBe("2026-10-14");
  });
});

describe("daysSinceEpoch", () => {
  it("is 0 at the epoch and increments by exactly one per day", () => {
    expect(daysSinceEpoch("1970-01-01")).toBe(0);
    expect(daysSinceEpoch("1970-01-02")).toBe(1);
    expect(daysSinceEpoch("2026-10-14") - daysSinceEpoch("2026-10-13")).toBe(1);
  });
  it("crosses month and year boundaries correctly", () => {
    expect(daysSinceEpoch("2026-03-01") - daysSinceEpoch("2026-02-28")).toBe(1);
    expect(daysSinceEpoch("2027-01-01") - daysSinceEpoch("2026-12-31")).toBe(1);
  });
});

describe("rotationIndex (Idea of the Day fallback — regression for the June hash bug)", () => {
  const days = (n: number, from = Date.UTC(2026, 9, 13)) =>
    Array.from({ length: n }, (_, i) => new Date(from + i * 86_400_000).toISOString().slice(0, 10));

  it("never repeats an idea on consecutive days", () => {
    for (const size of [2, 3, 5, 12, 37]) {
      const idx = days(400).map((d) => rotationIndex(d, size));
      for (let i = 1; i < idx.length; i++) expect(idx[i]).not.toBe(idx[i - 1]);
    }
  });

  it("features every idea before any repeats", () => {
    const size = 12;
    const idx = days(size).map((d) => rotationIndex(d, size));
    expect(new Set(idx).size).toBe(size);
  });

  it("stays within bounds and tolerates degenerate sizes", () => {
    for (const d of days(30)) {
      const i = rotationIndex(d, 7);
      expect(i).toBeGreaterThanOrEqual(0);
      expect(i).toBeLessThan(7);
    }
    expect(rotationIndex("2026-10-13", 1)).toBe(0);
    expect(rotationIndex("2026-10-13", 0)).toBe(0);
  });
});
