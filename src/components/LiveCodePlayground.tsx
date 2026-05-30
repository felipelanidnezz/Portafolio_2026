"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PLAYGROUND_CODE_EN, PLAYGROUND_CODE_ES } from "@/data/playgroundCode";

type PreviewStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function getPreviewStep(code: string): PreviewStep {
  if (code.includes("card__cta") || code.includes('@click="handleBook"')) return 6;
  if (code.includes("Mapa GPX") || code.includes("GPX map")) return 5;
  if (code.includes("'Raíz Viajera'")) return 4;
  if (code.includes('class="badge"')) return 3;
  if (code.includes(".card {")) return 2;
  if (code.includes("<article")) return 1;
  return 0;
}

/** Colorea una línea de forma segura (sin tokenizer global) */
function highlightLine(line: string) {
  const parts: { text: string; className: string }[] = [];
  let remaining = line.length > 0 ? line : "\u00A0";

  while (remaining.length > 0) {
    const tag = remaining.match(/^<\/?[\w.-]+/);
    const str = remaining.match(/^"[^"]*"|^'[^']*'/);
    const kw = remaining.match(
      /^(import|from|interface|const|let|async|function|return|computed|ref|defineProps|defineEmits|withDefaults|true|false)\b/
    );

    const m = tag ?? str ?? kw;
    if (m && m.index === 0) {
      const cls = tag
        ? "text-emerald-400"
        : str
          ? "text-amber-300/90"
          : "text-sky-400";
      parts.push({ text: m[0], className: cls });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    const next = remaining.search(
      /<\/?[\w.-]+|"[^"]*"|'[^']*'|\b(import|from|interface|const|let|async|function|return|computed|ref|defineProps|defineEmits|withDefaults|true|false)\b/
    );

    if (next === -1) {
      parts.push({ text: remaining, className: "text-zinc-300" });
      break;
    }

    if (next > 0) {
      parts.push({ text: remaining.slice(0, next), className: "text-zinc-300" });
    }
    remaining = remaining.slice(next);
  }

  return parts;
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
  const fullCode = locale === "en" ? PLAYGROUND_CODE_EN : PLAYGROUND_CODE_ES;

  const [typedCode, setTypedCode] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ charIndex: 0, lastTime: 0, waiting: false });

  const previewStep = useMemo(() => getPreviewStep(typedCode), [typedCode]);
  const lines = useMemo(() => fullCode.split("\n"), [fullCode]);
  const typedLines = useMemo(() => {
    if (!typedCode) return [];
    return typedCode.split("\n");
  }, [typedCode]);

  const progress = fullCode.length
    ? Math.round((typedCode.length / fullCode.length) * 100)
    : 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [typedCode]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTypedCode(fullCode);
      return;
    }

    if (!isVisible) return;

    stateRef.current = { charIndex: 0, lastTime: 0, waiting: false };
    setTypedCode("");

    const tick = (time: number) => {
      const s = stateRef.current;

      if (s.waiting) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!s.lastTime) s.lastTime = time;
      const elapsed = time - s.lastTime;

      if (s.charIndex >= fullCode.length) {
        s.waiting = true;
        setTimeout(() => {
          s.charIndex = 0;
          s.waiting = false;
          s.lastTime = 0;
          setTypedCode("");
        }, 4000);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const char = fullCode[s.charIndex];
      const delay = char === "\n" ? 55 : char === " " ? 14 : 8;

      if (elapsed >= delay) {
        const chunk = char === "\n" ? 1 : 2;
        s.charIndex = Math.min(s.charIndex + chunk, fullCode.length);
        setTypedCode(fullCode.slice(0, s.charIndex));
        s.lastTime = time;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [fullCode, isVisible, locale]);

  return (
    <div
      ref={containerRef}
      className="mt-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40"
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
            className="pointer-events-none absolute left-0 top-0 z-10 w-8 border-r border-zinc-800/60 bg-zinc-900/40 py-3 text-right font-mono text-[10px] leading-[1.55] text-zinc-700"
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div
                key={i}
                className={i < typedLines.length ? "text-zinc-500" : "text-zinc-800"}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <pre
            ref={preRef}
            className="max-h-[360px] min-h-[360px] overflow-y-auto overflow-x-hidden p-3 pl-10 font-mono text-[10px] leading-[1.55] sm:max-h-[420px] sm:min-h-[420px] sm:text-[11px]"
          >
            <code className="block">
              {typedLines.map((line, lineIdx) => (
                <div key={lineIdx} className="min-h-[1.55em] whitespace-pre">
                  {highlightLine(line).map((part, i) => (
                    <span key={i} className={part.className}>
                      {part.text}
                    </span>
                  ))}
                  {lineIdx === typedLines.length - 1 && (
                    <span className="typewriter-cursor ml-px inline-block h-[1em] w-[2px] align-text-bottom" />
                  )}
                </div>
              ))}
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
