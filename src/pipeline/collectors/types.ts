import type {
  CommunitySignal,
  Keyword,
  Signal,
  TrendPoint,
} from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";

export interface CollectorContext {
  live: boolean;
}

export interface RedditResult {
  communities: CommunitySignal[];
  signals: Signal[];
  mentionsPerMonth: number;
  reach: number;
  source: string; // "reddit:live" | "reddit:fixture"
}

export interface YoutubeResult {
  communities: CommunitySignal[];
  signals: Signal[];
  videosTracked: number;
  source: string;
}

export interface FacebookResult {
  communities: CommunitySignal[];
  signals: Signal[];
  source: string;
}

export interface TrendsResult {
  trend: TrendPoint[];
  searchGrowthYoY: number;
  signals: Signal[];
  source: string;
}

export interface KeywordsResult {
  keywords: Keyword[];
  totalVolume: number;
  signals: Signal[];
  source: string;
}

export type Collector<R> = (
  brief: IdeaBrief,
  ctx: CollectorContext,
) => Promise<R>;
