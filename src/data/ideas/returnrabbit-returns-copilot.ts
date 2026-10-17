import type { IdeaBrief } from "@/pipeline/brief";

export const returnRabbit: IdeaBrief = {
  slug: "returnrabbit-returns-copilot",
  title: "AI returns-reduction copilot that cuts DTC apparel return rates with pre-purchase fit guidance",
  tagline: "ReturnRabbit tells shoppers whether a garment will fit before they buy — and tells brands exactly why their returns keep happening.",
  emoji: "🐇",
  category: "E-commerce",
  businessModel: "B2B",
  tags: ["returns", "dtc", "apparel", "fit guidance", "shopify", "ai", "ecommerce", "sizing"],

  narrative:
    "Online apparel returns run between 25% and 40%, and the overwhelming majority trace back to a single cause: the item fit differently than the shopper expected. For a DTC brand doing $5M in revenue, that translates to $1.25M–$2M in returned goods, reverse logistics, inspection labour, and restocking costs every year — before accounting for the customer goodwill destroyed when a buyer has to print a label and wait two weeks for a refund. The era of free and frictionless returns is ending as brands absorb the cost, but making returns harder without making fit guidance better is a recipe for abandoned carts.\n\nReturnRabbit embeds a Shopify app that does two things. Pre-purchase: a lightweight fit widget — no body measurements required — asks two or three questions (height, usual size at a comparable brand, fit preference) and predicts, using garment-attribute data from the brand's catalogue and historical return-reason data, whether this specific product in this specific size will fit this specific customer. Post-purchase: the analytics engine ingests return-reason codes, customer comments, and product attributes to surface a ranked list of 'why this product returns' — is the waistband narrow, is the sizing vanity-inflated, is the product description misleading on fabric stretch? The brand can act on that in the next production run or in the listing copy, not after year-end.\n\nThe exchange nudge layer sits between the two: when a return is initiated for a fit reason, ReturnRabbit presents an AI-generated exchange recommendation ('try the medium in the relaxed fit instead of the slim') with a one-click swap, converting what would have been a full refund into an exchange that retains the revenue. Brands currently achieving 15% exchange rates have reported jumping to 34% with systematic nudges, making this the highest-ROI lever available to a DTC ops team.",

  proofSummary:
    "Shopify's 2024 Commerce Trends report named return-rate reduction the top operational priority for apparel brands; simultaneously, Loop Returns raised $65M validating the returns-management category, and brands are now publicly ending free-returns policies — signalling they are ready to pay for upstream prevention.",

  whyNow: {
    summary:
      "The free-returns era is ending, AI vision makes garment-attribute extraction cheap, the Shopify app ecosystem provides instant distribution, and margin pressure from inflation has made a 5-point return-rate improvement worth more than it ever has been.",
    drivers: [
      "Major carriers raised return-shipping surcharges 18-24% in 2024, making each returned parcel materially more expensive and accelerating brand willingness to invest in prevention.",
      "AI vision models (GPT-4o, Gemini) can now extract structured garment attributes — neckline, fabric composition, stretch rating, size-chart positioning — from product images and descriptions at near-zero cost, making automated product profiling viable.",
      "Shopify's app ecosystem has 2M+ merchants and an established install-and-go channel; a well-ranked Shopify app can reach 50k installs without an outbound sales team.",
      "Loop Returns, Narvar, and Happy Returns normalised the 'returns platform' category with SMB brands, making the budget line item already present in most DTC ops budgets.",
      "Post-pandemic consumer expectation reset: shoppers now accept some friction in returns if the pre-purchase guidance is good enough, removing the conversion-rate objection that killed earlier fit-tech products.",
    ],
  },
  marketGap:
    "Loop Returns and Narvar manage returns after they happen; True Fit and Fits.me require large-scale body-measurement data that most DTC brands and their customers will not supply. No product pairs lightweight pre-purchase fit prediction (no body scan required) with post-hoc 'why are we returning this SKU' analytics in a single Shopify-native app priced for brands under $10M revenue.",

  executionPlan: {
    summary:
      "Launch the analytics-and-exchange-nudge module first (no fit widget required, immediate ROI proof), then add the pre-purchase widget and build a data flywheel where return-reason data improves fit predictions across the merchant base.",
    steps: [
      { title: "Ship the return-reason analytics dashboard", detail: "Ingest Shopify returns data plus optional return-reason survey responses; rank SKUs by return rate and surface the top five 'fix these listing issues' recommendations. Zero ML required in week one." },
      { title: "Build the exchange nudge widget", detail: "At return initiation, present an AI-generated exchange alternative with one-click swap; measure exchange-rate lift and use it as the primary sales metric for every subsequent conversation." },
      { title: "Launch the pre-purchase fit widget", detail: "Three-question Shopify PDP widget (height, comparable-brand size, fit preference) that outputs a size recommendation and a fit-confidence score; trained on the brand's own return-reason history." },
      { title: "Build the cross-brand data flywheel", detail: "Aggregate anonymised fit-signal data across the merchant base to improve cold-start predictions for new brands; this is the durable moat that point-in-time competitors cannot replicate." },
    ],
  },

  offer: [
    { kind: "lead", name: "Free Return-Rate Audit", price: "$0", description: "Connect Shopify read-only; get a free report showing your top five highest-return SKUs, estimated annual return cost, and root-cause hypotheses." },
    { kind: "frontend", name: "Analytics", price: "$79/mo", description: "Full return-reason analytics dashboard, SKU-level return attribution, and listing-copy recommendations. No widget required." },
    { kind: "core", name: "Reduce + Convert", price: "$199/mo", description: "Analytics plus the exchange-nudge widget at return initiation; includes A/B testing of exchange copy and a real-time exchange-rate dashboard." },
    { kind: "backend", name: "Full Copilot", price: "$499/mo", description: "Pre-purchase fit widget on PDPs, post-purchase analytics, exchange nudges, AI-generated listing-copy fixes, and a quarterly returns strategy review." },
  ],

  valueEquation: {
    dreamOutcome: "Return rate drops from 32% to under 18%, the exchange rate climbs above 30%, and the brand's net margin recovers 4-6 points without touching the product or the price.",
    perceivedLikelihood: "High — the exchange-nudge ROI is immediate and measurable; brands see the lift in their Shopify dashboard within the first return cycle.",
    timeDelay: "First exchange-rate lift visible within 14 days; meaningful return-rate reduction from fit guidance takes one full buying season (60-90 days).",
    effortAndSacrifice: "Low — a 20-minute Shopify app install and a one-hour onboarding call; no body-measurement collection, no changes to the checkout flow.",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 6,
    value: 9,
    rationale:
      "Extremely high value — a 5-point return-rate reduction on $5M revenue is $250K in direct cost savings — with moderate uniqueness because Loop Returns and Happy Returns are adjacent, but neither offers upstream fit prediction or post-hoc analytics at SMB price points.",
  },

  acp: {
    audience: "DTC apparel brand founders, heads of e-commerce, and operations leads at brands doing $1M-$15M in Shopify revenue with return rates above 20%.",
    community: "r/Entrepreneur (DTC threads), Shopify Community forums, DTC brands Slack groups, and War Room / Foxwell Digital Facebook communities for DTC operators.",
    product: "A Shopify-native returns-reduction copilot that combines pre-purchase fit guidance, exchange-over-refund nudges, and post-hoc 'why we return' analytics to recover margin without adding friction.",
  },

  competitor: {
    name: "Loop Returns / True Fit / Happy Returns",
    note: "Loop Returns dominates return logistics management but starts at $350+/mo and targets brands above $5M; True Fit requires enterprise data-sharing agreements; neither offers AI-generated exchange recommendations or root-cause analytics at SMB price points.",
  },

  marketSize: {
    tam: "$6.8B returns management and e-commerce analytics software",
    sam: "$890M returns-reduction and fit-tech software for DTC apparel brands on Shopify",
    som: "$22M ARR reachable via 8,000 apparel brands at an average of $230/mo",
    note: "Bottoms-up: ~95,000 Shopify apparel stores with revenue $500K+; capturing 9% at $230/mo average = $24.8M ARR; conservative 8k brands accounts for high initial churn before fit-widget data matures.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Full-time; MVP is a Shopify app with a dashboard — achievable solo in 5-7 weeks using Shopify's Polaris components and a simple return-reason ingestion script.",
  },

  businessFit: {
    revenue: { label: "$1M–$15M ARR", detail: "Tiered SaaS with natural expansion revenue as brands upgrade from analytics to the full copilot as they validate ROI; churn is low because the data flywheel gets more valuable over time." },
    execution: { label: "Moderate, 5-7 week MVP", detail: "The analytics and exchange-nudge modules require no ML — just Shopify API ingestion and rule-based recommendations; the fit-prediction widget is the complex layer and can ship in phase two." },
    goToMarket: { label: "Shopify App Store + DTC community content", detail: "A well-ranked Shopify app listing drives organic installs; supplemented by founder-led content in DTC operator communities where return-rate frustration is a permanent top-10 topic." },
    founder: { label: "Strong for DTC operators or ML engineers with e-commerce exposure", detail: "A founder who has run a DTC brand or worked in e-commerce operations has instant credibility and knows exactly which metrics resonate; technical founders can build the fit-prediction moat faster." },
  },

  signals: {
    keywords: [
      { term: "reduce shopify return rate", volume: 5400, growth: 112, competition: "Low" },
      { term: "dtc apparel returns analytics", volume: 2800, growth: 168, competition: "Low" },
      { term: "shopify fit guide app", volume: 6200, growth: 87, competition: "Medium" },
      { term: "exchange over refund ecommerce", volume: 3100, growth: 204, competition: "Low" },
      { term: "online clothing returns problem", volume: 18400, growth: 44, competition: "High" },
    ],
    trendShape: [36, 39, 43, 47, 52, 57, 61, 66, 72, 78, 84, 90],
    searchGrowthYoY: 121,
    communities: [
      {
        platform: "reddit",
        name: "r/Entrepreneur",
        size: "2.1M members",
        reach: 2100000,
        keyPains: [
          "Return rates above 30% are silently eating margin — most DTC founders don't realise until they run a proper COGS analysis.",
          "Loop Returns pricing is prohibitive for brands under $3M; there is nothing in the $100-$300/mo tier that actually reduces returns rather than just managing them.",
          "Customers keep returning for 'didn't fit' but the brand has no way to know if that means the size chart is wrong, the product runs small, or the listing photos are misleading.",
        ],
        moneySignals: [
          "DTC founders sharing that a 5-point return-rate reduction would add $80-120k directly to their bottom line at their revenue level.",
          "Threads with founders willing to pay a specialist agency $2-4k to audit their return-reason data once — clear signal they would pay for a self-serve tool.",
        ],
        freshOpportunities: [
          "Root-cause analytics that distinguish 'sizing system problem' from 'listing description problem' from 'product quality problem'",
          "Exchange recommendations personalised to the specific return reason — not generic upsell",
        ],
        mostWantedFixes: [
          "A way to see which SKUs are destroying margin before the next production run",
          "Exchange-nudge copy that converts without feeling like friction to the customer",
          "Pre-purchase size guidance that does not require a body scan or extensive measurements",
        ],
      },
      {
        platform: "facebook",
        name: "DTC Brands & Shopify Operators",
        size: "43k members",
        reach: 43000,
        keyPains: [
          "Return shipping cost increases in 2024 made previously-tolerable return rates suddenly margin-critical.",
          "Ending free returns hurt conversion rate 8-12% with no corresponding improvement in returns because the fit problem was never fixed.",
        ],
        moneySignals: [
          "Members sharing P&L breakdowns where returns are the single largest variable cost line, surpassing paid acquisition for some brands.",
          "Active interest in tools that help convert returns to exchanges, with members asking for recommendations every two to three weeks.",
        ],
        freshOpportunities: [
          "An exchange-nudge app priced below $200/mo that DTC brands can deploy without a developer",
        ],
        mostWantedFixes: [
          "Fit guidance that works without requiring customers to enter detailed body measurements",
          "Analytics that surface actionable listing or sizing fixes rather than just dashboards showing return rates",
        ],
      },
    ],
    redditMentionsPerMonth: 1140,
    youtubeVideosTracked: 1620,
    extraSignals: [
      { source: "google_trends", metric: "Search index peak month", value: "88 / 100", growth: 67, detail: "Searches spike in January post-holiday return season and again in September at back-to-school", confidence: 79 },
      { source: "x", metric: "DTC founder return complaints / mo", value: "580", detail: "DTC founders publicly posting return rate metrics and tagging Shopify, Loop, and Happy Returns seeking solutions", confidence: 71 },
    ],
  },
};
