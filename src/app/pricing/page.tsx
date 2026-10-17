import Link from "next/link";
import type { Metadata } from "next";
import { cn } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pricing",
  description: "From a free idea a day to a full founder operating system.",
};

const TIERS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "A trending idea every day.",
    cta: "Start free",
    href: "/idea-of-the-day",
    features: [
      "Idea of the Day + full market report",
      "24-hour access window",
      "Delivered to your inbox daily",
    ],
  },
  {
    name: "Starter",
    price: "$39",
    cadence: "/mo",
    blurb: "The whole database, unlocked.",
    cta: "Browse the database",
    href: "/database",
    popular: true,
    features: [
      "1,000+ fully-researched ideas",
      "Trends & market insights",
      "20 AI-generated ideas / month",
      "Founder-fit matching & filters",
    ],
  },
  {
    name: "Pro",
    price: "$99",
    cadence: "/mo",
    blurb: "Research your own ideas.",
    cta: "Try the Idea Agent",
    href: "/idea-agent",
    features: [
      "Everything in Starter",
      "3 Research Agent reports / month",
      "100 Chat Strategist sessions / month",
      "Idea Builder + data exports",
    ],
  },
  {
    name: "Empire",
    price: "$249",
    cadence: "/mo",
    blurb: "The full founder stack.",
    cta: "Go Empire",
    href: "/pricing",
    features: [
      "Everything in Pro, higher limits",
      "500 AI ideas + 9 reports / month",
      "Weekly coaching & monthly AMAs",
      "Builder community + tool deals",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container-page py-16">
      <div className="text-center">
        <span className="label-eyebrow">Pricing</span>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink">Start free. Upgrade when you&apos;re hooked.</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          The Idea of the Day is free forever. Paid tiers unlock the full database, AI research, and the founder community.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-white p-6",
              t.popular ? "border-brand-500 shadow-pop" : "border-slate-200 shadow-card",
            )}
          >
            {t.popular ? (
              <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            ) : null}
            <h3 className="font-display text-lg font-bold text-ink">{t.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{t.blurb}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-ink">{t.price}</span>
              <span className="text-sm text-ink-muted">{t.cadence}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-6 text-ink-soft">
                  <span className="mt-0.5 text-brand-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.href}
              className={cn("mt-6 w-full", t.popular ? "btn-primary" : "btn-ghost")}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-xs text-ink-muted">
        Demo pricing for an educational clone — no checkout is wired up. The app itself runs entirely
        free and offline.
      </p>
    </div>
  );
}
