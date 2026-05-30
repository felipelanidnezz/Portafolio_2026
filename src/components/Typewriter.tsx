"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  sound?: boolean;
  soundActive?: boolean;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
  minChars?: number;
  startDelay?: number;
}

/* ── Sonido realista de máquina de escribir (Web Audio) ── */
function createTypewriterAudio() {
  let ctx: AudioContext | null = null;

  const getContext = () => {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  };

  const noiseBurst = (
    audio: AudioContext,
    t: number,
    opts: { duration: number; freq: number; vol: number; decay: number }
  ) => {
    const len = Math.floor(audio.sampleRate * opts.duration);
    const buffer = audio.createBuffer(1, len, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * opts.decay));
    }
    const src = audio.createBufferSource();
    src.buffer = buffer;
    const filter = audio.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = opts.freq;
    filter.Q.value = 1.2;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(opts.vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + opts.duration);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(audio.destination);
    src.start(t);
    src.stop(t + opts.duration);
  };

  const playKey = () => {
    try {
      const audio = getContext();
      const t = audio.currentTime;

      /* Golpe mecánico — cuerpo de la tecla */
      noiseBurst(audio, t, {
        duration: 0.035,
        freq: 2200 + Math.random() * 600,
        vol: 0.22,
        decay: 0.12,
      });

      /* Resonancia metálica */
      const metal = audio.createOscillator();
      const metalGain = audio.createGain();
      metal.type = "triangle";
      metal.frequency.value = 3400 + Math.random() * 800;
      metalGain.gain.setValueAtTime(0.04, t);
      metalGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
      metal.connect(metalGain);
      metalGain.connect(audio.destination);
      metal.start(t);
      metal.stop(t + 0.03);

      /* Golpe grave del martillo */
      const thud = audio.createOscillator();
      const thudGain = audio.createGain();
      thud.type = "sine";
      thud.frequency.setValueAtTime(110 + Math.random() * 30, t);
      thud.frequency.exponentialRampToValueAtTime(70, t + 0.05);
      thudGain.gain.setValueAtTime(0.18, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
      thud.connect(thudGain);
      thudGain.connect(audio.destination);
      thud.start(t);
      thud.stop(t + 0.06);

      /* Leve traqueteo del carro (aleatorio) */
      if (Math.random() > 0.75) {
        noiseBurst(audio, t + 0.008, {
          duration: 0.02,
          freq: 900,
          vol: 0.06,
          decay: 0.2,
        });
      }
    } catch {
      /* sin audio */
    }
  };

  const playSpace = () => {
    try {
      const audio = getContext();
      const t = audio.currentTime;

      noiseBurst(audio, t, {
        duration: 0.05,
        freq: 1400,
        vol: 0.2,
        decay: 0.15,
      });

      const bar = audio.createOscillator();
      const barGain = audio.createGain();
      bar.type = "sine";
      bar.frequency.value = 85;
      barGain.gain.setValueAtTime(0.25, t);
      barGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      bar.connect(barGain);
      barGain.connect(audio.destination);
      bar.start(t);
      bar.stop(t + 0.09);
    } catch {
      /* sin audio */
    }
  };

  const playBackspace = () => {
    try {
      const audio = getContext();
      const t = audio.currentTime;

      noiseBurst(audio, t, {
        duration: 0.025,
        freq: 1600,
        vol: 0.1,
        decay: 0.18,
      });

      const pull = audio.createOscillator();
      const pullGain = audio.createGain();
      pull.type = "sine";
      pull.frequency.setValueAtTime(200, t);
      pull.frequency.exponentialRampToValueAtTime(140, t + 0.04);
      pullGain.gain.setValueAtTime(0.1, t);
      pullGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      pull.connect(pullGain);
      pullGain.connect(audio.destination);
      pull.start(t);
      pull.stop(t + 0.05);
    } catch {
      /* sin audio */
    }
  };

  const playCarriageReturn = () => {
    try {
      const audio = getContext();
      const t = audio.currentTime;

      /* Campana al final de línea */
      const bell = audio.createOscillator();
      const bellGain = audio.createGain();
      bell.type = "sine";
      bell.frequency.value = 1318.5;
      bellGain.gain.setValueAtTime(0.12, t);
      bellGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      bell.connect(bellGain);
      bellGain.connect(audio.destination);
      bell.start(t);
      bell.stop(t + 0.4);

      /* Deslizamiento del carro */
      setTimeout(() => {
        try {
          const a = getContext();
          const ts = a.currentTime;
          noiseBurst(a, ts, {
            duration: 0.18,
            freq: 400,
            vol: 0.08,
            decay: 0.35,
          });
          const slide = a.createOscillator();
          const slideGain = a.createGain();
          slide.type = "sawtooth";
          slide.frequency.setValueAtTime(180, ts);
          slide.frequency.exponentialRampToValueAtTime(60, ts + 0.15);
          slideGain.gain.setValueAtTime(0.04, ts);
          slideGain.gain.exponentialRampToValueAtTime(0.001, ts + 0.16);
          slide.connect(slideGain);
          slideGain.connect(a.destination);
          slide.start(ts);
          slide.stop(ts + 0.17);
        } catch {
          /* sin audio */
        }
      }, 120);
    } catch {
      /* sin audio */
    }
  };

  return {
    playKey,
    playSpace,
    playBackspace,
    playCarriageReturn,
    resume: () => getContext(),
  };
}

