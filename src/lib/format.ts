import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** 14800 -> "14.8K", 2400000 -> "2.4M" */
export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000)
    return `${trimZero(n / 1_000_000)}M`;
  if (Math.abs(n) >= 1_000) return `${trimZero(n / 1_000)}K`;
  return `${n}`;
}

function trimZero(n: number): string {
  return n.toFixed(1).replace(/\.0$/, "");
}

export function formatPct(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n}%`;
}

export type Tone = "high" | "mid" | "low";

/** Tone for a 0-10 score. */
export function scoreTone(value: number): Tone {
  if (value >= 8) return "high";
  if (value >= 6) return "mid";
  return "low";
}

/** Tone for a 0-100 overall score. */
export function overallTone(value: number): Tone {
  if (value >= 80) return "high";
  if (value >= 65) return "mid";
  return "low";
}

const TONE_TEXT: Record<Tone, string> = {
  high: "text-brand-600",
  mid: "text-amber-500",
  low: "text-rose-500",
};
const TONE_BG: Record<Tone, string> = {
  high: "bg-brand-500",
  mid: "bg-amber-400",
  low: "bg-rose-400",
};
const TONE_SOFT: Record<Tone, string> = {
  high: "bg-brand-50 text-brand-700 border-brand-200",
  mid: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-rose-50 text-rose-700 border-rose-200",
};

export function toneText(tone: Tone): string {
  return TONE_TEXT[tone];
}
export function toneBar(tone: Tone): string {
  return TONE_BG[tone];
}
export function toneSoft(tone: Tone): string {
  return TONE_SOFT[tone];
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function levelDots(level: "Low" | "Medium" | "High"): number {
  return level === "High" ? 3 : level === "Medium" ? 2 : 1;
}
