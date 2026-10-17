import { PrismaClient } from "@prisma/client";
import { loadEnv } from "@/lib/loadEnv";

// Ensure DATABASE_URL is present before the client is constructed (matters for
// CLI scripts run via tsx). No-op when the host already populated env.
loadEnv();

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
