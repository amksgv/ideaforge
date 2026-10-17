import type { IdeaBrief } from "@/pipeline/brief";

export const nestEgg: IdeaBrief = {
  slug: "nestegg-gig-retirement",
  title: "Automated micro-retirement savings for 1099 and gig workers",
  tagline: "NestEgg rounds up every Uber payout and silently grows your Roth IRA — no employer required.",
  emoji: "🥚",
  category: "Fintech",
  businessModel: "B2C",
  tags: ["retirement", "gig economy", "1099", "roth ira", "micro-investing", "self-employed", "fintech", "tax"],

  narrative:
    "Sixty-eight million Americans work as independent contractors, freelancers, or gig-platform workers, and 56% of them have zero retirement savings. The employer 401k — the mechanism that quietly builds wealth for W-2 workers — does not exist for them. Setting up a Solo 401k or SEP-IRA requires a financial advisor appointment, a brokerage account, estimated-tax planning, and the discipline to manually transfer money during a good month. Most gig workers never start, not because they don't want to save, but because the activation energy is impossibly high when income is irregular and tax obligations are opaque.\n\nNestEgg removes every decision from the loop. After a two-minute bank link, it monitors deposits from gig platforms (Stripe, Lyft, DoorDash payouts, Venmo business) and applies a user-set round-up or percentage rule — say, 4% of every payout over $200. Contributions flow into a custodied Roth IRA (via a brokerage partner API) and are invested in a target-date fund by default. In parallel, NestEgg's self-employment tax estimator sets aside 15.3% of net income into a separate FDIC-insured tax bucket, so quarterly estimated payments don't blindside users. A weekly nudge fires on high-earning weeks: 'You made $940 this week — good week to bump your IRA contribution to 5%.'\n\nThe business model is $6/month after a 60-day free trial — cheaper than one missed quarterly tax penalty. Retention is structural: the IRA custodian relationship means NestEgg holds the user's retirement account, not just their attention. As assets under administration grow, NestEgg earns a 0.25% annual AUM fee on the IRA balance in addition to the subscription, creating a compounding revenue stream aligned with user wealth creation.",

  proofSummary:
    "Fourteen states have passed or are actively implementing auto-IRA mandates for employers, flooding the cultural conversation with 'gig worker retirement' framing; simultaneously, search volume for 'self-employed Roth IRA' has grown 118% YoY, confirming an audience that is now aware of the gap and actively looking for solutions.",

  whyNow: {
    summary:
      "The gig workforce has crossed 68 million workers and is still growing, state auto-IRA mandates are normalizing automated retirement savings, open-banking and brokerage partner APIs make a sub-$100k build feasible, and the post-pandemic surge in 1099 work has left a generation of new self-employed workers without the retirement infrastructure their W-2 peers take for granted.",
    drivers: [
      "68M U.S. gig and 1099 workers represent a bigger addressable market than all small businesses combined — and their retirement savings gap is the largest in the country.",
      "Fourteen state auto-IRA programs (CalSavers, OregonSaves, etc.) have driven mainstream press coverage of 'retirement without an employer,' priming awareness at zero marketing cost.",
      "Drivewealth, Apex Clearing, and similar BaaS brokerage partners offer IRA custodian APIs that let fintechs open and fund Roth IRAs without a broker-dealer license.",
      "Open-banking aggregators (Plaid, Finicity) make gig-payout detection reliable enough to build rounding rules on — a technical barrier that didn't exist five years ago.",
      "IRS estimated-tax penalties hit an all-time high in 2024 filings, creating acute pain that makes the 'tax set-aside' feature a viral hook in 1099 communities.",
    ],
  },
  marketGap:
    "Acorns and Betterment serve W-2 investors who already save and want to optimize. TurboTax Self-Employed handles taxes but does not invest. No product automatically detects gig income, splits it into an IRA contribution and a tax reserve, and operates entirely within the irregular-income mental model of a 1099 worker.",

  executionPlan: {
    summary:
      "Launch with a single gig-payout integration (Stripe payouts), nail the IRA-open and round-up loop for Uber and DoorDash drivers, then expand income-source coverage and add the tax-estimation layer in month four.",
    steps: [
      {
        title: "One-click Roth IRA open via brokerage partner",
        detail: "Integrate Drivewealth or Apex BaaS to open a custodied Roth IRA in under 3 minutes — bank-link via Plaid, KYC auto-verified, default target-date fund selected. This is the core retention anchor.",
      },
      {
        title: "Gig-payout detection and round-up engine",
        detail: "Use Plaid transaction tagging to identify deposits from Uber, Lyft, DoorDash, Instacart, and Stripe marketplaces; apply the user's contribution rule and queue the ACH to the IRA on a 3-business-day lag to avoid overdraft.",
      },
      {
        title: "Tax set-aside bucket",
        detail: "Launch a separate FDIC-insured savings bucket that automatically moves 15.3% SE-tax equivalent of every identified gig deposit into a reserve account, with a Q1/Q2/Q3/Q4 estimated-payment reminder and a pre-filled 1040-ES amount.",
      },
      {
        title: "High-week nudge and contribution optimizer",
        detail: "Weekly push notification on earning weeks above the user's 75th percentile: suggest bumping contribution rate. This surfaces on the week when the user feels flush and is most likely to increase the habit.",
      },
    ],
  },

  offer: [
    {
      kind: "lead",
      name: "Free Retirement Gap Calculator",
      price: "$0",
      description: "Link income history and see your projected retirement shortfall vs. a comparable W-2 saver — no account required. Converts at the awareness stage.",
    },
    {
      kind: "frontend",
      name: "NestEgg Starter",
      price: "$6/mo",
      description: "Roth IRA with automatic round-ups from one bank account, target-date investing, and the weekly high-week nudge. 60-day free trial.",
    },
    {
      kind: "core",
      name: "NestEgg Plus",
      price: "$12/mo",
      description: "Everything in Starter plus the SE-tax set-aside bucket, quarterly estimated-tax reminders with pre-filled 1040-ES amounts, and unlimited income-source connections.",
    },
    {
      kind: "backend",
      name: "NestEgg Pro + AUM",
      price: "$12/mo + 0.25% AUM/yr",
      description: "Adds a Solo 401k option for higher earners (contribution limit $69k vs. $7k for Roth IRA), personalized contribution optimizer, and priority chat support. AUM fee activates once IRA balance exceeds $5,000.",
    },
  ],

  valueEquation: {
    dreamOutcome: "A gig worker retires with the same security as a W-2 employee — without ever having had a 401k match or an employer.",
    perceivedLikelihood: "Medium-High — the round-up mechanic is proven by Acorns; the IRA wrapper makes it feel 'official' and permanent rather than disposable savings.",
    timeDelay: "First IRA contribution visible within 5 business days of sign-up; long-term wealth is the story, but the early win is immediate.",
    effortAndSacrifice: "Near-zero active effort after the 2-minute setup; contributions happen automatically with no recurring decision required.",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 8,
    value: 9,
    rationale:
      "Highly differentiated by combining IRA custodianship with gig-income-specific detection and a tax set-aside in a single product — no incumbent does all three. Value is very high because it addresses a structural wealth gap, not a lifestyle optimization.",
  },

  acp: {
    audience: "U.S.-based 1099 workers earning $20k–$80k annually from gig platforms — rideshare drivers, delivery workers, freelance designers, and multi-app gig workers who file a Schedule C.",
    community: "r/UberDrivers, r/doordash_drivers, r/freelance, gig-worker Facebook groups, and YouTube channels covering '1099 taxes explained' and 'self-employed retirement' topics.",
    product: "An automated Roth IRA that lives off gig-income round-ups, includes a tax set-aside calculator, and requires exactly zero ongoing decisions from the user.",
  },

  competitor: {
    name: "Acorns / Betterment / Carry",
    note: "Acorns offers round-up investing but not IRA-specific vehicles or gig-income detection. Betterment has IRAs but targets traditional savers. Carry (Solo 401k app) serves higher-earning freelancers and requires manual contributions. No competitor combines gig-payout detection, automatic IRA funding, and SE-tax estimation.",
  },

  marketSize: {
    tam: "$220B U.S. self-directed retirement savings and robo-advisor market",
    sam: "$8.4B addressable among the 68M gig/1099 workers who earn over $15k annually and have no retirement account",
    som: "$22M ARR within 4 years via 150,000 paying subscribers at $10 blended ARPU plus $3.5M in AUM fees on $1.4B in administered assets",
    note: "Bottoms-up: 68M gig workers, ~9% are 'savings-ready' (earning $25k+ with a smartphone and bank account); targeting 250k in year 3 at 60% paid conversion ≈ 150k subscribers.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Full-time for the first 18 months; regulatory (IRA custodian partner agreement) and compliance overhead requires focused attention early.",
  },

  businessFit: {
    revenue: {
      label: "$1M–$10M ARR",
      detail: "Subscription plus AUM creates two compounding revenue streams; AUM fees grow automatically as user balances increase — no additional marketing spend required.",
    },
    execution: {
      label: "Medium — regulatory overhead front-loaded",
      detail: "Brokerage partnership and IRA custodian agreement require 2-4 months of legal and compliance work; the tech (Plaid + ACH + brokerage API) is well-trodden after that.",
    },
    goToMarket: {
      label: "Content SEO + gig-driver communities",
      detail: "'How to save for retirement as an Uber driver' has 40k monthly searches; ranking for long-tail tax + retirement keywords brings in high-intent users at near-zero CAC.",
    },
    founder: {
      label: "Strong for fintech or tax-software operators",
      detail: "Prior experience at a brokerage, robo-advisor, or tax-prep company cuts 6-12 months off the partnership negotiation and compliance setup timeline.",
    },
  },

  signals: {
    keywords: [
      { term: "roth ira for gig workers", volume: 4800, growth: 118, competition: "Low" },
      { term: "self employed retirement account", volume: 12400, growth: 74, competition: "Medium" },
      { term: "1099 retirement savings", volume: 6200, growth: 138, competition: "Low" },
      { term: "estimated tax calculator self employed", volume: 18700, growth: 42, competition: "High" },
      { term: "solo 401k vs sep ira freelancer", volume: 3600, growth: 195, competition: "Low" },
    ],
    trendShape: [38, 41, 44, 48, 53, 57, 61, 67, 72, 78, 84, 91],
    searchGrowthYoY: 118,
    communities: [
      {
        platform: "reddit",
        name: "r/UberDrivers",
        size: "176k members",
        reach: 176000,
        keyPains: [
          "No employer match and no easy way to open a retirement account without an accountant.",
          "Quarterly estimated taxes blindside new drivers in their first year — leading to large penalties.",
          "Income volatility makes it hard to commit to a fixed monthly savings amount.",
        ],
        moneySignals: [
          "Drivers asking which robo-advisor accepts small irregular deposits for a Roth IRA.",
          "Posts about owing $2,000–$6,000 in unexpected SE-tax — willing to pay for tools that prevent it.",
          "Threads about drivers using Acorns but wishing it invested into a Roth IRA instead.",
        ],
        freshOpportunities: [
          "Auto-detect Uber payout deposits and route a percentage to an IRA without driver action",
          "Pre-filled quarterly estimated-tax amount based on YTD earnings",
        ],
        mostWantedFixes: [
          "One app that handles both retirement savings and quarterly taxes so I don't need two services",
          "Round-up saving that works on irregular payout amounts, not a fixed monthly transfer",
        ],
      },
      {
        platform: "youtube",
        name: "Self-Employed Money (channel)",
        size: "89k subscribers",
        reach: 89000,
        keyPains: [
          "Freelancers overwhelmed by Solo 401k contribution rules and filing deadlines.",
          "Fear of audits preventing gig workers from claiming all their deductions.",
        ],
        moneySignals: [
          "Sponsored integrations with tax-prep tools getting high engagement — audience is actively spending on financial tools.",
          "Comment sections asking for a 'one app for retirement AND taxes' recommendation on every relevant video.",
        ],
        freshOpportunities: [
          "YouTube SEO content funnel: 'NestEgg vs. Acorns for 1099 workers'",
          "Partner with gig-finance creators for unboxing-style setup walkthroughs",
        ],
        mostWantedFixes: [
          "Automatic IRA contribution tied directly to Uber/DoorDash deposit detection",
          "Tax penalty calculator that tells me exactly what I owe before the IRS does",
        ],
      },
    ],
    redditMentionsPerMonth: 1140,
    youtubeVideosTracked: 2200,
    extraSignals: [
      {
        source: "google_trends",
        metric: "Trend index — 'gig worker retirement'",
        value: "76 (out of 100)",
        growth: 112,
        detail: "Sharp rise in January each year (tax season) with a new higher baseline each subsequent off-season — structural growth, not seasonal spike.",
        confidence: 81,
      },
      {
        source: "x",
        metric: "State auto-IRA news mentions / mo",
        value: "290",
        detail: "CalSavers, Illinois Secure Choice, and similar programs generating press that reaches gig-worker audiences and primes the 'retirement without employer' concept.",
        confidence: 62,
      },
    ],
  },
};
