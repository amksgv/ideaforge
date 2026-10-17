import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Minimal in-memory sliding-window rate limiter keyed by client IP.
//
// Correct for a single long-lived server process (the default `next start`
// deployment and local dev). For serverless/multi-instance hosting swap the
// store for Upstash Ratelimit / Vercel KV / Redis — the call-site contract is
// identical.
// ---------------------------------------------------------------------------

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number, windowMs: number) {
  // Opportunistically drop idle keys so the map can't grow unbounded.
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  buckets.forEach((b, k) => {
    b.hits = b.hits.filter((t) => now - t < windowMs);
    if (b.hits.length === 0) buckets.delete(k);
  });
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);
  const b = buckets.get(key) ?? { hits: [] };
  b.hits = b.hits.filter((t) => now - t < windowMs);
  if (b.hits.length >= limit) {
    const oldest = b.hits[0];
    buckets.set(key, b);
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }
  b.hits.push(now);
  buckets.set(key, b);
  return { ok: true, remaining: limit - b.hits.length, retryAfterSec: 0 };
}

/** Best-effort client IP (first X-Forwarded-For hop, else a stable fallback). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "local";
}

export function tooManyRequests(r: RateLimitResult) {
  return NextResponse.json(
    { error: "Too many requests. Slow down." },
    {
      status: 429,
      headers: {
        "Retry-After": String(r.retryAfterSec),
        "X-RateLimit-Remaining": "0",
      },
    },
  );
}
