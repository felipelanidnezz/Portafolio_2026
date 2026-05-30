const chatContainer = document.getElementById("chatContainer");
const setupPanel = document.getElementById("setupPanel");
const emptyState = document.getElementById("emptyState");
const btnExpert1 = document.getElementById("btnExpert1");
const btnExpert2 = document.getElementById("btnExpert2");
const btnAuto = document.getElementById("btnAuto");
const btnClear = document.getElementById("btnClear");
const btnExport = document.getElementById("btnExport");
const btnLangEn = document.getElementById("btnLangEn");
const btnLangEs = document.getElementById("btnLangEs");
const statusBanner = document.getElementById("statusBanner");
const statusPill = document.getElementById("statusPill");
const statusText = document.getElementById("statusText");
const statTotal = document.getElementById("statTotal");
const statJoven = document.getElementById("statJoven");
const statDemonio = document.getElementById("statDemonio");

const RENDER_API = "https://ouija-ai-felipe.onrender.com";

function getApiBase() {
  const meta = document.querySelector('meta[name="ouija-api"]');
  if (meta?.content?.trim()) return meta.content.trim().replace(/\/$/, "");
  const { hostname, port } = window.location;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    if (port === "3001" || port === "3000") return "";
  }
  return RENDER_API;
}

function apiUrl(path) {
  const base = getApiBase();
  return base ? `${base}${path}` : path;
}

let autoInterval = null;
let messageCounts = { total: 0, joven: 0, demonio: 0 };
let lang = localStorage.getItem("ouija-lang") || "en";

const i18n = {
  en: {
    headerSub: "Autonomous conversation between two AIs",
    aboutTitle: "About the project",
    aboutText: "Two AI agents with opposing personalities hold a live dialogue through a Ouija session. Each turn reads the full transcript and responds directly to the other agent's last message — no scripted or repeated lines.",
    agentsTitle: "Agents",
    agentYouthName: "The Youth",
    agentYouthDesc: "Skeptic → Terror",
    agentDemonName: "The Demon",
    agentDemonDesc: "Manipulator · Dark",
    sessionTitle: "Session",
    statMessages: "Messages",
    statYouth: "Youth",
    statDemon: "Demon",
    statusConnecting: "Connecting...",
    statusLive: "AI active",
    statusDemo: "API key required",
    statusError: "No connection",
    statusLocalhost: "Open via localhost",
    btnYouth: "Youth's Turn",
    btnDemon: "Demon's Turn",
    btnAuto: "Auto conversation",
    btnAutoStop: "Stop auto",
    btnExport: "Export PDF",
    btnClear: "Clear",
    emptyTitle: "Session ready",
    emptyText: 'Press <strong>Youth\'s Turn</strong> to start the conversation between the two AIs.',
    emptyYouth: "Youth's Turn",
    footerDev: "Built by Felipe Landinez",
    footerProject: "Portfolio project — Generative AI with Gemini",
    bannerDemo: "⚠ Add your GEMINI_API_KEY to .env to enable live AI — free at aistudio.google.com/apikey — then restart with npm start",
    errNoApiKey: "API key missing or invalid. Follow the setup steps above.",
    setupTitle: "Gemini API key required",
    setupDesc: "This project uses Google's Gemini API to generate real, unique conversations between two AIs. You need a free API key to run it.",
    setupStep1: 'Go to <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>',
    setupStep2: "Click <strong>Create API key</strong>",
    setupStep3: "Open the file <code>.env</code> in the ouija-main folder",
    setupStep4: "Replace <code>tu_api_key_aqui</code> with your key",
    setupStep5: "Run <code>npm start</code> and reload this page",
    setupBtn: "Get API key →",
    errFileProtocol: "Run 'npm start' and open http://localhost:3001",
    errNoServer: "Server unavailable. Run 'npm start' in ouija-main.",
    errServer: "Server not responding",
    errUnknown: "Unknown error",
    errClear: "Error clearing:",
    confirmClear: "Delete the entire conversation?",
    confirmLang: "Switching language will clear the conversation. Continue?",
    labelYouth: "The Youth",
    labelDemon: "The Demon",
    pdfTitle: "Ouija AI — Conversation",
    youthFirst: "The Youth must speak first",
  },
  es: {
    headerSub: "Conversación autónoma entre dos IAs",
    aboutTitle: "Sobre el proyecto",
    aboutText: "Dos agentes de IA con personalidades opuestas mantienen un diálogo en vivo a través de una ouija. Cada turno lee la transcripción completa y responde directamente al último mensaje del otro — sin guiones ni frases repetidas.",
    agentsTitle: "Agentes",
    agentYouthName: "El Joven",
    agentYouthDesc: "Escéptico → Terror",
    agentDemonName: "El Demonio",
    agentDemonDesc: "Manipulador · Oscuro",
    sessionTitle: "Sesión",
    statMessages: "Mensajes",
    statYouth: "Joven",
    statDemon: "Demonio",
    statusConnecting: "Conectando...",
    statusLive: "IA activa",
    statusDemo: "API key requerida",
    statusError: "Sin conexión",
    statusLocalhost: "Abre desde localhost",
    btnYouth: "Turno del Joven",
    btnDemon: "Turno del Demonio",
    btnAuto: "Auto conversar",
    btnAutoStop: "Detener auto",
    btnExport: "Exportar PDF",
    btnClear: "Limpiar",
    emptyTitle: "La sesión está lista",
    emptyText: 'Pulsa <strong>Turno del Joven</strong> para iniciar la conversación entre las dos IAs.',
    emptyYouth: "Turno del Joven",
    footerDev: "Desarrollado por Felipe Landinez",
    footerProject: "Proyecto de portafolio — IA generativa con Gemini",
    bannerDemo: "⚠ Pon tu GEMINI_API_KEY en .env para activar la IA — gratis en aistudio.google.com/apikey — luego reinicia con npm start",
    errNoApiKey: "API key faltante o inválida. Sigue los pasos de configuración arriba.",
    setupTitle: "Se requiere API key de Gemini",
    setupDesc: "Este proyecto usa la API de Gemini de Google para generar conversaciones reales y únicas entre dos IAs. Necesitas una API key gratuita.",
    setupStep1: 'Ve a <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>',
    setupStep2: "Haz clic en <strong>Create API key</strong>",
    setupStep3: "Abre el archivo <code>.env</code> en la carpeta ouija-main",
    setupStep4: "Reemplaza <code>tu_api_key_aqui</code> por tu key",
    setupStep5: "Ejecuta <code>npm start</code> y recarga esta página",
    setupBtn: "Obtener API key →",
    errFileProtocol: "Ejecuta 'npm start' y abre http://localhost:3001",
    errNoServer: "Servidor no disponible. Ejecuta 'npm start' en ouija-main.",
    errServer: "Servidor no responde",
    errUnknown: "Error desconocido",
    errClear: "Error al limpiar:",
    confirmClear: "¿Borrar toda la conversación?",
    confirmLang: "Cambiar idioma borrará la conversación. ¿Continuar?",
    labelYouth: "El Joven",
    labelDemon: "El Demonio",
    pdfTitle: "Ouija AI — Conversación",
    youthFirst: "Primero debe hablar el JOVEN",
  },
};

