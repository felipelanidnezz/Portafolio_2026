"use client";

import React from "react";
import { TechItem3D } from "@/data/techStack3dData";

type Props = {
  item: TechItem3D;
  screenX: number;
  screenY: number;
  scale: number;
  isFront: boolean;
  isHovered: boolean;
  isRelated: boolean;
  isSelected: boolean;
  onHover: (item: TechItem3D | null) => void;
  onClick: (item: TechItem3D) => void;
};

export default function TechNodeOverlay({
  item,
  screenX,
  screenY,
  scale,
  isFront,
  isHovered,
  isRelated,
  isSelected,
  onHover,
  onClick,
}: Props) {
  const isActiveState = isHovered || isSelected;

  // Always visible: opacity adjusted by depth and state
  const baseOpacity = isActiveState
    ? 1
    : isRelated
    ? 0.95
    : isFront
    ? 0.9
    : 0.75;

  const zIndexClass = isActiveState ? "z-30" : isFront ? "z-20" : "z-10";

  return (
    <div
      className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform duration-100 ease-out ${zIndexClass}`}
      style={{
        transform: `translate3d(${screenX}px, ${screenY}px, 0px) scale(${
          isActiveState ? scale * 1.3 : isRelated ? scale * 1.15 : scale
        })`,
        opacity: baseOpacity,
      }}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(item)}
    >
      <div
        className={`group relative flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md ${
          isActiveState
            ? "border-emerald-400 bg-zinc-900/95 shadow-emerald-500/40 ring-2 ring-emerald-400/50"
            : isRelated
            ? "border-emerald-500/70 bg-zinc-900/85 shadow-emerald-500/20"
            : isFront
            ? "border-zinc-700/80 bg-zinc-950/80 hover:border-emerald-500/60 hover:bg-zinc-900/90"
            : "border-zinc-800/60 bg-zinc-950/60 hover:border-emerald-500/50 hover:bg-zinc-900/80"
        }`}
      >
        {/* Glow halo */}
        <div
          className={`absolute -inset-1 rounded-full blur-sm transition-opacity duration-300 ${
            isActiveState
              ? "opacity-70 bg-emerald-400/40"
              : isRelated
              ? "opacity-50 bg-emerald-500/30"
              : "opacity-0 group-hover:opacity-35 group-hover:bg-emerald-400/20"
          }`}
        />

        {/* Icon container */}
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900/90 p-0.5">
          {item.iconUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.iconUrl}
              alt={item.name}
              className="h-3.5 w-3.5 object-contain filter drop-shadow"
            />
          ) : (
            <span className="font-mono text-[9px] font-bold text-emerald-400">
              {item.iconDef.initials}
            </span>
          )}
        </div>

        {/* Label */}
        <span
          className={`relative font-mono text-xs font-medium tracking-tight whitespace-nowrap transition-colors ${
            isActiveState
              ? "text-emerald-300 font-semibold"
              : isRelated
              ? "text-emerald-400"
              : "text-zinc-200 group-hover:text-white"
          }`}
        >
          {item.name}
        </span>
      </div>
    </div>
  );
}
