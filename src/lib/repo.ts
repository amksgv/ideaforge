import type { Idea, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { rotationIndex, utcDateKey } from "@/lib/dates";
import type {
  BusinessModel,
  Category,
  IdeaReport,
  IdeaSummary,
  Level,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Mapping helpers
// ---------------------------------------------------------------------------

type IdeaRow = Idea;

export function rowToReport(row: IdeaRow): IdeaReport {
  return JSON.parse(row.report) as IdeaReport;
}

export function reportToSummary(r: IdeaReport): IdeaSummary {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    emoji: r.emoji,
    category: r.category,
    businessModel: r.businessModel,
    tags: r.tags,
    scores: r.scores,
    revenueLabel: r.businessFit.revenuePotential.label,
    founderFit: r.founderFit,
    gregsPick: r.gregsPick,
  };
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export type SortKey =
  | "overall"
  | "opportunity"
  | "feasibility"
  | "whyNow"
  | "newest";

export interface IdeaQuery {
  q?: string;
  categories?: string[];
  businessModels?: string[];
  minOverall?: number;
  maxInvestment?: Level; // founder fit ceiling
  maxTechnical?: Level;
  gregsPickOnly?: boolean;
  sort?: SortKey;
}

const LEVEL_RANK: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };

export async function queryIdeas(params: IdeaQuery = {}): Promise<IdeaSummary[]> {
  const where: Prisma.IdeaWhereInput = {};
  if (params.categories?.length) where.category = { in: params.categories };
  if (params.businessModels?.length)
    where.businessModel = { in: params.businessModels };
  if (typeof params.minOverall === "number")
    where.overallScore = { gte: params.minOverall };
  if (params.gregsPickOnly) where.gregsPick = true;

  const orderBy: Prisma.IdeaOrderByWithRelationInput =
    params.sort === "newest"
      ? { createdAt: "desc" }
      : params.sort === "opportunity"
        ? { opportunityScore: "desc" }
        : params.sort === "feasibility"
          ? { feasibilityScore: "desc" }
          : params.sort === "whyNow"
            ? { whyNowScore: "desc" }
            : { overallScore: "desc" };

  const rows = await prisma.idea.findMany({ where, orderBy });
  let reports = rows.map(rowToReport);

  // Free-text search + founder-fit ceilings are applied in-memory.
  const q = params.q?.trim().toLowerCase();
  if (q) {
    reports = reports.filter((r) =>
      [r.title, r.tagline, r.narrative, r.tags.join(" "), r.category]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  if (params.maxInvestment) {
    const cap = LEVEL_RANK[params.maxInvestment];
    reports = reports.filter(
      (r) => LEVEL_RANK[r.founderFit.investment] <= cap,
    );
  }
  if (params.maxTechnical) {
    const cap = LEVEL_RANK[params.maxTechnical];
    reports = reports.filter(
      (r) => LEVEL_RANK[r.founderFit.technicalSkill] <= cap,
    );
  }

  return reports.map(reportToSummary);
}

export async function getAllReports(): Promise<IdeaReport[]> {
  const rows = await prisma.idea.findMany({ orderBy: { overallScore: "desc" } });
  return rows.map(rowToReport);
}

export async function getIdeaBySlug(slug: string): Promise<IdeaReport | null> {
  const row = await prisma.idea.findUnique({ where: { slug } });
  return row ? rowToReport(row) : null;
}

export async function getAllSlugs(): Promise<string[]> {
  const rows = await prisma.idea.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}

// ---------------------------------------------------------------------------
// Idea of the Day
// ---------------------------------------------------------------------------

export { utcDateKey, daysSinceEpoch } from "@/lib/dates";

/**
 * Resolve today's featured idea. Prefers a curated DailyFeature row (written by
 * the pipeline / cron). Falls back to a true day-by-day rotation through the
 * whole catalog (Greg's Picks first) so an idea is never repeated on
 * consecutive days even if the schedule has lapsed.
 */
export async function getIdeaOfTheDay(
  dateKey = utcDateKey(),
): Promise<IdeaReport | null> {
  const feature = await prisma.dailyFeature.findUnique({
    where: { date: dateKey },
    include: { idea: true },
  });
  if (feature?.idea) return rowToReport(feature.idea);

  const rows = await prisma.idea.findMany({
    orderBy: [{ gregsPick: "desc" }, { overallScore: "desc" }, { slug: "asc" }],
  });
  if (rows.length === 0) return null;
  return rowToReport(rows[rotationIndex(dateKey, rows.length)]);
}

// ---------------------------------------------------------------------------
// Facets & stats for the database/filter UI
// ---------------------------------------------------------------------------

export interface Facets {
  total: number;
  categories: { name: Category; count: number }[];
  businessModels: { name: BusinessModel; count: number }[];
  gregsPicks: number;
  avgOverall: number;
}

export async function getFacets(): Promise<Facets> {
  const rows = await prisma.idea.findMany({
    select: {
      category: true,
      businessModel: true,
      gregsPick: true,
      overallScore: true,
    },
  });
  const catMap = new Map<string, number>();
  const bmMap = new Map<string, number>();
  let picks = 0;
  let sum = 0;
  for (const r of rows) {
    catMap.set(r.category, (catMap.get(r.category) ?? 0) + 1);
    bmMap.set(r.businessModel, (bmMap.get(r.businessModel) ?? 0) + 1);
    if (r.gregsPick) picks++;
    sum += r.overallScore;
  }
  return {
    total: rows.length,
    categories: [...catMap.entries()]
      .map(([name, count]) => ({ name: name as Category, count }))
      .sort((a, b) => b.count - a.count),
    businessModels: [...bmMap.entries()]
      .map(([name, count]) => ({ name: name as BusinessModel, count }))
      .sort((a, b) => b.count - a.count),
    gregsPicks: picks,
    avgOverall: rows.length ? Math.round(sum / rows.length) : 0,
  };
}
