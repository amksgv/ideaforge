import type { Metadata } from "next";
import { getProductFacets, queryProducts } from "@/lib/productRepo";
import type { ProductQuery } from "@/lib/productQuery";
import { ProductsQuerySchema } from "@/lib/validation";
import { ProductExplorer } from "@/components/product/ProductExplorer";

export const metadata: Metadata = {
  title: "Digital Product Lab",
  description: "Trending, high-intent problems turned into sellable digital-product briefs — with real Gumroad competition, a Gap Closer, and an Accelerator Stack.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function parseQuery(sp: SearchParams): ProductQuery {
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) { const val = Array.isArray(v) ? v[0] : v; if (typeof val === "string") flat[k] = val; }
  const parsed = ProductsQuerySchema.safeParse(flat);
  return parsed.success ? (parsed.data as ProductQuery) : {};
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseQuery(await searchParams);
  const [page, facets] = await Promise.all([queryProducts(query), getProductFacets()]);
  return (
    <div className="container-page py-12">
      <header className="mb-8">
        <span className="label-eyebrow">Digital Product Lab</span>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink">{facets.total} product briefs worth building</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Each brief mines what people actually type (Google, Amazon, Etsy), checks real Gumroad competition and pricing, finds the one pain incumbents leave open, and hands you the format, outline, accelerators and ladder to ship it.
        </p>
      </header>
      <ProductExplorer query={query} page={page} facets={facets} />
    </div>
  );
}
