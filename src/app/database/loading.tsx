/** Streaming fallback while the database page's SQL queries run. */
export default function DatabaseLoading() {
  return (
    <div className="container-page py-12" aria-busy="true" aria-live="polite">
      <div className="mb-8 space-y-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
        <div className="h-9 w-80 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-slate-100" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-slate-100 bg-slate-50" />
          ))}
        </div>
      </div>
    </div>
  );
}
