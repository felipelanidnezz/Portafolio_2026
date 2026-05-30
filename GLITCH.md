# Deploy Ouija AI en Glitch (gratis, sin tarjeta)

## Paso 1 — Importar en Glitch

1. Abre [glitch.com](https://glitch.com) e inicia sesión (con GitHub).
2. **New Project** → **Import from GitHub**.
3. Pega: `https://github.com/felipelanidnezz/Portafolio_2026`
4. Elige la rama **`glitch`** (archivos de Ouija en la raíz del repo).
5. Renombra el proyecto a **`ouija-ai-felipe`**  
   (URL final: `https://ouija-ai-felipe.glitch.me`)

## Paso 2 — API Key

1. En Glitch: **Tools** (abajo) → **Secrets** → **Add Secret**
2. Key: `GEMINI_API_KEY`
3. Value: tu key de [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

Glitch crea el archivo `.env` automáticamente.

## Paso 3 — Verificar

1. Pulsa **Show** (preview) en Glitch.
2. Abre `https://ouija-ai-felipe.glitch.me`
3. Debe decir **AI active** (punto verde).
4. Pulsa **Youth's Turn** — debe responder la IA.

## Paso 4 — Portafolio

El portafolio en GitHub Pages ya apunta a:
`https://ouija-ai-felipe.glitch.me`

Demo: https://felipelanidnezz.github.io/Portafolio_2026/ouija-ai/

---

### Notas

- Glitch **se duerme** tras inactividad; la primera petición tarda ~10–20 s.
- Si cambias el nombre del proyecto en Glitch, avisa para actualizar el meta tag del portafolio.
- **PawClinic** sigue en GitHub Pages, no necesita Glitch.
