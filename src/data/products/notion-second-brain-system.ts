import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("notion-second-brain-system");

export const notionSecondBrainSystem: ProductBrief = {
  slug: "notion-second-brain-system",
  title: "The ADHD Second Brain: a Notion OS built for hyperfocus, not discipline",
  tagline:
    "A Notion system designed around how an ADHD brain actually works — capture-first, zero daily maintenance, and built to survive a two-week abandonment and still make sense when you come back.",
  emoji: "🧠",
  niche: "Productivity & Notion",
  tags: ["adhd", "notion", "second brain", "productivity", "adhd tools", "notion template", "adhd planner"],
  seedQuery: "notion second brain",
  extraSeeds: ["notion second brain for adhd", "notion adhd system"],

  avatar:
    "adults with ADHD who have set up and abandoned at least two Notion workspaces because the daily-review routines that generic templates demand simply do not stick",
  dreamOutcome:
    "a Notion system that still works after a two-week hyperfocus absence — no catch-up ritual required, no guilt, just open it and see exactly what matters today",
  hatedFriction:
    "configuring another elaborate template that requires 15 minutes of daily maintenance to stay useful",

  topDesires: [
    "Capture a thought or task in under 10 seconds before the ADHD brain drops it",
    "Know what actually needs doing today without opening five different databases",
    "Have a system that still makes sense after a period of neglect",
    "Stop rebuilding from scratch every time a previous system breaks down",
  ],
  commonPains: [
    "Generic second brain templates assume a consistent daily review habit ADHD brains cannot sustain",
    "Most Notion systems require manual maintenance that becomes overwhelming after a hyperfocus period ends",
    "Templates built around Tiago Forte's PARA method demand categorization discipline at the moment of capture",
    "Productivity bundles are feature-heavy showcases designed to look impressive, not to function under ADHD conditions",
  ],
  theGap:
    "Every Gumroad second brain template is built for neurotypical consistent-maintenance workflows; none is engineered to be fault-tolerant for the ADHD pattern of intense use, multi-week absence, and a fresh return with no lost context.",
  valueProposition:
    "A Notion OS with a single inbox, an auto-surfacing Today view, and a reset-proof architecture that assumes abandonment will happen — and is fully ready for it.",

  titleVariants: [
    "The ADHD Second Brain: a Notion OS That Survives Your Hyperfocus Cycles",
    "Notion for ADHD: a Second Brain That Needs No Daily Maintenance",
    "ADHD Notion OS: Capture Everything, Maintain Nothing, Miss Nothing",
  ],

  outline: [
    {
      title: "Quick Capture Inbox",
      purpose:
        "A single frictionless database for every thought, task, link and idea — no category required at entry, zero barrier to capture.",
    },
    {
      title: "Today View (auto-built)",
      purpose:
        "A filtered view that surfaces overdue items, flagged captures and calendar-linked tasks without any daily configuration.",
    },
    {
      title: "Project Islands",
      purpose:
        "Self-contained project pages that preserve full context so any project can be picked up cold after weeks away.",
    },
    {
      title: "Hyperfocus Sprint Board",
      purpose:
        "A kanban-style board for the deep-work sessions ADHD users actually have — designed to be activated in two minutes and abandoned cleanly.",
    },
    {
      title: "Weekly Reset (10-minute version)",
      purpose:
        "A guided database view and checklist that replaces a full weekly review — designed for the realistic schedule, not the ideal one.",
    },
    {
      title: "Reference Vault",
      purpose:
        "Evergreen notes and resources linked directly from Project Islands so context is never more than one click away.",
    },
    {
      title: "System Recovery Guide",
      purpose:
        "A one-page protocol for returning after a gap: three steps to go from cold open to fully oriented in under five minutes.",
    },
  ],

  accelerators: {
    doneForYou: {
      name: "Pre-wired Notion workspace",
      description:
        "A complete duplicate-ready Notion workspace with all databases, views, automations and relations already built — no setup beyond entering your name and first project.",
    },
    cognitiveClarity: {
      name: "The 'What Matters Now' view",
      description:
        "A single filtered dashboard that answers the only question an ADHD brain needs each session: what is overdue, what is flagged, and what is on the calendar today — nothing else visible.",
    },
    emotionalAssurance: {
      name: "Abandonment-proof architecture",
      description:
        "A written re-entry protocol and a locked archive view that ensures any gap — two days or two months — leaves the system coherent; returning users see exactly the state they left, with a clear three-step path back in.",
    },
  },

  ladder: [
    {
      kind: "free",
      name: "ADHD Capture Inbox",
      price: "$0",
      description:
        "A single-database quick-capture inbox with the Today filtered view — the core of the system, delivered by DM with the comment keyword.",
    },
    {
      kind: "tripwire",
      name: "ADHD Second Brain Starter",
      price: "$19",
      description:
        "The full workspace minus the Weekly Reset and Recovery Guide — enough to replace a broken system in an afternoon.",
    },
    {
      kind: "core",
      name: "ADHD Second Brain OS",
      price: "$49",
      description:
        "Complete workspace plus the System Recovery Guide, Weekly Reset template, and a 20-minute video walkthrough of the ADHD-specific design decisions.",
    },
    {
      kind: "backend",
      name: "ADHD Notion Setup Session",
      price: "$197",
      description:
        "A 60-minute 1:1 Notion setup call: import the system together, configure it for the buyer's actual projects, and answer every question about keeping it alive.",
    },
  ],

  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale:
      "Gumroad for digital template delivery and email capture; Etsy for search traffic on 'notion adhd template' and 'adhd planner digital'; payhip as a lower-fee fallback for the core tier.",
  },

  symptomHook: "You have built Notion systems three times and each one looks amazing for about a week.",
  commentKeyword: "INBOX",
  suggestedFormat: "notion-system",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search UI.
    etsy: [
      "notion adhd template",
      "adhd planner notion",
      "notion second brain adhd",
      "adhd productivity planner digital",
      "adhd task manager notion",
      "adhd daily planner notion template",
      "adhd notion dashboard",
      "second brain template adhd",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      {
        source: "amazon-reviews",
        complaint: "The system requires a daily review habit I could never maintain — fell apart within two weeks",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint: "Too many databases to keep up with; I spent more time managing the system than using it",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint: "Beautiful template but no guidance on what to do when you fall behind for a week",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint: "Instructions assume you already know PARA and will categorize every capture immediately",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint: "No mobile-optimised capture shortcut — not practical for catching thoughts on the go",
        frequency: "Low",
      },
    ],
    keywords: [
      { term: "notion second brain adhd", volume: 2900, growth: 145, competition: "Low" },
      { term: "notion adhd template", volume: 1900, growth: 130, competition: "Low" },
      { term: "adhd productivity system notion", volume: 590, growth: 180, competition: "Low" },
      { term: "notion second brain template", volume: 8100, growth: 60, competition: "High" },
      { term: "notion adhd planner", volume: 1300, growth: 110, competition: "Low" },
      { term: "second brain for adhd", volume: 3600, growth: 125, competition: "Medium" },
    ],
    trendShape: [44, 47, 50, 53, 56, 60, 63, 67, 72, 76, 82, 89],
    searchGrowthYoY: 132,
    communityPains: [
      "r/ADHD: 'I have built like five Notion systems and they all die after a week — I think I am just broken'",
      "r/Notion: 'Every second brain template I try requires so much maintenance I end up more behind than before I started'",
      "r/productivity: 'Does anyone with ADHD actually use Notion long-term? Mine always becomes a graveyard within a month'",
    ],
  },
};
