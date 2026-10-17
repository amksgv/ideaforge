import type { Idea } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { rotationIndex, utcDateKey } from "@/lib/dates";
import {
  buildOrderBy,
  buildWhere,
  paginate,
  type IdeaQuery,
} from "@/lib/ideaQuery";
import { reportToSummary } from "@/lib/summary";
import type {
  BusinessModel,
  Category,
  IdeaReport,
  IdeaSummary,
} from "@/lib/types";

export { utcDateKey, daysSinceEpoch } from "@/lib/dates";
export { reportToSummary } from "@/lib/summary";
export type { IdeaQuery, SortKey } from "@/lib/ideaQuery";

// ---------------------------------------------------------------------------
// Mapping helpers
// ---------------------------------------------------------------------------

type IdeaRow = Idea;

export function rowToReport(row: IdeaRow): IdeaReport {
  return JSON.parse(row.report) as IdeaReport;
}

/**
 * Read the persisted summary projection. Falls back to deriving it from the
 * full report for rows written before the `summary` column existed.
 */
function rowToSummary(row: Pick<IdeaRow, "summary" | "report">): IdeaSummary {
  if (row.summary && row.summary !== "{}") {
    return JSON.parse(row.summary) as IdeaSummary;
  }
  return reportToSummary(JSON.parse(row.report) as IdeaReport);
}

// ---------------------------------------------------------------------------
// Queries — every filter, sort and page runs in SQL. List views read only the
// `summary` column, never the full report blob.
// ---------------------------------------------------------------------------

export interface IdeaPage {
  ideas: IdeaSummary[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export async function queryIdeas(params: IdeaQuery = {}): Promise<IdeaPage> {
  const where = buildWhere(params);
  const orderBy = buildOrderBy(params.sort);
  const { skip, take, page, pageSize } = paginate(params.page, params.pageSize);

  const [rows, total] = await Promise.all([
    prisma.idea.findMany({
      where,
      orderBy,
      skip,
      take,
      select: { summary: true, report: true },
    }),
    prisma.idea.count({ where }),
  ]);

  return {
    ideas: rows.map(rowToSummary),
    total,
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getAllReports(): Promise<IdeaReport[]> {
  const rows = await prisma.idea.findMany({ orderBy: buildOrderBy("overall") });
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
// Facets & stats for the database/filter UI — aggregated in SQL.
// ---------------------------------------------------------------------------

export interface Facets {
  total: number;
  categories: { name: Category; count: number }[];
  businessModels: { name: BusinessModel; count: number }[];
  gregsPicks: number;
  avgOverall: number;
}

export async function getFacets(): Promise<Facets> {
  const [cats, bms, picks, agg] = await Promise.all([
    prisma.idea.groupBy({ by: ["category"], _count: { _all: true } }),
    prisma.idea.groupBy({ by: ["businessModel"], _count: { _all: true } }),
    prisma.idea.count({ where: { gregsPick: true } }),
    prisma.idea.aggregate({ _count: { _all: true }, _avg: { overallScore: true } }),
  ]);

  return {
    total: agg._count._all,
    categories: cats
      .map((c) => ({ name: c.category as Category, count: c._count._all }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    businessModels: bms
      .map((b) => ({ name: b.businessModel as BusinessModel, count: b._count._all }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    gregsPicks: picks,
    avgOverall: Math.round(agg._avg.overallScore ?? 0),
  };
}
