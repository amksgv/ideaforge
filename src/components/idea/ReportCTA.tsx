import Link from "next/link";

export function ReportCTA({ slug }: { slug: string }) {
  return (
    <section className="container-page pb-16">
      <div className="card flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-xl font-bold text-ink">Want to pressure-test this idea?</h3>
          <p className="mt-1 text-ink-soft">Chat with the Idea Agent — it answers from this idea&apos;s full research report.</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Link href={`/idea-agent?slug=${slug}`} className="btn-primary">Chat with this idea</Link>
          <Link href="/database" className="btn-ghost">More ideas</Link>
        </div>
      </div>
    </section>
  );
}
