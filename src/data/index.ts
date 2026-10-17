import type { IdeaBrief } from "@/pipeline/brief";
import { prymer } from "./ideas/prymer";
import { cadence } from "./ideas/cadence";
import { ledgerLoop } from "./ideas/ledgerloop-shopify-reconciliation";
import { returnRabbit } from "./ideas/returnrabbit-returns-copilot";
import { clipForge } from "./ideas/clipforge-podcast-repurposer";
import { loreweaver } from "./ideas/loreweaver-ttrpg-wiki";
import { quietHours } from "./ideas/quiethours-focus-analytics";
import { shipyard } from "./ideas/shipyard-preview-envs";
import { tutorMint } from "./ideas/tutormint-cert-exam-prep";
import { gridSense } from "./ideas/gridsense-energy-optimizer";
import { patchPay } from "./ideas/patchpay-subcontractor-pay";
import { nestEgg } from "./ideas/nestegg-gig-retirement";

/** All authored idea briefs — the input corpus for the pipeline. */
export const briefs: IdeaBrief[] = [
  prymer,
  cadence,
  ledgerLoop,
  returnRabbit,
  clipForge,
  loreweaver,
  quietHours,
  shipyard,
  tutorMint,
  gridSense,
  patchPay,
  nestEgg,
];

export function loadBriefs(): IdeaBrief[] {
  return briefs;
}
