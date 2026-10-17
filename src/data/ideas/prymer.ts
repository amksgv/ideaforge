import type { IdeaBrief } from "@/pipeline/brief";

export const prymer: IdeaBrief = {
  slug: "prymer-ai-onboarding-copilot",
  title: "AI onboarding copilot that turns kickoff calls into a live success plan",
  tagline: "Prymer listens to B2B kickoff calls and auto-builds the success plan, risks, and next steps.",
  emoji: "🛫",
  category: "AI & Automation",
  businessModel: "B2B",
  tags: ["customer success", "ai notetaker", "onboarding", "saas", "b2b"],

  narrative:
    "Every B2B onboarding starts with a kickoff call full of goals, stakeholders, and landmines — and almost none of it makes it into the CRM. The CSM scribbles notes, promises a recap, and three weeks later nobody remembers what 'success' was supposed to look like. Churn that traces back to a fumbled first 30 days is the most expensive churn there is.\n\nPrymer sits on the kickoff call like a notetaker, but instead of a transcript it produces a structured mutual success plan: the customer's stated goals, the metrics they'll judge you on, the decision-makers, the integration blockers, and a dated task list synced to your CRM. As the engagement continues, it re-listens to QBRs and flags drift — 'the champion who set these goals left two weeks ago.'\n\nThe wedge is narrow on purpose: not another notetaker, but the system of record for the first 90 days. CS leaders already pay for Gong and a notetaker; Prymer is the layer that turns those recordings into an accountable plan and an early-warning system.",
  proofSummary:
    "AI notetakers crossed the chasm into default B2B behavior, but the recordings mostly rot. Search and community demand has shifted from 'best AI notetaker' toward 'turn calls into action / CRM' — a clear signal the market wants synthesis, not more transcripts.",

  whyNow: {
    summary:
      "Meeting-AI is now ambient and cheap, CRMs opened up write APIs, and CS teams are under margin pressure to prevent churn without adding headcount.",
    drivers: [
      "AI transcription cost fell ~90% in 24 months, making per-call structured synthesis economical.",
      "Customer success budgets are being cut while net-revenue-retention targets rise — automation is the only lever.",
      "Notetakers normalized bots-on-calls, removing the adoption hurdle.",
      "HubSpot/Salesforce write APIs make two-way CRM sync turnkey.",
    ],
  },
  marketGap:
    "Notetakers optimize for the meeting; CRMs optimize for the deal. Nobody owns the structured, accountable artifact of the first 90 days of the customer relationship — the exact window where churn is decided.",

  executionPlan: {
    summary:
      "Start as a Zoom/Meet bot for a single vertical (CS teams at 20-200 person SaaS), nail the mutual success plan, then expand into drift detection and QBR automation.",
    steps: [
      { title: "Wedge on the kickoff call", detail: "Ship a bot that outputs one artifact: a structured mutual success plan from the kickoff, exported to Notion + HubSpot." },
      { title: "Close the CRM loop", detail: "Two-way sync tasks and goals so the plan lives where the CSM already works; this is the retention hook." },
      { title: "Add drift detection", detail: "Re-analyze later calls against the original goals and surface 'success-at-risk' alerts to CS leadership." },
      { title: "Land-and-expand pricing", detail: "Per-seat for CSMs, then a leadership analytics tier on portfolio-wide risk." },
    ],
  },

  offer: [
    { kind: "lead", name: "Kickoff Plan Generator", price: "$0", description: "Free: upload one call recording, get a formatted mutual success plan." },
    { kind: "frontend", name: "Solo CSM", price: "$39/mo", description: "Live bot on your calls + Notion export for a single CSM." },
    { kind: "core", name: "Team", price: "$59/seat/mo", description: "Two-way CRM sync, templates, and shared success plans across the CS team." },
    { kind: "backend", name: "Leadership Analytics", price: "$1,500/mo", description: "Portfolio-wide success-at-risk dashboard and drift alerts for CS leaders." },
  ],
  valueEquation: {
    dreamOutcome: "Zero customers churn because the first 90 days were vague.",
    perceivedLikelihood: "High — it works off calls that already happen, with visible artifacts on day one.",
    timeDelay: "Immediate: a plan exists the moment the kickoff call ends.",
    effortAndSacrifice: "Near-zero — invite a bot you already invite to every call.",
    score: 9,
  },
  marketMatrix: {
    uniqueness: 7,
    value: 8,
    rationale:
      "High value (directly defends NRR) and differentiated by owning the success-plan artifact rather than the transcript — but notetaker incumbents could extend downward, so the moat is workflow depth + CRM lock-in.",
  },
  acp: {
    audience: "Customer success managers and CS leaders at 20-500 person B2B SaaS companies.",
    community: "CS collectives (Gain Grow Retain, r/CustomerSuccess), RevOps Slack groups, and LinkedIn CS influencers.",
    product: "A kickoff-to-QBR copilot that turns calls into an accountable success plan and a churn early-warning system.",
  },
  competitor: {
    name: "Gong / Catalyst / generic notetakers",
    note: "Gong owns revenue-call intelligence and Catalyst owns CS platforms, but neither produces the lightweight mutual success plan that small CS teams actually maintain. Prymer wedges under both.",
  },
  marketSize: {
    tam: "$8B customer-success software",
    sam: "$1.2B AI-assisted CS tooling for SMB/mid-market SaaS",
    som: "$25M ARR within reach via 35k mid-market CS teams",
    note: "Bottoms-up: ~120k SaaS companies with CS functions; capturing 3% at ~$700/mo average ≈ $25M ARR.",
  },
  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Full-time, but shippable solo with off-the-shelf transcription + LLM APIs.",
  },
  businessFit: {
    revenue: { label: "$1M–$10M ARR", detail: "Per-seat SaaS with a high-ACV leadership tier; sticky once it's the CS system of record." },
    execution: { label: "Solo-friendly, 3-week MVP", detail: "Wraps existing transcription + LLM APIs; the hard part is CRM sync, not the AI." },
    goToMarket: { label: "Community-led + CS influencers", detail: "Warm, vocal niche that shares tools; founder-led content in CS communities converts." },
    founder: { label: "Strong for RevOps/CS operators", detail: "Best for someone who has lived onboarding churn; domain credibility shortens sales cycles." },
  },

  signals: {
    keywords: [
      { term: "ai notetaker for customer success", volume: 6400, growth: 210, competition: "Medium" },
      { term: "customer onboarding software", volume: 14800, growth: 38, competition: "High" },
      { term: "mutual success plan template", volume: 3200, growth: 120, competition: "Low" },
      { term: "turn meeting notes into crm tasks", volume: 2600, growth: 260, competition: "Low" },
      { term: "reduce saas churn first 90 days", volume: 1900, growth: 90, competition: "Low" },
    ],
    trendShape: [44, 47, 49, 53, 58, 60, 65, 69, 74, 80, 86, 93],
    searchGrowthYoY: 168,
    communities: [
      {
        platform: "reddit",
        name: "r/CustomerSuccess",
        size: "92k members",
        reach: 92000,
        keyPains: [
          "Kickoff goals never make it into the CRM and get forgotten.",
          "Notetakers produce transcripts no one reads.",
          "Churn post-mortems trace back to a vague first 30 days.",
        ],
        moneySignals: [
          "CSMs expensing personal notetaker subscriptions.",
          "Teams paying agencies to build onboarding playbooks.",
        ],
        freshOpportunities: [
          "Auto-built mutual success plans",
          "Champion-departure risk alerts",
        ],
        mostWantedFixes: ["Two-way CRM sync", "Goal-drift detection over time"],
      },
      {
        platform: "facebook",
        name: "RevOps & CS Leaders",
        size: "18k members",
        reach: 18000,
        keyPains: [
          "No portfolio-wide view of which accounts are drifting from goals.",
          "Onboarding quality varies wildly by CSM.",
        ],
        moneySignals: ["Leaders budgeting for 'CS automation' line items in 2026 plans."],
        freshOpportunities: ["Leadership risk dashboard"],
        mostWantedFixes: ["Standardized onboarding artifact across the team"],
      },
    ],
    redditMentionsPerMonth: 540,
    youtubeVideosTracked: 1300,
    extraSignals: [
      { source: "x", metric: "Founder mentions / mo", value: "320", detail: "CS leaders posting about onboarding churn", confidence: 58 },
    ],
  },

  gregsPick: true,
};
