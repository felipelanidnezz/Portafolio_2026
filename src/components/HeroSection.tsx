"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Typewriter from "@/components/Typewriter";
import { MagneticButton } from "@/components/MagneticCursor";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-[calc(5rem+env(safe-area-inset-top))] text-center"
    >
      <div className="hero-glow hero-glow--pulse" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[100px]"
        aria-hidden="true"
      />

      <p className="hero-anim mb-5 font-mono text-xs uppercase tracking-[0.4em] text-emerald-400/90">
        {t.hero.availability}
      </p>

      <h1 className="hero-anim max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
        <span className="block bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          {t.hero.name}
        </span>
        <span className="mt-3 block font-mono text-2xl font-medium text-emerald-400 md:text-4xl lg:text-5xl">
          {t.hero.role}
        </span>
      </h1>

      <p className="hero-anim mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
        {t.hero.valueProp}
      </p>

      <p className="hero-anim mt-4 max-w-xl font-mono text-sm text-zinc-500">
        <Typewriter
          key={`${locale}-taglines`}
          texts={t.hero.taglines}
          speed={55}
          deleteSpeed={32}
          pause={2200}
          sound={false}
          loop
          className="inline"
        />
      </p>

      <div className="hero-anim mt-12 flex flex-wrap items-center justify-center gap-5">
        <MagneticButton strength="strong" cursorText={t.hero.ctaProjects}>
          <a
            href="#proyectos"
            className="interactive-focus group relative overflow-hidden rounded-full bg-emerald-400 px-10 py-4 text-sm font-semibold text-black shadow-lg shadow-emerald-400/20 transition-colors hover:bg-emerald-300"
          >
            <span className="relative z-10">{t.hero.ctaProjects}</span>
          </a>
        </MagneticButton>

        <MagneticButton cursorText={t.hero.ctaContact}>
          <a
            href="#contacto"
            className="interactive-focus rounded-full border border-zinc-600 px-10 py-4 text-sm font-semibold text-zinc-200 transition-colors hover:border-emerald-400/60 hover:text-white"
          >
            {t.hero.ctaContact}
          </a>
        </MagneticButton>
      </div>

      <div className="hero-anim absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}
