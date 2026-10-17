import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("nclex-study-planner");

export const nclexStudyPlanner: ProductBrief = {
  slug: "nclex-study-planner",
  title: "NCLEX Countdown: The Back-Scheduled Category Tracker for Repeat Test-Takers",
  tagline:
    "A Notion system that back-schedules your remaining days from the test date, tracks question-bank performance by NGN category, flags weak categories automatically, and hands you a test-week checklist — so you stop studying everything and start studying what will cost you.",
  emoji: "📋",
  niche: "Education & Exams",
  tags: [
    "nclex",
    "nursing exam",
    "nclex prep",
    "study planner",
    "notion template",
    "repeat test-taker",
    "ngn",
    "nursing student",
  ],
  seedQuery: "nclex study plan",
  extraSeeds: ["nclex study planner", "nclex 6 week study plan"],

  avatar:
    "repeat NCLEX test-takers and internationally educated nurses with 4–6 weeks until their scheduled exam, who already own a content review course but cannot tell which question-bank categories are actually dragging their score down",
  dreamOutcome:
    "walk into test day knowing exactly which NGN categories they prepared hardest, with a week-by-week plan that adjusted to their real performance — not a generic schedule they abandoned by week two",
  hatedFriction:
    "paying for another $300 prep course that covers everything but reveals nothing about their own weak spots, or rebuilding a study calendar from scratch every time life interrupts the plan",
  topDesires: [
    "A schedule that counts back from the real test date, not from some hypothetical day-one start",
    "Know — by NGN category — which question-bank scores are low enough to hurt them on exam day",
    "A clear signal for when to stop reviewing a category and move to the next weak one",
    "A test-week checklist specifying exactly what to do and stop doing in the final seven days",
  ],
  commonPains: [
    "Generic six-week plans treat all categories equally regardless of individual performance",
    "Question banks show an overall percentage but do not flag which categories need remediation with the days remaining",
    "Prep courses cost $200–$350 and still leave students to design their own daily schedule",
    "Hand-built spreadsheets break the moment a student misses a day and cannot recalculate from the new reality",
  ],
  theGap:
    "Every existing tool either sells content mastery (prep courses) or a static calendar (generic planners) — none connects live question-bank category scores to the days left on a back-counted test-date schedule and surfaces the categories most likely to cost the student a passing score.",
  valueProposition:
    "Enter your test date and recent question-bank scores by category, and the system tells you in under five minutes which categories to study next and exactly how many days each one gets.",
  titleVariants: [
    "NCLEX Countdown: Back-Scheduled Study Planner for Repeat Test-Takers",
    "The NCLEX Category Tracker: Know Your Weak Spots Before Test Day",
    "NCLEX Study Planner Notion System: From Test Date to Day-by-Day Remediation Plan",
  ],

  // Format argument: "notion-system" wins over "spreadsheet" because linked databases
  // let a Category Performance DB drive a back-scheduled Calendar DB and a Weak-Flag
  // filtered view without formula sprawl. A Google Sheets PDF is bundled for non-Notion
  // users, keeping accessibility without choosing the lower-fidelity format as primary.
  suggestedFormat: "notion-system",

  outline: [
    {
      title: "Test-Date Dashboard",
      purpose:
        "Enter exam date; auto-calculates days remaining and locks the back-schedule for all linked views — the single source of truth for every countdown.",
    },
    {
      title: "Category Performance Database",
      purpose:
        "One row per NGN client-needs category; log question-bank scores by date; formula properties compute rolling average and render a red/yellow/green remediation status.",
    },
    {
      title: "Weak-Category Remediation Queue",
      purpose:
        "Filtered view of Category Performance showing only categories below the threshold score, sorted by urgency given the days remaining — answers 'what do I study tomorrow' without any calculation.",
    },
    {
      title: "Back-Scheduled Study Calendar",
      purpose:
        "Daily calendar view with auto-assigned categories derived from the Remediation Queue and days remaining; each day links back to its Category Performance row so score logging is one click.",
    },
    {
      title: "Daily Study Log",
      purpose:
        "Quick-capture database for questions completed, raw score, and energy level; relations feed the rolling average in Category Performance so the calendar adjusts as scores change.",
    },
    {
      title: "Test-Week Checklist",
      purpose:
        "Seven-day countdown with specific daily actions — what to review, what to stop, logistics tasks, and a 48-hour rest protocol — so no decisions need to be made when anxiety peaks.",
    },
    {
      title: "Reference: NGN Category Breakdown",
      purpose:
        "Plain-language, one-sentence description of each Next Generation NCLEX client-needs category so students understand what the question bank labels mean before logging a score.",
    },
  ],

  accelerators: {
    doneForYou: {
      name: "Pre-built Category Performance tracker with all NGN categories loaded",
      description:
        "All client-needs categories are pre-entered with scoring columns, rolling-average formulas, and status badges — students open the template and log their first question-bank scores on day one without any setup.",
    },
    cognitiveClarity: {
      name: "The Remediation Priority view",
      description:
        "A single filtered Notion view that answers 'what do I study tomorrow' by sorting weak categories against days remaining — eliminates the daily decision of where to spend the next study block entirely.",
    },
    emotionalAssurance: {
      name: "The Test-Week Protocol checklist",
      description:
        "A seven-day countdown specifying exactly what to do and stop doing each day before the exam, including a 48-hour rest protocol — so the student is not making cramming decisions when anxiety is highest.",
    },
  },

  ladder: [
    {
      kind: "free",
      name: "The NCLEX Category Score Sheet",
      price: "$0",
      description:
        "A one-page printable listing all NGN client-needs categories with blank score columns and a pass/flag threshold guide; comment keyword delivers it by DM.",
    },
    {
      kind: "tripwire",
      name: "NCLEX Countdown Planner (Notion)",
      price: "$17",
      description:
        "The full Notion system: Test-Date Dashboard, Category Performance DB, Remediation Queue, back-scheduled Calendar, Daily Study Log, Test-Week Checklist, and NGN Reference.",
    },
    {
      kind: "core",
      name: "Planner + Google Sheets Edition + Setup Walkthrough",
      price: "$37",
      description:
        "Adds a Google Sheets version for students who do not use Notion, plus a 20-minute video walkthrough of the first-day setup and the back-scheduling logic.",
    },
    {
      kind: "backend",
      name: "4-Week NCLEX Accountability Cohort",
      price: "$197",
      description:
        "Small group (8 students max) with weekly category-score check-ins and a live Q&A; natural upsell once the student has logged two weeks of data and can see their pattern.",
    },
  ],

  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale:
      "Gumroad for the Notion system and email capture; Etsy captures 'nclex planner printable' and 'nclex study schedule' search traffic from students who want a ready-made plan without a prep course subscription.",
  },

  symptomHook:
    "You have done over a thousand practice questions and your overall percentage is sitting at 58% — but you have no idea which three categories are going to fail you.",
  commentKeyword: "COUNTDOWN",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; phrases below are hand-recorded from the Etsy search UI.
    etsy: [
      "nclex study planner printable",
      "nclex study schedule template",
      "nclex planner notion template",
      "nursing exam study planner",
      "nclex prep tracker printable",
      "nclex checklist printable",
      "nursing student planner notion",
      "nclex study calendar printable",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      {
        source: "amazon-reviews",
        complaint:
          "Study plans are generic week-by-week schedules with no way to adjust when you score low in a specific category",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint:
          "No connection between question-bank results and what the planner tells me to study next",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Assumes you are starting from scratch; does not account for repeat test-takers who have already reviewed content once",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Test-week section says 'rest and review' without specifying what to do on each of the seven days",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Category labels do not match the Next Generation NCLEX client-needs framework introduced in 2023",
        frequency: "Low",
      },
    ],
    keywords: [
      { term: "nclex study plan", volume: 22200, growth: 14, competition: "High" },
      { term: "nclex study planner", volume: 5400, growth: 28, competition: "Medium" },
      { term: "nclex study plan 6 weeks", volume: 1300, growth: 45, competition: "Low" },
      { term: "nclex category tracker", volume: 480, growth: 90, competition: "Low" },
      { term: "ngn nclex study plan", volume: 880, growth: 120, competition: "Low" },
      { term: "nclex notion template", volume: 590, growth: 75, competition: "Low" },
    ],
    trendShape: [55, 57, 58, 60, 63, 65, 62, 64, 68, 71, 75, 78],
    searchGrowthYoY: 32,
    communityPains: [
      "r/NCLEX: 'I've done 3,000 UWorld questions and my overall is 58% but I have no idea which categories are actually killing me'",
      "r/StudentNurse: 'Every study plan I find is a generic schedule — none of them adjust when you bomb a category with three weeks left'",
      "allnurses.com: 'Taking it for the second time and the hardest part is not knowing what to focus on with only five weeks to go'",
    ],
  },
};
