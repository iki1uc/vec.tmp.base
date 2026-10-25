// ============================================================
// BEAM · Kernel · verbindet RAWATOR mit allen Repositories
// ============================================================
export async function BEAM_KERNEL() {
    let beam;
    try {
        beam = await fetch("./beam.json").then(r => r.json());
    } catch (err) {
        // Fällt zurück auf Standardwerte, z.B. wenn die Seite direkt als
        // Datei (file://) geöffnet wird und fetch() deshalb blockiert wird.
        console.warn("BEAM → beam.json konnte nicht geladen werden, nutze Standardwerte", err);
        beam = { id: "BEAM-01", axis: "X", layer: 1, x4: true, state: "active", nc: true };
    }

    const repos = [
        "IO", "OI", "IX", "XI",
        "TP3", "TP4", "TP6", "TP8", "TP9", "TP12",
        "markt", "industry", "econmy", "epoche",
        "CLOCK", "TIME", "NC.world",
        "RAWATOR"
    ];

    const ping = repo => ({
        repo,
        id: beam.id,
        axis: beam.axis,
        layer: beam.layer,
        x4: beam.x4,
        state: beam.state,
        nc: beam.nc,
        timestamp: Date.now()
    });

    const signals = repos.map(ping);

    window.RAWATOR = {
        wake: true,
        evo: "city",
        travel: "atlantis",
        beam: signals
    };

    console.log("BEAM ACTIVE → RAWATOR WAKING…");
    return signals;
}
