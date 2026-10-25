// ============================================================
//  AXIOM · MANA · AURA · KRAFT (Optimiert)
//  IKI1UC · SYS3-6-9 · NC-ENGINE · RAWATOR · HOLO-81
// ============================================================
export const AXIOM = {
    // ─── 1. MANA ───────────────────────────────────────────────
    // Energiefluss · Lebensenergie · Systemkraft
    MANA(flow = 1) {
        return {
            id: "AXIOM-MANA",
            type: "energy",
            flow,
            pulse() {
                // Stabiler Energieimpuls
                return this.flow * (0.95 + Math.random() * 0.1);
            }
        };
    },
    // ─── 2. AURA ───────────────────────────────────────────────
    // Feld · Einfluss · Resonanz
    AURA(radius = 3) {
        return {
            id: "AXIOM-AURA",
            type: "field",
            radius,
            resonance() {
                // Stabiler Feldimpuls
                return this.radius * (0.85 + Math.random() * 0.15);
            }
        };
    },
    // ─── 3. KRAFT ──────────────────────────────────────────────
    // Impuls · Wirkung · Bewegung
    KRAFT(force = 1) {
        return {
            id: "AXIOM-KRAFT",
            type: "impact",
            force,
            impulse() {
                // Stabiler Kraftimpuls
                return this.force * (0.9 + Math.random() * 0.3);
            }
        };
    }
};
