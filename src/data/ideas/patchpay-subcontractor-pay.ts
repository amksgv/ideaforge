import type { IdeaBrief } from "@/pipeline/brief";

export const patchPay: IdeaBrief = {
  slug: "patchpay-subcontractor-pay",
  title: "Instant pay and job dispatch for home-service subcontractors",
  tagline: "PatchPay puts next-day checks out of business — subs get paid the minute the job photo is uploaded.",
  emoji: "⚡",
  category: "Local Services",
  businessModel: "Marketplace",
  tags: ["subcontractors", "instant pay", "field service", "embedded finance", "hvac", "electrical", "plumbing", "gig economy"],

  narrative:
    "A licensed HVAC tech who runs his own two-man crew finishes a commercial install on Friday afternoon. The GC cuts a check — maybe in two weeks, maybe three, depending on their billing cycle. Meanwhile the tech has $4,200 in materials on a card that comes due Monday. This is the daily financial reality for the estimated 4.6 million subcontractors in U.S. residential and light-commercial trades, and it is the single biggest reason skilled tradespeople leave the field or refuse certain GCs entirely.\n\nPatchPay is a job-dispatch and instant-payout platform that sits between GCs or service companies and their 1099 sub networks. The GC posts a job, a verified sub accepts it, uploads a photo of the completed work and any materials receipts, and PatchPay releases same-day or next-business-morning pay via Stripe Connect — taking a 1.9% instant-payout fee. GCs pay a flat $49/mo per crew slot to access the dispatch board and get digital proof-of-completion records that simplify their own lien-waiver and AP workflows. Subs pay nothing to join; they earn more by accepting jobs through the platform because GCs can post higher-margin jobs knowing they avoid the check-cutting overhead.\n\nThe wedge is the back-office pain on both sides. GCs hate cutting thirty checks a week and chasing W-9s; subs hate float. PatchPay kills both with a single workflow: dispatch → photo proof → instant ACH. The network effect locks in quickly — a GC who books ten subs through PatchPay has already trained their project managers on the dashboard and is unlikely to revert to spreadsheets and envelopes.",

  proofSummary:
    "Searches for 'subcontractor payment app' and 'same day pay contractor' have grown over 140% YoY, and trades-focused subreddits log hundreds of monthly complaints about slow GC pay — validating that the problem is real, urgent, and under-served by generic payroll tools.",

  whyNow: {
    summary:
      "A skilled-trades labor shortage gives subs leverage to demand faster pay, gig-economy instant-pay expectations have become the norm, Stripe Connect makes embedded instant ACH cheap to build, and aging paper-based contractor back-offices are finally being replaced.",
    drivers: [
      "U.S. construction has 400,000+ unfilled trade jobs; subs can now walk away from slow-pay GCs — giving the pay problem real urgency.",
      "Uber and DoorDash normalized instant pay for gig workers; trades subs now expect the same and specifically seek it.",
      "Stripe Connect (and similar rails) reduced the engineering lift of holding funds and disbursing instantly to under a week of integration work.",
      "OSHA and state lien-law digitization are pushing GCs toward digital proof-of-work records, creating a receptive audience for platform adoption.",
      "Private equity roll-ups of HVAC and plumbing franchises need standardized dispatch and pay workflows across dozens of acquired shops.",
    ],
  },
  marketGap:
    "Generic payroll tools (Gusto, ADP) serve W-2 employees, not job-by-job 1099 crews. Factoring companies offer slow-pay advances at 4-6% — expensive and opaque. No product combines real-time job dispatch, photo proof-of-completion, and instant payout in a single sub-facing mobile app that is also the GC's scheduling board.",

  executionPlan: {
    summary:
      "Launch in one metro with three GC anchor accounts, prove the instant-payout loop, then expand via GC referrals and PE-backed trade franchises.",
    steps: [
      {
        title: "Lock three anchor GCs in one metro",
        detail: "Sign three mid-sized GCs (10-40 active subs each) in a single city — Dallas or Phoenix — offering free platform access for 90 days to seed the sub network and prove the dispatch-to-payout loop.",
      },
      {
        title: "Ship the sub-facing mobile app",
        detail: "React Native app: job board, one-tap accept, camera proof upload, and real-time pay status. Stripe Connect onboarding for sub KYC and instant ACH disbursal within the same session.",
      },
      {
        title: "Monetize GCs on the scheduling tier",
        detail: "After the free period, convert GCs to $49/mo per active crew slot; include digital lien-waiver templates and W-9 collection as high-retention features that matter to their AP departments.",
      },
      {
        title: "Expand via PE franchise networks",
        detail: "Target private-equity-owned HVAC and plumbing roll-ups (ServiceTitan customers operating 20+ locations) where one enterprise deal replaces hundreds of individual GC conversations.",
      },
    ],
  },

  offer: [
    {
      kind: "lead",
      name: "Free Sub Account",
      price: "$0",
      description: "Subs join free, see available jobs in their trade and zip code, and get instant-payout eligibility on their first accepted job.",
    },
    {
      kind: "frontend",
      name: "GC Starter",
      price: "$49/mo",
      description: "Up to 5 active crew slots, job-dispatch board, photo proof-of-completion archive, and digital W-9 collection.",
    },
    {
      kind: "core",
      name: "GC Growth",
      price: "$149/mo",
      description: "Up to 25 crew slots, lien-waiver templates, QuickBooks sync, and sub performance ratings.",
    },
    {
      kind: "backend",
      name: "Enterprise / Franchise",
      price: "$1,200/mo",
      description: "Unlimited crew slots across multiple locations, consolidated AP reporting, custom payout schedules, and a dedicated onboarding specialist — built for PE-backed trade roll-ups.",
    },
  ],

  valueEquation: {
    dreamOutcome: "Subs get paid the day the job is done; GCs eliminate check runs, chase-downs, and lien disputes.",
    perceivedLikelihood: "High — the instant-payout mechanic is proven tech (Stripe, Uber model); the outcome is concrete and visible on day one.",
    timeDelay: "Same business day from photo upload to funds in the sub's account.",
    effortAndSacrifice: "Minimal for subs (download app, link bank account); moderate for GCs (one-time import of sub contacts and project list).",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 8,
    value: 9,
    rationale:
      "Very high value — solving a cash-flow crisis that directly causes trade-labor attrition — and differentiated by combining dispatch scheduling with embedded instant pay in one workflow. Nearest competitors address only one side of the equation.",
  },

  acp: {
    audience: "1099 HVAC, electrical, and plumbing subcontractors (sole operators and small crews of 2-5), plus the GCs and service-company project managers who dispatch them.",
    community: "r/HVAC, r/electricians, r/Plumbing, trade-specific Facebook groups, and ServiceTitan community forums where subs discuss pay disputes and scheduling tools.",
    product: "A mobile-first job-dispatch and instant-payout platform that replaces the check, the spreadsheet, and the phone call — all in one photo upload.",
  },

  competitor: {
    name: "Branch / Everee / generic payroll",
    note: "Branch and Everee offer earned-wage-access for hourly workers but have no job-dispatch layer and are not trades-specific. No incumbent owns the combined dispatch-plus-instant-pay workflow for 1099 sub networks.",
  },

  marketSize: {
    tam: "$18B subcontractor payments and back-office software in U.S. residential and light-commercial construction",
    sam: "$2.4B addressable among GCs and franchise service companies with 5-100 active subs who already use digital scheduling tools",
    som: "$30M ARR within 4 years via 500 enterprise GC accounts at $1,200/mo plus transaction fees on $600M in processed instant payouts",
    note: "Bottoms-up: 4.6M U.S. subcontractors; targeting the 12% employed by GCs using any digital tool; 1.9% take-rate on average $2,800 job ≈ $53 per payout event.",
  },

  founderFit: {
    investment: "Medium",
    technicalSkill: "Medium",
    timeCommitment: "Full-time; marketplace cold-start requires founder-led GC sales for the first 6-12 months.",
  },

  businessFit: {
    revenue: {
      label: "$1M–$10M ARR",
      detail: "Dual revenue streams (SaaS subscription + transaction take-rate) create durable unit economics once the sub network reaches density in a metro.",
    },
    execution: {
      label: "Medium difficulty — marketplace cold-start",
      detail: "The tech (Stripe Connect, React Native) is proven; the hard part is simultaneously convincing GCs to post jobs and subs to be available, requiring tight geographic focus at launch.",
    },
    goToMarket: {
      label: "Direct GC sales + sub word-of-mouth",
      detail: "GCs are reachable via trade association events, ServiceTitan partner channels, and LinkedIn; subs spread the app virally once instant pay is working.",
    },
    founder: {
      label: "Strong for founders with trades-industry or fintech ops background",
      detail: "Domain credibility with GCs shortens the sales cycle from months to weeks; prior experience in payroll, factoring, or field-service software is a major advantage.",
    },
  },

  signals: {
    keywords: [
      { term: "subcontractor payment app", volume: 5400, growth: 145, competition: "Low" },
      { term: "same day pay contractor", volume: 3800, growth: 188, competition: "Low" },
      { term: "instant pay for contractors", volume: 4200, growth: 162, competition: "Low" },
      { term: "hvac subcontractor scheduling software", volume: 2900, growth: 97, competition: "Medium" },
      { term: "contractor job dispatch app", volume: 3100, growth: 134, competition: "Medium" },
      { term: "subcontractor management software", volume: 8800, growth: 54, competition: "High" },
    ],
    trendShape: [32, 35, 37, 41, 46, 51, 56, 61, 67, 73, 80, 88],
    searchGrowthYoY: 143,
    communities: [
      {
        platform: "reddit",
        name: "r/HVAC",
        size: "214k members",
        reach: 214000,
        keyPains: [
          "GCs holding checks for 30-45 days while subs carry materials cost on personal credit.",
          "No-show or last-minute job cancellations with no compensation.",
          "Paper W-9 and check process wastes half a Friday every two weeks.",
        ],
        moneySignals: [
          "Subs posting they turned down GC relationships specifically because of slow-pay history.",
          "Multiple threads about factoring companies charging 5% — subs willing to pay for faster cash.",
          "Subs asking for recommendations for apps that pay same day.",
        ],
        freshOpportunities: [
          "Verified instant-pay GC badge to attract better sub crews",
          "Digital job-completion proof that protects subs in lien disputes",
        ],
        mostWantedFixes: [
          "Same-day or next-day ACH directly tied to job completion",
          "Transparent job board with pay rate and GC rating visible before accepting",
        ],
      },
      {
        platform: "facebook",
        name: "HVAC & Plumbing Contractors Network",
        size: "67k members",
        reach: 67000,
        keyPains: [
          "GC project managers unreachable on weekends when emergency dispatch is needed.",
          "Disputes over what constitutes 'complete' work delaying final payment.",
        ],
        moneySignals: [
          "Members advertising their own sub crews as 'available immediately — prefer quick-pay GCs only.'",
          "Posts recommending specific GCs known for fast payment, indicating pay speed is a competitive differentiator.",
        ],
        freshOpportunities: [
          "Standardized photo proof standard accepted by all GCs on the platform",
          "Crew-availability calendar so GCs can book a week in advance",
        ],
        mostWantedFixes: [
          "One app where both GC and sub see the same job status in real time",
          "Automatic materials-receipt capture and reimbursement in the same payout",
        ],
      },
    ],
    redditMentionsPerMonth: 820,
    youtubeVideosTracked: 640,
    extraSignals: [
      {
        source: "google_trends",
        metric: "Trend index — 'contractor instant pay'",
        value: "82 (out of 100)",
        growth: 155,
        detail: "Sustained rise over 18 months, peak in Q1 2026 aligning with construction-season ramp.",
        confidence: 74,
      },
      {
        source: "x",
        metric: "Trade-founder mentions / mo",
        value: "410",
        detail: "Trades-focused operators discussing fintech for subcontractors; growing thread volume in early 2026.",
        confidence: 55,
      },
    ],
  },
};
