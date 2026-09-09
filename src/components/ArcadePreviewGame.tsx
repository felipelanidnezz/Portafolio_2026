"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type GameLabels = {
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

type Alien = { x: number; y: number; alive: boolean; wobble: number };
type Bullet = { x: number; y: number; vy: number; fromPlayer: boolean };

const W = 280;
const H = 300;
const MAX_LEVEL = 10;

function getLevelConfig(level: number) {
  const lv = Math.min(Math.max(level, 1), MAX_LEVEL);
  return {
    rows: Math.min(2 + Math.ceil(lv / 2), 5),
    cols: Math.min(4 + Math.floor((lv - 1) / 2), 7),
    alienSpeed: 0.22 + lv * 0.075,
    shootChance: 0.005 + lv * 0.0045,
    maxEnemyBullets: Math.min(1 + Math.floor(lv / 2), 5),
    stepDown: 8 + Math.floor(lv / 3) * 2,
  };
}

export default function ArcadePreviewGame({
  ready,
  labels,
}: {
  ready: boolean;
  labels: GameLabels;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const keysRef = useRef({ left: false, right: false, shoot: false });
  const activeRef = useRef(false);
  const mouseXRef = useRef<number | null>(null);

  const stateRef = useRef({
    playerX: W / 2,
    aliens: [] as Alien[],
    bullets: [] as Bullet[],
    alienDir: 1,
    alienSpeed: 0.35,
    maxEnemyBullets: 2,
    shootChance: 0.01,
    stepDown: 10,
    tick: 0,
    score: 0,
    hi: 1240,
    lives: 3,
    level: 1,
    levelFlash: 0,
    phase: "boot" as "boot" | "ready" | "playing" | "over" | "win",
    blink: true,
    lastShot: 0,
    isAutoPlay: true, // Default: game plays automatically by itself!
    manualTimeout: 0,
  });

  const [hud, setHud] = useState({
    score: 0,
    lives: 3,
    hi: 1240,
    level: 1,
    phase: "boot" as string,
    isAutoPlay: true,
  });

  const spawnAliens = useCallback((level: number) => {
    const cfg = getLevelConfig(level);
    const aliens: Alien[] = [];
    const totalW = (cfg.cols - 1) * 40;
    const startX = (W - totalW) / 2;

    for (let row = 0; row < cfg.rows; row++) {
      for (let col = 0; col < cfg.cols; col++) {
        aliens.push({
          x: startX + col * 40,
          y: 36 + row * 30,
          alive: true,
          wobble: (row + col) * 0.4,
        });
      }
    }
    return aliens;
  }, []);

  const applyLevelConfig = useCallback(
    (level: number) => {
      const s = stateRef.current;
      const cfg = getLevelConfig(level);
      s.level = level;
      s.alienSpeed = cfg.alienSpeed;
      s.shootChance = cfg.shootChance;
      s.maxEnemyBullets = cfg.maxEnemyBullets;
      s.stepDown = cfg.stepDown;
      s.aliens = spawnAliens(level);
      s.bullets = [];
      s.alienDir = 1;
    },
    [spawnAliens]
  );

  const startPlaying = useCallback(
    (level = 1) => {
      const s = stateRef.current;
      activeRef.current = true;
      s.playerX = W / 2;
      s.phase = "playing";
      s.levelFlash = 0;
      applyLevelConfig(level);
      setHud((h) => ({ ...h, level, phase: "playing", isAutoPlay: s.isAutoPlay }));
    },
    [applyLevelConfig]
  );

  const fullReset = useCallback(() => {
    const s = stateRef.current;
    s.score = 0;
    s.lives = 3;
    s.level = 1;
    s.phase = "ready";
    s.playerX = W / 2;
    s.bullets = [];
    s.levelFlash = 0;
    s.aliens = spawnAliens(1);
    setHud({ score: 0, lives: 3, hi: s.hi, level: 1, phase: "ready", isAutoPlay: s.isAutoPlay });
  }, [spawnAliens]);

  const advanceLevel = useCallback(() => {
    const s = stateRef.current;
    if (s.level >= MAX_LEVEL) {
      s.phase = "win";
      setHud((h) => ({ ...h, phase: "win", score: s.score }));
      return;
    }
    const next = s.level + 1;
    applyLevelConfig(next);
    s.levelFlash = 100;
    setHud((h) => ({ ...h, level: next, score: s.score }));
  }, [applyLevelConfig]);

  // Transition to manual mode when user interacts
  const switchToManual = useCallback(() => {
    const s = stateRef.current;
    s.isAutoPlay = false;
    setHud((h) => ({ ...h, isAutoPlay: false }));

    if (s.phase === "ready" || s.phase === "over" || s.phase === "win") {
      fullReset();
      startPlaying(1);
    }
  }, [fullReset, startPlaying]);

  useEffect(() => {
    if (!ready) {
      stateRef.current.phase = "boot";
      setHud((h) => ({ ...h, phase: "boot" }));
      return;
    }

    stateRef.current.phase = "ready";
    stateRef.current.aliens = spawnAliens(1);
    startPlaying(1); // Auto-start game in demo autoplay mode!
  }, [ready, spawnAliens, startPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = panelRef.current;
    if (!canvas) return;

    const onKey = (e: KeyboardEvent, down: boolean) => {
      const gameKey =
        e.code === "ArrowLeft" ||
        e.code === "ArrowRight" ||
        e.code === "KeyA" ||
        e.code === "KeyD" ||
        e.code === "Space" ||
        e.code === "Enter";

      if (!gameKey) return;

      const engaged =
        activeRef.current ||
        document.activeElement === canvas ||
        Boolean(panel?.matches(":hover"));

      if (!engaged) return;

      e.preventDefault();
      e.stopPropagation();

      // Switch to manual player mode
      switchToManual();

      if (e.code === "ArrowLeft" || e.code === "KeyA") keysRef.current.left = down;
      if (e.code === "ArrowRight" || e.code === "KeyD") keysRef.current.right = down;
      if (e.code === "Space" || e.code === "Enter") {
        keysRef.current.shoot = down;
      }
    };

    const down = (e: KeyboardEvent) => onKey(e, true);
    const up = (e: KeyboardEvent) => onKey(e, false);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseXRef.current = ((e.clientX - rect.left) / rect.width) * W;
      if (stateRef.current.isAutoPlay && activeRef.current) {
        switchToManual();
      }
    };

    const onClick = () => {
      switchToManual();
      keysRef.current.shoot = true;
      setTimeout(() => {
        keysRef.current.shoot = false;
      }, 100);
    };

    document.addEventListener("keydown", down, true);
    document.addEventListener("keyup", up, true);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("keydown", down, true);
      document.removeEventListener("keyup", up, true);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [fullReset, startPlaying, switchToManual]);

  // Main Render & AutoPlay AI Loop
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

    let autoRestartTimer = 0;

    const loop = (time: number) => {
      const s = stateRef.current;
      s.tick += 0.016;
      s.blink = Math.floor(time / 500) % 2 === 0;

      ctx.fillStyle = "#030308";
      ctx.fillRect(0, 0, W, H);

      stars.forEach((st) => {
        const sy = (st.y + s.tick * 18 * st.s) % H;
        ctx.fillStyle = `rgba(255,255,255,${0.15 + st.s * 0.25})`;
        ctx.fillRect(st.x, sy, 1 + st.s, 1 + st.s);
      });

      if (!ready) {
        ctx.fillStyle = "#34d399";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.title, W / 2, H / 2 - 6);
        ctx.fillStyle = "#52525b";
        ctx.font = "9px monospace";
        ctx.fillText(labels.waiting, W / 2, H / 2 + 12);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      // Auto-start in autoplay if ready
      if (s.phase === "ready") {
        startPlaying(1);
      }

      // AutoPlay AI Bot Control
      if (s.isAutoPlay && s.phase === "playing") {
        const aliveAliens = s.aliens.filter((a) => a.alive);
        if (aliveAliens.length > 0) {
          // Track nearest alien cluster or lowest alien
          const target = aliveAliens.reduce(
            (best, cur) => (cur.y > best.y ? cur : best),
            aliveAliens[0]
          );

          // Dodge incoming enemy bullets
          const dangerBullet = s.bullets.find(
            (b) => !b.fromPlayer && Math.abs(b.x - s.playerX) < 22 && b.y > H - 100
          );

          let targetX = target.x;
          if (dangerBullet) {
            targetX = dangerBullet.x > W / 2 ? dangerBullet.x - 28 : dangerBullet.x + 28;
          }

          s.playerX += (targetX - s.playerX) * 0.08;

          // AI Shooting logic
          if (time - s.lastShot > 280) {
            s.bullets.push({ x: s.playerX, y: H - 36, vy: -5.5, fromPlayer: true });
            s.lastShot = time;
          }
        }
      }

      // Manual Control Updates
      if (!s.isAutoPlay && s.phase === "playing") {
        const speed = 3.6;
        if (keysRef.current.left) s.playerX -= speed;
        if (keysRef.current.right) s.playerX += speed;
        if (mouseXRef.current !== null && activeRef.current) {
          s.playerX += (mouseXRef.current - s.playerX) * 0.18;
        }

        if (keysRef.current.shoot && time - s.lastShot > 260) {
          s.bullets.push({ x: s.playerX, y: H - 36, vy: -5.5, fromPlayer: true });
          s.lastShot = time;
        }
      }

      s.playerX = Math.max(18, Math.min(W - 18, s.playerX));

      if (s.phase === "playing") {
        if (s.levelFlash > 0) s.levelFlash -= 1;

        if (s.levelFlash <= 0) {
          const alive = s.aliens.filter((a) => a.alive);
          if (alive.length > 0) {
            let edge = false;
            alive.forEach((a) => {
              a.x += s.alienDir * s.alienSpeed;
              if (a.x < 18 || a.x > W - 18) edge = true;
            });
            if (edge) {
              s.alienDir *= -1;
              alive.forEach((a) => {
                a.y += s.stepDown;
              });
            }

            const enemyBullets = s.bullets.filter((b) => !b.fromPlayer).length;
            if (
              enemyBullets < s.maxEnemyBullets &&
              Math.random() < s.shootChance
            ) {
              const shooter = alive[Math.floor(Math.random() * alive.length)];
              s.bullets.push({
                x: shooter.x,
                y: shooter.y + 12,
                vy: 2 + s.level * 0.15,
                fromPlayer: false,
              });
            }
          }

          s.bullets = s.bullets.filter((b) => b.y > -10 && b.y < H + 10);
          s.bullets.forEach((b) => {
            b.y += b.vy;
          });

          // Bullet collisions with aliens
          s.bullets.forEach((b) => {
            if (!b.fromPlayer) return;
            s.aliens.forEach((a) => {
              if (!a.alive) return;
              if (Math.abs(b.x - a.x) < 16 && Math.abs(b.y - a.y) < 14) {
                a.alive = false;
                b.y = -999;
                s.score += 10 * s.level;
                if (s.score > s.hi) {
                  s.hi = s.score;
                  setHud((h) => ({ ...h, hi: s.hi }));
                }
              }
            });
          });

          // Bullet collisions with player
          s.bullets.forEach((b) => {
            if (b.fromPlayer) return;
            if (Math.abs(b.x - s.playerX) < 16 && Math.abs(b.y - (H - 28)) < 12) {
              b.y = 999;
              s.lives -= 1;
              if (s.lives <= 0) {
                s.phase = "over";
                setHud({
                  score: s.score,
                  lives: 0,
                  hi: s.hi,
                  level: s.level,
                  phase: "over",
                  isAutoPlay: s.isAutoPlay,
                });
              } else {
                setHud((h) => ({ ...h, lives: s.lives }));
              }
            }
          });

          const remaining = s.aliens.filter((a) => a.alive);
          if (remaining.length === 0) {
            advanceLevel();
          } else if (remaining.some((a) => a.y > H - 68)) {
            s.phase = "over";
            setHud({
              score: s.score,
              lives: s.lives,
              hi: s.hi,
              level: s.level,
              phase: "over",
              isAutoPlay: s.isAutoPlay,
            });
          }
        }

        setHud((h) => ({ ...h, score: s.score, level: s.level }));
      }

      // Draw aliens
      s.aliens.forEach((a) => {
        if (!a.alive) return;
        drawInvader(a.x, a.y, s.tick * 4 + a.wobble, 20);
      });

      // Draw player ship
      if (s.phase === "playing" || s.phase === "ready") {
        ctx.shadowColor = s.isAutoPlay ? "#34d399" : "#22d3ee";
        ctx.shadowBlur = 12;
        ctx.fillStyle = s.isAutoPlay ? "#34d399" : "#22d3ee";
        ctx.beginPath();
        ctx.moveTo(s.playerX, H - 22);
        ctx.lineTo(s.playerX - 14, H - 6);
        ctx.lineTo(s.playerX + 14, H - 6);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw bullets
      s.bullets.forEach((b) => {
        ctx.fillStyle = b.fromPlayer ? "#fbbf24" : "#f87171";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fillRect(b.x - 2, b.y - 6, 4, 10);
        ctx.shadowBlur = 0;
      });

      // Level Flash
      if (s.levelFlash > 0) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fde047";
        ctx.font = "bold 13px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${labels.levelClear} ${s.level}`, W / 2, H / 2);
      }

      // Game Over Screen (auto reset in autoplay)
      if (s.phase === "over") {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#f87171";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.gameOver, W / 2, H / 2 - 10);

        if (s.isAutoPlay) {
          autoRestartTimer++;
          if (autoRestartTimer > 60) {
            autoRestartTimer = 0;
            fullReset();
            startPlaying(1);
          }
        } else if (s.blink) {
          ctx.fillStyle = "#a1a1aa";
          ctx.font = "8px monospace";
          ctx.fillText(labels.pressStart, W / 2, H / 2 + 14);
        }
      }

      // Win Screen (auto reset in autoplay)
      if (s.phase === "win") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#34d399";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(labels.youWin, W / 2, H / 2 - 6);

        if (s.isAutoPlay) {
          autoRestartTimer++;
          if (autoRestartTimer > 60) {
            autoRestartTimer = 0;
            fullReset();
            startPlaying(1);
          }
        }
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ready, labels, advanceLevel, fullReset, startPlaying]);

  return (
    <div
      ref={panelRef}
      className="arcade-cabinet flex h-full min-h-[360px] flex-col p-3 sm:min-h-[420px]"
    >
      {/* Cabinet Marquee Header */}
      <div className="arcade-marquee mb-2 flex items-center justify-between shrink-0 rounded-md px-3 py-1.5 text-center">
        <p className="font-mono text-[11px] font-bold tracking-[0.25em] text-fuchsia-200 sm:text-xs">
          ★ {labels.title} ★
        </p>
        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium tracking-tight ${
            hud.isAutoPlay
              ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 animate-pulse"
              : "border-cyan-500/50 bg-cyan-500/20 text-cyan-300"
          }`}
        >
          {hud.isAutoPlay ? "▶ AUTOPLAY" : "🎮 MANUAL"}
        </span>
      </div>

      {/* Arcade HUD Stats */}
      <div className="mb-2 grid shrink-0 grid-cols-4 gap-1 font-mono text-[8px] uppercase tracking-wider sm:text-[9px]">
        <span className="text-cyan-400">
          {labels.score} {String(hud.score).padStart(4, "0")}
        </span>
        <span className="text-center text-violet-300">
          {labels.level} {hud.level}/10
        </span>
        <span className="text-center text-rose-400">
          {labels.lives} {"♥".repeat(Math.max(0, hud.lives)) || "—"}
        </span>
        <span className="text-right text-amber-300">
          {labels.hi} {String(hud.hi).padStart(4, "0")}
        </span>
      </div>

      {/* Arcade CRT Screen */}
      <div className="arcade-screen relative mx-auto w-full max-w-[280px] flex-1">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          tabIndex={0}
          className="arcade-canvas h-auto w-full cursor-pointer rounded-sm outline-none focus:ring-2 focus:ring-emerald-400/40"
          aria-label={labels.title}
        />

        {hud.isAutoPlay && (
          <div className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[9px] text-emerald-400/90 drop-shadow">
            ✦ CLICK PARA JUGAR MANUALMENTE
          </div>
        )}

        <div className="arcade-scanlines pointer-events-none absolute inset-0 rounded-sm" aria-hidden="true" />
        <div className="arcade-screen-glare pointer-events-none absolute inset-0 rounded-sm" aria-hidden="true" />
      </div>

      <p className="mt-2 shrink-0 text-center font-mono text-[8px] uppercase tracking-widest text-zinc-500">
        {hud.isAutoPlay
          ? "Modo demo automático · Click en la pantalla para tomar el control"
          : labels.controls}
      </p>
    </div>
  );
}
