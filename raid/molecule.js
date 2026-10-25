import { Atom } from "./atom.js";

export const Molecule = {
    H2O() {
        return {
            name: "Wasser",
            atoms: ["H", "H", "O"],
            charge: Atom.charge([Atom.proton, Atom.proton, Atom.neutron]),
            vital: Atom.vital(1, 1, 1)
        };
    },
    O2() {
        return {
            name: "Sauerstoff",
            atoms: ["O", "O"],
            charge: Atom.charge([Atom.neutron, Atom.neutron]),
            vital: Atom.vital(2, 1, 1)
        };
    },
    CO2() {
        return {
            name: "Kohlenstoffdioxid",
            atoms: ["C", "O", "O"],
            charge: Atom.charge([Atom.neutron, Atom.neutron, Atom.neutron]),
            vital: Atom.vital(3, 2, 1)
        };
    }
};
