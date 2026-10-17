import type { IdeaScores } from "@/lib/types";

export function RadarChart({
  scores,
  size = 240,
}: {
  scores: IdeaScores;
  size?: number;
}) {
  const axes = [
    { label: "Opportunity", v: scores.opportunity.value },
    { label: "Problem", v: scores.problem.value },
    { label: "Feasibility", v: scores.feasibility.value },
    { label: "Why Now", v: scores.whyNow.value },
  ];
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 34;
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, val: number): [number, number] => {
    const rr = r * (val / 10);
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))];
  };

  const poly = axes.map((a, i) => pt(i, a.v).join(",")).join(" ");
  const rings = [2.5, 5, 7.5, 10];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Score radar">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => pt(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={1}
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />;
      })}
      <polygon points={poly} fill="rgba(16,185,129,0.18)" stroke="#059669" strokeWidth={2} strokeLinejoin="round" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, a.v);
        return <circle key={i} cx={x} cy={y} r={3.5} fill="#059669" />;
      })}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 11.6);
        return (
          <text
            key={a.label}
            x={x}
            y={y}
            textAnchor={Math.abs(x - cx) < 4 ? "middle" : x > cx ? "start" : "end"}
            dominantBaseline="middle"
            className="fill-ink-soft"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}
