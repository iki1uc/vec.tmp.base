export const Atom = {
    electron:  -1,
    proton:    +1,
    neutron:    0,
    charge(state) {
        return state.reduce((a, b) => a + b, 0);
    },
    vital(p, v, i) {
        return (p + v + i) / 3; // neutraler Vitalitätswert
    }
};
