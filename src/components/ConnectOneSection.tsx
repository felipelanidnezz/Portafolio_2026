"use client";

import { useState } from "react";
import ConnectOneShowcase from "@/components/ConnectOneShowcase";
import { useLanguage } from "@/i18n/LanguageProvider";

const STACK = ["Vue 3", "Quasar", "Pinia", "Vite", "Axios", "Scrum"];

export default function ConnectOneSection() {
  const { t } = useLanguage();
  const c = t.connect;
  const screenshotIds = new Set(c.screenshots.map((s) => s.id));
  const [activeScreenshot, setActiveScreenshot] = useState(
    c.screenshots[0]?.id ?? "",
  );

  return (
    <section
      id="connect-one"
      className="relative scroll-mt-24 px-6 pb-8 pt-28 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <article className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.12] via-zinc-900/80 to-[#050505] p-8 md:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  {c.badge}
                </span>
                <span className="font-mono text-xs text-zinc-500">{c.type}</span>
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                Connect One
              </h2>
              <p className="mt-2 font-mono text-sm text-emerald-400/90">
                {c.subtitle}
              </p>

              <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
                {c.p1}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                {c.p2}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ConnectOneShowcase
              activeId={activeScreenshot}
              onSelect={setActiveScreenshot}
            />
          </div>

          <div className="relative mt-12 border-t border-zinc-800/80 pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {c.modulesTitle}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.modules.map((mod) => {
                const hasScreenshot = screenshotIds.has(mod.id);
                const isActive = hasScreenshot && activeScreenshot === mod.id;

                return (
                  <li key={mod.id}>
                    <button
                      type="button"
                      disabled={!hasScreenshot}
                      onClick={() =>
                        hasScreenshot && setActiveScreenshot(mod.id)
                      }
                      className={`group h-full w-full rounded-2xl border p-4 text-left transition-colors ${
                        isActive
                          ? "border-emerald-400/50 bg-emerald-400/5"
                          : hasScreenshot
                            ? "border-zinc-700/60 bg-zinc-900/50 hover:border-emerald-400/40 hover:bg-zinc-900/80"
                            : "cursor-default border-zinc-800/60 bg-zinc-900/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-zinc-100">
                          {mod.label}
                        </h3>
                        {hasScreenshot ? (
                          <span
                            className={`font-mono text-[10px] transition-opacity ${
                              isActive
                                ? "text-emerald-400"
                                : "text-zinc-600 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                            }`}
                          >
                            {c.viewLink.replace("↗", "→")}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-zinc-600">
                            —
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                        {mod.desc}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {c.contributionsTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.contributions.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
