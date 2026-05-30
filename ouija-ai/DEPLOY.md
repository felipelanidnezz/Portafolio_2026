# Deploy Ouija AI en Vercel (gratis, sin tarjeta)

> Glitch cerró el hosting en julio 2025. **Vercel** es la alternativa recomendada.

## Pasos

1. Abre [vercel.com](https://vercel.com) → **Sign Up** con GitHub.
2. **Add New…** → **Project**.
3. Importa **`Portafolio_2026`**.
4. Configura:
   - **Root Directory:** `ouija-ai` ← importante
   - **Framework Preset:** Other
5. **Environment Variables:**
   - `GEMINI_API_KEY` = tu key de [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
6. **Deploy**.

## URL

Vercel te dará algo como:
`https://ouija-ai-felipe.vercel.app`

Si el nombre es distinto, avisa para actualizar el portafolio.

## Probar

- Backend: `https://TU-URL.vercel.app/server/status`
- UI completa: `https://TU-URL.vercel.app/`
- Desde portafolio: https://felipelanidnezz.github.io/Portafolio_2026/ouija-ai/

## Local

```bash
cd ouija-ai
npm install
# .env con GEMINI_API_KEY
npm start
```

## Otras opciones gratis (sin tarjeta)

| Plataforma | Notas |
|------------|--------|
| **Vercel** | Recomendada — ya configurada con `vercel.json` |
| **[Bonto](https://bonto.dev)** | Sucesor espiritual de Glitch, editor en navegador |
| **Render** | Free pero pide tarjeta (solo verificación) |
