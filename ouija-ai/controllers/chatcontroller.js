import { GoogleGenAI } from "@google/genai";
import register from "../models/chat.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = "gemini-2.5-flash-lite";
const MAX_HISTORY = 6;

function isDemoMode() {
  const key = process.env.GEMINI_API_KEY?.trim();
  return !key;
}

function getLang(req) {
  return req.query.lang === "es" ? "es" : "en";
}

const LABELS = {
  en: { youth: "YOUTH", demon: "DEMON" },
  es: { youth: "JOVEN", demon: "DEMONIO" },
};

const SYSTEM = {
  en: {
    joven: `You are a skeptical young person at a Ouija board, slowly becoming terrified. Reply in 2-3 short sentences, first person, English. React ONLY to the Demon's last message. No repetition, no stage directions.`,
    demonio: `You are a demonic entity on a Ouija board. Reply in 2-3 short sentences, English. React ONLY to the Youth's last message. Escalate tension. No repetition, no stage directions.`,
  },
  es: {
    joven: `Eres un joven escéptico frente a una ouija, poco a poco aterrorizado. Responde en 2-3 oraciones cortas, primera persona, español. Reacciona SOLO al último mensaje del Demonio. Sin repetición ni acotaciones.`,
    demonio: `Eres una entidad demoníaca en una ouija. Responde en 2-3 oraciones cortas, español. Reacciona SOLO al último mensaje del Joven. Sube la tensión. Sin repetición ni acotaciones.`,
  },
};

const ERRORS = {
  en: {
    noKey: "A valid GEMINI_API_KEY is required. Get one free at https://aistudio.google.com/apikey and add it to .env",
    youthFirst: "The Youth must speak first to begin the session",
    demonWait: "Wait for the Demon to respond before the Youth speaks again",
  },
  es: {
    noKey: "Se requiere una GEMINI_API_KEY válida. Consíguela gratis en https://aistudio.google.com/apikey y ponla en .env",
    youthFirst: "El Joven debe hablar primero para iniciar la sesión",
    demonWait: "Espera a que responda el Demonio antes de que hable el Joven otra vez",
  },
};

const memoryStore = [];

async function getMessages() {
  try {
    const { default: mongoose } = await import("mongoose");
    if (mongoose.connection.readyState === 1) {
      return await register.find().sort({ createdAt: 1 });
    }
  } catch { /* fallback */ }
  return memoryStore;
}

async function saveMessage(nombre, mensaje) {
  try {
    const { default: mongoose } = await import("mongoose");
    if (mongoose.connection.readyState === 1) {
      const doc = new register({ nombre, mensaje });
      await doc.save();
      return doc;
    }
  } catch { /* fallback */ }
  const entry = { nombre, mensaje, createdAt: new Date() };
  memoryStore.push(entry);
  return entry;
}

function buildHistorialText(messages, lang) {
  if (!messages.length) return "";
  const { youth, demon } = LABELS[lang];
  return messages
    .slice(-MAX_HISTORY)
    .map((m) => {
      const quien = m.nombre === "experto1" ? youth : demon;
      return `${quien}: ${m.mensaje}`;
    })
    .join("\n");
}

function lastFrom(messages, nombre) {
  return [...messages].reverse().find((m) => m.nombre === nombre);
}

function buildYouthPrompt(messages, lang) {
  const historial = buildHistorialText(messages, lang);
  const lastMsg = messages.at(-1);

  if (!messages.length) {
    return lang === "en"
      ? "Start the Ouija session. Ask if anyone is there."
      : "Empieza la sesión de ouija. Pregunta si hay alguien.";
  }

  if (lastMsg?.nombre !== "experto2") {
    return null; // demon must speak next
  }

  const demonSaid = lastMsg.mensaje;

  const ctx = historial ? `Recent:\n${historial}\n\n` : "";
  return lang === "en"
    ? `${ctx}DEMON said: "${demonSaid}"\n\nYouth's reply:`
    : `${ctx}DEMONIO dijo: "${demonSaid}"\n\nRespuesta del JOVEN:`;
}

