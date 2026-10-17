import { env, llmEnabled } from "@/lib/env";

export interface LlmOptions {
  system?: string;
  user: string;
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Provider-agnostic completion. Returns null when no LLM is configured, so
 * every caller has a clean offline fallback path.
 */
export async function llmComplete(opts: LlmOptions): Promise<string | null> {
  if (!llmEnabled()) return null;
  try {
    if (env.llm.provider === "openai") return await openai(opts);
    if (env.llm.provider === "anthropic") return await anthropic(opts);
  } catch (err) {
    console.warn(`[llm] completion failed: ${String(err)}`);
  }
  return null;
}

export async function llmJSON<T>(opts: LlmOptions): Promise<T | null> {
  const raw = await llmComplete({ ...opts, json: true });
  if (!raw) return null;
  try {
    const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}

async function openai(opts: LlmOptions): Promise<string | null> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.llm.openaiKey}`,
    },
    body: JSON.stringify({
      model: env.llm.model || "gpt-4o-mini",
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 1500,
      ...(opts.json ? { response_format: { type: "json_object" } } : {}),
      messages: [
        ...(opts.system ? [{ role: "system", content: opts.system }] : []),
        { role: "user", content: opts.user },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? null;
}

async function anthropic(opts: LlmOptions): Promise<string | null> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.llm.anthropicKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: env.llm.model || "claude-3-5-sonnet-latest",
      max_tokens: opts.maxTokens ?? 1500,
      temperature: opts.temperature ?? 0.7,
      ...(opts.system ? { system: opts.system } : {}),
      messages: [{ role: "user", content: opts.user }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}`);
  const data = await res.json();
  return data?.content?.[0]?.text ?? null;
}
