import type { IdeaBrief } from "@/pipeline/brief";

export const gridSense: IdeaBrief = {
  slug: "gridsense-energy-optimizer",
  title: "Software that auto-optimizes home battery and EV charging against dynamic electricity tariffs",
  tagline: "GridSense watches live electricity prices and silently shifts your Powerwall and EV charging to save $80–$200 per month.",
  emoji: "⚡",
  category: "Climate & Energy",
  businessModel: "Prosumer",
  tags: ["home energy", "battery storage", "ev charging", "time-of-use tariffs", "powerwall", "enphase", "climate tech", "smart home"],

  narrative:
    "Homeowners spent $12,000–$20,000 installing a Tesla Powerwall or Enphase IQ battery expecting meaningful savings on their electric bill. Most get disappointingly little — not because the hardware is wrong, but because the default charging schedules were set during installation and never touched again. Meanwhile utilities across California, Texas, and the UK have rolled out dynamic and time-of-use tariffs where peak electricity costs 3–5x the off-peak rate, and the spread is widening every year as grid operators struggle with afternoon demand spikes. A Powerwall owner on PG&E's E-TOU-C tariff who charges and discharges at the wrong times can easily leave $1,200 per year on the table.\n\nGridSense is a software layer that sits between the homeowner's utility account, home battery API, and EV charging API, and runs a continuous optimization loop. It pulls day-ahead and real-time pricing from the utility (or estimates it from the tariff schedule), fetches solar generation forecasts, checks the EV departure time the user set once, and then executes charge/discharge commands through Tesla's Fleet API, the Enphase API, or the OCPP interface of any smart charger. The homeowner sees a clean dashboard showing last month's savings, today's schedule, and a running total versus their old bill. There is no hardware to buy, no installer to call — just a $14/month subscription that pays for itself within weeks for the median battery-plus-EV household.\n\nThe prosumer customer is unusually valuable: early adopters of home batteries and EVs are already technology-comfortable, already spending $400–$600/year on home energy management apps, and already talking obsessively in owner communities about optimization hacks. CAC is low because the forums do the selling — a single post showing a $147 monthly saving screenshot generates hundreds of sign-ups. The moat builds as GridSense accumulates household-level load signatures and tariff data to train a forecasting model that no single homeowner could replicate alone.",

  proofSummary:
    "California, Texas, and the UK now cover over 4 million households on dynamic or TOU tariffs with peak-to-off-peak spreads exceeding 300%; Tesla Powerwall shipped its 500,000th unit in 2024, yet Tesla's own app provides only a basic 'time-based control' with no dynamic tariff optimization or EV coordination.",

  whyNow: {
    summary:
      "Dynamic tariff rollout is accelerating at the same moment that home battery and EV adoption hits critical mass, and hardware OEM APIs are finally open enough to build cross-device coordination without proprietary hardware.",
    drivers: [
      "FERC Order 2222 and state-level mandates are forcing US utilities to offer dynamic pricing options; the enrolled household count tripled 2022–2025.",
      "Tesla Fleet API (2023) and Enphase API v4 (2024) opened programmatic battery control to third-party developers for the first time.",
      "EV adoption in solar-heavy households hit 38% in California in 2024, making multi-device optimization (battery + car) materially valuable for the first time.",
      "Wholesale electricity price volatility spiked following natural gas shocks, widening the TOU spread that GridSense exploits from an average of $0.18 to $0.31 per kWh spread.",
      "Octopus Energy's Agile Tariff in the UK proved consumer appetite for dynamic pricing with 820k enrolled households in 2025.",
    ],
  },
  marketGap:
    "Tesla's app offers only a static 'time-based control' toggle. Enphase's app schedules fixed windows. No product performs real-time cross-device optimization across battery, EV, and solar against a live dynamic tariff — the exact gap a lightweight cloud scheduler can fill today using public APIs.",

  executionPlan: {
    summary:
      "Launch on Tesla Powerwall + PG&E TOU tariff as the tightest beachhead — highest device density, most visible savings gap — then expand to Enphase, UK Agile, and additional EV brands.",
    steps: [
      { title: "Build the core optimization loop", detail: "Pull PG&E day-ahead prices via their PriceBook API, fetch Powerwall state-of-charge via Tesla Fleet API, and run a linear-programming scheduler that plans the next 24 hours. Automate dispatch commands. Ship a read-only savings dashboard on day one." },
      { title: "Add EV scheduling", detail: "Integrate Tesla Fleet API vehicle charging commands; user sets departure time and desired charge level once. Scheduler coordinates car and Powerwall to ensure departure readiness while exploiting cheap overnight windows." },
      { title: "Expand tariff coverage and hardware", detail: "Add Enphase IQ Battery via Enphase API, Span panel via Span API, and UK Octopus Agile tariff. Each new tariff integration typically takes one engineer-week; hardware integrations vary from one day (Enphase) to two weeks (OCPP chargers)." },
      { title: "Layer in ML forecasting and peer benchmarking", detail: "Train household load models from anonymized fleet data to improve 24-hour solar generation and consumption forecasts. Show each user how their savings compare to similar households — a viral retention mechanic." },
    ],
  },

  offer: [
    { kind: "lead", name: "Savings Estimator", price: "$0", description: "Free: connect your utility account read-only, enter your battery model, and see an estimate of how much you are leaving on the table each month. No control access required." },
    { kind: "frontend", name: "Optimizer — Battery", price: "$9/mo", description: "Full dynamic optimization for one home battery (Powerwall or Enphase). Automatic charge/discharge scheduling against your TOU or dynamic tariff. Monthly savings report." },
    { kind: "core", name: "Optimizer — Battery + EV", price: "$14/mo", description: "Everything in Battery tier plus EV charge scheduling coordinated with the battery. Departure time awareness and priority charging during green/cheap windows." },
    { kind: "backend", name: "Whole-Home Pro", price: "$29/mo", description: "Multi-battery, multi-EV, solar forecast integration, API access for home automation systems (Home Assistant, Hubitat), and a priority support SLA with a 48-hour response guarantee." },
  ],
  valueEquation: {
    dreamOutcome: "Your home battery and EV automatically save you $100–$200 every month with zero ongoing effort after a 10-minute setup.",
    perceivedLikelihood: "Very high — the scheduler shows its planned actions the night before, and a savings counter updates daily so the value is immediately tangible.",
    timeDelay: "First savings appear on the next billing cycle; the dashboard shows projected daily savings from day one.",
    effortAndSacrifice: "Minimal — one-time API authorization for utility, Powerwall, and EV; no hardware, no installer, no ongoing decisions.",
    score: 9,
  },
  marketMatrix: {
    uniqueness: 8,
    value: 9,
    rationale:
      "Extremely high value — median savings of $120/month against a $14 subscription is a 8.5x ROI, making this an obvious buy for any battery-plus-EV household. Uniqueness is strong because no OEM app coordinates across devices and tariffs today, but the barrier is API access rather than deep IP, so OEMs could eventually ship this natively — hence the urgency to build fleet-level forecasting data as the durable moat.",
  },
  acp: {
    audience: "Homeowners with a Tesla Powerwall or Enphase battery system who also own an EV and are on a time-of-use or dynamic electricity tariff in California, Texas, Arizona, or the UK.",
    community: "r/TeslaPowerwall, r/SolarEnergy, Tesla Motors Club forums, Enphase owner Facebook groups, and Octopus Energy community forums.",
    product: "A cloud scheduler that pulls live electricity prices, coordinates battery and EV charging via OEM APIs, and dispatches optimal charge/discharge commands automatically — saving the median household $120/month for $14/month.",
  },
  competitor: {
    name: "Tesla app / Enphase app / AutoGrid",
    note: "Tesla's native app offers static TOU scheduling with no EV coordination; Enphase's app is similarly siloed. AutoGrid targets utilities, not consumers. No product occupies the cross-device consumer optimization niche at sub-$30/month pricing.",
  },
  marketSize: {
    tam: "$3.8B home energy management software market (global, 2025)",
    sam: "$620M addressable among the 2.1M US and UK households that own both a home battery and an EV on a TOU or dynamic tariff",
    som: "$21M ARR within 36 months targeting 125,000 active subscribers at ~$168 average annual spend",
    note: "Bottoms-up: Powerwall installed base ~520k US units; 38% also own an EV (~197k households); converting 12% at $14/mo average ≈ $3.9M ARR in California alone, scaling to $21M ARR by adding Texas, Arizona, and UK Agile cohorts.",
  },
  founderFit: {
    investment: "Low",
    technicalSkill: "High",
    timeCommitment: "Full-time; API reliability and rate-limit management require ongoing engineering attention.",
  },
  businessFit: {
    revenue: { label: "$1M–$10M ARR", detail: "Low churn because savings are visible and monthly; expansion revenue as EV and battery penetration grows in the existing user base." },
    execution: { label: "Medium difficulty, 8-week MVP", detail: "Tesla Fleet API and PG&E PriceBook are well-documented; the LP scheduler is a solved problem. Main risk is API rate limits and OAuth maintenance across OEM partners." },
    goToMarket: { label: "Community-led via owner forums", detail: "Powerwall and EV owner communities are among the most engaged on the internet; a single savings screenshot post in r/TeslaPowerwall routinely reaches 50k views." },
    founder: { label: "Strong for energy-adjacent engineers", detail: "Deep value for anyone with a background in power systems, home automation, or API-heavy SaaS; domain credibility in owner communities accelerates trust." },
  },

  signals: {
    keywords: [
      { term: "tesla powerwall time of use optimization", volume: 12100, growth: 138, competition: "Low" },
      { term: "dynamic electricity tariff home battery", volume: 6600, growth: 195, competition: "Low" },
      { term: "ev charging cheap electricity hours", volume: 18100, growth: 87, competition: "Medium" },
      { term: "home battery optimization software", volume: 5400, growth: 220, competition: "Low" },
      { term: "octopus agile tariff battery storage", volume: 8900, growth: 162, competition: "Low" },
    ],
    trendShape: [29, 33, 38, 43, 50, 56, 63, 68, 74, 80, 88, 95],
    searchGrowthYoY: 158,
    communities: [
      {
        platform: "reddit",
        name: "r/TeslaPowerwall",
        size: "76k members",
        reach: 76000,
        keyPains: [
          "The Tesla app's time-based control is too coarse — only two price periods, no dynamic pricing awareness.",
          "No way to coordinate the Powerwall and the Model 3 charging without manually adjusting schedules nightly.",
          "Savings are far less than the installer promised because the schedule was set once and never optimized.",
        ],
        moneySignals: [
          "Members posting utility bills showing $80–$150 monthly savings from manual TOU schedule tweaks.",
          "Discussions of paying $500+ for electrician visits to re-configure Powerwall settings.",
          "Multiple posts asking whether any third-party app can automate what Tesla's app cannot.",
        ],
        freshOpportunities: [
          "Cross-device coordination between Powerwall and EV for households that own both",
          "Real-time dynamic tariff integration beyond static TOU windows",
        ],
        mostWantedFixes: [
          "Automatic schedule adjustment when electricity spot prices change day-to-day",
          "A single dashboard showing combined Powerwall + EV savings in dollars per month",
          "Integration with solar forecast so the battery isn't charged from grid unnecessarily",
        ],
      },
      {
        platform: "facebook",
        name: "Enphase IQ Battery Owners Group",
        size: "41k members",
        reach: 41000,
        keyPains: [
          "Enphase's app schedules fixed overnight windows with no awareness of utility pricing changes.",
          "No way to automatically hold battery reserve for evening peak period versus morning off-peak.",
        ],
        moneySignals: [
          "Members sharing screenshots of PG&E bills where TOU charges exceeded $180/month despite owning a battery.",
          "Paid consultants being hired to optimize Enphase settings at $150/hour.",
        ],
        freshOpportunities: [
          "Enphase API integration for automatic dispatch based on live utility pricing",
        ],
        mostWantedFixes: [
          "Third-party app that reads Enphase and PG&E data and sets the right schedule automatically",
          "Alerts when peak pricing is unusually high so the user can manually intervene",
        ],
      },
    ],
    redditMentionsPerMonth: 2800,
    youtubeVideosTracked: 4100,
    extraSignals: [
      { source: "google_trends", metric: "Search index — Powerwall TOU", value: "95", growth: 138, detail: "Hit all-time high in March 2025 coinciding with PG&E TOU-D rate increase announcement", confidence: 79 },
      { source: "x", metric: "Agile tariff optimization posts/mo", value: "3,200", detail: "UK Octopus Agile users posting monthly savings screenshots; strong proof-of-concept for dynamic-price optimization demand", confidence: 67 },
    ],
  },
};
