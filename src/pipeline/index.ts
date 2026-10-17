import type { IdeaReport } from "@/lib/types";
import type { IdeaBrief } from "./brief";
import { aggregate } from "./aggregate";
import type { CollectorContext } from "./collectors/types";
import { curate } from "./curate";
import { deriveScores } from "./scoring";
import { synthesize } from "./synthesize";

export type { IdeaBrief } from "./brief";
export type { CollectorContext } from "./collectors/types";

/** Full pipeline for one idea: collect → aggregate → score → synthesize. */
export async function runIdea(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<IdeaReport> {
  const bundle = await aggregate(brief, ctx);
  const scores = deriveScores(bundle);
  return synthesize(bundle, scores);
}

/** Run the pipeline over many briefs and apply the curation layer. */
export async function runAll(
  briefs: IdeaBrief[],
  ctx: CollectorContext,
): Promise<IdeaReport[]> {
  const reports: IdeaReport[] = [];
  for (const brief of briefs) {
    reports.push(await runIdea(brief, ctx));
  }
  return curate(reports);
}
