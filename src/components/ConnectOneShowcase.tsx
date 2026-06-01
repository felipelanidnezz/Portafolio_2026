"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ImageLightbox from "@/components/ImageLightbox";
import type { ConnectShowcaseData } from "@/i18n/translations";

type ConnectOneShowcaseProps = {
  data: ConnectShowcaseData;
  activeId?: string;
  onSelect?: (id: string) => void;
  accent?: "emerald" | "violet";
  labels: {
    expandHint: string;
    expandLabel: string;
    closeLabel: string;
  };
};

export default function ConnectOneShowcase({
  data,
  activeId: controlledId,
  onSelect,
  accent = "emerald",
  labels,
}: ConnectOneShowcaseProps) {
  const [internalId, setInternalId] = useState(data.screenshots[0]?.id ?? "");
  const [lightbox, setLightbox] = useState(false);

  const activeId = controlledId ?? internalId;
  const active =
    data.screenshots.find((shot) => shot.id === activeId) ?? data.screenshots[0];

  const select = useCallback(
    (id: string) => {
      if (onSelect) onSelect(id);
      else setInternalId(id);
    },
    [onSelect],
  );

  useEffect(() => {
    setInternalId(data.screenshots[0]?.id ?? "");
  }, [data.screenshots]);

  if (!active) return null;

  const imgW = active.width ?? 1024;
  const imgH = active.height ?? 501;
  const thumbActive =
    accent === "violet"
      ? "border-violet-400/60 ring-2 ring-violet-400/25"
      : "border-emerald-400/60 ring-2 ring-emerald-400/25";

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            {data.showcaseTitle}
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber-300">
            <svg
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            {data.privateAccess}
          </span>
        </div>

        <div className="connect-browser overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/95 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center justify-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="truncate font-mono text-[10px] text-zinc-500">
                {data.browserUrl}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="group relative block w-full cursor-zoom-in bg-[#eef0f4] p-1.5 sm:p-2"
            aria-label={labels.expandLabel}
          >
            <Image
              key={active.id}
              src={active.image}
              alt={active.caption}
              width={imgW}
              height={imgH}
              className="connect-screenshot block w-full rounded-[6px] border border-black/5 shadow-sm transition duration-300 group-hover:brightness-[1.02]"
              sizes="(max-width: 768px) 100vw, 1100px"
              priority
            />
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {labels.expandHint}
            </span>
          </button>
        </div>

        {data.screenshots.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label={data.showcaseTitle}
          >
            {data.screenshots.map((shot) => {
              const isActive = shot.id === active.id;
              const w = shot.width ?? 1024;
              const h = shot.height ?? 501;

              return (
                <button
                  key={shot.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => select(shot.id)}
                  className={`connect-thumb shrink-0 overflow-hidden rounded-lg border transition-all ${
                    isActive
                      ? thumbActive
                      : "border-zinc-700/60 opacity-70 hover:border-zinc-600 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={shot.image}
                    alt={shot.label}
                    width={w}
                    height={h}
                    className="block h-14 w-auto max-w-[120px] object-contain object-left-top bg-[#eef0f4]"
                  />
                  <span className="block truncate px-2 py-1 font-mono text-[9px] text-zinc-500">
                    {shot.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <p className="text-sm leading-relaxed text-zinc-400">{active.caption}</p>
        <p className="font-mono text-[11px] leading-relaxed text-zinc-600">
          {data.showcaseNote}
        </p>
      </div>

      <ImageLightbox
        open={lightbox}
        onClose={() => setLightbox(false)}
        src={active.image}
        alt={active.caption}
        width={imgW}
        height={imgH}
        closeLabel={labels.closeLabel}
      />
    </>
  );
}
