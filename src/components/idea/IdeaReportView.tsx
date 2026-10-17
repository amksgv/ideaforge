import type { IdeaReport } from "@/lib/types";
import {
  cn,
  formatCompact,
  formatPct,
  levelDots,
  scoreTone,
  toneText,
} from "@/lib/format";
import { GregsPickBadge, SourceTag } from "@/components/ui/Badges";
import { RadarChart } from "@/components/ui/RadarChart";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { Sparkline } from "@/components/ui/Sparkline";
import { SectionNav } from "@/components/ui/SectionNav";
import { MarketMatrixCard } from "./MarketMatrixCard";
import { ValueEquationCard } from "./ValueEquationCard";

const SECTIONS = [
  { id: "opportunity", label: "Opportunity" },
  { id: "business-fit", label: "Business Fit" },
  { id: "why-now", label: "Why Now" },
  { id: "signals", label: "Proof & Signals" },
  { id: "market", label: "Market & Gap" },
  { id: "execution", label: "Execution Plan" },
  { id: "frameworks", label: "Frameworks" },
  { id: "community", label: "Community Signals" },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {eyebrow ? <div className="label-eyebrow">{eyebrow}</div> : null}
      <h2 className="mt-1 font-display text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Dots({ level }: { level: "Low" | "Medium" | "High" }) {
  const filled = levelDots(level);
  return (
    <span className="inline-flex gap-1" aria-label={level}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i <= filled ? "bg-brand-500" : "bg-slate-200",
          )}
        />
      ))}
    </span>
  );
}

function competitionTone(c: "Low" | "Medium" | "High") {
  return c === "Low" ? "text-brand-600" : c === "Medium" ? "text-amber-500" : "text-rose-500";
}

