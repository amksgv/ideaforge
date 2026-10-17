import { describe, expect, it } from "vitest";
import { compareByConvergence, convergenceFit, convergenceTokens, hasConvergence, stem, tokenize } from "@/lib/convergence";
import { AgentBodySchema, GenerateBodySchema } from "@/lib/validation";

describe("tokenize", () => {
  it("lowercases, drops stopwords/short words, and stems lightly", () => {
    const t = tokenize("I love Freelancing and spreadsheets for the nurses");
    expect(t.has("freelanc")).toBe(true);
    expect(t.has("spreadsheet")).toBe(true);
    expect(t.has("nurs")).toBe(true);
    expect(t.has("the")).toBe(false);
    expect(t.has("love")).toBe(false); // stopword
  });
  it("is empty for undefined", () => expect(tokenize(undefined).size).toBe(0));

  it("REGRESSION: singular, plural and -ing forms converge", () => {
    expect(stem("nurse")).toBe(stem("nurses"));
    expect(stem("nurse")).toBe(stem("nursing"));
    expect(stem("freelancer")).toBe(stem("freelancing"));
    expect(stem("spreadsheet")).toBe(stem("spreadsheets"));
    expect(stem("class")).toBe("class"); // keep double-s
    expect(stem("boxes")).toBe("box");
  });
});

describe("convergenceFit (Norton's 5-Part Convergence)", () => {
  const profile = { vocation: "nurse, ICU", struggles: "failed the NCLEX once", hobbies: "running", skills: "Notion", passions: "study systems" };

  it("rewards subjects the founder has lived and names the matched tokens", () => {
    const fit = convergenceFit(profile, "NCLEX study planner for nurses with weak categories");
    expect(fit.bonus).toBeGreaterThan(0);
    expect(fit.matched).toEqual(expect.arrayContaining(["nclex", "nurs"]));
    expect(fit.parts).toEqual(expect.arrayContaining(["vocation", "struggles"]));
  });

  it("adds the multi-part multiplier when vocation AND struggle both match", () => {
    const single = convergenceFit({ vocation: "nurse" }, "nurse scheduling");
    const double = convergenceFit({ vocation: "nurse", struggles: "nurse burnout" }, "nurse scheduling");
    expect(double.bonus).toBeGreaterThanOrEqual(single.bonus);
  });

  it("caps at 15 and returns 0 for no overlap or no profile", () => {
    const words = "alpha bravo charlie delta echo foxtrot golf hotel";
    const many = convergenceFit({ skills: words }, words);
    expect(many.bonus).toBe(15);
    expect(convergenceFit(profile, "ninja creami ice cream").bonus).toBe(0);
    expect(convergenceFit(undefined, "anything").bonus).toBe(0);
  });

  it("REGRESSION: a weak match (nurses → NCLEX, +4) lists ahead of an unmatched higher-opportunity product", () => {
    const nclex = { fitScore: 68 + 4, convergence: { bonus: 4 } };
    const cpf = { fitScore: 77, convergence: { bonus: 0 } };
    const strong = { fitScore: 60 + 15, convergence: { bonus: 15 } };
    const sorted = [cpf, nclex, strong].sort(compareByConvergence);
    expect(sorted.map((x) => x.fitScore)).toEqual([75, 72, 77]); // matched first (by fit), then unmatched
  });

  it("hasConvergence ignores whitespace-only fields", () => {
    expect(hasConvergence({ skills: "   " })).toBe(false);
    expect(hasConvergence({ passions: "CPF" })).toBe(true);
    expect(convergenceTokens({ passions: "CPF optimisation" }).has("cpf")).toBe(true);
  });
});

describe("schemas gained new fields safely", () => {
  it("GenerateBodySchema accepts an optional convergence and caps field length", () => {
    expect(GenerateBodySchema.parse({}).convergence).toBeUndefined();
    expect(GenerateBodySchema.safeParse({ convergence: { skills: "x".repeat(301) } }).success).toBe(false);
    expect(GenerateBodySchema.parse({ convergence: { vocation: " nurse " } }).convergence?.vocation).toBe("nurse");
  });
  it("AgentBodySchema defaults kind to idea and accepts product", () => {
    expect(AgentBodySchema.parse({ slug: "a-b", message: "hi" }).kind).toBe("idea");
    expect(AgentBodySchema.parse({ slug: "a-b", message: "hi", kind: "product" }).kind).toBe("product");
    expect(AgentBodySchema.safeParse({ slug: "a-b", message: "hi", kind: "recipe" }).success).toBe(false);
  });
});
