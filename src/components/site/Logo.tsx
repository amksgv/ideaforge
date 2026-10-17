import { cn } from "@/lib/format";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect width="32" height="32" rx="9" fill="#059669" />
        <path
          d="M16 6.5c-4.4 0-8 3.4-8 7.6 0 2.7 1.5 5 3.8 6.4.3.2.5.5.5.9v1.3c0 .6.5 1 1 1h5.4c.6 0 1-.4 1-1v-1.3c0-.4.2-.7.5-.9 2.3-1.4 3.8-3.7 3.8-6.4 0-4.2-3.6-7.6-8-7.6Z"
          fill="#fff"
        />
        <path d="M13 26.5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="14" r="2.4" fill="#059669" />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-ink">
        Idea<span className="text-brand-600">Forge</span>
      </span>
    </span>
  );
}
