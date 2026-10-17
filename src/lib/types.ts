// ---------------------------------------------------------------------------
// Canonical domain model for an IdeaForge idea report.
//
// The full IdeaReport is the single source of truth. It is stored JSON-encoded
// in the database and reconstructed on read. The DB also mirrors a handful of
// scalar fields for fast filtering/sorting on the Idea Database page.
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  "AI & Automation",
  "Health & Wellness",
  "Fintech",
  "Creator Economy",
  "Productivity",
  "E-commerce",
  "Education",
  "Climate & Energy",
  "Developer Tools",
  "Local Services",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const BUSINESS_MODELS = [
  "B2C",
  "B2B",
  "B2B2C",
  "Marketplace",
  "SaaS",
  "Prosumer",
] as const;
export type BusinessModel = (typeof BUSINESS_MODELS)[number];

export type SignalSource =
  | "reddit"
  | "youtube"
  | "google_trends"
  | "keywords"
  | "facebook"
  | "x";

export type Level = "Low" | "Medium" | "High";

/** A single 0-10 score dimension with a one-line rationale. */
export interface Score {
  value: number; // 0-10
  rationale: string;
}

export interface IdeaScores {
  opportunity: Score;
  problem: Score;
  feasibility: Score;
  whyNow: Score;
  /** Composite 0-100 headline score. */
  overall: number;
}

export interface BusinessFitItem {
  label: string; // e.g. "$1M–$10M ARR"
  detail: string; // one-sentence explanation
}

export interface BusinessFit {
  revenuePotential: BusinessFitItem;
  executionDifficulty: BusinessFitItem;
  goToMarket: BusinessFitItem;
  founderFit: BusinessFitItem;
}

export type OfferTierKind = "lead" | "frontend" | "core" | "backend";

export interface OfferTier {
  kind: OfferTierKind;
  name: string;
  price: string; // "$0", "$99", "$20/mo", "$2k/yr"
  description: string;
}

export interface Signal {
  source: SignalSource;
  metric: string; // "Search volume", "Subreddit mentions/mo", ...
  value: string; // human-readable value, e.g. "14,800/mo"
  growth?: number; // YoY % growth (can be negative)
  detail?: string;
  confidence: number; // 0-100
}

export interface CommunitySignal {
  platform: "reddit" | "facebook" | "youtube";
  name: string; // r/somewhere, "Group name", "Channel"
  size: string; // "248k members"
  keyPains: string[];
  moneySignals: string[];
  freshOpportunities: string[];
  mostWantedFixes: string[];
}

export interface Keyword {
  term: string;
  volume: number; // monthly searches
  growth: number; // YoY %
  competition: Level;
}

export interface TrendPoint {
  /** Period label, e.g. "2024-01" or "Jan". */
  period: string;
  value: number; // 0-100 interest index (Google-Trends style)
}

/** Alex Hormozi's Value Equation. */
export interface ValueEquation {
  dreamOutcome: string;
  perceivedLikelihood: string;
  timeDelay: string;
  effortAndSacrifice: string;
  score: number; // 0-10 overall desirability
}

export type MarketQuadrant =
  | "Category King" // high uniqueness / high value
  | "Tech Novelty" // high uniqueness / low value
  | "Commodity Play" // low uniqueness / high value
  | "Low Impact"; // low uniqueness / low value

export interface MarketMatrix {
  uniqueness: number; // 0-10
  value: number; // 0-10
  quadrant: MarketQuadrant;
  rationale: string;
}

/** Audience → Community → Product funnel. */
export interface ACP {
  audience: string;
  community: string;
  product: string;
}

export interface ExecutionStep {
  title: string;
  detail: string;
}

export interface Competitor {
  name: string;
  note: string;
}

export interface MarketSize {
  tam: string;
  sam: string;
  som: string;
  note: string;
}

export interface FounderFit {
  investment: Level;
  technicalSkill: Level;
  timeCommitment: string; // "Nights & weekends", "Full-time", ...
}

/** The complete idea report — produced by the synthesis engine. */
export interface IdeaReport {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  category: Category;
  businessModel: BusinessModel;
  tags: string[];

  narrative: string; // long-form opportunity story (markdown-lite paragraphs)

  scores: IdeaScores;
  businessFit: BusinessFit;
  offer: OfferTier[]; // value ladder, ordered lead → backend

  whyNow: { summary: string; drivers: string[] };
  proofSignals: { summary: string; signals: Signal[] };
  marketGap: string;
  executionPlan: { summary: string; steps: ExecutionStep[] };

  frameworks: {
    valueEquation: ValueEquation;
    marketMatrix: MarketMatrix;
    acp: ACP;
    valueLadderNote: string;
  };

  competitor: Competitor;
  marketSize: MarketSize;
  keywords: Keyword[];
  trend: TrendPoint[];
  /** Headline YoY search-interest growth (%) — the single source of truth for "YoY" in the UI. */
  searchGrowthYoY: number;
  communitySignals: CommunitySignal[];
  founderFit: FounderFit;

  gregsPick: boolean;
  confidence: number; // 0-100
  generatedAt: string; // ISO
  sources: string[]; // which collectors contributed
}

/** Lightweight projection used by cards and list views. */
export interface IdeaSummary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  category: Category;
  businessModel: BusinessModel;
  tags: string[];
  scores: IdeaScores;
  revenueLabel: string;
  founderFit: FounderFit;
  gregsPick: boolean;
}
