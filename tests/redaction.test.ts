import { describe, expect, it } from "vitest";
import { describeError, redactUrl, seriesSlope } from "@/pipeline/collectors/http";

describe("redactUrl / describeError (regression: API keys in logs)", () => {
  it.each([
    "https://serpapi.com/search.json?engine=t&api_key=SECRET1&foo=1",
    "https://www.googleapis.com/youtube/v3/search?q=x&key=SECRET2",
    "key=SECRET3",
    "HTTP 401 token=SECRET4 from host",
    "oauth client_secret=SECRET5&grant=x",
    "password=SECRET6",
  ])("redacts %s", (input) => {
    const out = describeError(new Error(input));
    expect(out).not.toMatch(/SECRET\d/);
    expect(out).toMatch(/\[redacted\]/);
  });

  it("leaves non-secret params intact", () => {
    expect(redactUrl("https://x.com/a?q=hello&page=2")).toBe("https://x.com/a?q=hello&page=2");
  });

  it("handles non-Error throwables", () => {
    expect(describeError("raw string key=ABC")).toBe("raw string key=[redacted]");
    expect(describeError(42)).toBe("42");
  });
});

describe("seriesSlope", () => {
  it("is positive for rising, negative for falling, zero for flat/short", () => {
    expect(seriesSlope([1, 2, 3, 4, 5])).toBeGreaterThan(0);
    expect(seriesSlope([5, 4, 3, 2, 1])).toBeLessThan(0);
    expect(seriesSlope([3, 3, 3, 3])).toBe(0);
    expect(seriesSlope([7])).toBe(0);
    expect(seriesSlope([])).toBe(0);
  });
  it("is clamped to [-1, 1]", () => {
    expect(seriesSlope([0, 0, 0, 1000])).toBeLessThanOrEqual(1);
    expect(seriesSlope([1000, 0, 0, 0])).toBeGreaterThanOrEqual(-1);
  });
});
