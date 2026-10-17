import type { Metadata } from "next";
import { getAllReports } from "@/lib/repo";
import { AgentChat } from "@/components/agent/AgentChat";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Idea Agent",
  description: "Chat with any idea to interrogate its full research instantly.",
};

const CAPABILITIES = [
  "Pulls from the idea's full report — scores, market, frameworks, execution.",
  "Pressure-test pricing, positioning, and go-to-market.",
  "Works offline with a built-in responder; add an LLM key for free-form answers.",
];

export default async function IdeaAgentPage({
  searchParams,
}: {
  // Next 15: searchParams is async.
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  const reports = await getAllReports();
  const ideas = reports.map((r) => ({ slug: r.slug, title: r.title, emoji: r.emoji }));

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div>
          <span className="label-eyebrow">Idea Agent</span>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink">
            Chat with any idea
          </h1>
          <p className="mt-3 text-ink-soft">
            Our research agent runs a multi-step process across communities, keywords, and market
            signals to build each report. The Idea Agent lets you interrogate that research in plain
            language — like ChatGPT, but grounded in one idea&apos;s data.
          </p>
          <ul className="mt-6 space-y-3">
            {CAPABILITIES.map((c) => (
              <li key={c} className="flex gap-2 text-sm leading-6 text-ink-soft">
                <span className="mt-0.5 text-brand-500">◆</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        {ideas.length > 0 ? (
          <AgentChat ideas={ideas} initialSlug={slug} />
        ) : (
          <div className="card p-8 text-center text-ink-muted">
            Seed the database first (<code className="rounded-sm bg-slate-100 px-1.5 py-0.5">npm run setup</code>).
          </div>
        )}
      </div>
    </div>
  );
}
