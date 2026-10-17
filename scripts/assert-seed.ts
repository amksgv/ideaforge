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
  const withSearch = await prisma.idea.count({ where: { NOT: { searchText: "" } } });

  const products = await prisma.product.count();
  const productPicks = await prisma.product.count({ where: { gregsPick: true } });
  const productDays = await prisma.productFeature.count();

  console.log({ ideas, gregsPicks, scheduledDays, withSummary, withSearch, products, productPicks, productDays });

  const problems: string[] = [];
  if (products < 10) problems.push(`expected >= 10 products, got ${products}`);
  if (productPicks < 1) problems.push("expected >= 1 product pick");
  if (productDays < 10) problems.push(`expected >= 10 scheduled product days, got ${productDays}`);
  if (ideas < 12) problems.push(`expected >= 12 ideas, got ${ideas}`);
  if (gregsPicks < 1) problems.push("expected >= 1 Greg's Pick");
  if (scheduledDays < 10) problems.push(`expected >= 10 scheduled days, got ${scheduledDays}`);
  if (withSummary !== ideas) problems.push(`${ideas - withSummary} ideas missing a summary projection`);
  if (withSearch !== ideas) problems.push(`${ideas - withSearch} ideas missing searchText`);

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