function t(key) {
  return i18n[lang][key] || i18n.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key]) el.innerHTML = i18n[lang][key];
  });
  document.title = lang === "en"
    ? "Ouija AI · AI Conversation Demo"
    : "Ouija AI · Conversación entre IAs";
  btnLangEn.classList.toggle("active", lang === "en");
  btnLangEs.classList.toggle("active", lang === "es");
  updateAutoButton();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function updateStats() {
  statTotal.textContent = messageCounts.total;
  statJoven.textContent = messageCounts.joven;
  statDemonio.textContent = messageCounts.demonio;
}

function showSetupPanel(show) {
  if (setupPanel) setupPanel.style.display = show ? "flex" : "none";
  if (emptyState) emptyState.style.display = show ? "none" : "";
}

function hideEmptyState() {
  if (emptyState) emptyState.style.display = "none";
  if (setupPanel) setupPanel.style.display = "none";
}

function showEmptyState() {
  if (setupPanel?.style.display === "flex") return;
  if (emptyState) emptyState.style.display = "";
}

function setStatus(text, type = "live") {
  statusText.textContent = text;
  statusPill.className = `status-pill status-pill--${type}`;
}

function showBanner(text) {
  statusBanner.textContent = text;
  statusBanner.style.display = "block";
}

function hideBanner() {
  statusBanner.style.display = "none";
}

function showError(text) {
  hideEmptyState();
  const div = document.createElement("div");
  div.className = "message message--error";
  div.innerHTML = `<div class="message__body"><div class="message__bubble">⚠ ${escapeHtml(text)}</div></div>`;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function renderMessage(nombre, texto, time) {
  hideEmptyState();
  const isJoven = nombre === "experto1";
  const label = isJoven ? t("labelYouth") : t("labelDemon");
  const avatar = isJoven ? "👤" : "👁";
  const locale = lang === "es" ? "es" : "en-US";
  const timeStr = time || new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });

  const div = document.createElement("div");
  div.className = `message message--${isJoven ? "joven" : "demonio"}`;
  div.innerHTML = `
    <div class="message__avatar">${avatar}</div>
    <div class="message__body">
      <div class="message__meta">
        <span class="message__name">${label}</span>
        <span class="message__time">${timeStr}</span>
      </div>
      <div class="message__bubble">${escapeHtml(texto)}</div>
    </div>
  `;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  messageCounts.total++;
  if (isJoven) messageCounts.joven++;
  else messageCounts.demonio++;
  updateStats();
}

function setLoading(on, who = "joven") {
  btnExpert1.disabled = on;
  btnExpert2.disabled = on;
  btnAuto.disabled = on;

  if (on) {
    hideEmptyState();
    const el = document.createElement("div");
    el.id = "loadingMsg";
    el.className = "typing";
    el.innerHTML = `
      <div class="typing__avatar">${who === "joven" ? "👤" : "👁"}</div>
      <div class="typing__dots"><span></span><span></span><span></span></div>
    `;
    chatContainer.appendChild(el);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } else {
    document.getElementById("loadingMsg")?.remove();
  }
}

