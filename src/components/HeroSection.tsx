"use client";

import { useEffect, useRef, useState } from "react";
import Typewriter from "@/components/Typewriter";
import { MagneticButton } from "@/components/MagneticCursor";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function HeroSection() {
  const { t, locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="hero-glow hero-glow--pulse" aria-hidden="true" />

      <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-emerald-400/80">
        <Typewriter
          key={`${locale}-taglines`}
          texts={t.hero.taglines}
          speed={70}
          deleteSpeed={40}
          pause={2500}
          sound
          soundActive={isVisible}
          loop
          className="inline"
        />
      </p>

      <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
        <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          <Typewriter
            texts={["Felipe Landinez"]}
            speed={95}
            sound
            soundActive={isVisible}
            loop={false}
            startDelay={300}
            className="inline"
          />
        </span>
        <span className="mt-2 block font-mono text-2xl font-normal text-emerald-400 md:text-4xl lg:text-5xl">
          <Typewriter
            key={`${locale}-roles`}
            texts={t.hero.roles}
            speed={80}
            deleteSpeed={38}
            pause={2400}
            sound
            soundActive={isVisible}
            loop
            startDelay={1800}
            minChars={32}
          />
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
        <Typewriter
          key={`${locale}-desc`}
          texts={t.hero.descriptions}
          speed={42}
          deleteSpeed={28}
          pause={3000}
          sound={false}
          loop
          startDelay={4500}
          minChars={48}
          className="text-zinc-400"
        />
      </p>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-5">
        <MagneticButton strength="strong" cursorText={t.hero.ctaProjects}>
          <a
            href="#proyectos"
            className="interactive-focus group relative overflow-hidden rounded-full bg-emerald-400 px-10 py-4 text-sm font-semibold text-black transition-colors hover:bg-emerald-300"
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}
