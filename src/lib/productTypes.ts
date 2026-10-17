// ---------------------------------------------------------------------------
// Digital Product Lab — canonical domain model.
//
// A ProductReport is what the product pipeline produces: a sellable
// digital-product brief grounded in demand signals (autocomplete, Gumroad
// competition, trends, communities) and shaped by the Gap Closer / Accelerator
// Stack / four-tier ladder frameworks. Separate from the Idea domain on
// purpose: different inputs, scorer, synthesis and UI.
// ---------------------------------------------------------------------------

import type { Keyword, Level, Score, TrendPoint } from "@/lib/types";

export const PRODUCT_NICHES = [
  "AI & Prompts",
  "Productivity & Notion",
  "Money & Side Hustles",
  "Health & Sleep",
  "Career & Freelancing",
  "Parenting & Family",
  "Local & Singapore",
  "Creators & Marketing",
  "Home & Food",
  "Education & Exams",
] as const;
export type ProductNiche = (typeof PRODUCT_NICHES)[number];

/**
 * High-utility, low-friction formats (both courses: the 100-page ebook is
 * dead). The scorer RANKS these per opportunity; "guide" is a valid outcome,
 * never the default assumption.
 */
export const PRODUCT_FORMATS = [
  "checklist",
  "spreadsheet",
  "prompt-stack",
  "template-bundle",
  "notion-system",
  "guide",
] as const;
export type ProductFormat = (typeof PRODUCT_FORMATS)[number];

export const FORMAT_LABELS: Record<ProductFormat, string> = {
  checklist: "Interactive checklist / action blueprint",
  spreadsheet: "Pre-built spreadsheet / tracker",
  "prompt-stack": "Curated prompt stack",
  "template-bundle": "Turnkey template bundle",
  "notion-system": "Notion system / dashboard",
  guide: "Step-by-step guide",
};

export type PriceTier = "tripwire" | "core" | "premium";
export const PRICE_TIER_RANGES: Record<PriceTier, { min: number; max: number; label: string }> = {
  tripwire: { min: 7, max: 27, label: "$7–$27 fast-solution" },
  core: { min: 47, max: 197, label: "$47–$197 core system" },
  premium: { min: 197, max: 497, label: "$197–$497 premium bundle" },
};

export type Platform = "gumroad" | "etsy" | "payhip" | "own-site";

// --- Signals -----------------------------------------------------------------

export interface AutocompleteCluster {
  /** Short label for the cluster, e.g. "for students". */
  label: string;
  /** Raw suggestions that fell into this cluster. */
  phrases: string[];
  /** Does the cluster carry buying/solution intent (template, how to, free…)? */
  intent: "buying" | "problem" | "informational";
}

export interface AutocompleteSignal {
  source: "google" | "amazon" | "etsy";
  seed: string;
  suggestions: string[];
  clusters: AutocompleteCluster[];
  fetchedAt: string; // ISO
  live: boolean;
}

export interface GumroadListing {
  name: string;
  priceUsd: number; // normalized
  currency: string;
  ratingAvg: number | null;
  ratingCount: number;
  seller: string;
  url: string;
}

export interface GumroadSnapshot {
  query: string;
  total: number; // competitor count for this query
  sample: GumroadListing[]; // top results (first page)
  price: { p25: number; median: number; p75: number; min: number; max: number };
  avgRating: number | null;
  reviewVolume: number; // sum of rating counts in sample
  adjacentTags: { tag: string; count: number }[];
  fetchedAt: string;
  live: boolean;
}

export interface ReviewPain {
  source: "amazon-reviews" | "manual";
  complaint: string;
  frequency: Level; // how often it recurs in the sampled reviews
}

export interface ProductSignals {
  autocomplete: AutocompleteSignal[];
  gumroad: GumroadSnapshot;
  reviewPains: ReviewPain[];
  keywords: Keyword[];
  trend: TrendPoint[];
  searchGrowthYoY: number;
  communityPains: string[];
}

// --- Scores ------------------------------------------------------------------

export interface FormatScore {
  format: ProductFormat;
  score: number; // 0-10
  rationale: string;
}

export interface ProductScores {
  trend: Score; // rising / steady interest
  buyingIntent: Score; // density of intent words in autocomplete + keywords
  competition: Score; // higher = MORE favourable (less crowded / weaker)
  gapStrength: Score; // desire minus unaddressed pain
  uniqueValue: Score; // room for a specialist angle
  formats: FormatScore[]; // ranked, best first
  bestFormat: ProductFormat;
  overall: number; // 0-100
}

// --- Synthesis ---------------------------------------------------------------

/** Reilly: "top desires minus common pain = the product". */
export interface GapCloser {
  topDesires: string[];
  commonPains: string[];
  /** The one unaddressed friction the product exists to remove. */
  theGap: string;
  /** One-sentence value proposition. */
  valueProposition: string;
}

/** Reilly's micro-niche equation. */
export interface Positioning {
  avatar: string; // specific target person
  dreamOutcome: string;
  hatedFriction: string; // what they refuse to do / the sacrifice removed
  /** avatar + outcome − friction, as a single sentence. */
  statement: string;
}

/** Norton: three friction-removal elements, always exactly three. */
export interface AcceleratorStack {
  doneForYou: { name: string; description: string };
  cognitiveClarity: { name: string; description: string };
  emotionalAssurance: { name: string; description: string };
}

export interface OutlineSection {
  title: string;
  purpose: string;
}

export type LadderKind = "free" | "tripwire" | "core" | "backend";
export interface LadderTier {
  kind: LadderKind;
  name: string;
  price: string;
  description: string;
}

export interface Pricing {
  tier: PriceTier;
  recommendedUsd: number;
  /** Where the recommendation sits vs. the observed Gumroad distribution. */
  anchor: string;
}

export interface MarketingStarter {
  /** Symptom-first hook (Norton) phrased for a short video / pin. */
  symptomHook: string;
  pinterestPinTitles: string[];
  shortFormAngles: string[]; // 3 of Norton's 6 angles, filled in
  commentKeyword: string; // Reilly comment-to-DM CTA keyword
}

export interface ProductReport {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  niche: ProductNiche;
  tags: string[];
  seedQuery: string;
  singaporeAngle?: string;

  signals: ProductSignals;
  scores: ProductScores;

  gapCloser: GapCloser;
  positioning: Positioning;
  titleVariants: string[];
  outline: OutlineSection[];
  accelerators: AcceleratorStack;
  ladder: LadderTier[];
  pricing: Pricing;
  platforms: { primary: Platform; secondary: Platform[]; rationale: string };
  marketing: MarketingStarter;

  /** Manual validation steps for fixture-backed sources (Etsy, reviews). */
  manualChecks: string[];

  gregsPick: boolean;
  confidence: number;
  generatedAt: string;
  sources: string[];
}

/** Lightweight projection for cards and list views. */
export interface ProductSummary {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  niche: ProductNiche;
  tags: string[];
  bestFormat: ProductFormat;
  priceTier: PriceTier;
  recommendedUsd: number;
  competitorCount: number;
  scores: Pick<ProductScores, "trend" | "buyingIntent" | "competition" | "gapStrength" | "overall">;
  gregsPick: boolean;
}
