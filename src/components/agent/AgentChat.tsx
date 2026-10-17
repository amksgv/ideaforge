"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/format";

export interface ChatTarget { slug: string; title: string; emoji: string; kind: "idea" | "product" }
interface Msg { role: "user" | "agent"; content: string; mode?: string }

const SUGGESTED: Record<ChatTarget["kind"], string[]> = {
  idea: ["How would I make money with this?", "Why now?", "Who is the main competitor?", "How do I build the MVP?", "Who exactly is the customer?"],
  product: ["What's the gap?", "How crowded is Gumroad?", "What should I charge?", "Which format and why?", "How do I launch it this week?", "How do I validate it by hand?"],
};

export function AgentChat({ targets, initial }: { targets: ChatTarget[]; initial?: { slug: string; kind: ChatTarget["kind"] } }) {
  const first = targets.find((t) => initial && t.slug === initial.slug && t.kind === initial.kind) ?? targets[0];
  const [key, setKey] = useState(first ? `${first.kind}:${first.slug}` : "");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [kind, slug] = key.split(":") as [ChatTarget["kind"], string];
  const ideas = targets.filter((t) => t.kind === "idea");
  const products = targets.filter((t) => t.kind === "product");

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading || !slug) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, kind, message: q }) });
      const data = await res.json();
      setMessages((m) => [...m, { role: "agent", content: data.answer ?? data.error ?? "Something went wrong.", mode: data.mode }]);
    } catch {
      setMessages((m) => [...m, { role: "agent", content: "Network error — try again." }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }));
    }
  }

  return (
    <div className="card flex h-[560px] flex-col overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <span className="text-sm font-semibold text-ink">Chat with</span>
        <select value={key} onChange={(e) => { setKey(e.target.value); setMessages([]); }} className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-hidden focus:border-brand-400" aria-label="Choose an idea or product brief">
          {ideas.length ? <optgroup label="Startup ideas">{ideas.map((t) => <option key={`idea:${t.slug}`} value={`idea:${t.slug}`}>{t.emoji} {t.title}</option>)}</optgroup> : null}
          {products.length ? <optgroup label="Digital Product Lab">{products.map((t) => <option key={`product:${t.slug}`} value={`product:${t.slug}`}>{t.emoji} {t.title}</option>)}</optgroup> : null}
        </select>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.length === 0 ? (
          <div className="grid h-full place-items-center text-center">
            <div>
              <div className="text-3xl">{kind === "product" ? "🧪" : "🤖"}</div>
              <p className="mt-2 text-sm text-ink-muted">{kind === "product" ? "Ask about the gap, competition, pricing, format, or launch — answers come from this brief's data." : "Ask anything about this idea — it answers from the full research report."}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">{SUGGESTED[kind ?? "idea"].map((s) => <button key={s} onClick={() => send(s)} className="chip hover:border-brand-300 hover:text-brand-700">{s}</button>)}</div>
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6", m.role === "user" ? "bg-brand-600 text-white" : "bg-slate-100 text-ink")}>
                {m.content}
                {m.role === "agent" && m.mode === "offline" ? <span className="mt-1 block text-[10px] uppercase tracking-wide text-ink-muted">offline answer</span> : null}
              </div>
            </div>
          ))
        )}
        {loading ? <div className="flex justify-start"><div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-ink-muted">Thinking…</div></div> : null}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-slate-100 p-3">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={kind === "product" ? "Ask the Product Lab Agent…" : "Ask the Idea Agent…"} maxLength={2000} className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-hidden focus:border-brand-400 focus:ring-2 focus:ring-brand-100" />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary">Send</button>
      </form>
    </div>
  );
}
