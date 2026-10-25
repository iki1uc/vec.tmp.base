// ============================================================
// HOLO · Engine · RAWATOR 81 Erweiterung (Optimiert)
// ============================================================
import { HOLO_ROOM } from "./HOLO.room.js";

export const HOLO_ENGINE = {
    // ─────────────────────────────────────────────────────────
    // 1. HOLO-Frames erzeugen
    // ─────────────────────────────────────────────────────────
    init() {
        if (HOLO_ROOM.frames.length > 0) return; // nicht doppelt erzeugen
        HOLO_ROOM.frames = [];
        for (let i = 1; i <= 81; i++) {
            HOLO_ROOM.frames.push({
                id: `HOLO-${i}`,
                vital: 0,
                pulse: 0,
                aura: 0,
                kraft: 0
            });
        }
        console.log("HOLO → 81 Frames erzeugt");
    },
    // ─────────────────────────────────────────────────────────
    // 2. HOLO-Frames aktualisieren (mit stabilen Axiomen)
    // ─────────────────────────────────────────────────────────
    update(data) {
        // data = { vital, mana, aura, kraft }
        HOLO_ROOM.vital = data.vital;
        HOLO_ROOM.pulse = data.mana;
        HOLO_ROOM.aura = data.aura;
        HOLO_ROOM.kraft = data.kraft;
        HOLO_ROOM.updated = Date.now();
        // 81 Frames synchron aktualisieren
        HOLO_ROOM.frames.forEach((f) => {
            f.vital = data.vital * (0.95 + Math.random() * 0.1);
            f.pulse = data.mana * (0.9 + Math.random() * 0.2);
            f.aura = data.aura * (0.85 + Math.random() * 0.15);
            f.kraft = data.kraft * (0.9 + Math.random() * 0.3);
        });
        console.log("HOLO → Frames aktualisiert");
    },
    // ─────────────────────────────────────────────────────────
    // 3. HOLO-Raum abrufen
    // ─────────────────────────────────────────────────────────
    get() {
        return HOLO_ROOM;
    }
};
