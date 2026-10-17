// An IdeaBrief is the authored INPUT to the pipeline. In offline mode the
// brief's signal hints drive the collectors and scoring deterministically.
// In live mode, collectors replace these hints with real API data and the LLM
// rewrites the qualitative fields — but the brief shape stays identical, which
// is what makes the dual-mode swap clean.

import type {
  ACP,
  BusinessModel,
  Category,
  Competitor,
  FounderFit,
  Keyword,
  MarketSize,
  OfferTier,
  SignalSource,
  ValueEquation,
} from "@/lib/types";

export interface CommunityHint {
  platform: "reddit" | "facebook" | "youtube";
  name: string;
  size: string; // display, e.g. "248k members"
  reach: number; // numeric members/subs, used for metrics
  keyPains: string[];
  moneySignals: string[];
  freshOpportunities: string[];
  mostWantedFixes: string[];
}

export interface ExtraSignal {
  source: SignalSource;
  metric: string;
  value: string;
  growth?: number;
  detail?: string;
  confidence?: number;
}

export interface SignalHints {
  keywords: Keyword[];
  trendShape: number[]; // 12 monthly interest values, 0-100
  searchGrowthYoY: number; // %
  communities: CommunityHint[];
  redditMentionsPerMonth: number;
  youtubeVideosTracked: number;
  extraSignals?: ExtraSignal[];
}

export interface BusinessFitHints {
  revenue: { label: string; detail: string };
  execution: { label: string; detail: string };
  goToMarket: { label: string; detail: string };
  founder: { label: string; detail: string };
}

export interface IdeaBrief {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  category: Category;
  businessModel: BusinessModel;
  tags: string[];

  narrative: string;
  proofSummary: string;
  whyNow: { summary: string; drivers: string[] };
  marketGap: string;
  executionPlan: { summary: string; steps: { title: string; detail: string }[] };

  offer: OfferTier[];
  valueEquation: Omit<ValueEquation, "score"> & { score?: number };
  marketMatrix: { uniqueness: number; value: number; rationale: string };
  acp: ACP;
  competitor: Competitor;
  marketSize: MarketSize;
  founderFit: FounderFit;
  businessFit: BusinessFitHints;

  signals: SignalHints;

  /** Optional manual curation override. */
  gregsPick?: boolean;
}