type Phase = "waiting" | "typing" | "pause" | "deleting";

export default function Typewriter({
  texts,
  speed = 85,
  deleteSpeed = 45,
  pause = 2200,
  sound = true,
  soundActive = true,
  loop = true,
  className = "",
  cursorClassName = "",
  minChars,
  startDelay = 600,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(sound);
  const audioRef = useRef<ReturnType<typeof createTypewriterAudio> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundActiveRef = useRef(soundActive);

  useEffect(() => {
    soundActiveRef.current = soundActive;
  }, [soundActive]);

  const stateRef = useRef({
    textIndex: 0,
    charIndex: 0,
    phase: "waiting" as Phase,
    started: false,
  });

  const resumeAudio = useCallback(() => {
    audioRef.current?.resume();
  }, []);

  const longest = minChars ?? Math.max(...texts.map((t) => t.length), 1);

  useEffect(() => {
    audioRef.current = createTypewriterAudio();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayText(texts[0] ?? "");
      return;
    }

    if (!texts.length) return;

    stateRef.current = {
      textIndex: 0,
      charIndex: 0,
      phase: "waiting",
      started: false,
    };
    setDisplayText("");

    let cancelled = false;

    const jitter = (base: number) =>
      base + Math.floor(Math.random() * base * 0.45);

    const schedule = (fn: () => void, ms: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const playSoundForChar = (char: string, deleting: boolean) => {
      if (!soundEnabled || !soundActiveRef.current || !audioRef.current) return;
      if (deleting) {
        audioRef.current.playBackspace();
      } else if (char === " ") {
        audioRef.current.playSpace();
      } else {
        audioRef.current.playKey();
      }
    };

    const step = () => {
      const s = stateRef.current;
      const current = texts[s.textIndex] ?? "";

      if (!s.started) {
        s.started = true;
        s.phase = "typing";
        schedule(step, startDelay);
        return;
      }

      /* ── Escribiendo letra a letra ── */
      if (s.phase === "typing") {
        const nextIndex = s.charIndex + 1;
        const nextText = current.slice(0, nextIndex);
        const newChar = current[s.charIndex];

        s.charIndex = nextIndex;
        setDisplayText(nextText);
        if (newChar) playSoundForChar(newChar, false);

        if (nextIndex >= current.length) {
          if (texts.length === 1 && !loop) {
            return;
          }
          s.phase = "pause";
          schedule(step, pause);
        } else {
          schedule(step, jitter(speed));
        }
        return;
      }

      /* ── Pausa antes de borrar ── */
      if (s.phase === "pause") {
        if (soundEnabled && soundActiveRef.current) audioRef.current?.playCarriageReturn();
        s.phase = "deleting";
        schedule(step, 400);
        return;
      }

      /* ── Borrando letra a letra ── */
      if (s.phase === "deleting") {
        if (s.charIndex <= 0) {
          s.textIndex = loop ? (s.textIndex + 1) % texts.length : s.textIndex;
          if (!loop && s.textIndex === texts.length - 1) return;

          s.charIndex = 0;
          s.phase = "typing";
          schedule(step, jitter(speed * 1.5));
          return;
        }

        s.charIndex -= 1;
        const nextText = current.slice(0, s.charIndex);
        setDisplayText(nextText);
        playSoundForChar("", true);

        schedule(step, jitter(deleteSpeed));
      }
    };

    schedule(step, 0);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [texts, speed, deleteSpeed, pause, soundEnabled, loop, startDelay]);

  return (
    <span
      className={`typewriter-wrap ${className}`}
      style={{ minWidth: `${longest}ch` }}
      onMouseEnter={resumeAudio}
      onClick={resumeAudio}
      role="text"
      aria-live="polite"
      aria-label={displayText}
    >
      {displayText}
      <span
        className={`typewriter-cursor ${cursorClassName}`}
        aria-hidden="true"
      />
      {sound && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resumeAudio();
            setSoundEnabled((v) => !v);
          }}
          className="typewriter-sound-toggle"
          aria-label={soundEnabled ? "Silenciar sonido" : "Activar sonido"}
          title={soundEnabled ? "Silenciar máquina de escribir" : "Activar sonido"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      )}
    </span>
  );
}
