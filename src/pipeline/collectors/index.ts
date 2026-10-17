import type { IdeaBrief } from "@/pipeline/brief";
import { collectFacebook } from "./facebook";
import { collectKeywords } from "./keywords";
import { collectReddit } from "./reddit";
import { collectTrends } from "./googleTrends";
import { collectYoutube } from "./youtube";
import type {
  CollectorContext,
  FacebookResult,
  KeywordsResult,
  RedditResult,
  TrendsResult,
  YoutubeResult,
} from "./types";

export interface RawCollection {
  reddit: RedditResult;
  youtube: YoutubeResult;
  trends: TrendsResult;
  keywords: KeywordsResult;
  facebook: FacebookResult;
}

/** Fan out to every collector in parallel. */
export async function runCollectors(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<RawCollection> {
  const [reddit, youtube, trends, keywords, facebook] = await Promise.all([
    collectReddit(brief, ctx),
    collectYoutube(brief, ctx),
    collectTrends(brief, ctx),
    collectKeywords(brief, ctx),
    collectFacebook(brief, ctx),
  ]);
  return { reddit, youtube, trends, keywords, facebook };
}

export * from "./types";
