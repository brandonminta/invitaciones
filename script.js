// =========================
// 1) Personalización por URL
// =========================
function getParam(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

const invitee = (getParam("name") || "").trim();


// =========================
// 2) Contador (misa 11:00) — Santo Domingo (UTC-5)
// =========================
const target = new Date("2026-02-17T11:00:00-05:00");

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    dEl.textContent = "00";
    hEl.textContent = "00";
    mEl.textContent = "00";
    sEl.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  dEl.textContent = pad(days);
  hEl.textContent = pad(hours);
  mEl.textContent = pad(mins);
  sEl.textContent = pad(secs);
}

tick();
setInterval(tick, 1000);

// =========================
// 3) RSVP: botón "ASISTIRÉ" con nombre prellenado
// =========================

// 🔴 IMPORTANTE:
// Reemplaza esto con tu link "pre-filled" de Google Forms,
// pero SOLO hasta el signo "=" del entry del NOMBRE.
//
// Ejemplo real (ficticio):
// const FORM_PREFILL_BASE = "https://docs.google.com/forms/d/e/XXXXX/viewform?usp=pp_url&entry.123456789=";

const FORM_PREFILL_BASE =
  "https://docs.google.com/forms/d/e/1FAIpQLSfLBIkZd2bMnQ1hl3HSAmF9QQ7-w8F3R3pFjW_ykoXMgZZv-g/viewform?usp=pp_url&entry.860157850=";


const rsvpBtn = document.getElementById("rsvpBtn");
const rsvpHint = document.getElementById("rsvpHint");

rsvpBtn.addEventListener("click", () => {
  if (!FORM_PREFILL_BASE || FORM_PREFILL_BASE.includes("PEGA_AQUI")){
    alert("Falta conectar el Google Form. Pega tu link prellenado en script.js (FORM_PREFILL_BASE).");
    return;
  }

  const nameValue = invitee ? encodeURIComponent(invitee) : encodeURIComponent("Invitado");
  const url = FORM_PREFILL_BASE + nameValue;

  window.open(url, "_blank", "noopener");
});
