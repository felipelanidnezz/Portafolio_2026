"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { MagneticButton } from "@/components/MagneticCursor";
import ProjectGallery from "@/components/ProjectGallery";
import ConnectOneProjectCard from "@/components/ConnectOneProjectCard";

const GH_PAGES_PREFIX = "/Portafolio_2026";

/** Resolve demo links for GitHub Pages vs local dev. */
export function resolveProjectUrl(url?: string): string | undefined {
  if (!url || !url.startsWith("/") || typeof window === "undefined") return url;

  const onGhPages = window.location.hostname.endsWith("github.io");

  if (onGhPages) {
    if (url.startsWith(GH_PAGES_PREFIX)) return url;
    return `${GH_PAGES_PREFIX}${url}`;
  }

  if (url.startsWith(GH_PAGES_PREFIX)) {
    return url.slice(GH_PAGES_PREFIX.length) || "/";
  }

  return url;
}

export type ProjectScreenshot = {
  id: string;
  label: string;
  image: string;
  width?: number;
  height?: number;
};

export type Project = {
  id: string;
  title: string;
  desc: string;
  tags: readonly string[];
  color: string;
  subtitle?: string;
  highlight?: string;
  role?: string;
  url?: string;
  displayUrl?: string;
  live?: boolean;
  connectOne?: boolean;
  featured?: boolean;
  featuredBottom?: boolean;
  screenshots?: readonly ProjectScreenshot[];
  browserUrl?: string;
  galleryAccent?: "emerald" | "amber" | "violet" | "cyan" | "red";
  galleryPreviewBg?: string;
};

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

function ProjectCard({
  project,
  labels,
}: {
  project: Project;
  labels: ProjectLabels;
}) {
  const linkText = project.url?.startsWith("/")
    ? labels.demo
    : project.displayUrl || project.url?.replace("https://", "");

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${project.color} p-6 shadow-lg shadow-black/20 transition-[border-color,box-shadow] duration-300 hover:border-emerald-400/40 hover:shadow-emerald-500/10`}
    >
      {project.screenshots && project.screenshots.length > 0 && (
        <ProjectGallery
          compact
          screenshots={project.screenshots}
          browserUrl={project.browserUrl ?? project.displayUrl ?? project.url?.replace("https://", "")}
          accent={project.galleryAccent ?? "emerald"}
          previewBg={project.galleryPreviewBg}
          labels={{
            expandHint: labels.expandHint,
            expandLabel: labels.expandLabel,
            closeLabel: labels.closeLabel,
          }}
        />
      )}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-zinc-400">{project.id}</span>
        {project.live && (
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {labels.live}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-1 font-mono text-xs text-emerald-400">
          {project.subtitle}
        </p>
      )}
      {project.highlight && (
        <p className="mt-3 line-clamp-4 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-3 py-2.5 text-sm leading-relaxed text-zinc-300">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {labels.feature}
          </span>
          {project.highlight}
        </p>
      )}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-300">{project.desc}</p>
      {project.role && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
          {project.role}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.url && linkText && (
        <p className="mt-4 font-mono text-xs text-emerald-400 transition-colors group-hover:text-emerald-300">
          {linkText} ↗
        </p>
      )}
    </article>
  );
}

function ProjectCardHover({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.045;
      const max = 8;
      gsap.to(el, {
        x: Math.max(-max, Math.min(max, x * strength)),
        y: Math.max(-max, Math.min(max, y * strength)),
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onEnter = () => {
      gsap.to(el, {
        scale: 1.045,
        duration: 0.45,
        ease: "power2.out",
      });
      el.style.zIndex = "10";
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });
      el.style.zIndex = "1";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative will-change-transform"
      style={{ transformOrigin: "center center" }}
    >
      {children}
    </div>
  );
}

function ProjectItem({
  project,
  labels,
}: {
  project: Project;
  labels: ProjectLabels;
}) {
  if (project.connectOne) {
    return (
      <ProjectCardHover>
        <MagneticButton cursorText={labels.view} className="block h-full w-full">
          <ConnectOneProjectCard project={project} labels={labels} />
        </MagneticButton>
      </ProjectCardHover>
    );
  }

  const card = <ProjectCard project={project} labels={labels} />;
  const href = resolveProjectUrl(project.url);
  const isExternal = href && !href.startsWith("/");

  if (href) {
    return (
      <ProjectCardHover>
        <MagneticButton cursorText={labels.visit} className="block h-full w-full">
          <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="interactive-focus block h-full w-full rounded-3xl"
          >
            {card}
          </a>
        </MagneticButton>
      </ProjectCardHover>
    );
  }

  return (
    <ProjectCardHover>
      <MagneticButton cursorText={labels.view} className="block h-full w-full">{card}</MagneticButton>
    </ProjectCardHover>
  );
}

export default function ProjectsGrid({
  projects,
  labels,
}: {
  projects: Project[];
  labels: ProjectLabels;
}) {
  return (
    <div className="mt-16 grid auto-rows-fr gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <div key={project.id} className="relative flex px-1 py-2">
          <ProjectItem project={project} labels={labels} />
        </div>
      ))}
    </div>
  );
}
