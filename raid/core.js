// ============================================================
// CORE · RAWATOR + AXIOM + HOLO Integration
// IKI1UC · SYS3-6-9 · NC · RESPO · HOLO
// ============================================================

import RAWATOR_ID from "./RAWATOR.id.json" assert { type: "json" };
import RAWATOR_GEO from "./RAWATOR.geo.json" assert { type: "json" };
import { RAWATOR_LIFE } from "./rawator-life.js";

import { AXIOM } from "./axiom.js";
import { HOLO_ROOM } from "./HOLO.room.js";
import { HOLO_ENGINE } from "./HOLO.engine.js";
import { RESPO_ROOM } from "./RESPO.room.js";

// ─────────────────────────────────────────────────────────────
// 1. SYS-Struktur sicherstellen
// ─────────────────────────────────────────────────────────────
window.SYS = window.SYS || {};
window.SYS.ROOM = window.SYS.ROOM || {};
window.SYS.PIPE = window.SYS.PIPE || { pipe3: [], pipe6: [], pipe9: [] };

// ─────────────────────────────────────────────────────────────
// 2. RAWATOR registrieren
// ─────────────────────────────────────────────────────────────
window.SYS.ROOM.RAWATOR = {
    id: RAWATOR_ID,
    geo: RAWATOR_GEO,
    life: RAWATOR_LIFE,
    status: "active"
};

console.log("CORE → RAWATOR ID + GEO registriert");

// ─────────────────────────────────────────────────────────────
// 3. AXIOM registrieren (einmalige Instanzen)
// ─────────────────────────────────────────────────────────────
const mana = AXIOM.MANA();
const aura = AXIOM.AURA();
const kraft = AXIOM.KRAFT();

window.SYS.PIPE.AXIOM = { mana, aura, kraft };

console.log("CORE → Axiome in Pipeline eingehängt");

// ─────────────────────────────────────────────────────────────
// 4. CORE-Pipeline: RAWATOR in pipe3/pipe6/pipe9 einhängen
// ─────────────────────────────────────────────────────────────
window.SYS.PIPE.pipe3.push("RAWATOR");
window.SYS.PIPE.pipe6.push("RAWATOR");
window.SYS.PIPE.pipe9.push("RAWATOR");

console.log("CORE → RAWATOR in pipe3/pipe6/pipe9 eingehängt");

// ─────────────────────────────────────────────────────────────
// 5. NC-Integration
// ─────────────────────────────────────────────────────────────
window.SYS.ROOM.NC = window.SYS.ROOM.NC || {};
window.SYS.ROOM.NC.RAWATOR = {
    orbit: RAWATOR_GEO.position?.orbit || 4,
    vital: RAWATOR_LIFE.vital,
    holo: RAWATOR_LIFE.hologramm
};

console.log("CORE → RAWATOR in NC-Raum eingehängt");

// ─────────────────────────────────────────────────────────────
// 6. RESPO-Integration
// ─────────────────────────────────────────────────────────────
window.SYS.ROOM.RESPO = RESPO_ROOM;

console.log("CORE → RESPO Engine registriert");

// ─────────────────────────────────────────────────────────────
// 7. HOLO-Integration
// ─────────────────────────────────────────────────────────────
HOLO_ENGINE.init();
window.SYS.ROOM.HOLO = HOLO_ROOM;
window.SYS.PIPE.HOLO = HOLO_ENGINE;

console.log("CORE → HOLO Engine registriert");

// ─────────────────────────────────────────────────────────────
// 8. CALC-PIPELINE
// ─────────────────────────────────────────────────────────────
window.SYS.CALC = function () {
    // 1. Axiom-Pulse berechnen
    const manaPulse = mana.pulse();
    const auraPulse = aura.resonance();
    const kraftPulse = kraft.impulse();

    // 2. Vitalität aktualisieren
    RAWATOR_LIFE.vital = (manaPulse + auraPulse + kraftPulse) / 3;

    // 3. HOLO aktualisieren
    HOLO_ENGINE.update({
        vital: RAWATOR_LIFE.vital,
        mana: manaPulse,
        aura: auraPulse,
        kraft: kraftPulse
    });

    // 4. RESPO auf aktuellem Stand halten
    window.SYS.ROOM.RESPO = RESPO_ROOM;

    return {
        vital: RAWATOR_LIFE.vital,
        respo: window.SYS.ROOM.RESPO
    };
};

console.log("CORE → vollständig geladen, window.SYS.CALC() ist bereit");
