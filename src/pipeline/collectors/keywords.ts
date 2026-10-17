import { env } from "@/lib/env";
import { formatCompact, formatPct } from "@/lib/format";
import type { Keyword, Signal } from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import { describeError, httpJson } from "./http";
import type { CollectorContext, KeywordsResult } from "./types";

function offline(brief: IdeaBrief): KeywordsResult {
  const keywords = brief.signals.keywords;
  const totalVolume = keywords.reduce((a, k) => a + k.volume, 0);
  const top = [...keywords].sort((a, b) => b.volume - a.volume)[0];
  return {
    keywords,
    totalVolume,
    signals: [
      {
        source: "keywords",
        metric: "Total monthly search volume",
        value: formatCompact(totalVolume),
        detail: top ? `Top term: "${top.term}" (${formatPct(top.growth)})` : undefined,
        confidence: 80,
      },
    ],
    source: "keywords:fixture",
  };
}

/**
 * Live path uses SerpAPI Google Trends "related queries" as a volume proxy
 * (precise volume needs a paid Keyword Planner / Ahrefs integration — wire one
 * in here if you have it). Rising % maps to growth.
 */
async function live(brief: IdeaBrief): Promise<KeywordsResult> {
  const q = encodeURIComponent(brief.tags[0] ?? brief.title);
  const res = await httpJson<any>(
    `https://serpapi.com/search.json?engine=google_trends&data_type=RELATED_QUERIES&q=${q}&api_key=${env.serpApiKey}`,
  );
  const rising: any[] = res?.related_queries?.rising ?? [];
  const keywords: Keyword[] = rising.slice(0, 8).map((r) => ({
    term: r.query,
    volume: Math.max(200, Math.round((r.extracted_value ?? 100) * 12)),
    growth: Math.min(900, Math.round(r.extracted_value ?? 50)),
    competition: "Medium" as const,
  }));
  const list = keywords.length ? keywords : brief.signals.keywords;
  const totalVolume = list.reduce((a, k) => a + k.volume, 0);
  return {
    keywords: list,
    totalVolume,
    signals: [
      {
        source: "keywords",
        metric: "Rising related queries",
        value: `${list.length}`,
        detail: "SerpAPI related-queries (rising)",
        confidence: 72,
      },
    ],
    source: "keywords:live",
  };
}

export async function collectKeywords(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<KeywordsResult> {
  if (ctx.live && env.serpApiKey) {
    try {
      return await live(brief);
    } catch (err) {
      console.warn(`[keywords] live collect failed, using fixture: ${describeError(err)}`);
    }
  }
  return offline(brief);
}
