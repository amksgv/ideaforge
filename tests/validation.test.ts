import { describe, expect, it } from "vitest";
import {
  AgentBodySchema,
  GenerateBodySchema,
  IdeasQuerySchema,
  readJson,
  searchParamsToObject,
} from "@/lib/validation";

describe("IdeasQuerySchema (regressions for the June 500/silent-zero bugs)", () => {
  it("rejects non-numeric minOverall instead of passing NaN to Prisma", () => {
    expect(IdeasQuerySchema.safeParse({ minOverall: "abc" }).success).toBe(false);
  });

  it("coerces numeric strings and enforces 0-100", () => {
    expect(IdeasQuerySchema.parse({ minOverall: "75" }).minOverall).toBe(75);
    expect(IdeasQuerySchema.safeParse({ minOverall: "101" }).success).toBe(false);
    expect(IdeasQuerySchema.safeParse({ minOverall: "-1" }).success).toBe(false);
  });

  it("rejects unknown Level values instead of silently zeroing results", () => {
    expect(IdeasQuerySchema.safeParse({ maxTechnical: "banana" }).success).toBe(false);
    expect(IdeasQuerySchema.parse({ maxTechnical: "Low" }).maxTechnical).toBe("Low");
  });

  it("splits CSV facets and rejects unknown categories", () => {
    const ok = IdeasQuerySchema.parse({ categories: "Fintech,Education" });
    expect(ok.categories).toEqual(["Fintech", "Education"]);
    expect(IdeasQuerySchema.safeParse({ categories: "Fintech,Nope" }).success).toBe(false);
  });

  it("rejects unknown sort keys and caps query length", () => {
    expect(IdeasQuerySchema.safeParse({ sort: "DROP" }).success).toBe(false);
    expect(IdeasQuerySchema.safeParse({ q: "x".repeat(101) }).success).toBe(false);
  });

  it("parses gregsPickOnly flags to booleans", () => {
    expect(IdeasQuerySchema.parse({ gregsPickOnly: "1" }).gregsPickOnly).toBe(true);
    expect(IdeasQuerySchema.parse({ gregsPickOnly: "false" }).gregsPickOnly).toBe(false);
  });
});

describe("AgentBodySchema", () => {
  it("rejects wrong types", () => {
    expect(AgentBodySchema.safeParse({ slug: 123, message: ["a"] }).success).toBe(false);
  });
  it("caps message at 2000 chars and requires non-empty", () => {
    expect(AgentBodySchema.safeParse({ slug: "ok-slug", message: "x".repeat(2001) }).success).toBe(false);
    expect(AgentBodySchema.safeParse({ slug: "ok-slug", message: "   " }).success).toBe(false);
    expect(AgentBodySchema.safeParse({ slug: "ok-slug", message: "x".repeat(2000) }).success).toBe(true);
  });
  it("only accepts kebab-case slugs", () => {
    expect(AgentBodySchema.safeParse({ slug: "../etc/passwd", message: "hi" }).success).toBe(false);
    expect(AgentBodySchema.safeParse({ slug: "Prymer", message: "hi" }).success).toBe(false);
    expect(AgentBodySchema.safeParse({ slug: "prymer-ai-onboarding-copilot", message: "hi" }).success).toBe(true);
  });
});

describe("GenerateBodySchema", () => {
  it("rejects invalid levels rather than returning fake fit scores", () => {
    expect(GenerateBodySchema.safeParse({ technical: "Ultra" }).success).toBe(false);
    expect(GenerateBodySchema.safeParse({ capital: null }).success).toBe(false);
    expect(GenerateBodySchema.safeParse({ categories: "notarray" }).success).toBe(false);
  });
  it("applies permissive defaults for an empty profile", () => {
    expect(GenerateBodySchema.parse({})).toEqual({ technical: "High", capital: "High", categories: [] });
  });
});

describe("readJson", () => {
  const req = (body: string, len?: number) =>
    new Request("http://x", {
      method: "POST",
      body,
      headers: { "content-type": "application/json", ...(len ? { "content-length": String(len) } : {}) },
    });

  it("returns null on malformed JSON", async () => {
    expect(await readJson(req("not json"))).toBeNull();
  });
  it("returns null when the body exceeds the cap", async () => {
    expect(await readJson(req("x".repeat(20_000)))).toBeNull();
    expect(await readJson(req("{}", 999_999))).toBeNull();
  });
  it("parses small valid bodies", async () => {
    expect(await readJson(req('{"a":1}'))).toEqual({ a: 1 });
  });
});

describe("searchParamsToObject", () => {
  it("takes the first value for repeated keys", () => {
    expect(searchParamsToObject(new URLSearchParams("a=1&a=2&b=3"))).toEqual({ a: "1", b: "3" });
  });
});
