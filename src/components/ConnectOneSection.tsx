"use client";

import { useEffect, useState } from "react";
import ConnectOneShowcase from "@/components/ConnectOneShowcase";
import { useLanguage } from "@/i18n/LanguageProvider";

const STACK_INTRANET = ["Vue 3", "Quasar", "Pinia", "Vite", "Axios", "Scrum"];
const STACK_CLIENTES = ["Vue 3", "Quasar", "Pinia", "ApexCharts", "Vite", "Scrum"];

type ConnectView = "intranet" | "clientes";

export default function ConnectOneSection() {
  const { t } = useLanguage();
  const c = t.connect;
  const [view, setView] = useState<ConnectView>("intranet");

  const product = view === "intranet" ? c.intranet : c.clientes;
  const accent = view === "intranet" ? "emerald" : "violet";
  const stack = view === "intranet" ? STACK_INTRANET : STACK_CLIENTES;

  const screenshotIds = new Set(product.screenshots.map((s) => s.id));
  const [activeScreenshot, setActiveScreenshot] = useState(
    product.screenshots[0]?.id ?? "",
  );

  useEffect(() => {
    setActiveScreenshot(product.screenshots[0]?.id ?? "");
  }, [view, product.screenshots]);

  const showcaseLabels = {
    expandHint: c.expandHint,
    expandLabel: c.expandLabel,
    closeLabel: c.closeLabel,
  };

  const showcaseData = {
    showcaseTitle: product.showcaseTitle,
    privateAccess: product.privateAccess,
    showcaseNote: product.showcaseNote,
    browserUrl: product.browserUrl,
    screenshots: product.screenshots,
  };

  const badgeClass =
    view === "intranet"
      ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
      : "border-violet-400/40 bg-violet-400/10 text-violet-300";

  const subtitleClass =
    view === "intranet" ? "text-emerald-400/90" : "text-violet-300/90";

  const articleClass =
    view === "intranet"
      ? "border-emerald-400/25 from-emerald-500/[0.12]"
      : "border-violet-400/25 from-violet-500/[0.12]";

  const glowClass =
    view === "intranet" ? "bg-emerald-400/10" : "bg-violet-400/10";

  const moduleActiveClass =
    view === "intranet"
      ? "border-emerald-400/50 bg-emerald-400/5"
      : "border-violet-400/50 bg-violet-400/5";

  const moduleHoverClass =
    view === "intranet"
      ? "hover:border-emerald-400/40"
      : "hover:border-violet-400/40";

  const moduleLinkActiveClass =
    view === "intranet" ? "text-emerald-400" : "text-violet-400";

  const chipClass =
    view === "intranet"
      ? "border-emerald-400/20 bg-emerald-400/5"
      : "border-violet-400/20 bg-violet-400/5";

  return (
    <section
      id="connect-one"
      className="relative scroll-mt-24 px-6 pb-8 pt-28 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <article
          className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br via-zinc-900/80 to-[#050505] p-8 md:p-12 ${articleClass}`}
        >
          <div
            className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${glowClass}`}
            aria-hidden="true"
          />

          <div className="relative mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setView("intranet")}
                aria-pressed={view === "intranet"}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  view === "intranet"
                    ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                    : "border-zinc-700/60 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }`}
              >
                {c.navIntranet}
              </button>
              <button
                type="button"
                onClick={() => setView("clientes")}
                aria-pressed={view === "clientes"}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  view === "clientes"
                    ? "border-violet-400/50 bg-violet-400/10 text-violet-300"
                    : "border-zinc-700/60 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }`}
              >
                {c.navClientes}
              </button>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setView("intranet")}
                disabled={view === "intranet"}
                aria-label={c.navPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ←
              </button>
              <span className="font-mono text-[10px] text-zinc-600">
                {view === "intranet" ? "1 / 2" : "2 / 2"}
              </span>
              <button
                type="button"
                onClick={() => setView("clientes")}
                disabled={view === "clientes"}
                aria-label={c.navNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>

          <div className="relative space-y-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${badgeClass}`}
                >
                  {product.badge}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {product.type}
                </span>
              </div>

              <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
                {product.title}
              </h2>
              <p className={`mt-2 font-mono text-sm ${subtitleClass}`}>
                {product.subtitle}
              </p>

              <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
                {product.p1}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                {product.p2}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {stack.map((item) => (
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
              data={showcaseData}
              activeId={activeScreenshot}
              onSelect={setActiveScreenshot}
              accent={accent}
              labels={showcaseLabels}
            />
          </div>

          <div className="relative mt-12 border-t border-zinc-800/80 pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {product.modulesTitle}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.modules.map((mod) => {
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
                          ? moduleActiveClass
                          : hasScreenshot
                            ? `border-zinc-700/60 bg-zinc-900/50 ${moduleHoverClass} hover:bg-zinc-900/80`
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
                                ? moduleLinkActiveClass
                                : "text-zinc-600 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                            }`}
                          >
                            {product.viewLink.replace("↗", "→")}
                          </span>
                        ) : null}
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
                {product.contributionsTitle}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.contributions.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full border px-3 py-1 text-xs text-zinc-300 ${chipClass}`}
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
