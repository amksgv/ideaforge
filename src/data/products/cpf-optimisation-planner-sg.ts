import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("cpf-optimisation-planner-sg");

export const cpfOptimisationPlannerSg: ProductBrief = {
  slug: "cpf-optimisation-planner-sg",
  title: "CPF Optimisation Planner: the Singapore retirement spreadsheet for PMETs",
  tagline: "A pre-built Google Sheets tracker that models your OA/SA/MA balances, voluntary top-ups, Full/Enhanced Retirement Sum trajectory, and housing-loan vs cash decisions — so you stop guessing and start steering.",
  emoji: "🏦",
  niche: "Local & Singapore",
  tags: ["CPF", "Singapore", "retirement", "spreadsheet", "PMET", "voluntary top-up", "RSTU", "financial planning"],
  seedQuery: "cpf planner",
  extraSeeds: ["cpf retirement planner", "cpf oa sa ma calculator", "cpf voluntary top up"],
  singaporeAngle: "Built around Singapore's CPF tri-account structure (OA/SA/MA), the Retirement Sum Scheme, the RSTU tax-relief cap, and housing-loan eligibility rules — none of which appear in any generic retirement planner.",

  avatar: "Singapore PMETs in their 30s and 40s who know CPF exists but have never modelled their own numbers",
  dreamOutcome: "see a single sheet that shows exactly where their OA/SA/MA balances will land at 55 and 65 — and which voluntary top-up moves actually move the needle",
  hatedFriction: "wading through CPF Board PDFs, scattered HardwareZone threads, and generic Excel templates that know nothing about Singapore rules",

  topDesires: [
    "Know whether to top up SA or OA and by how much each year to hit the Full Retirement Sum",
    "Model the housing-loan vs cash-payment trade-off before the next HDB decision",
    "See the compounding effect of RSTU voluntary top-ups across a 10-to-20-year horizon",
    "Have one place to track all three accounts without rebuilding formulas every time CPF Board announces a policy change",
  ],

  commonPains: [
    "CPF Board's official estimator only shows final payout, not the year-by-year balance journey",
    "Generic retirement calculators ignore the OA/SA/MA split and use non-Singapore interest logic",
    "Reddit and HardwareZone threads give conflicting answers because each person's situation differs",
    "Excel templates shared online are either oversimplified or broken after a scheme update",
  ],

  theGap: "Every CPF resource either explains the rules or shows a single end-state projection — none lets a PMET model their own year-by-year balances, test top-up scenarios, and see the housing trade-off in one editable sheet.",

  valueProposition: "Input your age, current balances, and annual salary, and the planner builds your 30-year CPF roadmap — OA/SA/MA year by year, top-up impact, housing-loan headroom, and Retirement Sum milestone — in under ten minutes.",

  titleVariants: [
    "CPF Optimisation Planner: Model Your Retirement Sum in Under 10 Minutes",
    "Singapore Retirement Spreadsheet: OA/SA/MA Tracker + Voluntary Top-Up Modeller",
    "The CPF Numbers Sheet: Full Retirement Sum, RSTU, and Housing Trade-Off in One File",
  ],

  outline: [
    { title: "Dashboard (Summary tab)", purpose: "One-screen view of current balances, years to 55/65, FRS/ERS target gap, and net tax relief from top-ups — the single pane of glass." },
    { title: "Balance Projections (Year-by-Year tab)", purpose: "Rolling 30-year OA/SA/MA model driven by current CPF Board contribution rates and editable interest-rate inputs so the user can update when rates change." },
    { title: "Voluntary Top-Up Scenario Modeller", purpose: "Toggle annual RSTU amounts and see the compounding effect on SA balance and Retirement Sum trajectory; RSTU cap enforced automatically." },
    { title: "Housing Loan vs Cash Decision Tab", purpose: "Side-by-side comparison of using OA versus cash for the next mortgage instalment, factoring in the opportunity cost of leaving OA to compound." },
    { title: "55 & 65 Milestone Planner", purpose: "Count-down to key CPF ages, showing projected Basic/Full/Enhanced Retirement Sum coverage and the estimated CPF LIFE monthly payout range." },
    { title: "MA Boundary Tracker", purpose: "Models Medisave Account against the Basic Healthcare Sum ceiling; flags when contributions will overflow into SA or OA." },
    { title: "Inputs & Assumptions Log", purpose: "Central cell for salary, employer/employee contribution rates, interest rates (editable as CPF Board figures — clearly labelled to update annually), and inflation assumption." },
    { title: "Quick-Start Guide tab", purpose: "Five-step setup walkthrough embedded in the sheet, with links to the CPF Board pages to verify current rates — no hunt required." },
  ],

  accelerators: {
    doneForYou: {
      name: "Pre-wired 30-year projection engine",
      description: "All OA/SA/MA formulas, contribution-rate schedules by age band, and RSTU cap logic are already built; the buyer enters six numbers and the model runs.",
    },
    cognitiveClarity: {
      name: "One-page CPF decision map",
      description: "A single-tab flowchart answers the three decisions most PMETs face: top up SA or OA first, use OA or cash for mortgage, and when to seek a CPF LIFE premium plan — no financial-advisor jargon.",
    },
    emotionalAssurance: {
      name: "Retirement Sum gap indicator",
      description: "A colour-coded progress bar shows how close the user is to the Full Retirement Sum each year, turning an abstract target into a concrete, trackable milestone that removes the anxiety of not knowing.",
    },
  },

  ladder: [
    {
      kind: "free",
      name: "CPF Top-Up Quick-Calc (one tab)",
      price: "$0",
      description: "Single-tab calculator: enter your SA balance and annual voluntary top-up and it shows the 10-year SA balance projection. Comment keyword delivers it by DM.",
    },
    {
      kind: "tripwire",
      name: "CPF Optimisation Planner — Essentials",
      price: "$19",
      description: "Core spreadsheet with Dashboard, Year-by-Year balance model, Top-Up Scenario Modeller, and Quick-Start Guide — covers the majority of 30s–40s PMET use cases.",
    },
    {
      kind: "core",
      name: "CPF Optimisation Planner — Full Pack",
      price: "$39",
      description: "Adds the Housing Loan vs Cash tab, MA Boundary Tracker, 55 & 65 Milestone Planner, and the one-page CPF Decision Map — the complete toolkit.",
    },
    {
      kind: "backend",
      name: "CPF Planning Workshop (small group, 90 min)",
      price: "$149",
      description: "Live Zoom session for 6–10 buyers: walk through their own spreadsheet numbers, answer scenario questions, and leave with a personalised action plan.",
    },
  ],

  platforms: {
    primary: "gumroad",
    secondary: ["payhip", "own-site"],
    rationale: "Gumroad for initial traction and email capture with essentially zero Gumroad competition; Payhip as a backup with SGD checkout support; own-site for SEO once a content base around the Google phrases is established.",
  },

  symptomHook: "You earn a decent salary, you top up CPF when you remember, and you have no idea whether you're on track for the Retirement Sum — because you've never actually modelled the numbers.",
  commentKeyword: "CPFCALC",
  suggestedFormat: "spreadsheet",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; phrases below are hand-estimated from UI browsing.
    // Etsy is not Singapore-focused so results are sparse and generic.
    etsy: [
      "retirement planner spreadsheet",
      "financial planner google sheets",
      "savings tracker printable",
      "retirement savings tracker spreadsheet",
      "budget planner singapore",
      "investment tracker spreadsheet",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "Template uses US 401k logic and has no concept of the OA/SA/MA split — had to rebuild it from scratch", frequency: "High" },
      { source: "amazon-reviews", complaint: "Interest-rate assumptions are baked in and not editable, so the model breaks when rates are updated", frequency: "High" },
      { source: "amazon-reviews", complaint: "No housing-loan trade-off model — which is the first question most Singapore buyers have", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Projection only shows a single end-state number, not the year-by-year journey to retirement", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "No Medisave ceiling logic, so the MA overflow into SA is completely ignored", frequency: "Low" },
    ],
    keywords: [
      { term: "cpf planner", volume: 1900, growth: 28, competition: "Low" },
      { term: "cpf retirement planner", volume: 880, growth: 35, competition: "Low" },
      { term: "cpf calculator oa sa ma", volume: 590, growth: 42, competition: "Low" },
      { term: "cpf voluntary top up calculator", volume: 480, growth: 55, competition: "Low" },
      { term: "cpf full retirement sum tracker", volume: 260, growth: 60, competition: "Low" },
      { term: "singapore retirement spreadsheet", volume: 210, growth: 48, competition: "Low" },
    ],
    trendShape: [44, 46, 48, 51, 53, 55, 57, 60, 63, 66, 70, 74],
    searchGrowthYoY: 38,
    communityPains: [
      "r/singaporefi: 'Anyone have a spreadsheet that models SA top-ups year by year? The CPF estimator only gives a final number.'",
      "HardwareZone EDMW: 'Every retirement calculator I find is US-based and has no idea what OA or SA is.'",
      "Seedly community: 'Trying to figure out whether to pay housing loan with OA or cash — can't find a tool that shows the long-term difference.'",
    ],
  },
};