function buildDemonPrompt(messages, lang) {
  const historial = buildHistorialText(messages, lang);
  const lastYouth = lastFrom(messages, "experto1");

  if (!lastYouth) return null;

  const youthSaid = lastYouth.mensaje;

  const ctx = historial ? `Recent:\n${historial}\n\n` : "";
  return lang === "en"
    ? `${ctx}YOUTH said: "${youthSaid}"\n\nDemon's reply:`
    : `${ctx}JOVEN dijo: "${youthSaid}"\n\nRespuesta del DEMONIO:`;
}

function parseError(err) {
  let msg = err.message || "Unknown error";
  try {
    const parsed = JSON.parse(msg);
    msg = parsed?.error?.message || msg;
  } catch { /* ok */ }

  const waitMatch = msg.match(/retry in ([\d.]+)s/i);
  if (msg.includes("quota") || msg.includes("Quota")) {
    const secs = waitMatch ? Math.ceil(parseFloat(waitMatch[1])) : 40;
    return { message: msg, rateLimited: true, retryAfter: secs };
  }
  return { message: msg, rateLimited: false };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function askGemini(systemInstruction, userMessage) {
  const maxAttempts = 2;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.85,
          maxOutputTokens: 180,
        },
      });
      return response.text?.trim();
    } catch (err) {
      const parsed = parseError(err);
      if (parsed.rateLimited && attempt < maxAttempts - 1) {
        const wait = Math.min(parsed.retryAfter, 10);
        await sleep(wait * 1000);
        continue;
      }
      throw err;
    }
  }
}

async function status(req, res) {
  res.json({
    demo: isDemoMode(),
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    ready: !isDemoMode(),
    port: process.env.PORT || 3001,
  });
}

async function main(req, res) {
  try {
    const lang = getLang(req);
    const err = ERRORS[lang];

    if (isDemoMode()) {
      return res.status(503).json({ error: err.noKey });
    }

    const messages = await getMessages();
    const lastMsg = messages.at(-1);

    if (lastMsg?.nombre === "experto1") {
      return res.status(400).json({ error: err.demonWait });
    }

    const prompt = buildYouthPrompt(messages, lang);
    if (!prompt) {
      return res.status(400).json({ error: err.demonWait });
    }

    const text = await askGemini(SYSTEM[lang].joven, prompt);
    if (!text) throw new Error("Empty response from AI");

    await saveMessage("experto1", text);
    res.json({ response: text });
  } catch (err) {
    console.error("Error en main (JOVEN):", err);
    const parsed = parseError(err);
    const status = parsed.rateLimited ? 429 : 500;
    const msg = parsed.rateLimited
      ? (lang === "es"
        ? `Límite de la API gratuita alcanzado. Espera ${parsed.retryAfter}s e intenta de nuevo.`
        : `Free API limit reached. Wait ${parsed.retryAfter}s and try again.`)
      : parsed.message;
    res.status(status).json({ error: msg, retryAfter: parsed.retryAfter || null });
  }
}

async function main2(req, res) {
  try {
    const lang = getLang(req);
    const err = ERRORS[lang];

    if (isDemoMode()) {
      return res.status(503).json({ error: err.noKey });
    }

    const messages = await getMessages();
    const lastYouth = lastFrom(messages, "experto1");

    if (!lastYouth) {
      return res.status(400).json({ error: err.youthFirst });
    }

    const prompt = buildDemonPrompt(messages, lang);
    const text = await askGemini(SYSTEM[lang].demonio, prompt);
    if (!text) throw new Error("Empty response from AI");

    await saveMessage("experto2", text);
    res.json({ response: text });
  } catch (err) {
    console.error("Error en main2 (DEMONIO):", err);
    const parsed = parseError(err);
    const status = parsed.rateLimited ? 429 : 500;
    const msg = parsed.rateLimited
      ? (lang === "es"
        ? `Límite de la API gratuita alcanzado. Espera ${parsed.retryAfter}s e intenta de nuevo.`
        : `Free API limit reached. Wait ${parsed.retryAfter}s and try again.`)
      : parsed.message;
    res.status(status).json({ error: msg, retryAfter: parsed.retryAfter || null });
  }
}

async function historial(req, res) {
  try {
    const messages = await getMessages();
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    memoryStore.length = 0;
    const { default: mongoose } = await import("mongoose");
    if (mongoose.connection.readyState === 1) {
      await register.deleteMany({});
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { main, main2, historial, eliminar, status };
