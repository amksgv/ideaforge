import type { CommunitySignal, Signal } from "@/lib/types";
import type { IdeaBrief } from "@/pipeline/brief";
import type { CollectorContext, FacebookResult } from "./types";
import { hintToCommunity } from "./util";

/**
 * Facebook Groups (and X/Twitter) have no compliant, affordable public API for
 * this use case, so this collector is ALWAYS fixture-backed — even in live
 * mode. To make it live you'd plug in a permitted data partner / manual export
 * here. See README "Live mode & data sources".
 */
export async function collectFacebook(
  brief: IdeaBrief,
  _ctx: CollectorContext,
): Promise<FacebookResult> {
  const communities: CommunitySignal[] = brief.signals.communities
    .filter((c) => c.platform === "facebook")
    .map(hintToCommunity);
  const reach = brief.signals.communities
    .filter((c) => c.platform === "facebook")
    .reduce((a, c) => a + c.reach, 0);
  const signals: Signal[] = communities.length
    ? [
        {
          source: "facebook",
          metric: "Group reach",
          value: reach ? `${Math.round(reach / 1000)}k members` : "active",
          detail: `${communities.length} niche groups tracked`,
          confidence: 64,
        },
      ]
    : [];
  return { communities, signals, source: "facebook:fixture" };
}
