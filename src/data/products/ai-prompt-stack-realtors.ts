import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("ai-prompt-stack-realtors");

export const aiPromptStackRealtors: ProductBrief = {
  slug: "ai-prompt-stack-realtors",
  title: "The Realtor AI Stack: 7 prompt sequences that replace 2 hours of desk work",
  tagline:
    "A copy-paste prompt stack for residential agents — listing descriptions, buyer follow-ups, open-house recaps, neighbourhood guides, and objection scripts, each as a tested multi-step sequence.",
  emoji: "🏡",
  niche: "AI & Prompts",
  tags: ["chatgpt", "real estate", "prompts", "AI prompts", "realtor", "listing descriptions", "productivity"],
  seedQuery: "chatgpt prompts for real estate agents",
  extraSeeds: [
    "real estate agent chatgpt prompts listing description",
    "ai prompts realtor follow up emails",
  ],

  avatar: "residential real estate agents who know ChatGPT exists but spend an hour staring at a blank listing description or rewriting the same follow-up email for the tenth time this month",
  dreamOutcome: "produce polished, on-brand copy for any listing situation in under five minutes, without sounding like every other agent in the MLS",
  hatedFriction: "downloading a 300-prompt PDF and hunting through it for the one prompt that actually fits this specific situation",
  topDesires: [
    "Write a compelling listing description in minutes, not an hour",
    "Sound personal and local in buyer follow-ups without starting from scratch each time",
    "Have an objection script ready when a seller pushes back on price",
    "Generate a neighbourhood guide buyers will actually share, not a boilerplate paragraph",
  ],
  commonPains: [
    "Bulk prompt packs list hundreds of prompts with no workflow context — you still have to figure out the order and what to feed in",
    "Generic prompts produce generic output that screams 'AI wrote this' to anyone in the industry",
    "No existing product covers the full agent workflow end-to-end: from listing intake through to post-close follow-up",
    "Most AI guides teach ChatGPT basics rather than giving ready-to-run sequences for the tasks agents actually repeat daily",
  ],
  theGap:
    "Every existing Gumroad product dumps 300 generic prompts into a PDF; none provides tested multi-step sequences that walk an agent through a complete workflow — intake data in, polished copy out — for each repeating task.",
  valueProposition:
    "Seven workflow sequences, each a step-by-step chain of prompts with fill-in-the-blank inputs, so an agent pastes their property details and gets publish-ready copy without editing the output to sound human.",
  titleVariants: [
    "The Realtor AI Stack: 7 Prompt Sequences for Listings, Leads and Client Copy",
    "AI Prompts for Real Estate Agents: Tested Workflows, Not Prompt Dumps",
    "ChatGPT for Realtors: The Copy-Paste Sequence Pack That Writes Your Listings",
  ],
  outline: [
    {
      title: "How to use a prompt sequence (and why single prompts fail)",
      purpose: "Orient the agent: chaining prompts with context hand-offs produces copy that single prompts cannot; sets up the stack concept before the sequences begin.",
    },
    {
      title: "Sequence 1 — Listing description stack",
      purpose: "A 4-prompt chain: property data intake, neighbourhood angle, emotional hook, and MLS-length trim; produces two ready variants (short and long).",
    },
    {
      title: "Sequence 2 — Buyer follow-up email chain",
      purpose: "Post-showing, post-offer, and post-rejection versions; each starts from the showing notes the agent already has.",
    },
    {
      title: "Sequence 3 — Open-house recap and lead nurture",
      purpose: "Turns a handwritten sign-in sheet into a personalised follow-up for each visitor segment (first-time buyer, investor, looky-loo).",
    },
    {
      title: "Sequence 4 — Neighbourhood guide generator",
      purpose: "A 3-prompt chain that outputs a shareable, agent-branded guide from suburb name and a few local facts; formatted for email and social.",
    },
    {
      title: "Sequence 5 — Seller objection scripts",
      purpose: "Six pre-built objection scenarios (price reduction, days on market, commission, listing with a friend) as dialogue sequences the agent can rehearse or send.",
    },
    {
      title: "Sequence 6 — Offer presentation and price-adjustment letter",
      purpose: "Formal client-facing copy for presenting offers and explaining price strategy without sounding defensive.",
    },
    {
      title: "Sequence 7 — Monthly database touch sequence",
      purpose: "A repeatable 3-prompt chain for keeping a past-client list warm with a localised market update, no data subscription required.",
    },
  ],
  accelerators: {
    doneForYou: {
      name: "Seven copy-paste sequence sheets",
      description:
        "Each sequence is a standalone PDF sheet with numbered prompt steps, fill-in-the-blank placeholders, and a sample output so the agent can see the expected result before they run it.",
    },
    cognitiveClarity: {
      name: "Workflow decision card",
      description:
        "A single-page 'which sequence for this task' guide: list the situation, arrow points to the sequence number — no searching, no reading the whole pack.",
    },
    emotionalAssurance: {
      name: "Human-check checklist",
      description:
        "A 10-point read-before-you-send checklist that flags common AI tells (passive voice, filler phrases, wrong suburb facts) so the agent publishes with confidence, not anxiety.",
    },
  },
  ladder: [
    {
      kind: "free",
      name: "Listing description starter sequence",
      price: "$0",
      description:
        "The 4-prompt listing description chain as a one-page PDF; comment keyword delivers it by DM and demonstrates the sequence format.",
    },
    {
      kind: "tripwire",
      name: "The Realtor AI Stack — Core 5",
      price: "$19",
      description:
        "Sequences 1–5: listing descriptions, buyer follow-ups, open-house recaps, neighbourhood guides, and objection scripts, plus the workflow decision card.",
    },
    {
      kind: "core",
      name: "The Realtor AI Stack — Full 7 + Human-Check Bundle",
      price: "$37",
      description:
        "All seven sequences, the workflow decision card, the human-check checklist, and a Notion dashboard for storing the agent's customised prompt variants.",
    },
    {
      kind: "backend",
      name: "AI Copy Intensive (small group, 4 weeks)",
      price: "$197",
      description:
        "Four live sessions: live workflow runs, output critiques, and a custom prompt build for each agent's farm area; capped at 12 agents per cohort.",
    },
  ],
  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale:
      "Gumroad for the bundle and email capture; Etsy for printable and template search traffic from agents who search 'real estate templates'; payhip as a lower-fee backup for repeat buyers.",
  },
  symptomHook:
    "You open a new listing tab, stare at the property notes for 20 minutes, and write the same four sentences you always write.",
  commentKeyword: "LISTING",
  suggestedFormat: "prompt-stack",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search UI.
    etsy: [
      "real estate agent chatgpt prompts printable",
      "realtor ai prompt templates",
      "real estate listing description template",
      "real estate email templates for agents",
      "realtor social media templates",
      "chatgpt prompts for real estate digital download",
      "real estate objection scripts printable",
      "buyer follow up email template realtor",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      {
        source: "amazon-reviews",
        complaint: "Hundreds of prompts but no guidance on which to use for which situation — I spent more time searching than writing",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint: "Output sounds robotic and generic; every listing ends up sounding the same as the next agent's",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint: "Prompts are one-and-done — no chaining or follow-up prompts to refine the first result",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint: "Nothing specific to residential agents — mixed in with commercial, property management and FSBO content",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint: "No examples of finished output, so it's hard to know if the prompt actually worked",
        frequency: "Low",
      },
    ],
    keywords: [
      { term: "chatgpt prompts for real estate agents", volume: 8100, growth: 145, competition: "Low" },
      { term: "ai prompts realtor listing description", volume: 2400, growth: 190, competition: "Low" },
      { term: "real estate agent chatgpt", volume: 5400, growth: 130, competition: "Medium" },
      { term: "ai tools for real estate agents", volume: 12100, growth: 85, competition: "Medium" },
      { term: "chatgpt real estate email templates", volume: 1600, growth: 220, competition: "Low" },
      { term: "realtor ai prompts", volume: 1000, growth: 175, competition: "Low" },
    ],
    trendShape: [28, 32, 37, 42, 48, 55, 60, 65, 70, 76, 82, 90],
    searchGrowthYoY: 145,
    communityPains: [
      "r/realtors: 'I tried ChatGPT for listings but the output is so obviously AI — clients notice and it reflects badly on me'",
      "r/realtors: 'There are so many prompt packs on Gumroad but they're all just lists — I need something that actually walks me through the workflow'",
      "r/RealEstate: 'Spent $40 on an AI prompts PDF and used maybe 5 of the 300 prompts — the rest don't apply to residential residential sales at all'",
    ],
  },
};
