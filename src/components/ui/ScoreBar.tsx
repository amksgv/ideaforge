import { cn, scoreTone, toneBar, toneText } from "@/lib/format";

export function ScoreBar({
  label,
  value,
  rationale,
}: {
  label: string;
  value: number; // 0-10
  rationale?: string;
}) {
  const tone = scoreTone(value);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className={cn("font-display text-sm font-bold tabular", toneText(tone))}>
          {value.toFixed(1)}
          <span className="text-ink-muted">/10</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", toneBar(tone))}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      {rationale ? (
        <p className="mt-1.5 text-xs leading-5 text-ink-muted">{rationale}</p>
      ) : null}
    </div>
  );
}
