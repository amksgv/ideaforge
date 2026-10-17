import type {
  CommunitySignal,
  Keyword,
  Signal,
  TrendPoint,
} from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import { runCollectors } from "./collectors";
import { seriesSlope } from "./collectors/http";
import type { CollectorContext } from "./collectors/types";

export interface BundleMetrics {
  totalSearchVolume: number;
  searchGrowthYoY: number;
  trendSlope: number; // -1..1
  painCount: number;
  redditMentions: number;
  youtubeVideos: number;
  communityReach: number;
  avgSignalConfidence: number;
}

export interface SignalBundle {
  brief: IdeaBrief;
  communitySignals: CommunitySignal[];
  signals: Signal[];
  keywords: Keyword[];
  trend: TrendPoint[];
  metrics: BundleMetrics;
  sources: string[];
}

function uniq(arr: string[]): string[] {
  return [...new Set(arr)];
}

/**
 * Run all collectors and fold their output into a single normalized bundle
 * that the scoring + synthesis stages consume.
 */
export async function aggregate(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<SignalBundle> {
  const raw = await runCollectors(brief, ctx);

  const communitySignals: CommunitySignal[] = [
    ...raw.reddit.communities,
    ...raw.facebook.communities,
    ...raw.youtube.communities,
  ];

  const extra: Signal[] = (brief.signals.extraSignals ?? []).map((e) => ({
    source: e.source,
    metric: e.metric,
    value: e.value,
    growth: e.growth,
    detail: e.detail,
    confidence: e.confidence ?? 60,
  }));

  const signals: Signal[] = [
    ...raw.trends.signals,
    ...raw.keywords.signals,
    ...raw.reddit.signals,
    ...raw.youtube.signals,
    ...raw.facebook.signals,
    ...extra,
  ];

  const painCount = communitySignals.reduce(
    (a, c) => a + c.keyPains.length,
    0,
  );
  const communityReach =
    raw.reddit.reach +
    brief.signals.communities
      .filter((c) => c.platform === "facebook")
      .reduce((a, c) => a + c.reach, 0);

  const avgSignalConfidence = signals.length
    ? Math.round(
        signals.reduce((a, s) => a + s.confidence, 0) / signals.length,
      )
    : 60;

  const metrics: BundleMetrics = {
    totalSearchVolume: raw.keywords.totalVolume,
    searchGrowthYoY: raw.trends.searchGrowthYoY,
    trendSlope: seriesSlope(raw.trends.trend.map((t) => t.value)),
    painCount,
    redditMentions: raw.reddit.mentionsPerMonth,
    youtubeVideos: raw.youtube.videosTracked,
    communityReach,
    avgSignalConfidence,
  };

  const sources = uniq([
    raw.reddit.source,
    raw.youtube.source,
    raw.trends.source,
    raw.keywords.source,
    raw.facebook.source,
  ]);

  return {
    brief,
    communitySignals,
    signals,
    keywords: raw.keywords.keywords,
    trend: raw.trends.trend,
    metrics,
    sources,
  };
}
