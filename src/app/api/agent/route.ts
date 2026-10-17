import { NextRequest, NextResponse } from "next/server";
import { llmEnabled } from "@/lib/env";
import { getIdeaBySlug } from "@/lib/repo";
import { getProductBySlug } from "@/lib/productRepo";
import {
  AGENT_SYSTEM_PROMPT,
  PRODUCT_AGENT_SYSTEM_PROMPT,
  buildProductUserPrompt,
  buildUserPrompt,
  offlineAnswer,
  offlineProductAnswer,
} from "@/lib/agentAnswer";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";
import { AgentBodySchema, badRequest, readJson } from "@/lib/validation";
import { llmComplete } from "@/pipeline/llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Tighter limit here: every live call costs money. Consumed before
  // validation so malformed requests can't bypass it.
  const rl = rateLimit(`agent:${clientIp(req)}`, { limit: 20, windowMs: 60_000 });
  if (!rl.ok) return tooManyRequests(rl);

  const body = await readJson(req);
  if (body === null) return NextResponse.json({ error: "Invalid or oversized JSON body" }, { status: 400 });
  const parsed = AgentBodySchema.safeParse(body);
  if (!parsed.success) return badRequest(parsed.error);
  const { slug, message, kind } = parsed.data;

  if (kind === "product") {
    const product = await getProductBySlug(slug);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    if (llmEnabled()) {
      const answer = await llmComplete({ system: PRODUCT_AGENT_SYSTEM_PROMPT, user: buildProductUserPrompt(product, message), temperature: 0.4, maxTokens: 600 });
      if (answer) return NextResponse.json({ answer, mode: "llm", kind });
    }
    return NextResponse.json({ answer: offlineProductAnswer(product, message), mode: "offline", kind });
  }

  const report = await getIdeaBySlug(slug);
  if (!report) return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  if (llmEnabled()) {
    const answer = await llmComplete({ system: AGENT_SYSTEM_PROMPT, user: buildUserPrompt(report, message), temperature: 0.4, maxTokens: 600 });
    if (answer) return NextResponse.json({ answer, mode: "llm", kind });
  }
  return NextResponse.json({ answer: offlineAnswer(report, message), mode: "offline", kind });
}
