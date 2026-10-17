import type { AutocompleteSignal, ProductReport } from "@/lib/productTypes";
import { FORMAT_LABELS } from "@/lib/productTypes";
import { cn, formatCompact, formatPct, scoreTone, toneText } from "@/lib/format";
import { GregsPickBadge } from "@/components/ui/Badges";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Sparkline } from "@/components/ui/Sparkline";
import { SectionNav } from "@/components/ui/SectionNav";

const SECTIONS = [
  { id: "scores", label: "Scores & format" },
  { id: "gap", label: "The Gap Closer" },
  { id: "market", label: "Gumroad snapshot" },
  { id: "demand", label: "Demand signals" },
  { id: "product", label: "Product blueprint" },
  { id: "accelerators", label: "Accelerator Stack" },
  { id: "offer", label: "Ladder & pricing" },
  { id: "launch", label: "Launch starter" },
  { id: "manual", label: "Manual checks" },
];

function Section({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow ? <div className="label-eyebrow">{eyebrow}</div> : null}
      <h2 className="mt-1 font-display text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function LiveTag({ live, label }: { live: boolean; label: string }) {
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", live ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-ink-muted")}>
      {label} · {live ? "live" : "fixture"}
    </span>
  );
}

const INTENT_STYLE: Record<AutocompleteSignal["clusters"][number]["intent"], string> = {
  buying: "border-brand-200 bg-brand-50 text-brand-800",
  problem: "border-rose-200 bg-rose-50 text-rose-800",
  informational: "border-slate-200 bg-white text-ink-soft",
};

