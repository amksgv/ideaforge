import recorded from "./_recorded_fixtures.json";
import type { GumroadSnapshot } from "@/lib/productTypes";
import { GumroadResponseSchema, parseGumroad } from "@/pipeline/products/collectors/gumroad";

// ---------------------------------------------------------------------------
// Recorded live responses (Gumroad search, Google + Amazon autocomplete) for
// each seed brief, captured with scripts/record-product-fixtures.mjs. Briefs
// pull their quantitative fixtures from here so offline mode reflects the
// real market as of the recording date, and so the arrays aren't duplicated
// by hand in every brief file.
// ---------------------------------------------------------------------------

interface RecordedEntry {
  seed: string;
  gumroad?: unknown;
  google?: string[];
  amazon?: string[];
}

const DATA = recorded as Record<string, RecordedEntry>;

export interface RecordedFixtures {
  google: string[];
  amazon: string[];
  gumroad: Omit<GumroadSnapshot, "fetchedAt" | "live">;
}

const EMPTY_GUMROAD = (query: string): Omit<GumroadSnapshot, "fetchedAt" | "live"> => ({
  query,
  total: 0,
  sample: [],
  price: { p25: 0, median: 0, p75: 0, min: 0, max: 0 },
  avgRating: null,
  reviewVolume: 0,
  adjacentTags: [],
});

/** Load the recorded fixtures for a brief slug (throws if missing — seeds must be recorded). */
export function recordedFixtures(slug: string): RecordedFixtures {
  const e = DATA[slug];
  if (!e) throw new Error(`No recorded fixtures for "${slug}". Run: node scripts/record-product-fixtures.mjs`);
  const parsed = e.gumroad ? GumroadResponseSchema.safeParse(e.gumroad) : null;
  const snap = parsed?.success ? parseGumroad(e.seed, parsed.data, false) : null;
  const { fetchedAt: _f, live: _l, ...gumroad } = snap ?? { ...EMPTY_GUMROAD(e.seed), fetchedAt: "", live: false };
  return { google: e.google ?? [], amazon: e.amazon ?? [], gumroad };
}
