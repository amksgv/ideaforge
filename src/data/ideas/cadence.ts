import type { IdeaBrief } from "@/pipeline/brief";

export const cadence: IdeaBrief = {
  slug: "cadence-perimenopause-companion",
  title: "Perimenopause symptom + treatment companion that talks to your doctor",
  tagline: "Cadence turns 7 messy perimenopause years into a tracked, shareable clinical timeline.",
  emoji: "🌗",
  category: "Health & Wellness",
  businessModel: "B2C",
  tags: ["perimenopause", "womens health", "femtech", "symptom tracker", "hrt"],

  narrative:
    "Perimenopause lasts on average four to eight years, produces 30+ overlapping symptoms, and is still routinely dismissed in a seven-minute doctor's visit. Women cycle through brain fog, sleep collapse, and mood swings with no instrument to show a clinician what's actually happening over time. Period trackers stop being useful exactly when the cycle becomes erratic — which is the whole point of perimenopause.\n\nCadence is a tracking and advocacy tool built for the transition, not the cycle. It logs symptoms, sleep, and HRT response, then compresses months of data into a one-page clinical summary a woman can hand (or send) to her doctor: 'here is my symptom load, here's how it changed since starting estradiol, here's what's still unmanaged.' It turns a frustrating appointment into a data-driven one.\n\nThe market just woke up: menopause went from taboo to a funded category, telehealth clinics are prescribing HRT by mail, and a generation that tracked everything with apps is aging into it. Cadence is the measurement layer underneath that wave.",
  proofSummary:
    "Menopause search interest is compounding, HRT telehealth brands are scaling on paid social, and communities are flooded with women asking how to 'prove' their symptoms to skeptical doctors — a measurement and advocacy gap, not an awareness gap.",

  whyNow: {
    summary:
      "Menopause shed its stigma, telehealth made HRT accessible, and the app-native generation is entering the transition demanding data.",
    drivers: [
      "Menopause-care startups raised significant venture funding, validating willingness to pay.",
      "Telehealth HRT prescribing went mainstream, creating a treatment-response tracking need.",
      "Major employers added menopause benefits, opening a B2B2C channel.",
      "Wearables now expose sleep/HRV APIs that correlate with symptom flares.",
    ],
  },
  marketGap:
    "Femtech over-invested in fertility and periods; the multi-year perimenopause transition has tracking tools that assume a regular cycle. Nothing translates lived symptoms into a clinical artifact a doctor will act on.",

  executionPlan: {
    summary:
      "Launch a focused symptom + HRT-response tracker with a killer doctor-summary export, grow through menopause creators, then add telehealth and employer channels.",
    steps: [
      { title: "Nail the doctor summary", detail: "A beautiful, one-page, printable/shareable clinical timeline is the viral artifact and core value." },
      { title: "Creator-led launch", detail: "Partner with menopause educators on Instagram/TikTok who already have rabid, underserved audiences." },
      { title: "Wearable correlations", detail: "Integrate Apple Health/Oura to auto-surface 'poor sleep precedes your worst symptom days.'" },
      { title: "Open B2B2C", detail: "Sell into employer menopause-benefit programs and partner with telehealth HRT clinics." },
    ],
  },

  offer: [
    { kind: "lead", name: "Symptom Snapshot", price: "$0", description: "Free 14-day symptom log + a sample doctor summary." },
    { kind: "frontend", name: "Cadence Plus", price: "$12/mo", description: "Unlimited tracking, HRT-response charts, and unlimited doctor exports." },
    { kind: "core", name: "Annual", price: "$96/yr", description: "Everything in Plus, wearable integrations, and symptom-pattern insights." },
    { kind: "backend", name: "Employer / Clinic", price: "$6/employee/mo", description: "White-labeled cohort tool for benefits programs and telehealth clinics." },
  ],
  valueEquation: {
    dreamOutcome: "Walk into the appointment with proof and walk out with a treatment that works.",
    perceivedLikelihood: "High — the doctor summary is tangible and immediately useful.",
    timeDelay: "Days to a usable snapshot; weeks to a compelling treatment-response chart.",
    effortAndSacrifice: "Low — 20 seconds of daily logging, much of it auto-pulled from wearables.",
    score: 8,
  },
  marketMatrix: {
    uniqueness: 7,
    value: 7,
    rationale:
      "Differentiated by the clinical-advocacy artifact and transition-specific design; value is high but consumer health retention is the risk, mitigated by the B2B2C employer/clinic channel.",
  },
  acp: {
    audience: "Women 40-55 navigating perimenopause who track their health and want to be taken seriously.",
    community: "Menopause subreddits, Facebook groups (tens of thousands of members), and a booming cohort of menopause creators.",
    product: "A transition-specific tracker whose hero output is a doctor-ready clinical timeline.",
  },
  competitor: {
    name: "Period trackers (Flo/Clue) & menopause telehealth (Midi/Evernow)",
    note: "Period apps assume a cycle; telehealth clinics want to prescribe, not track longitudinally. Cadence is the neutral measurement layer that complements clinics and outlasts period apps.",
  },
  marketSize: {
    tam: "$600B global menopause market (products + care)",
    sam: "$4B digital menopause tools & benefits",
    som: "$30M ARR via 250k paid subscribers + employer deals",
    note: "1.1B women will be post-menopausal by 2030; even a tiny tracked-subscriber slice at $96/yr is a large business.",
  },
  founderFit: {
    investment: "Medium",
    technicalSkill: "Medium",
    timeCommitment: "Full-time; benefits from a clinical advisor for credibility.",
  },
  businessFit: {
    revenue: { label: "$5M–$30M ARR", detail: "Consumer subscription with a high-leverage employer/clinic B2B2C tier." },
    execution: { label: "Moderate, 6-8 week MVP", detail: "Tracking is simple; the doctor-summary polish and wearable integrations are the work." },
    goToMarket: { label: "Creator-led, high virality", detail: "Underserved, vocal audience and a shareable artifact drive low-CAC growth." },
    founder: { label: "Ideal for a femtech/health operator", detail: "Lived experience or clinical partnership massively accelerates trust." },
  },

  signals: {
    keywords: [
      { term: "perimenopause symptom tracker", volume: 18100, growth: 240, competition: "Medium" },
      { term: "hrt side effects tracker", volume: 5400, growth: 180, competition: "Low" },
      { term: "menopause app", volume: 22000, growth: 95, competition: "High" },
      { term: "how to talk to doctor about perimenopause", volume: 4100, growth: 150, competition: "Low" },
      { term: "perimenopause sleep problems", volume: 27000, growth: 70, competition: "Medium" },
    ],
    trendShape: [40, 42, 46, 50, 55, 58, 63, 67, 72, 79, 88, 96],
    searchGrowthYoY: 192,
    communities: [
      {
        platform: "reddit",
        name: "r/Menopause",
        size: "240k members",
        reach: 240000,
        keyPains: [
          "Doctors dismiss symptoms without longitudinal evidence.",
          "Period trackers break once cycles go irregular.",
          "No way to tell if HRT is actually working.",
        ],
        moneySignals: [
          "Members paying out-of-pocket for telehealth HRT.",
          "Buying supplements and trackers in bulk hoping something helps.",
        ],
        freshOpportunities: ["Doctor-ready symptom summary", "HRT response charts"],
        mostWantedFixes: ["Wearable-linked symptom patterns", "Irregular-cycle-aware tracking"],
      },
      {
        platform: "facebook",
        name: "Perimenopause Support",
        size: "64k members",
        reach: 64000,
        keyPains: [
          "Feeling gaslit at appointments.",
          "Overwhelmed by 30+ overlapping symptoms.",
        ],
        moneySignals: ["Active discussion of which paid apps/clinics are worth it."],
        freshOpportunities: ["Shareable clinical timeline"],
        mostWantedFixes: ["One place to track everything during the transition"],
      },
    ],
    redditMentionsPerMonth: 2100,
    youtubeVideosTracked: 4200,
  },
};
