import { AXIOM } from "./axiom.js";

window.SYS = window.SYS || {};
window.SYS.AXIOM = {
    mana: AXIOM.MANA(),
    aura: AXIOM.AURA(),
    kraft: AXIOM.KRAFT()
};
console.log("SYS → Axiome geladen (MANA, AURA, KRAFT)");
window.SYS.NARRATIVE = {
    axiom: `
        Die erste 0 war kein Nichts.
        Sie war ein Atom, ein Ursprung, ein Ganzes.
        Aus ihr entstanden drei Kräfte:
        MANA, AURA, KRAFT.
        Diese drei sind die Axiome des Systems.
        Wer sie lädt, erweckt den Raum.
    `
};
