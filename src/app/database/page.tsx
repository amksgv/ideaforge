import type { Metadata } from "next";
import { getFacets, queryIdeas } from "@/lib/repo";
import type { IdeaQuery } from "@/lib/ideaQuery";
import { IdeasQuerySchema } from "@/lib/validation";
import { DatabaseExplorer } from "@/components/database/DatabaseExplorer";

export const metadata: Metadata = {
  title: "Idea Database",
  description: "Browse validated startup opportunities with research, scores, and execution plans.",
};

type SearchParams = Record<string, string | string[] | undefined>;

/** Lenient parse for a user-facing page: bad params fall back to defaults. */
function parseQuery(sp: SearchParams): IdeaQuery {
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) {
    const val = Array.isArray(v) ? v[0] : v;
    if (typeof val === "string") flat[k] = val;
  }
  const parsed = IdeasQuerySchema.safeParse(flat);
  return parsed.success ? parsed.data : {};
}

export default async function DatabasePage({
  searchParams,
}: {
  // Next 15+: searchParams is async. Reading it makes this route dynamic,
  // which is what a filterable, shareable-URL page should be.
  searchParams: Promise<SearchParams>;
}) {
  const query = parseQuery(await searchParams);
  const [page, facets] = await Promise.all([queryIdeas(query), getFacets()]);

  return (
    <div className="container-page py-12">
      <header className="mb-8">
        <span className="label-eyebrow">The Idea Database</span>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink">
          {facets.total} validated opportunities
        </h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Every idea is backed by harvested signals, scored across four dimensions, and paired with a
          full market report. Filter by category, model, score, and founder fit — every view has a
          shareable URL.
        </p>
      </header>
      <DatabaseExplorer query={query} page={page} facets={facets} />
    </div>
  );
}
