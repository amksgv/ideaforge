/**
 * Seed integrity check used by CI (and handy locally):
 *
 *   npx tsx scripts/assert-seed.ts
 *
 * Fails (exit 1) unless the database holds a healthy catalog.
 */
import { prisma } from "@/lib/db";

async function main() {
  const ideas = await prisma.idea.count();
  const gregsPicks = await prisma.idea.count({ where: { gregsPick: true } });
  const scheduledDays = await prisma.dailyFeature.count();
  const withSummary = await prisma.idea.count({ where: { NOT: { summary: "{}" } } });

  console.log({ ideas, gregsPicks, scheduledDays, withSummary });

  const problems: string[] = [];
  if (ideas < 12) problems.push(`expected >= 12 ideas, got ${ideas}`);
  if (gregsPicks < 1) problems.push("expected >= 1 Greg's Pick");
  if (scheduledDays < 10) problems.push(`expected >= 10 scheduled days, got ${scheduledDays}`);
  if (withSummary !== ideas) problems.push(`${ideas - withSummary} ideas missing a summary projection`);

  if (problems.length) {
    for (const p of problems) console.error("✗", p);
    process.exit(1);
  }
  console.log("✓ seed looks healthy");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
