"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   CODE REVEAL — fondo del hero

   Debajo del hero hay una capa con código a todo color. Encima, un canvas
   relleno del color de fondo que lo tapa. El puntero no dibuja: BORRA. Cada
   movimiento estampa salpicaduras que abren huecos, y por ahí asoma el
   código. El trazo se seca solo, así que el hero vuelve a su estado limpio
   en cuanto sueltas el mouse.

   Uso:
     <section className="relative isolate overflow-hidden">
       <CodeRevealHero />
       ...contenido con `relative z-10`
     </section>

   Se apaga solo en táctil (sin puntero no hay nada que pintar) y con
   prefers-reduced-motion.
──────────────────────────────────────────── */

type Props = {
  /** Grosor de la brocha en px. */
  brush?: number;
  /** Opacidad del velo: 1 tapa del todo, 0.9 deja intuir el código. */
  veil?: number;
  /** Velocidad a la que se seca el trazo, 0–100. En 0 se queda pintado. */
  fade?: number;
  /** Líneas que se ven al pintar. Por defecto, el cursor magnético. */
  code?: string[];
};

const DEFAULT_CODE = [
  '"use client";',
  "",
  'import { useEffect, useRef, useCallback } from "react";',
  'import gsap from "gsap";',
  "",
  "/* CUSTOM CURSOR — Living Portfolio */",
  "",
  "export default function MagneticCursor() {",
  "  const cursorRef = useRef(null);",
  "  const mouse = useRef({ x: 0, y: 0 });",
  "  const pos = useRef({ x: 0, y: 0 });",
  "",
  "  const lerp = (start, end, factor) =>",
  "    start + (end - start) * factor;",
  "",
  "  useEffect(() => {",
  '    document.body.style.cursor = "none";',
  "    const root = document.documentElement;",
  "",
  "    const loop = () => {",
  "      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);",
  "      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);",
  "",
  "      gsap.set(cursor, {",
  "        x: pos.current.x - cursor.offsetWidth / 2,",
  "        y: pos.current.y - cursor.offsetHeight / 2,",
  "      });",
  "",
  '      root.style.setProperty("--mouse-x", mouse.current.x + "px");',
  '      root.style.setProperty("--mouse-y", mouse.current.y + "px");',
  "",
  "      rafRef.current = requestAnimationFrame(loop);",
  "    };",
  "    rafRef.current = requestAnimationFrame(loop);",
  "",
  "    const onMouseMove = (e) => {",
  "      mouse.current = { x: e.clientX, y: e.clientY };",
  "    };",
  "",
  '    document.addEventListener("mousemove", onMouseMove);',
  "",
  "    return () => {",
  "      cancelAnimationFrame(rafRef.current);",
  '      document.removeEventListener("mousemove", onMouseMove);',
  "    };",
  "  }, []);",
  "}",
];

const BG = "5, 5, 5";
const LINE_H = 13 * 1.75;
const COL_W = 560;
const SPRITE_SIZE = 256;

const KEYWORDS =
  /\b(const|let|var|function|return|if|else|export|default|import|from|new|null|true|false|typeof|void|await|async)\b/g;

function escapeHtml(t: string) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Resaltado mínimo. Cada tramo ya coloreado se guarda aparte y se sustituye
 * por un carácter de uso privado, para que las reglas siguientes no lo
 * vuelvan a tocar; al final se devuelven todos a su sitio.
 */
