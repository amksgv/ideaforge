"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/format";

export interface SectionRef {
  id: string;
  label: string;
}

export function SectionNav({ sections }: { sections: SectionRef[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-0.5">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={cn(
            "block rounded-lg border-l-2 px-3 py-1.5 text-sm transition",
            active === s.id
              ? "border-brand-500 bg-brand-50 font-semibold text-brand-700"
              : "border-transparent text-ink-muted hover:bg-slate-50 hover:text-ink",
          )}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
