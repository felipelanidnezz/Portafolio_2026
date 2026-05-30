"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

type ConnectOneShowcaseProps = {
  activeId?: string;
  onSelect?: (id: string) => void;
};

export default function ConnectOneShowcase({
  activeId: controlledId,
  onSelect,
}: ConnectOneShowcaseProps) {
  const { t } = useLanguage();
  const c = t.connect;
  const [internalId, setInternalId] = useState(c.screenshots[0]?.id ?? "");

  const activeId = controlledId ?? internalId;
  const active =
    c.screenshots.find((shot) => shot.id === activeId) ?? c.screenshots[0];

  const select = (id: string) => {
    if (onSelect) onSelect(id);
    else setInternalId(id);
  };

  if (!active) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          {c.showcaseTitle}
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
          {c.privateAccess}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[14rem] flex-1 items-center justify-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-3 py-1 sm:max-w-xs">
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
              connect-one.internal
            </span>
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-white">
          <Image
            key={active.id}
            src={active.image}
            alt={active.caption}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {c.screenshots.length > 1 && (
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label={c.showcaseTitle}
        >
          {c.screenshots.map((shot) => {
            const isActive = shot.id === active.id;
            return (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(shot.id)}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                  isActive
                    ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                    : "border-zinc-700/70 bg-zinc-900/50 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }`}
              >
                {shot.label}
              </button>
            );
          })}
        </div>
      )}

      <p className="text-sm leading-relaxed text-zinc-500">{active.caption}</p>
      <p className="font-mono text-[11px] leading-relaxed text-zinc-600">
        {c.showcaseNote}
      </p>
    </div>
  );
}
