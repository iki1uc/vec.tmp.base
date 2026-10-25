export const INDUSTRY = {
    id: "INDUSTRY.home",

    // Markt / Industrie / Börse / Verwaltung
    origin: "◉",
    cluster: "◎",
    exchange: "△",
    admin: "▣",
    capital: "◆",

    // Skalierungsstufen
    scale: {
        micro: 3,
        mid: 9,
        macro: 27,
        ultra: 81
    },

    // HOLO-Anbindung
    holo: HOLO_ROOM,

    // Routing
    route: [
        "◉ → 3 → 9 → ◎",
        "◎ → 3 → 9 → ◎",
        "◎ → 81 → ◆ → △",
        "△ → 27 → ▣ → 3 ↺"
    ]
};
