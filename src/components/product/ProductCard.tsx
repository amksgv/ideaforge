import Link from "next/link";
import type { ProductSummary } from "@/lib/productTypes";
import { FORMAT_LABELS } from "@/lib/productTypes";
import { cn, formatCompact, overallTone, toneText } from "@/lib/format";
import { GregsPickBadge } from "@/components/ui/Badges";

export function ProductCard({ product: p }: { product: ProductSummary }) {
  const tone = overallTone(p.scores.overall);
  const minis = [
    { k: "Trend", v: p.scores.trend.value },
    { k: "Intent", v: p.scores.buyingIntent.value },
    { k: "Open", v: p.scores.competition.value },
    { k: "Gap", v: p.scores.gapStrength.value },
  ];
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-pop"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-2xl">{p.emoji}</div>
        <div className="flex flex-col items-end">
          <span className={cn("font-display text-2xl font-bold leading-none tabular", toneText(tone))}>{p.scores.overall}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-ink-muted">overall</span>
        </div>
      </div>

      <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink line-clamp-2 group-hover:text-brand-700">{p.title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-ink-muted line-clamp-2">{p.tagline}</p>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {minis.map((m) => (
          <div key={m.k} className="rounded-lg bg-slate-50 px-2 py-1.5 text-center">
            <div className="font-display text-sm font-bold tabular text-ink">{m.v.toFixed(1)}</div>
            <div className="text-[10px] uppercase tracking-wide text-ink-muted">{m.k}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <span className="chip">{p.niche}</span>
        <span className="chip" title={FORMAT_LABELS[p.bestFormat]}>{p.bestFormat.replace("-", " ")}</span>
        {p.gregsPick ? <GregsPickBadge /> : null}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-medium text-ink-soft">
        <span>💵 ${p.recommendedUsd} · {p.priceTier}</span>
        <span title="Gumroad listings for the seed query">🏪 {formatCompact(p.competitorCount)} competitors</span>
      </div>
    </Link>
  );
}