export function IdeaReportView({ report }: { report: IdeaReport }) {
  const r = report;
  const bf = r.businessFit;
  const distinctSources = [...new Set(r.sources.map((s) => s.split(":")[0]))];
  // Single source of truth for YoY (matches the Proof & Signals card). Falls
  // back to the trend endpoints only for reports generated before this field.
  const yoy =
    typeof r.searchGrowthYoY === "number"
      ? r.searchGrowthYoY
      : r.trend.length >= 2
        ? Math.round((r.trend[r.trend.length - 1].value / Math.max(r.trend[0].value, 1) - 1) * 100)
        : 0;

  return (
    <article className="container-page py-10">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">{r.category}</span>
          <span className="chip">{r.businessModel}</span>
          {r.gregsPick ? <GregsPickBadge /> : null}
        </div>
        <div className="mt-4 flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-4xl">
            {r.emoji}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {r.title}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-ink-soft">{r.tagline}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
          <span>Pipeline confidence <b className="text-ink">{r.confidence}%</b></span>
          <span className="hidden sm:inline">•</span>
          <span className="flex flex-wrap items-center gap-1.5">
            Synthesized from
            {distinctSources.map((s) => (
              <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-ink-soft">
                {s.replace("_", " ")}
              </span>
            ))}
          </span>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[210px_1fr]">
        {/* Sticky nav */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SectionNav sections={SECTIONS} />
            <div className="mt-6 card p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Snapshot
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink-soft">Overall</span>
                <span className={cn("font-display font-bold tabular", toneText(scoreTone(r.scores.overall / 10)))}>{r.scores.overall}/100</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-ink-soft">Revenue</span>
                <span className="font-medium text-ink">{bf.revenuePotential.label}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-14">
          {/* Opportunity + scores */}
          <Section id="opportunity" eyebrow="The Opportunity" title="Why this idea, right now">
            <div className="prose-report space-y-4">
              {r.narrative.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 card p-6">
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                <div className="flex items-center justify-center gap-6">
                  <ScoreGauge value={r.scores.overall} />
                  <RadarChart scores={r.scores} size={210} />
                </div>
                <div className="grid gap-4">
                  <ScoreBar label="Opportunity" value={r.scores.opportunity.value} rationale={r.scores.opportunity.rationale} />
                  <ScoreBar label="Problem" value={r.scores.problem.value} rationale={r.scores.problem.rationale} />
                  <ScoreBar label="Feasibility" value={r.scores.feasibility.value} rationale={r.scores.feasibility.rationale} />
                  <ScoreBar label="Why Now" value={r.scores.whyNow.value} rationale={r.scores.whyNow.rationale} />
                </div>
              </div>
            </div>
          </Section>

          {/* Business fit */}
          <Section id="business-fit" eyebrow="Business Fit" title="Can you actually win with this?">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: "💰", label: "Revenue Potential", item: bf.revenuePotential },
                { icon: "🛠️", label: "Execution Difficulty", item: bf.executionDifficulty },
                { icon: "🚀", label: "Go-To-Market", item: bf.goToMarket },
                { icon: "🧬", label: "Founder Fit", item: bf.founderFit },
              ].map((x) => (
                <div key={x.label} className="card p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span>{x.icon}</span>
                    {x.label}
                  </div>
                  <div className="mt-2 font-display text-base font-bold text-brand-700">{x.item.label}</div>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{x.item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 card flex flex-wrap items-center gap-x-8 gap-y-3 p-5">
              <div className="flex items-center gap-2 text-sm"><span className="text-ink-muted">Capital</span> <Dots level={r.founderFit.investment} /> <span className="font-medium text-ink">{r.founderFit.investment}</span></div>
              <div className="flex items-center gap-2 text-sm"><span className="text-ink-muted">Technical lift</span> <Dots level={r.founderFit.technicalSkill} /> <span className="font-medium text-ink">{r.founderFit.technicalSkill}</span></div>
              <div className="flex items-center gap-2 text-sm"><span className="text-ink-muted">Commitment</span> <span className="font-medium text-ink">{r.founderFit.timeCommitment}</span></div>
            </div>
          </Section>

          {/* Why now */}
          <Section id="why-now" eyebrow="Timing" title="Why Now?">
            <p className="text-[15px] leading-7 text-ink-soft">{r.whyNow.summary}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ul className="space-y-2">
                {r.whyNow.drivers.map((d, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-6 text-ink-soft">
                    <span className="mt-1 text-brand-500">▲</span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Search interest · 12 mo</span>
                  <span className={cn("font-display text-sm font-bold", yoy >= 0 ? "text-brand-600" : "text-rose-500")}>
                    {formatPct(yoy)} YoY
                  </span>
                </div>
                <div className="mt-3">
                  {r.trend.length >= 2 ? (
                    <Sparkline data={r.trend} />
                  ) : (
                    <p className="text-sm text-ink-muted">No trend series available.</p>
                  )}
                </div>
              </div>
            </div>
          </Section>

          {/* Signals */}
          <Section id="signals" eyebrow="Validation" title="Proof & Signals">
            <p className="text-[15px] leading-7 text-ink-soft">{r.proofSignals.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {r.proofSignals.signals.map((s, i) => (
                <div key={i} className="card flex items-start justify-between gap-3 p-4">
                  <div>
                    <SourceTag source={s.source} />
                    <div className="mt-2 text-sm font-medium text-ink">{s.metric}</div>
                    {s.detail ? <div className="text-xs text-ink-muted">{s.detail}</div> : null}
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold tabular text-ink">{s.value}</div>
                    {typeof s.growth === "number" ? (
                      <div className={cn("text-xs font-semibold", s.growth >= 0 ? "text-brand-600" : "text-rose-500")}>{formatPct(s.growth)}</div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            {/* Keywords */}
            <div className="mt-5 card overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Keyword demand
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-ink-muted">
                    <th className="px-5 py-2 font-medium">Keyword</th>
                    <th className="px-5 py-2 text-right font-medium">Volume / mo</th>
                    <th className="px-5 py-2 text-right font-medium">YoY</th>
                    <th className="px-5 py-2 text-right font-medium">Competition</th>
                  </tr>
                </thead>
                <tbody>
                  {r.keywords.map((k) => (
                    <tr key={k.term} className="border-t border-slate-100">
                      <td className="px-5 py-2.5 text-ink">{k.term}</td>
                      <td className="px-5 py-2.5 text-right tabular text-ink-soft">{formatCompact(k.volume)}</td>
                      <td className="px-5 py-2.5 text-right tabular font-medium text-brand-600">{formatPct(k.growth)}</td>
                      <td className={cn("px-5 py-2.5 text-right font-medium", competitionTone(k.competition))}>{k.competition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Market & gap */}
          <Section id="market" eyebrow="Market" title="Market size & the gap">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { k: "TAM", v: r.marketSize.tam },
                { k: "SAM", v: r.marketSize.sam },
                { k: "SOM", v: r.marketSize.som },
              ].map((m) => (
                <div key={m.k} className="card p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{m.k}</div>
                  <div className="mt-1 font-display text-lg font-bold text-ink">{m.v}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-muted">{r.marketSize.note}</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="card p-5">
                <div className="text-sm font-semibold text-ink">The market gap</div>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{r.marketGap}</p>
              </div>
              <div className="card p-5">
                <div className="text-sm font-semibold text-ink">Main competitor</div>
                <div className="mt-2 font-display font-bold text-ink">{r.competitor.name}</div>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{r.competitor.note}</p>
              </div>
            </div>
          </Section>

          {/* Execution */}
          <Section id="execution" eyebrow="Build It" title="Execution Plan">
            <p className="text-[15px] leading-7 text-ink-soft">{r.executionPlan.summary}</p>
            <ol className="mt-4 space-y-3">
              {r.executionPlan.steps.map((step, i) => (
                <li key={i} className="card flex gap-4 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{step.title}</div>
                    <p className="mt-0.5 text-sm leading-6 text-ink-soft">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Value ladder */}
            <div className="mt-6">
              <div className="label-eyebrow">The Value Ladder</div>
              <p className="mt-1 text-sm text-ink-muted">{r.frameworks.valueLadderNote}</p>
              <div className="mt-3 space-y-2">
                {r.offer.map((o, i) => (
                  <div
                    key={o.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
                    style={{ marginLeft: `${i * 14}px` }}
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">{o.kind}</span>
                      <div className="font-semibold text-ink">{o.name}</div>
                      <p className="text-sm text-ink-muted">{o.description}</p>
                    </div>
                    <div className="font-display text-lg font-bold text-ink">{o.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Frameworks */}
          <Section id="frameworks" eyebrow="Frameworks" title="Framework Fit">
            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-sm font-semibold text-ink">The Value Equation</div>
                <div className="mt-3"><ValueEquationCard ve={r.frameworks.valueEquation} /></div>
              </div>
              <div className="card p-6">
                <div className="text-sm font-semibold text-ink">The Market Matrix</div>
                <div className="mt-3"><MarketMatrixCard matrix={r.frameworks.marketMatrix} /></div>
              </div>
              <div className="card p-6">
                <div className="text-sm font-semibold text-ink">The A.C.P. Framework</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    { k: "Audience", v: r.frameworks.acp.audience },
                    { k: "Community", v: r.frameworks.acp.community },
                    { k: "Product", v: r.frameworks.acp.product },
                  ].map((x) => (
                    <div key={x.k} className="rounded-xl bg-slate-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">{x.k}</div>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">{x.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Community signals */}
          <Section id="community" eyebrow="Where the demand lives" title="Community Signals">
            <div className="space-y-4">
              {r.communitySignals.map((c, i) => (
                <div key={i} className="card p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold text-ink">{c.name}</div>
                    <span className="chip capitalize">{c.platform} · {c.size}</span>
                  </div>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <SignalList title="Key pains" items={c.keyPains} dot="🔴" />
                    <SignalList title="Money signals" items={c.moneySignals} dot="💸" />
                    <SignalList title="Fresh opportunities" items={c.freshOpportunities} dot="✨" />
                    <SignalList title="Most-wanted fixes" items={c.mostWantedFixes} dot="🛠️" />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <p className="border-t border-slate-100 pt-6 text-xs leading-5 text-ink-muted">
            Important: revenue estimates, scores, and market data are illustrative,
            generated by IdeaForge's pipeline from harvested signals and assumptions.
            Results vary by execution, timing, and market conditions. Not investment advice.
          </p>
        </div>
      </div>
    </article>
  );
}

function SignalList({ title, items, dot }: { title: string; items: string[]; dot: string }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{title}</div>
      <ul className="mt-1.5 space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm leading-6 text-ink-soft">
            <span aria-hidden>{dot}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
