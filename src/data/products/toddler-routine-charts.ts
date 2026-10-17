import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("toddler-routine-charts");

export const toddlerRoutineCharts: ProductBrief = {
  slug: "toddler-routine-charts",
  title: "Toddler Transition Routine Kit: Editable Canva Charts + Picture Cards for Ages 2–4",
  tagline: "Four transition-specific Canva chart sets and 80 editable picture cards so your pre-reader follows the routine from day one — plus a 3-day introduction checklist so they actually buy in.",
  emoji: "🗓️",
  niche: "Parenting & Family",
  tags: ["toddler", "routine chart", "visual schedule", "Canva template", "printable", "preschool", "new sibling", "toilet training", "ages 2-4"],
  seedQuery: "toddler routine chart",
  extraSeeds: ["toddler visual schedule printable", "toddler routine chart with pictures"],

  avatar: "parents of toddlers aged 2–4 navigating a specific transition — starting preschool, a new sibling, or toilet learning — who have already tried a generic printable routine chart that their child ignores",
  dreamOutcome: "a visual routine their toddler follows from the first day of a new transition, with no meltdown at handoff moments and no rebuilding the chart from scratch",
  hatedFriction: "spending an evening in Canva building a chart from a blank template, or printing five different versions to discover their pre-reader cannot read the text",
  topDesires: [
    "A chart built around the specific transition they are in right now, not a generic morning-and-bedtime layout",
    "Picture cards a pre-reader can navigate without asking what each step says",
    "An editable Canva file so they can swap cards as the routine evolves",
    "A plain-language guide for introducing the new routine so the toddler accepts it rather than tears it off the wall",
  ],
  commonPains: [
    "Generic printable charts do not account for preschool drop-off timing or the chaos of a new baby in the house",
    "Picture-card sets on Etsy are decorative but not organised around a specific transition scenario",
    "Static PDF downloads cannot be edited when the family routine changes",
    "There is no guidance on how to introduce the routine — toddlers reject sudden changes and parents are left guessing",
  ],
  theGap: "Every existing printable routine chart is a beautiful but generic morning-and-bedtime layout; none are pre-built for the specific transition a parent is in right now, with editable Canva picture cards a pre-reader can actually navigate independently.",
  valueProposition: "One Canva bundle with four transition-specific chart sets and 80 picture cards, ready to print in under 20 minutes, with a 3-day introduction checklist that gets the toddler following the routine without a fight.",
  titleVariants: [
    "Toddler Routine Chart Bundle: Editable Canva Kits for Every Big Transition",
    "Visual Routine Charts for Toddlers: Preschool, New Baby, Potty & Bedtime Canva Bundle",
    "Toddler Transition Routine Kit: 4 Editable Chart Sets + 80 Picture Cards for Ages 2–4",
  ],
  outline: [
    { title: "Preschool-Start Chart Set", purpose: "Pre-built morning, drop-off, pickup, and home wind-down cards for a child starting preschool; editable in Canva Free." },
    { title: "New Sibling Chart Set", purpose: "Morning and bedtime cards rebalanced for a household adjusting to a new baby, with 'big kid' acknowledgement steps built in." },
    { title: "Toilet-Learning Chart Set", purpose: "Step-by-step visual cards covering the bathroom routine from pants-down to hand-wash, sequenced for independent use by a 2–4 year old." },
    { title: "General Morning + Bedtime Chart Set", purpose: "A flexible base set for everyday use outside a specific transition; acts as the starter kit and the ladder free lead." },
    { title: "80 Editable Picture Cards", purpose: "Canva-linked icon cards parents swap in or out as the routine changes; includes blank frames for hand-drawn or photographed custom items." },
    { title: "Which-Set Decision Guide", purpose: "One-page parent reference: match the current transition to the right chart set and identify the three picture cards to introduce first." },
    { title: "3-Day Introduction Checklist", purpose: "Day-by-day sequence for presenting the chart, practising together, and transferring ownership — includes a note on what to do when the toddler refuses on day two." },
    { title: "Print-and-Laminate Setup Guide", purpose: "Paper size, laminator settings, and ring-binder or velcro-strip tips for a chart that survives a toddler's hands for months." },
  ],
  accelerators: {
    doneForYou: {
      name: "Four ready-to-edit transition Canva chart sets",
      description: "Pre-built layouts for preschool-start, new-sibling, toilet-learning, and general daily use — each opens in Canva Free and prints in under 20 minutes with no design work required.",
    },
    cognitiveClarity: {
      name: "Which-set decision guide",
      description: "A single reference page: answer three questions about the current household transition and land on the right chart set and the three picture cards to pin first — no guessing about where to start.",
    },
    emotionalAssurance: {
      name: "The 3-day introduction checklist",
      description: "A concrete day-by-day sequence that shows parents how to present the chart without triggering resistance, with a specific script for day two when the toddler pushes back.",
    },
  },
  ladder: [
    { kind: "free", name: "One-page general morning chart", price: "$0", description: "A single static morning-routine chart for ages 2–4 with picture cards; comment keyword delivers it by DM." },
    { kind: "tripwire", name: "Preschool-Start Canva Kit", price: "$9", description: "The preschool-start chart set with 20 picture cards and the print-and-laminate guide; instant Canva download." },
    { kind: "core", name: "Full 4-Transition Bundle", price: "$27", description: "All four chart sets, 80 editable picture cards, the which-set guide, the 3-day introduction checklist, and the laminate guide." },
    { kind: "backend", name: "Custom Routine Design Session", price: "$75", description: "A 45-minute live Canva session where the seller builds a bespoke chart for the family's specific schedule; booked after purchase of the core bundle." },
  ],
  platforms: {
    primary: "etsy",
    secondary: ["gumroad", "payhip"],
    rationale: "Etsy is the dominant discovery channel for printable routine charts — search intent is buying-ready and listing volume dwarfs Gumroad; Gumroad captures email for the backend offer and payhip provides a low-fee evergreen storefront.",
  },
  symptomHook: "You print the cute routine chart, tape it to the wall, and by day three your toddler has pulled off half the pictures and completely ignores the rest.",
  commentKeyword: "CHART",
  suggestedFormat: "template-bundle",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search UI.
    etsy: [
      "toddler routine chart printable",
      "toddler visual schedule editable canva",
      "toddler routine chart with pictures",
      "preschool morning routine chart printable",
      "toddler bedtime routine chart printable",
      "new baby routine chart toddler big sibling",
      "potty training chart toddler printable",
      "toddler picture cards routine canva editable",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "Cards are too text-heavy for a 2-year-old who cannot read — the whole point is for them to use it independently", frequency: "High" },
      { source: "amazon-reviews", complaint: "Lamination peeled after a week and the pictures faded; not durable enough for a toddler's daily handling", frequency: "High" },
      { source: "amazon-reviews", complaint: "No option to add custom steps — the preset routine does not match our household schedule at all", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Chart covers morning and bedtime but nothing for the preschool pickup transition or toilet-learning sequence", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Magnets are weak and fall off the fridge constantly within the first week", frequency: "Low" },
    ],
    keywords: [
      { term: "toddler routine chart printable", volume: 8100, growth: 42, competition: "Medium" },
      { term: "toddler routine chart with pictures", volume: 3600, growth: 38, competition: "Medium" },
      { term: "toddler visual schedule canva", volume: 880, growth: 68, competition: "Low" },
      { term: "preschool routine chart printable", volume: 2400, growth: 55, competition: "Low" },
      { term: "potty training routine chart printable", volume: 1900, growth: 61, competition: "Medium" },
      { term: "new sibling routine chart toddler", volume: 480, growth: 90, competition: "Low" },
    ],
    // Trend shape: peaks August–September (preschool season) and January (new-year routines);
    // lower through summer holidays and late autumn.
    trendShape: [44, 48, 40, 36, 41, 45, 54, 82, 85, 66, 49, 45],
    searchGrowthYoY: 41,
    communityPains: [
      "r/toddlers: 'We've tried three different charts and she tears them off the wall every time — what actually sticks for a pre-reader?'",
      "r/Parenting: 'Starting preschool next month and I have no idea how to get him into a new morning routine without a full meltdown'",
      "Facebook group 'Toddler Moms Community': 'Just brought home the new baby and my 3-year-old's entire routine has fallen apart — nothing in my chart covers this'",
    ],
  },
};
