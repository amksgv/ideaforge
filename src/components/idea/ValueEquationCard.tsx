import type { ValueEquation } from "@/lib/types";
import { cn, scoreTone, toneText } from "@/lib/format";

function Term({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </div>
      <div className="mt-1 text-sm leading-5 text-ink">{text}</div>
    </div>
  );
}

export function ValueEquationCard({ ve }: { ve: ValueEquation }) {
  const tone = scoreTone(ve.score);
  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          Value = (Dream Outcome × Likelihood) ÷ (Time × Effort)
        </div>
        <div className="rounded-2xl bg-brand-50/60 p-4">
          <div className="flex items-stretch gap-2">
            <Term label="Dream outcome" text={ve.dreamOutcome} />
            <div className="flex items-center text-lg font-bold text-ink-muted">×</div>
            <Term label="Perceived likelihood" text={ve.perceivedLikelihood} />
          </div>
          <div className="my-3 h-px bg-slate-300" />
          <div className="flex items-stretch gap-2">
            <Term label="Time delay" text={ve.timeDelay} />
            <div className="flex items-center text-lg font-bold text-ink-muted">×</div>
            <Term label="Effort & sacrifice" text={ve.effortAndSacrifice} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-sm text-ink-soft">Desirability score</span>
        <span className={cn("font-display text-lg font-bold tabular", toneText(tone))}>
          {ve.score.toFixed(1)}<span className="text-ink-muted">/10</span>
        </span>
      </div>
    </div>
  );
}
