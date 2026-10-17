import { NextResponse } from "next/server";
import { z } from "zod";
import { BUSINESS_MODELS, CATEGORIES } from "@/lib/types";

// ---------------------------------------------------------------------------
// Request validation schemas for every API route. Parsed at the boundary so
// the rest of the code can trust its inputs (no NaN into Prisma, no "banana"
// levels silently zeroing results, no 200 KB prompts hitting a paid LLM).
// ---------------------------------------------------------------------------

export const LevelSchema = z.enum(["Low", "Medium", "High"]);
export const SortSchema = z.enum([
  "overall",
  "opportunity",
  "feasibility",
  "whyNow",
  "newest",
]);

const csv = (allowed: readonly string[]) =>
  z
    .string()
    .transform((s) => s.split(",").map((x) => x.trim()).filter(Boolean))
    .pipe(z.array(z.enum(allowed as [string, ...string[]])).max(20))
    .optional();

export const IdeasQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  categories: csv(CATEGORIES),
  businessModels: csv(BUSINESS_MODELS),
  minOverall: z.coerce.number().int().min(0).max(100).optional(),
  maxInvestment: LevelSchema.optional(),
  maxTechnical: LevelSchema.optional(),
  gregsPickOnly: z
    .enum(["0", "1", "true", "false"])
    .transform((v) => v === "1" || v === "true")
    .optional(),
  sort: SortSchema.optional(),
});

export const AgentBodySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "slug must be a lowercase kebab-case identifier"),
  message: z.string().trim().min(1).max(2000),
});

export const GenerateBodySchema = z.object({
  technical: LevelSchema.default("High"),
  capital: LevelSchema.default("High"),
  categories: z.array(z.enum(CATEGORIES)).max(CATEGORIES.length).default([]),
});

/** Uniform 400 response for schema failures. */
export function badRequest(error: z.ZodError) {
  return NextResponse.json(
    {
      error: "Invalid request",
      issues: error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    },
    { status: 400 },
  );
}

/** Parse a URLSearchParams object into a plain record for zod. */
export function searchParamsToObject(sp: URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  sp.forEach((v, k) => {
    if (!(k in out)) out[k] = v;
  });
  return out;
}

/** Safely read a JSON body, returning null (not throwing) on bad JSON. */
export async function readJson(req: Request, maxBytes = 16_384): Promise<unknown | null> {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > maxBytes) return null;
  try {
    const text = await req.text();
    if (text.length > maxBytes) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}
