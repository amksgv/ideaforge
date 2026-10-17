"use client";

import { useState } from "react";
import type { IdeaSummary, Level } from "@/lib/types";
import type { ProductSummary } from "@/lib/productTypes";
import type { Convergence } from "@/lib/convergence";
import { cn } from "@/lib/format";
import { IdeaCard } from "@/components/idea/IdeaCard";
import { ProductCard } from "@/components/product/ProductCard";

interface Match { idea: IdeaSummary; fitScore: number; reason: string }
interface ProductMatch { product: ProductSummary; fitScore: number; reason: string }

const LEVELS: Level[] = ["Low", "Medium", "High"];

const CONVERGENCE_FIELDS: { key: keyof Convergence; label: string; hint: string }[] = [
  { key: "skills", label: "Skills", hint: "Hard skills, tools, crafts — e.g. spreadsheets, copywriting, Notion" },
  { key: "struggles", label: "Struggles you've overcome", hint: "Your deepest mess is often your most profitable message — e.g. debt, insomnia, burnout" },
  { key: "hobbies", label: "Hobbies", hint: "What you do for love — e.g. cooking, D&D, lifting" },
  { key: "vocation", label: "Vocation", hint: "Career and industry — e.g. nurse, real-estate agent, freelancer" },
  { key: "passions", label: "Passions", hint: "What you read about when nobody's paying — e.g. CPF, parenting, AI" },
];

export function GeneratorClient({ categories }: { categories: string[] }) {
  const [technical, setTechnical] = useState<Level>("Medium");
  const [capital, setCapital] = useState<Level>("Low");
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [conv, setConv] = useState<Convergence>({});
  const [showConv, setShowConv] = useState(true);
  const [result, setResult] = useState<{ matches: Match[]; productMatches: ProductMatch[]; usedConvergence: boolean } | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technical, capital, categories: [...cats], convergence: conv }),
      });
      const data = await res.json();
      setResult({ matches: data.matches ?? [], productMatches: data.productMatches ?? [], usedConvergence: Boolean(data.usedConvergence) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <div className="card h-fit p-6 lg:sticky lg:top-24">
        <h3 className="font-display text-lg font-bold text-ink">Your founder profile</h3>
        <p className="mt-1 text-sm text-ink-muted">We rank ideas by fit with your skills and capital — and, if you fill in the five parts below, by your zone of genius.</p>

        <Field label="Technical ability"><Segmented value={technical} options={LEVELS} onChange={setTechnical} /></Field>
        <Field label="Capital to invest"><Segmented value={capital} options={LEVELS} onChange={setCapital} /></Field>

        <Field label="Interested categories (optional)">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCats((s) => { const n = new Set(s); if (n.has(c)) n.delete(c); else n.add(c); return n; })}
                className={cn("rounded-full border px-2.5 py-1 text-xs font-medium transition", cats.has(c) ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-ink-soft hover:bg-slate-50")}>{c}</button>
            ))}
          </div>
        </Field>

        <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50/40 p-4">
          <button type="button" onClick={() => setShowConv((v) => !v)} aria-expanded={showConv} className="flex w-full items-center justify-between text-left">
            <span><span className="text-xs font-semibold uppercase tracking-wider text-brand-700">5-Part Convergence</span><span className="block text-xs text-ink-muted">Skills · Struggles · Hobbies · Vocation · Passions</span></span>
            <span className="text-ink-muted">{showConv ? "−" : "+"}</span>
          </button>
          {showConv ? (
            <div className="mt-3 space-y-3">
              {CONVERGENCE_FIELDS.map((f) => (
                <label key={f.key} className="block">
                  <span className="text-xs font-semibold text-ink">{f.label}</span>
                  <input value={conv[f.key] ?? ""} onChange={(e) => setConv((c) => ({ ...c, [f.key]: e.target.value }))} placeholder={f.hint} maxLength={300}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-hidden placeholder:text-slate-400 focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
                </label>
              ))}
            </div>
          ) : null}
        </div>

        <button onClick={generate} disabled={loading} className="btn-primary mt-5 w-full">{loading ? "Matching…" : "Generate my matches"}</button>
      </div>

      <div>
        {!result ? (
          <div className="card grid place-items-center py-24 text-center"><div><div className="text-4xl">🧬</div><p className="mt-3 text-ink-muted">Set your profile and generate founder-fit matches.</p></div></div>
        ) : (
          <div className="space-y-10">
            {result.usedConvergence && result.productMatches.length ? (
              <section>
                <div className="mb-4"><span className="label-eyebrow">From the Digital Product Lab</span><h2 className="font-display text-2xl font-bold text-ink">Products in your zone of genius</h2></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {result.productMatches.map((m) => (
                    <div key={m.product.slug} className="relative">
                      <ProductCard product={m.product} />
                      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-white" title={m.reason}>fit {m.fitScore}</div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            <section>
              <div className="mb-4"><span className="label-eyebrow">Startup ideas</span><h2 className="font-display text-2xl font-bold text-ink">Ranked by founder fit{result.usedConvergence ? " + convergence" : ""}</h2></div>
              <div className="space-y-5">
                {result.matches.map((m) => (
                  <div key={m.idea.slug} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                    <IdeaCard idea={m.idea} />
                    <div className="card flex flex-row items-center gap-3 p-4 sm:w-44 sm:flex-col sm:items-start">
                      <div className="font-display text-2xl font-bold text-brand-600">{m.fitScore}</div>
                      <div><div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Fit score</div><p className="text-xs text-ink-soft">{m.reason}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mt-5"><div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</div>{children}</div>;
}
function Segmented({ value, options, onChange }: { value: Level; options: Level[]; onChange: (v: Level) => void }) {
  return (
    <div className="flex rounded-xl border border-slate-200 p-1">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className={cn("flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition", value === o ? "bg-brand-600 text-white" : "text-ink-soft hover:bg-slate-50")}>{o}</button>
      ))}
    </div>
  );
}
