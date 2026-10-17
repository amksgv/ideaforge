import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("freelancer-tax-tracker-sg");

export const freelancerTaxTrackerSg: ProductBrief = {
  slug: "freelancer-tax-tracker-sg",
  title: "SG Freelancer Finance Sheet: Income, Tax & Medisave Tracker",
  tagline: "A Google Sheets tracker for Singapore freelancers that sets aside income tax and Medisave automatically, categorises expenses under IRAS rules, and produces a year-end summary you can enter straight into myTax Portal.",
  emoji: "📊",
  niche: "Career & Freelancing",
  tags: ["freelancer", "singapore", "iras", "tax tracker", "medisave", "self-employed", "spreadsheet", "sgd"],
  seedQuery: "freelancer tax spreadsheet",
  extraSeeds: ["self employed tax spreadsheet singapore", "iras tax calculator freelancer"],
  singaporeAngle: "Generic trackers assume USD amounts, US or UK deduction categories, and ignore Singapore-specific obligations — IRAS expense categories, Medisave set-aside for self-employed persons, and GST registration-threshold awareness — leaving Singapore freelancers to reverse-engineer every field before they can file.",

  avatar: "Singapore-based freelancer or solo creator billing 3–6 clients across local agencies, Upwork or content platforms, earning in a mix of SGD and foreign currencies",
  dreamOutcome: "a clean, year-end IRAS-ready summary — including the right tax and Medisave amounts set aside each month — without needing to hire an accountant or untangle a US-centric template",
  hatedFriction: "spending hours reformatting a generic spreadsheet to match Singapore tax categories, or discovering at filing time that the Medisave contribution was never tracked",

  topDesires: [
    "Know exactly how much to move into a tax savings account each month, based on Singapore's progressive income tax structure",
    "Track every client and platform payout in one place with automatic SGD conversion for foreign-currency invoices",
    "See which expenses are deductible under IRAS rules — not US Schedule C or UK categories — without researching it themselves",
    "Generate a one-page year-end summary that maps directly to Form B fields in myTax Portal",
  ],

  commonPains: [
    "Every popular freelancer spreadsheet assumes USD and IRS deduction buckets — meals at 50 per cent, home-office as a percentage of mortgage interest — none of which apply in Singapore",
    "Medisave contribution requirements for self-employed persons are calculated separately from income tax, and nothing reminds you to set money aside month by month",
    "The GST registration threshold is invisible in generic trackers, so freelancers approaching it have no early warning",
    "At year-end, totals must be manually reformatted before they can be entered into myTax Portal, adding hours of error-prone reconciliation",
  ],

  theGap: "All 16 incumbents on Gumroad are US or UK-generic trackers — none flag the GST threshold, compute a Medisave set-aside, or map expense categories to IRAS-accepted deductions, leaving Singapore freelancers with a template they must rebuild before they can use it.",

  valueProposition: "One Google Sheet that logs every client invoice in SGD, automatically calculates your monthly income-tax and Medisave set-aside (using editable IRAS and CPF Board reference figures), flags when you are approaching the GST registration threshold, and exports a year-end summary aligned to Form B — ready to hand to an accountant or enter yourself.",

  titleVariants: [
    "SG Freelancer Tax Tracker: Income, Expenses & Medisave Set-Aside (Google Sheets)",
    "Singapore Freelancer Finance Sheet: IRAS-Ready Year-End Tracker",
    "Self-Employed SG: The All-in-One Tax, Medisave & GST Threshold Tracker",
  ],

  outline: [
    {
      title: "Dashboard",
      purpose: "At-a-glance view of year-to-date income, total tax set-aside, Medisave set-aside balance, deductible expenses claimed, and a GST threshold progress bar — the one tab a freelancer checks every month.",
    },
    {
      title: "Income Log",
      purpose: "Row-per-invoice entry with client name, platform, invoice date, amount, currency, and an auto-conversion column to SGD using an editable exchange-rate input; supports multiple simultaneous clients.",
    },
    {
      title: "Expense Log",
      purpose: "Pre-labelled with IRAS-accepted deduction categories (professional development, home-office, equipment, travel, professional fees) so every entry is filing-ready without further research.",
    },
    {
      title: "Tax Set-Aside Calculator",
      purpose: "Applies Singapore's progressive income tax rate table (rates entered as editable inputs referencing current IRAS figures) to the running income total and tells the freelancer exactly how much to transfer to a savings account this month.",
    },
    {
      title: "Medisave Estimator",
      purpose: "Calculates the estimated annual Medisave contribution based on net trade income, using CPF Board contribution rate table as an editable reference input, and tracks how much has been set aside versus the estimated obligation.",
    },
    {
      title: "GST Threshold Monitor",
      purpose: "Tracks cumulative taxable turnover against the GST registration threshold (entered as an editable input referencing the current IRAS figure) and surfaces a colour-coded warning when the freelancer is within a user-defined buffer zone.",
    },
    {
      title: "Year-End IRAS Summary",
      purpose: "Auto-populates a single printable page with gross trade income, allowable deductions, net trade income, tax set-aside total, and Medisave set-aside total — structured to match the fields a tax agent or myTax Portal will ask for under Form B.",
    },
  ],

  accelerators: {
    doneForYou: {
      name: "Pre-categorised IRAS expense log",
      description: "The expense tab arrives with IRAS-accepted categories already labelled and a sample row in each category, so a freelancer never has to research what is deductible — they simply pick from a dropdown and move on.",
    },
    cognitiveClarity: {
      name: "Monthly set-aside decision panel",
      description: "A single panel on the Dashboard shows this month's recommended income-tax transfer and Medisave transfer as two clear SGD figures, calculated from the running totals — no formulas to interpret, no guessing.",
    },
    emotionalAssurance: {
      name: "Filing-confidence checklist",
      description: "A plain-language, step-by-step checklist that maps every Dashboard total to the exact field in myTax Portal or an accountant's brief, so the freelancer files without second-guessing whether they have missed anything.",
    },
  },

  ladder: [
    {
      kind: "free",
      name: "Singapore Freelancer Tax Prep Checklist",
      price: "$0",
      description: "A one-page checklist of what IRAS expects from self-employed persons, which expenses are deductible, and what to prepare before filing — delivered by DM via comment keyword.",
    },
    {
      kind: "tripwire",
      name: "SG Freelancer Tax Tracker (Core)",
      price: "$17",
      description: "Income log, expense log with IRAS categories, and a basic tax set-aside panel — everything a freelancer needs to stay organised throughout the year in SGD.",
    },
    {
      kind: "core",
      name: "SG Freelancer Finance System (Full)",
      price: "$37",
      description: "Adds the Medisave Estimator, GST Threshold Monitor, multi-currency income conversion, and the Year-End IRAS Summary tab — the complete filing-ready system.",
    },
    {
      kind: "backend",
      name: "IRAS Filing Prep Session (1-to-1)",
      price: "$197",
      description: "A 60-minute video call to walk through the completed spreadsheet, reconcile any discrepancies, and confirm the year-end summary is accurate before submission — natural upsell once the tracker has 12 months of data.",
    },
  ],

  platforms: {
    primary: "gumroad",
    secondary: ["payhip", "own-site"],
    rationale: "Gumroad captures the existing freelancer-spreadsheet search traffic where all 16 incumbents already live; Payhip supports SGD pricing natively, which reinforces the Singapore positioning to local buyers; own-site enables SEO targeting of IRAS and Medisave long-tail queries that Gumroad cannot rank for.",
  },

  symptomHook: "It is March, your accountant is asking for your income breakdown, and you are scrolling through twelve months of bank transfers trying to remember which $800 was from that agency project.",
  commentKeyword: "IRASREADY",
  suggestedFormat: "spreadsheet",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search UI.
    etsy: [
      "freelancer invoice tracker spreadsheet",
      "self employed tax tracker printable",
      "small business income expense tracker google sheets",
      "freelancer finance planner digital download",
      "self employed income log spreadsheet",
      "tax expense tracker spreadsheet small business",
      "freelancer client tracker template",
      "income tax savings tracker printable",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "Built entirely around US tax categories — I had to relabel every column before it was useful outside America", frequency: "High" },
      { source: "amazon-reviews", complaint: "No provision for setting aside self-employment tax equivalents each month; I only realised how much I owed at filing time", frequency: "High" },
      { source: "amazon-reviews", complaint: "Assumes a single currency; breaks immediately once you have clients paying in USD and local currency", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "The expense categories don't match what my accountant needs — I had to manually reclassify everything at year-end", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "No warning system for VAT or sales-tax registration thresholds", frequency: "Low" },
    ],
    keywords: [
      { term: "freelancer tax singapore", volume: 720, growth: 35, competition: "Low" },
      { term: "self employed tax singapore", volume: 1300, growth: 28, competition: "Low" },
      { term: "medisave contribution self employed", volume: 590, growth: 42, competition: "Low" },
      { term: "iras tax calculator freelancer", volume: 210, growth: 55, competition: "Low" },
      { term: "gst registration threshold singapore", volume: 880, growth: 18, competition: "Low" },
      { term: "freelancer spreadsheet singapore", volume: 140, growth: 70, competition: "Low" },
    ],
    trendShape: [52, 50, 54, 56, 58, 55, 53, 57, 60, 72, 85, 78],
    searchGrowthYoY: 38,
    communityPains: [
      "r/singaporefi: 'Does anyone have a spreadsheet that actually handles Medisave set-aside for freelancers? Everything I find is built for the US'",
      "Seedly Community Q&A: 'I'm a freelancer — how do I know which expenses I can claim under IRAS? My bookkeeping template has no Singapore categories'",
      "SG Freelancers & Side Hustlers Telegram group: 'Filing Form B for the first time and I have no idea if my expense tracker even matches what IRAS wants to see'",
    ],
  },
};
