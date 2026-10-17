// Tiny fetch helper used by live collectors. On a user's machine this works
// directly; it is never exercised in offline mode.

// Matches `key=value` pairs for credential-ish names whether they appear after
// `?`/`&` in a URL, at the start of a string, or after whitespace in a message.
const SECRET_PARAMS =
  /(^|[?&\s])(api_key|apikey|key|token|access_token|client_secret|secret|password)=([^&#\s]*)/gi;

/** Strip credential-bearing query params so URLs are safe to log. */
export function redactUrl(url: string): string {
  return url.replace(SECRET_PARAMS, "$1$2=[redacted]");
}

/** Safe-to-log rendering of any thrown value (redacts URLs inside messages). */
export function describeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  return redactUrl(msg);
}

export async function httpJson<T = any>(
  url: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    init?.timeoutMs ?? 12_000,
  );
  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    if (!res.ok) {
      // Never include the raw URL — it may carry an API key in the query.
      throw new Error(`HTTP ${res.status} from ${new URL(url).host}`);
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

/** Least-squares slope of a series, normalized to roughly -1..1. */
export function seriesSlope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;
  const xs = values.map((_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = values.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - meanX) * (values[i] - meanY);
    den += (xs[i] - meanX) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  // Normalize by the mean magnitude so it's comparable across scales.
  const norm = meanY === 0 ? 0 : slope / meanY;
  return Math.max(-1, Math.min(1, norm * (n / 2)));
}
