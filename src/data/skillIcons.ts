export type SkillIconDef = {
  slug?: string;
  color?: string;
  initials: string;
  bg?: string;
  label?: string;
};

const SKILL_ICONS: Record<string, SkillIconDef> = {
  "Vue 3": { slug: "vuedotjs", initials: "V3" },
  Quasar: { slug: "quasar", initials: "Q" },
  Astro: { slug: "astro", initials: "As" },
  JavaScript: { slug: "javascript", initials: "JS" },
  TypeScript: { slug: "typescript", initials: "TS" },
  HTML5: { slug: "html5", initials: "H5" },
  CSS3: { slug: "css3", initials: "C3" },
  Vite: { slug: "vite", initials: "Vi" },
  Bootstrap: { slug: "bootstrap", initials: "Bs" },
  Pinia: { slug: "vuedotjs", color: "FFD43B", initials: "Pi" },
  Axios: { slug: "axios", initials: "Ax" },
  "REST APIs": { slug: "openapiinitiative", initials: "API", bg: "#6B7280", label: "REST" },
  "API Consumption": { slug: "json", initials: "API", bg: "#F59E0B", label: "APIs" },
  Supabase: { slug: "supabase", initials: "Sb" },
  "PokéAPI": { initials: "Pk", bg: "#EF4444" },
  "Gemini API": { slug: "googlegemini", initials: "Gm" },
  ApexCharts: { initials: "AC", bg: "#008FFB" },
  "Vue3-ApexCharts": { slug: "vuedotjs", color: "008FFB", initials: "Vx", label: "ApexCharts" },
  "Node.js": { slug: "nodedotjs", initials: "Nd" },
  Express: { slug: "express", initials: "Ex" },
  "npm / pnpm": { slug: "pnpm", initials: "Pn", label: "pnpm" },
  Git: { slug: "git", initials: "Gt" },
  GitHub: { slug: "github", initials: "GH" },
  Postman: { slug: "postman", initials: "Pm" },
  MySQL: { slug: "mysql", initials: "My" },
  PostgreSQL: { slug: "postgresql", initials: "Pg" },
  MongoDB: { slug: "mongodb", initials: "Mg" },
  "Supabase Auth & Realtime": { slug: "supabase", initials: "Sb", label: "Supabase RT" },
  "UI Design": { slug: "figma", initials: "UI", label: "UI Design" },
  "UX Principles": { initials: "UX", bg: "#A855F7", label: "UX" },
  "Responsive Design": { initials: "RD", bg: "#06B6D4", label: "Responsive" },
  "Mobile First": { initials: "MF", bg: "#10B981", label: "Mobile" },
  "Design Systems": { slug: "storybook", initials: "DS", label: "Design Sys." },
  Wireframing: { slug: "figma", color: "A855F7", initials: "Wf", label: "Wireframe" },
  "Accessibility (a11y)": { slug: "w3c", initials: "A11", label: "a11y" },
  "Dark Mode": { initials: "DM", bg: "#27272A" },
  "CSS Animations": { slug: "css3", color: "E34F26", initials: "Ca", label: "CSS Anim." },
  GSAP: { slug: "greensock", initials: "Gs" },
  "SPA Development": { slug: "react", initials: "Sp", label: "SPA" },
  "Component Architecture": { slug: "react", color: "61DAFB", initials: "Ca", label: "Components" },
  "Performance Optimization": { initials: "Perf", bg: "#F97316", label: "Performance" },
  "React Native": { slug: "react", initials: "RN" },
  Expo: { slug: "expo", initials: "Ex" },
  Leaflet: { slug: "leaflet", initials: "Lf" },
  "Schema.org / SEO": { slug: "google", initials: "SEO", label: "SEO" },
  Scrum: { initials: "Sc", bg: "#3B82F6" },
};

export function getSkillIcon(skill: string): SkillIconDef {
  return (
    SKILL_ICONS[skill] ?? {
      initials: skill.slice(0, 2).toUpperCase(),
      bg: "#52525B",
    }
  );
}

export function getSkillLabel(skill: string): string {
  return getSkillIcon(skill).label ?? skill;
}

export function skillIconUrl(def: SkillIconDef): string | null {
  if (!def.slug) return null;
  return def.color
    ? `https://cdn.simpleicons.org/${def.slug}/${def.color}`
    : `https://cdn.simpleicons.org/${def.slug}`;
}
