import type { ProductBrief } from "@/pipeline/products/brief";
import { recordedFixtures } from "./fixtures";

const rec = recordedFixtures("job-interview-prep-checklist");

export const jobInterviewPrepChecklist: ProductBrief = {
  slug: "job-interview-prep-checklist",
  title: "Hired in 7 Days: the behavioral-interview prep kit for mid-career professionals who haven't interviewed in years",
  tagline: "A day-by-day checklist, STAR-story bank, and post-interview follow-up sequence for professionals who know their field cold but freeze the moment 'tell me about a time when' lands.",
  emoji: "🗂️",
  niche: "Career & Freelancing",
  tags: ["job interview", "interview prep", "behavioral interview", "STAR method", "career transition", "checklist", "job search"],
  seedQuery: "job interview checklist",
  extraSeeds: ["behavioral interview prep", "interview prep checklist"],

  avatar: "mid-career professionals (8–20 years of experience) who have been laid off or are making a deliberate industry switch and are now facing their first serious job interview in five or more years",
  dreamOutcome: "walk into the interview room already knowing which of their three strongest stories answers any behavioral question, having researched the company so thoroughly that the interviewer asks how they know so much, and send a follow-up that keeps them top of mind without seeming desperate",
  hatedFriction: "memorizing 100 generic sample answers written for someone else's career, or watching a four-hour YouTube course the night before",
  topDesires: [
    "A concrete day-by-day plan that uses the week before an interview productively, not anxiously",
    "A way to turn their actual work history into ready-made behavioral answers without starting from scratch each time",
    "A company-research template that tells them exactly what to find and where, not just 'research the company'",
    "A post-interview follow-up sequence so they stop wondering whether to email, when, and what to say",
  ],
  commonPains: [
    "Question banks give 100 sample answers for someone else's job history, not theirs",
    "Generic 'top 10 interview tips' content is recycled from decade-old career advice and ignores panel or competency-based formats",
    "They start prep the night before, panic, and cram instead of practice",
    "No one tells them what to do after the interview — the follow-up period is a black hole",
  ],
  theGap: "609 Gumroad products sell question banks and scripted answers, but none guides a mid-career professional through a structured 7-day countdown that converts their own resume into a personal STAR-story bank, a same-day company-research template they can actually complete in 90 minutes, and a post-interview follow-up sequence with exact timing and wording.",
  valueProposition: "Seven days, one clear task each day, and by interview morning you have your own story bank, a researched company dossier, and a follow-up plan already written — so you walk in prepared, not rehearsed.",
  titleVariants: [
    "Hired in 7 Days: the Behavioral-Interview Prep Checklist for Experienced Professionals",
    "The Mid-Career Interview Kit: STAR Bank, Company Research & Follow-Up Sequence",
    "7-Day Interview Countdown: the Prep Checklist That Uses Your Real Work History",
  ],
  outline: [
    {
      title: "Day 7: Resume archaeology",
      purpose: "Work through every role on the resume and extract raw material — projects, conflicts, failures, wins — before deciding which stories to build.",
    },
    {
      title: "Day 6–5: STAR story bank",
      purpose: "Map extracted material to the 12 most common behavioral categories (leadership, conflict, failure, ambiguity, etc.) and write tight Situation–Task–Action–Result drafts for the five strongest.",
    },
    {
      title: "Day 4: Company and role research template",
      purpose: "A structured 90-minute research session covering the employer's recent news, products, culture signals, and the likely pain behind the open role — with exact sources to check.",
    },
    {
      title: "Day 3: Question prep and gap check",
      purpose: "Layer company research onto the story bank; identify any category gaps; prepare three sharp questions to ask the panel.",
    },
    {
      title: "Day 2: Logistics and simulation checklist",
      purpose: "Dry run the commute or tech setup, confirm attire, run one timed mock answer aloud per behavioral category, and set a hard stop time so rest is protected.",
    },
    {
      title: "Morning of: the 30-minute final review",
      purpose: "A single-page card: read the five-story summary, the company-pain note, and the three questions — nothing new, only reinforcement.",
    },
    {
      title: "Post-interview: follow-up sequence",
      purpose: "Same-day thank-you template, a day-5 status check if no word, a day-10 graceful close — with exact wording and the one mistake that kills candidacy.",
    },
    {
      title: "Debrief log: capture and carry forward",
      purpose: "A two-page template to record what was asked, how each answer landed, and what to adjust — so every interview makes the next one sharper.",
    },
  ],
  accelerators: {
    doneForYou: {
      name: "Pre-built STAR story bank template",
      description: "A fillable PDF and Google Sheets version with 12 behavioral categories pre-labeled and prompt questions under each — the professional fills their specifics in, not a stranger's sample answer.",
    },
    cognitiveClarity: {
      name: "The 7-day countdown dashboard",
      description: "A single-page tracker that shows exactly one primary task per day, a time estimate, and a checkbox — no scrolling through pages to figure out what today's job is.",
    },
    emotionalAssurance: {
      name: "The evidence card",
      description: "A half-page printable listing the professional's five strongest stories in three words each; reading it the morning of the interview replaces last-minute cramming with a calm reminder of what they already know.",
    },
  },
  ladder: [
    {
      kind: "free",
      name: "The interview morning checklist",
      price: "$0",
      description: "A one-page morning-of checklist covering mindset, logistics, and the three things to re-read before walking in; comment keyword triggers delivery by DM.",
    },
    {
      kind: "tripwire",
      name: "7-Day Interview Prep Checklist",
      price: "$17",
      description: "The full day-by-day countdown checklist and post-interview follow-up sequence as a printable PDF.",
    },
    {
      kind: "core",
      name: "Complete Interview Prep Kit",
      price: "$47",
      description: "Everything in the checklist plus the STAR story bank template (PDF + Google Sheets), the company-research template, the evidence card, and the debrief log.",
    },
    {
      kind: "backend",
      name: "Interview prep intensive (two 60-minute sessions)",
      price: "$297",
      description: "One session to build the STAR bank from the professional's own resume, one mock-interview session with feedback; natural upsell once the kit surfaces gaps.",
    },
  ],
  platforms: {
    primary: "gumroad",
    secondary: ["etsy", "payhip"],
    rationale: "Gumroad for the core kit and email capture; Etsy for printable-checklist search traffic where 'interview prep printable' and 'STAR method template' carry strong buying intent.",
  },
  symptomHook: "You've been in the industry for over a decade, you know your work better than anyone — but the moment the interviewer says 'tell me about a time when,' your mind goes completely blank.",
  commentKeyword: "PREP",
  suggestedFormat: "checklist",

  fixtures: {
    google: rec.google,
    amazon: rec.amazon,
    // Etsy autocomplete is captcha-gated; these phrases are hand-recorded from the Etsy search UI.
    etsy: [
      "interview prep checklist printable",
      "job interview template",
      "STAR method template printable",
      "behavioral interview prep",
      "job search planner printable",
      "interview outfit checklist",
      "thank you after interview template",
      "job interview questions and answers template",
    ],
    gumroad: rec.gumroad,
    reviewPains: [
      { source: "amazon-reviews", complaint: "Sample answers are written for entry-level candidates; people with 10+ years of experience can't use them", frequency: "High" },
      { source: "amazon-reviews", complaint: "No structure for how to actually prepare in the days before — just a question list to memorise the night before", frequency: "High" },
      { source: "amazon-reviews", complaint: "Nothing on what to do after the interview — the follow-up period is completely ignored", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "Company research advice is vague — 'visit the company website' without saying what to look for", frequency: "Medium" },
      { source: "amazon-reviews", complaint: "STAR method is explained but there is no template to actually build your own stories", frequency: "Low" },
    ],
    keywords: [
      { term: "job interview checklist", volume: 8100, growth: 22, competition: "High" },
      { term: "behavioral interview prep", volume: 5400, growth: 38, competition: "Medium" },
      { term: "STAR method template", volume: 2900, growth: 55, competition: "Low" },
      { term: "interview prep for experienced professionals", volume: 1300, growth: 70, competition: "Low" },
      { term: "job interview follow up email template", volume: 6600, growth: 18, competition: "Medium" },
      { term: "company research before interview", volume: 3200, growth: 41, competition: "Low" },
    ],
    trendShape: [78, 62, 58, 54, 60, 65, 63, 68, 85, 88, 72, 80],
    searchGrowthYoY: 34,
    communityPains: [
      "r/jobs: 'I haven't interviewed in 8 years and I have no idea how to answer behavioral questions with my own stories instead of some generic example'",
      "r/careerguidance: 'I've read 50 articles on interview prep and none of them tell me what to actually DO in the week before — just lists of questions'",
      "r/cscareerquestions: 'Is there a structured way to build STAR answers from your resume before an interview, or am I just supposed to wing it?'",
    ],
  },
};
