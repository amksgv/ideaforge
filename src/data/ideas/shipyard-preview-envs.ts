import type { IdeaBrief } from "@/pipeline/brief";

export const shipyard: IdeaBrief = {
  slug: "shipyard-preview-envs",
  title: "Full-stack ephemeral preview environments per pull request — priced for solo devs and small teams",
  tagline: "Shipyard spins a complete backend + DB preview env for every PR, with seeded data and auto-teardown on merge. No DevOps PhD required.",
  emoji: "🚢",
  category: "Developer Tools",
  businessModel: "B2B",
  tags: ["preview environments", "ephemeral environments", "pull request", "devops", "developer experience", "kubernetes"],

  narrative:
    "Vercel and Netlify solved frontend preview environments so thoroughly that deploy previews are now a baseline expectation for any frontend PR. The moment a developer pushes to a branch, a shareable URL appears with the exact build — no staging server contention, no 'works on my machine'. But the moment there is a database migration, a background job, or a microservice dependency, the preview environment problem snaps back to square one. The solutions that exist — Release, Bunnyshell, Architect — are designed for platform engineering teams with dedicated DevOps staff and five-figure annual contracts. Solo developers and teams under 15 engineers have no credible option: they share a single staging server that is perpetually in a broken state.\n\nShipyard provisions a fully isolated preview environment per pull request: containerized backend, ephemeral database pre-seeded from a sanitized production snapshot, environment variables injected from a vault, and a public URL that proxy-routes to the right container. When the PR merges or closes, the environment tears down automatically and the compute cost disappears with it. The configuration is a single shipyard.yml checked into the repo — if you can write a docker-compose file, you can configure Shipyard. GitHub Actions integration posts the preview URL as a PR comment within 90 seconds of the push.\n\nThe pricing model is what incumbents refuse to offer: a generous free tier for open-source repos, $29/mo for solo developers, and $19/seat/mo for teams up to 25 — container-hours billed at cost above a monthly allowance. The go-to-market is direct: sponsor open-source maintainers on GitHub, write tutorials for the languages where staging-server pain is loudest (Rails, Django, Laravel), and let the PR comment that appears on every branch do the advertising. Every stakeholder who clicks a Shipyard preview URL is a potential word-of-mouth referral.",

  proofSummary:
    "The ephemeral environments category saw 180% YoY search growth and r/devops threads on preview environment setup regularly surface as top-10 posts; Release.sh raised $5M in 2021 and Bunnyshell raised $8.7M in 2023 — both at enterprise pricing, leaving the sub-25-engineer market unserved and vocal about it.",

  whyNow: {
    summary:
      "PR-based development workflows are now universal even among solo developers, container costs have fallen 60% in three years, and the indie/small-team segment has been explicitly abandoned by enterprise-priced incumbents.",
    drivers: [
      "GitHub Actions adoption crossed 50M repositories in 2024, meaning CI/CD hooks for environment provisioning are already in place for the target market.",
      "AWS Fargate and Google Cloud Run spot pricing dropped ~55% from 2021 to 2025, making per-PR container economics viable at $29/mo price points.",
      "Vercel's preview environment success trained a generation of developers to expect branch-level isolation as a default — the expectation has moved upstream to backend developers.",
      "Release, Bunnyshell, and Architect all raised prices and moved upmarket in 2023-2024, publicly abandoning teams under 20 engineers.",
      "Docker Compose is now the lingua franca for local development; a tool that uses the same file format removes the primary adoption barrier.",
    ],
  },

  marketGap:
    "Every full-stack preview environment vendor targets platform engineers at 50+ person companies with $12k-$60k/yr contracts. The 4.2 million solo developers and 800k teams under 25 engineers who build full-stack apps have no credible, affordable option and are currently sharing a broken staging server or skipping preview environments entirely.",

  executionPlan: {
    summary:
      "Launch with a Docker Compose + GitHub Actions integration targeting Rails and Django communities, nail the 90-second spin-up SLA, then expand to GitLab and broader language support once the core loop is proven.",
    steps: [
      {
        title: "Ship the core spin-up loop",
        detail: "Accept a shipyard.yml (Docker Compose superset), provision containers on Cloud Run, inject env vars from a HashiCorp Vault-compatible secrets store, and post the preview URL as a GitHub PR comment within 90 seconds.",
      },
      {
        title: "Solve database seeding",
        detail: "Build a one-command anonymized snapshot workflow: 'shipyard snapshot production' pulls a sanitized copy of the prod DB schema + sample rows and uses it as the seed for every PR environment. This is the killer feature incumbents do poorly.",
      },
      {
        title: "Build the community distribution flywheel",
        detail: "Sponsor 10-15 open-source Rails, Django, and Laravel repos; write language-specific tutorials; make the PR comment preview badge a visible signal in every target community.",
      },
      {
        title: "Add GitLab and Bitbucket support",
        detail: "Expand SCM integrations to capture the 35% of small teams not on GitHub; introduce team admin controls, SSO, and usage dashboards to support bottom-up enterprise expansion.",
      },
    ],
  },

  offer: [
    {
      kind: "lead",
      name: "Open Source",
      price: "$0",
      description: "Unlimited preview environments for public repos. 2 concurrent envs, 1-hour auto-teardown. No credit card.",
    },
    {
      kind: "frontend",
      name: "Solo Dev",
      price: "$29/mo",
      description: "5 concurrent preview envs, 72-hour teardown, 50 compute-hours/mo included, database snapshots, GitHub Actions integration.",
    },
    {
      kind: "core",
      name: "Team",
      price: "$19/seat/mo",
      description: "Up to 25 seats, 20 concurrent environments, 200 compute-hours/mo pooled, GitLab support, secrets vault, Slack PR notifications.",
    },
    {
      kind: "backend",
      name: "Growth",
      price: "$599/mo flat",
      description: "Unlimited seats up to 75, dedicated compute pool, SLA, custom domain support, SSO, priority support, and quarterly usage reviews.",
    },
  ],

  valueEquation: {
    dreamOutcome: "Every PR has a live, fully functional preview URL — reviewers click and test, not read code — and staging server conflicts become a relic of the past.",
    perceivedLikelihood: "Very high — developers have already seen this work for frontends on Vercel; Shipyard is the exact same experience for the full stack.",
    timeDelay: "90 seconds from push to shareable URL; zero config beyond adding a shipyard.yml once.",
    effortAndSacrifice: "One yml file and a 5-minute GitHub Actions setup; no Kubernetes knowledge required.",
    score: 9,
  },

  marketMatrix: {
    uniqueness: 6,
    value: 9,
    rationale:
      "The concept is proven (Release, Bunnyshell exist) but Shipyard's uniqueness is pricing and simplicity — not technology. Value is exceptionally high because it unblocks every PR review cycle. The moat is developer love and switching cost once teams build their workflow around it.",
  },

  acp: {
    audience: "Solo full-stack developers and engineering teams of 2-25 people building web apps with a backend and database (Rails, Django, Laravel, Node, Go) who use GitHub or GitLab.",
    community: "r/webdev, r/rails, r/django, Indie Hackers, and the 'developer experience' Twitter/X community where staging-server horror stories go viral.",
    product: "A shipyard.yml-configured preview environment that appears as a PR comment link within 90 seconds, with a seeded database and auto-teardown — at a price solo devs can expense without approval.",
  },

  competitor: {
    name: "Release.sh / Bunnyshell / Architect",
    note: "Release and Bunnyshell are feature-complete but enterprise-priced ($500-$5k/mo minimum); Vercel handles frontends but explicitly stops at the API boundary. Shipyard's differentiation is indie-friendly pricing, Docker Compose compatibility, and the database-snapshot workflow that incumbents implement poorly.",
  },

  marketSize: {
    tam: "$6.2B developer experience and CI/CD tooling",
    sam: "$820M ephemeral environment and preview tooling for web application teams",
    som: "$14M ARR via 25k paying teams at $47/mo blended average",
    note: "Bottoms-up: ~800k teams of 2-25 engineers building full-stack web apps; capturing 3% at $47/mo blended (mix of Solo and Team tiers) ≈ $13.6M ARR.",
  },

  founderFit: {
    investment: "Medium",
    technicalSkill: "High",
    timeCommitment: "Full-time; infrastructure reliability is table-stakes and requires dedicated attention from day one.",
  },

  businessFit: {
    revenue: {
      label: "$1M–$10M ARR",
      detail: "Usage-based compute overage on top of seat fees creates predictable growth with revenue tied directly to adoption depth.",
    },
    execution: {
      label: "Hard infrastructure, but proven primitives",
      detail: "Cloud Run, Fargate, and managed Postgres make the stack achievable for a two-person founding team; the complexity is orchestration and the database-snapshot pipeline, not novel research.",
    },
    goToMarket: {
      label: "Open-source sponsorship + tutorial SEO",
      detail: "Sponsoring popular Rails/Django/Laravel repos places Shipyard in front of the exact audience; tutorials rank for long-tail 'preview environment for [framework]' queries with compounding organic traffic.",
    },
    founder: {
      label: "Ideal for ex-DevOps or full-stack platform engineers",
      detail: "Founders who have personally maintained a broken staging server for a small team will build the right product and tell the story authentically — domain credibility is the entire sales motion.",
    },
  },

  signals: {
    keywords: [
      { term: "ephemeral preview environments", volume: 4400, growth: 180, competition: "Low" },
      { term: "preview environment per pull request", volume: 3200, growth: 210, competition: "Low" },
      { term: "staging environment for small teams", volume: 6600, growth: 88, competition: "Medium" },
      { term: "vercel alternative full stack backend", volume: 9900, growth: 145, competition: "Medium" },
      { term: "docker compose preview deployment", volume: 2800, growth: 230, competition: "Low" },
      { term: "release sh alternative", volume: 1600, growth: 290, competition: "Low" },
    ],
    trendShape: [31, 35, 39, 44, 50, 55, 61, 67, 72, 79, 86, 94],
    searchGrowthYoY: 187,
    communities: [
      {
        platform: "reddit",
        name: "r/devops",
        size: "248k members",
        reach: 248000,
        keyPains: [
          "Shared staging environments are always in a broken state and slow down every PR review.",
          "Enterprise preview environment tools cost $500/mo minimum — completely out of reach for a 5-person team.",
          "Database migration testing on shared staging causes data corruption that blocks the whole team.",
        ],
        moneySignals: [
          "Teams describing paying $200-400/mo for DigitalOcean droplets hacked together as staging envs.",
          "Posts asking whether Release or Bunnyshell pricing is 'worth it' — indicating budget awareness and intent.",
          "Comments about engineering time wasted on staging server maintenance — implicit cost awareness.",
        ],
        freshOpportunities: [
          "Shipyard.yml as a docker-compose superset — zero new syntax to learn",
          "One-command production database anonymization and snapshot",
        ],
        mostWantedFixes: [
          "Affordable per-PR isolation without Kubernetes expertise",
          "Automatic environment teardown so compute costs don't accumulate",
          "Database seeding that mirrors production data shape without PII",
        ],
      },
      {
        platform: "youtube",
        name: "Fireship",
        size: "3.2M subscribers",
        reach: 3200000,
        keyPains: [
          "Viewers in comments asking how to replicate Vercel-style previews for backends.",
          "Confusion about when to use Docker Compose locally vs. a real preview environment.",
        ],
        moneySignals: [
          "Affiliate links to DigitalOcean and Railway in descriptions — audience is willing to pay for hosting tooling.",
          "Comments mentioning team tooling budgets and asking for 'Vercel but for Node/Rails/Django'.",
        ],
        freshOpportunities: [
          "Tutorial content positioning Shipyard as 'Vercel for the full stack'",
          "Short-form demo showing a PR comment preview link appearing in 90 seconds",
        ],
        mostWantedFixes: [
          "Simple yml config — no Helm charts or Kubernetes manifests",
          "Works with existing GitHub Actions workflow without a full rewrite",
        ],
      },
    ],
    redditMentionsPerMonth: 680,
    youtubeVideosTracked: 1850,
    extraSignals: [
      {
        source: "x",
        metric: "Tweets mentioning 'preview env' pain",
        value: "410/mo",
        growth: 95,
        detail: "Developers posting staging-server horror stories; frequent comparisons to Vercel's preview UX as the gold standard",
        confidence: 62,
      },
    ],
  },
};
