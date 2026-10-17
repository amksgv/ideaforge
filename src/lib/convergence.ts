// ---------------------------------------------------------------------------
// Beau Norton's 5-Part Knowledge Convergence: Skills · Struggles · Hobbies ·
// Vocation · Passions. A founder's "zone of genius" is the overlap. We turn
// the free-text profile into a token set and reward ideas/products whose
// subject matter overlaps it. Pure and deterministic.
// ---------------------------------------------------------------------------

export interface Convergence {
  skills?: string;
  struggles?: string;
  hobbies?: string;
  vocation?: string;
  passions?: string;
}

export const CONVERGENCE_KEYS = ["skills", "struggles", "hobbies", "vocation", "passions"] as const;

const STOP = new Set([
  "the", "and", "for", "with", "that", "this", "from", "have", "has", "had", "are", "was", "were", "been", "being",
  "into", "about", "over", "under", "your", "you", "our", "their", "they", "them", "his", "her", "she", "him",
  "but", "not", "can", "will", "would", "could", "should", "just", "like", "also", "very", "really", "more", "most",
  "some", "any", "all", "lot", "lots", "years", "year", "time", "work", "working", "people", "things", "stuff",
  "good", "great", "love", "loving", "enjoy", "doing", "done", "make", "making", "get", "getting", "want", "wanted",
]);

/**
 * Light stemmer so "freelancing" ≈ "freelancer" ≈ "freelance" and
 * "nurse" ≈ "nurses" ≈ "nursing". Order matters: strip the long suffixes,
 * then plural -s/-es, then a trailing -e, so singular and plural converge.
 */
export function stem(w: string): string {
  let s = w.toLowerCase();
  const stripped = s.replace(/(ing|ers|er|ed|ly|ment|tion|ness)$/, "");
  if (stripped !== s && stripped.length >= 3) {
    // A derivational suffix was removed ("nursing" → "nurs"); the remaining
    // trailing "s" is part of the stem, so skip the plural step.
    s = stripped;
  } else if (/(ches|shes|xes|zes|sses)$/.test(s)) {
    s = s.slice(0, -2); // boxes → box, classes → class
  } else if (/[^s]s$/.test(s)) {
    s = s.slice(0, -1); // nurses → nurse (keeps "class")
  }
  s = s.replace(/e$/, ""); // nurse → nurs (so nurse ≡ nurses ≡ nursing)
  return s.replace(/i$/, "y");
}

export function tokenize(text: string | undefined): Set<string> {
  const out = new Set<string>();
  if (!text) return out;
  for (const raw of text.toLowerCase().split(/[^a-z0-9+#]+/)) {
    if (raw.length < 3 || STOP.has(raw)) continue;
    out.add(stem(raw));
  }
  return out;
}

export function convergenceTokens(c: Convergence | undefined): Set<string> {
  const all = new Set<string>();
  if (!c) return all;
  for (const k of CONVERGENCE_KEYS) for (const t of tokenize(c[k])) all.add(t);
  return all;
}

export interface ConvergenceFit {
  /** 0–15 bonus to add to a fit score. */
  bonus: number;
  /** Which profile tokens matched the subject (for the UI reason string). */
  matched: string[];
  /** Which of the five parts contributed (deduped). */
  parts: (typeof CONVERGENCE_KEYS)[number][];
}

/**
 * Score how strongly a subject (title/tags/category/audience text) overlaps
 * the founder's convergence. Each distinct matched token is worth 4 points,
 * capped at 15; a match across 2+ parts (e.g. vocation AND struggle) adds 3 —
 * that's Norton's "mess becomes message" multiplier.
 */
export function convergenceFit(c: Convergence | undefined, subjectText: string): ConvergenceFit {
  if (!c) return { bonus: 0, matched: [], parts: [] };
  const subject = tokenize(subjectText);
  const matched = new Set<string>();
  const parts = new Set<(typeof CONVERGENCE_KEYS)[number]>();
  for (const k of CONVERGENCE_KEYS) {
    for (const t of tokenize(c[k])) {
      if (subject.has(t)) {
        matched.add(t);
        parts.add(k);
      }
    }
  }
  let bonus = Math.min(15, matched.size * 4);
  if (parts.size >= 2) bonus = Math.min(15, bonus + 3);
  return { bonus, matched: [...matched].slice(0, 6), parts: [...parts] };
}

/**
 * Ordering for "zone of genius" lists: matched items first (any bonus > 0),
 * then by score. Keeps a weak single-token match ahead of an unmatched
 * high-scorer — the section promises relevance before opportunity.
 */
export function compareByConvergence<T extends { fitScore: number; convergence: { bonus: number } }>(a: T, b: T): number {
  const am = a.convergence.bonus > 0 ? 1 : 0;
  const bm = b.convergence.bonus > 0 ? 1 : 0;
  return bm - am || b.fitScore - a.fitScore;
}

export function hasConvergence(c: Convergence | undefined): boolean {
  return Boolean(c && CONVERGENCE_KEYS.some((k) => (c[k] ?? "").trim().length > 0));
}
