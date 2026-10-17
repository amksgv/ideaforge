import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/pipeline/**", "src/lib/**"],
      exclude: ["src/lib/db.ts", "src/lib/repo.ts", "src/pipeline/run.ts", "src/pipeline/persist.ts"],
    },
  },
});
