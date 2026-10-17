import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProductSlugs, getProductBySlug } from "@/lib/productRepo";
import { ProductReportView } from "@/components/product/ProductReportView";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try { return (await getAllProductSlugs()).map((slug) => ({ slug })); } catch { return []; }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  return { title: p.title, description: p.tagline };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();
  return (
    <>
      <ProductReportView report={p} />
      <section className="container-page pb-16">
        <div className="card flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div><h3 className="font-display text-xl font-bold text-ink">Pressure-test this brief</h3><p className="mt-1 text-ink-soft">Ask the Idea Agent about the gap, pricing, or the first week of launch.</p></div>
          <div className="flex shrink-0 gap-3"><Link href={`/idea-agent?product=${p.slug}`} className="btn-primary">Chat with this brief</Link><Link href="/products" className="btn-ghost">More products</Link></div>
        </div>
      </section>
    </>
  );
}
