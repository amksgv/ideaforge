import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: CLI configuration lives here (schema path, seed, datasource URL).
// The runtime client gets its connection via a driver adapter in src/lib/db.ts.
//
// Falls back to the local SQLite file so `npm install` (which runs
// `prisma generate`) works on a fresh clone before `.env` exists.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  },
});
