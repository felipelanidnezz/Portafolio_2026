"use client";

import { MagneticButton } from "@/components/MagneticCursor";
import { useLanguage } from "@/i18n/LanguageProvider";

const STACK = ["Vue 3", "Quasar", "Pinia", "Vite", "Axios", "Scrum"];

export default function ConnectOneSection() {
  const { t } = useLanguage();
  const c = t.connect;

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

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
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

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {c.modulesTitle}
              </p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.modules.map((mod) => {
                  const inner = (
                    <li className="group h-full rounded-2xl border border-zinc-700/60 bg-zinc-900/50 p-4 transition-colors hover:border-emerald-400/40 hover:bg-zinc-900/80">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-zinc-100">
                          {mod.label}
                        </h3>
                        {mod.url ? (
                          <span className="font-mono text-[10px] text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                            {c.viewLink}
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
                    </li>
                  );

                  return mod.url ? (
                    <MagneticButton key={mod.id} cursorText="→">
                      <a
                        href={mod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        {inner}
                      </a>
                    </MagneticButton>
                  ) : (
                    <div key={mod.id}>{inner}</div>
                  );
                })}
              </ul>

              <div className="mt-6">
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
          </div>
        </article>
      </div>
    </section>
  );
}
