import { isLive, llmEnabled } from "@/lib/env";
import type {
  CommunitySignal,
  IdeaReport,
  IdeaScores,
  MarketMatrix,
  MarketQuadrant,
  OfferTier,
  ValueEquation,
} from "@/lib/types";
import type { SignalBundle } from "./aggregate";
import { llmJSON } from "./llm";
import { deriveConfidence } from "./scoring";

function quadrant(u: number, v: number): MarketQuadrant {
  if (u >= 6 && v >= 6) return "Category King";
  if (u >= 6 && v < 6) return "Tech Novelty";
  if (u < 6 && v >= 6) return "Commodity Play";
  return "Low Impact";
}

function buildMarketMatrix(b: SignalBundle): MarketMatrix {
  const { uniqueness, value, rationale } = b.brief.marketMatrix;
  return { uniqueness, value, quadrant: quadrant(uniqueness, value), rationale };
}

function buildValueEquation(b: SignalBundle, scores: IdeaScores): ValueEquation {
  const ve = b.brief.valueEquation;
  const score =
    ve.score ??
    Math.round(
      (scores.opportunity.value * 0.5 +
        scores.problem.value * 0.3 +
        scores.feasibility.value * 0.2) *
        10,
    ) / 10;
  return {
    dreamOutcome: ve.dreamOutcome,
    perceivedLikelihood: ve.perceivedLikelihood,
    timeDelay: ve.timeDelay,
    effortAndSacrifice: ve.effortAndSacrifice,
    score,
  };
}

function ladderNote(offer: OfferTier[]): string {
  const lead = offer.find((o) => o.kind === "lead");
  const core = offer.find((o) => o.kind === "core");
  const backend = offer.find((o) => o.kind === "backend");
  const parts: string[] = [];
  if (lead) parts.push(`capture with ${lead.name} (${lead.price})`);
  if (core) parts.push(`monetize on ${core.name} (${core.price})`);
  if (backend) parts.push(`expand ARPU via ${backend.name} (${backend.price})`);
  return parts.length
    ? `Ascend buyers: ${parts.join(" → ")}.`
    : "Layer a lead magnet beneath a recurring core offer, then expand ARPU upward.";
}

/** Deterministic, offline report assembly from the brief + collected bundle. */
export function synthesizeOffline(
  b: SignalBundle,
  scores: IdeaScores,
): IdeaReport {
  const brief = b.brief;
  return {
    id: brief.slug,
    slug: brief.slug,
    title: brief.title,
    tagline: brief.tagline,
    emoji: brief.emoji,
    category: brief.category,
    businessModel: brief.businessModel,
    tags: brief.tags,
    narrative: brief.narrative,
    scores,
    businessFit: {
      revenuePotential: brief.businessFit.revenue,
      executionDifficulty: brief.businessFit.execution,
      goToMarket: brief.businessFit.goToMarket,
      founderFit: brief.businessFit.founder,
    },
    offer: brief.offer,
    whyNow: brief.whyNow,
    proofSignals: { summary: brief.proofSummary, signals: b.signals },
    marketGap: brief.marketGap,
    executionPlan: brief.executionPlan,
    frameworks: {
      valueEquation: buildValueEquation(b, scores),
      marketMatrix: buildMarketMatrix(b),
      acp: brief.acp,
      valueLadderNote: ladderNote(brief.offer),
    },
    competitor: brief.competitor,
    marketSize: brief.marketSize,
    keywords: b.keywords,
    trend: b.trend,
    searchGrowthYoY: b.metrics.searchGrowthYoY,
    communitySignals: b.communitySignals,
    founderFit: brief.founderFit,
    gregsPick: brief.gregsPick ?? false,
    confidence: deriveConfidence(b),
    generatedAt: new Date().toISOString(),
    sources: b.sources,
  };
}

interface LlmDraft {
  narrative?: string;
  whyNowSummary?: string;
  whyNowDrivers?: string[];
  marketGap?: string;
  executionSummary?: string;
  executionSteps?: { title: string; detail: string }[];
  proofSummary?: string;
  communitySignals?: CommunitySignal[];
}

/**
 * Live synthesis: hand the collected raw material to the LLM and let it write
 * the qualitative narrative + community insights, then merge with the
 * deterministic quantitative layer (scores, keywords, trend, signals).
 */
async function synthesizeWithLLM(
  b: SignalBundle,
  scores: IdeaScores,
): Promise<IdeaReport> {
  const base = synthesizeOffline(b, scores);
  const material = {
    title: b.brief.title,
    tagline: b.brief.tagline,
    category: b.brief.category,
    keywords: b.keywords.slice(0, 8),
    trend: b.trend,
    metrics: b.metrics,
    communities: b.communitySignals.map((c) => ({
      platform: c.platform,
      name: c.name,
      size: c.size,
      samples: c.freshOpportunities,
    })),
  };

  const draft = await llmJSON<LlmDraft>({
    system:
      "You are IdeaForge's research analyst. Given harvested market signals, write a crisp, specific startup opportunity report. Be concrete and avoid hype. Respond with strict JSON only.",
    user: `Signals:\n${JSON.stringify(material, null, 2)}\n\nReturn JSON with keys: narrative (3 short paragraphs), whyNowSummary, whyNowDrivers (3-5 bullets), marketGap, executionSummary, executionSteps (4 objects {title, detail}), proofSummary, communitySignals (array of {platform, name, size, keyPains[], moneySignals[], freshOpportunities[], mostWantedFixes[]}).`,
    maxTokens: 2200,
    temperature: 0.65,
  });

  if (!draft) return base;

  return {
    ...base,
    narrative: draft.narrative ?? base.narrative,
    whyNow: {
      summary: draft.whyNowSummary ?? base.whyNow.summary,
      drivers: draft.whyNowDrivers?.length ? draft.whyNowDrivers : base.whyNow.drivers,
    },
    marketGap: draft.marketGap ?? base.marketGap,
    executionPlan: {
      summary: draft.executionSummary ?? base.executionPlan.summary,
      steps: draft.executionSteps?.length
        ? draft.executionSteps
        : base.executionPlan.steps,
    },
    proofSignals: {
      summary: draft.proofSummary ?? base.proofSignals.summary,
      signals: base.proofSignals.signals,
    },
    communitySignals: draft.communitySignals?.length
      ? draft.communitySignals
      : base.communitySignals,
  };
}

export async function synthesize(
  b: SignalBundle,
  scores: IdeaScores,
): Promise<IdeaReport> {
  if (isLive() && llmEnabled()) {
    try {
      return await synthesizeWithLLM(b, scores);
    } catch (err) {
      console.warn(`[synthesize] LLM path failed, using offline: ${String(err)}`);
    }
  }
  return synthesizeOffline(b, scores);
}
