import { formatCompact, formatPct } from "@/lib/format";
import type { IdeaScores, Level } from "@/lib/types";
import type { SignalBundle } from "./aggregate";

const clamp = (x: number, min = 0, max = 10) => Math.max(min, Math.min(max, x));
const r1 = (x: number) => Math.round(x * 10) / 10;
const levelN: Record<Level, number> = { Low: 0, Medium: 1, High: 2 };

/**
 * Turn an aggregated SignalBundle into the four 0-10 idea scores plus a 0-100
 * composite. Deterministic and transparent — every score carries a rationale
 * that cites the underlying numbers.
 */
export function deriveScores(b: SignalBundle): IdeaScores {
  const m = b.metrics;

  // Opportunity = market size (log volume) blended with growth tailwind.
  const volScore = clamp((Math.log10(Math.max(m.totalSearchVolume, 10)) / 5) * 10);
  const growthScore = clamp(5 + m.searchGrowthYoY / 60);
  const opportunity = clamp(r1(volScore * 0.6 + growthScore * 0.4));

  // Problem = breadth of pain signals + community engagement depth.
  const mentionsScore = clamp(Math.log10(Math.max(m.redditMentions, 1) + 1) * 4);
  const problem = clamp(r1(4 + m.painCount * 0.35 + mentionsScore * 0.4));

  // Feasibility = inverse of founder burden + keyword competition.
  const tech = levelN[b.brief.founderFit.technicalSkill];
  const inv = levelN[b.brief.founderFit.investment];
  const highComp = b.keywords.filter((k) => k.competition === "High").length;
  const compPenalty = b.keywords.length ? (highComp / b.keywords.length) * 2 : 0;
  const feasibility = clamp(r1(9.2 - tech * 0.9 - inv * 0.8 - compPenalty));

  // Why Now = growth rate + 12-month trend slope.
  const whyNow = clamp(r1(5 + m.searchGrowthYoY / 70 + m.trendSlope * 3));

  const overall = Math.round(
    (opportunity * 0.3 + problem * 0.2 + feasibility * 0.2 + whyNow * 0.3) * 10,
  );

  return {
    opportunity: {
      value: opportunity,
      rationale: `${formatCompact(m.totalSearchVolume)} monthly searches and ${formatPct(
        m.searchGrowthYoY,
      )} YoY across the tracked keyword set.`,
    },
    problem: {
      value: problem,
      rationale: `${m.painCount} distinct pain signals and ~${formatCompact(
        m.redditMentions,
      )} Reddit mentions/mo across tracked communities.`,
    },
    feasibility: {
      value: feasibility,
      rationale: `${b.brief.founderFit.technicalSkill} technical lift, ${b.brief.founderFit.investment.toLowerCase()} capital — ${b.brief.businessFit.execution.label.toLowerCase()}.`,
    },
    whyNow: {
      value: whyNow,
      rationale: `Search ${formatPct(m.searchGrowthYoY)} YoY with a ${
        m.trendSlope >= 0 ? "rising" : "cooling"
      } 12-month trajectory.`,
    },
    overall,
  };
}

/** Pipeline confidence (0-100) from source coverage + signal confidence. */
export function deriveConfidence(b: SignalBundle): number {
  const coverage = Math.min(1, b.sources.length / 5);
  return Math.round(0.55 * b.metrics.avgSignalConfidence + 0.45 * coverage * 100);
}
