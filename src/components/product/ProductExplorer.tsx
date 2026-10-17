"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { ProductFacets, ProductPage } from "@/lib/productRepo";
import { productQueryToSearchParams, type ProductQuery, type ProductSortKey } from "@/lib/productQuery";
import type { PriceTier, ProductFormat } from "@/lib/productTypes";
import { PRICE_TIER_RANGES } from "@/lib/productTypes";
import { cn } from "@/lib/format";
import { ProductCard } from "./ProductCard";

const SORTS: { key: ProductSortKey; label: string }[] = [
  { key: "overall", label: "Overall" },
  { key: "gap", label: "Gap strength" },
  { key: "competition", label: "Least competition" },
  { key: "intent", label: "Buying intent" },
  { key: "trend", label: "Trend" },
  { key: "price", label: "Price (high → low)" },
  { key: "newest", label: "Newest" },
];

function toggleIn<T extends string>(list: T[] | undefined, v: T): T[] {
  const s = new Set(list ?? []);
  if (s.has(v)) s.delete(v); else s.add(v);
  return [...s];
}

export function ProductExplorer({ query, page, facets }: { query: ProductQuery; page: ProductPage; facets: ProductFacets }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const hrefFor = (next: ProductQuery) => { const sp = productQueryToSearchParams(next).toString(); return sp ? `${pathname}?${sp}` : pathname; };
  const apply = (patch: Partial<ProductQuery>, keepPage = false) => {
    const next: ProductQuery = { ...query, ...patch, page: keepPage ? patch.page : 1 };
    startTransition(() => router.replace(hrefFor(next), { scroll: false }));
  };

  const [q, setQ] = useState(query.q ?? "");
  const last = useRef(query.q ?? "");
  useEffect(() => {
    const t = setTimeout(() => { if (q.trim() !== last.current) { last.current = q.trim(); apply({ q: q.trim() || undefined }); } }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const active = (query.niches?.length ?? 0) + (query.formats?.length ?? 0) + (query.priceTiers?.length ?? 0) + (query.minOverall ? 1 : 0) + (typeof query.maxCompetitors === "number" ? 1 : 0) + (query.singaporeOnly ? 1 : 0) + (query.gregsPickOnly ? 1 : 0) + (query.q ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <H>Search</H>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, gaps, niches…" aria-label="Search products" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <H>Niche</H>
          <div className="mt-2 space-y-1">
            {facets.niches.map((n) => (
              <label key={n.name} className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-sm hover:bg-slate-50">
                <span className="flex items-center gap-2 text-ink-soft"><input type="checkbox" className="accent-brand-600" checked={query.niches?.includes(n.name) ?? false} onChange={() => apply({ niches: toggleIn(query.niches, n.name) })} />{n.name}</span>
                <span className="text-xs text-ink-muted">{n.count}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <H>Best format</H>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {facets.formats.map((f) => { const on = query.formats?.includes(f.name) ?? false; return (
              <button key={f.name} type="button" aria-pressed={on} onClick={() => apply({ formats: toggleIn<ProductFormat>(query.formats, f.name) })} className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize transition", on ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-ink-soft hover:bg-slate-50")}>{f.name.replace("-", " ")} <span className="opacity-60">{f.count}</span></button>
            ); })}
          </div>
        </div>
        <div>
          <H>Price tier</H>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(["tripwire", "core", "premium"] as PriceTier[]).map((t) => { const on = query.priceTiers?.includes(t) ?? false; const c = facets.priceTiers.find((x) => x.name === t)?.count ?? 0; return (
              <button key={t} type="button" aria-pressed={on} title={PRICE_TIER_RANGES[t].label} onClick={() => apply({ priceTiers: toggleIn<PriceTier>(query.priceTiers, t) })} className={cn("rounded-full border px-3 py-1 text-xs font-medium capitalize transition", on ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-ink-soft hover:bg-slate-50")}>{t} <span className="opacity-60">{c}</span></button>
            ); })}
          </div>
        </div>
        <div>
          <H>Max Gumroad competitors · {typeof query.maxCompetitors === "number" ? query.maxCompetitors : "any"}</H>
          <select value={typeof query.maxCompetitors === "number" ? String(query.maxCompetitors) : ""} onChange={(e) => apply({ maxCompetitors: e.target.value === "" ? undefined : Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-hidden focus:border-brand-400">
            <option value="">Any</option><option value="10">≤ 10 (wide open)</option><option value="50">≤ 50</option><option value="200">≤ 200</option><option value="1000">≤ 1,000</option>
          </select>
        </div>
        <div>
          <H>Minimum overall · {query.minOverall ?? 0}</H>
          <input type="range" min={0} max={100} step={5} defaultValue={query.minOverall ?? 0} onMouseUp={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })} onTouchEnd={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })} onKeyUp={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })} aria-label="Minimum overall score" aria-valuetext={`${query.minOverall ?? 0} out of 100`} className="mt-2 w-full accent-brand-600" />
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft"><input type="checkbox" className="accent-brand-600" checked={query.singaporeOnly ?? false} onChange={(e) => apply({ singaporeOnly: e.target.checked || undefined })} />🇸🇬 Singapore angle only <span className="text-xs text-ink-muted">({facets.singapore})</span></label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft"><input type="checkbox" className="accent-brand-600" checked={query.gregsPickOnly ?? false} onChange={(e) => apply({ gregsPickOnly: e.target.checked || undefined })} />Picks only</label>
        {active > 0 ? <Link href={pathname} className="text-xs font-medium text-brand-600 hover:underline">Reset {active} filter{active === 1 ? "" : "s"}</Link> : null}
      </aside>

      <div aria-busy={pending}>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-ink-muted"><b className="text-ink">{page.total}</b> of {facets.total} products{page.pageCount > 1 ? <span> · page {page.page} of {page.pageCount}</span> : null}{pending ? <span className="ml-2 text-brand-600">updating…</span> : null}</p>
          <label className="flex items-center gap-2 text-sm text-ink-soft">Sort
            <select value={query.sort ?? "overall"} onChange={(e) => apply({ sort: e.target.value as ProductSortKey })} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-hidden focus:border-brand-400">{SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}</select>
          </label>
        </div>
        {page.products.length === 0 ? (
          <div className="card grid place-items-center py-20 text-center"><p className="text-ink-muted">No products match these filters.</p><Link href={pathname} className="btn-ghost mt-4">Clear filters</Link></div>
        ) : (
          <div className={cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3 transition-opacity", pending && "opacity-60")}>{page.products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
        )}
        {page.pageCount > 1 ? (
          <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
            <Link href={hrefFor({ ...query, page: Math.max(1, page.page - 1) })} aria-disabled={page.page <= 1} className={cn("btn-ghost", page.page <= 1 && "pointer-events-none opacity-40")}>← Previous</Link>
            <span className="text-sm text-ink-muted tabular">{page.page} / {page.pageCount}</span>
            <Link href={hrefFor({ ...query, page: Math.min(page.pageCount, page.page + 1) })} aria-disabled={page.page >= page.pageCount} className={cn("btn-ghost", page.page >= page.pageCount && "pointer-events-none opacity-40")}>Next →</Link>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
function H({ children }: { children: React.ReactNode }) { return <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{children}</h3>; }
