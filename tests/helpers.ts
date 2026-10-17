import type { IdeaBrief } from "@/pipeline/brief";
import type { SignalBundle } from "@/pipeline/aggregate";
import type { IdeaReport, IdeaScores, Level } from "@/lib/types";
import { prymer } from "@/data/ideas/prymer";
import { aggregate } from "@/pipeline/aggregate";
import { deriveScores } from "@/pipeline/scoring";
import { synthesizeOffline } from "@/pipeline/synthesize";

/** Deep-clone the gold-standard brief so tests can mutate freely. */
export function brief(overrides: Partial<IdeaBrief> = {}): IdeaBrief {
  return { ...structuredClone(prymer), ...overrides };
}

export async function bundleFor(b: IdeaBrief = brief()): Promise<SignalBundle> {
  return aggregate(b, { live: false });
}

export async function reportFor(b: IdeaBrief = brief()): Promise<IdeaReport> {
  const bundle = await bundleFor(b);
  return synthesizeOffline(bundle, deriveScores(bundle));
}

/** Build a bundle with specific metric overrides for scoring tests. */
export function bundleWith(
  base: SignalBundle,
  patch: {
    metrics?: Partial<SignalBundle["metrics"]>;
    technical?: Level;
    investment?: Level;
  },
): SignalBundle {
  const b = structuredClone(base);
  Object.assign(b.metrics, patch.metrics ?? {});
  if (patch.technical) b.brief.founderFit.technicalSkill = patch.technical;
  if (patch.investment) b.brief.founderFit.investment = patch.investment;
  return b;
}

export function fakeReport(slug: string, overall: number, gregsPick = false): IdeaReport {
  const scores: IdeaScores = {
    opportunity: { value: overall / 10, rationale: "" },
    problem: { value: overall / 10, rationale: "" },
    feasibility: { value: overall / 10, rationale: "" },
    whyNow: { value: overall / 10, rationale: "" },
    overall,
  };
  return { slug, scores, gregsPick } as unknown as IdeaReport;
}
