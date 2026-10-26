// dein state + pushTrace + ENDPOINTS bleibt
// Fix für Corridor-Sync: trace muss selbe Referenz sein
export const sharedLog = state.trace; // nicht neues Array jedes Mal
