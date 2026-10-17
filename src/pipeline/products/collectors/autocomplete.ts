import { z } from "zod";
import type { AutocompleteSignal } from "@/lib/productTypes";
import type { ProductBrief } from "@/pipeline/products/brief";
import { clusterSuggestions, normalizeSuggestions } from "./autocompleteCluster";
import { cachedLive, fetchValidated, nowIso } from "./shared";

// ---------------------------------------------------------------------------
// Autocomplete collectors (Reilly Engines 1 & 4, plus Amazon as a bonus).
//
//  Google  GET suggestqueries.google.com/complete/search?client=firefox&q=…
//          → [query, [suggestions...]]                         (live, no key)
//  Amazon  GET completion.amazon.com/api/2017/suggestions?mid=…&alias=aps&prefix=…
//          → { suggestions: [{ value }] }                       (live, no key)
//  Etsy    suggestions_ajax.php is behind a DataDome captcha    (fixture only)
// ---------------------------------------------------------------------------

const GoogleSchema = z.tuple([z.string(), z.array(z.string())]).rest(z.unknown());
const AmazonSchema = z.object({
  suggestions: z.array(z.object({ value: z.string() })).default([]),
});

async function googleLive(seed: string): Promise<string[] | null> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(seed)}`;
  const raw = await cachedLive("google-ac", seed, () => fetchValidated("google-ac", url, GoogleSchema));
  return raw ? raw[1] : null;
}

async function amazonLive(seed: string): Promise<string[] | null> {
  const url = `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${encodeURIComponent(seed)}`;
  const raw = await cachedLive("amazon-ac", seed, () => fetchValidated("amazon-ac", url, AmazonSchema));
  return raw ? raw.suggestions.map((s) => s.value) : null;
}

function build(
  source: AutocompleteSignal["source"],
  seed: string,
  raw: string[],
  live: boolean,
): AutocompleteSignal {
  const suggestions = normalizeSuggestions(seed, raw);
  return {
    source,
    seed,
    suggestions,
    clusters: clusterSuggestions(seed, suggestions),
    fetchedAt: nowIso(),
    live,
  };
}

/** All seeds for a brief: the primary query plus a few intent expanders. */
export function seedsFor(brief: ProductBrief): string[] {
  const base = brief.seedQuery.trim();
  const expanders = [base, `${base} for`, `best ${base}`, `how to ${base}`];
  return [...new Set([...expanders, ...(brief.extraSeeds ?? [])])].slice(0, 6);
}

export async function collectAutocomplete(
  brief: ProductBrief,
  ctx: { live: boolean },
): Promise<AutocompleteSignal[]> {
  const out: AutocompleteSignal[] = [];
  const primary = brief.seedQuery;

  // Google — merge suggestions across seeds into one signal keyed to the primary seed.
  let google: string[] | null = null;
  if (ctx.live) {
    const parts = await Promise.all(seedsFor(brief).map(googleLive));
    const merged = parts.flatMap((p) => p ?? []);
    google = parts.some(Boolean) ? merged : null;
  }
  out.push(build("google", primary, google ?? brief.fixtures.google, Boolean(google)));

  // Amazon — single seed is enough; it already returns ~10 buyer phrases.
  let amazon: string[] | null = null;
  if (ctx.live) amazon = await amazonLive(primary);
  out.push(build("amazon", primary, amazon ?? brief.fixtures.amazon, Boolean(amazon)));

  // Etsy — always fixture (captcha-gated). See manualChecks in the report.
  out.push(build("etsy", primary, brief.fixtures.etsy, false));

  return out;
}
