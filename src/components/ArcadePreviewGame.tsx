"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GameLabels = {
  title: string;
  waiting: string;
  pressStart: string;
  score: string;
  lives: string;
  hi: string;
  gameOver: string;
  youWin: string;
  controls: string;
};

type Alien = { x: number; y: number; alive: boolean; wobble: number };
type Bullet = { x: number; y: number; vy: number; fromPlayer: boolean };

const W = 280;
const H = 300;

export default function ArcadePreviewGame({
  ready,
  labels,
}: {
  ready: boolean;
  labels: GameLabels;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const keysRef = useRef({ left: false, right: false, shoot: false });
  const mouseXRef = useRef<number | null>(null);
  const stateRef = useRef({
    playerX: W / 2,
    aliens: [] as Alien[],
    bullets: [] as Bullet[],
    alienDir: 1,
    alienSpeed: 0.35,
    tick: 0,
    score: 0,
    hi: 1240,
    lives: 3,
    phase: "boot" as "boot" | "ready" | "playing" | "over" | "win",
    bootTimer: 0,
    blink: true,
    lastShot: 0,
  });

  const [hud, setHud] = useState({ score: 0, lives: 3, hi: 1240, phase: "boot" as string });

  const spawnAliens = useCallback(() => {
    const aliens: Alien[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        aliens.push({
          x: 36 + col * 44,
          y: 48 + row * 34,
          alive: true,
          wobble: (row + col) * 0.4,
        });
      }
    }
    return aliens;
  }, []);

  const resetRound = useCallback(() => {
    const s = stateRef.current;
    s.playerX = W / 2;
    s.aliens = spawnAliens();
    s.bullets = [];
    s.alienDir = 1;
    s.alienSpeed = 0.35 + Math.min(s.score / 500, 0.4);
    s.phase = "playing";
    setHud((h) => ({ ...h, phase: "playing" }));
  }, [spawnAliens]);

  const fullReset = useCallback(() => {
    const s = stateRef.current;
    s.score = 0;
    s.lives = 3;
    s.phase = "ready";
    s.playerX = W / 2;
    s.aliens = spawnAliens();
    s.bullets = [];
    setHud({ score: 0, lives: 3, hi: s.hi, phase: "ready" });
  }, [spawnAliens]);

  useEffect(() => {
    if (!ready) {
      stateRef.current.phase = "boot";
      stateRef.current.bootTimer = 0;
      setHud((h) => ({ ...h, phase: "boot" }));
      return;
    }

    if (stateRef.current.phase === "boot") {
      stateRef.current.phase = "ready";
      stateRef.current.aliens = spawnAliens();
      setHud((h) => ({ ...h, phase: "ready" }));
    }
  }, [ready, spawnAliens]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      if (["ArrowLeft", "ArrowRight", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key === "a") keysRef.current.left = down;
      if (e.key === "ArrowRight" || e.key === "d") keysRef.current.right = down;
      if (e.key === " " || e.key === "Enter") {
        keysRef.current.shoot = down;
        if (down && stateRef.current.phase === "ready") resetRound();
        if (down && (stateRef.current.phase === "over" || stateRef.current.phase === "win")) {
          fullReset();
        }
        e.preventDefault();
      }
    };

    const down = (e: KeyboardEvent) => onKey(e, true);
    const up = (e: KeyboardEvent) => onKey(e, false);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = ((e.clientX - rect.left) / rect.width) * W;
    };

    const onClick = () => {
      canvas.focus();
      const s = stateRef.current;
      if (s.phase === "ready") resetRound();
      if (s.phase === "over" || s.phase === "win") fullReset();
      else keysRef.current.shoot = true;
      setTimeout(() => {
        keysRef.current.shoot = false;
      }, 80);
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [fullReset, resetRound]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = Array.from({ length: 40 }, (_, i) => ({
      x: (i * 47) % W,
      y: (i * 29) % H,
      s: 0.3 + (i % 5) * 0.15,
    }));

    const drawInvader = (x: number, y: number, frame: number, size: number) => {
      const f = Math.floor(frame) % 2;
      ctx.fillStyle = "#34d399";
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 8;
      ctx.fillRect(x - size / 2, y - size / 3, size, size * 0.55);
      ctx.fillStyle = "#050505";
      ctx.shadowBlur = 0;
      const eyeY = y - 2;
      ctx.fillRect(x - size * 0.22 + f, eyeY, 4, 4);
      ctx.fillRect(x + size * 0.08 - f, eyeY, 4, 4);
      ctx.fillStyle = "#34d399";
      ctx.fillRect(x - size * 0.35, y + size * 0.15, size * 0.25, 3);
      ctx.fillRect(x + size * 0.1, y + size * 0.15, size * 0.25, 3);
    };

    const loop = (time: number) => {
      const s = stateRef.current;
      s.tick += 0.016;
      if (Math.floor(time / 500) % 2 === 0) s.blink = true;
      else s.blink = false;

      ctx.fillStyle = "#030308";
      ctx.fillRect(0, 0, W, H);

      stars.forEach((st) => {
        const sy = (st.y + s.tick * 18 * st.s) % H;
        ctx.fillStyle = `rgba(255,255,255,${0.15 + st.s * 0.25})`;
        ctx.fillRect(st.x, sy, 1 + st.s, 1 + st.s);
      });

      if (!ready) {
        ctx.fillStyle = "#52525b";
        ctx.font = "10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.waiting, W / 2, H / 2);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (s.phase === "boot") {
        s.bootTimer += 1;
        ctx.fillStyle = "#34d399";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText("NEON INVADERS", W / 2, H / 2 - 8);
        ctx.fillStyle = "#71717a";
        ctx.font = "9px monospace";
        ctx.fillText(`LOADING${".".repeat((Math.floor(s.bootTimer / 15) % 3) + 1)}`, W / 2, H / 2 + 12);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (s.phase === "playing") {
        const speed = 2.8;
        if (keysRef.current.left) s.playerX -= speed;
        if (keysRef.current.right) s.playerX += speed;
        if (mouseXRef.current !== null) {
          s.playerX += (mouseXRef.current - s.playerX) * 0.18;
        }
        s.playerX = Math.max(18, Math.min(W - 18, s.playerX));

        if (keysRef.current.shoot && time - s.lastShot > 280) {
          s.bullets.push({ x: s.playerX, y: H - 36, vy: -5.5, fromPlayer: true });
          s.lastShot = time;
        }

        const alive = s.aliens.filter((a) => a.alive);
        if (alive.length > 0) {
          let edge = false;
          alive.forEach((a) => {
            a.x += s.alienDir * s.alienSpeed;
            if (a.x < 20 || a.x > W - 20) edge = true;
          });
          if (edge) {
            s.alienDir *= -1;
            alive.forEach((a) => {
              a.y += 10;
            });
          }

          if (Math.random() < 0.012 && s.bullets.filter((b) => !b.fromPlayer).length < 2) {
            const shooter = alive[Math.floor(Math.random() * alive.length)];
            s.bullets.push({ x: shooter.x, y: shooter.y + 12, vy: 2.2, fromPlayer: false });
          }
        }

        s.bullets = s.bullets.filter((b) => b.y > -10 && b.y < H + 10);
        s.bullets.forEach((b) => {
          b.y += b.vy;
        });

        s.bullets.forEach((b) => {
          if (!b.fromPlayer) return;
          s.aliens.forEach((a) => {
            if (!a.alive) return;
            if (Math.abs(b.x - a.x) < 16 && Math.abs(b.y - a.y) < 14) {
              a.alive = false;
              b.y = -999;
              s.score += 10;
              if (s.score > s.hi) {
                s.hi = s.score;
                setHud((h) => ({ ...h, hi: s.hi }));
              }
            }
          });
        });

        s.bullets.forEach((b) => {
          if (b.fromPlayer) return;
          if (Math.abs(b.x - s.playerX) < 16 && Math.abs(b.y - (H - 28)) < 12) {
            b.y = 999;
            s.lives -= 1;
            if (s.lives <= 0) {
              s.phase = "over";
              setHud({ score: s.score, lives: 0, hi: s.hi, phase: "over" });
            } else {
              setHud((h) => ({ ...h, lives: s.lives }));
            }
          }
        });

        const remaining = s.aliens.filter((a) => a.alive);
        if (remaining.length === 0) {
          s.phase = "win";
          setHud((h) => ({ ...h, phase: "win", score: s.score }));
        } else if (remaining.some((a) => a.y > H - 70)) {
          s.phase = "over";
          setHud({ score: s.score, lives: s.lives, hi: s.hi, phase: "over" });
        }

        setHud((h) => ({ ...h, score: s.score }));
      }

      s.aliens.forEach((a) => {
        if (!a.alive) return;
        drawInvader(a.x, a.y, s.tick * 4 + a.wobble, 22);
      });

      if (s.phase === "playing" || s.phase === "ready") {
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#22d3ee";
        ctx.beginPath();
        ctx.moveTo(s.playerX, H - 22);
        ctx.lineTo(s.playerX - 14, H - 6);
        ctx.lineTo(s.playerX + 14, H - 6);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      s.bullets.forEach((b) => {
        ctx.fillStyle = b.fromPlayer ? "#fbbf24" : "#f87171";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fillRect(b.x - 2, b.y - 6, 4, 10);
        ctx.shadowBlur = 0;
      });

      if (s.phase === "ready" && s.blink) {
        ctx.fillStyle = "#fde047";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.pressStart, W / 2, H / 2);
      }

      if (s.phase === "over") {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#f87171";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.gameOver, W / 2, H / 2 - 6);
        if (s.blink) {
          ctx.fillStyle = "#a1a1aa";
          ctx.font = "8px monospace";
          ctx.fillText(labels.pressStart, W / 2, H / 2 + 12);
        }
      }

      if (s.phase === "win") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#34d399";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.youWin, W / 2, H / 2 - 6);
        if (s.blink) {
          ctx.fillStyle = "#a1a1aa";
          ctx.font = "8px monospace";
          ctx.fillText(labels.pressStart, W / 2, H / 2 + 12);
        }
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ready, labels, resetRound]);

  return (
    <div className="arcade-cabinet flex h-full min-h-[360px] flex-col p-3 sm:min-h-[420px]">
      <div className="arcade-marquee mb-2 shrink-0 rounded-md px-3 py-1.5 text-center">
        <p className="font-mono text-[11px] font-bold tracking-[0.35em] text-fuchsia-200 sm:text-xs">
          ★ {labels.title} ★
        </p>
      </div>

      <div className="mb-2 flex shrink-0 items-center justify-between font-mono text-[9px] uppercase tracking-wider">
        <span className="text-cyan-400">
          {labels.score} {String(hud.score).padStart(4, "0")}
        </span>
        <span className="text-rose-400">
          {labels.lives}{" "}
          {"♥".repeat(Math.max(0, hud.lives)) || "—"}
        </span>
        <span className="text-amber-300">
          {labels.hi} {String(hud.hi).padStart(4, "0")}
        </span>
      </div>

      <div className="arcade-screen relative mx-auto w-full max-w-[280px] flex-1">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          tabIndex={0}
          className="arcade-canvas h-auto w-full rounded-sm outline-none"
          aria-label={labels.title}
        />
        <div className="arcade-scanlines pointer-events-none absolute inset-0 rounded-sm" aria-hidden="true" />
        <div className="arcade-screen-glare pointer-events-none absolute inset-0 rounded-sm" aria-hidden="true" />
      </div>

      <p className="mt-2 shrink-0 text-center font-mono text-[8px] uppercase tracking-widest text-zinc-600">
        {labels.controls}
      </p>
    </div>
  );
}
