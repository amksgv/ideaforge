/**
 * Database seed. Always runs the pipeline in OFFLINE mode so a fresh clone is
 * populated deterministically with zero API keys.
 *
 *   npm run db:seed     (or  npm run setup  to push schema + seed)
 */
import { loadEnv } from "@/lib/loadEnv";
import { prisma } from "@/lib/db";
import { loadBriefs } from "@/data";
import { loadProductBriefs } from "@/data/products";
import { runAll } from "@/pipeline";
import { assignDailyFeatures, persistReports } from "@/pipeline/persist";
import { runAllProducts } from "@/pipeline/products";
import { assignProductFeatures, persistProducts } from "@/pipeline/products/persist";

async function main() {
  loadEnv();
  const briefs = loadBriefs();
  console.log(`🌱 Seeding ${briefs.length} ideas via offline synthesis...`);

  const reports = await runAll(briefs, { live: false });
  await persistReports(reports);
  await assignDailyFeatures();

  const picks = reports.filter((r) => r.gregsPick).length;
  console.log(
    `✅ Seeded ${reports.length} ideas (${picks} Greg's Picks) and scheduled the Idea of the Day.`,
  );

  const pBriefs = loadProductBriefs();
  console.log(`🧪 Seeding ${pBriefs.length} digital products via offline synthesis...`);
  const products = await runAllProducts(pBriefs, { live: false });
  await persistProducts(products);
  await assignProductFeatures();
  console.log(
    `✅ Seeded ${products.length} products (${products.filter((p) => p.gregsPick).length} picks) and scheduled the Product of the Day.`,
  );
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
