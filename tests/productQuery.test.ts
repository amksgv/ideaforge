import { describe, expect, it } from "vitest";
import { buildProductOrderBy, buildProductWhere, paginateProducts, productQueryToSearchParams } from "@/lib/productQuery";
import { ProductsQuerySchema } from "@/lib/validation";

describe("buildProductWhere", () => {
  it("is empty for the default view", () => expect(buildProductWhere({})).toEqual({}));
  it("maps facets, ceilings and flags to SQL", () => {
    const w = buildProductWhere({ niches: ["Local & Singapore"], formats: ["spreadsheet"], priceTiers: ["core"], minOverall: 60, maxCompetitors: 50, singaporeOnly: true, gregsPickOnly: true, q: " CPF " });
    expect(w.niche).toEqual({ in: ["Local & Singapore"] });
    expect(w.bestFormat).toEqual({ in: ["spreadsheet"] });
    expect(w.priceTier).toEqual({ in: ["core"] });
    expect(w.overallScore).toEqual({ gte: 60 });
    expect(w.competitorCount).toEqual({ lte: 50 });
    expect(w.hasSingapore).toBe(true);
    expect(w.gregsPick).toBe(true);
    expect(w.searchText).toEqual({ contains: "cpf" });
  });
  it("treats maxCompetitors=0 as a real filter (wide-open niches only)", () => {
    expect(buildProductWhere({ maxCompetitors: 0 }).competitorCount).toEqual({ lte: 0 });
  });
});

describe("buildProductOrderBy", () => {
  it("adds a stable slug tiebreaker to every sort", () => {
    for (const s of ["overall", "gap", "intent", "competition", "trend", "price", "newest"] as const) {
      const o = buildProductOrderBy(s);
      expect(o).toHaveLength(2);
      expect(o[1]).toEqual({ slug: "asc" });
    }
    expect(buildProductOrderBy("competition")[0]).toEqual({ competitionScore: "desc" });
  });
});

describe("paginateProducts + URL round-trip", () => {
  it("clamps and floors", () => {
    expect(paginateProducts()).toMatchObject({ skip: 0, page: 1, pageSize: 12 });
    expect(paginateProducts(0, 999).pageSize).toBe(48);
    expect(paginateProducts(3, 10).skip).toBe(20);
  });
  it("serializes only non-defaults", () => {
    const sp = productQueryToSearchParams({ formats: ["checklist", "guide"], maxCompetitors: 10, sort: "gap", page: 2, singaporeOnly: true });
    expect(sp.get("formats")).toBe("checklist,guide");
    expect(sp.get("maxCompetitors")).toBe("10");
    expect(sp.get("sort")).toBe("gap");
    expect(sp.get("page")).toBe("2");
    expect(sp.get("singaporeOnly")).toBe("1");
    expect(productQueryToSearchParams({ sort: "overall", page: 1 }).toString()).toBe("");
  });
});

describe("ProductsQuerySchema (API boundary)", () => {
  it("rejects unknown niches/formats/sorts and NaN numbers", () => {
    expect(ProductsQuerySchema.safeParse({ niches: "Nope" }).success).toBe(false);
    expect(ProductsQuerySchema.safeParse({ formats: "pdf" }).success).toBe(false);
    expect(ProductsQuerySchema.safeParse({ sort: "DROP" }).success).toBe(false);
    expect(ProductsQuerySchema.safeParse({ maxCompetitors: "abc" }).success).toBe(false);
  });
  it("parses valid CSV facets and flags", () => {
    const p = ProductsQuerySchema.parse({ niches: "Health & Sleep,Home & Food", priceTiers: "tripwire", singaporeOnly: "1", maxCompetitors: "50" });
    expect(p.niches).toEqual(["Health & Sleep", "Home & Food"]);
    expect(p.priceTiers).toEqual(["tripwire"]);
    expect(p.singaporeOnly).toBe(true);
    expect(p.maxCompetitors).toBe(50);
  });
});
