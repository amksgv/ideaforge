// A ProductBrief is the authored INPUT to the product pipeline — a concept
// plus the seed queries the collectors will mine and the qualitative hints the
// offline synthesizer uses. In live mode the collectors replace the fixture
// signals and the LLM rewrites the copy; the shape stays identical.

import type { Keyword } from "@/lib/types";
import type {
  AcceleratorStack,
  GumroadSnapshot,
  LadderTier,
  OutlineSection,
  Platform,
  ProductFormat,
  ProductNiche,
  ReviewPain,
} from "@/lib/productTypes";

export interface ProductBrief {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  niche: ProductNiche;
  tags: string[];
  /** Primary search phrase fed to Gumroad + autocomplete collectors. */
  seedQuery: string;
  /** Extra autocomplete seeds (e.g. "<seed> for", "best <seed>"). */
  extraSeeds?: string[];
  singaporeAngle?: string;

  // Qualitative hints (offline synthesis uses these verbatim; LLM may rewrite)
  avatar: string;
  dreamOutcome: string;
  hatedFriction: string;
  topDesires: string[];
  commonPains: string[];
  theGap: string;
  valueProposition: string;
  titleVariants: string[];
  outline: OutlineSection[];
  accelerators: AcceleratorStack;
  ladder: LadderTier[];
  platforms: { primary: Platform; secondary: Platform[]; rationale: string };
  symptomHook: string;
  commentKeyword: string;

  /** Author's format hint — the scorer may disagree and will say why. */
  suggestedFormat?: ProductFormat;

  // Fixture signals for offline mode (recorded from the live endpoints)
  fixtures: {
    google: string[];
    amazon: string[];
    etsy: string[];
    gumroad: Omit<GumroadSnapshot, "fetchedAt" | "live">;
    reviewPains: ReviewPain[];
    keywords: Keyword[];
    trendShape: number[]; // 12 values 0-100
    searchGrowthYoY: number;
    communityPains: string[];
  };

  gregsPick?: boolean;
}
