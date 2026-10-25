// ============================================================
// RAWATOR · Start-Routine · verbindet AXIOM mit HOLO
// ============================================================
import { AXIOM } from "./axiom.js";
import { HOLO_ENGINE } from "./HOLO.engine.js";

const mana = AXIOM.MANA();
const aura = AXIOM.AURA();
const kraft = AXIOM.KRAFT();

export function RAWATOR_START() {
    // HOLO-Frames erzeugen, falls noch nicht geschehen
    HOLO_ENGINE.init();

    const manaPulse = mana.pulse();
    const auraPulse = aura.resonance();
    const kraftPulse = kraft.impulse();
    const vital = (manaPulse + auraPulse + kraftPulse) / 3;

    HOLO_ENGINE.update({
        vital,
        mana: manaPulse,
        aura: auraPulse,
        kraft: kraftPulse
    });

    console.log("RAWATOR → gestartet, vital:", vital.toFixed(4));
    return vital;
}
