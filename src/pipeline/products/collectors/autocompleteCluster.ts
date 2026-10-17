import type { AutocompleteCluster } from "@/lib/productTypes";

// ---------------------------------------------------------------------------
// Turn raw autocomplete suggestions into intent-tagged clusters. Pure, so the
// scorer and tests can rely on it regardless of which source produced the
// suggestions. Clustering is by the qualifier that follows the seed phrase
// ("notion template FOR STUDENTS" → cluster "for students").
// ---------------------------------------------------------------------------

export const BUYING_INTENT_WORDS = [
  "template", "templates", "checklist", "planner", "tracker", "spreadsheet",
  "printable", "bundle", "kit", "workbook", "guide", "blueprint", "system",
  "course", "pdf", "download", "free", "best", "top", "cheap", "buy", "price",
  "for beginners", "step by step", "2026", "2027",
];

export const PROBLEM_INTENT_WORDS = [
  "how to", "why", "not working", "problem", "fix", "help", "struggling",
  "can't", "cant", "won't", "wont", "stuck", "mistake", "fail", "without",
  "vs", "alternative", "instead of",
];

export function classifyIntent(phrase: string): AutocompleteCluster["intent"] {
  const p = phrase.toLowerCase();
  if (PROBLEM_INTENT_WORDS.some((w) => p.includes(w))) return "problem";
  if (BUYING_INTENT_WORDS.some((w) => p.includes(w))) return "buying";
  return "informational";
}

/** Fraction (0-1) of phrases carrying buying OR problem intent. */
export function intentDensity(phrases: string[]): number {
  if (!phrases.length) return 0;
  const n = phrases.filter((p) => classifyIntent(p) !== "informational").length;
  return n / phrases.length;
}

function qualifier(seed: string, phrase: string): string {
  const s = seed.toLowerCase().trim();
  const p = phrase.toLowerCase().trim();
  if (p === s) return "(exact)";
  // Only strip the seed at a WORD boundary — "perimenopause sleepiness" must
  // not become the cluster "iness".
  if (p.startsWith(s + " ")) {
    const rest = p.slice(s.length).trim();
    return rest.split(/\s+/).slice(0, 2).join(" ") || "(exact)";
  }
  // Seed appears later in the phrase ("best notion template") → cluster by the lead words.
  const idx = p.indexOf(s);
  if (idx > 0) return p.slice(0, idx).trim().split(/\s+/).slice(-2).join(" ") || "(variant)";
  // Phrase is a morphological variant / unrelated → its own first two words.
  return p.split(/\s+/).slice(0, 2).join(" ");
}

export function clusterSuggestions(seed: string, suggestions: string[]): AutocompleteCluster[] {
  const map = new Map<string, string[]>();
  for (const s of suggestions) {
    if (!s?.trim()) continue;
    const q = qualifier(seed, s);
    const arr = map.get(q) ?? [];
    if (!arr.includes(s)) arr.push(s);
    map.set(q, arr);
  }
  return [...map.entries()]
    .map(([label, phrases]) => {
      const votes = phrases.map(classifyIntent);
      const intent: AutocompleteCluster["intent"] =
        votes.filter((v) => v === "problem").length >= Math.ceil(votes.length / 2)
          ? "problem"
          : votes.filter((v) => v === "buying").length >= Math.ceil(votes.length / 2)
            ? "buying"
            : "informational";
      return { label, phrases, intent };
    })
    .sort((a, b) => b.phrases.length - a.phrases.length);
}

/** Dedupe + trim + drop the seed itself; keeps order. */
export function normalizeSuggestions(seed: string, raw: string[], max = 20): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const s = seed.toLowerCase().trim();
  for (const r of raw) {
    const v = (r ?? "").toLowerCase().replace(/\s+/g, " ").trim();
    if (!v || v === s || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
    if (out.length >= max) break;
  }
  return out;
}
