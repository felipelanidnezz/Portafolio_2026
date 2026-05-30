# Portafolio 2026 — Felipe Landinez

Portfolio profesional con cursor magnético, bilingüe ES/EN y proyectos reales.

**Live:** https://felipelanidnezz.github.io/Portafolio_2026/

## Stack

- Next.js 16 (App Router, static export)
- React 19 · TypeScript · Tailwind CSS 4
- GSAP (cursor magnético)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Build para GitHub Pages

```bash
# Windows PowerShell
$env:GITHUB_PAGES="true"; npm run build

# Linux / macOS
GITHUB_PAGES=true npm run build
```

El export estático queda en `out/`.

## Proyectos incluidos

| Proyecto | Ubicación |
|----------|-----------|
| **Portafolio** | Raíz (Next.js) |
| **PawClinic** | `public/pawclinic/` |
| **Pokédex** | `public/pokedex.html` |
| **Ouija AI** | `ouija-ai/` (Node.js + Gemini API) |

### Ouija AI — correr localmente

```bash
cd ouija-ai
npm install
# Crea .env con GEMINI_API_KEY=tu_key
npm start
```

## Deploy

El workflow `.github/workflows/deploy.yml` construye y publica automáticamente en cada push a `main`.

> En GitHub → Settings → Pages, el source debe ser **GitHub Actions**.

## Contacto

- Email: thomasacosta71@gmail.com
- LinkedIn: [felipelandinez](https://www.linkedin.com/in/felipelandinez)
- GitHub: [felipelanidnezz](https://github.com/felipelanidnezz)
