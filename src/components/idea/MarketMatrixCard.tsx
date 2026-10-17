import type { MarketMatrix } from "@/lib/types";

const QUADRANTS = [
  { key: "Commodity Play", col: 0, row: 0, hint: "low unique · high value" },
  { key: "Category King", col: 1, row: 0, hint: "high unique · high value" },
  { key: "Low Impact", col: 0, row: 1, hint: "low unique · low value" },
  { key: "Tech Novelty", col: 1, row: 1, hint: "high unique · low value" },
] as const;

export function MarketMatrixCard({ matrix }: { matrix: MarketMatrix }) {
  const size = 280;
  const pad = 30;
  const inner = size - pad * 2;
  const px = pad + (matrix.uniqueness / 10) * inner;
  const py = pad + (1 - matrix.value / 10) * inner;

  return (
    <div className="grid gap-5 sm:grid-cols-[280px_1fr] sm:items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
        <rect x={pad} y={pad} width={inner} height={inner} fill="#f8fafc" stroke="#e2e8f0" />
        <line x1={pad + inner / 2} y1={pad} x2={pad + inner / 2} y2={pad + inner} stroke="#e2e8f0" />
        <line x1={pad} y1={pad + inner / 2} x2={pad + inner} y2={pad + inner / 2} stroke="#e2e8f0" />
        {QUADRANTS.map((q) => {
          const cx = pad + q.col * (inner / 2) + inner / 4;
          const cy = pad + q.row * (inner / 2) + inner / 4;
          const active = q.key === matrix.quadrant;
          return (
            <text
              key={q.key}
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="middle"
              className={active ? "fill-brand-700" : "fill-slate-400"}
              style={{ fontSize: 12, fontWeight: active ? 700 : 500 }}
            >
              {q.key}
            </text>
          );
        })}
        {/* axis labels */}
        <text x={pad} y={size - 6} className="fill-ink-muted" style={{ fontSize: 10 }}>← uniqueness →</text>
        <text x={6} y={pad + 4} className="fill-ink-muted" style={{ fontSize: 10 }} transform={`rotate(-90 6 ${pad + 4})`}>← value →</text>
        <circle cx={px} cy={py} r={7} fill="#059669" stroke="#fff" strokeWidth={2.5} />
      </svg>

      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          {matrix.quadrant}
        </div>
        <p className="mt-3 text-sm leading-6 text-ink-soft">{matrix.rationale}</p>
        <div className="mt-3 flex gap-4 text-xs text-ink-muted">
          <span>Uniqueness <b className="text-ink">{matrix.uniqueness}/10</b></span>
          <span>Value <b className="text-ink">{matrix.value}/10</b></span>
        </div>
      </div>
    </div>
  );
}
