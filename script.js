// =========================
// 1) Personalización por URL (opcional)
// =========================
function getParam(key){
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

// Si sigues mandando links tipo ?name=Brandon, lo guardamos por si lo quieres usar luego.
// (Pero ya NO lo prellenamos en el Form)
const invitee = (getParam("name") || "").trim();


// =========================
// 2) Contador — 21 Feb 2026 12:45 (UTC-5)
// =========================
const target = new Date("2026-02-21T12:45:00-05:00");

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function pad(n){ return String(n).padStart(2, "0"); }

function tick(){
  const now = new Date();
  let diff = target - now;

  if (diff <= 0){
    if (dEl) dEl.textContent = "00";
    if (hEl) hEl.textContent = "00";
    if (mEl) mEl.textContent = "00";
    if (sEl) sEl.textContent = "00";
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600 * 24));
  const hours = Math.floor((sec % (3600 * 24)) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(mins);
  if (sEl) sEl.textContent = pad(secs);
}

tick();
setInterval(tick, 1000);


// =========================
// 3) RSVP: botón abre el Google Form (ellos escriben su nombre)
// =========================
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfLBIkZd2bMnQ1hl3HSAmF9QQ7-w8F3R3pFjW_ykoXMgZZv-g/viewform";

const rsvpBtn = document.getElementById("rsvpBtn");
const rsvpHint = document.getElementById("rsvpHint");

if (rsvpHint){
  // Mensaje opcional (por si lo tienes en tu HTML)
  rsvpHint.textContent = "Se abrirá el formulario para que ingreses tu nombre y confirmes tu asistencia.";
}

if (rsvpBtn){
  rsvpBtn.addEventListener("click", () => {
    if (!FORM_URL || !FORM_URL.startsWith("https://docs.google.com/forms/")){
      alert("Falta conectar el Google Form. Revisa la variable FORM_URL en script.js.");
      return;
    }
    window.open(FORM_URL, "_blank", "noopener");
  });
}