function highlight(line: string) {
  const stash: string[] = [];
  let out = escapeHtml(line);

  const wrap = (re: RegExp, cls: string) => {
    out = out.replace(re, (m) => {
      stash.push(`<span class="crh-${cls}">${m}</span>`);
      return String.fromCharCode(0xe000 + stash.length - 1);
    });
  };

  wrap(/\/\/.*$|\/\*[\s\S]*?\*\//g, "c");
  wrap(/"[^"]*"|'[^']*'|`[^`]*`/g, "s");
  wrap(KEYWORDS, "k");
  wrap(/\b\d+\.?\d*\b/g, "n");
  wrap(/\b[A-Za-z_$][\w$]*(?=\s*\()/g, "f");
  wrap(/[{}()[\];,.]/g, "p");

  return out.replace(/[\ue000-\uefff]/g, (ch) => stash[ch.charCodeAt(0) - 0xe000]);
}

/**
 * Salpicadura. Ninguna figura calculada al vuelo da el borde que hace falta
 * —hilillos finos, motas sueltas, chorretones—, así que se generan unas
 * cuantas texturas al montar y después solo se estampan, que además es
 * baratísimo comparado con recalcular geometría en cada frame.
 */
function makeSplatter() {
  const c = document.createElement("canvas");
  c.width = SPRITE_SIZE;
  c.height = SPRITE_SIZE;
  const g = c.getContext("2d");
  if (!g) return c;

  const R = SPRITE_SIZE * 0.5;
  g.fillStyle = "#000";

  const blob = (x: number, y: number, r: number) => {
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  };

  // Núcleo: bolas grandes muy juntas, la masa del brochazo.
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = R * 0.4 * Math.pow(Math.random(), 0.55);
    blob(R + Math.cos(a) * d, R + Math.sin(a) * d, R * (0.16 + Math.random() * 0.28));
  }

  // Motas: el radio sigue una caída de potencia, muchísimas diminutas y unas
  // pocas medianas. Con radios uniformes queda un patrón de lunares.
  for (let j = 0; j < 110; j++) {
    const a = Math.random() * Math.PI * 2;
    const d = R * (0.42 + Math.pow(Math.random(), 0.7) * 0.55);
    blob(R + Math.cos(a) * d, R + Math.sin(a) * d, R * 0.1 * Math.pow(Math.random(), 2.4) + 0.5);
  }

  // Chorretones: cadenas de gotas que se adelgazan y se desvían hacia fuera.
  // Son los que dan el borde dendrítico.
  const drips = 4 + Math.floor(Math.random() * 4);
  for (let k = 0; k < drips; k++) {
    const ang = Math.random() * Math.PI * 2;
    const len = R * (0.45 + Math.random() * 0.5);
    const steps = 12 + Math.floor(Math.random() * 8);
    for (let st = 0; st < steps; st++) {
      const t = st / steps;
      const dd = R * 0.33 + len * t;
      const side = (Math.random() - 0.5) * R * 0.13 * t;
      blob(
        R + Math.cos(ang) * dd + Math.cos(ang + 1.5708) * side,
        R + Math.sin(ang) * dd + Math.sin(ang + 1.5708) * side,
        Math.max(0.5, R * 0.07 * (1 - t) * (0.6 + Math.random() * 0.7))
      );
    }
  }
  return c;
}

export default function CodeRevealHero({
  brush = 74,
  veil = 1,
  fade = 38,
  code = DEFAULT_CODE,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const cols = colsRef.current;
    const canvas = canvasRef.current;
    if (!root || !cols || !canvas) return;

    // Sin puntero no hay nada que pintar, y el código dejaría el titular
    // ilegible. Con movimiento reducido, tampoco.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = Array.from({ length: 4 }, makeSplatter);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let last: { x: number; y: number } | null = null;
    let lastStroke = 0;
    let dirty = false;
    let healAccum = 0;
    let raf = 0;

    const paintVeil = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${BG})`;
      ctx.fillRect(0, 0, W, H);
    };

    const renderCode = () => {
      const lines = Math.ceil(H / LINE_H) + 3;
      const columns = Math.ceil(W / COL_W) + 1;
      let html = "";
      for (let c = 0; c < columns; c++) {
        let block = "";
        for (let i = 0; i < lines; i++) {
          // Cada columna arranca en otro punto del archivo, si no se ven
          // como copias en espejo.
          block +=
            `<span class="crh-ln">${i + 1}</span>` +
            highlight(code[(i + c * 17) % code.length]) +
            "\n";
        }
        html += `<pre>${block}</pre>`;
      }
      cols.innerHTML = html;
    };

    const resize = () => {
      const r = root.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      if (W === 0 || H === 0) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintVeil();
      renderCode();
    };

    // Cada sello va girado al azar: con cuatro texturas y giro libre no se
    // repite un patrón reconocible por mucho que pintes.
    const stampAt = (x: number, y: number, r: number) => {
      const img = sprites[(Math.random() * sprites.length) | 0];
      const w = r * 2;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI * 2);
      ctx.drawImage(img, -w / 2, -w / 2, w, w);
      ctx.restore();
    };

    const scratch = (x: number, y: number, px: number, py: number) => {
      const dx = x - px;
      const dy = y - py;
      const dist = Math.hypot(dx, dy);

      ctx.globalCompositeOperation = "destination-out";

      // El paso va atado al tamaño de la brocha: lo justo para que el trazo
      // salga continuo sin estampar de más, que es lo que costaría frames.
      const steps = Math.max(1, Math.ceil(dist / Math.max(4, brush * 0.4)));

      // Adelgaza al barrer rápido, como un pincel al que le queda menos
      // pigmento por centímetro recorrido.
      const taper = 1 / (1 + dist / 170);

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        stampAt(px + dx * t, py + dy * t, brush * taper * (0.8 + Math.random() * 0.45));
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      // Fuera del hero se corta el trazo, para que al volver a entrar no
      // aparezca una línea recta cruzando la sección.
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        last = null;
        return;
      }

      if (last) {
        scratch(x, y, last.x, last.y);
        lastStroke = performance.now();
        dirty = true;
      }
      last = { x, y };
    };

    const loop = () => {
      // Si no hay nada pintado no hay nada que secar: el bucle no toca el
      // canvas y el efecto no cuesta un solo frame mientras el visitante
      // lee, que es la mayor parte del tiempo que pasa en el hero.
      if (fade > 0 && dirty) {
        // Se repinta el velo con poca opacidad: lo pintado hace más rato
        // lleva más capas encima, así que la cola se apaga sola y el trazo
        // parece secarse detrás del pincel.
        healAccum += Math.pow(fade / 100, 2.2) * 0.2 + 0.002;

        // El canvas guarda 8 bits por canal: por debajo de ~2/255 el
        // resultado redondea al valor que ya había y no acumula nunca. Se
        // junta opacidad hasta pasar el umbral y se aplica de una.
        if (healAccum >= 0.06) {
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = `rgba(${BG},${Math.min(healAccum, 1).toFixed(4)})`;
          ctx.fillRect(0, 0, W, H);
          healAccum = 0;
        }

        // Por muchas capas que se echen encima, el redondeo deja un resto de
        // ~5% que no cierra nunca, y las zonas más transitadas guardarían un
        // fantasma permanente. Pasado el tiempo del secado sin pintar, se
        // repinta limpio: a esas alturas no queda nada perceptible.
        if (dirty && performance.now() - lastStroke > 2600) {
          paintVeil();
          dirty = false;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [brush, fade, code]);

  return (
    <div ref={rootRef} className="crh-root" aria-hidden="true">
      <style>{`
        .crh-root {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .crh-code {
          position: absolute;
          inset: 0;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 13px;
          line-height: 1.75;
          user-select: none;
          contain: layout paint;
        }
        .crh-cols {
          display: flex;
          gap: 46px;
          padding: 28px 32px;
          align-items: flex-start;
        }
        .crh-cols pre { margin: 0; white-space: pre; flex: 0 0 auto; }
        .crh-ln {
          display: inline-block;
          width: 2.6em;
          text-align: right;
          margin-right: 1.6em;
          color: #2c3a35;
          font-variant-numeric: tabular-nums;
        }
        .crh-k { color: #34d399; }
        .crh-s { color: #d5a86b; }
        .crh-n { color: #7dd3fc; }
        .crh-c { color: #4b5f58; font-style: italic; }
        .crh-f { color: #e2e8f0; }
        .crh-p { color: #6b7f78; }

        /* El velo: relleno del color de fondo, con los huecos que abre la brocha. */
        .crh-veil {
          position: absolute;
          inset: 0;
          opacity: ${veil};
        }

        @media (hover: none), (pointer: coarse) {
          .crh-root { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .crh-root { display: none; }
        }
      `}</style>

      <div className="crh-code">
        <div ref={colsRef} className="crh-cols" />
      </div>
      <canvas ref={canvasRef} className="crh-veil" />
    </div>
  );
}
