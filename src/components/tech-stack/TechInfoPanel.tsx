"use client";

import React from "react";
import { TechItem3D } from "@/data/techStack3dData";
import { useLanguage } from "@/i18n/LanguageProvider";

type Props = {
  item: TechItem3D | null;
  activeCategoryIndex: number;
  onSelectRelated: (techId: string) => void;
  onClose: () => void;
};

export default function TechInfoPanel({
  item,
  activeCategoryIndex,
  onSelectRelated,
  onClose,
}: Props) {
  const { locale } = useLanguage();

  if (!item) {
    return (
      <div className="pointer-events-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur-md transition-all">
        <p className="font-mono text-xs text-zinc-500">
          {locale === "es"
            ? "✦ Haz hover o click en cualquier tecnología para ver detalles"
            : "✦ Hover or click any technology node to view details"}
        </p>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto relative max-w-sm rounded-2xl border border-emerald-500/30 bg-zinc-950/90 p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur-md transition-all duration-300">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 font-mono text-xs text-zinc-400 hover:border-zinc-700 hover:text-white"
        aria-label="Cerrar panel"
      >
        ✕
      </button>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-900/90 shadow-inner">
          {item.iconUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.iconUrl}
              alt={item.name}
              className="h-6 w-6 object-contain"
            />
          ) : (
            <span className="font-mono text-sm font-bold text-emerald-400">
              {item.iconDef.initials}
            </span>
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white tracking-tight">
            {item.name}
          </h4>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
            <span>{item.emoji}</span>
            {item.categoryName[locale]}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-zinc-300 font-sans">
        {item.description[locale]}
      </p>

      {item.relatedIds && item.relatedIds.length > 0 && (
        <div className="mt-5 border-t border-zinc-800/80 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {locale === "es" ? "Tecnologías conectadas" : "Connected Tech"}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {item.relatedIds.map((relId) => (
              <button
                key={relId}
                onClick={() => onSelectRelated(relId)}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
              >
                #{relId}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
