import type { Metadata } from "next";
import { getFacets, queryIdeas } from "@/lib/repo";
import { DatabaseExplorer } from "@/components/database/DatabaseExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Idea Database",
  description: "Browse validated startup opportunities with research, scores, and execution plans.",
};

export default async function DatabasePage() {
  const [ideas, facets] = await Promise.all([
    queryIdeas({ sort: "overall" }),
    getFacets(),
  ]);

  return (
    <div className="container-page py-12">
      <header className="mb-8">
        <span className="label-eyebrow">The Idea Database</span>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink">
          {facets.total} validated opportunities
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Every idea is backed by harvested signals, scored across four dimensions, and paired with a
          full market report. Filter by category, model, score, and founder fit.
        </p>
      </header>
      <DatabaseExplorer ideas={ideas} facets={facets} />
    </div>
  );
}
