import fs from "node:fs";
import path from "node:path";

let loaded = false;

/**
 * Minimal .env loader for CLI scripts (seed / pipeline) run via tsx, which do
 * not auto-load .env the way `next` does. Never overrides variables that are
 * already set, so it's safe to call from anywhere and in any environment.
 */
export function loadEnv(file = ".env"): void {
  if (loaded) return;
  loaded = true;
  // Inside the Next.js runtime the framework has already loaded .env; skip the
  // filesystem read (it also keeps Turbopack's output tracing precise).
  if (process.env.NEXT_RUNTIME) return;
  try {
    const p = path.resolve(process.cwd(), file);
    if (!fs.existsSync(p)) return;
    const text = fs.readFileSync(p, "utf8");
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      val = val.replace(/^["']|["']$/g, "");
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch {
    // best-effort
  }
}
