"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

type PreviewStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function getPreviewStep(code: string): PreviewStep {
  if (code.includes("card__cta") || code.includes("@click=\"handleBook\"")) return 6;
  if (code.includes("Mapa GPX") || code.includes("GPX map")) return 5;
  if (code.includes("'Raíz Viajera'")) return 4;
  if (code.includes('class="badge"')) return 3;
  if (code.includes(".card {")) return 2;
  if (code.includes("<article")) return 1;
  return 0;
}

function highlightCode(code: string) {
  const result: { text: string; className: string }[] = [];
  let i = 0;

  const keywords =
    /^(script|setup|lang|import|from|interface|const|let|async|function|return|computed|ref|defineProps|defineEmits|withDefaults|template|style|scoped|article|header|footer|span|h3|p|ul|li|button|type|disabled|true|false|null|void|string|boolean|number)\b/;

  while (i < code.length) {
    const rest = code.slice(i);

    let match: RegExpMatchArray | null = null;
    let className = "text-zinc-300";

    if ((match = rest.match(/^\/\/[^\n]*/))) className = "text-zinc-600";
    else if ((match = rest.match(/^<!--[\s\S]*?-->/))) className = "text-zinc-600";
    else if ((match = rest.match(/^"[^"]*"/))) className = "text-amber-300/90";
    else if ((match = rest.match(/^'[^']*'/))) className = "text-amber-300/90";
    else if ((match = rest.match(/^`[^`]*`/))) className = "text-amber-300/90";
    else if ((match = rest.match(/^#[0-9a-fA-F]{3,8}/))) className = "text-violet-400";
    else if ((match = rest.match(/^rgba?\([^)]+\)/))) className = "text-violet-400";
    else if ((match = rest.match(/^[0-9.]+(?:rem|px|s|ms|%)/))) className = "text-violet-400";
    else if ((match = rest.match(keywords))) className = "text-sky-400";
    else if ((match = rest.match(/^@\w+/))) className = "text-rose-400";
    else if ((match = rest.match(/^:\w+/))) className = "text-amber-200/80";
    else if ((match = rest.match(/^<\/?[\w.-]+/))) className = "text-emerald-400";
    else if ((match = rest.match(/^[>/{}();:,=+\-*/|&?!.[\]]/))) className = "text-zinc-500";
    else match = rest.match(/^./);

    if (!match) break;

    result.push({ text: match[0], className });
    i += match[0].length;
  }

  return result;
}

function CardPreview({
  step,
  badge,
  title,
  subtitle,
  cta,
  waiting,
}: {
  step: PreviewStep;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  waiting: string;
}) {
  const cardReady = step >= 2;

  return (
    <div className="flex h-full min-h-[360px] items-center justify-center bg-[#0a0a0a] p-4 sm:min-h-[420px]">
      {step === 0 ? (
        <p className="font-mono text-[11px] text-zinc-600">{waiting}</p>
      ) : (
        <article
          className="w-full max-w-[240px] transition-all duration-500 ease-out"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(8px)",
            background: cardReady
              ? "linear-gradient(145deg, #18181b 0%, #0c0c0e 100%)"
              : "transparent",
            border: cardReady
              ? "1px solid rgba(52, 211, 153, 0.35)"
              : "1px dashed rgba(113, 113, 122, 0.4)",
            borderRadius: cardReady ? "1rem" : "0.5rem",
            padding: cardReady ? "1.25rem" : "1rem",
            boxShadow: cardReady
              ? "0 8px 32px rgba(52, 211, 153, 0.08)"
              : "none",
          }}
        >
          {step >= 3 && (
            <span className="mb-3 inline-block font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              {badge}
            </span>
          )}
          {step >= 4 && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {step >= 5 && (
            <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
          )}
          {step >= 6 && (
            <button
              type="button"
              tabIndex={-1}
              className="mt-4 w-full rounded-lg bg-emerald-400 py-2 text-xs font-semibold text-black transition-colors hover:bg-emerald-300"
            >
              {cta}
            </button>
          )}
        </article>
      )}
    </div>
  );
}

export default function LiveCodePlayground() {
  const { t, locale } = useLanguage();
  const p = t.about.playground;
  const fullCode = p.code;

  const [typedCode, setTypedCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const pausedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const previewStep = useMemo(() => getPreviewStep(typedCode), [typedCode]);
  const tokens = useMemo(() => highlightCode(typedCode), [typedCode]);
  const totalLines = fullCode.split("\n").length;
  const progress = fullCode.length
    ? Math.round((typedCode.length / fullCode.length) * 100)
    : 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pre = preRef.current;
    if (pre) {
      pre.scrollTop = pre.scrollHeight;
    }
  }, [typedCode]);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    clearTimers();
    setTypedCode("");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTypedCode(fullCode);
      return clearTimers;
    }

    if (!isVisible) return clearTimers;

    let charIndex = 0;

    const tick = () => {
      if (pausedRef.current) {
        schedule(tick, 150);
        return;
      }

      if (charIndex >= fullCode.length) {
        schedule(() => {
          charIndex = 0;
          setTypedCode("");
          schedule(tick, 500);
        }, 4000);
        return;
      }

      const chunk = fullCode[charIndex] === "\n" ? 1 : 2;
      charIndex = Math.min(charIndex + chunk, fullCode.length);
      setTypedCode(fullCode.slice(0, charIndex));

      const char = fullCode[charIndex - 1];
      const delay =
        char === "\n" ? 90 : char === " " ? 18 : 10 + Math.floor(Math.random() * 8);

      schedule(tick, delay);
    };

    schedule(tick, 500);

    return clearTimers;
  }, [fullCode, isVisible, locale]);

  return (
    <div
      ref={containerRef}
      className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      aria-label={p.ariaLabel}
      role="img"
    >
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-[11px] text-zinc-500">{p.filename}</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden font-mono text-[10px] text-zinc-600 sm:inline">
            {progress}%
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {p.livePreview}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2">
        <div className="relative border-b border-zinc-800 sm:border-b-0 sm:border-r">
          <div
            className="absolute left-0 top-0 z-10 flex min-h-full select-none flex-col border-r border-zinc-800/60 bg-zinc-900/40 px-2 py-3 text-right font-mono text-[10px] leading-[1.55] text-zinc-700"
            aria-hidden="true"
          >
            {Array.from({ length: totalLines }).map((_, i) => {
              const typedLines = typedCode.split("\n").length;
              const isActive = i < typedLines;
              return (
                <span
                  key={i}
                  className={isActive ? "text-zinc-500" : "text-zinc-800"}
                >
                  {i + 1}
                </span>
              );
            })}
          </div>
          <pre
            ref={preRef}
            className="max-h-[360px] min-h-[360px] overflow-auto p-3 pl-9 font-mono text-[10px] leading-[1.55] sm:max-h-[420px] sm:min-h-[420px] sm:text-[11px]"
          >
            <code>
              {tokens.map((tok, i) => (
                <span key={i} className={tok.className}>
                  {tok.text}
                </span>
              ))}
              <span className="typewriter-cursor ml-px inline-block h-[1em] w-[2px] align-text-bottom" />
            </code>
          </pre>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-2 z-10 font-mono text-[9px] uppercase tracking-widest text-zinc-600">
            {p.previewLabel}
          </div>
          <CardPreview
            step={previewStep}
            badge={p.preview.badge}
            title={p.preview.title}
            subtitle={p.preview.subtitle}
            cta={p.preview.cta}
            waiting={p.preview.waiting}
          />
        </div>
      </div>
    </div>
  );
}
