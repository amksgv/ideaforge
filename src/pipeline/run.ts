/**
 * Pipeline runner / "daily job".
 *
 *   npm run pipeline:run
 *
 * Honors DATA_MODE (offline | live). In live mode each collector hits its real
 * API where a key is present and falls back to fixtures otherwise. Upserts all
 * reports and schedules the Idea of the Day rotation.
 */
import { isLive } from "@/lib/env";
import { loadEnv } from "@/lib/loadEnv";
import { prisma } from "@/lib/db";
import { loadBriefs } from "@/data";
import { runAll } from "@/pipeline";
import { assignDailyFeatures, persistReports } from "@/pipeline/persist";

async function main() {
  loadEnv();
  const live = isLive();
  const briefs = loadBriefs();

  console.log(
    `\n🧠 IdeaForge pipeline — mode: ${live ? "LIVE" : "OFFLINE"} — ${briefs.length} briefs\n`,
  );

  const reports = await runAll(briefs, { live });
  await persistReports(reports);
  await assignDailyFeatures();

  const picks = reports.filter((r) => r.gregsPick).length;
  const sources = [...new Set(reports.flatMap((r) => r.sources))].join(", ");

  console.table(
    reports.map((r) => ({
      idea: r.title.slice(0, 42),
      category: r.category,
      overall: r.scores.overall,
      opp: r.scores.opportunity.value,
      why: r.scores.whyNow.value,
      pick: r.gregsPick ? "★" : "",
    })),
  );
  console.log(
    `\n✅ Synthesized ${reports.length} ideas (${picks} Greg's Picks). Collectors: ${sources}\n`,
  );

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Pipeline failed:", err);
  await prisma.$disconnect();
  process.exit(1);
});
