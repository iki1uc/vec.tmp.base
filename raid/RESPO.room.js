// ============================================================
// RESPO · Reflex-Raum · HOLO + AXIOM + RAWATOR
// ============================================================
import { HOLO_ROOM } from "./HOLO.room.js";
import { AXIOM } from "./axiom.js";

// stabile Axiome (einmal erzeugt)
const mana = AXIOM.MANA();
const aura = AXIOM.AURA();
const kraft = AXIOM.KRAFT();

export const RESPO_ROOM = {
    // ─── AXIOM → RESPO ────────────────────────────────────────
    pulse: () => mana.pulse(),
    field: () => aura.resonance(),
    impact: () => kraft.impulse(),
    // ─── HOLO → RESPO ─────────────────────────────────────────
    holoPulse: () => HOLO_ROOM.pulse,
    holoAura: () => HOLO_ROOM.aura,
    holoKraft: () => HOLO_ROOM.kraft,
    holoVital: () => HOLO_ROOM.vital,
    holoFrames: () => HOLO_ROOM.frames,
    // ─── Zeitstempel ──────────────────────────────────────────
    updated: () => HOLO_ROOM.updated
};
