import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";
import { loadEnv } from "@/lib/loadEnv";

// Ensure DATABASE_URL is present before the client is constructed (matters for
// CLI scripts run via tsx). No-op inside the Next runtime.
loadEnv();

// Prisma 7 runtime: Rust-free client + a driver adapter. For Postgres/Supabase
// swap this for `@prisma/adapter-pg` — nothing else in the app changes.
function createClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof createClient>;
};

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