async function checkStatus() {
  if (window.location.protocol === "file:") {
    setStatus(t("statusLocalhost"), "error");
    showError(t("errFileProtocol"));
    btnExpert1.disabled = true;
    btnExpert2.disabled = true;
    btnAuto.disabled = true;
    return;
  }

  try {
    const res = await fetch(apiUrl("/server/status"));
    const data = await res.json();
    if (data.demo || data.ready === false) {
      setStatus(t("statusDemo"), "demo");
      showBanner(t("bannerDemo"));
      showSetupPanel(true);
    } else {
      setStatus(t("statusLive"), "live");
      hideBanner();
      showSetupPanel(false);
    }
  } catch {
    setStatus(t("statusError"), "error");
    showError(t("errNoServer"));
  }
}

async function loadHistorial() {
  try {
    const res = await fetch(apiUrl("/server/historial"));
    if (!res.ok) throw new Error(t("errServer"));
    const data = await res.json();
    const msgs = data.messages || [];

    messageCounts = { total: 0, joven: 0, demonio: 0 };
    chatContainer.querySelectorAll(".message").forEach((el) => el.remove());

    if (msgs.length === 0) {
      showEmptyState();
    } else {
      hideEmptyState();
      const locale = lang === "es" ? "es" : "en-US";
      msgs.forEach((m) => {
        const tm = m.createdAt
          ? new Date(m.createdAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
          : null;
        renderMessage(m.nombre, m.mensaje, tm);
      });
    }
  } catch (err) {
    showError(err.message);
  }
}

async function callIA(url, label) {
  const who = label === "JOVEN" ? "joven" : "demonio";
  setLoading(true, who);
  try {
    const res = await fetch(`${apiUrl(url)}?lang=${lang}`);
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error || t("errUnknown");
      if (res.status === 503) throw new Error(t("errNoApiKey"));
      throw new Error(msg);
    }
    renderMessage(label === "JOVEN" ? "experto1" : "experto2", data.response);
    return true;
  } catch (err) {
    showError(err.message);
    return false;
  } finally {
    setLoading(false);
  }
}

function updateAutoButton() {
  const label = autoInterval ? t("btnAutoStop") : t("btnAuto");
  const icon = autoInterval
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  btnAuto.innerHTML = `${icon}<span>${label}</span>`;
}

function stopAuto() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
  btnAuto.classList.remove("active");
  updateAutoButton();
}

function startAuto() {
  let turn = messageCounts.joven <= messageCounts.demonio ? "JOVEN" : "DEMONIO";
  btnAuto.classList.add("active");
  updateAutoButton();

  const run = async () => {
    const url = turn === "JOVEN" ? apiUrl("/server/main") : apiUrl("/server/main2");
    const ok = await callIA(url, turn);
    if (!ok) { stopAuto(); return; }
    turn = turn === "JOVEN" ? "DEMONIO" : "JOVEN";
  };

  run();
  autoInterval = setInterval(run, 7000);
}

async function switchLanguage(newLang) {
  if (newLang === lang) return;
  if (messageCounts.total > 0 && !confirm(t("confirmLang"))) return;

  stopAuto();
  lang = newLang;
  localStorage.setItem("ouija-lang", lang);
  applyLanguage();

  try {
    await fetch(apiUrl("/server/eliminar"), { method: "DELETE" });
  } catch { /* ignore */ }

  chatContainer.querySelectorAll(".message, .typing").forEach((el) => el.remove());
  messageCounts = { total: 0, joven: 0, demonio: 0 };
  updateStats();
  showEmptyState();
  await checkStatus();
}

btnLangEn.addEventListener("click", () => switchLanguage("en"));
btnLangEs.addEventListener("click", () => switchLanguage("es"));

btnExpert1.addEventListener("click", () => { stopAuto(); callIA("/server/main", "JOVEN"); });
btnExpert2.addEventListener("click", () => { stopAuto(); callIA("/server/main2", "DEMONIO"); });

btnAuto.addEventListener("click", () => {
  if (autoInterval) stopAuto();
  else startAuto();
});

btnClear.addEventListener("click", async () => {
  if (!confirm(t("confirmClear"))) return;
  stopAuto();
  try {
    await fetch(apiUrl("/server/eliminar"), { method: "DELETE" });
    chatContainer.querySelectorAll(".message, .typing").forEach((el) => el.remove());
    messageCounts = { total: 0, joven: 0, demonio: 0 };
    updateStats();
    showEmptyState();
    await checkStatus();
  } catch (err) {
    showError(`${t("errClear")} ${err.message}`);
  }
});

btnExport.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(t("pdfTitle"), 10, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  let y = 28;
  doc.splitTextToSize(chatContainer.innerText, 180).forEach((line) => {
    if (y > 280) { doc.addPage(); y = 15; }
    doc.text(line, 10, y);
    y += 7;
  });
  doc.save("ouija-ai-conversation.pdf");
});

applyLanguage();
checkStatus();
loadHistorial();
