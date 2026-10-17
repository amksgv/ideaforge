import type { IdeaBrief } from "@/pipeline/brief";

export const loreweaver: IdeaBrief = {
  slug: "loreweaver-ttrpg-wiki",
  title: "AI worldbuilding codex that keeps a campaign wiki and generates consistent lore on demand",
  tagline: "Loreweaver is the living campaign bible for tabletop GMs — linked NPCs, locations, and plot threads, with AI that knows your world.",
  emoji: "📜",
  category: "Creator Economy",
  businessModel: "Prosumer",
  tags: ["ttrpg", "dungeons and dragons", "pathfinder", "worldbuilding", "campaign management", "gm tools", "ai writing", "wiki", "solo creator"],

  narrative:
    "Every tabletop RPG game master runs the same fragmented operation: a Google Doc for NPCs, a Notion page for locations, a physical notebook for plot threads, and a Discord channel where players ask questions that require cross-referencing all three. When a player asks mid-session what the tavern-keeper said three sessions ago about the baron, the GM either remembers, bluffs, or burns two minutes scrolling. The average active GM spends 4-6 hours weekly on session prep, and a significant fraction of that is retrieval — finding the thing they already wrote — not creation.\n\nLoreweaver replaces that scattered infrastructure with a linked campaign wiki that the GM writes into once and queries in plain language. Every NPC, location, faction, and plot hook is an interlinked entity; when the GM creates the baron, Loreweaver automatically cross-references him to the tavern he owns and the faction he leads. Mid-session, the GM types 'what does the party know about the baron?' and Loreweaver surfaces only the facts revealed to players — not the GM's secret notes. Between sessions, the AI can generate a consistent new NPC in the baron's faction — same speech patterns, same political allegiances, same era-appropriate name conventions — from a one-line prompt, because it has read the entire codex. The world stays coherent as it grows.\n\nThe business model is cleanly prosumer: a free tier lets solo GMs build one campaign wiki up to 200 entries, while a $12/mo Storyteller tier unlocks unlimited campaigns and AI generation. A $29/mo Chronicler tier adds a player-facing wiki portal — a read-only view of revealed lore that players can browse between sessions, reducing the GM's recap burden — and that feature alone is the upgrade trigger. At the high end, a $79/mo Studio tier serves actual-play content creators like Critical Role-style shows and podcast DMs who need a production-grade lore bible with version history and team collaboration.",

  proofSummary:
    "The TTRPG market has grown 65% since 2020 driven by Critical Role and Baldur's Gate 3; searches for campaign management and worldbuilding tools are up 140% YoY, and Reddit's GM communities surface repeated, specific complaints about fragmented note systems that existing tools like World Anvil partially address but don't solve with AI-native retrieval.",

  whyNow: {
    summary:
      "LLMs are now genuinely good at maintaining fictional consistency within a context window, TTRPG participation hit a decade high in 2024, and the Critical Role generation of GMs grew up expecting software-quality tools rather than spreadsheets.",
    drivers: [
      "Baldur's Gate 3 sold 10 million copies in its first month, recruiting a wave of new GMs who are digital-native and willing to pay for tools.",
      "Long-context LLMs (100k+ tokens) can now hold an entire campaign codex in context and generate lore that doesn't contradict established facts.",
      "World Anvil and Notion prove the willingness to pay — World Anvil has 2M+ registered users, yet GMs consistently complain that it's 'too complex and not AI-native.'",
      "Critical Role's revenue model (Beacon subscription, books, merch) demonstrated that TTRPG audiences pay for premium creative infrastructure.",
      "Actual-play content creators are an emerging professional segment with production budgets, creating a high-ACV Studio tier market.",
    ],
  },

  marketGap:
    "World Anvil is powerful but built for novelists and deeply complex to onboard; Notion is infinitely flexible but has no TTRPG semantics or AI generation; no existing tool can answer 'what does the party currently know about X' because none tracks information revelation per session — that is the unoccupied moat.",

  executionPlan: {
    summary:
      "Win the solo GM with a fast onboarding and the 'what does the party know' feature, then convert to paid on the player-facing wiki portal, and expand to actual-play production teams as the Studio tier.",
    steps: [
      { title: "Ship the linked campaign wiki", detail: "Entity editor with NPC, location, faction, and item types; automatic cross-linking when entities reference each other by name; plain-language search across all entries." },
      { title: "Build the session revelation tracker", detail: "GMs mark which facts were revealed in each session; 'party knowledge view' filters the entire codex to only player-visible lore — this feature has no direct competitor and is the retention anchor." },
      { title: "Add AI lore generation", detail: "GMs prompt 'generate a city guard in Thornvale's style'; the LLM reads the linked codex for that location and faction before generating, producing output consistent with established lore." },
      { title: "Launch the player-facing portal", detail: "Read-only wiki subdomain the GM shares with players; players can browse revealed lore between sessions and submit 'I remember' notes — this drives the Storyteller→Chronicler upgrade and generates organic referral from players." },
    ],
  },

  offer: [
    { kind: "lead", name: "Free Adventurer", price: "$0", description: "1 campaign, up to 200 wiki entries, full linking and search, no AI generation and no player portal." },
    { kind: "frontend", name: "Storyteller", price: "$12/mo", description: "Unlimited campaigns and entries, AI lore generation (100 prompts/mo), session revelation tracker, export to PDF." },
    { kind: "core", name: "Chronicler", price: "$29/mo", description: "Everything in Storyteller plus a shareable player-facing wiki portal, unlimited AI generation, and campaign analytics (most-referenced NPCs, unresolved plot threads)." },
    { kind: "backend", name: "Studio", price: "$79/mo", description: "Up to 5 collaborators, version history, API access for automation, white-label portal domain, and priority support — built for actual-play podcasts and streaming shows." },
  ],

  valueEquation: {
    dreamOutcome: "Run every session without a single moment of fumbling through notes, and generate a perfectly consistent NPC in 30 seconds.",
    perceivedLikelihood: "High — GMs already use wikis; Loreweaver is a better wiki with an AI that has read everything in it.",
    timeDelay: "First value in the first session after migrating notes; AI generation value visible on first prompt within minutes of signup.",
    effortAndSacrifice: "Moderate — migrating existing notes takes an hour, but a GM template library and bulk import from Notion/Google Docs reduce the switching cost materially.",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 8,
    value: 7,
    rationale:
      "The session-revelation tracker — filtering the entire codex to party-visible facts only — is not replicated anywhere and creates a genuine defensible feature; AI generation on top of a user-owned codex is meaningfully different from generic LLM prompting. Value is 7 rather than 9 because TTRPG is a hobby vertical with real willingness-to-pay ceilings.",
  },

  acp: {
    audience: "Active tabletop RPG game masters running ongoing D&D 5e or Pathfinder 2e campaigns, from weekly hobbyist GMs to actual-play content creators producing shows for 1k-500k audiences.",
    community: "r/DMAcademy (620k members), r/worldbuilding, GM-focused Facebook groups, Critical Role fan communities on Discord, actual-play creator networks on YouTube.",
    product: "A linked campaign codex where every NPC, location, and plot thread is one query away — with an AI that knows the whole world and a player portal that ends the post-session recap.",
  },

  competitor: {
    name: "World Anvil / Notion",
    note: "World Anvil has 2M+ users and category recognition but suffers from complexity-first UX and zero AI-native features; Notion is used by GMs out of necessity but has no TTRPG entity types, no revelation tracker, and no lore-aware AI — Loreweaver wins by being purpose-built for the GM workflow with AI that understands the codex it was trained on.",
  },

  marketSize: {
    tam: "$2.1B global tabletop RPG accessories and digital tools market",
    sam: "$280M addressable by a digital campaign-management SaaS targeting active GMs with an existing software budget",
    som: "$9M ARR reachable in 3 years via 18k paying GMs at a $42 blended monthly ARPU across tiers",
    note: "Bottoms-up: World Anvil's 2M registered users imply ~200k active paying GMs in the digital-tool segment; capturing 9% at $42 blended ARPU = $10M ARR ceiling; $9M is conservative at 8% capture.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "Medium",
    timeCommitment: "Full-time for 9 months to ship the wiki engine, AI generation, and player portal; the GM community is so vocal that early user research is essentially free.",
  },

  businessFit: {
    revenue: { label: "$1M–$10M ARR", detail: "Three-tier subscription with a Studio tier generating high ACV from actual-play creators; hobby SaaS churn is moderate but loyalty in TTRPG communities runs deep." },
    execution: { label: "Medium complexity, 8-week MVP", detail: "Linked entity store is the hardest part; LLM integration on top of a user-owned codex is well-trodden RAG territory — the revelation tracker is novel but lightweight to implement." },
    goToMarket: { label: "Reddit community + actual-play creator partnerships", detail: "r/DMAcademy is one of the most product-receptive subreddits online; a thoughtful launch post there converts at unusually high rates, and a single mid-tier actual-play creator demo drives thousands of trials." },
    founder: { label: "Strong for an active GM with software skills", detail: "The revelation tracker and entity-linking UX require deep GM empathy to get right; a founder who runs a weekly campaign will discover the correct design in playtesting, not user interviews." },
  },

  signals: {
    keywords: [
      { term: "campaign manager dnd", volume: 22000, growth: 88, competition: "Medium" },
      { term: "world anvil alternative", volume: 6800, growth: 145, competition: "Low" },
      { term: "ai dungeon master tools", volume: 14400, growth: 220, competition: "Medium" },
      { term: "ttrpg worldbuilding software", volume: 9200, growth: 112, competition: "Low" },
      { term: "npc generator consistent lore", volume: 4100, growth: 190, competition: "Low" },
    ],
    trendShape: [41, 44, 48, 52, 57, 62, 65, 71, 76, 82, 87, 94],
    searchGrowthYoY: 140,
    communities: [
      {
        platform: "reddit",
        name: "r/DMAcademy",
        size: "621k members",
        reach: 621000,
        keyPains: [
          "Notes scattered across Google Docs, Notion, and paper notebooks — can never find the right thing mid-session.",
          "Players ask 'wait, what did that NPC say about the duke?' and the GM has to stall while searching.",
          "AI tools like ChatGPT generate NPCs that contradict established lore because they don't know the campaign.",
        ],
        moneySignals: [
          "Multiple posts per month asking for World Anvil discount codes despite complaints about its complexity.",
          "GMs paying for Notion Pro teams just to share campaign notes with players.",
          "Actual-play creators posting about hiring lore-document managers at $20-40/hr.",
        ],
        freshOpportunities: [
          "Revelation tracker that shows only what the party currently knows — no tool does this",
          "One-click NPC generation constrained to the established lore of a specific faction or region",
        ],
        mostWantedFixes: [
          "Plain-language search across all campaign notes without leaving the session screen",
          "Automatic cross-linking when a new NPC is tied to an existing location or faction",
          "A read-only player view so they can review lore without seeing GM secrets",
        ],
      },
      {
        platform: "youtube",
        name: "Dungeon Craft (TTRPG GM Tools)",
        size: "490k subscribers",
        reach: 490000,
        keyPains: [
          "No single software covers prep, session management, and post-session recap in one place.",
          "AI writing tools produce generic output that doesn't match established campaign tone or lore.",
        ],
        moneySignals: [
          "Channel's sponsored segments for Roll20 and DnD Beyond consistently drive high click-through — audience is willing to pay for digital GM tools.",
          "Comments on worldbuilding videos frequently ask for software recommendations and express frustration at existing complexity.",
        ],
        freshOpportunities: [
          "Lore-aware AI generation as a YouTube demo hook — 'I asked AI to generate an NPC and it actually knew my world'",
        ],
        mostWantedFixes: [
          "Software that works at the table without a learning curve during live sessions",
          "Entity linking that happens automatically instead of requiring manual tagging",
        ],
      },
    ],
    redditMentionsPerMonth: 3200,
    youtubeVideosTracked: 8600,
    extraSignals: [
      { source: "x", metric: "GM tool complaints / mo", value: "1,450", detail: "GMs venting about scattered notes and inconsistent AI NPC generation", confidence: 65 },
      { source: "google_trends", metric: "Breakout query", value: "+280% YoY", detail: "'ai game master tools' flagged as breakout term following Baldur's Gate 3 launch window", confidence: 77 },
    ],
  },
};
