"use client";

import HeroSection from "@/components/HeroSection";
import ConnectOneSection from "@/components/ConnectOneSection";
import ProjectsGrid from "@/components/ProjectsGrid";
import LanguageToggle from "@/components/LanguageToggle";
import LiveCodePlayground from "@/components/LiveCodePlayground";
import { useLanguage } from "@/i18n/LanguageProvider";
import { MagneticButton } from "@/components/MagneticCursor";
import SkillIconCarousel from "@/components/SkillIconCarousel";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-100">
      <div className="noise-overlay" aria-hidden="true" />

      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-[#050505]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <MagneticButton strength="strong">
            <a href="#" className="font-mono text-sm font-medium tracking-tight">
              {"<FL />"}
            </a>
          </MagneticButton>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-zinc-500 md:flex">
              {t.nav.map((item, i) => (
                <MagneticButton key={item}>
                  <a
                    href={`#${t.navIds[i]}`}
                    className="transition-colors hover:text-emerald-400"
                  >
                    {item}
                  </a>
                </MagneticButton>
              ))}
            </div>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <HeroSection />
      <ConnectOneSection />

      <section id="sobre-mi" className="relative scroll-mt-24 px-6 py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
              {t.about.label}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {t.about.title1}
              <span className="block text-zinc-500">{t.about.title2}</span>
            </h2>
            <p className="mt-6 font-mono text-sm text-zinc-600">
              Thomas Felipe Acosta Landinez
            </p>

            <LiveCodePlayground />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-zinc-400">
            <p>
              {t.about.p1.split("Connect One")[0]}
              <a
                href="#connect-one"
                className="interactive-focus rounded text-emerald-400 underline-offset-2 hover:underline"
              >
                Connect One
              </a>
              {t.about.p1.split("Connect One")[1]}
            </p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700 px-4 py-1.5 font-mono text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="scroll-mt-24 border-y border-zinc-800/50 bg-zinc-950/50 px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            {t.skills.label}
          </p>
          <h2 className="mt-4 text-center text-4xl font-bold tracking-tight">
            {t.skills.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-500">
            {t.skills.subtitle}
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.skills.categories.map((cat) => (
              <MagneticButton key={cat.title} cursorText="→">
                <article className="group h-full rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition-colors hover:border-emerald-400/30">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">
                      {cat.emoji}
                    </span>
                    <h3 className="font-semibold text-zinc-200">{cat.title}</h3>
                  </div>
                  <SkillIconCarousel skills={cat.skills} />
                </article>
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>

      <section id="proyectos" className="scroll-mt-24 px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            {t.projects.label}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-4 max-w-lg text-zinc-400">{t.projects.subtitle}</p>

          <ProjectsGrid
            projects={t.projects.items}
            labels={{
              feature: t.projects.featureLabel,
              live: t.projects.liveLabel,
              demo: t.projects.demoLabel,
              visit: t.cursor.visit,
              view: t.cursor.view,
              expandHint: t.projects.expandHint,
              expandLabel: t.projects.expandLabel,
              closeLabel: t.projects.closeLabel,
            }}
          />
        </div>
      </section>

      <section className="bg-zinc-100 px-6 py-32 text-zinc-900">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600">
            {t.experience.label}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            {t.experience.title}
          </h2>

          <div className="mt-16 space-y-0">
            {t.experience.items.map((exp) => (
              <MagneticButton key={exp.year} cursorText="→">
                <div className="group flex flex-col gap-4 border-t border-zinc-300 py-8 transition-colors hover:bg-zinc-200/50 md:flex-row md:items-start md:gap-12">
                  <span className="shrink-0 font-mono text-xs text-zinc-500">
                    {exp.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-sm text-emerald-700">{exp.company}</p>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-zinc-600">
                    {exp.detail}
                  </p>
                </div>
              </MagneticButton>
            ))}
          </div>

          <div className="mt-12 border-t border-zinc-300 pt-12">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600">
              {t.experience.coursesTitle}
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.experience.courses.map((course) => (
                <MagneticButton key={course} cursorText="✓">
                  <li className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white/60 px-5 py-4 text-sm text-zinc-700 transition-colors hover:border-emerald-400/50">
                    <span className="font-mono text-emerald-600">→</span>
                    {course}
                  </li>
                </MagneticButton>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-24 px-6 py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-400">
            {t.contact.label}
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {t.contact.title1}
            <span className="block text-emerald-400">{t.contact.title2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-zinc-400">
            {t.contact.subtitle}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <MagneticButton strength="strong" cursorText={t.cursor.send}>
              <a
                href="mailto:thomasacosta71@gmail.com"
                className="interactive-focus inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200 sm:px-12"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                thomasacosta71@gmail.com
              </a>
            </MagneticButton>
            <MagneticButton cursorText="GitHub →">
              <a
                href="https://github.com/felipelanidnezz"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-focus inline-flex items-center gap-2.5 rounded-full border border-zinc-600 px-8 py-5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white sm:px-10"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </MagneticButton>
            <MagneticButton cursorText="LinkedIn →">
              <a
                href="https://www.linkedin.com/in/felipelandinez/"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive-focus inline-flex items-center gap-2.5 rounded-full border border-zinc-600 px-8 py-5 text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white sm:px-10"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 px-6 py-8 text-center">
        <p className="font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} {t.footer}
        </p>
      </footer>
    </div>
  );
}
