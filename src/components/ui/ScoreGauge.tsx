import { cn, overallTone, toneText } from "@/lib/format";

const TONE_STROKE = {
  high: "#059669",
  mid: "#f59e0b",
  low: "#f43f5e",
} as const;

export function ScoreGauge({
  value,
  size = 132,
  label = "Overall",
}: {
  value: number; // 0-100
  size?: number;
  label?: string;
}) {
  const tone = overallTone(value);
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);

  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f6" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={TONE_STROKE[tone]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display text-3xl font-bold tabular", toneText(tone))}>
            {value}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            / 100
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </span>
    </div>
  );
}
