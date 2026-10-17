import type { Prisma } from "@/generated/prisma/client";
import type { PriceTier, ProductFormat } from "@/lib/productTypes";

// Pure query builder for the Digital Product Lab — same contract as ideaQuery.

export type ProductSortKey = "overall" | "gap" | "intent" | "competition" | "trend" | "price" | "newest";

export interface ProductQuery {
  q?: string;
  niches?: string[];
  formats?: ProductFormat[];
  priceTiers?: PriceTier[];
  minOverall?: number;
  maxCompetitors?: number;
  singaporeOnly?: boolean;
  gregsPickOnly?: boolean;
  sort?: ProductSortKey;
  page?: number;
  pageSize?: number;
}

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

export function buildProductWhere(p: ProductQuery): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = {};
  if (p.niches?.length) where.niche = { in: p.niches };
  if (p.formats?.length) where.bestFormat = { in: p.formats };
  if (p.priceTiers?.length) where.priceTier = { in: p.priceTiers };
  if (typeof p.minOverall === "number" && p.minOverall > 0) where.overallScore = { gte: p.minOverall };
  if (typeof p.maxCompetitors === "number" && p.maxCompetitors >= 0) where.competitorCount = { lte: p.maxCompetitors };
  if (p.singaporeOnly) where.hasSingapore = true;
  if (p.gregsPickOnly) where.gregsPick = true;
  const q = p.q?.trim().toLowerCase();
  if (q) where.searchText = { contains: q };
  return where;
}

export function buildProductOrderBy(sort: ProductSortKey = "overall"): Prisma.ProductOrderByWithRelationInput[] {
  const primary: Prisma.ProductOrderByWithRelationInput =
    sort === "newest" ? { createdAt: "desc" }
    : sort === "gap" ? { gapScore: "desc" }
    : sort === "intent" ? { intentScore: "desc" }
    : sort === "competition" ? { competitionScore: "desc" }
    : sort === "trend" ? { trendScore: "desc" }
    : sort === "price" ? { recommendedUsd: "desc" }
    : { overallScore: "desc" };
  return [primary, { slug: "asc" }];
}

export function paginateProducts(page?: number, pageSize?: number) {
  const size = Math.min(MAX_PAGE_SIZE, Math.max(1, Math.floor(pageSize ?? DEFAULT_PAGE_SIZE)));
  const pg = Math.max(1, Math.floor(page ?? 1));
  return { skip: (pg - 1) * size, take: size, page: pg, pageSize: size };
}

export function productQueryToSearchParams(p: ProductQuery): URLSearchParams {
  const sp = new URLSearchParams();
  if (p.q?.trim()) sp.set("q", p.q.trim());
  if (p.niches?.length) sp.set("niches", p.niches.join(","));
  if (p.formats?.length) sp.set("formats", p.formats.join(","));
  if (p.priceTiers?.length) sp.set("priceTiers", p.priceTiers.join(","));
  if (p.minOverall) sp.set("minOverall", String(p.minOverall));
  if (typeof p.maxCompetitors === "number") sp.set("maxCompetitors", String(p.maxCompetitors));
  if (p.singaporeOnly) sp.set("singaporeOnly", "1");
  if (p.gregsPickOnly) sp.set("gregsPickOnly", "1");
  if (p.sort && p.sort !== "overall") sp.set("sort", p.sort);
  if (p.page && p.page > 1) sp.set("page", String(p.page));
  if (p.pageSize && p.pageSize !== DEFAULT_PAGE_SIZE) sp.set("pageSize", String(p.pageSize));
  return sp;
}
