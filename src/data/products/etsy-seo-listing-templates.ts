import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("etsy-seo-listing-templates");

export const etsySeoListingTemplates: ProductBrief = {
  slug: "etsy-seo-listing-templates",
  title: "The Digital Download Listing Kit: fill-in-the-blank Etsy SEO templates for printable sellers",
  tagline: "Title formulas, a 13-tag builder, a description skeleton, and a keyword sheet — written for digital downloads, not candles.",
  emoji: "🗂️",
  niche: "Creators & Marketing",
  tags: ["etsy seo", "etsy listing", "digital downloads", "printables", "etsy templates", "tag builder", "etsy seller"],
  seedQuery: "etsy listing template",
  extraSeeds: ["etsy seo for digital products", "etsy tags for digital downloads"],

  avatar: "Etsy sellers of digital downloads — printables, planners, Canva templates, spreadsheets — who have published listings but get fewer than 50 organic views a month because every SEO guide they followed assumed physical products",
  dreamOutcome: "have every listing optimised with the right title formula, 13 tags, and delivery language within a weekend, and see organic views climb without touching paid ads",
  hatedFriction: "reverse-engineering physical-product SEO advice and guessing which parts apply to a digital file",

  topDesires: [
    "A proven title formula that works for digital downloads, not jewellery or mugs",
    "A full 13-tag list they can fill in for any new listing in under five minutes",
    "A description skeleton that covers instant-download language and file-format details",
    "A keyword research sheet pre-seeded with digital-download search terms so they are not starting from scratch",
  ],
  commonPains: [
    "Generic Etsy SEO guides use physical-product examples (size, material, colour) that do not translate to a PDF",
    "Free tag lists on Pinterest are two years old and full of banned or low-traffic terms",
    "YouTube tutorials explain the concept but never hand over a ready-to-paste template",
    "Sellers waste hours rewriting the same description boilerplate for every new listing",
  ],
  theGap: "Every existing Etsy SEO guide teaches the theory using physical-product examples; none hands digital-download sellers a fill-in-the-blank title formula, a category-specific 13-tag builder, and a delivery-language description skeleton they can paste directly into a new listing.",
  valueProposition: "Paste, fill the blanks, publish — every listing ships with the right title structure, 13 researched tags, and instant-download copy, in under ten minutes per product.",

  titleVariants: [
    "The Digital Download Listing Kit: Etsy SEO Templates for Printable Sellers",
    "Etsy SEO Template Bundle for Digital Sellers: Title Formulas, Tag Builder & Description Kit",
    "Fill-in-the-Blank Etsy Listing Templates for Digital Downloads, Printables & Canva Templates",
  ],

  outline: [
    {
      title: "Title Formula Vault (50+ formulas)",
      purpose: "Fill-in-the-blank title structures organised by product category (planner, printable, spreadsheet, Canva template, digital art) with character-count guides and keyword-slot labels.",
    },
    {
      title: "13-Tag Builder Worksheet",
      purpose: "A guided worksheet with three tag tiers — broad, mid-tail, and long-tail — plus a pre-seeded bank of 120 validated digital-download tags organised by niche.",
    },
    {
      title: "Description Skeleton (with instant-download section)",
      purpose: "A modular description template with slots for hook, benefit list, file format, instant-download instructions, and compatible-software note — the sections Etsy's algorithm reads.",
    },
    {
      title: "Mockup Alt-Text Formulas",
      purpose: "Six fill-in-the-blank alt-text patterns for listing photos, covering styled mockup, flat-lay, and in-use preview shots, to capture image-search traffic.",
    },
    {
      title: "Attributes & Section Setup Cheat Sheet",
      purpose: "Which Etsy attributes apply to digital products, how to fill them without leaving fields blank, and how to name shop sections to aid internal search.",
    },
    {
      title: "Keyword Research Sheet (pre-seeded)",
      purpose: "A Google Sheets template with 60 seed keywords for digital downloads pre-loaded, plus a volume-and-competition scoring column so sellers can prioritise without paid tools.",
    },
    {
      title: "Listing Audit Checklist",
      purpose: "A 20-point checklist the seller runs against each live listing to spot missing tags, weak title structure, and absent delivery language before changing anything.",
    },
    {
      title: "Quick-Start Guide: first listing in 10 minutes",
      purpose: "A numbered walkthrough that ties all six assets together for a new listing, so the seller understands which template to open first.",
    },
  ],

  accelerators: {
    doneForYou: {
      name: "50+ title formulas + paste-ready description skeleton",
      description: "Every formula is labelled, character-counted, and organised by product type; the description skeleton has pre-written instant-download and file-format paragraphs the seller only needs to personalise.",
    },
    cognitiveClarity: {
      name: "The 13-tag builder with a 120-term validated tag bank",
      description: "The worksheet guides the seller to pick broad, mid-tail, and long-tail tags in the right ratio; the tag bank is organised by niche so there is no guessing which terms are relevant to a digital file.",
    },
    emotionalAssurance: {
      name: "The listing audit checklist",
      description: "Running the 20-point checklist on an existing listing shows exactly what is missing before any edits are made, removing the fear of breaking a listing that already has some views.",
    },
  },

  ladder: [
    {
      kind: "free",
      name: "The Digital Download Title Formula (one-pager)",
      price: "$0",
      description: "A single fill-in-the-blank title formula for digital downloads with three worked examples; delivered by DM when buyers comment the keyword.",
    },
    {
      kind: "tripwire",
      name: "The Etsy Listing Starter Kit",
      price: "$17",
      description: "Title formula vault, 13-tag builder worksheet, and description skeleton — the three assets needed to publish an optimised listing from scratch.",
    },
    {
      kind: "core",
      name: "The Digital Download Listing Kit (full bundle)",
      price: "$47",
      description: "All six templates plus the pre-seeded keyword research sheet, mockup alt-text formulas, attributes cheat sheet, and listing audit checklist.",
    },
    {
      kind: "backend",
      name: "Listing Audit: 5 live listings reviewed",
      price: "$97",
      description: "Seller submits five live listings; reviewer returns a marked-up copy of each using the audit checklist with specific rewrites for title, tags, and description.",
    },
  ],

  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale: "Gumroad for the bundle and email capture; Etsy for printable-template search traffic where buyers already search 'etsy listing template' — the seed phrase itself has buying intent on Etsy.",
  },

  symptomHook: "You spent three hours on a new listing, published it, and a week later it has 11 views and zero favourites — because the title formula you copied was written for a handmade ring.",
  commentKeyword: "TEMPLATE",
  suggestedFormat: "template-bundle",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search bar UI.
    etsy: [
      "etsy listing template digital download",
      "etsy seo template printable sellers",
      "etsy shop template kit digital products",
      "etsy listing description template",
      "etsy tag template printable",
      "etsy title template canva digital",
      "etsy shop policies template digital downloads",
      "etsy listing photo template mockup",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "All examples use jewellery or clothing — completely useless for a PDF seller", frequency: "High" },
      { source: "amazon-reviews", complaint: "Teaches keyword research but never provides a ready-to-use template", frequency: "High" },
      { source: "amazon-reviews", complaint: "Tag advice is generic; no guidance on which tags are specific to digital goods", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Description advice skips the instant-download and file-format sections Etsy expects", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Content is out of date — references Etsy features that have since changed", frequency: "Low" },
    ],
    keywords: [
      { term: "etsy listing template", volume: 2400, growth: 28, competition: "Medium" },
      { term: "etsy seo for digital products", volume: 1300, growth: 42, competition: "Low" },
      { term: "etsy tags for digital downloads", volume: 880, growth: 55, competition: "Low" },
      { term: "etsy title formula digital", volume: 590, growth: 61, competition: "Low" },
      { term: "etsy description template printables", volume: 720, growth: 38, competition: "Low" },
      { term: "etsy seo tips printable sellers", volume: 1100, growth: 34, competition: "Medium" },
    ],
    trendShape: [52, 54, 55, 57, 60, 63, 65, 68, 71, 74, 77, 81],
    searchGrowthYoY: 37,
    communityPains: [
      "r/EtsySellers: 'I followed three SEO tutorials and my digital planner still gets under 20 views a month — all the examples were for physical products'",
      "r/Etsy: 'Does anyone have a tag list that actually works for digital downloads? Every free one I find is built for jewellery or home decor'",
      "Etsy Digital Sellers Facebook group: 'I wish someone would just give me a fill-in-the-blank title and description I could paste for each new listing instead of explaining the theory again'",
    ],
  },
};
