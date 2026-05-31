"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import type { ProjectScreenshot } from "@/components/ProjectsGrid";

type ProjectGalleryProps = {
  screenshots: readonly ProjectScreenshot[];
  browserUrl?: string;
  accent?: "emerald" | "amber" | "violet" | "cyan" | "red";
  previewBg?: string;
  compact?: boolean;
  labels: {
    expandHint: string;
    expandLabel: string;
    closeLabel: string;
  };
};

const ACCENT_RING: Record<NonNullable<ProjectGalleryProps["accent"]>, string> = {
  emerald: "border-emerald-400/60 ring-2 ring-emerald-400/25",
  amber: "border-amber-400/60 ring-2 ring-amber-400/25",
  violet: "border-violet-400/60 ring-2 ring-violet-400/25",
  cyan: "border-cyan-400/60 ring-2 ring-cyan-400/25",
  red: "border-red-400/60 ring-2 ring-red-400/25",
};

export default function ProjectGallery({
  screenshots,
  browserUrl,
  accent = "emerald",
  previewBg = "#f5f0e8",
  compact = false,
  labels,
}: ProjectGalleryProps) {
  const [activeId, setActiveId] = useState(screenshots[0]?.id ?? "");
  const [lightbox, setLightbox] = useState(false);

  const active =
    screenshots.find((shot) => shot.id === activeId) ?? screenshots[0];

  useEffect(() => {
    setActiveId(screenshots[0]?.id ?? "");
  }, [screenshots]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const stopNav = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  if (!active) return null;

  const imgW = active.width ?? 1440;
  const imgH = active.height ?? 900;
  const thumbActive = ACCENT_RING[accent];

  return (
    <>
      <div
        className={compact ? "mb-4" : "mb-6"}
        onClick={stopNav}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        <div className="connect-browser overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/95 px-3 py-2 sm:px-4 sm:py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            {browserUrl && (
              <div className="mx-auto flex min-w-0 max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-2 py-1 sm:max-w-md sm:px-3">
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.761 0-5 1.79-5 4v1h10v-1c0-2.21-2.239-4-5-4z"
                  />
                </svg>
                <span className="truncate font-mono text-[9px] text-zinc-500 sm:text-[10px]">
                  {browserUrl}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              stopNav(e);
              setLightbox(true);
            }}
            className="group relative block w-full cursor-zoom-in overflow-hidden p-1 sm:p-1.5"
            style={{ backgroundColor: previewBg }}
            aria-label={labels.expandLabel}
          >
            <div className={compact ? "aspect-[16/10] w-full" : "w-full"}>
              <Image
                key={active.id}
                src={active.image}
                alt={active.label}
                width={imgW}
                height={imgH}
                className={`connect-screenshot block w-full rounded-[4px] border border-black/5 shadow-sm transition duration-300 group-hover:brightness-[1.02] ${
                  compact ? "h-full object-cover object-top" : ""
                }`}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-zinc-400 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:px-2.5 sm:py-1 sm:text-[9px]">
              {labels.expandHint}
            </span>
          </button>
        </div>

        {screenshots.length > 1 && (
          <div
            className="mt-3 grid grid-cols-4 gap-2"
            role="tablist"
            aria-label={active.label}
          >
            {screenshots.map((shot) => {
              const isActive = shot.id === active.id;
              const w = shot.width ?? 1440;
              const h = shot.height ?? 900;

              return (
                <button
                  key={shot.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={shot.label}
                  onClick={(e) => {
                    stopNav(e);
                    setActiveId(shot.id);
                  }}
                  className={`connect-thumb group/thumb overflow-hidden rounded-lg border transition-all ${
                    isActive
                      ? thumbActive
                      : "border-zinc-700/60 opacity-75 hover:border-zinc-600 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={shot.image}
                    alt=""
                    width={w}
                    height={h}
                    className="block h-12 w-full object-cover object-top sm:h-14"
                    sizes="120px"
                  />
                  <span className="block truncate bg-zinc-950/90 px-1 py-0.5 text-center font-mono text-[7px] text-zinc-500 group-hover/thumb:text-zinc-400 sm:text-[8px]">
                    {shot.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 font-mono text-xs text-zinc-300 transition hover:border-zinc-500"
          >
            {labels.closeLabel}
          </button>
          <Image
            src={active.image}
            alt={active.label}
            width={imgW}
            height={imgH}
            className="max-h-[90vh] max-w-full w-auto rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
