import type { Prisma } from "@/generated/prisma/client";
import type { Level } from "@/lib/types";

// ---------------------------------------------------------------------------
// Pure query-building for the Idea Database. Translates validated URL/API
// parameters into Prisma `where` / `orderBy` / pagination — so every filter,
// including founder-fit ceilings and free-text search, runs in SQL instead of
// hydrating the whole catalog into memory. No DB import: unit-testable.
// ---------------------------------------------------------------------------

export type SortKey = "overall" | "opportunity" | "feasibility" | "whyNow" | "newest";

export interface IdeaQuery {
  q?: string;
  categories?: string[];
  businessModels?: string[];
  minOverall?: number;
  /** Founder-fit ceilings: include ideas needing at most this level. */
  maxInvestment?: Level;
  maxTechnical?: Level;
  gregsPickOnly?: boolean;
  sort?: SortKey;
  page?: number; // 1-based
  pageSize?: number;
}

export const LEVELS: readonly Level[] = ["Low", "Medium", "High"];
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

/** All levels at or below the cap, e.g. Medium → ["Low", "Medium"]. */
export function levelsUpTo(cap: Level): Level[] {
  const i = LEVELS.indexOf(cap);
  return LEVELS.slice(0, i + 1);
}

export function buildWhere(p: IdeaQuery): Prisma.IdeaWhereInput {
  const where: Prisma.IdeaWhereInput = {};
  const and: Prisma.IdeaWhereInput[] = [];

  if (p.categories?.length) where.category = { in: p.categories };
  if (p.businessModels?.length) where.businessModel = { in: p.businessModels };
  if (typeof p.minOverall === "number" && p.minOverall > 0) {
    where.overallScore = { gte: p.minOverall };
  }
  if (p.gregsPickOnly) where.gregsPick = true;
  if (p.maxInvestment) where.founderInvestment = { in: levelsUpTo(p.maxInvestment) };
  if (p.maxTechnical) where.founderTechnical = { in: levelsUpTo(p.maxTechnical) };

  const q = p.q?.trim().toLowerCase();
  if (q) {
    // Single denormalized haystack (title, tagline, category, tags, narrative,
    // market gap) written by the pipeline; one LIKE instead of an OR fan-out.
    and.push({ searchText: { contains: q } });
  }

  if (and.length) where.AND = and;
  return where;
}

export function buildOrderBy(sort: SortKey = "overall"): Prisma.IdeaOrderByWithRelationInput[] {
  const primary: Prisma.IdeaOrderByWithRelationInput =
    sort === "newest"
      ? { createdAt: "desc" }
      : sort === "opportunity"
        ? { opportunityScore: "desc" }
        : sort === "feasibility"
          ? { feasibilityScore: "desc" }
          : sort === "whyNow"
            ? { whyNowScore: "desc" }
            : { overallScore: "desc" };
  // Stable secondary key so pagination never shows duplicates across pages.
  return [primary, { slug: "asc" }];
}

export function paginate(page?: number, pageSize?: number): { skip: number; take: number; page: number; pageSize: number } {
  const size = Math.min(MAX_PAGE_SIZE, Math.max(1, Math.floor(pageSize ?? DEFAULT_PAGE_SIZE)));
  const pg = Math.max(1, Math.floor(page ?? 1));
  return { skip: (pg - 1) * size, take: size, page: pg, pageSize: size };
}

/** Serialize a query back into URL search params (drops defaults/empties). */
export function queryToSearchParams(p: IdeaQuery): URLSearchParams {
  const sp = new URLSearchParams();
  if (p.q?.trim()) sp.set("q", p.q.trim());
  if (p.categories?.length) sp.set("categories", p.categories.join(","));
  if (p.businessModels?.length) sp.set("businessModels", p.businessModels.join(","));
  if (p.minOverall) sp.set("minOverall", String(p.minOverall));
  if (p.maxInvestment) sp.set("maxInvestment", p.maxInvestment);
  if (p.maxTechnical) sp.set("maxTechnical", p.maxTechnical);
  if (p.gregsPickOnly) sp.set("gregsPickOnly", "1");
  if (p.sort && p.sort !== "overall") sp.set("sort", p.sort);
  if (p.page && p.page > 1) sp.set("page", String(p.page));
  if (p.pageSize && p.pageSize !== DEFAULT_PAGE_SIZE) sp.set("pageSize", String(p.pageSize));
  return sp;
}
