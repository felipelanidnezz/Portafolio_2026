"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/translations";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/60 p-0.5 font-mono text-[10px] uppercase tracking-wider"
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as Locale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            locale === lang
              ? "bg-emerald-400 text-black"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          aria-pressed={locale === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
