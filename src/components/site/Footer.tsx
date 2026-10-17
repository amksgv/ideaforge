import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/60">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm leading-6 text-ink-muted">
            A signal-driven startup-idea engine. Mines communities, search
            trends, and keyword demand, then synthesizes validated ideas with
            full market reports.
          </p>
          <p className="mt-4 text-xs text-ink-muted">
            Demo/educational clone of the ideabrowser.com concept. All ideas and
            data are generated.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Explore
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/idea-of-the-day" className="hover:text-brand-600">Idea of the Day</Link></li>
            <li><Link href="/database" className="hover:text-brand-600">Idea Database</Link></li>
            <li><Link href="/generator" className="hover:text-brand-600">Idea Generator</Link></li>
            <li><Link href="/idea-agent" className="hover:text-brand-600">Idea Agent</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li><Link href="/about" className="hover:text-brand-600">How it works</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-600">Pricing</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <span>© {new Date().getFullYear()} IdeaForge</span>
          <span>Built with Next.js · Prisma · a signal → synthesis pipeline</span>
        </div>
      </div>
    </footer>
  );
}
