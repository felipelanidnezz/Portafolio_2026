"use client";

import { useEffect, useState } from "react";
import ProjectGallery from "@/components/ProjectGallery";
import type { Project } from "@/components/ProjectsGrid";
import { useLanguage } from "@/i18n/LanguageProvider";

type ConnectView = "intranet" | "clientes";

type ConnectOneProjectCardProps = {
  project: Project;
  labels: {
    feature: string;
    privateLabel: string;
    expandHint: string;
    expandLabel: string;
    closeLabel: string;
  };
};

export default function ConnectOneProjectCard({
  project,
  labels,
}: ConnectOneProjectCardProps) {
  const { t } = useLanguage();
  const c = t.connect;
  const [view, setView] = useState<ConnectView>("intranet");

  const product = view === "intranet" ? c.intranet : c.clientes;
  const accent = view === "intranet" ? "emerald" : "violet";

  const screenshots = product.screenshots.map((shot) => ({
    id: shot.id,
    label: shot.label,
    image: shot.image,
    width: shot.width,
    height: shot.height,
  }));

  useEffect(() => {
    setView("intranet");
  }, [t]);

  return (
    <article
      id="connect-one"
      className={`group relative flex h-full scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${project.color} p-6 shadow-lg shadow-black/20 transition-[border-color,box-shadow] duration-300 hover:border-emerald-400/40 hover:shadow-emerald-500/10`}
    >
      <div
        className="mb-4 flex flex-wrap gap-2"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        <button
          type="button"
          onClick={() => setView("intranet")}
          aria-pressed={view === "intranet"}
          className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
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
          className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            view === "clientes"
              ? "border-violet-400/50 bg-violet-400/10 text-violet-300"
              : "border-zinc-700/60 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
          }`}
        >
          {c.navClientes}
        </button>
      </div>

      <ProjectGallery
        key={view}
        compact
        screenshots={screenshots.slice(0, 4)}
        browserUrl={product.browserUrl}
        accent={accent}
        previewBg="#eef0f4"
        labels={{
          expandHint: labels.expandHint,
          expandLabel: labels.expandLabel,
          closeLabel: labels.closeLabel,
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-zinc-400">{project.id}</span>
        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
          {labels.privateLabel}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
      {project.subtitle && (
        <p className="mt-1 font-mono text-xs text-emerald-400">{project.subtitle}</p>
      )}
      {project.highlight && (
        <p className="mt-3 line-clamp-4 rounded-xl border border-emerald-400/25 bg-emerald-400/5 px-3 py-2.5 text-sm leading-relaxed text-zinc-300">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {labels.feature}
          </span>
          {project.highlight}
        </p>
      )}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-300">
        {project.desc}
      </p>
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
    </article>
  );
}
