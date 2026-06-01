"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

type ImageLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  width: number;
  height: number;
  closeLabel: string;
};

/** Full-screen image viewer portaled to document.body (escapes card transforms/overflow). */
export default function ImageLightbox({
  open,
  onClose,
  src,
  alt,
  width,
  height,
  closeLabel,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300 transition hover:border-zinc-500 hover:text-white"
      >
        {closeLabel}
      </button>
      <div
        className="relative flex max-h-[90vh] max-w-[min(92vw,1200px)] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto max-h-[90vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
          sizes="92vw"
          priority
        />
      </div>
    </div>,
    document.body,
  );
}
