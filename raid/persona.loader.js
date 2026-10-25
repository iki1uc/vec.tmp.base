import { Meier } from "./tmp.meier.js";
import { Schulz } from "./tmp.schulz.js";

export const Persona = {
    active: null,

    set(name) {
        if (name === "meier") this.active = Meier;
        if (name === "schulz") this.active = Schulz;
    },

    say(msg) {
        return this.active ? this.active.speak(msg) : "Keine Persona aktiv.";
    }
};
