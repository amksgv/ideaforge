import type { IdeaBrief } from "@/pipeline/brief";

export const clipForge: IdeaBrief = {
  slug: "clipforge-podcast-repurposer",
  title: "Turn one long podcast or video into a week of on-brand vertical clips — auto-scheduled",
  tagline: "ClipForge cuts your podcast into viral clips, applies your brand kit, and posts to TikTok, Reels, and Shorts on autopilot.",
  emoji: "✂️",
  category: "Creator Economy",
  businessModel: "Prosumer",
  tags: ["podcast repurposing", "short-form video", "brand kit", "ai clips", "content scheduling", "tiktok", "reels", "youtube shorts", "solo creator"],

  narrative:
    "The long-form podcast is now the raw material for an entire content calendar, but turning a 90-minute episode into seven punchy vertical clips is a full production job. Creators who do it manually spend four to six hours per episode in Descript or Premiere just trimming, captioning, and resizing — then another hour copying files into Buffer or Later. Tools like Opus Clip and Riverside's Clips feature automate the highlight detection, but every clip still comes out in the tool's default look: generic captions, no brand colors, no lower-thirds. The creator then exports to Canva or After Effects to brand the output, erasing most of the time saving.\n\nClipForge closes that gap with a persistent Brand Kit — logo position, hex palette, font pair, caption style, and lower-third templates — stored once and applied to every clip automatically. Upload a Spotify podcast RSS feed or a YouTube URL and ClipForge's AI transcribes it, scores segments by hook strength and retention curve, cuts 5–10 clips, renders each with the Brand Kit baked in, and queues them across TikTok, Instagram Reels, and YouTube Shorts on a schedule the creator sets. An agency managing 15 clients can maintain a separate Brand Kit per client, batch-process each week's episodes overnight, and wake up to a fully populated content queue. No Canva tab-switching required.\n\nThe monetization angle is tight: professional creators and boutique social agencies already pay Descript ($24/mo), Opus ($29/mo), and a scheduler ($18/mo) separately — a combined $71/mo stack that still doesn't brand the output. ClipForge at $49/mo for solos and $149/mo for agencies undercuts the stack, eliminates the manual branding step, and wins on time-to-post. The structural moat is the Brand Kit data: once a creator has configured 20 parameters and shipped 200 clips through it, switching means rebuilding from scratch.",

  proofSummary:
    "Short-form video consumption has grown faster than any other content format three years running, and search demand for podcast-to-clips automation surged 180% YoY as creators began treating one long recording as a week's content supply; agency spending on repurposing services now exceeds $600M annually.",

  whyNow: {
    summary:
      "AI transcription and highlight scoring are now cheap enough to run on every upload; TikTok's algorithm now explicitly rewards consistent daily posting, making manual repurposing economically irrational for any creator posting at volume.",
    drivers: [
      "Whisper-class transcription costs dropped below $0.002 per audio minute, making per-clip AI processing trivially cheap.",
      "TikTok's 2024 creator rewards program raised payouts for accounts posting 4+ videos per week, creating a direct financial incentive for daily output.",
      "Instagram Reels, YouTube Shorts, and TikTok now share 9:16 aspect-ratio infrastructure, so a single render pipeline covers all three platforms.",
      "Boutique podcast-production agencies are actively seeking software to replace manual editors for the clipping step, creating a B2B-lite agency channel.",
      "Affordable LLM access makes hook-quality scoring on transcripts feasible without human review.",
    ],
  },
  marketGap:
    "Existing repurposing tools stop at the clip — they ignore branding entirely and have no native scheduler. Creators must stitch together three paid tools and manual Canva work to achieve what ClipForge does in a single upload-to-queue workflow, with a brand identity that persists across every clip forever.",

  executionPlan: {
    summary:
      "Launch a solo-creator plan to prove clip quality and Brand Kit UX, then unlock an agency tier with multi-client Brand Kits and white-label exports as the high-ACV growth lever.",
    steps: [
      { title: "Ship the Brand Kit engine", detail: "Let creators configure logo, colors, fonts, caption style, and lower-third in a visual editor; store as a versioned JSON template applied at render time." },
      { title: "Nail clip scoring and rendering", detail: "Integrate Whisper for transcription, a fine-tuned scorer for hook strength, and FFmpeg-based rendering pipeline that bakes the Brand Kit into every export — target under 4 minutes per 60-minute episode on GPU spot instances." },
      { title: "Connect native schedulers", detail: "TikTok Content Posting API, Instagram Graph API, and YouTube Data API v3 for direct publishing; clip queue with drag-and-drop calendar view." },
      { title: "Launch agency tier with multi-client Brand Kits", detail: "Separate Brand Kit per workspace/client, team seats, bulk upload via RSS, and a white-label export option — this tier carries $149–$299/mo pricing and drives the majority of ARR." },
    ],
  },

  offer: [
    { kind: "lead", name: "Free Clip Preview", price: "$0", description: "Upload any video under 30 minutes, get 3 unbranded clips — no scheduler access, watermark on export." },
    { kind: "frontend", name: "Solo Creator", price: "$49/mo", description: "1 Brand Kit, unlimited uploads up to 4 hours/mo of source video, auto-schedule to all three platforms, 20 clips/mo max." },
    { kind: "core", name: "Creator Pro", price: "$99/mo", description: "3 Brand Kits, 12 hours/mo source video, unlimited clips, priority GPU rendering, advanced caption animations." },
    { kind: "backend", name: "Agency", price: "$249/mo", description: "Unlimited Brand Kits per client, 50 hours/mo source video, team seats, white-label exports, bulk RSS ingestion, dedicated account manager." },
  ],

  valueEquation: {
    dreamOutcome: "Post daily on every platform from one recording session without touching an editor or Canva.",
    perceivedLikelihood: "High — the brand kit is configured once and every subsequent upload ships branded clips automatically.",
    timeDelay: "Under 10 minutes from upload to a full week of scheduled clips in the queue.",
    effortAndSacrifice: "Minimal — upload a file or paste a URL; the brand kit does the rest with no per-clip decisions required.",
    score: 8,
  },

  marketMatrix: {
    uniqueness: 7,
    value: 8,
    rationale:
      "Persistent Brand Kit plus native scheduling in one workflow is genuinely differentiated — Opus and Riverside both lack it. Value is high because it eliminates a 4-6 hour manual chore per episode. Uniqueness is capped at 7 because the underlying AI clip detection is commoditizing fast and a well-funded competitor could clone the feature set.",
  },

  acp: {
    audience: "Solo podcasters with 5k-200k followers, video creators posting daily, and boutique social-media agencies managing 5-25 creator clients.",
    community: "r/podcasting, r/juststart, Creator Economy Facebook groups, Kai Umezurike and Colin and Samir YouTube audiences, agency owner Twitter/X communities.",
    product: "A Brand Kit-powered clip factory that ingests one long recording and outputs a week of fully branded, auto-scheduled vertical clips with zero manual design work.",
  },

  competitor: {
    name: "Opus Clip / Riverside Clips",
    note: "Opus is the market leader in AI clipping but exports unbranded output and has no native scheduler; Riverside owns recording-to-clips but is tied to its recording studio and also lacks a brand-persistence layer — ClipForge wins by owning the brand identity and the distribution queue in a single workflow.",
  },

  marketSize: {
    tam: "$4.2B global podcast and video repurposing software and services market",
    sam: "$620M addressable by a SaaS tool targeting English-language creators and agencies with >1k followers",
    som: "$18M ARR reachable within 3 years via 6k agency seats at $249/mo and 12k solo/pro seats at $75 blended",
    note: "Bottoms-up: ~2.4M active English-language podcasters; 1% SaaS capture at $75 blended ARPU = $18M ARR; agency channel adds high-ACV density without a large seat count.",
  },

  founderFit: {
    investment: "Low",
    technicalSkill: "High",
    timeCommitment: "Full-time for the first 12 months to ship the rendering pipeline and Brand Kit editor; manageable solo with cloud GPU APIs.",
  },

  businessFit: {
    revenue: { label: "$1M–$10M ARR", detail: "Agency tier at $249/mo is the ARR engine; solo plans drive volume and word-of-mouth; blended churn should be low given Brand Kit lock-in." },
    execution: { label: "Medium complexity, 6-week MVP", detail: "Whisper + FFmpeg + a Brand Kit config store is buildable solo; the hard part is a GPU rendering pipeline that stays fast and cheap at scale." },
    goToMarket: { label: "Creator community + agency referral", detail: "Podcast communities share tools aggressively; one thread in r/podcasting or a YouTube review from a mid-tier creator can drive hundreds of trials." },
    founder: { label: "Strong for a full-stack engineer with creator experience", detail: "Domain empathy for the creator workflow is critical; someone who has run a podcast or YouTube channel will design the Brand Kit UX correctly the first time." },
  },

  signals: {
    keywords: [
      { term: "podcast to short clips ai", volume: 18100, growth: 182, competition: "Medium" },
      { term: "repurpose podcast content", volume: 12400, growth: 95, competition: "Medium" },
      { term: "auto post to tiktok reels shorts", volume: 8800, growth: 140, competition: "Low" },
      { term: "opus clip alternative", volume: 5400, growth: 210, competition: "Low" },
      { term: "podcast clip maker with captions", volume: 9600, growth: 118, competition: "Medium" },
      { term: "brand kit for social media clips", volume: 3200, growth: 260, competition: "Low" },
    ],
    trendShape: [38, 42, 46, 51, 55, 61, 67, 72, 76, 82, 88, 95],
    searchGrowthYoY: 180,
    communities: [
      {
        platform: "reddit",
        name: "r/podcasting",
        size: "214k members",
        reach: 214000,
        keyPains: [
          "Spending 5+ hours per episode manually cutting clips in Descript or CapCut.",
          "Every AI clip tool outputs unbranded, generic-looking video that doesn't match the show identity.",
          "Buffer and Later don't connect directly to clip tools, so scheduling requires another manual export step.",
        ],
        moneySignals: [
          "Creators paying $300-$800/month to a VA or editor solely for the clipping and caption work.",
          "Multiple posts per week recommending paid Opus Clip subscriptions despite complaints about generic output.",
          "Agency owners asking for bulk pricing on repurposing tools for their client roster.",
        ],
        freshOpportunities: [
          "Brand Kit that persists across every clip with zero per-clip configuration",
          "One-click RSS ingestion that auto-queues new episodes the moment they publish",
        ],
        mostWantedFixes: [
          "Auto-apply show fonts and colors without opening Canva",
          "Direct TikTok scheduling without a third scheduler tab",
          "Batch process a whole episode backlog overnight",
        ],
      },
      {
        platform: "facebook",
        name: "Podcast Growth & Monetization",
        size: "67k members",
        reach: 67000,
        keyPains: [
          "Small shows can't afford a dedicated video editor just for clips.",
          "Inconsistent visual branding across clips makes the show look amateur.",
        ],
        moneySignals: [
          "Threads comparing monthly spend on Descript, Opus, and Buffer — frequently totaling over $80/mo for incomplete coverage.",
          "Agency owners posting job listings for part-time clip editors at $20-30/hr.",
        ],
        freshOpportunities: [
          "Freemium watermarked trial that converts on first branded clip experience",
        ],
        mostWantedFixes: [
          "Single tool that handles transcription, branding, and scheduling end to end",
          "White-label export option for agencies delivering clips to clients",
        ],
      },
    ],
    redditMentionsPerMonth: 1840,
    youtubeVideosTracked: 4200,
    extraSignals: [
      { source: "x", metric: "Creator mentions / mo", value: "2,100", detail: "Creators complaining about Opus Clip's generic output and the manual Canva step", confidence: 71 },
      { source: "google_trends", metric: "Topic breakout", value: "Breakout (+350%)", detail: "'podcast clips ai' declared breakout topic by Google Trends in Q1 2025", confidence: 80 },
    ],
  },
};
