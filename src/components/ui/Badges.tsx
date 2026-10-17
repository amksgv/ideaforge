import type { SignalSource } from "@/lib/types";
import { cn } from "@/lib/format";

export function GregsPickBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs",
        className,
      )}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
      </svg>
      Greg&apos;s Pick
    </span>
  );
}

const SOURCE_META: Record<SignalSource, { label: string; glyph: string; cls: string }> = {
  reddit: { label: "Reddit", glyph: "r/", cls: "bg-orange-50 text-orange-600 border-orange-200" },
  youtube: { label: "YouTube", glyph: "▶", cls: "bg-red-50 text-red-600 border-red-200" },
  google_trends: { label: "Trends", glyph: "📈", cls: "bg-blue-50 text-blue-600 border-blue-200" },
  keywords: { label: "Keywords", glyph: "🔑", cls: "bg-violet-50 text-violet-600 border-violet-200" },
  facebook: { label: "Facebook", glyph: "f", cls: "bg-sky-50 text-sky-700 border-sky-200" },
  x: { label: "X", glyph: "𝕏", cls: "bg-slate-100 text-slate-700 border-slate-200" },
};

export function SourceTag({ source }: { source: SignalSource }) {
  const m = SOURCE_META[source];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold", m.cls)}>
      <span aria-hidden>{m.glyph}</span>
      {m.label}
    </span>
  );
}

export function sourceLabel(source: SignalSource): string {
  return SOURCE_META[source].label;
}
