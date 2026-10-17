import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid place-items-center py-28 text-center">
      <div>
        <div className="font-display text-6xl font-bold text-brand-600">404</div>
        <h1 className="mt-3 font-display text-2xl font-bold text-ink">We couldn&apos;t find that idea</h1>
        <p className="mt-2 text-ink-muted">It may have been claimed, renamed, or never existed.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/database" className="btn-primary">Browse the database</Link>
          <Link href="/" className="btn-ghost">Go home</Link>
        </div>
      </div>
    </div>
  );
}
