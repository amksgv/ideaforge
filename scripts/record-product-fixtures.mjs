// Record real Gumroad + Google + Amazon autocomplete fixtures for each seed query.
// Re-runnable: records real Gumroad + Google + Amazon autocomplete responses per seed.
// Usage: node scripts/record-product-fixtures.mjs   (writes src/data/products/_recorded_fixtures.json)
const SEEDS = {
  "notion-second-brain-system":       "notion second brain",
  "ai-prompt-stack-realtors":         "chatgpt prompts for real estate agents",
  "cpf-optimisation-planner-sg":      "cpf planner",
  "perimenopause-sleep-protocol":     "perimenopause sleep",
  "freelancer-tax-tracker-sg":        "freelancer tax spreadsheet",
  "ninja-creami-protein-recipes":     "ninja creami recipes",
  "job-interview-prep-checklist":     "job interview checklist",
  "toddler-routine-charts":           "toddler routine chart",
  "etsy-seo-listing-templates":       "etsy listing template",
  "nclex-study-planner":              "nclex study plan",
};
const UA = "IdeaForge/0.2 (research tool)";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function j(url, headers={}) {
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json", ...headers } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return JSON.parse((await r.text()).replace(/^\)\]\}'\s*/, ""));
}
const out = {};
for (const [slug, q] of Object.entries(SEEDS)) {
  const rec = { seed: q };
  try { const g = await j(`https://gumroad.com/products/search?query=${encodeURIComponent(q)}`, { "X-Requested-With": "XMLHttpRequest" });
    rec.gumroad = { total: g.total, tags_data: (g.tags_data||[]).slice(0,10), products: (g.products||[]).slice(0,9).map(p=>({name:p.name,price_cents:p.price_cents,currency_code:p.currency_code,ratings:p.ratings,seller:{name:p.seller?.name},url:p.url})) };
  } catch(e){ rec.gumroadError = String(e.message); }
  await sleep(400);
  try { const seeds = [q, `${q} for`, `best ${q}`, `how to ${q}`]; const all = [];
    for (const s of seeds) { const r = await j(`https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(s)}`); all.push(...(r[1]||[])); await sleep(250); }
    rec.google = [...new Set(all)];
  } catch(e){ rec.googleError = String(e.message); }
  try { const a = await j(`https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${encodeURIComponent(q)}`);
    rec.amazon = (a.suggestions||[]).map(s=>s.value);
  } catch(e){ rec.amazonError = String(e.message); }
  out[slug] = rec;
  const errs = ['gumroadError','googleError','amazonError'].filter(k=>rec[k]);
  console.log(`${slug.padEnd(34)} gumroad=${rec.gumroad?.total ?? 'ERR'} google=${rec.google?.length ?? 'ERR'} amazon=${rec.amazon?.length ?? 'ERR'}${errs.length? '  !! '+errs.map(k=>rec[k]).join(' | '):''}`);
  await sleep(500);
}
import { writeFileSync } from "node:fs";
writeFileSync("src/data/products/_recorded_fixtures.json", JSON.stringify(out, null, 1));
console.log("\nwrote src/data/products/_recorded_fixtures.json");
