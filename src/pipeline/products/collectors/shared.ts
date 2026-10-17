import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { describeError } from "@/pipeline/collectors/http";

// ---------------------------------------------------------------------------
// Shared plumbing for undocumented public endpoints (Gumroad, Google and
// Amazon autocomplete). Every live call is: validated with zod, bounded by a
// timeout, cached on disk per query per UTC day, sent with an identified UA,
// and wrapped so the caller always gets `null` (→ fixture) instead of a throw.
// ---------------------------------------------------------------------------

export const USER_AGENT =
  "IdeaForge/0.2 (+https://github.com/ideaforge; research tool; one request per query per day)";

const CACHE_DIR = path.resolve(process.cwd(), ".cache", "collectors");

function cacheKey(ns: string, key: string): string {
  const day = new Date().toISOString().slice(0, 10);
  const safe = key.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80);
  return path.join(CACHE_DIR, ns, `${day}--${safe}.json`);
}

export function readCache<T>(ns: string, key: string): T | null {
  try {
    const p = cacheKey(ns, key);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, "utf8")) as T;
  } catch {
    return null;
  }
}

export function writeCache(ns: string, key: string, value: unknown): void {
  try {
    const p = cacheKey(ns, key);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(value));
  } catch {
    // cache is best-effort
  }
}

export interface FetchJsonOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
}

/**
 * Fetch + parse + validate. Returns null on ANY failure (network, non-2xx,
 * bad JSON, schema mismatch) after logging a redacted one-liner.
 */
export async function fetchValidated<S extends z.ZodTypeAny>(
  label: string,
  url: string,
  schema: S,
  opts: FetchJsonOptions = {},
): Promise<z.output<S> | null> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), opts.timeoutMs ?? 8_000);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json", ...opts.headers },
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(`[${label}] HTTP ${res.status} from ${new URL(url).host}`);
      return null;
    }
    const text = await res.text();
    // Google autocomplete returns JSON; some endpoints prefix with )]}' — strip it.
    const cleaned = text.replace(/^\)\]\}'\s*/, "");
    const parsed = schema.safeParse(JSON.parse(cleaned));
    if (!parsed.success) {
      console.warn(`[${label}] response shape changed: ${parsed.error.issues[0]?.message ?? "schema mismatch"}`);
      return null;
    }
    return parsed.data as z.output<S>;
  } catch (err) {
    console.warn(`[${label}] fetch failed: ${describeError(err)}`);
    return null;
  } finally {
    clearTimeout(t);
  }
}

/** Run a live fetch with day-cache; null → caller falls back to fixtures. */
export async function cachedLive<T>(
  ns: string,
  key: string,
  fetcher: () => Promise<T | null>,
): Promise<T | null> {
  const hit = readCache<T>(ns, key);
  if (hit) return hit;
  const fresh = await fetcher();
  if (fresh) writeCache(ns, key, fresh);
  return fresh;
}

export function nowIso(): string {
  return new Date().toISOString();
}
