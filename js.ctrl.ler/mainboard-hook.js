// ALT crasht:
document.getElementById("omega-last").classList...
// NEU mit Guard:
const el = document.getElementById("omega-last");
if(!el) return;
el.textContent = msg;
