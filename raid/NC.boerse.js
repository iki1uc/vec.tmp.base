import { NC_ROOM } from "./NC.room.js";
import { AXIOM } from "./axiom.js";

export const NC_BOERSE = {
    id: "NC.boerse",

    // Börsen-Symbole aus deiner Struktur
    origin: "◉",   // Markt-Ursprung
    exchange: "△", // Börsen-Dreieck
    capital: "◆",  // Kapital-Punkt
    admin: "▣",    // Verwaltungsblock

    // Skalierungsstufen
    scale: {
        micro: 3,
        mid: 9,
        macro: 27,
        ultra: 81
    },

    // Verbindung zum NC-Raum
    nc: NC_ROOM,

    // Börsenwerte (berechnet aus NC.engine)
    value: {
        mana: NC_ROOM.engine.mana * AXIOM.MANA(1),
        aura: NC_ROOM.engine.aura * AXIOM.AURA(1),
        kraft: NC_ROOM.engine.kraft * AXIOM.KRAFT(1)
    },

    // Börsen-Update
    update() {
        this.value.mana = NC_ROOM.engine.mana * AXIOM.MANA(1);
        this.value.aura = NC_ROOM.engine.aura * AXIOM.AURA(1);
        this.value.kraft = NC_ROOM.engine.kraft * AXIOM.KRAFT(1);
        this.updated = Date.now();
    },

    updated: null
};
