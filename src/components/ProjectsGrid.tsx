"use client";

import { MagneticButton } from "@/components/MagneticCursor";

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
  featured?: boolean;
  featuredBottom?: boolean;
};

type ProjectLabels = {
  feature: string;
  live: string;
  demo: string;
  visit: string;
  view: string;
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
      className={`group relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${project.color} p-8 transition-all hover:border-zinc-600`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-zinc-500">{project.id}</span>
        {project.live && (
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {labels.live}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-1 font-mono text-xs text-emerald-400/80">
          {project.subtitle}
        </p>
      )}
      {project.highlight && (
        <p className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-4 py-3 text-sm leading-relaxed text-zinc-300">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {labels.feature}
          </span>
          {project.highlight}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.desc}</p>
      {project.role && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          {project.role}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.url && linkText && (
        <p className="mt-5 font-mono text-xs text-emerald-400/70 transition-colors group-hover:text-emerald-400">
          {linkText} ↗
        </p>
      )}
    </article>
  );
}

function ProjectItem({
  project,
  labels,
}: {
  project: Project;
  labels: ProjectLabels;
}) {
  const card = <ProjectCard project={project} labels={labels} />;
  const isExternal = project.url && !project.url.startsWith("/");

  if (project.url) {
    return (
      <MagneticButton cursorText={labels.visit}>
        <a
          href={project.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block w-full"
        >
          {card}
        </a>
      </MagneticButton>
    );
  }

  return <MagneticButton cursorText={labels.view}>{card}</MagneticButton>;
}

export default function ProjectsGrid({
  projects,
  labels,
}: {
  projects: Project[];
  labels: ProjectLabels;
}) {
  const featuredTop = projects.filter((p) => p.featured);
  const featuredBottom = projects.filter((p) => p.featuredBottom);
  const regular = projects.filter((p) => !p.featured && !p.featuredBottom);

  return (
    <div className="mt-16 space-y-6">
      {featuredTop.map((project) => (
        <div key={project.id}>
          <ProjectItem project={project} labels={labels} />
        </div>
      ))}

      {regular.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {regular.map((project) => (
            <div key={project.id}>
              <ProjectItem project={project} labels={labels} />
            </div>
          ))}
        </div>
      )}

      {featuredBottom.map((project) => (
        <div key={project.id}>
          <ProjectItem project={project} labels={labels} />
        </div>
      ))}
    </div>
  );
}
