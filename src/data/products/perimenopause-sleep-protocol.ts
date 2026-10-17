import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("perimenopause-sleep-protocol");

export const perimenopauseSleepProtocol: ProductBrief = {
  slug: "perimenopause-sleep-protocol",
  title: "The 3 a.m. Protocol: a 14-night perimenopause sleep reset",
  tagline: "A printable nightly checklist plus a symptom-and-sleep log that turns 'I just can't sleep anymore' into a pattern you can act on.",
  emoji: "🌙",
  niche: "Health & Sleep",
  tags: ["perimenopause", "sleep", "women 40+", "night sweats", "checklist", "tracker"],
  seedQuery: "perimenopause sleep",
  extraSeeds: ["perimenopause insomnia", "perimenopause night sweats sleep"],

  avatar: "women aged 42–54 waking at 3 a.m. several nights a week, who have already tried magnesium and 'sleep hygiene' advice",
  dreamOutcome: "sleep through most nights again within two weeks, and know which of their symptoms is actually driving the wake-ups",
  hatedFriction: "reading another 60-page ebook about hormones, or buying a fourth supplement on a guess",
  topDesires: [
    "Fall back asleep after a 3 a.m. wake-up without lying awake for two hours",
    "Know whether it's hot flushes, cortisol, or anxiety breaking the sleep",
    "A short nightly routine that doesn't require buying anything new",
    "Something concrete to show a GP instead of 'I sleep badly'",
  ],
  commonPains: [
    "Generic sleep-hygiene advice ignores night sweats and hormonal timing",
    "Supplement guides are affiliate-driven and contradict each other",
    "Ebooks explain the biology but never say what to do tonight",
    "Apps assume a regular cycle that no longer exists",
  ],
  theGap: "Every existing product explains perimenopause sleep; none gives a woman a two-week, night-by-night protocol with a log that reveals her personal trigger.",
  valueProposition: "Fourteen nights, one page per night, and by night 14 you know your trigger and have a routine that works for it.",
  titleVariants: [
    "The 3 a.m. Protocol: 14 Nights to Perimenopause Sleep That Sticks",
    "Perimenopause Sleep Reset: The Nightly Checklist for 3 a.m. Wake-Ups",
    "Stop the 3 a.m. Wake-Ups: A 14-Night Perimenopause Sleep Log & Routine",
  ],
  outline: [
    { title: "Night 0: the 5-minute baseline", purpose: "Capture current sleep, symptoms and triggers so progress is measurable." },
    { title: "The wind-down checklist (nights 1–14)", purpose: "A one-page, tick-box routine tuned for temperature, cortisol and timing — no purchases required." },
    { title: "The 3 a.m. card", purpose: "What to do in the first 10 minutes awake; the single most-requested fix." },
    { title: "The symptom-and-sleep log", purpose: "Nightly two-minute entry that correlates wake-ups with flushes, mood, alcohol, caffeine and cycle." },
    { title: "Week-1 review: find your pattern", purpose: "A guided read of the log that names the likely trigger." },
    { title: "Week-2 adjustments by trigger", purpose: "Three short branches: thermal, cortisol/anxiety, and erratic-cycle." },
    { title: "The GP one-pager", purpose: "Printable summary of 14 nights to hand to a doctor." },
    { title: "What to try next (and what to skip)", purpose: "Honest, non-affiliate notes on HRT conversations, CBT-I and supplements." },
  ],
  accelerators: {
    doneForYou: { name: "Printable 14-night log + wind-down checklist", description: "Letter and A4 PDFs plus a Google Sheets version with the correlation view pre-built." },
    cognitiveClarity: { name: "The trigger decision tree", description: "One page: answer six yes/no questions from your log and land on your branch for week 2." },
    emotionalAssurance: { name: "The 3 a.m. audio (6 min)", description: "A calm, non-woo spoken walkthrough for the moment you wake, so you're never deciding what to do at 3 a.m." },
  },
  ladder: [
    { kind: "free", name: "The 3 a.m. card", price: "$0", description: "One-page what-to-do-right-now card; comment keyword delivers it by DM." },
    { kind: "tripwire", name: "The 3 a.m. Protocol", price: "$19", description: "The full 14-night checklist, log, decision tree and GP one-pager." },
    { kind: "core", name: "Protocol + Sheets + audio bundle", price: "$39", description: "Adds the auto-correlating Google Sheet and the 3 a.m. audio." },
    { kind: "backend", name: "Perimenopause sleep clinic (group, 4 weeks)", price: "$197", description: "Weekly log reviews in a small cohort; natural upsell once the trigger is known." },
  ],
  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale: "Gumroad for the bundle + email capture; Etsy for printable-checklist search traffic (strong 'printable' intent in autocomplete).",
  },
  symptomHook: "You fall asleep fine — then your eyes open at 3:04 and your brain just switches on.",
  commentKeyword: "3AM",
  suggestedFormat: "checklist",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these are hand-recorded from the UI.
    etsy: [
      "perimenopause sleep tracker printable",
      "perimenopause symptom tracker",
      "perimenopause planner",
      "menopause sleep journal",
      "hot flash tracker printable",
      "perimenopause checklist",
      "sleep log printable women",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "Explains the hormones in depth but never tells you what to actually do at night", frequency: "High" },
      { source: "amazon-reviews", complaint: "Pushes supplements the author sells", frequency: "High" },
      { source: "amazon-reviews", complaint: "Assumes you still have a regular cycle to track against", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Too long — 200 pages when I wanted a routine", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "US-only product recommendations", frequency: "Low" },
    ],
    keywords: [
      { term: "perimenopause sleep", volume: 14800, growth: 120, competition: "Medium" },
      { term: "perimenopause insomnia", volume: 9900, growth: 95, competition: "Medium" },
      { term: "perimenopause sleep tracker printable", volume: 720, growth: 210, competition: "Low" },
      { term: "waking up at 3am perimenopause", volume: 2400, growth: 160, competition: "Low" },
      { term: "perimenopause night sweats sleep", volume: 3600, growth: 80, competition: "Medium" },
    ],
    trendShape: [41, 43, 46, 50, 55, 58, 62, 66, 71, 77, 85, 93],
    searchGrowthYoY: 118,
    communityPains: [
      "r/Menopause: 'I've tried everything, I'm awake 3–5 every night'",
      "r/Perimenopause: 'Doctors just say sleep hygiene'",
      "Facebook group: 'Which tracker actually works when my cycle is all over the place?'",
    ],
  },
};
