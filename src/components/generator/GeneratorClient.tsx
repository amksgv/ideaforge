"use client";

import { useState } from "react";
import type { IdeaSummary, Level } from "@/lib/types";
import { cn } from "@/lib/format";
import { IdeaCard } from "@/components/idea/IdeaCard";

interface Match {
  idea: IdeaSummary;
  fitScore: number;
  reason: string;
}

const LEVELS: Level[] = ["Low", "Medium", "High"];

export function GeneratorClient({ categories }: { categories: string[] }) {
  const [technical, setTechnical] = useState<Level>("Medium");
  const [capital, setCapital] = useState<Level>("Low");
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technical, capital, categories: [...cats] }),
      });
      const data = await res.json();
      setMatches(data.matches ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="card h-fit p-6 lg:sticky lg:top-24">
        <h3 className="font-display text-lg font-bold text-ink">Your founder profile</h3>
        <p className="mt-1 text-sm text-ink-muted">
          We&apos;ll rank the database by fit with your skills, capital, and interests.
        </p>

        <Field label="Technical ability">
          <Segmented value={technical} options={LEVELS} onChange={setTechnical} />
        </Field>
        <Field label="Capital to invest">
          <Segmented value={capital} options={LEVELS} onChange={setCapital} />
        </Field>

        <Field label="Interested categories (optional)">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() =>
                  setCats((s) => {
                    const n = new Set(s);
                    if (n.has(c)) n.delete(c);
                    else n.add(c);
                    return n;
                  })
                }
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-medium transition",
                  cats.has(c) ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-ink-soft hover:bg-slate-50",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Field>

        <button onClick={generate} disabled={loading} className="btn-primary mt-5 w-full">
          {loading ? "Matching…" : "Generate my matches"}
        </button>
      </div>

      <div>
        {!matches ? (
          <div className="card grid place-items-center py-24 text-center">
            <div>
              <div className="text-4xl">🧬</div>
              <p className="mt-3 text-ink-muted">Set your profile and generate founder-fit matches.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {matches.map((m) => (
              <div key={m.idea.slug} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                <IdeaCard idea={m.idea} />
                <div className="card flex flex-row items-center gap-3 p-4 sm:w-44 sm:flex-col sm:items-start">
                  <div className="font-display text-2xl font-bold text-brand-600">{m.fitScore}</div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Fit score</div>
                    <p className="text-xs text-ink-soft">{m.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</div>
      {children}
    </div>
  );
}

function Segmented({ value, options, onChange }: { value: Level; options: Level[]; onChange: (v: Level) => void }) {
  return (
    <div className="flex rounded-xl border border-slate-200 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition",
            value === o ? "bg-brand-600 text-white" : "text-ink-soft hover:bg-slate-50",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