export function ProductReportView({ report: r }: { report: ProductReport }) {
  const g = r.signals.gumroad;
  const best = r.scores.formats[0];
  return (
    <article className="container-page py-10">
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">{r.niche}</span>
          <span className="chip">{FORMAT_LABELS[r.scores.bestFormat]}</span>
          <span className="chip">${r.pricing.recommendedUsd} · {r.pricing.tier}</span>
          {r.singaporeAngle ? <span className="chip">🇸🇬 Singapore angle</span> : null}
          {r.gregsPick ? <GregsPickBadge /> : null}
        </div>
        <div className="mt-4 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-4xl">{r.emoji}</div>
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{r.title}</h1>
            <p className="mt-2 max-w-2xl text-lg text-ink-soft">{r.tagline}</p>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm font-medium text-brand-900">
          {r.positioning.statement}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
          <span>Seed query <b className="text-ink">“{r.seedQuery}”</b></span>
          <span>Confidence <b className="text-ink">{r.confidence}%</b></span>
          <span className="flex flex-wrap gap-1.5">
            {r.sources.map((s) => {
              const [name, mode] = s.split(":");
              return <LiveTag key={s} live={mode === "live"} label={name.replace(/_/g, " ")} />;
            })}
          </span>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[210px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SectionNav sections={SECTIONS} />
            <div className="mt-6 card p-4 text-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Snapshot</div>
              <Row k="Overall" v={`${r.scores.overall}/100`} />
              <Row k="Competitors" v={formatCompact(g.total)} />
              <Row k="Market median" v={g.price.median ? `$${g.price.median}` : "—"} />
              <Row k="Recommend" v={`$${r.pricing.recommendedUsd}`} />
            </div>
          </div>
        </aside>

        <div className="space-y-14">
          <Section id="scores" eyebrow="Winner criteria" title="Should you build this?">
            <div className="card p-6">
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="flex justify-center"><ScoreGauge value={r.scores.overall} /></div>
                <div className="grid gap-4">
                  <ScoreBar label="Trend" value={r.scores.trend.value} rationale={r.scores.trend.rationale} />
                  <ScoreBar label="Buying intent" value={r.scores.buyingIntent.value} rationale={r.scores.buyingIntent.rationale} />
                  <ScoreBar label="Competition (openness)" value={r.scores.competition.value} rationale={r.scores.competition.rationale} />
                  <ScoreBar label="Gap strength" value={r.scores.gapStrength.value} rationale={r.scores.gapStrength.rationale} />
                  <ScoreBar label="Unique value" value={r.scores.uniqueValue.value} rationale={r.scores.uniqueValue.rationale} />
                </div>
              </div>
            </div>
            <div className="mt-4 card p-5">
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-semibold text-ink">Best format: <span className="text-brand-700">{FORMAT_LABELS[best.format]}</span></div>
                <span className="text-xs text-ink-muted">ranked from demand language, not assumed</span>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {r.scores.formats.map((f, i) => (
                  <div key={f.format} className={cn("flex items-center justify-between rounded-lg border px-3 py-2 text-sm", i === 0 ? "border-brand-300 bg-brand-50/60" : "border-slate-200")}>
                    <span className="capitalize text-ink">{f.format.replace("-", " ")}</span>
                    <span className={cn("font-display font-bold tabular", toneText(scoreTone(f.score)))}>{f.score.toFixed(1)}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-muted">{best.rationale}</p>
            </div>
          </Section>

          <Section id="gap" eyebrow="Desire − pain = product" title="The Gap Closer">
            <div className="grid gap-4 md:grid-cols-2">
              <ListCard title="Top desires" dot="✦" items={r.gapCloser.topDesires} />
              <ListCard title="Common pains incumbents leave open" dot="✗" items={r.gapCloser.commonPains} />
            </div>
            <div className="mt-4 rounded-2xl bg-ink p-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-300">The gap</div>
              <p className="mt-1 font-display text-xl font-bold leading-snug">{r.gapCloser.theGap}</p>
              <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-300">Value proposition</div>
              <p className="mt-1 text-slate-200">{r.gapCloser.valueProposition}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Mini k="Avatar" v={r.positioning.avatar} />
              <Mini k="Dream outcome" v={r.positioning.dreamOutcome} />
              <Mini k="Hated friction" v={r.positioning.hatedFriction} />
            </div>
          </Section>

          <Section id="market" eyebrow="Real competition" title="Gumroad snapshot">
            <div className="grid gap-3 sm:grid-cols-4">
              <Stat k="Listings" v={formatCompact(g.total)} />
              <Stat k="Median price" v={g.price.median ? `$${g.price.median}` : "—"} sub={g.price.median ? `p25 $${g.price.p25} · p75 $${g.price.p75}` : "no paid sample"} />
              <Stat k="Avg rating (top)" v={g.avgRating != null ? `${g.avgRating}★` : "—"} sub={`${formatCompact(g.reviewVolume)} reviews`} />
              <Stat k="Snapshot" v={g.live ? "Live" : "Fixture"} sub={new Date(g.fetchedAt).toLocaleDateString()} />
            </div>
            {g.sample.length ? (
              <div className="mt-4 card overflow-hidden">
                <div className="border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">Top listings for “{g.query}”</div>
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-xs uppercase tracking-wide text-ink-muted"><th className="px-5 py-2 font-medium">Product</th><th className="px-5 py-2 font-medium">Seller</th><th className="px-5 py-2 text-right font-medium">Price</th><th className="px-5 py-2 text-right font-medium">Rating</th></tr></thead>
                  <tbody>
                    {g.sample.slice(0, 8).map((p, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="px-5 py-2.5 text-ink">{p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">{p.name}</a> : p.name}</td>
                        <td className="px-5 py-2.5 text-ink-muted">{p.seller || "—"}</td>
                        <td className="px-5 py-2.5 text-right tabular text-ink-soft">{p.priceUsd ? `$${p.priceUsd}` : "free"}</td>
                        <td className="px-5 py-2.5 text-right tabular text-ink-soft">{p.ratingAvg != null ? `${p.ratingAvg}★ (${p.ratingCount})` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="mt-3 text-sm text-ink-muted">No listings returned — this query is effectively uncontested on Gumroad.</p>}
            {g.adjacentTags.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-ink-muted">Adjacent tags:</span>
                {g.adjacentTags.map((t) => <span key={t.tag} className="chip">{t.tag} <span className="text-ink-muted">{formatCompact(t.count)}</span></span>)}
              </div>
            ) : null}
          </Section>

          <Section id="demand" eyebrow="What people type" title="Demand signals">
            <div className="space-y-4">
              {r.signals.autocomplete.map((a) => (
                <div key={a.source} className="card p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold capitalize text-ink">{a.source} autocomplete <span className="font-normal text-ink-muted">· “{a.seed}”</span></div>
                    <LiveTag live={a.live} label={a.source === "amazon" ? "physical adjacency" : "intent"} />
                  </div>
                  {a.clusters.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.clusters.slice(0, 14).map((c) => (
                        <span key={c.label} className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs", INTENT_STYLE[c.intent])} title={c.phrases.join(" · ")}>
                          {c.label} <span className="opacity-60">{c.phrases.length}</span>
                        </span>
                      ))}
                    </div>
                  ) : <p className="mt-2 text-sm text-ink-muted">{a.source === "amazon" ? "No adjacent physical-goods market — a digital-only niche." : "No suggestions recorded."}</p>}
                </div>
              ))}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="card p-5">
                  <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Search interest · 12 mo</span><span className={cn("font-display text-sm font-bold", r.signals.searchGrowthYoY >= 0 ? "text-brand-600" : "text-rose-500")}>{formatPct(r.signals.searchGrowthYoY)} YoY</span></div>
                  <div className="mt-3">{r.signals.trend.length >= 2 ? <Sparkline data={r.signals.trend} /> : null}</div>
                </div>
                <div className="card overflow-hidden">
                  <div className="border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">Keywords</div>
                  <table className="w-full text-sm"><tbody>
                    {r.signals.keywords.map((k) => (
                      <tr key={k.term} className="border-t border-slate-100 first:border-0"><td className="px-5 py-2 text-ink">{k.term}</td><td className="px-3 py-2 text-right tabular text-ink-soft">{formatCompact(k.volume)}</td><td className="px-5 py-2 text-right tabular font-medium text-brand-600">{formatPct(k.growth)}</td></tr>
                    ))}
                  </tbody></table>
                </div>
              </div>
              {r.signals.reviewPains.length ? (
                <div className="card p-5">
                  <div className="text-sm font-semibold text-ink">What 1–3★ reviews of incumbents complain about <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">fixture · manual</span></div>
                  <ul className="mt-2 space-y-1.5">
                    {r.signals.reviewPains.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-soft"><span className={cn("mt-1 h-1.5 w-1.5 shrink-0 rounded-full", p.frequency === "High" ? "bg-rose-500" : p.frequency === "Medium" ? "bg-amber-400" : "bg-slate-300")} />{p.complaint} <span className="text-xs text-ink-muted">({p.frequency.toLowerCase()})</span></li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Section>

          <Section id="product" eyebrow="Blueprint" title={`The ${FORMAT_LABELS[r.scores.bestFormat].toLowerCase()}`}>
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Title variants</div>
              <ul className="mt-2 space-y-1">{r.titleVariants.map((t) => <li key={t} className="font-display font-semibold text-ink">{t}</li>)}</ul>
            </div>
            <ol className="mt-4 space-y-2">
              {r.outline.map((s, i) => (
                <li key={i} className="card flex gap-4 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                  <div><div className="font-semibold text-ink">{s.title}</div><p className="mt-0.5 text-sm leading-6 text-ink-soft">{s.purpose}</p></div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="accelerators" eyebrow="80% of perceived value is friction removal" title="The Accelerator Stack">
            <div className="grid gap-4 md:grid-cols-3">
              <Acc icon="🧰" k="Done-for-you" a={r.accelerators.doneForYou} />
              <Acc icon="🧭" k="Cognitive clarity" a={r.accelerators.cognitiveClarity} />
              <Acc icon="🫶" k="Emotional assurance" a={r.accelerators.emotionalAssurance} />
            </div>
          </Section>

          <Section id="offer" eyebrow="Free → tripwire → core → backend" title="Value ladder & pricing">
            <div className="space-y-2">
              {r.ladder.map((t, i) => (
                <div key={t.name} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4" style={{ marginLeft: `${i * 14}px` }}>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{t.kind}</span><div className="font-semibold text-ink">{t.name}</div><p className="text-sm text-ink-muted">{t.description}</p></div>
                  <div className="font-display text-lg font-bold text-ink">{t.price}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-sm font-semibold text-ink">Recommended core price</div>
                <div className="font-display text-2xl font-bold text-brand-700">${r.pricing.recommendedUsd}</div>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{r.pricing.anchor}</p>
              <p className="mt-3 text-sm text-ink-soft"><b className="text-ink">Platforms:</b> {r.platforms.primary} <span className="text-ink-muted">(primary)</span>{r.platforms.secondary.length ? `, ${r.platforms.secondary.join(", ")}` : ""}. {r.platforms.rationale}</p>
            </div>
          </Section>

          <Section id="launch" eyebrow="Symptoms before solutions" title="Launch starter">
            <div className="card p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Symptom hook</div>
              <p className="mt-1 font-display text-lg font-semibold text-ink">“{r.marketing.symptomHook}”</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <ListCard title="Pinterest pin titles" dot="📌" items={r.marketing.pinterestPinTitles} flat />
                <ListCard title="Short-form angles" dot="🎬" items={r.marketing.shortFormAngles} flat />
              </div>
              <p className="mt-4 text-sm text-ink-soft">Comment-to-DM keyword: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">{r.marketing.commentKeyword}</code> → delivers the free tier.</p>
            </div>
          </Section>

          <Section id="manual" eyebrow="Fixture-backed sources" title="Validate by hand (15 minutes)">
            <ol className="space-y-2">
              {r.manualChecks.map((m, i) => <li key={i} className="card flex gap-3 p-4 text-sm leading-6 text-ink-soft"><span className="font-display font-bold text-brand-600">{i + 1}.</span>{m}</li>)}
            </ol>
            {r.singaporeAngle ? <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-ink-soft"><b className="text-ink">🇸🇬 Singapore angle:</b> {r.singaporeAngle}</p> : null}
          </Section>

          <p className="border-t border-slate-100 pt-6 text-xs leading-5 text-ink-muted">
            Scores, prices and market figures are generated from harvested signals and recorded marketplace snapshots; Gumroad data reflects the fetch date shown. Not financial or business advice.
          </p>
        </div>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="mt-2 flex items-center justify-between"><span className="text-ink-soft">{k}</span><span className="font-medium tabular text-ink">{v}</span></div>;
}
function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return <div className="card p-4"><div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{k}</div><div className="mt-1 font-display text-xl font-bold text-ink">{v}</div>{sub ? <div className="text-xs text-ink-muted">{sub}</div> : null}</div>;
}
function Mini({ k, v }: { k: string; v: string }) {
  return <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wider text-brand-600">{k}</div><p className="mt-1 text-sm leading-6 text-ink-soft">{v}</p></div>;
}
function Acc({ icon, k, a }: { icon: string; k: string; a: { name: string; description: string } }) {
  return <div className="card p-5"><div className="text-2xl">{icon}</div><div className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-600">{k}</div><div className="mt-1 font-display font-bold text-ink">{a.name}</div><p className="mt-1 text-sm leading-6 text-ink-soft">{a.description}</p></div>;
}
function ListCard({ title, items, dot, flat }: { title: string; items: string[]; dot: string; flat?: boolean }) {
  return (
    <div className={flat ? "" : "card p-5"}>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{title}</div>
      <ul className="mt-2 space-y-1.5">{items.map((it, i) => <li key={i} className="flex gap-2 text-sm leading-6 text-ink-soft"><span aria-hidden>{dot}</span>{it}</li>)}</ul>
    </div>
  );
}
