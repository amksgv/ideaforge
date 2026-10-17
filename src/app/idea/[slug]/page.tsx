import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getIdeaBySlug } from "@/lib/repo";
import { IdeaReportView } from "@/components/idea/IdeaReportView";
import { ReportCTA } from "@/components/idea/ReportCTA";

// ISR: idea reports change at most once a day (pipeline run). Pages are
// prerendered at build, served from cache, regenerated in the background
// hourly, and explicitly revalidated by /api/cron/daily after each run.
export const revalidate = 3600;
export const dynamicParams = true; // new slugs render on demand, then cache

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    // No database at build time (e.g. CI before seed) → render on demand.
    return [];
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) return { title: "Idea not found" };
  return { title: idea.title, description: idea.tagline };
}

export default async function IdeaPage({ params }: Props) {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea) notFound();

  return (
    <>
      <IdeaReportView report={idea} />
      <ReportCTA slug={idea.slug} />
    </>
  );
}
