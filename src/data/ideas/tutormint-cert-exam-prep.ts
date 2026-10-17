import type { IdeaBrief } from "@/pipeline/brief";

export const tutorMint: IdeaBrief = {
  slug: "tutormint-cert-exam-prep",
  title: "AI exam-prep generator that builds adaptive practice tests from official cert blueprints",
  tagline: "TutorMint turns any professional certification blueprint into a personalized study plan and unlimited adaptive practice questions.",
  emoji: "📋",
  category: "Education",
  businessModel: "B2C",
  tags: ["certifications", "exam prep", "adaptive learning", "ai", "vocational", "nclex", "comptia", "aws", "real estate"],

  narrative:
    "Credential inflation has made professional certifications unavoidable for career-switchers — but the prep market is dominated by $300–$600 courses built for an era before LLMs could cheaply generate blueprint-aligned questions on demand. A nursing graduate grinding NCLEX, a warehouse worker chasing a CDL, a marketing analyst pivoting to cloud computing via AWS Solutions Architect: all of them face the same problem. Official study guides are dense and passive, mock exams run out after 200 questions, and adaptive tutoring costs hundreds of dollars per month from platforms like UWorld or Kaplan that were designed for legacy workflows.\n\nTutorMint ingests the publicly available exam blueprint for a certification — the domain weighting tables every testing body publishes — and uses an LLM to generate an unlimited bank of scenario-based practice questions tied precisely to those domains. After each session it re-weights the next session toward weak domains, producing a genuinely adaptive loop at a fraction of competitor cost. The beachhead is CompTIA Security+, a high-volume cert with 650,000 annual exam-takers, a clear domain taxonomy, and a buyer who is already comfortable with self-directed online learning. From there the architecture generalizes cleanly to NCLEX, AWS, NASM, real estate, and CDL with only blueprint ingestion work per exam.\n\nThe defensible moat is not the questions — it is the structured study-plan layer that maps a user's target exam date and current performance to a daily drill schedule, plus explanation quality that rivals human tutors. Unlike YouTube videos or PDF dumps, every explanation cites the relevant blueprint domain so users understand exactly where they stand in the scoring matrix. That traceability, combined with a personalized calendar and streaks, creates the habit loop that passive content never could.",

  proofSummary:
    "UWorld and Kaplan together exceed $500M in annual cert-prep revenue, yet both rely on static question banks written by humans; Google Trends shows 'CompTIA Security+ practice test' growing 74% YoY as remote-friendly IT roles spike, signaling unmet demand for cheaper, fresher prep.",

  whyNow: {
    summary:
      "LLMs can now generate high-quality, blueprint-aligned scenario questions at near-zero marginal cost, arriving just as credential inflation and mass career-switching create record certification exam volumes.",
    drivers: [
      "LLM prompt-engineering now reliably produces NCLEX/CompTIA-style scenario questions that pass domain-alignment checks, collapsing content-creation cost by ~95%.",
      "Career-switcher volume surged post-2022 layoffs; CompTIA reports a 22% rise in Security+ exam registrations in 2024 alone.",
      "Incumbent prep courses (Kaplan, UWorld) charge $299–$599 upfront and have not materially changed their format in five years.",
      "Testing bodies publish detailed blueprint PDFs freely, giving any builder a structured schema to generate against without licensing content.",
      "App-store habit loops (streaks, spaced repetition) are now understood and expected by learners weaned on Duolingo.",
    ],
  },
  marketGap:
    "Every major prep provider sells a static question bank written by committee and priced for enterprise or desperate students. No product yet offers unlimited adaptive questions generated fresh from the official blueprint with per-domain weakness tracking at under $30/month.",

  executionPlan: {
    summary:
      "Nail CompTIA Security+ as the beachhead — highest volume, tech-comfortable buyer, clean blueprint — then expand to NCLEX and AWS once the adaptive engine is proven.",
    steps: [
      { title: "Build the blueprint ingestion pipeline", detail: "Parse CompTIA Security+ domain table into a structured JSON schema; prompt-engineer a question generator that tags every output to a domain and subdomain, with a quality rubric validated against 50 real exam questions." },
      { title: "Ship the adaptive drill loop", detail: "Launch a web app: timed quiz sessions, per-domain performance graphs, a generated explanation per question with blueprint citation. No app required for MVP — browser-only." },
      { title: "Add the personalized study plan", detail: "Ask the user their exam date and current practice-test score; generate a day-by-day calendar that front-loads weak domains and builds in review days. Send daily email nudges." },
      { title: "Expand to second and third certs", detail: "NCLEX-RN (200k+ annual takers, $1.2B prep market) and AWS Solutions Architect are next; blueprint ingestion is the only per-cert work. Partner with nursing school Discord servers and AWS study groups for organic distribution." },
    ],
  },

  offer: [
    { kind: "lead", name: "Blueprint Sampler", price: "$0", description: "Free: 25 adaptive practice questions for any supported cert, with domain-tagged explanations and a sample study schedule." },
    { kind: "frontend", name: "Month Pass", price: "$19/mo", description: "Unlimited practice questions, full adaptive engine, personalized study calendar, and performance dashboard for one cert." },
    { kind: "core", name: "Exam Bundle", price: "$49 one-time", description: "Unlimited access to one cert until you pass, including full mock exams under timed conditions and a progress report." },
    { kind: "backend", name: "All-Access Pass", price: "$99/yr", description: "Unlimited questions across all supported certs, priority blueprint updates when exam objectives change, and downloadable performance PDFs for employer proof." },
  ],
  valueEquation: {
    dreamOutcome: "Pass your certification on the first attempt and unlock the salary jump that came with it.",
    perceivedLikelihood: "High — personalized domain feedback tells the user exactly what to study, removing guesswork that causes retakes.",
    timeDelay: "Study plan starts the moment you log in; most users hit passing-score territory within 4–6 weeks of consistent daily drills.",
    effortAndSacrifice: "Low relative to static courses — 20-minute daily sessions replace hours of passive video-watching.",
    score: 8,
  },
  marketMatrix: {
    uniqueness: 7,
    value: 8,
    rationale:
      "High value — a passing score is worth $10k–$30k in annual salary to most takers — and meaningfully differentiated by adaptive blueprint alignment and price point versus Kaplan/UWorld. Uniqueness is not a 10 because flashcard apps and some AI tutors already exist; the moat is the blueprint ingestion layer and explanation quality at the $19 price point.",
  },
  acp: {
    audience: "Career-switchers and working adults pursuing CompTIA, AWS, NCLEX, NASM, real estate, or CDL certifications on a tight budget and timeline.",
    community: "r/CompTIA, r/NCLEX, AWS certification Discord servers, nursing school Facebook groups, and real estate exam prep YouTube channels.",
    product: "An adaptive AI drill engine that generates unlimited blueprint-aligned practice questions with domain-weakness tracking and a personalized day-by-day study plan.",
  },
  competitor: {
    name: "UWorld / Kaplan / Pocket Prep",
    note: "UWorld dominates NCLEX with a static question bank at $299+; Pocket Prep covers many certs at $14/mo but with fixed content and no true adaptive engine. Neither uses LLM-generated questions or blueprint-driven personalization, leaving a clear gap at the $19 price point.",
  },
  marketSize: {
    tam: "$4.5B professional certification prep market (US)",
    sam: "$900M addressable across CompTIA, AWS, NCLEX, real estate, and CDL prep segments",
    som: "$18M ARR within 36 months via 75k paying subscribers at ~$240 average annual spend",
    note: "Bottoms-up: ~3.2M certification exams taken annually in the target segments; converting 2.3% to a $19/mo or $49 one-time plan yields ~$18M ARR at scale.",
  },
  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Nights and weekends to MVP; full-time recommended once paying users exceed 500.",
  },
  businessFit: {
    revenue: { label: "$1M–$10M ARR", detail: "High-volume B2C with low CAC via SEO and community; strong LTV-to-CAC if retention through exam date is maintained." },
    execution: { label: "Solo-friendly, 6-week MVP", detail: "Blueprint parsing plus LLM prompting plus a Next.js quiz UI is achievable solo; no proprietary content licensing required." },
    goToMarket: { label: "SEO + study community seeding", detail: "Long-tail SEO ('CompTIA Security+ practice test 2026') compounds quickly; seed posts in r/CompTIA and nursing Discord servers for early organic loops." },
    founder: { label: "Strong for edtech or LLM engineers", detail: "Domain knowledge of cert exams accelerates blueprint ingestion quality; prompt-engineering skill determines question quality ceiling." },
  },

  signals: {
    keywords: [
      { term: "comptia security+ practice test", volume: 74000, growth: 74, competition: "High" },
      { term: "nclex practice questions free", volume: 49500, growth: 58, competition: "High" },
      { term: "aws solutions architect exam prep", volume: 33100, growth: 91, competition: "High" },
      { term: "ai generated practice exam questions", volume: 8100, growth: 240, competition: "Low" },
      { term: "adaptive exam prep app", volume: 4400, growth: 130, competition: "Medium" },
      { term: "real estate license practice test", volume: 27200, growth: 42, competition: "Medium" },
    ],
    trendShape: [38, 41, 45, 49, 54, 60, 65, 69, 75, 81, 87, 94],
    searchGrowthYoY: 118,
    communities: [
      {
        platform: "reddit",
        name: "r/CompTIA",
        size: "214k members",
        reach: 214000,
        keyPains: [
          "Official study guides are dense and don't match actual exam scenario style.",
          "Practice question banks run dry after 300 questions and start repeating.",
          "Expensive prep courses ($400+) are out of budget for self-funded career-switchers.",
        ],
        moneySignals: [
          "Users comparing $299 UWorld vs. $49 Pocket Prep subscriptions and asking if cheaper options exist.",
          "Posts celebrating salary jumps of $15k–$30k after passing Security+ or Network+.",
          "Spending on Professor Messer Patreon ($10/mo) as a partial substitute for full courses.",
        ],
        freshOpportunities: [
          "AI-generated scenario questions that mirror current exam style",
          "Per-domain weakness heatmaps tied to official blueprint percentages",
        ],
        mostWantedFixes: [
          "Explanations that cite exactly which blueprint domain was tested",
          "A study plan that adjusts automatically as exam date approaches",
          "Questions that don't repeat after 200 attempts",
        ],
      },
      {
        platform: "facebook",
        name: "NCLEX Study Group (Next Generation)",
        size: "187k members",
        reach: 187000,
        keyPains: [
          "Next-Generation NCLEX format changed in 2023 and most prep banks still reflect old question styles.",
          "Nursing students in underserved programs lack access to $299 UWorld subscriptions.",
        ],
        moneySignals: [
          "Members pooling money to share a single UWorld account across 4–6 students.",
          "Ads for $79–$149 NCLEX bootcamps consistently generating high engagement.",
        ],
        freshOpportunities: [
          "NGN-format adaptive questions generated from updated NCLEX blueprint",
        ],
        mostWantedFixes: [
          "Affordable unlimited question access below $30/month",
          "Rationale explanations that reference NCSBN's clinical judgment model",
        ],
      },
    ],
    redditMentionsPerMonth: 4200,
    youtubeVideosTracked: 8700,
    extraSignals: [
      { source: "google_trends", metric: "Search index peak", value: "94", growth: 74, detail: "CompTIA Security+ practice test peaked at index 94 in April 2025, historically highest point", confidence: 82 },
      { source: "x", metric: "Career-switch cert posts/mo", value: "6,800", detail: "Posts tagging #CompTIA #NCLEX #AWSCertified showing salary milestone announcements", confidence: 61 },
    ],
  },
};
