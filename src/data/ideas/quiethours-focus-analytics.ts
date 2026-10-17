import type { IdeaBrief } from "@/pipeline/brief";

export const quietHours: IdeaBrief = {
  slug: "quiethours-focus-analytics",
  title: "Deep-work analytics that auto-defend focus blocks before meetings colonize your calendar",
  tagline: "QuietHours connects calendar and Slack to measure fragmentation, guard focus time, and give managers aggregate focus-health reports — no surveillance.",
  emoji: "🧘",
  category: "Productivity",
  businessModel: "B2B2C",
  tags: ["focus time", "deep work", "calendar", "slack", "productivity analytics", "remote work"],

  narrative:
    "The average knowledge worker checks Slack or email every 6 minutes and attends 27 hours of meetings per week — leaving fewer than 90 contiguous minutes per day for actual work. The problem has gotten measurably worse since 2020: remote-to-hybrid RTO dynamics pushed managers to fill calendars as a proxy for visibility, and Slack's ambient presence turned every notification into a context switch. Productivity tools have addressed symptoms (Pomodoro timers, focus modes) without touching the structural cause: no one measures fragmentation as a metric that managers can act on.\n\nQuietHours integrates with Google Calendar and Slack via their official OAuth APIs and computes a daily Fragmentation Score: how many calendar blocks are under 45 minutes, how many context switches Slack activity implies, and how much genuine deep-work capacity exists each week. When the score drops below a configurable threshold, QuietHours automatically proposes — and with one click, books — focus blocks, sets Slack status to DND, and declines low-priority recurring meetings on the user's behalf. For managers, it surfaces an opt-in team Focus Health report: aggregate, anonymized, no individual surveillance. The report shows capacity trends, meeting-load distribution, and which recurring ceremonies are fragmenting the team most.\n\nThe business model threads a careful needle. Individual contributors opt in and control their own data; managers see only team aggregates. This anti-surveillance stance is the product's primary differentiator and its primary growth lever: in a post-RTO climate where any productivity tool that smells like spyware gets killed by a Slack thread, trust is the moat. The go-to-market plays through Slack's App Directory and word-of-mouth among remote-friendly engineering and design teams — the same buyers already paying for Calendly, Reclaim, and Notion.",

  proofSummary:
    "Search volume for 'focus time blocking' grew 140% YoY and subreddit threads on meeting overload regularly exceed 3k upvotes; Reclaim.ai raised $35M in 2022 on similar demand, validating willingness to pay, while the manager-side 'focus health' reporting angle remains unoccupied.",

  whyNow: {
    summary:
      "Post-remote meeting bloat hit a measurable peak, Slack and Google Calendar opened rich OAuth APIs, and managers face mounting pressure to demonstrate team productivity without crossing into spyware territory.",
    drivers: [
      "Average weekly meeting time for knowledge workers rose 25% from 2019 to 2024, per Microsoft Work Trend Index.",
      "Slack's Events API and Google Calendar's push notifications now make real-time fragmentation measurement possible without polling.",
      "RTO mandates created a political market for productivity proof that isn't surveillance — managers need data they can show employees without losing trust.",
      "Reclaim and Motion proved $10-20/mo per-seat willingness to pay for calendar intelligence; the manager-analytics tier is unoccupied.",
      "AI scheduling assistants normalized the idea that a bot can touch your calendar, removing the adoption psychological barrier.",
    ],
  },
  marketGap:
    "Individual focus tools (Reclaim, Motion, Focusplan) optimize the worker's calendar in isolation. No tool bridges the gap to managers with aggregate, non-surveilling focus-health data — the exact artifact HR and engineering leaders are currently building manually from Clockwise exports and Confluence notes.",

  executionPlan: {
    summary:
      "Launch a free Chrome extension + Slack app that shows users their own Fragmentation Score, drive word-of-mouth, then unlock the manager Focus Health report as the paid team tier.",
    steps: [
      {
        title: "Ship the personal Fragmentation Score",
        detail: "OAuth into Google Calendar and Slack; compute and display a daily score with a breakdown by meeting blocks vs. open stretches. Free tier, zero AI needed initially.",
      },
      {
        title: "Auto-defend focus blocks",
        detail: "Let users set a weekly deep-work budget (e.g., 10 hours). QuietHours automatically books blocks, sets Slack DND, and surfaces which recurring meetings to decline — with one-click execution.",
      },
      {
        title: "Launch the team Focus Health report",
        detail: "Aggregate opt-in users in the same Slack workspace into a manager dashboard. Show team-level meeting load, fragmentation trend, and top culprit recurring ceremonies — no individual-level data visible to managers.",
      },
      {
        title: "Expand to Microsoft 365",
        detail: "Add Outlook Calendar + Teams integration to reach enterprise buyers; introduce SSO and admin provisioning to support bottom-up enterprise expansion.",
      },
    ],
  },

  offer: [
    {
      kind: "lead",
      name: "Focus Score",
      price: "$0",
      description: "Free personal Fragmentation Score and one-week calendar audit. No team features.",
    },
    {
      kind: "frontend",
      name: "Solo Deep Worker",
      price: "$9/mo",
      description: "Auto-defend focus blocks, Slack DND automation, and meeting-decline suggestions for one user.",
    },
    {
      kind: "core",
      name: "Team Focus",
      price: "$14/seat/mo",
      description: "Everything in Solo plus the aggregate team Focus Health report for managers, with opt-in consent flows and Slack workspace admin controls.",
    },
    {
      kind: "backend",
      name: "Enterprise",
      price: "$22/seat/mo",
      description: "Microsoft 365 + Teams, SSO, admin provisioning, quarterly Focus Health benchmark reports, and SLA support.",
    },
  ],

  valueEquation: {
    dreamOutcome: "Every engineer gets at least 4 uninterrupted hours daily and managers can prove team capacity to leadership without anyone feeling watched.",
    perceivedLikelihood: "High — the integrations are read-only OAuth, results are visible on day one, and team reports are structurally anonymous.",
    timeDelay: "Immediate personal score; team report available within 7 days once enough teammates opt in.",
    effortAndSacrifice: "Low — OAuth takes 90 seconds; focus-block booking is one-click confirmation.",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 7,
    value: 8,
    rationale:
      "The personal focus-time angle is moderately crowded (Reclaim, Motion) but the non-surveilling team Focus Health report occupies clear white space. High value because it addresses a metric managers are actively asked to report on — team productivity proof without spyware.",
  },

  acp: {
    audience: "Knowledge workers (engineers, designers, PMs) at 20-500 person remote-friendly companies, and the engineering or product managers responsible for their team's output.",
    community: "r/productivity, r/remotework, 'No Meetings Fridays' Slack communities, and maker/indie-hacker circles where calendar hell is a running joke.",
    product: "A fragmentation dashboard that auto-books focus time for individuals and surfaces aggregate capacity data for managers — with an anti-surveillance architecture baked in by design.",
  },

  competitor: {
    name: "Reclaim.ai / Motion / Clockwise",
    note: "Reclaim and Motion optimize individual scheduling with AI; Clockwise focuses on team meeting coordination. None offer a manager-facing Focus Health report with an explicit aggregate-only privacy model — that gap is QuietHours' wedge.",
  },

  marketSize: {
    tam: "$4.5B productivity and time-management software",
    sam: "$900M calendar-intelligence and focus-tooling SaaS for knowledge workers",
    som: "$18M ARR attainable via 85k knowledge-worker seats at $14/seat/mo average",
    note: "Bottoms-up: ~1.4M knowledge workers at remote-friendly tech companies; capturing 6% at $14/seat/mo blended ≈ $14M ARR; leadership upsell adds ~$4M.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Nights and weekends to MVP; full-time after first 50 paying teams.",
  },

  businessFit: {
    revenue: {
      label: "$1M–$10M ARR",
      detail: "Per-seat SaaS with a manager tier; sticky once teams build focus-block norms around it.",
    },
    execution: {
      label: "Solo-friendly, 4-week MVP",
      detail: "Google Calendar and Slack OAuth are well-documented; the analytics engine is SQL aggregations, not novel ML.",
    },
    goToMarket: {
      label: "Product-led via Slack App Directory",
      detail: "Slack Directory listing + a viral team-invite loop (manager asks team to opt in) drives bottom-up growth with near-zero CAC.",
    },
    founder: {
      label: "Strong for ex-remote-team operators",
      detail: "Founders who have felt meeting overload firsthand can write credibly for the community and close early enterprise deals on empathy alone.",
    },
  },

  signals: {
    keywords: [
      { term: "focus time blocking tool", volume: 8100, growth: 140, competition: "Medium" },
      { term: "deep work analytics", volume: 3600, growth: 210, competition: "Low" },
      { term: "meeting overload solutions", volume: 5400, growth: 95, competition: "Medium" },
      { term: "slack focus mode calendar", volume: 2900, growth: 175, competition: "Low" },
      { term: "team productivity report no surveillance", volume: 1400, growth: 280, competition: "Low" },
    ],
    trendShape: [38, 41, 44, 48, 53, 57, 62, 66, 72, 78, 84, 91],
    searchGrowthYoY: 156,
    communities: [
      {
        platform: "reddit",
        name: "r/productivity",
        size: "1.4M members",
        reach: 1400000,
        keyPains: [
          "Calendar is fully colonized by recurring meetings with no room for actual work.",
          "Slack notifications destroy any focus session within minutes of starting.",
          "Managers schedule over blocked focus time without realizing the cost.",
        ],
        moneySignals: [
          "Multiple threads with users asking 'is Reclaim worth $10/mo' — indicating established willingness to pay.",
          "Comments mentioning team subscriptions to Clockwise or Motion paid by company.",
        ],
        freshOpportunities: [
          "Fragmentation score as a shareable personal metric",
          "Automated polite meeting-decline messages that cite capacity data",
        ],
        mostWantedFixes: [
          "Auto-reschedule focus blocks when meetings get dropped in",
          "Manager visibility into how fragmented their team's week actually is",
        ],
      },
      {
        platform: "facebook",
        name: "Remote Work & Productivity Professionals",
        size: "34k members",
        reach: 34000,
        keyPains: [
          "Async-first culture breaks down when managers default to meetings as the only trust signal.",
          "HR wants productivity proof but employees resist any monitoring tool.",
        ],
        moneySignals: [
          "Members sharing screenshots of $500-$2,000 annual tool budgets for productivity apps.",
          "Posts advertising company stipends specifically for focus-time software.",
        ],
        freshOpportunities: [
          "Focus Health report as a manager-to-executive artifact",
          "Anonymous benchmarking against industry focus-time norms",
        ],
        mostWantedFixes: [
          "Non-surveilling aggregate reporting for managers",
          "One-click opt-in flow employees will actually trust",
        ],
      },
    ],
    redditMentionsPerMonth: 820,
    youtubeVideosTracked: 2100,
    extraSignals: [
      {
        source: "google_trends",
        metric: "Trend index — 'meeting overload'",
        value: "78/100",
        growth: 42,
        detail: "Sustained elevation since Q1 2023 with spikes around RTO announcement cycles",
        confidence: 74,
      },
    ],
  },
};
