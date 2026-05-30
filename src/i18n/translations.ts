import type { Project } from "@/components/ProjectsGrid";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Locale = "es" | "en";

type SkillCategory = {
  emoji: string;
  title: string;
  skills: string[];
};

type ExperienceItem = {
  year: string;
  role: string;
  company: string;
  detail: string;
};

type ConnectModule = {
  id: string;
  label: string;
  desc: string;
  url: string;
};

export type Translation = {
  nav: string[];
  navIds: string[];
  hero: {
    taglines: string[];
    roles: string[];
    descriptions: string[];
    ctaProjects: string;
    ctaContact: string;
    scroll: string;
  };
  connect: {
    badge: string;
    type: string;
    subtitle: string;
    p1: string;
    p2: string;
    modulesTitle: string;
    contributionsTitle: string;
    viewLink: string;
    modules: ConnectModule[];
    contributions: string[];
  };
  about: {
    label: string;
    title1: string;
    title2: string;
    p1: string;
    p2: string;
    p3: string;
    tags: string[];
    playground: {
      filename: string;
      livePreview: string;
      previewLabel: string;
      ariaLabel: string;
      code: string;
      preview: {
        waiting: string;
        badge: string;
        title: string;
        subtitle: string;
        cta: string;
      };
    };
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    featureLabel: string;
    liveLabel: string;
    demoLabel: string;
    items: Project[];
  };
  experience: {
    label: string;
    title: string;
    coursesTitle: string;
    items: ExperienceItem[];
    courses: string[];
  };
  contact: {
    label: string;
    title1: string;
    title2: string;
    subtitle: string;
  };
  a11y: {
    skipToContent: string;
  };
  footer: string;
  cursor: {
    visit: string;
    view: string;
    send: string;
  };
};

const SHARED_PROJECT_META = {
  "01": {
    id: "01",
    color: "from-emerald-500/20 to-emerald-900/10",
    url: "https://raizviajera.com",
    live: true,
    featured: true,
    tags: [
      "Astro 5",
      "Tailwind CSS",
      "TypeScript",
      "Supabase",
      "Leaflet",
      "GPX / Wikiloc",
      "React Native",
      "Expo",
      "Vercel",
    ],
  },
  "02": {
    id: "02",
    color: "from-amber-500/20 to-amber-900/10",
    url: "https://xn--cabaalaspiedrasminca-66b.com",
    displayUrl: "cabañalaspiedrasminca.com",
    live: true,
    featured: true,
    tags: [
      "Vue 3",
      "Vite",
      "Quasar",
      "SCSS",
      "Schema.org",
      "Google Maps",
      "i18n ES/EN",
      "SEO Local",
    ],
  },
  "03": {
    id: "03",
    color: "from-red-500/20 to-indigo-900/10",
    url: `${BASE}/pokedex.html`,
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PokéAPI",
      "Fetch API",
      "Dark Mode",
      "Responsive",
    ],
  },
  "04": {
    id: "04",
    color: "from-violet-500/20 to-violet-900/10",
    url: `${BASE}/ouija-ai/`,
    live: true,
    tags: [
      "Node.js",
      "Express",
      "Gemini API",
      "JavaScript",
      "Multi-agent",
      "MongoDB",
      "Render",
    ],
  },
  "05": {
    id: "05",
    color: "from-cyan-500/20 to-cyan-900/10",
    url: `${BASE}/pawclinic/`,
    live: true,
    featuredBottom: true,
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap 5",
      "SweetAlert2",
      "localStorage",
      "CRUD",
    ],
  },
} as const;

