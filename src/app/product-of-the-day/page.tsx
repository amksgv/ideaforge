import type { Metadata } from "next";
import Link from "next/link";
import { getProductOfTheDay } from "@/lib/productRepo";
import { ProductReportView } from "@/components/product/ProductReportView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Product of the Day",
  description: "One sellable digital-product brief, free, every day.",
};

export default async function ProductOfTheDayPage() {
  const p = await getProductOfTheDay();
  const date = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  if (!p) {
    return <div className="container-page py-24 text-center"><div className="text-4xl">🧪</div><h1 className="mt-4 font-display text-2xl font-bold text-ink">No product is live yet</h1><p className="mt-2 text-ink-muted">Seed the database with <code className="rounded-sm bg-slate-100 px-1.5 py-0.5">npm run setup</code>, then refresh.</p></div>;
  }
  return (
    <>
      <div className="border-b border-slate-200 bg-brand-50/50"><div className="container-page flex items-center justify-between py-3 text-sm"><span className="font-semibold text-brand-700">★ Product of the Day · {date}</span><Link href="/products" className="text-ink-muted hover:text-brand-700">Browse the Lab →</Link></div></div>
      <ProductReportView report={p} />
    </>
  );
}
