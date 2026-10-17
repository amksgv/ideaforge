import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("ninja-creami-protein-recipes");

// Format note: "template-bundle" (recipe cards + macro spreadsheet) is
// recommended over "guide" because buyers are macro-trackers who need
// print-ready cards at the machine and a pre-built number sheet — not
// prose. A guide would require them to copy macros by hand every session.
// The scorer may still prefer "guide" if it weights content depth higher
// than ready-to-use delivery.

export const ninjaCreamiProteinRecipes: ProductBrief = {
  slug: "ninja-creami-protein-recipes",
  title: "Creami & Macros: the high-protein Ninja Creami recipe system",
  tagline:
    "Printable recipe cards with exact macros, a batch-prep schedule, and a one-page 'why won't it turn icy' guide — so your Creami works every night, not just the first week.",
  emoji: "🍦",
  niche: "Home & Food",
  tags: [
    "ninja creami",
    "high protein",
    "macro friendly",
    "recipe cards",
    "fat loss",
    "GLP-1",
    "meal prep",
    "printable",
  ],
  seedQuery: "ninja creami recipes",
  extraSeeds: [
    "ninja creami protein recipes",
    "ninja creami recipes high protein low calorie",
    "ninja creami recipes for weight loss",
  ],

  avatar:
    "macro-tracking gym-goers, GLP-1 users, and people on a cut who own a Ninja Creami and want high-protein frozen desserts that fit their numbers without turning into a block of ice",
  dreamOutcome:
    "make a perfectly creamy, macro-accurate frozen treat every evening in under four minutes, using ingredients already in their weekly prep rotation",
  hatedFriction:
    "eyeballing macros for a recipe that never specifies them, then cracking open a pint of icy, chalky disappointment",
  topDesires: [
    "Recipes with the protein grams, calories, and carbs printed right on the card — no mental math at 9 p.m.",
    "An explanation of why the texture goes wrong and exactly how to fix it without re-spinning three times",
    "A Sunday batch-prep plan so frozen bases are ready all week",
    "Dairy-free and GLP-1-portion variants that still hit the protein target",
  ],
  commonPains: [
    "Existing recipe ebooks list ingredients but never the macros, forcing a full MFP entry every time",
    "No product explains the icy-texture problem — readers discover it only after wasting an expensive protein-powder base",
    "Recipes repeat the same vanilla-chocolate-strawberry rotation with no macro variation between them",
    "Most cookbooks assume US store brands; ingredients are unavailable in the UK, Canada, and Australia",
  ],
  theGap:
    "Every existing Creami product is a recipe collection; none delivers print-ready cards with verified macros, a science-backed icy-texture fix, and a batch schedule that makes the device sustainable past week two.",
  valueProposition:
    "Forty macro-verified recipe cards plus a one-page icy-texture cheat sheet and a weekly batch schedule, so a Ninja Creami owner who tracks macros can hit their numbers every night without guesswork.",
  titleVariants: [
    "Creami & Macros: 40 High-Protein Ninja Creami Recipes with Exact Numbers",
    "The Macro-Friendly Creami Bundle: Recipe Cards, Icy-Fix Guide & Batch Planner",
    "No More Icy Creami: 40 High-Protein Recipes with Macros, Built for Lifters and GLP-1 Users",
  ],
  outline: [
    {
      title: "Macro quick-reference card",
      purpose:
        "Single-page table of all 40 recipes sorted by protein-per-serving so the buyer can find tonight's option in ten seconds.",
    },
    {
      title: "Why it turns icy — and how to stop it",
      purpose:
        "One page: the three ingredient variables (protein type, fat ratio, sugar-alcohol choice) that determine texture, with a yes/no fix for each failure mode.",
    },
    {
      title: "High-protein bases (30 g+ protein, under 350 cal)",
      purpose:
        "Core recipe cards — cottage cheese, Greek yogurt, and casein variants — formatted for pinning inside a cabinet door, with macros printed at the top.",
    },
    {
      title: "Dairy-free protein tier",
      purpose:
        "Eight cards using silken tofu, coconut-cream, and pea-protein bases for lactose-intolerant and vegan buyers; macros adjusted per variant.",
    },
    {
      title: "Low-calorie / GLP-1 portion cards (under 200 cal)",
      purpose:
        "Twelve recipes calibrated for reduced-appetite users and aggressive cuts; portion marked in grams and cups.",
    },
    {
      title: "Bulking cards (40 g+ protein, 400–600 cal)",
      purpose:
        "Eight higher-calorie, high-protein recipes for lifters in a building phase; includes a nut-butter swirl macro add-on table.",
    },
    {
      title: "Sunday batch-prep schedule",
      purpose:
        "A one-page weekly plan: which bases to freeze Sunday evening, portion sizes, labelling system, and a seven-night rotation grid.",
    },
    {
      title: "Flavor customization matrix",
      purpose:
        "A laminate-ready card showing five approved mix-in families (fruit, chocolate, nut butter, candy pieces, extracts) with macro-impact per tablespoon, so buyers can riff safely without guesswork.",
    },
  ],
  accelerators: {
    doneForYou: {
      name: "40 print-ready recipe cards + macro spreadsheet",
      description:
        "Letter and A4 PDF cards formatted to fit a standard recipe-card sleeve, plus a pre-built Google Sheets file where the buyer inputs their protein powder brand and the macros update automatically.",
    },
    cognitiveClarity: {
      name: "The icy-texture decision tree",
      description:
        "One laminate-ready page: three questions about the base — protein type, fat source, sweetener — that route to the exact fix, so there is no trial-and-error re-spin cycle.",
    },
    emotionalAssurance: {
      name: "The batch-prep schedule",
      description:
        "A Sunday evening plan showing exactly which bases to prepare, how many pints to freeze, and a seven-night rotation — so the buyer never faces an empty freezer on a high-craving evening.",
    },
  },
  ladder: [
    {
      kind: "free",
      name: "The icy-texture fix card",
      price: "$0",
      description:
        "One-page printable covering the three variables that cause icy Creami results and the fix for each; delivered by DM via comment keyword.",
    },
    {
      kind: "tripwire",
      name: "Creami & Macros: starter pack (20 cards)",
      price: "$17",
      description:
        "Twenty high-protein recipe cards with macros, the icy-texture one-pager, and the macro quick-reference table.",
    },
    {
      kind: "core",
      name: "Creami & Macros: full system (40 cards + sheet + planner)",
      price: "$37",
      description:
        "All 40 recipe cards across all four tiers, the auto-updating macro spreadsheet, the flavor customization matrix, and the Sunday batch-prep schedule.",
    },
    {
      kind: "backend",
      name: "Macro meal-prep vault (quarterly digital subscription)",
      price: "$97",
      description:
        "Quarterly drops of 10 new Creami cards plus seasonal macro-friendly snack recipes; natural upsell once the buyer has used the core system for a month.",
    },
  ],
  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale:
      "Gumroad for the full bundle and email list; Etsy for printable recipe-card search traffic (strong 'printable' and 'recipe card' intent in Etsy autocomplete); Payhip as a PayPal-friendly backup for international buyers blocked by Gumroad.",
  },
  symptomHook:
    "You paid $200 for a Ninja Creami, followed a recipe exactly, and pulled out a solid puck of icy chalky protein powder.",
  commentKeyword: "ICYFIX",
  suggestedFormat: "template-bundle",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these are hand-recorded from the UI.
    etsy: [
      "ninja creami recipe cards printable",
      "ninja creami recipe book pdf",
      "high protein ice cream recipes printable",
      "ninja creami meal prep planner",
      "macro friendly recipe cards",
      "ninja creami recipes low calorie printable",
      "protein ice cream recipe card",
      "ninja creami tracker printable",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      {
        source: "amazon-reviews",
        complaint:
          "No macros listed anywhere — I have to enter every ingredient into MyFitnessPal myself before I can use the recipe",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Followed the recipe exactly and it came out completely icy; the book gives no explanation of why or how to fix it",
        frequency: "High",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Every recipe is a slight variation on vanilla, chocolate, or strawberry — the flavor range is too narrow for a 150-recipe book",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint:
          "All the brand recommendations are US-only; half the ingredients are unavailable in the UK or Canada",
        frequency: "Medium",
      },
      {
        source: "amazon-reviews",
        complaint:
          "Not one recipe is actually optimized for protein — they're low-sugar but the protein count is still under 10 grams",
        frequency: "High",
      },
    ],
    keywords: [
      { term: "ninja creami recipes protein", volume: 12100, growth: 94, competition: "Low" },
      { term: "ninja creami high protein ice cream", volume: 8100, growth: 110, competition: "Low" },
      { term: "ninja creami recipes low calorie high protein", volume: 6600, growth: 125, competition: "Low" },
      { term: "ninja creami recipes for weight loss", volume: 9900, growth: 78, competition: "Medium" },
      { term: "ninja creami macro friendly recipes", volume: 2400, growth: 140, competition: "Low" },
      { term: "ninja creami recipe cards printable", volume: 1600, growth: 185, competition: "Low" },
    ],
    trendShape: [38, 42, 47, 53, 58, 63, 67, 72, 77, 82, 88, 95],
    searchGrowthYoY: 92,
    communityPains: [
      "r/ninjacreami: 'Every recipe I try comes out icy and I have no idea what I'm doing wrong — no one explains the why'",
      "r/ninjacreami: 'Can someone just post a high-protein recipe WITH the actual macros? Every post either has the recipe or the macros, never both'",
      "Facebook group 'Ninja Creami Recipes & Tips': 'I need a Sunday prep plan — I love the machine but I forget to freeze bases and then give up by Wednesday'",
    ],
  },
};
