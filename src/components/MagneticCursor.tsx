"use client";

import { useEffect, useRef, useCallback, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────
   CUSTOM CURSOR — Living Portfolio

   Uso:
   1. Agrega <MagneticCursor /> una sola vez en tu layout.tsx (root)
   2. En cualquier botón o link interactivo, envuelve con <MagneticButton>
      data-cursor="text"           → el cursor muestra texto (ej: "Ver →")
      data-cursor-text="Abrir"     → texto personalizado
──────────────────────────────────────────── */

type CursorState = "default" | "hover" | "text" | "click" | "hidden";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const currentTarget = useRef<Element | null>(null);
  const rafRef = useRef<number | null>(null);

  const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const glowVisible = useRef(false);

  const setCursorState = useCallback((state: CursorState) => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    const text = textRef.current;
    if (!cursor || !dot || !text) return;

    const glowScale = state === "hover" || state === "text" ? 1.25 : 1;
    const glowOpacity = state === "hidden" ? 0 : state === "hover" || state === "text" ? 1 : 0.85;

    if (glow) {
      gsap.to(glow, {
        scale: glowScale,
        opacity: glowOpacity,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    switch (state) {
      case "default":
        gsap.to(cursor, {
          width: 40,
          height: 40,
          borderWidth: 1.5,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(dot, { width: 6, height: 6, opacity: 1, duration: 0.2 });
        gsap.to(text, { opacity: 0, scale: 0.8, duration: 0.2 });
        break;
      case "hover":
        gsap.to(cursor, {
          width: 64,
          height: 64,
          borderWidth: 1,
          opacity: 0.85,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(dot, { width: 4, height: 4, opacity: 0.6, duration: 0.2 });
        gsap.to(text, { opacity: 0, scale: 0.8, duration: 0.2 });
        break;
      case "text":
        gsap.to(cursor, {
          width: 72,
          height: 72,
          borderWidth: 0,
          backgroundColor: "rgba(255,255,255,0.12)",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(dot, { width: 0, height: 0, opacity: 0, duration: 0.2 });
        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: 0.05,
        });
        break;
      case "click":
        gsap.to(cursor, {
          scale: 0.75,
          duration: 0.1,
          ease: "power3.out",
          yoyo: true,
          repeat: 1,
        });
        break;
      case "hidden":
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        if (glow) gsap.to(glow, { opacity: 0, duration: 0.2 });
        break;
    }
  }, []);

  const activateTarget = useCallback(
    (el: HTMLElement) => {
      currentTarget.current = el;
      const cursorType = el.dataset.cursor;
      if (cursorType === "text") {
        const customText = el.dataset.cursorText || "Ver →";
        if (textRef.current) textRef.current.textContent = customText;
        setCursorState("text");
      } else {
        setCursorState("hover");
      }
    },
    [setCursorState]
  );

  const deactivateTarget = useCallback(() => {
    currentTarget.current = null;
    setCursorState("default");
  }, [setCursorState]);

  useEffect(() => {
    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!cursor || !dot) return;

    gsap.set([cursor, dot], { x: -100, y: -100 });
    if (glow) gsap.set(glow, { x: -500, y: -500, opacity: 0 });

    const root = document.documentElement;
    root.style.setProperty("--mouse-x", "50vw");
    root.style.setProperty("--mouse-y", "50vh");

    const loop = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.12);
      glowPos.current.x = lerp(glowPos.current.x, mouse.current.x, 0.07);
      glowPos.current.y = lerp(glowPos.current.y, mouse.current.y, 0.07);

      gsap.set(cursor, {
        x: pos.current.x - cursor.offsetWidth / 2,
        y: pos.current.y - cursor.offsetHeight / 2,
      });

      if (glow) {
        gsap.set(glow, {
          x: glowPos.current.x - glow.offsetWidth / 2,
          y: glowPos.current.y - glow.offsetHeight / 2,
        });
      }

      root.style.setProperty("--mouse-x", `${mouse.current.x}px`);
      root.style.setProperty("--mouse-y", `${mouse.current.y}px`);

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      gsap.set(dot, {
        x: e.clientX - dot.offsetWidth / 2,
        y: e.clientY - dot.offsetHeight / 2,
      });

      if (glow && !glowVisible.current) {
        glowVisible.current = true;
        gsap.to(glow, { opacity: 0.85, duration: 0.4 });
      }
    };

    const onMouseDown = () => setCursorState("click");
    const onMouseUp = () => {
      if (!currentTarget.current) setCursorState("default");
    };

    const onMouseLeave = () => setCursorState("hidden");
    const onMouseEnter = () => setCursorState("default");

    const onTargetEnter = (e: Event) => {
      activateTarget(e.currentTarget as HTMLElement);
    };
    const onTargetLeave = () => {
      deactivateTarget();
    };

    const onLinkEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (!el.closest("[data-magnetic]")) setCursorState("hover");
    };
    const onLinkLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (!el.closest("[data-magnetic]")) setCursorState("default");
    };

    const targets = document.querySelectorAll("[data-magnetic]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onTargetEnter);
      el.addEventListener("mouseleave", onTargetLeave);
    });

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onLinkEnter);
      el.addEventListener("mouseleave", onLinkLeave);
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) {
      document.body.style.cursor = "auto";
      gsap.set([cursor, dot], { opacity: 0 });
      if (glow) gsap.set(glow, { opacity: 0 });
      root.style.removeProperty("--mouse-x");
      root.style.removeProperty("--mouse-y");
    }

    const isFocusable = (el: Element | null) =>
      el instanceof HTMLElement &&
      el.matches(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );

    const onFocusIn = (e: FocusEvent) => {
      if (isFocusable(e.target as Element)) {
        document.body.classList.add("keyboard-nav");
        setCursorState("hidden");
      }
    };

    const onFocusOut = () => {
      requestAnimationFrame(() => {
        if (!isFocusable(document.activeElement)) {
          document.body.classList.remove("keyboard-nav");
          if (!reducedMotion.matches) setCursorState("default");
        }
      });
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      document.body.style.cursor = "auto";
      document.body.classList.remove("keyboard-nav");
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      root.style.removeProperty("--mouse-x");
      root.style.removeProperty("--mouse-y");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onTargetEnter);
        el.removeEventListener("mouseleave", onTargetLeave);
      });
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onLinkEnter);
        el.removeEventListener("mouseleave", onLinkLeave);
      });
    };
  }, [activateTarget, deactivateTarget, setCursorState]);

  return (
    <>
      <div className="cursor-spotlight" aria-hidden="true" />

      <div ref={glowRef} className="cursor-glow-trail" aria-hidden="true" />

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.7)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      >
        <span
          ref={textRef}
          style={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.05em",
            color: "white",
            opacity: 0,
            transform: "scale(0.8)",
            userSelect: "none",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, sans-serif",
          }}
        />
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "white",
          pointerEvents: "none",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />
    </>
  );
}

type MagneticStrength = "true" | "strong";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: MagneticStrength;
  cursorText?: string | null;
  className?: string;
  style?: CSSProperties;
}

export function MagneticButton({
  children,
  strength = "true",
  cursorText = null,
  className = "",
  style = {},
}: MagneticButtonProps) {
  return (
    <div
      data-magnetic={strength}
      data-cursor={cursorText ? "text" : undefined}
      data-cursor-text={cursorText || undefined}
      className={className}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </div>
  );
}
