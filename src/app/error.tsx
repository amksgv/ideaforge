"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Root error boundary. Catches render/data errors (e.g. a corrupt report row,
 * an unreachable database) and shows a recoverable UI instead of a blank 500.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server-side details are already logged by Next; keep the client log terse.
    console.error("[ideaforge] render error", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="container-page grid place-items-center py-28 text-center">
      <div className="max-w-md">
        <div className="text-4xl">⚠️</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Something went wrong</h1>
        <p className="mt-2 text-ink-muted">
          We couldn&apos;t load this page. It&apos;s usually transient — try again, or head back to the
          database.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-ink-muted">ref {error.digest}</p>
        ) : null}
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">Try again</button>
          <Link href="/database" className="btn-ghost">Browse ideas</Link>
        </div>
      </div>
    </div>
  );
}
