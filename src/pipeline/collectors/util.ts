import type { CommunitySignal, TrendPoint } from "@/lib/types";
import type { CommunityHint } from "@/pipeline/brief";

export function hintToCommunity(h: CommunityHint): CommunitySignal {
  return {
    platform: h.platform,
    name: h.name,
    size: h.size,
    keyPains: h.keyPains,
    moneySignals: h.moneySignals,
    freshOpportunities: h.freshOpportunities,
    mostWantedFixes: h.mostWantedFixes,
  };
}

export function lastNMonths(n: number, ref = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth() - i, 1));
    out.push(
      `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
    );
  }
  return out;
}

export function shapeToTrend(shape: number[]): TrendPoint[] {
  const labels = lastNMonths(shape.length);
  return shape.map((value, i) => ({ period: labels[i], value }));
}
