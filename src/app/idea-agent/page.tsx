import type { Metadata } from "next";
import { getAllReports } from "@/lib/repo";
import { getAllProductReports } from "@/lib/productRepo";
import { AgentChat, type ChatTarget } from "@/components/agent/AgentChat";

export const metadata: Metadata = {
  title: "Idea Agent",
  description: "Chat with any idea or digital-product brief to interrogate its full research instantly.",
};

const CAPABILITIES = [
  "Pulls from the full report — scores, market, frameworks, execution.",
  "For product briefs: the gap, real Gumroad competition and prices, format, accelerators, launch plan.",
  "Pressure-test pricing, positioning, and go-to-market.",
  "Works offline with a built-in responder; add an LLM key for free-form answers.",
];

export default async function IdeaAgentPage({ searchParams }: { searchParams: Promise<{ slug?: string; product?: string }> }) {
  const sp = await searchParams;
  const [reports, products] = await Promise.all([getAllReports(), getAllProductReports()]);
  const targets: ChatTarget[] = [
    ...reports.map((r) => ({ slug: r.slug, title: r.title, emoji: r.emoji, kind: "idea" as const })),
    ...products.map((p) => ({ slug: p.slug, title: p.title, emoji: p.emoji, kind: "product" as const })),
  ];
  const initial = sp.product ? { slug: sp.product, kind: "product" as const } : sp.slug ? { slug: sp.slug, kind: "idea" as const } : undefined;

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div>
          <span className="label-eyebrow">Idea Agent</span>
          <h1 className="mt-1 font-display text-4xl font-bold text-ink">Chat with any idea or product brief</h1>
          <p className="mt-3 text-ink-soft">Our research pipeline mines communities, autocomplete, marketplaces and search signals to build each report. The agent lets you interrogate that research in plain language — grounded in one brief&apos;s data.</p>
          <ul className="mt-6 space-y-3">{CAPABILITIES.map((c) => <li key={c} className="flex gap-2 text-sm leading-6 text-ink-soft"><span className="mt-0.5 text-brand-500">◆</span>{c}</li>)}</ul>
        </div>
        {targets.length > 0 ? <AgentChat targets={targets} initial={initial} /> : <div className="card p-8 text-center text-ink-muted">Seed the database first (<code className="rounded-sm bg-slate-100 px-1.5 py-0.5">npm run setup</code>).</div>}
      </div>
    </div>
  );
}
