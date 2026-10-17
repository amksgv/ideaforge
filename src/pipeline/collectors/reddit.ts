import { env } from "@/lib/env";
import { formatCompact } from "@/lib/format";
import type { CommunitySignal, Signal } from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import { describeError, httpJson } from "./http";
import type { CollectorContext, RedditResult } from "./types";
import { hintToCommunity } from "./util";

function offline(brief: IdeaBrief): RedditResult {
  const communities: CommunitySignal[] = brief.signals.communities
    .filter((c) => c.platform === "reddit")
    .map(hintToCommunity);
  const reach = brief.signals.communities
    .filter((c) => c.platform === "reddit")
    .reduce((a, c) => a + c.reach, 0);
  const signals: Signal[] = [
    {
      source: "reddit",
      metric: "Mentions / month",
      value: formatCompact(brief.signals.redditMentionsPerMonth),
      growth: Math.round(brief.signals.searchGrowthYoY * 0.7),
      detail: `Across ${communities.length} tracked subreddits`,
      confidence: 84,
    },
  ];
  return {
    communities,
    signals,
    mentionsPerMonth: brief.signals.redditMentionsPerMonth,
    reach,
    source: "reddit:fixture",
  };
}

/**
 * Live path: application-only OAuth + /search. Returns real mention counts and
 * the top subreddits with sampled post titles. Qualitative pains/fixes are
 * derived downstream by the LLM in synthesize() when running live.
 */
async function live(brief: IdeaBrief): Promise<RedditResult> {
  const auth = Buffer.from(
    `${env.reddit.clientId}:${env.reddit.clientSecret}`,
  ).toString("base64");
  const token = await httpJson<{ access_token: string }>(
    "https://www.reddit.com/api/v1/access_token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": env.reddit.userAgent,
      },
      body: "grant_type=client_credentials",
    },
  );

  const q = encodeURIComponent(brief.tags.slice(0, 3).join(" ") || brief.title);
  const search = await httpJson<any>(
    `https://oauth.reddit.com/search?q=${q}&limit=50&sort=relevance&t=year`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "User-Agent": env.reddit.userAgent,
      },
    },
  );

  const posts: any[] = search?.data?.children?.map((c: any) => c.data) ?? [];
  type SubAgg = { count: number; titles: string[]; subs: number };
  const bySub = new Map<string, SubAgg>();
  for (const p of posts) {
    const k = p.subreddit_name_prefixed ?? `r/${p.subreddit}`;
    const e: SubAgg = bySub.get(k) ?? { count: 0, titles: [], subs: p.subreddit_subscribers ?? 0 };
    e.count++;
    if (e.titles.length < 3 && p.title) e.titles.push(p.title);
    bySub.set(k, e);
  }
  const communities: CommunitySignal[] = [...bySub.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)
    .map(([name, e]) => ({
      platform: "reddit" as const,
      name,
      size: e.subs ? `${formatCompact(e.subs)} members` : "active",
      keyPains: [],
      moneySignals: [],
      freshOpportunities: e.titles,
      mostWantedFixes: [],
    }));

  const mentions = posts.length;
  return {
    communities,
    signals: [
      {
        source: "reddit",
        metric: "Relevant posts (last year)",
        value: `${mentions}`,
        detail: `${communities.length} subreddits surfaced`,
        confidence: 88,
      },
    ],
    mentionsPerMonth: Math.round((mentions / 12) * 10) / 10,
    reach: communities.length * 50_000,
    source: "reddit:live",
  };
}

export async function collectReddit(
  brief: IdeaBrief,
  ctx: CollectorContext,
): Promise<RedditResult> {
  if (ctx.live && env.reddit.clientId && env.reddit.clientSecret) {
    try {
      return await live(brief);
    } catch (err) {
      console.warn(`[reddit] live collect failed, using fixture: ${describeError(err)}`);
    }
  }
  return offline(brief);
}
