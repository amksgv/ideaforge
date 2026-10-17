"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { Facets, IdeaPage } from "@/lib/repo";
import {
  queryToSearchParams,
  type IdeaQuery,
  type SortKey,
} from "@/lib/ideaQuery";
import type { Level } from "@/lib/types";
import { cn } from "@/lib/format";
import { IdeaCard } from "@/components/idea/IdeaCard";

// ---------------------------------------------------------------------------
// URL-driven explorer. The server does ALL filtering/sorting/paging in SQL;
// this component only turns UI changes into a new URL (and renders results).
// ---------------------------------------------------------------------------

const SORTS: { key: SortKey; label: string }[] = [
  { key: "overall", label: "Overall score" },
  { key: "opportunity", label: "Opportunity" },
  { key: "whyNow", label: "Why Now" },
  { key: "feasibility", label: "Feasibility" },
  { key: "newest", label: "Newest" },
];

function toggleIn(list: string[] | undefined, v: string): string[] {
  const set = new Set(list ?? []);
  if (set.has(v)) set.delete(v);
  else set.add(v);
  return [...set];
}

export function DatabaseExplorer({
  query,
  page,
  facets,
}: {
  query: IdeaQuery;
  page: IdeaPage;
  facets: Facets;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const hrefFor = (next: IdeaQuery) => {
    const sp = queryToSearchParams(next).toString();
    return sp ? `${pathname}?${sp}` : pathname;
  };

  /** Apply a filter change; resets to page 1 unless the change *is* the page. */
  const apply = (patch: Partial<IdeaQuery>, keepPage = false) => {
    const next: IdeaQuery = { ...query, ...patch, page: keepPage ? patch.page : 1 };
    startTransition(() => router.replace(hrefFor(next), { scroll: false }));
  };

  // Debounced free-text search → URL.
  const [q, setQ] = useState(query.q ?? "");
  const lastPushed = useRef(query.q ?? "");
  useEffect(() => {
    const t = setTimeout(() => {
      if (q.trim() !== lastPushed.current) {
        lastPushed.current = q.trim();
        apply({ q: q.trim() || undefined });
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const activeCount =
    (query.categories?.length ?? 0) +
    (query.businessModels?.length ?? 0) +
    (query.minOverall ? 1 : 0) +
    (query.maxInvestment ? 1 : 0) +
    (query.maxTechnical ? 1 : 0) +
    (query.gregsPickOnly ? 1 : 0) +
    (query.q ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <FilterHeading>Search</FilterHeading>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ideas, tags…"
            aria-label="Search ideas"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <FilterHeading>Category</FilterHeading>
          <div className="mt-2 space-y-1">
            {facets.categories.map((c) => (
              <CheckRow
                key={c.name}
                label={c.name}
                count={c.count}
                checked={query.categories?.includes(c.name) ?? false}
                onChange={() => apply({ categories: toggleIn(query.categories, c.name) })}
              />
            ))}
          </div>
        </div>

        <div>
          <FilterHeading>Business model</FilterHeading>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {facets.businessModels.map((b) => {
              const on = query.businessModels?.includes(b.name) ?? false;
              return (
                <button
                  key={b.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => apply({ businessModels: toggleIn(query.businessModels, b.name) })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition",
                    on ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-ink-soft hover:bg-slate-50",
                  )}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <FilterHeading>Minimum overall · {query.minOverall ?? 0}</FilterHeading>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            defaultValue={query.minOverall ?? 0}
            onMouseUp={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })}
            onTouchEnd={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })}
            onKeyUp={(e) => apply({ minOverall: Number((e.target as HTMLInputElement).value) || undefined })}
            aria-label="Minimum overall score"
            aria-valuetext={`${query.minOverall ?? 0} out of 100`}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Max technical" value={query.maxTechnical ?? ""} onChange={(v) => apply({ maxTechnical: v || undefined })} />
          <SelectField label="Max capital" value={query.maxInvestment ?? ""} onChange={(v) => apply({ maxInvestment: v || undefined })} />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={query.gregsPickOnly ?? false}
            onChange={(e) => apply({ gregsPickOnly: e.target.checked || undefined })}
            className="accent-brand-600"
          />
          Greg&apos;s Picks only
        </label>

        {activeCount > 0 ? (
          <Link href={pathname} className="text-xs font-medium text-brand-600 hover:underline">
            Reset {activeCount} filter{activeCount === 1 ? "" : "s"}
          </Link>
        ) : null}
      </aside>

      <div aria-busy={pending}>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-ink-muted">
            <b className="text-ink">{page.total}</b> of {facets.total} ideas
            {page.pageCount > 1 ? (
              <span> · page {page.page} of {page.pageCount}</span>
            ) : null}
            {pending ? <span className="ml-2 text-brand-600">updating…</span> : null}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            Sort
            <select
              value={query.sort ?? "overall"}
              onChange={(e) => apply({ sort: e.target.value as SortKey })}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-hidden focus:border-brand-400"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {page.ideas.length === 0 ? (
          <div className="card grid place-items-center py-20 text-center">
            <p className="text-ink-muted">No ideas match these filters.</p>
            <Link href={pathname} className="btn-ghost mt-4">Clear filters</Link>
          </div>
        ) : (
          <div className={cn("grid gap-5 sm:grid-cols-2 xl:grid-cols-3 transition-opacity", pending && "opacity-60")}>
            {page.ideas.map((idea) => (
              <IdeaCard key={idea.slug} idea={idea} />
            ))}
          </div>
        )}

        {page.pageCount > 1 ? (
          <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
            <Link
              href={hrefFor({ ...query, page: Math.max(1, page.page - 1) })}
              aria-disabled={page.page <= 1}
              className={cn("btn-ghost", page.page <= 1 && "pointer-events-none opacity-40")}
            >
              ← Previous
            </Link>
            <span className="text-sm text-ink-muted tabular">
              {page.page} / {page.pageCount}
            </span>
            <Link
              href={hrefFor({ ...query, page: Math.min(page.pageCount, page.page + 1) })}
              aria-disabled={page.page >= page.pageCount}
              className={cn("btn-ghost", page.page >= page.pageCount && "pointer-events-none opacity-40")}
            >
              Next →
            </Link>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function FilterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{children}</h3>;
}

function CheckRow({ label, count, checked, onChange }: { label: string; count: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 text-sm hover:bg-slate-50">
      <span className="flex items-center gap-2 text-ink-soft">
        <input type="checkbox" checked={checked} onChange={onChange} className="accent-brand-600" />
        {label}
      </span>
      <span className="text-xs text-ink-muted">{count}</span>
    </label>
  );
}

function SelectField({ label, value, onChange }: { label: string; value: Level | ""; onChange: (v: Level | "") => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Level | "")}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-hidden focus:border-brand-400"
      >
        <option value="">Any</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </label>
  );
}
