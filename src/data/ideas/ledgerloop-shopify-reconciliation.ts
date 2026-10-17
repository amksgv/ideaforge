import type { IdeaBrief } from "@/pipeline/brief";

export const ledgerLoop: IdeaBrief = {
  slug: "ledgerloop-shopify-reconciliation",
  title: "Automated payout reconciliation that posts clean journal entries for Shopify and Amazon sellers",
  tagline: "LedgerLoop matches every deposit line to orders, fees, and refunds so your bookkeeper never touches a spreadsheet again.",
  emoji: "🔄",
  category: "Fintech",
  businessModel: "B2B",
  tags: ["bookkeeping", "shopify", "amazon", "reconciliation", "quickbooks", "xero", "ecommerce", "fintech"],

  narrative:
    "Shopify Payments deposits a lump sum every two business days. Buried inside that single wire are platform fees, refunds, chargebacks, currency-conversion gains, and instalment-payment holdbacks — none of which map one-to-one to the order totals sitting in the merchant's accounting software. Multiply this across Amazon Seller Central, Stripe, and PayPal, and a $3M/year brand's bookkeeper is spending eight to twelve hours a month on a jigsaw puzzle that should be automated.\n\nLedgerLoop connects directly to Shopify, Amazon Seller Central, and Stripe via their settlement-report APIs, then matches every line of every payout to the originating orders and fee events. The engine applies the correct revenue, fee, refund, and forex accounts and posts a clean double-entry journal entry to QuickBooks Online or Xero — dated to the day the transaction settled, not the day the batch posted. The result is an always-current general ledger with zero manual intervention, and a reconciliation report that an accountant can close in minutes rather than days.\n\nThe beachhead is Shopify-first because Shopify's payout API is the richest and the community pain is the loudest, but the same engine extends cleanly to Amazon FBA reimbursements, Stripe Connect platforms, and international VAT splits. Early adopters are the 15,000+ bookkeepers and fractional CFOs who serve e-commerce brands; they become the distribution channel, recommending LedgerLoop the way they recommend Hubdoc for receipts.",

  proofSummary:
    "The r/Bookkeeping and r/ecommerce communities overflow with threads asking how to reconcile Shopify payouts in QuickBooks — zero polished solutions exist despite years of demand. Shopify's own help documentation recommends a manual twelve-step workaround.",

  whyNow: {
    summary:
      "Marketplace proliferation has outpaced legacy bookkeeping tools, accounting-API maturity now makes programmatic journal-entry posting practical, and the bookkeeper shortage has made manual reconciliation economically unviable for small brands.",
    drivers: [
      "Shopify, Amazon, and Stripe all opened structured settlement-report APIs in 2022-2024, making machine-readable payout data available for the first time.",
      "The number of Shopify merchants crossed 2 million in 2024; even 1% of them needing dedicated reconciliation is a 20,000-merchant TAM wedge.",
      "Bookkeeper hourly rates rose 35% since 2021 as supply tightened, making eight hours of monthly manual work cost $400-$800 per client — more than any SaaS subscription.",
      "QuickBooks Online and Xero both launched journal-entry POST APIs with idempotency keys, enabling reliable automated posting without duplicate-entry risk.",
      "Multi-currency Shopify stores grew 180% YoY as brands expanded internationally, multiplying the reconciliation complexity exponentially.",
    ],
  },
  marketGap:
    "A2X covers Shopify-to-QuickBooks at a basic level but uses a summary-posting approach that loses transaction-level detail and breaks for multi-currency or split-payment orders. No tool handles cross-platform reconciliation (Shopify + Amazon + Stripe in one ledger) with line-level matching and automatic fee categorisation.",

  executionPlan: {
    summary:
      "Launch a Shopify-only connector targeting bookkeepers and fractional CFOs, prove the matching engine, then add Amazon and Stripe and build a white-label partner channel.",
    steps: [
      { title: "Nail Shopify Payments reconciliation", detail: "Ship an OAuth connector that ingests Shopify settlement reports and posts matched journal entries to QuickBooks Online with 99%+ match rates before touching any other platform." },
      { title: "Build the bookkeeper distribution channel", detail: "Offer a free white-label dashboard so bookkeepers can manage all their merchant clients; each bookkeeper becomes a reseller of 3-15 seats." },
      { title: "Add Amazon FBA and Stripe", detail: "The matching engine is platform-agnostic once Shopify is clean; Amazon's Settlement Report API and Stripe's Balance Transactions endpoint plug in with minimal new logic." },
      { title: "Launch a CFO analytics layer", detail: "Aggregate reconciled data into a real-time P&L and cash-flow dashboard, unlocking a higher ACV tier for multi-channel brands and their fractional CFOs." },
    ],
  },

  offer: [
    { kind: "lead", name: "Free Reconciliation Audit", price: "$0", description: "Connect Shopify read-only; get a free report showing unmatched lines and estimated reconciliation hours wasted per month." },
    { kind: "frontend", name: "Starter", price: "$49/mo", description: "One Shopify store, one accounting destination (QBO or Xero), unlimited journal-entry posts, email reconciliation summary." },
    { kind: "core", name: "Growth", price: "$129/mo", description: "Up to three sales channels (Shopify + Amazon + Stripe), multi-currency support, line-level match audit log, priority support." },
    { kind: "backend", name: "Bookkeeper Partner", price: "$299/mo", description: "Unlimited client storefronts, white-label client portal, bulk reconciliation runs, dedicated onboarding, and partner referral revenue share." },
  ],

  valueEquation: {
    dreamOutcome: "Month-end close takes 20 minutes instead of two days, the ledger is always accurate, and no bookkeeper ever touches a payout spreadsheet.",
    perceivedLikelihood: "High — the matching logic is deterministic and the output is a verifiable journal entry; merchants see clean books on day one.",
    timeDelay: "Same-day: once OAuth is connected, historical payouts reconcile within minutes and new ones post automatically overnight.",
    effortAndSacrifice: "Minimal — a 10-minute OAuth setup replaces a recurring eight-hour manual task; no workflow change for the merchant.",
    score: 9,
  },

  marketMatrix: {
    uniqueness: 7,
    value: 9,
    rationale:
      "Extremely high value because reconciliation errors cause real financial and tax liability; moderately differentiated because A2X and Taxomate exist but use coarse summary posting that sophisticated sellers and accountants reject.",
  },

  acp: {
    audience: "Bookkeepers, fractional CFOs, and controllers who manage accounts for Shopify and Amazon sellers doing $500K-$10M in annual revenue.",
    community: "r/Bookkeeping, r/FulfillmentByAmazon, Shopify Bookkeepers Facebook group, ProAdvisor communities, and Xero partner forums.",
    product: "A reconciliation engine that ingests raw payout data from every marketplace, matches it to orders and fees, and posts clean journal entries to QBO or Xero with zero human review.",
  },

  competitor: {
    name: "A2X / Taxomate / Finaloop",
    note: "A2X is the closest incumbent but posts summarised monthly totals rather than line-level matched entries, which fails for multi-currency, split-pay, and audit requirements; Finaloop is full-service bookkeeping (people + software) at 10x the price.",
  },

  marketSize: {
    tam: "$4.2B small-business accounting software for e-commerce",
    sam: "$680M reconciliation and bookkeeping automation for Shopify/Amazon/Stripe merchants",
    som: "$18M ARR attainable via 12,000 merchants at $125/mo average in a 36-month window",
    note: "Bottoms-up: ~180,000 Shopify/Amazon merchants with revenue $500K+ and a dedicated bookkeeper; capturing 7% at $125/mo average = $18.9M ARR.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Full-time, solo-shippable in 6 weeks using Shopify and QBO APIs with a standard Node.js or Python stack.",
  },

  businessFit: {
    revenue: { label: "$1M–$20M ARR", detail: "High-retention subscription (churn is structurally low — switching bookkeeping tools is painful) with a lucrative bookkeeper-partner channel that multiplies seat count." },
    execution: { label: "Moderate, 4-6 week MVP", detail: "The core matching engine is algorithmic, not AI-dependent; the complexity is edge cases in payout formats, which are finite and well-documented." },
    goToMarket: { label: "Bookkeeper-led partner channel", detail: "Each bookkeeper partner brings 5-20 merchant clients; targeting 200 bookkeeper partners in year one creates a compounding referral flywheel." },
    founder: { label: "Strong for fintech or e-commerce operators", detail: "Ideal for a founder with bookkeeping, accounting-API, or e-commerce operations background; domain credibility is essential when selling to sceptical accountants." },
  },

  signals: {
    keywords: [
      { term: "shopify reconciliation quickbooks", volume: 8100, growth: 74, competition: "Medium" },
      { term: "amazon seller bookkeeping software", volume: 12400, growth: 52, competition: "High" },
      { term: "shopify payments journal entry", volume: 3600, growth: 130, competition: "Low" },
      { term: "reconcile shopify payouts xero", volume: 2900, growth: 118, competition: "Low" },
      { term: "ecommerce bookkeeping automation", volume: 5400, growth: 88, competition: "Medium" },
      { term: "amazon settlement report accounting", volume: 4200, growth: 97, competition: "Medium" },
    ],
    trendShape: [38, 41, 44, 48, 53, 57, 62, 67, 71, 77, 83, 91],
    searchGrowthYoY: 94,
    communities: [
      {
        platform: "reddit",
        name: "r/Bookkeeping",
        size: "134k members",
        reach: 134000,
        keyPains: [
          "Shopify payout deposits never match order totals and the difference is impossible to trace without an hour of manual work per deposit.",
          "Amazon FBA reimbursements, storage fees, and co-op charges arrive mixed together with no per-order breakdown.",
          "Multi-currency Shopify stores create forex gain/loss entries that QBO auto-posts incorrectly, requiring manual corrections every month.",
        ],
        moneySignals: [
          "Bookkeepers charging $300-$500/mo add-ons specifically for Shopify reconciliation work.",
          "Threads with merchants offering to pay for a working integration; one post offering $5k for a custom script has 240 upvotes.",
        ],
        freshOpportunities: [
          "Line-level matching that ties each payout dollar back to a specific order ID",
          "Automatic chargeback and dispute journal entries with the correct contra-revenue treatment",
        ],
        mostWantedFixes: [
          "True transaction-level detail in QuickBooks, not monthly summaries",
          "Automatic forex realised-gain/loss entries on multi-currency payouts",
          "A reconciliation audit trail an auditor can follow without calling the bookkeeper",
        ],
      },
      {
        platform: "facebook",
        name: "Shopify Bookkeepers & Accountants",
        size: "27k members",
        reach: 27000,
        keyPains: [
          "A2X summaries break whenever Shopify changes its payout format, requiring manual re-mapping.",
          "Clients doing Amazon and Shopify simultaneously have two completely separate reconciliation workflows with no consolidated view.",
        ],
        moneySignals: [
          "Members sharing rate cards for Shopify bookkeeping engagements averaging $450/mo per client.",
          "Active thread of bookkeepers looking for a white-label tool they can resell to clients.",
        ],
        freshOpportunities: [
          "White-label partner dashboard where bookkeepers manage all clients from one login",
        ],
        mostWantedFixes: [
          "Cross-platform reconciliation (Shopify + Amazon + Stripe) in a single journal-entry post",
          "Match-confidence scoring so bookkeepers can quickly review the 2% of lines the engine flags for human review",
        ],
      },
    ],
    redditMentionsPerMonth: 820,
    youtubeVideosTracked: 940,
    extraSignals: [
      { source: "google_trends", metric: "Search index peak month", value: "91 / 100", growth: 48, detail: "Shopify reconciliation searches spike every January during year-end close", confidence: 82 },
      { source: "x", metric: "Bookkeeper complaints / mo", value: "410", detail: "Bookkeepers venting about Shopify payout discrepancies, tagging QuickBooks and Shopify accounts", confidence: 64 },
    ],
  },
};
