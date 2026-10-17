import { formatCompact, formatPct } from "@/lib/format";
import type {
  FormatScore,
  ProductFormat,
  ProductScores,
  ProductSignals,
} from "@/lib/productTypes";
import { PRODUCT_FORMATS } from "@/lib/productTypes";
import { seriesSlope } from "@/pipeline/collectors/http";
import { intentDensity } from "./collectors/autocompleteCluster";

// ---------------------------------------------------------------------------
// Product scorer. Deterministic and transparent: every dimension cites the
// numbers it was derived from. Competition and pricing use REAL Gumroad data
// when the collector ran live; the format ranking replaces the "it's a PDF"
// assumption with a per-opportunity recommendation.
// ---------------------------------------------------------------------------

const clamp = (x: number, lo = 0, hi = 10) => Math.max(lo, Math.min(hi, x));
const r1 = (x: number) => Math.round(x * 10) / 10;

export interface ScoringInput {
  signals: ProductSignals;
  suggestedFormat?: ProductFormat;
}

// --- Trend -------------------------------------------------------------------
export function scoreTrend(s: ProductSignals) {
  const slope = seriesSlope(s.trend.map((t) => t.value));
  const value = clamp(r1(5 + s.searchGrowthYoY / 60 + slope * 2.5));
  return {
    value,
    rationale: `Search interest ${formatPct(s.searchGrowthYoY)} YoY with a ${slope >= 0.05 ? "rising" : slope <= -0.05 ? "cooling" : "flat"} 12-month trajectory.`,
  };
}

// --- Buying intent -----------------------------------------------------------
/**
 * Buying intent is measured on the DIGITAL-intent sources (Google, Etsy).
 * Amazon autocomplete reflects the physical-goods catalogue ("notion" →
 * sewing notions), so it is reported separately as market adjacency and an
 * empty Amazon result never counts against the score.
 */
export function scoreBuyingIntent(s: ProductSignals) {
  const digital = s.autocomplete.filter((a) => a.source !== "amazon");
  const amazon = s.autocomplete.find((a) => a.source === "amazon");
  const phrases = digital.flatMap((a) => a.suggestions);
  const density = intentDensity(phrases); // 0-1
  const kwIntent = s.keywords.length
    ? s.keywords.filter((k) => /template|checklist|planner|tracker|guide|printable|spreadsheet|kit|bundle/i.test(k.term)).length / s.keywords.length
    : 0;
  const buyingClusters = digital.flatMap((a) => a.clusters).filter((c) => c.intent === "buying").length;
  const adjacency = amazon && amazon.suggestions.length >= 3 ? 0.4 : 0; // small bonus: a physical market exists next door
  const value = clamp(r1(2 + density * 5 + kwIntent * 2 + Math.min(buyingClusters, 6) * 0.17 + adjacency));
  const adjNote = amazon
    ? amazon.suggestions.length >= 3
      ? ` Amazon autocomplete shows an adjacent physical-goods market (${amazon.suggestions.length} phrases).`
      : " No adjacent Amazon physical market (digital-only niche)."
    : "";
  return {
    value,
    rationale: `${Math.round(density * 100)}% of ${phrases.length} Google/Etsy autocomplete phrases carry buying/problem intent; ${buyingClusters} buying-intent clusters; ${Math.round(kwIntent * 100)}% of tracked keywords are product-shaped.${adjNote}`,
  };
}

// --- Competition (higher = more favourable) ---------------------------------
export function scoreCompetition(s: ProductSignals) {
  const g = s.gumroad;
  // Crowdedness: log scale. 50 → ~8.3, 500 → ~6.3, 5k → ~4.3, 20k → ~3.1
  const crowd = clamp(10.3 - Math.log10(Math.max(g.total, 1)) * 2);
  // Quality of incumbents: strong ratings + many reviews make entry harder.
  const quality = g.avgRating != null ? g.avgRating : 3.5;
  const reviewPenalty = Math.min(2, Math.log10(Math.max(g.reviewVolume, 1)) * 0.6);
  const qualityPenalty = Math.max(0, quality - 4.2) * 1.5;
  const value = clamp(r1(crowd - reviewPenalty - qualityPenalty + 0.8));
  return {
    value,
    rationale: `${formatCompact(g.total)} Gumroad listings for "${g.query}"; top results average ${g.avgRating ?? "n/a"}★ across ${formatCompact(g.reviewVolume)} reviews${g.live ? "" : " (fixture)"}.`,
  };
}

