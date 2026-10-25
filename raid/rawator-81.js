export function RAWATOR_81() {
    const frames = [];
    for (let i = 1; i <= 81; i++) {
        frames.push({
            id: `RAW-${i}`,
            type: "raw-frame",
            neutral: true,
            market3: true,
            conflict: false,
            payload: {},
            timestamp: Date.now()
        });
    }
    return frames;
}
