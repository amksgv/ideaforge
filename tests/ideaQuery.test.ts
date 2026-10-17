import { describe, expect, it } from "vitest";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  buildOrderBy,
  buildWhere,
  levelsUpTo,
  paginate,
  queryToSearchParams,
} from "@/lib/ideaQuery";

describe("levelsUpTo (founder-fit ceilings in SQL)", () => {
  it("maps a cap to every level at or below it", () => {
    expect(levelsUpTo("Low")).toEqual(["Low"]);
    expect(levelsUpTo("Medium")).toEqual(["Low", "Medium"]);
    expect(levelsUpTo("High")).toEqual(["Low", "Medium", "High"]);
  });
});

describe("buildWhere", () => {
  it("is empty for an empty query", () => {
    expect(buildWhere({})).toEqual({});
  });

  it("pushes founder-fit ceilings into IN clauses instead of in-memory filtering", () => {
    const w = buildWhere({ maxTechnical: "Medium", maxInvestment: "Low" });
    expect(w.founderTechnical).toEqual({ in: ["Low", "Medium"] });
    expect(w.founderInvestment).toEqual({ in: ["Low"] });
  });

  it("applies facets, score floor and picks", () => {
    const w = buildWhere({
      categories: ["Fintech"],
      businessModels: ["B2B", "SaaS"],
      minOverall: 70,
      gregsPickOnly: true,
    });
    expect(w.category).toEqual({ in: ["Fintech"] });
    expect(w.businessModel).toEqual({ in: ["B2B", "SaaS"] });
    expect(w.overallScore).toEqual({ gte: 70 });
    expect(w.gregsPick).toBe(true);
  });

  it("ignores a zero score floor and empty arrays", () => {
    const w = buildWhere({ minOverall: 0, categories: [], businessModels: [] });
    expect(w).toEqual({});
  });

  it("turns free text into a lowercased LIKE on the denormalized searchText column", () => {
    const w = buildWhere({ q: "  Churn  " });
    expect(w.AND).toEqual([{ searchText: { contains: "churn" } }]);
  });

  it("skips blank search strings", () => {
    expect(buildWhere({ q: "   " })).toEqual({});
  });
});

describe("buildOrderBy", () => {
  it("defaults to overall score and always adds a stable slug tiebreaker", () => {
    expect(buildOrderBy()).toEqual([{ overallScore: "desc" }, { slug: "asc" }]);
    expect(buildOrderBy("newest")[0]).toEqual({ createdAt: "desc" });
    expect(buildOrderBy("whyNow")[0]).toEqual({ whyNowScore: "desc" });
    expect(buildOrderBy("feasibility")[1]).toEqual({ slug: "asc" });
  });
});

describe("paginate", () => {
  it("uses sane defaults", () => {
    expect(paginate()).toEqual({ skip: 0, take: DEFAULT_PAGE_SIZE, page: 1, pageSize: DEFAULT_PAGE_SIZE });
  });
  it("computes skip from a 1-based page", () => {
    expect(paginate(3, 10)).toEqual({ skip: 20, take: 10, page: 3, pageSize: 10 });
  });
  it("clamps page size and floors bad input", () => {
    expect(paginate(0, 1000).pageSize).toBe(MAX_PAGE_SIZE);
    expect(paginate(-5, 0)).toEqual({ skip: 0, take: 1, page: 1, pageSize: 1 });
    expect(paginate(2.9, 5.7)).toEqual({ skip: 5, take: 5, page: 2, pageSize: 5 });
  });
});

describe("queryToSearchParams", () => {
  it("round-trips non-default fields and drops defaults", () => {
    const sp = queryToSearchParams({
      q: " ai ",
      categories: ["Fintech", "Education"],
      minOverall: 60,
      maxTechnical: "Medium",
      gregsPickOnly: true,
      sort: "whyNow",
      page: 2,
    });
    expect(sp.get("q")).toBe("ai");
    expect(sp.get("categories")).toBe("Fintech,Education");
    expect(sp.get("minOverall")).toBe("60");
    expect(sp.get("maxTechnical")).toBe("Medium");
    expect(sp.get("gregsPickOnly")).toBe("1");
    expect(sp.get("sort")).toBe("whyNow");
    expect(sp.get("page")).toBe("2");
    expect(sp.has("pageSize")).toBe(false);
  });
  it("produces an empty string for the default view", () => {
    expect(queryToSearchParams({ sort: "overall", page: 1, minOverall: 0 }).toString()).toBe("");
  });
});
