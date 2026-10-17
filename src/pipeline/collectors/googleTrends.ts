import { env } from "@/lib/env";
import { formatPct } from "@/lib/format";
import type { Signal, TrendPoint } from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import { describeError, httpJson } from "./http";
import type { CollectorContext, TrendsResult } from "./types";
import { shapeToTrend } from "./util";

function offline(brief: IdeaBrief): TrendsResult {
  const trend = shapeToTrend(brief.signals.trendShape);
  const growth = brief.signals.searchGrowthYoY;
  return {
    trend,
    searchGrowthYoY: growth,
    signals: [
      {
        source: "google_trends",
        metric: "Search interest (YoY)",
        value: formatPct(growth),
        growth,
        detail: "12-month Google Trends trajectory",
        confidence: 82,
      },
    ],
    source: "google_trends:fixture",
  };
}

async function live(brief: IdeaBrief): Promise<TrendsResult> {
  const q = encodeURIComponent(brief.tags[0] ?? brief.title);
  const res = await httpJson<any>(
    `https://serpapi.com/search.json?engine=google_trends&data_type=TIMESERIES&q=${q}&api_key=${env.serpApiKey}`,
  );
  const timeline: any[] = res?.interest_over_time?.timeline_data ?? [];
  const trend: TrendPoint[] = timeline.slice(-12).map((t) => ({
    period: t.date ?? "",
    value: Number(t.values?.[0]?.extracted_value ?? 0),
  }));
  const first = trend[0]?.value || 1;
  const last = trend[trend.length - 1]?.value || first;
  const growth = Math.round(((last - first) / first) * 100);
  return {
    trend,
    searchGrowthYoY: growth,
    signals: [
      {
        source: "google_trends",
        metric: "Search interest (YoY)",
        value: formatPct(growth),
        growth,
        detail: "SerpAPI Google Trends timeseries",
        confidence: 85,
      },
    ],
    source: "google_trends:live",
  };
}

export async function collectTrends(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<TrendsResult> {
  if (ctx.live && env.serpApiKey) {
    try {
      return await live(brief);
    } catch (err) {
      console.warn(`[trends] live collect failed, using fixture: ${describeError(err)}`);
    }
  }
  return offline(brief);
}
