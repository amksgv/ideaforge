import { prisma } from "@/lib/db";
import { rotationIndex, utcDateKey } from "@/lib/dates";
import type { IdeaReport } from "@/lib/types";

/** Upsert a batch of reports into the database (idempotent by slug). */
export async function persistReports(reports: IdeaReport[]): Promise<void> {
  for (const r of reports) {
    const data = {
      slug: r.slug,
      title: r.title,
      tagline: r.tagline,
      category: r.category,
      businessModel: r.businessModel,
      emoji: r.emoji,
      overallScore: r.scores.overall,
      opportunityScore: Math.round(r.scores.opportunity.value),
      problemScore: Math.round(r.scores.problem.value),
      feasibilityScore: Math.round(r.scores.feasibility.value),
      whyNowScore: Math.round(r.scores.whyNow.value),
      revenueLabel: r.businessFit.revenuePotential.label,
      executionLabel: r.businessFit.executionDifficulty.label,
      founderInvestment: r.founderFit.investment,
      founderTechnical: r.founderFit.technicalSkill,
      founderTime: r.founderFit.timeCommitment,
      gregsPick: r.gregsPick,
      confidence: r.confidence,
      tags: r.tags.join(",").toLowerCase(),
      report: JSON.stringify(r),
    };
    await prisma.idea.upsert({
      where: { slug: r.slug },
      update: data,
      create: data,
    });
  }
}

/**
 * Schedule "Idea of the Day" for a rolling window of days. Rotates through the
 * WHOLE catalog (Greg's Picks first, then by score) using the same day-index
 * the runtime fallback uses, so the schedule and the fallback agree and no
 * idea repeats on consecutive days. Idempotent per date; never overwrites a
 * date that was already scheduled (so manual curation sticks).
 */
export async function assignDailyFeatures(days = 10): Promise<void> {
  const rotation = await prisma.idea.findMany({
    orderBy: [{ gregsPick: "desc" }, { overallScore: "desc" }, { slug: "asc" }],
    select: { id: true },
  });
  if (rotation.length === 0) return;

  for (let d = 0; d < days; d++) {
    const date = utcDateKey(new Date(Date.now() + d * 86_400_000));
    const idea = rotation[rotationIndex(date, rotation.length)];
    await prisma.dailyFeature.upsert({
      where: { date },
      update: {}, // keep existing (possibly hand-curated) assignment
      create: { date, ideaId: idea.id },
    });
  }
}
