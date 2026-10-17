import type { Metadata } from "next";
import { getIdeaOfTheDay } from "@/lib/repo";
import { IdeaReportView } from "@/components/idea/IdeaReportView";
import { ReportCTA } from "@/components/idea/ReportCTA";

// ISR: regenerated hourly; the daily cron revalidates this path right after
// the UTC-midnight rotation so the new idea appears within minutes.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Today's Free Startup Idea",
  description: "A trending, in-demand startup idea with a full market report — free, every day.",
};

export default async function IdeaOfTheDayPage() {
  const idea = await getIdeaOfTheDay();
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!idea) {
    return (
      <div className="container-page py-24 text-center">
        <div className="text-4xl">🌱</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">No idea is live yet</h1>
        <p className="mt-2 text-ink-muted">
          Seed the database with <code className="rounded-sm bg-slate-100 px-1.5 py-0.5">npm run setup</code>, then refresh.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-slate-200 bg-brand-50/50">
        <div className="container-page flex items-center justify-between py-3 text-sm">
          <span className="font-semibold text-brand-700">★ Idea of the Day · {date}</span>
          <span className="text-ink-muted">Free access for 24 hours</span>
        </div>
      </div>
      <IdeaReportView report={idea} />
      <ReportCTA slug={idea.slug} />
    </>
  );
}
