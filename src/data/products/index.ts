import type { ProductBrief } from "@/pipeline/products/brief";
import { perimenopauseSleepProtocol } from "./perimenopause-sleep-protocol";
import { notionSecondBrainSystem } from "./notion-second-brain-system";
import { aiPromptStackRealtors } from "./ai-prompt-stack-realtors";
import { cpfOptimisationPlannerSg } from "./cpf-optimisation-planner-sg";
import { freelancerTaxTrackerSg } from "./freelancer-tax-tracker-sg";
import { ninjaCreamiProteinRecipes } from "./ninja-creami-protein-recipes";
import { jobInterviewPrepChecklist } from "./job-interview-prep-checklist";
import { toddlerRoutineCharts } from "./toddler-routine-charts";
import { etsySeoListingTemplates } from "./etsy-seo-listing-templates";
import { nclexStudyPlanner } from "./nclex-study-planner";

/** All authored product briefs — the input corpus for the product pipeline. */
export const productBriefs: ProductBrief[] = [
  perimenopauseSleepProtocol,
  notionSecondBrainSystem,
  aiPromptStackRealtors,
  cpfOptimisationPlannerSg,
  freelancerTaxTrackerSg,
  ninjaCreamiProteinRecipes,
  jobInterviewPrepChecklist,
  toddlerRoutineCharts,
  etsySeoListingTemplates,
  nclexStudyPlanner,
];

export function loadProductBriefs(): ProductBrief[] {
  return productBriefs;
}
