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

type ConnectScreenshot = {
  id: string;
  label: string;
  image: string;
  caption: string;
  width?: number;
  height?: number;
};

export type ConnectShowcaseData = Pick<
  ConnectProduct,
  "showcaseTitle" | "privateAccess" | "showcaseNote" | "browserUrl" | "screenshots"
>;

type ConnectProduct = {
  title: string;
  badge: string;
  type: string;
  subtitle: string;
  p1: string;
  p2: string;
  showcaseTitle: string;
  privateAccess: string;
  showcaseNote: string;
  modulesTitle: string;
  contributionsTitle: string;
  viewLink: string;
  browserUrl: string;
  modules: ConnectModule[];
  screenshots: ConnectScreenshot[];
  contributions: string[];
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
    navIntranet: string;
    navClientes: string;
    navPrev: string;
    navNext: string;
    expandHint: string;
    expandLabel: string;
    closeLabel: string;
    intranet: ConnectProduct;
    clientes: ConnectProduct;
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
      game: {
        title: string;
        waiting: string;
        pressStart: string;
        score: string;
        lives: string;
        level: string;
        hi: string;
        gameOver: string;
        youWin: string;
        levelClear: string;
        controls: string;
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
    expandHint: string;
    expandLabel: string;
    closeLabel: string;
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
    browserUrl: "raizviajera.com",
    live: true,
    featured: true,
    galleryAccent: "emerald",
    screenshots: [
      {
        id: "hero",
        label: "Home",
        image: `${BASE}/projects/raiz-viajera/hero.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "tours",
        label: "Tours",
        image: `${BASE}/projects/raiz-viajera/tours.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "mapa-rutas",
        label: "MapaRutas",
        image: `${BASE}/projects/raiz-viajera/mapa-rutas.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "galeria",
        label: "Galería",
        image: `${BASE}/projects/raiz-viajera/galeria.png`,
        width: 1440,
        height: 900,
      },
    ],
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
    browserUrl: "cabañalaspiedrasminca.com",
    live: true,
    featured: true,
    galleryAccent: "amber",
    screenshots: [
      {
        id: "hero",
        label: "Home",
        image: `${BASE}/projects/las-piedras-minca/hero.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "historia",
        label: "Historia",
        image: `${BASE}/projects/las-piedras-minca/historia.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "espacios",
        label: "Espacios",
        image: `${BASE}/projects/las-piedras-minca/espacios.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "galeria",
        label: "Galería",
        image: `${BASE}/projects/las-piedras-minca/galeria.png`,
        width: 1440,
        height: 900,
      },
    ],
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
    browserUrl: "Demo · Pokédex",
    galleryAccent: "red",
    galleryPreviewBg: "#121218",
    screenshots: [
      {
        id: "pikachu",
        label: "Pikachu",
        image: `${BASE}/projects/pokedex/pikachu.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "nidoran",
        label: "Nidoran♀",
        image: `${BASE}/projects/pokedex/nidoran.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "charizard",
        label: "Charizard",
        image: `${BASE}/projects/pokedex/charizard.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "gengar",
        label: "Gengar",
        image: `${BASE}/projects/pokedex/gengar.png`,
        width: 1440,
        height: 900,
      },
    ],
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
    browserUrl: "Demo · Ouija AI",
    live: true,
    galleryAccent: "violet",
    galleryPreviewBg: "#0a0612",
    screenshots: [
      {
        id: "home-es",
        label: "Home ES",
        image: `${BASE}/projects/ouija-ai/home-es.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "controles-es",
        label: "Controles",
        image: `${BASE}/projects/ouija-ai/controles-es.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "chat-en",
        label: "Chat EN",
        image: `${BASE}/projects/ouija-ai/chat-en.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "sesion-en",
        label: "Sesión EN",
        image: `${BASE}/projects/ouija-ai/sesion-en.png`,
        width: 1440,
        height: 900,
      },
    ],
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
    browserUrl: "Demo · PawClinic Admin",
    live: true,
    featuredBottom: true,
    galleryAccent: "cyan",
    galleryPreviewBg: "#eef2f7",
    screenshots: [
      {
        id: "dashboard",
        label: "Dashboard",
        image: `${BASE}/projects/pawclinic/dashboard-vacio.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "citas",
        label: "Citas",
        image: `${BASE}/projects/pawclinic/citas.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "eliminar",
        label: "Eliminar",
        image: `${BASE}/projects/pawclinic/eliminar-modal.png`,
        width: 1440,
        height: 900,
      },
      {
        id: "detalle",
        label: "Detalle",
        image: `${BASE}/projects/pawclinic/cita-detalle.png`,
        width: 1440,
        height: 900,
      },
    ],
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
      navIntranet: "Connect One",
      navClientes: "Connect One Clientes",
      navPrev: "Intranet",
      navNext: "Clientes",
      expandHint: "Ampliar",
      expandLabel: "Ampliar captura de pantalla",
      closeLabel: "Cerrar ✕",
      intranet: {
        title: "Connect One",
        badge: "Prácticas profesionales",
        type: "Intranet corporativa",
        subtitle: "Mi experiencia en la plataforma",
        p1: "Durante mi experiencia en Connect One participé en la modernización y evolución de la plataforma, enfocándome en el desarrollo frontend y la mejora de la experiencia de usuario. Trabajé en el rediseño de módulos clave, desarrollando interfaces más modernas, responsivas y eficientes.",
        p2: "Implementé nuevas funcionalidades, optimicé tablas, formularios, filtros y sistemas de búsqueda, además de contribuir en la creación del modo oscuro y la estandarización visual del sistema. También participé en pruebas funcionales, corrección de incidencias, despliegues a producción y validación de calidad, asegurando una experiencia consistente y escalable para los usuarios.",
        showcaseTitle: "Capturas del producto",
        privateAccess: "Acceso corporativo privado",
        showcaseNote:
          "Sin enlace público. La plataforma requiere credenciales internas. Capturas autorizadas del entorno de trabajo; demo disponible bajo NDA en entrevista.",
        browserUrl: "connect-one.internal",
        modulesTitle: "Módulos en los que trabajé",
        contributionsTitle: "Contribuciones clave",
        viewLink: "Ver ↗",
        modules: [
          { id: "roles", label: "Roles", desc: "CRUD de roles, búsqueda y gestión de permisos del sistema", url: "" },
          { id: "trabajadores", label: "Trabajadores", desc: "Listado de personal con filtros, exportación y acciones por registro", url: "" },
          { id: "anuncios", label: "Tablero de anuncios", desc: "Comunicaciones internas con estados, fechas de vigencia y multimedia", url: "" },
          { id: "jerarquias", label: "Jerarquías", desc: "Estructura organizacional interactiva de campañas, leads y equipos", url: "" },
          { id: "ausencias", label: "Panel de ausencias", desc: "Control de novedades de personal con filtros por campaña y calendario", url: "" },
        ],
        screenshots: [
          {
            id: "roles",
            label: "Roles",
            image: `${BASE}/connect-one/roles.png`,
            width: 1024,
            height: 503,
            caption:
              "Administración de roles del sistema: creación, búsqueda, edición y asignación de permisos.",
          },
          {
            id: "trabajadores",
            label: "Trabajadores",
            image: `${BASE}/connect-one/trabajadores.png`,
            width: 1024,
            height: 500,
            caption:
              "Listado de personal con búsqueda avanzada, filtros por estado, exportación y acciones CRUD.",
          },
          {
            id: "anuncios",
            label: "Anuncios",
            image: `${BASE}/connect-one/anuncios.png`,
            width: 1024,
            height: 500,
            caption:
              "Tablero de anuncios internos con control de vigencia, estado activo y gestión multimedia.",
          },
          {
            id: "jerarquias",
            label: "Jerarquías",
            image: `${BASE}/connect-one/jerarquias.png`,
            width: 1024,
            height: 502,
            caption:
              "Organigrama interactivo de campañas y equipos con zoom, métricas y acciones por nodo.",
          },
          {
            id: "ausencias",
            label: "Ausencias",
            image: `${BASE}/connect-one/ausencias.png`,
            width: 1024,
            height: 495,
            caption:
              "Panel de ausencias con resumen de solicitudes, filtros por campaña/fecha y vista calendario.",
          },
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
      clientes: {
        title: "Connect One Clientes",
        badge: "Trabajo actual",
        type: "Portal de clientes",
        subtitle: "Dashboard para clientes y supervisores",
        p1: "Actualmente desarrollo Connect One Clientes, el portal donde clientes y supervisores monitorean la actividad de sus equipos en tiempo real desde un dashboard unificado.",
        p2: "Estoy desarrollando Calendario con Google Calendar, Productividad/Analytics con ApexCharts, y Mi cuenta (perfil, actividad, seguridad y facturas), además del home y tours guiados de onboarding.",
        showcaseTitle: "Capturas del producto",
        privateAccess: "Acceso corporativo privado",
        showcaseNote:
          "Proyecto en desarrollo activo. Capturas del entorno de staging; demo disponible bajo NDA en entrevista.",
        browserUrl: "app.connectone.com",
        modulesTitle: "Funcionalidades del portal",
        contributionsTitle: "En lo que estoy trabajando",
        viewLink: "Ver ↗",
        modules: [
          { id: "home", label: "Home", desc: "Saludo personalizado, métricas clave, equipos, reuniones del día, mini calendario y facturas pendientes.", url: "" },
          { id: "calendario", label: "Calendario", desc: "Resumen mensual de eventos, festivos y ausencias. Vistas Mes/Semana/Día/Lista, filtros, creación de reuniones/ausencias/permisos e integración con Google Calendar para sincronizar eventos.", url: "" },
          { id: "empleados", label: "Empleados", desc: "Tabla de horarios y eventos del equipo: estado activo/inactivo, cumplimiento del día, ausencias y próximo evento por empleado.", url: "" },
          { id: "productividad", label: "Productividad / Analytics", desc: "Panel de métricas con selector de equipos, KPIs (horas, meta, productividad), gráfico de tendencia mensual, radar rendimiento vs capacidad y ranking de puntualidad semanal.", url: "" },
          { id: "perfil", label: "Mi cuenta / Perfil", desc: "Resumen de tareas y proyectos completados, datos personales editables, lista de actividad con progreso y filtros, cambio de contraseña en seguridad y facturas con estado y descarga PDF.", url: "" },
        ],
        screenshots: [
          {
            id: "home",
            label: "Home",
            image: `${BASE}/connect-one/clientes/home-dashboard.png`,
            width: 1024,
            height: 497,
            caption:
              "Dashboard principal con métricas, equipos, reuniones, calendario, analíticas y facturas en una sola vista.",
          },
          {
            id: "calendario",
            label: "Calendario",
            image: `${BASE}/connect-one/clientes/calendario.png`,
            width: 1024,
            height: 496,
            caption:
              "Gestión de calendario con mini-calendario, filtros, festivos USA/Colombia y botón Connect Google para sincronizar con Google Calendar.",
          },
          {
            id: "empleados",
            label: "Empleados",
            image: `${BASE}/connect-one/clientes/empleados-calendario.png`,
            width: 1024,
            height: 365,
            caption:
              "Vista de empleados con horarios, estado del día, ausencias y próximos eventos del equipo.",
          },
          {
            id: "productividad",
            label: "Analytics",
            image: `${BASE}/connect-one/clientes/analytics.png`,
            width: 1024,
            height: 497,
            caption:
              "Dashboard de productividad con KPIs, gráfico de horas trabajadas, radar de rendimiento y selector de equipos.",
          },
          {
            id: "perfil",
            label: "Mi cuenta",
            image: `${BASE}/connect-one/clientes/perfil.png`,
            width: 1024,
            height: 498,
            caption:
              "Perfil personal con detalles de cuenta, lista de actividad con progreso, pestañas de seguridad y facturación.",
          },
        ],
        contributions: [
          "Integración Google Calendar",
          "Dashboard de analytics",
          "Mi cuenta / Perfil",
          "Tours guiados",
          "Gráficos ApexCharts",
          "Facturas y seguridad",
        ],
      },
    },
    about: {
      label: "01 · Sobre mí",
      title1: "Código con alma,",
      title2: "diseño con propósito",
      p1: "Desarrollador de software enfocado en frontend, con experiencia en la intranet Connect One, desarrollo web full stack y construcción de interfaces modernas, dinámicas y responsivas.",
      p2: "He desarrollado productos para clientes reales, como Raíz Viajera y Las Piedras Minca, ambos en producción, y PawClinic Admin, un sistema interno veterinario vendido a una clínica real. Tengo conocimiento en herramientas como Vue 3, Quasar, Astro, Supabase, React Native y TypeScript, además de backend con Node.js y Express.",
      p3: "Experiencia con bases de datos SQL y NoSQL (MySQL, MariaDB, PostgreSQL y MongoDB), despliegue en Render, y herramientas como Git, GitHub y Postman. Metodologías ágiles con Scrum.",
      tags: ["ES / EN", "Remoto / Presencial", "Junior → Mid", "Scrum"],
      playground: {
        filename: "ArcadeInvaders.vue",
        livePreview: "Live preview",
        previewLabel: "Preview",
        ariaLabel: "Demostración de juego arcade en vivo",
        game: {
          title: "NEON INVADERS",
          waiting: "// preview…",
          pressStart: "▶ ESPACIO / CLICK PARA JUGAR",
          score: "SCORE",
          lives: "VIDAS",
          level: "NIV",
          hi: "HI",
          gameOver: "GAME OVER",
          youWin: "¡GANASTE! 10 NIVELES",
          levelClear: "NIVEL",
          controls: "← → mover · espacio disparar · click en pantalla",
        },
      },
    },
    skills: {
      label: "02 · Habilidades",
      title: "Stack técnico",
      subtitle:
        "Herramientas del ecosistema que uso en proyectos reales: no solo frameworks, sino arquitectura frontend de verdad.",
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
      label: "03 · Proyectos",
      title: "Trabajo seleccionado",
      subtitle:
        "Proyectos vendidos a clientes reales y desarrollo profesional. Hover para explorar; los enlaces abren el sitio en vivo.",
      featureLabel: "Feature destacada",
      liveLabel: "En producción",
      demoLabel: "Demo en vivo",
      expandHint: "Ampliar",
      expandLabel: "Ampliar captura del proyecto",
      closeLabel: "Cerrar ✕",
      items: [
        {
          ...SHARED_PROJECT_META["01"],
          title: "Raíz Viajera",
          subtitle: "Mapa interactivo de senderismo · Web + App móvil",
          highlight:
            "MapaRutas: 8 rutas trazadas sobre Leaflet con GPX reales. El visitante ve el recorrido exacto de cada caminata antes de reservar. Perfil de elevación, distancia, tiempo, desnivel, puntos de interés (miradores, ríos, spots fotográficos), enlace a Wikiloc y modo en vivo con ubicación del guía y fotos del tour sincronizadas vía Supabase Realtime.",
          desc: "Plataforma completa para una operadora de tours en Barichara, Colombia, en producción en raizviajera.com. Catálogo de experiencias bilingüe ES/EN, SEO optimizado, reseñas con Google OAuth, UX mobile-first y reservas por WhatsApp. Complementé el ecosistema con una app React Native/Expo para guías: tracking GPS, subida de fotos y sincronización en tiempo real.",
          role: "Full-stack · UI/UX, backend, app móvil y despliegue",
        },
        {
          ...SHARED_PROJECT_META["02"],
          title: "Las Piedras Minca",
          subtitle: "Landing de hospedaje ecológico · Vue 3 SPA",
          highlight:
            "SEO local y conversión: Schema.org (LodgingBusiness, FAQPage, TouristAttraction), meta geo con coordenadas GPS de Minca, sitemap con imágenes indexables y rich snippets. Mapa de ubicación con Google Maps embebido (ruta desde el centro de Minca hasta la cabaña), CTAs directos a Airbnb, WhatsApp e Instagram, y botón flotante de reserva siempre visible.",
          desc: "Landing page oficial de un eco-lodge artesanal en Minca, Colombia, en producción en cabañalaspiedrasminca.com. Cabañas talladas en roca viva junto al río, en la Sierra Nevada de Santa Marta. SPA en Vue 3 con diseño mobile-first, tipografía editorial y paleta cálida. Showcase de 6 espacios únicos, galería interactiva, experiencias del día y navegación bilingüe ES/EN con toggle en la misma página.",
          role: "Frontend completo · diseño UI/UX, componentes Vue, i18n, SEO y despliegue",
        },
        {
          ...SHARED_PROJECT_META["03"],
          title: "Pokédex Interactiva",
          subtitle: "Explorador Pokémon · JavaScript vanilla",
          highlight:
            "Consumo de PokéAPI v2 con fetch nativo: endpoints encadenados (/pokemon, /pokemon-species, /type) y Promise.all para peticiones en paralelo. Búsqueda por nombre o número, modo aleatorio, navegación con flechas y teclado, stats con barras animadas, debilidades calculadas dinámicamente y fondo que cambia según el tipo del Pokémon, todo con nombres en español.",
          desc: "SPA de una sola página sin frameworks ni build tools. Interfaz dark mode mobile-first con estados de carga y error, tipografía Outfit y CSS moderno (custom properties, color-mix, reduced motion). Demuestra manipulación del DOM dinámica, async/await e internacionalización manual desde la API.",
          displayUrl: "Demo en vivo",
          role: "Frontend · integración API REST, lógica de datos, UI interactiva",
        },
        {
          ...SHARED_PROJECT_META["04"],
          title: "Ouija AI",
          subtitle: "Conversación autónoma entre dos IAs · Gemini API",
          highlight:
            "Dos agentes con prompts separados (joven escéptico y entidad demoníaca) comparten el mismo historial y responden en turnos (Youth → Demon → Youth), con instrucciones anti-repetición y de respuesta directa al último mensaje. Modo auto-conversación, UI en tiempo real, toggle EN/ES y exportación PDF.",
          desc: "Proyecto personal: demo web interactiva donde dos personalidades de IA conversan en vivo a través de una sesión de ouija. Cada turno se genera con Google Gemini API usando el contexto completo del diálogo, logrando conversación dinámica y contextual, no líneas guionadas. Backend Node.js/Express con fallback en memoria si MongoDB no está disponible y reintentos automáticos ante rate limits.",
          role: "Full-stack · orquestación de agentes, API, UI en tiempo real y despliegue",
        },
        {
          ...SHARED_PROJECT_META["05"],
          title: "PawClinic Admin",
          subtitle: "Sistema interno de gestión veterinaria · Vendido e implementado",
          highlight:
            "Dashboard operativo con estadísticas en tiempo real (total, abiertas, terminadas, anuladas), CRUD completo de citas, filtros por estado, búsqueda por mascota o propietario, cambio de estado desde cada tarjeta y persistencia en localStorage, pensado para el uso diario del personal de una clínica real.",
          desc: "Sistema interno B2B vendido e implementado en una clínica veterinaria. Permite agendar consultas con datos de mascota y propietario, validaciones de negocio (teléfono 10 dígitos, fechas futuras, horario 8:00–20:00, síntomas máx. 400 caracteres), numeración automática y feedback visual con SweetAlert2. Interfaz tipo SaaS con Bootstrap 5 y JavaScript vanilla.",
          displayUrl: "Demo en vivo",
          role: "Frontend completo · UI/UX, lógica de negocio, validaciones y entrega al cliente",
        },
      ],
    },
    experience: {
      label: "04 · Experiencia & Formación",
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
          year: "2024 / Presente",
          role: "Desarrollador Full-Stack · Proyectos para clientes",
          company: "Freelance & proyectos reales",
          detail:
            "Raíz Viajera (raizviajera.com): plataforma web + app móvil con MapaRutas. Las Piedras Minca: landing Vue 3 para eco-lodge. PawClinic Admin: sistema interno veterinario vendido e implementado con dashboard de citas, CRUD y localStorage.",
        },
        {
          year: "Ene 2024 / Jun 2025",
          role: "Desarrollador de Software Junior",
          company: "Enfoque Frontend · Formación profesional",
          detail:
            "Integración de APIs backend a frontend, arquitectura de componentes, diseño responsive y despliegue en Render. Metodologías ágiles con Scrum.",
        },
      ],
      courses: [
        "Python · Nivel intermedio",
        "SQL Total · Domina bases de datos",
        "JavaScript desde cero",
        "Git + GitHub",
        "FreeCodeCamp · Desarrollo Web & Responsive Design",
      ],
    },
    contact: {
      label: "05 · Contacto",
      title1: "¿Hacemos algo",
      title2: "increíble juntos?",
      subtitle:
        "Escríbeme cuando quieras conversar.",
    },
    footer: "Felipe Landinez · Vue 3 · Quasar · GSAP",
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
      navIntranet: "Connect One",
      navClientes: "Connect One Clientes",
      navPrev: "Intranet",
      navNext: "Clients",
      expandHint: "Expand",
      expandLabel: "Expand screenshot",
      closeLabel: "Close ✕",
      intranet: {
        title: "Connect One",
        badge: "Professional internship",
        type: "Corporate intranet",
        subtitle: "My experience on the platform",
        p1: "During my time at Connect One, I contributed to modernizing and evolving the platform, focusing on frontend development and user experience improvements. I redesigned key modules, building more modern, responsive and efficient interfaces.",
        p2: "I implemented new features, optimized tables, forms, filters and search systems, and helped build dark mode and visual standardization across the system. I also participated in functional testing, bug fixes, production deployments and quality validation, ensuring a consistent, scalable experience for users.",
        showcaseTitle: "Product screenshots",
        privateAccess: "Private corporate access",
        showcaseNote:
          "No public link. The platform requires internal credentials. Authorized work-environment screenshots; live demo available under NDA upon request.",
        browserUrl: "connect-one.internal",
        modulesTitle: "Modules I worked on",
        contributionsTitle: "Key contributions",
        viewLink: "View ↗",
        modules: [
          { id: "roles", label: "Roles", desc: "Role CRUD, search and system permission management", url: "" },
          { id: "trabajadores", label: "Employees", desc: "Staff listing with filters, export and per-record actions", url: "" },
          { id: "anuncios", label: "Announcements", desc: "Internal communications with status, availability dates and media", url: "" },
          { id: "jerarquias", label: "Hierarchies", desc: "Interactive org structure for campaigns, leads and teams", url: "" },
          { id: "ausencias", label: "Absence panel", desc: "Personnel leave tracking with campaign filters and calendar view", url: "" },
        ],
        screenshots: [
          {
            id: "roles",
            label: "Roles",
            image: `${BASE}/connect-one/roles.png`,
            width: 1024,
            height: 503,
            caption:
              "System role administration: create, search, edit and assign permissions.",
          },
          {
            id: "trabajadores",
            label: "Employees",
            image: `${BASE}/connect-one/trabajadores.png`,
            width: 1024,
            height: 500,
            caption:
              "Staff listing with advanced search, status filters, export and CRUD actions.",
          },
          {
            id: "anuncios",
            label: "Announcements",
            image: `${BASE}/connect-one/anuncios.png`,
            width: 1024,
            height: 500,
            caption:
              "Internal announcements board with availability windows, active status and media management.",
          },
          {
            id: "jerarquias",
            label: "Hierarchies",
            image: `${BASE}/connect-one/jerarquias.png`,
            width: 1024,
            height: 502,
            caption:
              "Interactive campaign and team org chart with zoom, metrics and per-node actions.",
          },
          {
            id: "ausencias",
            label: "Absences",
            image: `${BASE}/connect-one/ausencias.png`,
            width: 1024,
            height: 495,
            caption:
              "Absence panel with request summary, campaign/date filters and calendar view.",
          },
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
      clientes: {
        title: "Connect One Clientes",
        badge: "Current work",
        type: "Client portal",
        subtitle: "Dashboard for clients and supervisors",
        p1: "I'm currently building Connect One Clientes, the portal where clients and supervisors monitor their teams' activity in real time from a unified dashboard.",
        p2: "I'm building Calendar with Google Calendar integration, Productivity/Analytics with ApexCharts, and My Account (profile, activity, security and invoices), plus the home dashboard and guided onboarding tours.",
        showcaseTitle: "Product screenshots",
        privateAccess: "Private corporate access",
        showcaseNote:
          "Actively in development. Staging-environment screenshots; live demo available under NDA upon request.",
        browserUrl: "app.connectone.com",
        modulesTitle: "Portal features",
        contributionsTitle: "What I'm working on",
        viewLink: "View ↗",
        modules: [
          { id: "home", label: "Home", desc: "Personalized greeting, key metrics, teams, today's meetings, mini calendar and pending invoices.", url: "" },
          { id: "calendario", label: "Calendar", desc: "Monthly overview of events, holidays and absences. Month/Week/Day/List views, filters, event creation and Google Calendar integration to sync events.", url: "" },
          { id: "empleados", label: "Employees", desc: "Team schedules table: active/inactive status, on-schedule tracking, absences and next event per employee.", url: "" },
          { id: "productividad", label: "Productivity / Analytics", desc: "Metrics panel with team selector, KPIs (hours, goal, productivity), monthly trend chart, performance vs capacity radar and weekly punctuality ranking.", url: "" },
          { id: "perfil", label: "My account / Profile", desc: "Completed tasks and projects summary, editable personal details, activity list with progress and filters, password change in security tab, and invoices with status and PDF download.", url: "" },
        ],
        screenshots: [
          {
            id: "home",
            label: "Home",
            image: `${BASE}/connect-one/clientes/home-dashboard.png`,
            width: 1024,
            height: 497,
            caption:
              "Main dashboard with metrics, teams, meetings, calendar, analytics and invoices in one view.",
          },
          {
            id: "calendario",
            label: "Calendar",
            image: `${BASE}/connect-one/clientes/calendario.png`,
            width: 1024,
            height: 496,
            caption:
              "Calendar management with mini-calendar, filters, US/Colombia holidays and Connect Google button to sync with Google Calendar.",
          },
          {
            id: "empleados",
            label: "Employees",
            image: `${BASE}/connect-one/clientes/empleados-calendario.png`,
            width: 1024,
            height: 365,
            caption:
              "Employee view with schedules, daily status, absences and upcoming team events.",
          },
          {
            id: "productividad",
            label: "Analytics",
            image: `${BASE}/connect-one/clientes/analytics.png`,
            width: 1024,
            height: 497,
            caption:
              "Productivity dashboard with KPIs, hours worked chart, performance radar and team selector.",
          },
          {
            id: "perfil",
            label: "My account",
            image: `${BASE}/connect-one/clientes/perfil.png`,
            width: 1024,
            height: 498,
            caption:
              "Personal profile with account details, activity list with progress, security and billing tabs.",
          },
        ],
        contributions: [
          "Google Calendar integration",
          "Analytics dashboard",
          "My account / Profile",
          "Guided tours",
          "ApexCharts visualizations",
          "Invoices & security",
        ],
      },
    },
    about: {
      label: "01 · About me",
      title1: "Code with soul,",
      title2: "design with purpose",
      p1: "Software developer focused on frontend, with experience on the Connect One intranet, full stack web development and building modern, dynamic and responsive interfaces.",
      p2: "I've shipped products for real clients, including Raíz Viajera and Las Piedras Minca, both in production, and PawClinic Admin, a veterinary internal system sold to a real clinic. I have knowledge of tools such as Vue 3, Quasar, Astro, Supabase, React Native and TypeScript, plus Node.js and Express on the backend.",
      p3: "Experience with SQL and NoSQL databases (MySQL, MariaDB, PostgreSQL and MongoDB), Render deployment, and tools like Git, GitHub and Postman. Agile methodologies with Scrum.",
      tags: ["ES / EN", "Remote / On-site", "Junior → Mid", "Scrum"],
      playground: {
        filename: "ArcadeInvaders.vue",
        livePreview: "Live preview",
        previewLabel: "Preview",
        ariaLabel: "Live arcade game preview",
        game: {
          title: "NEON INVADERS",
          waiting: "// preview…",
          pressStart: "▶ SPACE / CLICK TO PLAY",
          score: "SCORE",
          lives: "LIVES",
          level: "LV",
          hi: "HI",
          gameOver: "GAME OVER",
          youWin: "YOU WIN! 10 LEVELS",
          levelClear: "LEVEL",
          controls: "← → move · space shoot · click screen",
        },
      },
    },
    skills: {
      label: "02 · Skills",
      title: "Technical stack",
      subtitle:
        "Tools from the ecosystem I use on real projects: not just frameworks, but real frontend architecture.",
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
      label: "03 · Projects",
      title: "Selected work",
      subtitle:
        "Client projects and professional development. Hover to explore; links open the live site.",
      featureLabel: "Featured",
      liveLabel: "In production",
      demoLabel: "Live demo",
      expandHint: "Expand",
      expandLabel: "Expand project screenshot",
      closeLabel: "Close ✕",
      items: [
        {
          ...SHARED_PROJECT_META["01"],
          title: "Raíz Viajera",
          subtitle: "Interactive hiking map · Web + Mobile app",
          highlight:
            "MapaRutas: 8 routes on Leaflet with real GPX files. Visitors see the exact trail before booking. Elevation profile, distance, time, elevation gain, points of interest (viewpoints, rivers, photo spots), Wikiloc link and live mode with guide location and tour photos synced via Supabase Realtime.",
          desc: "Full platform for a tour operator in Barichara, Colombia, live at raizviajera.com. Bilingual ES/EN experience catalog, SEO, Google OAuth reviews, mobile-first UX and WhatsApp bookings. Extended with a React Native/Expo app for guides: GPS tracking, photo uploads and real-time sync.",
          role: "Full-stack · UI/UX, backend, mobile app and deployment",
        },
        {
          ...SHARED_PROJECT_META["02"],
          title: "Las Piedras Minca",
          subtitle: "Eco-lodge landing page · Vue 3 SPA",
          highlight:
            "Local SEO & conversion: Schema.org (LodgingBusiness, FAQPage, TouristAttraction), geo meta with Minca GPS coordinates, indexable image sitemap and rich snippets. Embedded Google Maps (route from Minca center to the cabin), direct CTAs to Airbnb, WhatsApp and Instagram, and always-visible floating booking button.",
          desc: "Official landing page for an artisanal eco-lodge in Minca, Colombia, live at cabañalaspiedrasminca.com. Cabins carved into living rock by the river, in the Sierra Nevada de Santa Marta. Vue 3 SPA with mobile-first design, editorial typography and warm palette. Showcase of 6 unique spaces, interactive gallery, day experiences and ES/EN toggle on the same page.",
          role: "Full frontend · UI/UX, Vue components, i18n, SEO and deployment",
        },
        {
          ...SHARED_PROJECT_META["03"],
          title: "Interactive Pokédex",
          subtitle: "Pokémon explorer · Vanilla JavaScript",
          highlight:
            "PokéAPI v2 with native fetch: chained endpoints (/pokemon, /pokemon-species, /type) and Promise.all for parallel requests. Search by name or number, random mode, arrow and keyboard navigation, animated stat bars, dynamically calculated weaknesses and background that changes by Pokémon type, all with Spanish names.",
          desc: "Single-page SPA without frameworks or build tools. Mobile-first dark mode UI with loading and error states, Outfit typography and modern CSS (custom properties, color-mix, reduced motion). Demonstrates dynamic DOM manipulation, async/await and manual i18n from the API.",
          displayUrl: "Live demo",
          role: "Frontend · REST API integration, data logic, interactive UI",
        },
        {
          ...SHARED_PROJECT_META["04"],
          title: "Ouija AI",
          subtitle: "Autonomous dual-agent conversation · Gemini API",
          highlight:
            "Two agents with separate prompts (skeptical youth and demonic entity) share the same history and respond in turns (Youth → Demon → Youth), with anti-repetition and direct-reply instructions. Auto-conversation mode, real-time UI, EN/ES toggle and PDF export.",
          desc: "Personal project: interactive web demo where two AI personalities converse live through a Ouija session. Each turn is generated with Google Gemini API using full dialogue context, dynamic and contextual conversation, not scripted lines. Node.js/Express backend with in-memory fallback when MongoDB is unavailable and automatic retries on rate limits.",
          role: "Full-stack · agent orchestration, API, real-time UI and deployment",
        },
        {
          ...SHARED_PROJECT_META["05"],
          title: "PawClinic Admin",
          subtitle: "Veterinary management system · Sold & deployed",
          highlight:
            "Operational dashboard with real-time stats (total, open, completed, cancelled), full appointment CRUD, status filters, pet or owner search, status changes from each card and localStorage persistence, built for daily use by real clinic staff.",
          desc: "B2B internal system sold and deployed at a veterinary clinic. Schedule appointments with pet and owner data, business validations (10-digit phone, future dates, 8:00–20:00 hours, 400-char symptom limit), auto-numbering and SweetAlert2 feedback. SaaS-style interface with Bootstrap 5 and vanilla JavaScript.",
          displayUrl: "Live demo",
          role: "Full frontend · UI/UX, business logic, validations and client delivery",
        },
      ],
    },
    experience: {
      label: "04 · Experience & Education",
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
          year: "2024 / Present",
          role: "Full-Stack Developer · Client projects",
          company: "Freelance & real-world work",
          detail:
            "Raíz Viajera (raizviajera.com): web platform + mobile app with MapaRutas. Las Piedras Minca: Vue 3 eco-lodge landing. PawClinic Admin: sold veterinary internal system with appointment dashboard, CRUD and localStorage.",
        },
        {
          year: "Jan 2024 / Jun 2025",
          role: "Junior Software Developer",
          company: "Frontend focus · Professional training",
          detail:
            "Backend-to-frontend API integration, component architecture, responsive design and Render deployment. Agile methodologies with Scrum.",
        },
      ],
      courses: [
        "Python · Intermediate level",
        "SQL Total · Master databases",
        "JavaScript from scratch",
        "Git + GitHub",
        "FreeCodeCamp · Web Development & Responsive Design",
      ],
    },
    contact: {
      label: "05 · Contact",
      title1: "Let's build something",
      title2: "amazing together?",
      subtitle:
        "Reach out whenever you'd like to talk.",
    },
    footer: "Felipe Landinez · Vue 3 · Quasar · GSAP",
    a11y: {
      skipToContent: "Skip to content",
    },
    cursor: { visit: "Visit →", view: "View →", send: "Send →" },
  },
};
