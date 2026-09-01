"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGallery from "@/components/ProjectGallery";
import { MagneticButton } from "@/components/MagneticCursor";
import { resolveProjectUrl, type Project } from "@/components/ProjectsGrid";
import { useLanguage } from "@/i18n/LanguageProvider";

type ProjectLabels = {
  feature: string;
  live: string;
  demo: string;
  visit: string;
  view: string;
  privateLabel: string;
  expandHint: string;
  expandLabel: string;
  closeLabel: string;
};

type Accent = NonNullable<Project["galleryAccent"]>;
type ConnectView = "intranet" | "clientes";

const ACCENT_TEXT: Record<Accent, string> = {
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  red: "text-red-400",
};

const ACCENT_PANEL: Record<Accent, string> = {
  emerald: "border-emerald-400/25 bg-emerald-400/5",
  amber: "border-amber-400/25 bg-amber-400/5",
  violet: "border-violet-400/25 bg-violet-400/5",
  cyan: "border-cyan-400/25 bg-cyan-400/5",
  red: "border-red-400/25 bg-red-400/5",
};

const ACCENT_BAR: Record<Accent, string> = {
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  red: "bg-red-400",
};

function StackPanel({
  project,
  labels,
  total,
}: {
  project: Project;
  labels: ProjectLabels;
  total: number;
}) {
  const { t } = useLanguage();
  const c = t.connect;
  const isConnectOne = !!project.connectOne;
  const [view, setView] = useState<ConnectView>("intranet");

  const product = view === "intranet" ? c.intranet : c.clientes;

  const accent: Accent = isConnectOne
    ? view === "intranet"
      ? "emerald"
      : "violet"
    : project.galleryAccent ?? "emerald";

  const screenshots = isConnectOne
    ? product.screenshots.slice(0, 4)
    : project.screenshots;

  const browserUrl = isConnectOne
    ? product.browserUrl
    : project.browserUrl ??
      project.displayUrl ??
      project.url?.replace("https://", "");

  const href = isConnectOne ? undefined : resolveProjectUrl(project.url);
  const isExternal =
    !!href && (href.startsWith("http://") || href.startsWith("https://"));
  const linkText = project.url?.startsWith("/")
    ? labels.demo
    : project.displayUrl || project.url?.replace("https://", "");

  return (
    <section
      data-panel
      id={isConnectOne ? "connect-one" : undefined}
      className="project-panel scroll-mt-0"
      aria-label={`${project.id} — ${project.title}`}
    >
      <div
        data-panel-inner
        className={`project-panel-inner border-t border-zinc-800/80 bg-[#050505]`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 md:py-16 md:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div className="order-2 lg:order-1">
              <div
                data-reveal
                className="flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
              >
                <span
                  className={`text-5xl leading-none ${ACCENT_TEXT[accent]} transition-colors duration-500`}
                >
                  {project.id}
                </span>
                <span>/ {String(total).padStart(2, "0")}</span>
                {project.live && (
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] tracking-wider text-emerald-400">
                    {labels.live}
                  </span>
                )}
                {isConnectOne && (
                  <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-[10px] tracking-wider text-amber-300">
                    {labels.privateLabel}
                  </span>
                )}
              </div>

              <h3
                data-reveal
                className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              >
                {project.title}
              </h3>

              {project.subtitle && (
                <p
                  data-reveal
                  className={`mt-3 font-mono text-xs uppercase tracking-[0.2em] ${ACCENT_TEXT[accent]} transition-colors duration-500`}
                >
                  {project.subtitle}
                </p>
              )}

              {project.highlight && (
                <p
                  data-reveal
                  className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-relaxed text-zinc-300 ${ACCENT_PANEL[accent]} transition-colors duration-500`}
                >
                  <span
                    className={`mb-1 block font-mono text-[10px] uppercase tracking-wider ${ACCENT_TEXT[accent]}`}
                  >
                    {labels.feature}
                  </span>
                  {project.highlight}
                </p>
              )}

              <p
                data-reveal
                className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base"
              >
                {project.desc}
              </p>

              {project.role && (
                <p
                  data-reveal
                  className="mt-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                >
                  {project.role}
                </p>
              )}

              <div data-reveal className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {isConnectOne && (
                <div data-reveal className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setView("intranet")}
                    aria-pressed={view === "intranet"}
                    className={`interactive-focus rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
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
                    className={`interactive-focus rounded-full border px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                      view === "clientes"
                        ? "border-violet-400/50 bg-violet-400/10 text-violet-300"
                        : "border-zinc-700/60 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                    }`}
                  >
                    {c.navClientes}
                  </button>
                </div>
              )}

              {href && linkText && (
                <div data-reveal className="mt-7">
                  <MagneticButton strength="strong" cursorText={labels.visit}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="interactive-focus inline-flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 font-mono text-xs uppercase tracking-wider text-zinc-200 transition-colors hover:border-emerald-400/60 hover:text-emerald-300"
                    >
                      {linkText}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </MagneticButton>
                </div>
              )}
            </div>

            <div data-media className="order-1 lg:order-2">
              {screenshots && screenshots.length > 0 && (
                <ProjectGallery
                  key={isConnectOne ? view : project.id}
                  screenshots={screenshots}
                  browserUrl={browserUrl}
                  siteUrl={href}
                  accent={accent}
                  previewBg={isConnectOne ? "#eef0f4" : project.galleryPreviewBg}
                  labels={{
                    expandHint: labels.expandHint,
                    expandLabel: labels.expandLabel,
                    closeLabel: labels.closeLabel,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div
          data-dim
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-[#050505] opacity-0"
        />
      </div>
    </section>
  );
}

export default function ProjectsStack({
  projects,
  labels,
}: {
  projects: Project[];
  labels: ProjectLabels;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const build = (depth: boolean) => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);

      panels.forEach((panel, i) => {
        const inner = panel.querySelector<HTMLElement>("[data-panel-inner]");
        const dim = panel.querySelector<HTMLElement>("[data-dim]");
        const reveals = panel.querySelectorAll<HTMLElement>("[data-reveal]");
        const media = panel.querySelector<HTMLElement>("[data-media]");

        if (reveals.length) {
          gsap.from(reveals, {
            y: 44,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: panel, start: "top 70%", once: true },
          });
        }

        if (media) {
          gsap.from(media, {
            opacity: 0,
            scale: 1.06,
            yPercent: 6,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 72%", once: true },
          });
        }

        ScrollTrigger.create({
          trigger: panel,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });

        const next = panels[i + 1];
        if (depth && next && inner) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
          tl.to(
            inner,
            {
              scale: 0.94,
              yPercent: -2.5,
              ease: "none",
              transformOrigin: "50% 25%",
            },
            0,
          );
          if (dim) tl.to(dim, { opacity: 0.72, ease: "none" }, 0);
        }
      });

      ScrollTrigger.create({
        trigger: root,
        start: "top 40%",
        end: "bottom 60%",
        onToggle: (self) => setRailVisible(self.isActive),
      });
    };

    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => build(true),
    );
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => build(false),
    );

    // Las capturas cargan tarde y desplazan el layout: recalcular posiciones
    // evita que un panel se quede sin revelar.
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh, { once: true });
    });
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      images.forEach((img) => img.removeEventListener("load", refresh));
      mm.revert();
    };
  }, [projects]);

  return (
    <div ref={rootRef} className="projects-stack relative mt-16">
      <nav
        aria-hidden="true"
        className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 lg:flex ${
          railVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {projects.map((p, i) => {
          const accent: Accent = p.galleryAccent ?? "emerald";
          return (
            <span key={p.id} className="flex items-center gap-2">
              <span
                className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                  i === active ? "text-zinc-200" : "text-zinc-700"
                }`}
              >
                {p.id}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === active ? `w-8 ${ACCENT_BAR[accent]}` : "w-3 bg-zinc-700"
                }`}
              />
            </span>
          );
        })}
      </nav>

      {projects.map((project) => (
        <StackPanel
          key={project.id}
          project={project}
          labels={labels}
          total={projects.length}
        />
      ))}
    </div>
  );
}
