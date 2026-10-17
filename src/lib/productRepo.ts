import type { Product } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { rotationIndex, utcDateKey } from "@/lib/dates";
import {
  buildProductOrderBy,
  buildProductWhere,
  paginateProducts,
  type ProductQuery,
} from "@/lib/productQuery";
import { productToSummary } from "@/lib/productSummary";
import type { PriceTier, ProductFormat, ProductNiche, ProductReport, ProductSummary } from "@/lib/productTypes";

export type { ProductQuery, ProductSortKey } from "@/lib/productQuery";

function rowToReport(row: Product): ProductReport {
  return JSON.parse(row.report) as ProductReport;
}
function rowToSummary(row: Pick<Product, "summary" | "report">): ProductSummary {
  if (row.summary && row.summary !== "{}") return JSON.parse(row.summary) as ProductSummary;
  return productToSummary(JSON.parse(row.report) as ProductReport);
}

export interface ProductPage {
  products: ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export async function queryProducts(params: ProductQuery = {}): Promise<ProductPage> {
  const where = buildProductWhere(params);
  const orderBy = buildProductOrderBy(params.sort);
  const { skip, take, page, pageSize } = paginateProducts(params.page, params.pageSize);
  const [rows, total] = await Promise.all([
    prisma.product.findMany({ where, orderBy, skip, take, select: { summary: true, report: true } }),
    prisma.product.count({ where }),
  ]);
  return { products: rows.map(rowToSummary), total, page, pageSize, pageCount: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getProductBySlug(slug: string): Promise<ProductReport | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? rowToReport(row) : null;
}

export async function getAllProductSlugs(): Promise<string[]> {
  return (await prisma.product.findMany({ select: { slug: true } })).map((r) => r.slug);
}

export async function getAllProductReports(): Promise<ProductReport[]> {
  const rows = await prisma.product.findMany({ orderBy: buildProductOrderBy("overall") });
  return rows.map(rowToReport);
}

export async function getProductOfTheDay(dateKey = utcDateKey()): Promise<ProductReport | null> {
  const f = await prisma.productFeature.findUnique({ where: { date: dateKey }, include: { product: true } });
  if (f?.product) return rowToReport(f.product);
  const rows = await prisma.product.findMany({ orderBy: [{ gregsPick: "desc" }, { overallScore: "desc" }, { slug: "asc" }] });
  if (!rows.length) return null;
  return rowToReport(rows[rotationIndex(dateKey, rows.length)]);
}

export interface ProductFacets {
  total: number;
  niches: { name: ProductNiche; count: number }[];
  formats: { name: ProductFormat; count: number }[];
  priceTiers: { name: PriceTier; count: number }[];
  singapore: number;
  gregsPicks: number;
  avgOverall: number;
}

export async function getProductFacets(): Promise<ProductFacets> {
  const [niches, formats, tiers, sg, picks, agg] = await Promise.all([
    prisma.product.groupBy({ by: ["niche"], _count: { _all: true } }),
    prisma.product.groupBy({ by: ["bestFormat"], _count: { _all: true } }),
    prisma.product.groupBy({ by: ["priceTier"], _count: { _all: true } }),
    prisma.product.count({ where: { hasSingapore: true } }),
    prisma.product.count({ where: { gregsPick: true } }),
    prisma.product.aggregate({ _count: { _all: true }, _avg: { overallScore: true } }),
  ]);
  const byCount = <T extends { count: number; name: string }>(a: T, b: T) => b.count - a.count || a.name.localeCompare(b.name);
  return {
    total: agg._count._all,
    niches: niches.map((n) => ({ name: n.niche as ProductNiche, count: n._count._all })).sort(byCount),
    formats: formats.map((f) => ({ name: f.bestFormat as ProductFormat, count: f._count._all })).sort(byCount),
    priceTiers: tiers.map((t) => ({ name: t.priceTier as PriceTier, count: t._count._all })).sort(byCount),
    singapore: sg,
    gregsPicks: picks,
    avgOverall: Math.round(agg._avg.overallScore ?? 0),
  };
}
