import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIdeaBySlug } from "@/lib/repo";
import { IdeaReportView } from "@/components/idea/IdeaReportView";
import { ReportCTA } from "@/components/idea/ReportCTA";

export const dynamic = "force-dynamic";

// Next 15: route params are async.
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
