import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/types";
import { GeneratorClient } from "@/components/generator/GeneratorClient";

export const metadata: Metadata = {
  title: "Idea Generator",
  description: "Match validated ideas to your skills, capital, and interests.",
};

export default function GeneratorPage() {
  return (
    <div className="container-page py-12">
      <header className="mb-8 max-w-2xl">
        <span className="label-eyebrow">Idea Generator</span>
        <h1 className="mt-1 font-display text-4xl font-bold text-ink">
          Which idea is right for <span className="text-brand-600">you</span>?
        </h1>
        <p className="mt-2 text-ink-soft">
          The best idea isn&apos;t the highest-scoring one — it&apos;s the one that fits your skills,
          capital, and interests. Set your profile and we&apos;ll rank the database by founder fit.
        </p>
      </header>
      <GeneratorClient categories={[...CATEGORIES]} />
    </div>
  );
}