export const translations: Record<Locale, Translation> = {
  es: {
    nav: ["Connect One", "Sobre mí", "Skills", "Proyectos", "Contacto"],
    navIds: ["connect-one", "sobre-mi", "skills", "proyectos", "contacto"],
    hero: {
      taglines: [
        "Disponible para nuevos proyectos",
        "Abierto a oportunidades",
        "Listo para crear contigo",
      ],
      roles: [
        "Desarrollador Frontend Junior",
        "Vue 3 & Quasar Specialist",
        "UI/UX Enthusiast",
        "Full Stack en formación",
      ],
      descriptions: [
        "Interfaces modernas con Vue 3, Quasar y Vite.",
        "Experiencia real en APIs, Pinia y despliegue en Render.",
        "Diseño responsive que convierte y deja huella.",
      ],
      ctaProjects: "Ver proyectos",
      ctaContact: "Contáctame",
      scroll: "scroll ↓",
    },
    connect: {
      badge: "Prácticas profesionales",
      type: "Intranet corporativa",
      subtitle: "Mi experiencia en la plataforma",
      p1: "Durante mi experiencia en Connect One participé en la modernización y evolución de la plataforma, enfocándome en el desarrollo frontend y la mejora de la experiencia de usuario. Trabajé en el rediseño de módulos clave, desarrollando interfaces más modernas, responsivas y eficientes.",
      p2: "Implementé nuevas funcionalidades, optimicé tablas, formularios, filtros y sistemas de búsqueda, además de contribuir en la creación del modo oscuro y la estandarización visual del sistema. También participé en pruebas funcionales, corrección de incidencias, despliegues a producción y validación de calidad, asegurando una experiencia consistente y escalable para los usuarios.",
      modulesTitle: "Módulos en los que trabajé",
      contributionsTitle: "Contribuciones clave",
      viewLink: "Ver ↗",
      modules: [
        { id: "home", label: "Home", desc: "Dashboard principal y punto de entrada de la intranet", url: "" },
        { id: "roles", label: "Roles", desc: "Gestión y visualización de roles del sistema", url: "" },
        { id: "permisos", label: "Permisos", desc: "Control de accesos y permisos por módulo", url: "" },
        { id: "trabajadores", label: "Trabajadores", desc: "Administración de personal y perfiles", url: "" },
        { id: "pqrs", label: "PQRS", desc: "Peticiones, quejas, reclamos y sugerencias", url: "" },
        { id: "learndash", label: "LearnDash", desc: "Módulo de formación y capacitación interna", url: "" },
      ],
      contributions: [
        "Modo oscuro",
        "Estandarización visual",
        "Tablas y filtros optimizados",
        "Despliegues a producción",
        "Pruebas funcionales",
        "Corrección de incidencias",
      ],
    },
    about: {
      label: "01 — Sobre mí",
      title1: "Código con alma,",
      title2: "diseño con propósito",
      p1: "Desarrollador de software enfocado en frontend, con experiencia en la intranet Connect One, desarrollo web full stack y construcción de interfaces modernas, dinámicas y responsivas.",
      p2: "He desarrollado productos para clientes reales — como Raíz Viajera y Las Piedras Minca, ambos en producción — y PawClinic Admin, sistema interno veterinario vendido a una clínica real. También Ouija AI, demo multi-agente con Gemini API. Manejo Vue 3, Quasar, Astro, Supabase, React Native y TypeScript, además de backend con Node.js y Express.",
      p3: "Experiencia con bases de datos SQL y NoSQL — MySQL, MariaDB, PostgreSQL y MongoDB — despliegue en Render, y herramientas como Git, GitHub y Postman. Metodologías ágiles con Scrum.",
      tags: ["ES / EN", "Remoto / Presencial", "Junior → Mid", "Scrum"],
      playground: {
        filename: "PortfolioCard.vue",
        livePreview: "Live preview",
        previewLabel: "Preview",
        ariaLabel: "Demostración de código en vivo con vista previa",
        code: `<template>
  <article class="card">
    <span class="badge">En producción</span>
    <h3>Raíz Viajera</h3>
    <p>Mapa GPX · Barichara</p>
    <button @click="book">Reservar →</button>
  </article>
</template>

<style scoped>
.card {
  background: #18181b;
  border: 1px solid #34d39944;
  border-radius: 1rem;
  padding: 1.5rem;
}
.badge {
  color: #34d399;
  font-size: 0.65rem;
}
</style>`,
        preview: {
          waiting: "// esperando código…",
          badge: "En producción",
          title: "Raíz Viajera",
          subtitle: "Mapa GPX · Barichara",
          cta: "Reservar →",
        },
      },
    },
    skills: {
      label: "02 — Habilidades",
      title: "Stack técnico",
      subtitle:
        "Herramientas del ecosistema que uso en proyectos reales — no solo frameworks, sino arquitectura frontend de verdad.",
      categories: [
        { emoji: "🚀", title: "Core Frontend", skills: ["Vue 3", "Quasar", "Astro", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vite", "Bootstrap"] },
        { emoji: "⚡", title: "State & APIs", skills: ["Pinia", "Axios", "REST APIs", "API Consumption", "Supabase", "PokéAPI", "Gemini API"] },
        { emoji: "📊", title: "Charts & Visualization", skills: ["ApexCharts", "Vue3-ApexCharts"] },
        { emoji: "🛠", title: "Backend & Tools", skills: ["Node.js", "Express", "npm / pnpm", "Git", "GitHub", "Postman", "MySQL", "PostgreSQL", "MongoDB", "Supabase Auth & Realtime"] },
        { emoji: "🎨", title: "UI / UX", skills: ["UI Design", "UX Principles", "Responsive Design", "Mobile First", "Design Systems", "Wireframing", "Accessibility (a11y)", "Dark Mode"] },
        { emoji: "✨", title: "Animaciones & Extras", skills: ["CSS Animations", "GSAP", "SPA Development", "Component Architecture", "Performance Optimization", "React Native", "Expo", "Leaflet", "Schema.org / SEO", "Scrum"] },
      ],
    },
    projects: {
      label: "03 — Proyectos",
      title: "Trabajo seleccionado",
      subtitle:
        "Proyectos vendidos a clientes reales y desarrollo profesional. Hover para explorar — los enlaces abren el sitio en vivo.",
      featureLabel: "Feature destacada",
      liveLabel: "En producción",
      demoLabel: "Demo en vivo",
      items: [
        {
          ...SHARED_PROJECT_META["01"],
          title: "Raíz Viajera",
          subtitle: "Mapa interactivo de senderismo · Web + App móvil",
          highlight:
            "MapaRutas — 8 rutas trazadas sobre Leaflet con GPX reales: el visitante ve el recorrido exacto de cada caminata antes de reservar. Perfil de elevación, distancia, tiempo, desnivel, puntos de interés (miradores, ríos, spots fotográficos), enlace a Wikiloc y modo en vivo con ubicación del guía y fotos del tour sincronizadas vía Supabase Realtime.",
          desc: "Plataforma completa para una operadora de tours en Barichara, Colombia — en producción en raizviajera.com. Catálogo de experiencias bilingüe ES/EN, SEO optimizado, reseñas con Google OAuth, UX mobile-first y reservas por WhatsApp. Complementé el ecosistema con una app React Native/Expo para guías: tracking GPS, subida de fotos y sincronización en tiempo real.",
          role: "Full-stack — UI/UX, backend, app móvil y despliegue",
        },
        {
          ...SHARED_PROJECT_META["02"],
          title: "Las Piedras Minca",
          subtitle: "Landing de hospedaje ecológico · Vue 3 SPA",
          highlight:
            "SEO local y conversión — Schema.org (LodgingBusiness, FAQPage, TouristAttraction), meta geo con coordenadas GPS de Minca, sitemap con imágenes indexables y rich snippets. Mapa de ubicación con Google Maps embebido (ruta desde el centro de Minca hasta la cabaña), CTAs directos a Airbnb, WhatsApp e Instagram, y botón flotante de reserva siempre visible.",
          desc: "Landing page oficial de un eco-lodge artesanal en Minca, Colombia — en producción en cabañalaspiedrasminca.com. Cabañas talladas en roca viva junto al río, en la Sierra Nevada de Santa Marta. SPA en Vue 3 con diseño mobile-first, tipografía editorial y paleta cálida. Showcase de 6 espacios únicos, galería interactiva, experiencias del día y navegación bilingüe ES/EN con toggle en la misma página.",
          role: "Frontend completo — diseño UI/UX, componentes Vue, i18n, SEO y despliegue",
        },
        {
          ...SHARED_PROJECT_META["03"],
          title: "Pokédex Interactiva",
          subtitle: "Explorador Pokémon · JavaScript vanilla",
          highlight:
            "Consumo de PokéAPI v2 con fetch nativo — endpoints encadenados (/pokemon, /pokemon-species, /type) y Promise.all para peticiones en paralelo. Búsqueda por nombre o número, modo aleatorio, navegación con flechas y teclado, stats con barras animadas, debilidades calculadas dinámicamente y fondo que cambia según el tipo del Pokémon — todo con nombres en español.",
          desc: "SPA de una sola página sin frameworks ni build tools. Interfaz dark mode mobile-first con estados de carga y error, tipografía Outfit y CSS moderno (custom properties, color-mix, reduced motion). Demuestra manipulación del DOM dinámica, async/await e internacionalización manual desde la API.",
          displayUrl: "Demo en vivo",
          role: "Frontend — integración API REST, lógica de datos, UI interactiva",
        },
        {
          ...SHARED_PROJECT_META["04"],
          title: "Ouija AI",
          subtitle: "Conversación autónoma entre dos IAs · Gemini API",
          highlight:
            "Dos agentes con prompts separados (joven escéptico y entidad demoníaca) comparten el mismo historial y responden en turnos — Youth → Demon → Youth — con instrucciones anti-repetición y de respuesta directa al último mensaje. Modo auto-conversación, UI en tiempo real, toggle EN/ES y exportación PDF.",
          desc: "Demo web interactiva donde dos personalidades de IA conversan en vivo a través de una sesión de ouija. Cada turno se genera con Google Gemini API usando el contexto completo del diálogo, logrando conversación dinámica y contextual — no líneas guionadas. Backend Node.js/Express con fallback en memoria si MongoDB no está disponible y reintentos automáticos ante rate limits.",
          role: "Full-stack — orquestación de agentes, API, UI en tiempo real y despliegue",
        },
        {
          ...SHARED_PROJECT_META["05"],
          title: "PawClinic Admin",
          subtitle: "Sistema interno de gestión veterinaria · Vendido e implementado",
          highlight:
            "Dashboard operativo con estadísticas en tiempo real (total, abiertas, terminadas, anuladas), CRUD completo de citas, filtros por estado, búsqueda por mascota o propietario, cambio de estado desde cada tarjeta y persistencia en localStorage — pensado para el uso diario del personal de una clínica real.",
          desc: "Sistema interno B2B vendido e implementado en una clínica veterinaria. Permite agendar consultas con datos de mascota y propietario, validaciones de negocio (teléfono 10 dígitos, fechas futuras, horario 8:00–20:00, síntomas máx. 400 caracteres), numeración automática y feedback visual con SweetAlert2. Interfaz tipo SaaS con Bootstrap 5 y JavaScript vanilla.",
          displayUrl: "Demo en vivo",
          role: "Frontend completo — UI/UX, lógica de negocio, validaciones y entrega al cliente",
        },
      ],
    },
    experience: {
      label: "04 — Experiencia & Formación",
      title: "Mi trayectoria",
      coursesTitle: "Cursos & Certificaciones",
      items: [
        {
          year: "Prácticas",
          role: "Desarrollador Frontend · Connect One",
          company: "Intranet corporativa",
          detail:
            "Modernización de la plataforma: rediseño de Home, Roles, Permisos, Trabajadores, PQRS y LearnDash. Modo oscuro, estandarización visual, optimización de tablas/filtros/búsqueda, pruebas funcionales, corrección de incidencias y despliegues a producción con Vue 3 y Quasar.",
        },
        {
          year: "2024 — Presente",
          role: "Desarrollador Full-Stack · Proyectos para clientes",
          company: "Freelance & proyectos reales",
          detail:
            "Raíz Viajera (raizviajera.com): plataforma web + app móvil con MapaRutas. Las Piedras Minca: landing Vue 3 para eco-lodge. PawClinic Admin: sistema interno veterinario vendido e implementado con dashboard de citas, CRUD y localStorage.",
        },
        {
          year: "Ene 2024 — Jun 2025",
          role: "Desarrollador de Software Junior",
          company: "Enfoque Frontend · Formación profesional",
          detail:
            "Integración de APIs backend a frontend, arquitectura de componentes, diseño responsive y despliegue en Render. Metodologías ágiles con Scrum.",
        },
      ],
      courses: [
        "Python — Nivel intermedio",
        "SQL Total — Domina bases de datos",
        "JavaScript desde cero",
        "Git + GitHub",
        "FreeCodeCamp — Desarrollo Web & Responsive Design",
      ],
    },
    contact: {
      label: "05 — Contacto",
      title1: "¿Hacemos algo",
      title2: "increíble juntos?",
      subtitle:
        "Gracias por revisar mi trabajo en Connect One y en proyectos adicionales. Estoy listo para seguir aportando al equipo — escríbeme cuando quieras conversar.",
    },
    footer: "Felipe Landinez — Vue 3 · Quasar · GSAP",
    a11y: {
      skipToContent: "Saltar al contenido",
    },
    cursor: { visit: "Visitar →", view: "Ver →", send: "Enviar →" },
  },
  en: {
    nav: ["Connect One", "About", "Skills", "Projects", "Contact"],
    navIds: ["connect-one", "sobre-mi", "skills", "proyectos", "contacto"],
    hero: {
      taglines: [
        "Available for new projects",
        "Open to opportunities",
        "Ready to build with you",
      ],
      roles: [
        "Junior Frontend Developer",
        "Vue 3 & Quasar Specialist",
        "UI/UX Enthusiast",
        "Full Stack in progress",
      ],
      descriptions: [
        "Modern interfaces with Vue 3, Quasar and Vite.",
        "Hands-on experience with APIs, Pinia and Render deployment.",
        "Responsive design that converts and makes an impact.",
      ],
      ctaProjects: "View projects",
      ctaContact: "Contact me",
      scroll: "scroll ↓",
    },
    connect: {
      badge: "Professional internship",
      type: "Corporate intranet",
      subtitle: "My experience on the platform",
      p1: "During my time at Connect One, I contributed to modernizing and evolving the platform, focusing on frontend development and user experience improvements. I redesigned key modules, building more modern, responsive and efficient interfaces.",
      p2: "I implemented new features, optimized tables, forms, filters and search systems, and helped build dark mode and visual standardization across the system. I also participated in functional testing, bug fixes, production deployments and quality validation — ensuring a consistent, scalable experience for users.",
      modulesTitle: "Modules I worked on",
      contributionsTitle: "Key contributions",
      viewLink: "View ↗",
      modules: [
        { id: "home", label: "Home", desc: "Main dashboard and intranet entry point", url: "" },
        { id: "roles", label: "Roles", desc: "Role management and visualization", url: "" },
        { id: "permisos", label: "Permissions", desc: "Access control and module permissions", url: "" },
        { id: "trabajadores", label: "Employees", desc: "Staff administration and profiles", url: "" },
        { id: "pqrs", label: "PQRS", desc: "Requests, complaints and suggestions", url: "" },
        { id: "learndash", label: "LearnDash", desc: "Internal training and learning module", url: "" },
      ],
      contributions: [
        "Dark mode",
        "Visual standardization",
        "Optimized tables & filters",
        "Production deployments",
        "Functional testing",
        "Bug fixes",
      ],
    },
    about: {
      label: "01 — About me",
      title1: "Code with soul,",
      title2: "design with purpose",
      p1: "Software developer focused on frontend, with experience on the Connect One intranet, full stack web development and building modern, dynamic and responsive interfaces.",
      p2: "I've shipped products for real clients — including Raíz Viajera and Las Piedras Minca, both in production — and PawClinic Admin, a veterinary internal system sold to a real clinic. Also Ouija AI, a multi-agent Gemini API demo. I work with Vue 3, Quasar, Astro, Supabase, React Native and TypeScript, plus Node.js and Express on the backend.",
      p3: "Experience with SQL and NoSQL databases — MySQL, MariaDB, PostgreSQL and MongoDB — Render deployment, and tools like Git, GitHub and Postman. Agile methodologies with Scrum.",
      tags: ["ES / EN", "Remote / On-site", "Junior → Mid", "Scrum"],
      playground: {
        filename: "PortfolioCard.vue",
        livePreview: "Live preview",
        previewLabel: "Preview",
        ariaLabel: "Live code demo with preview panel",
        code: `<template>
  <article class="card">
    <span class="badge">In production</span>
    <h3>Raíz Viajera</h3>
    <p>GPX map · Barichara</p>
    <button @click="book">Book now →</button>
  </article>
</template>

<style scoped>
.card {
  background: #18181b;
  border: 1px solid #34d39944;
  border-radius: 1rem;
  padding: 1.5rem;
}
.badge {
  color: #34d399;
  font-size: 0.65rem;
}
</style>`,
        preview: {
          waiting: "// waiting for code…",
          badge: "In production",
          title: "Raíz Viajera",
          subtitle: "GPX map · Barichara",
          cta: "Book now →",
        },
      },
    },
    skills: {
      label: "02 — Skills",
      title: "Technical stack",
      subtitle:
        "Tools from the ecosystem I use on real projects — not just frameworks, but real frontend architecture.",
      categories: [
        { emoji: "🚀", title: "Core Frontend", skills: ["Vue 3", "Quasar", "Astro", "JavaScript", "TypeScript", "HTML5", "CSS3", "Vite", "Bootstrap"] },
        { emoji: "⚡", title: "State & APIs", skills: ["Pinia", "Axios", "REST APIs", "API Consumption", "Supabase", "PokéAPI", "Gemini API"] },
        { emoji: "📊", title: "Charts & Visualization", skills: ["ApexCharts", "Vue3-ApexCharts"] },
        { emoji: "🛠", title: "Backend & Tools", skills: ["Node.js", "Express", "npm / pnpm", "Git", "GitHub", "Postman", "MySQL", "PostgreSQL", "MongoDB", "Supabase Auth & Realtime"] },
        { emoji: "🎨", title: "UI / UX", skills: ["UI Design", "UX Principles", "Responsive Design", "Mobile First", "Design Systems", "Wireframing", "Accessibility (a11y)", "Dark Mode"] },
        { emoji: "✨", title: "Animations & Extras", skills: ["CSS Animations", "GSAP", "SPA Development", "Component Architecture", "Performance Optimization", "React Native", "Expo", "Leaflet", "Schema.org / SEO", "Scrum"] },
      ],
    },
    projects: {
      label: "03 — Projects",
      title: "Selected work",
      subtitle:
        "Client projects and professional development. Hover to explore — links open the live site.",
      featureLabel: "Featured",
      liveLabel: "In production",
      demoLabel: "Live demo",
      items: [
        {
          ...SHARED_PROJECT_META["01"],
          title: "Raíz Viajera",
          subtitle: "Interactive hiking map · Web + Mobile app",
          highlight:
            "MapaRutas — 8 routes on Leaflet with real GPX files: visitors see the exact trail before booking. Elevation profile, distance, time, elevation gain, points of interest (viewpoints, rivers, photo spots), Wikiloc link and live mode with guide location and tour photos synced via Supabase Realtime.",
          desc: "Full platform for a tour operator in Barichara, Colombia — live at raizviajera.com. Bilingual ES/EN experience catalog, SEO, Google OAuth reviews, mobile-first UX and WhatsApp bookings. Extended with a React Native/Expo app for guides: GPS tracking, photo uploads and real-time sync.",
          role: "Full-stack — UI/UX, backend, mobile app and deployment",
        },
        {
          ...SHARED_PROJECT_META["02"],
          title: "Las Piedras Minca",
          subtitle: "Eco-lodge landing page · Vue 3 SPA",
          highlight:
            "Local SEO & conversion — Schema.org (LodgingBusiness, FAQPage, TouristAttraction), geo meta with Minca GPS coordinates, indexable image sitemap and rich snippets. Embedded Google Maps (route from Minca center to the cabin), direct CTAs to Airbnb, WhatsApp and Instagram, and always-visible floating booking button.",
          desc: "Official landing page for an artisanal eco-lodge in Minca, Colombia — live at cabañalaspiedrasminca.com. Cabins carved into living rock by the river, in the Sierra Nevada de Santa Marta. Vue 3 SPA with mobile-first design, editorial typography and warm palette. Showcase of 6 unique spaces, interactive gallery, day experiences and ES/EN toggle on the same page.",
          role: "Full frontend — UI/UX, Vue components, i18n, SEO and deployment",
        },
        {
          ...SHARED_PROJECT_META["03"],
          title: "Interactive Pokédex",
          subtitle: "Pokémon explorer · Vanilla JavaScript",
          highlight:
            "PokéAPI v2 with native fetch — chained endpoints (/pokemon, /pokemon-species, /type) and Promise.all for parallel requests. Search by name or number, random mode, arrow and keyboard navigation, animated stat bars, dynamically calculated weaknesses and background that changes by Pokémon type — all with Spanish names.",
          desc: "Single-page SPA without frameworks or build tools. Mobile-first dark mode UI with loading and error states, Outfit typography and modern CSS (custom properties, color-mix, reduced motion). Demonstrates dynamic DOM manipulation, async/await and manual i18n from the API.",
          displayUrl: "Live demo",
          role: "Frontend — REST API integration, data logic, interactive UI",
        },
        {
          ...SHARED_PROJECT_META["04"],
          title: "Ouija AI",
          subtitle: "Autonomous dual-agent conversation · Gemini API",
          highlight:
            "Two agents with separate prompts (skeptical youth and demonic entity) share the same history and respond in turns — Youth → Demon → Youth — with anti-repetition and direct-reply instructions. Auto-conversation mode, real-time UI, EN/ES toggle and PDF export.",
          desc: "Interactive web demo where two AI personalities converse live through a Ouija session. Each turn is generated with Google Gemini API using full dialogue context — dynamic, contextual conversation, not scripted lines. Node.js/Express backend with in-memory fallback when MongoDB is unavailable and automatic retries on rate limits.",
          role: "Full-stack — agent orchestration, API, real-time UI and deployment",
        },
        {
          ...SHARED_PROJECT_META["05"],
          title: "PawClinic Admin",
          subtitle: "Veterinary management system · Sold & deployed",
          highlight:
            "Operational dashboard with real-time stats (total, open, completed, cancelled), full appointment CRUD, status filters, pet or owner search, status changes from each card and localStorage persistence — built for daily use by real clinic staff.",
          desc: "B2B internal system sold and deployed at a veterinary clinic. Schedule appointments with pet and owner data, business validations (10-digit phone, future dates, 8:00–20:00 hours, 400-char symptom limit), auto-numbering and SweetAlert2 feedback. SaaS-style interface with Bootstrap 5 and vanilla JavaScript.",
          displayUrl: "Live demo",
          role: "Full frontend — UI/UX, business logic, validations and client delivery",
        },
      ],
    },
    experience: {
      label: "04 — Experience & Education",
      title: "My journey",
      coursesTitle: "Courses & Certifications",
      items: [
        {
          year: "Internship",
          role: "Frontend Developer · Connect One",
          company: "Corporate intranet",
          detail:
            "Platform modernization: redesign of Home, Roles, Permissions, Employees, PQRS and LearnDash. Dark mode, visual standardization, table/filter/search optimization, functional testing, bug fixes and production deployments with Vue 3 and Quasar.",
        },
        {
          year: "2024 — Present",
          role: "Full-Stack Developer · Client projects",
          company: "Freelance & real-world work",
          detail:
            "Raíz Viajera (raizviajera.com): web platform + mobile app with MapaRutas. Las Piedras Minca: Vue 3 eco-lodge landing. PawClinic Admin: sold veterinary internal system with appointment dashboard, CRUD and localStorage.",
        },
        {
          year: "Jan 2024 — Jun 2025",
          role: "Junior Software Developer",
          company: "Frontend focus · Professional training",
          detail:
            "Backend-to-frontend API integration, component architecture, responsive design and Render deployment. Agile methodologies with Scrum.",
        },
      ],
      courses: [
        "Python — Intermediate level",
        "SQL Total — Master databases",
        "JavaScript from scratch",
        "Git + GitHub",
        "FreeCodeCamp — Web Development & Responsive Design",
      ],
    },
    contact: {
      label: "05 — Contact",
      title1: "Let's build something",
      title2: "amazing together?",
      subtitle:
        "Thanks for reviewing my work at Connect One and on additional projects. I'm ready to keep contributing to the team — reach out whenever you'd like to talk.",
    },
    footer: "Felipe Landinez — Vue 3 · Quasar · GSAP",
    a11y: {
      skipToContent: "Skip to content",
    },
    cursor: { visit: "Visit →", view: "View →", send: "Send →" },
  },
};
