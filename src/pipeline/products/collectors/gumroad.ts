import { z } from "zod";
import type { GumroadListing, GumroadSnapshot } from "@/lib/productTypes";
import type { ProductBrief } from "@/pipeline/products/brief";
import { cachedLive, fetchValidated, nowIso } from "./shared";

// ---------------------------------------------------------------------------
// Gumroad public product search (verified Oct 2026):
//   GET https://gumroad.com/products/search?query=<q>
//   headers: Accept: application/json, X-Requested-With: XMLHttpRequest
// NOTE: do NOT pass sort=hot_and_new — it restricts `total` to recent listings
// (13 vs 745 for "notion second brain"), which would undercount competition ~50×.
// Returns { total, tags_data[{key,doc_count}], products[{name, price_cents,
// currency_code, ratings{count,average}, seller{name}, url}] }.
// Undocumented → schema-validated, cached per day, fixture on any failure.
// ---------------------------------------------------------------------------

export const GumroadResponseSchema = z.object({
  total: z.number().int().nonnegative(),
  tags_data: z.array(z.object({ key: z.string(), doc_count: z.number() })).default([]),
  products: z
    .array(
      z.object({
        name: z.string(),
        price_cents: z.number().nonnegative().nullable().optional(),
        currency_code: z.string().optional().default("usd"),
        ratings: z
          .object({ count: z.number().optional().default(0), average: z.number().nullable().optional() })
          .optional(),
        seller: z.object({ name: z.string().optional().default("") }).optional(),
        url: z.string().optional().default(""),
      }),
    )
    .default([]),
});
export type GumroadResponse = z.output<typeof GumroadResponseSchema>;

// Rough, static FX for normalizing list prices to USD (ranking only).
const FX_TO_USD: Record<string, number> = {
  usd: 1, eur: 1.08, gbp: 1.27, cad: 0.73, aud: 0.65, sgd: 0.74, inr: 0.012, jpy: 0.0067,
};

export function quantiles(values: number[]) {
  const v = [...values].filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return { p25: 0, median: 0, p75: 0, min: 0, max: 0 };
  const q = (p: number) => v[Math.min(v.length - 1, Math.floor(p * (v.length - 1)))];
  return { p25: q(0.25), median: q(0.5), p75: q(0.75), min: v[0], max: v[v.length - 1] };
}

/** Pure: raw Gumroad JSON → normalized snapshot. */
export function parseGumroad(query: string, raw: GumroadResponse, live: boolean): GumroadSnapshot {
  const sample: GumroadListing[] = raw.products.map((p) => {
    const fx = FX_TO_USD[(p.currency_code ?? "usd").toLowerCase()] ?? 1;
    return {
      name: p.name.trim(),
      priceUsd: Math.round(((p.price_cents ?? 0) / 100) * fx * 100) / 100,
      currency: (p.currency_code ?? "usd").toUpperCase(),
      ratingAvg: p.ratings?.average ?? null,
      ratingCount: p.ratings?.count ?? 0,
      seller: p.seller?.name ?? "",
      url: p.url ?? "",
    };
  });
  const paid = sample.map((s) => s.priceUsd).filter((x) => x > 0);
  const rated = sample.filter((s) => s.ratingAvg != null && s.ratingCount > 0);
  const avgRating = rated.length
    ? Math.round((rated.reduce((a, s) => a + (s.ratingAvg ?? 0), 0) / rated.length) * 10) / 10
    : null;
  return {
    query,
    total: raw.total,
    sample,
    price: quantiles(paid),
    avgRating,
    reviewVolume: sample.reduce((a, s) => a + s.ratingCount, 0),
    adjacentTags: raw.tags_data
      .filter((t) => t.key.toLowerCase() !== query.toLowerCase())
      .slice(0, 8)
      .map((t) => ({ tag: t.key, count: t.doc_count })),
    fetchedAt: nowIso(),
    live,
  };
}

async function live(query: string): Promise<GumroadSnapshot | null> {
  const url = `https://gumroad.com/products/search?query=${encodeURIComponent(query)}`;
  const raw = await cachedLive("gumroad", query, () =>
    fetchValidated("gumroad", url, GumroadResponseSchema, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    }),
  );
  return raw ? parseGumroad(query, raw, true) : null;
}

export function fixtureGumroad(brief: ProductBrief): GumroadSnapshot {
  return { ...brief.fixtures.gumroad, fetchedAt: nowIso(), live: false };
}

export async function collectGumroad(
  brief: ProductBrief,
  ctx: { live: boolean },
): Promise<GumroadSnapshot> {
  if (ctx.live) {
    const snap = await live(brief.seedQuery);
    if (snap) return snap;
  }
  return fixtureGumroad(brief);
}
