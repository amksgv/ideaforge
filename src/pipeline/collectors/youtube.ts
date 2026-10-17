import { env } from "@/lib/env";
import { formatCompact } from "@/lib/format";
import type { CommunitySignal, Signal } from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import { describeError, httpJson } from "./http";
import type { CollectorContext, YoutubeResult } from "./types";
import { hintToCommunity } from "./util";

function offline(brief: IdeaBrief): YoutubeResult {
  const communities: CommunitySignal[] = brief.signals.communities
    .filter((c) => c.platform === "youtube")
    .map(hintToCommunity);
  return {
    communities,
    videosTracked: brief.signals.youtubeVideosTracked,
    signals: [
      {
        source: "youtube",
        metric: "Videos tracked",
        value: formatCompact(brief.signals.youtubeVideosTracked),
        detail: "Tutorials & demand-signal content in this niche",
        confidence: 76,
      },
    ],
    source: "youtube:fixture",
  };
}

async function live(brief: IdeaBrief): Promise<YoutubeResult> {
  const q = encodeURIComponent(brief.tags.slice(0, 3).join(" ") || brief.title);
  const res = await httpJson<any>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${q}&key=${env.youtubeKey}`,
  );
  const items: any[] = res?.items ?? [];
  const total: number = res?.pageInfo?.totalResults ?? items.length;
  const top = items[0]?.snippet;
  const communities: CommunitySignal[] = top
    ? [
        {
          platform: "youtube",
          name: top.channelTitle ?? "Top channel",
          size: `${formatCompact(total)} results`,
          keyPains: [],
          moneySignals: [],
          freshOpportunities: items.slice(0, 3).map((i) => i.snippet?.title).filter(Boolean),
          mostWantedFixes: [],
        },
      ]
    : [];
  return {
    communities,
    videosTracked: total,
    signals: [
      {
        source: "youtube",
        metric: "Matching videos",
        value: formatCompact(total),
        detail: top?.channelTitle ? `Top channel: ${top.channelTitle}` : undefined,
        confidence: 80,
      },
    ],
    source: "youtube:live",
  };
}

export async function collectYoutube(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<YoutubeResult> {
  if (ctx.live && env.youtubeKey) {
    try {
      return await live(brief);
    } catch (err) {
      console.warn(`[youtube] live collect failed, using fixture: ${describeError(err)}`);
    }
  }
  return offline(brief);
}