// --- Gap strength (desire minus unaddressed pain) ---------------------------
export function scoreGapStrength(s: ProductSignals) {
  const problemClusters = s.autocomplete.flatMap((a) => a.clusters).filter((c) => c.intent === "problem");
  const problemPhrases = problemClusters.reduce((a, c) => a + c.phrases.length, 0);
  const highPains = s.reviewPains.filter((p) => p.frequency === "High").length;
  const medPains = s.reviewPains.filter((p) => p.frequency === "Medium").length;
  const community = s.communityPains.length;
  const value = clamp(r1(3 + Math.min(problemPhrases, 10) * 0.3 + highPains * 0.9 + medPains * 0.4 + Math.min(community, 6) * 0.25));
  return {
    value,
    rationale: `${problemPhrases} problem-intent autocomplete phrases, ${highPains} high-frequency + ${medPains} medium review complaints, ${community} community pains — the raw material for a Gap Closer.`,
  };
}

// --- Unique value / specialist room -----------------------------------------
export function scoreUniqueValue(s: ProductSignals, hasAngle: boolean) {
  const adjacent = s.gumroad.adjacentTags.length;
  const clusters = s.autocomplete.flatMap((a) => a.clusters).length;
  const value = clamp(r1(4 + Math.min(clusters, 12) * 0.25 + Math.min(adjacent, 8) * 0.2 + (hasAngle ? 1.5 : 0)));
  return {
    value,
    rationale: `${clusters} distinct sub-audiences in autocomplete and ${adjacent} adjacent Gumroad tags leave room to specialise${hasAngle ? "; a local/vertical angle is already defined" : ""}.`,
  };
}

// --- Format ranking ----------------------------------------------------------
const FORMAT_HINTS: Record<ProductFormat, RegExp> = {
  checklist: /checklist|step by step|steps|routine|protocol|audit|setup|launch/i,
  spreadsheet: /spreadsheet|tracker|budget|calculator|planner|log|sheet|excel|google sheets/i,
  "prompt-stack": /prompt|chatgpt|claude|gemini|ai |ai-|gpt|perplexity/i,
  "template-bundle": /template|canva|email|script|swipe|caption|post|bundle|kit/i,
  "notion-system": /notion|dashboard|second brain|system|workspace|os\b/i,
  guide: /guide|how to|beginner|explained|handbook|ebook|book|course/i,
};

export function rankFormats(s: ProductSignals, suggested?: ProductFormat): FormatScore[] {
  const phrases = [
    ...s.autocomplete.flatMap((a) => a.suggestions),
    ...s.keywords.map((k) => k.term),
    ...s.gumroad.sample.map((p) => p.name),
    ...s.gumroad.adjacentTags.map((t) => t.tag),
  ];
  const total = Math.max(phrases.length, 1);
  return PRODUCT_FORMATS.map((format) => {
    const hits = phrases.filter((p) => FORMAT_HINTS[format].test(p)).length;
    const share = hits / total;
    // "Guide" is penalised slightly: both courses argue it's the saturated default.
    const base = format === "guide" ? 3.2 : 4;
    const bonus = suggested === format ? 0.6 : 0;
    const score = clamp(r1(base + share * 14 + bonus));
    return {
      format,
      score,
      rationale: `${hits} of ${total} demand phrases match ${format.replace("-", " ")} language${suggested === format ? " (author's hint)" : ""}.`,
    };
  }).sort((a, b) => b.score - a.score || a.format.localeCompare(b.format));
}

// --- Composite ---------------------------------------------------------------
export function deriveProductScores(input: ScoringInput, hasAngle = false): ProductScores {
  const { signals } = input;
  const trend = scoreTrend(signals);
  const buyingIntent = scoreBuyingIntent(signals);
  const competition = scoreCompetition(signals);
  const gapStrength = scoreGapStrength(signals);
  const uniqueValue = scoreUniqueValue(signals, hasAngle);
  const formats = rankFormats(signals, input.suggestedFormat);

  const overall = Math.round(
    (trend.value * 0.2 +
      buyingIntent.value * 0.25 +
      competition.value * 0.2 +
      gapStrength.value * 0.25 +
      uniqueValue.value * 0.1) *
      10,
  );

  return {
    trend,
    buyingIntent,
    competition,
    gapStrength,
    uniqueValue,
    formats,
    bestFormat: formats[0].format,
    overall,
  };
}

/** Pipeline confidence from live-source coverage. */
export function deriveProductConfidence(sources: string[]): number {
  const live = sources.filter((s) => s.endsWith(":live")).length;
  const total = sources.length || 1;
  return Math.round(55 + (live / total) * 40);
}
