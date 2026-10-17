// Central, lazy access to environment configuration. Getters read process.env
// at call time so config stays correct regardless of module import order
// (important for CLI scripts that load .env after imports are hoisted).

export type DataMode = "offline" | "live";
export type LlmProvider = "openai" | "anthropic" | "none";

function str(v: string | undefined, fallback = ""): string {
  return (v ?? fallback).trim();
}

export const env = {
  get dataMode(): DataMode {
    return (str(process.env.DATA_MODE, "offline") as DataMode) || "offline";
  },
  llm: {
    get provider(): LlmProvider {
      return (str(process.env.LLM_PROVIDER, "none") as LlmProvider) || "none";
    },
    get model(): string {
      return str(process.env.LLM_MODEL, "gpt-4o-mini");
    },
    get openaiKey(): string {
      return str(process.env.OPENAI_API_KEY);
    },
    get anthropicKey(): string {
      return str(process.env.ANTHROPIC_API_KEY);
    },
  },
  reddit: {
    get clientId(): string {
      return str(process.env.REDDIT_CLIENT_ID);
    },
    get clientSecret(): string {
      return str(process.env.REDDIT_CLIENT_SECRET);
    },
    get userAgent(): string {
      return str(process.env.REDDIT_USER_AGENT, "ideaforge/0.1");
    },
  },
  get youtubeKey(): string {
    return str(process.env.YOUTUBE_API_KEY);
  },
  get serpApiKey(): string {
    return str(process.env.SERPAPI_KEY);
  },
};

export function isLive(): boolean {
  return env.dataMode === "live";
}

export function llmEnabled(): boolean {
  if (env.llm.provider === "openai") return Boolean(env.llm.openaiKey);
  if (env.llm.provider === "anthropic") return Boolean(env.llm.anthropicKey);
  return false;
}
