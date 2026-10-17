// Pure date helpers shared by the repo (runtime fallback) and the pipeline
// (schedule writer). Kept free of any DB import so they're trivially testable.

/** YYYY-MM-DD in UTC. */
export function utcDateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** Whole UTC days since 1970-01-01 for a YYYY-MM-DD key. */
export function daysSinceEpoch(dateKey: string): number {
  const [y, m, d] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

/**
 * Index into a rotation of `size` items for a given day. Consecutive days
 * always yield different indices (for size > 1) and the cycle covers every
 * item before repeating.
 */
export function rotationIndex(dateKey: string, size: number): number {
  if (size <= 0) return 0;
  return daysSinceEpoch(dateKey) % size;
}
