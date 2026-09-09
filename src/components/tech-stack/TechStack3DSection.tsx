"use client";

import React, { useState } from "react";
import ParticleSphereCanvas from "./ParticleSphereCanvas";
import TechInfoPanel from "./TechInfoPanel";
import { ALL_TECH_ITEMS_3D, TechItem3D } from "@/data/techStack3dData";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function TechStack3DSection() {
  const { locale, t } = useLanguage();
  const isEs = locale === "es";

  const [activeTech, setActiveTech] = useState<TechItem3D | null>(
    ALL_TECH_ITEMS_3D[0] // Default selected: Vue 3
  );

  const handleSelectRelated = (techId: string) => {
    const found = ALL_TECH_ITEMS_3D.find((item) => item.id === techId);
    if (found) {
      setActiveTech(found);
    }
  };

  const activeCatIdx = activeTech ? activeTech.categoryIndex : -1;
  const isFrontendActive = activeCatIdx === 0;
  const isStateApisActive = activeCatIdx === 1;
  const isBackendActive = activeCatIdx === 3;
  const isUiUxChartsActive = activeCatIdx === 2 || activeCatIdx === 4 || activeCatIdx === 5;

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-y border-zinc-800/50 bg-zinc-950/70 py-28 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/4 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-10 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: 3D Particle Globe with Orbiting Technologies */}
          <div className="lg:col-span-7">
            <ParticleSphereCanvas
              activeTech={activeTech}
              onHoverTech={(item) => {
                if (item) setActiveTech(item);
              }}
              onSelectTech={(item) => {
                if (item) setActiveTech(item);
              }}
            />
          </div>

          {/* Right Column: Explanatory Content & Dynamic Highlight Cards */}
          <div className="space-y-6 lg:col-span-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
                {t.skills.label}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {isEs ? "Stack técnico & Arquitectura" : "Tech Stack & Architecture"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                {isEs
                  ? "Construyo aplicaciones web y móviles escalables combinando herramientas modernas del ecosistema frontend y fullstack. Selecciona o pasa el cursor sobre una tecnología para iluminar su área correspondiente."
                  : "I build scalable web and mobile applications leveraging modern frontend & fullstack technologies. Hover or select a technology to illuminate its architecture domain."}
              </p>
            </div>

            {/* Architecture Highlights Cards - Dynamic illumination on active category */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* Card 1: Core Frontend */}
              <div
                className={`relative overflow-hidden rounded-xl border p-3.5 backdrop-blur-sm transition-all duration-300 ${
                  isFrontendActive
                    ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.03]"
                    : "border-zinc-800/80 bg-zinc-900/40 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🚀</span>
                  {isFrontendActive && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4
                  className={`mt-1 font-mono text-xs font-semibold transition-colors ${
                    isFrontendActive ? "text-emerald-300 font-bold" : "text-zinc-200"
                  }`}
                >
                  {isEs ? "Core Frontend" : "Core Frontend"}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  Vue 3, Quasar, Astro, TS
                </p>
              </div>

              {/* Card 2: Estado & APIs */}
              <div
                className={`relative overflow-hidden rounded-xl border p-3.5 backdrop-blur-sm transition-all duration-300 ${
                  isStateApisActive
                    ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.03]"
                    : "border-zinc-800/80 bg-zinc-900/40 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">⚡</span>
                  {isStateApisActive && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4
                  className={`mt-1 font-mono text-xs font-semibold transition-colors ${
                    isStateApisActive ? "text-emerald-300 font-bold" : "text-zinc-200"
                  }`}
                >
                  {isEs ? "Estado & APIs" : "State & APIs"}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  Pinia, Axios, Supabase RT
                </p>
              </div>

              {/* Card 3: Backend & Datos */}
              <div
                className={`relative overflow-hidden rounded-xl border p-3.5 backdrop-blur-sm transition-all duration-300 ${
                  isBackendActive
                    ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.03]"
                    : "border-zinc-800/80 bg-zinc-900/40 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🛠</span>
                  {isBackendActive && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4
                  className={`mt-1 font-mono text-xs font-semibold transition-colors ${
                    isBackendActive ? "text-emerald-300 font-bold" : "text-zinc-200"
                  }`}
                >
                  {isEs ? "Backend & Datos" : "Backend & Data"}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  Node.js, Express, Postgres
                </p>
              </div>

              {/* Card 4: UI/UX & Gráficos */}
              <div
                className={`relative overflow-hidden rounded-xl border p-3.5 backdrop-blur-sm transition-all duration-300 ${
                  isUiUxChartsActive
                    ? "border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.03]"
                    : "border-zinc-800/80 bg-zinc-900/40 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">🎨</span>
                  {isUiUxChartsActive && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <h4
                  className={`mt-1 font-mono text-xs font-semibold transition-colors ${
                    isUiUxChartsActive ? "text-emerald-300 font-bold" : "text-zinc-200"
                  }`}
                >
                  {isEs ? "UI/UX & Gráficos" : "UI/UX & Charts"}
                </h4>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  ApexCharts, Leaflet, GSAP
                </p>
              </div>
            </div>

            {/* Contextual Information Panel */}
            <div className="pt-2">
              <TechInfoPanel
                item={activeTech}
                activeCategoryIndex={0}
                onSelectRelated={handleSelectRelated}
                onClose={() => setActiveTech(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
