import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

describe("rateLimit", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("allows up to the limit then rejects with a retry hint", () => {
    const key = `t-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      const r = rateLimit(key, { limit: 5, windowMs: 60_000 });
      expect(r.ok).toBe(true);
      expect(r.remaining).toBe(4 - i);
    }
    const blocked = rateLimit(key, { limit: 5, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
    expect(blocked.retryAfterSec).toBeLessThanOrEqual(60);
  });

  it("isolates keys", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, { limit: 1, windowMs: 60_000 });
    expect(rateLimit(a, { limit: 1, windowMs: 60_000 }).ok).toBe(false);
    expect(rateLimit(b, { limit: 1, windowMs: 60_000 }).ok).toBe(true);
  });

  it("frees capacity once the window slides", () => {
    const key = `w-${Math.random()}`;
    rateLimit(key, { limit: 1, windowMs: 1_000 });
    expect(rateLimit(key, { limit: 1, windowMs: 1_000 }).ok).toBe(false);
    vi.advanceTimersByTime(1_001);
    expect(rateLimit(key, { limit: 1, windowMs: 1_000 }).ok).toBe(true);
  });
});

describe("clientIp", () => {
  const mk = (h: Record<string, string>) => new Request("http://x", { headers: h });
  it("prefers the first X-Forwarded-For hop", () => {
    expect(clientIp(mk({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" }))).toBe("1.2.3.4");
  });
  it("falls back to X-Real-IP, then a stable local key", () => {
    expect(clientIp(mk({ "x-real-ip": "9.9.9.9" }))).toBe("9.9.9.9");
    expect(clientIp(mk({}))).toBe("local");
  });
});

describe("tooManyRequests", () => {
  it("returns 429 with Retry-After", async () => {
    const res = tooManyRequests({ ok: false, remaining: 0, retryAfterSec: 42 });
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("42");
    expect((await res.json()).error).toMatch(/Too many/);
  });
});
