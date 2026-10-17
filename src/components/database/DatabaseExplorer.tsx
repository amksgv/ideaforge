"use client";

import { useMemo, useState } from "react";
import type { Facets } from "@/lib/repo";
import type { IdeaSummary, Level } from "@/lib/types";
import { cn } from "@/lib/format";
import { IdeaCard } from "@/components/idea/IdeaCard";

const RANK: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };
const SORTS = [
  { key: "overall", label: "Overall score" },
  { key: "opportunity", label: "Opportunity" },
  { key: "whyNow", label: "Why Now" },
  { key: "feasibility", label: "Feasibility" },
] as const;
type SortKey = (typeof SORTS)[number]["key"];

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

export function DatabaseExplorer({
  ideas,
  facets,
}: {
  ideas: IdeaSummary[];
  facets: Facets;
}) {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [bms, setBms] = useState<Set<string>>(new Set());
  const [minOverall, setMinOverall] = useState(0);
  const [gregsOnly, setGregsOnly] = useState(false);
  const [maxTech, setMaxTech] = useState<Level | "">("");
  const [maxCap, setMaxCap] = useState<Level | "">("");
  const [sort, setSort] = useState<SortKey>("overall");

  const filtered = useMemo(() => {
    const list = ideas.filter((i) => {
      if (q && !`${i.title} ${i.tagline} ${i.tags.join(" ")} ${i.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cats.size && !cats.has(i.category)) return false;
      if (bms.size && !bms.has(i.businessModel)) return false;
      if (i.scores.overall < minOverall) return false;
      if (gregsOnly && !i.gregsPick) return false;
      if (maxTech && RANK[i.founderFit.technicalSkill] > RANK[maxTech]) return false;
      if (maxCap && RANK[i.founderFit.investment] > RANK[maxCap]) return false;
      return true;
    });
    const val = (i: IdeaSummary) =>
      sort === "overall" ? i.scores.overall : i.scores[sort].value;
    return [...list].sort((a, b) => val(b) - val(a));
  }, [ideas, q, cats, bms, minOverall, gregsOnly, maxTech, maxCap, sort]);

  const reset = () => {
    setQ(""); setCats(new Set()); setBms(new Set()); setMinOverall(0);
    setGregsOnly(false); setMaxTech(""); setMaxCap(""); setSort("overall");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <FilterHeading>Search</FilterHeading>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ideas, tags…"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
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
                checked={cats.has(c.name)}
                onChange={() => setCats((s) => toggle(s, c.name))}
              />
            ))}
          </div>
        </div>

        <div>
          <FilterHeading>Business model</FilterHeading>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {facets.businessModels.map((b) => (
              <button
                key={b.name}
                onClick={() => setBms((s) => toggle(s, b.name))}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  bms.has(b.name)
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-ink-soft hover:bg-slate-50",
                )}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FilterHeading>Minimum overall · {minOverall}</FilterHeading>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={minOverall}
            onChange={(e) => setMinOverall(Number(e.target.value))}
            className="mt-2 w-full accent-brand-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Max technical" value={maxTech} onChange={setMaxTech} />
          <SelectField label="Max capital" value={maxCap} onChange={setMaxCap} />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" checked={gregsOnly} onChange={(e) => setGregsOnly(e.target.checked)} className="accent-brand-600" />
          Greg&apos;s Picks only
        </label>

        <button onClick={reset} className="text-xs font-medium text-brand-600 hover:underline">
          Reset filters
        </button>
      </aside>

      <div>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-ink-muted">
            <b className="text-ink">{filtered.length}</b> of {ideas.length} ideas
          </p>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-brand-400"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="card grid place-items-center py-20 text-center">
            <p className="text-ink-muted">No ideas match these filters.</p>
            <button onClick={reset} className="btn-ghost mt-4">Clear filters</button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((idea) => (
              <IdeaCard key={idea.slug} idea={idea} />
            ))}
          </div>
        )}
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
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-400"
      >
        <option value="">Any</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </label>
  );
}
