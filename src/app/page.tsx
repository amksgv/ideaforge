import Link from "next/link";
import { getFacets, getIdeaOfTheDay, queryIdeas } from "@/lib/repo";
import { IdeaCard } from "@/components/idea/IdeaCard";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { GregsPickBadge } from "@/components/ui/Badges";

export const dynamic = "force-dynamic";

const STEPS = [
  { icon: "📡", title: "Harvest signals", body: "Collectors pull demand from Reddit, communities, YouTube, Google Trends, and keyword volume." },
  { icon: "📊", title: "Score", body: "A transparent model derives Opportunity, Problem, Feasibility, and Why-Now scores from the data." },
  { icon: "🧠", title: "Synthesize", body: "An AI engine composes the full report — frameworks, value ladder, execution plan, market gap." },
  { icon: "✅", title: "Curate", body: "The strongest ideas get a human stamp — 'Greg's Pick' — and one is featured every day." },
];

const FRAMEWORKS = [
  { name: "The Value Equation", note: "Dream outcome × likelihood ÷ time × effort" },
  { name: "The Market Matrix", note: "Uniqueness vs. value — find the Category King" },
  { name: "The A.C.P. Framework", note: "Audience → Community → Product" },
  { name: "The Value Ladder", note: "Lead magnet → core offer → backend" },
];

export default async function HomePage() {
  const [featured, top, facets] = await Promise.all([
    getIdeaOfTheDay(),
    queryIdeas({ sort: "overall" }),
    getFacets(),
  ]);
  const preview = top.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-dotted">
        <div className="container-page py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="label-eyebrow">A new validated idea every day</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              Find startup ideas
              <br />
              <span className="text-brand-600">worth building</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-ink-soft">
              IdeaForge mines real demand signals across the internet and synthesizes them into
              validated business ideas — each with a full market report, scores, and an execution plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/idea-of-the-day" className="btn-primary">Unlock today&apos;s free idea</Link>
              <Link href="/database" className="btn-ghost">Browse the database</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-muted">
              <Stat n={`${facets.total}`} l="researched ideas" />
              <Stat n={`${facets.gregsPicks}`} l="Greg's Picks" />
              <Stat n={`${facets.avgOverall}/100`} l="avg. score" />
              <Stat n="6" l="signal sources" />
            </div>
          </div>
        </div>
      </section>

      {/* Idea of the day teaser */}
      {featured ? (
        <section className="container-page -mt-10 pb-4">
          <Link
            href="/idea-of-the-day"
            className="group card flex flex-col gap-6 p-6 transition hover:shadow-pop sm:flex-row sm:items-center sm:p-8"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-4xl">
              {featured.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="label-eyebrow">Idea of the Day · free for 24h</span>
                {featured.gregsPick ? <GregsPickBadge /> : null}
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold text-ink group-hover:text-brand-700">
                {featured.title}
              </h2>
              <p className="mt-1 max-w-2xl text-ink-soft">{featured.tagline}</p>
            </div>
            <div className="shrink-0">
              <ScoreGauge value={featured.scores.overall} size={104} />
            </div>
          </Link>
        </section>
      ) : (
        <section className="container-page py-10">
          <div className="card p-6 text-center text-ink-muted">
            No ideas yet — run <code className="rounded bg-slate-100 px-1.5 py-0.5">npm run setup</code> to seed the database.
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="container-page py-16">
        <div className="text-center">
          <span className="label-eyebrow">The pipeline</span>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink">Signal in. Conviction out.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
            Every idea is the output of the same four-stage pipeline — the same shape a real research team runs, automated.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="card p-5">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-display text-sm font-bold text-slate-300">0{i + 1}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Database preview */}
      {preview.length > 0 ? (
        <section className="border-y border-slate-200 bg-slate-50/50">
          <div className="container-page py-16">
            <div className="flex items-end justify-between">
              <div>
                <span className="label-eyebrow">The Idea Database</span>
                <h2 className="mt-1 font-display text-3xl font-bold text-ink">Top-scoring ideas right now</h2>
              </div>
              <Link href="/database" className="btn-ghost hidden sm:inline-flex">Browse all {facets.total} →</Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {preview.map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/database" className="btn-ghost">Browse all {facets.total} →</Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Frameworks */}
      <section className="container-page py-16">
        <div className="text-center">
          <span className="label-eyebrow">Proven frameworks</span>
          <h2 className="mt-1 font-display text-3xl font-bold text-ink">Every idea, pressure-tested</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FRAMEWORKS.map((f) => (
            <div key={f.name} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-display font-bold text-ink">{f.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{f.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="rounded-2xl bg-ink px-6 py-12 text-center sm:px-12">
          <h2 className="font-display text-3xl font-bold text-white">One well-timed idea changes everything.</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Get today&apos;s free idea, then explore the full database, generate founder-fit matches, and pressure-test with the Idea Agent.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/idea-of-the-day" className="btn bg-brand-500 text-white hover:bg-brand-400">Get today&apos;s idea</Link>
            <Link href="/generator" className="btn border border-white/20 text-white hover:bg-white/10">Match an idea to me</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <b className="font-display text-lg font-bold text-ink">{n}</b>
      {l}
    </span>
  );
}
