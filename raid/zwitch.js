
"use strict";
/* ================================================================
   IKI1UC · BOSS · zwitch.js
   v1 — Universal MAIN Q702-NG Switch

   Zweck: 3 Output real separiert + switchbar wie P5E3 Perle
   - TB   = HOLO / eye.brain.open / Bild (USB-C / HDMI klein)
   - LAN  = MS Group + Systeme (Office)
   - ADD+1= BOSS / Schürfen / NC.boerse / BOSS

   Real separiert = 3 echte Chips / 3 echte Kanäle
   Switchbar = im BIOS / im Orbit v5 / im Axiom umschaltbar
   ================================================================ */

const ZWITCH = {
  // ─── KANÄLE ────────────────────────────────────────────────
  channels: {
    TB:    { id: 'TB',    name: 'HOLO / Bild',   chip: 'USB-C ASM1142', active: true,  role: 'eye',   axiom: 'OCTA' },
    LAN:   { id: 'LAN',   name: 'MS / Systeme',  chip: 'Intel i225-1',  active: true,  role: 'brain', axiom: 'IQQ' },
    ADD1:  { id: 'ADD+1', name: 'BOSS / NC',     chip: 'Intel i225-2',  active: true,  role: 'open',  axiom: 'A81' }
  },

  // ─── STATUS ────────────────────────────────────────────────
  mode: 'ALL', // ALL | TB_ONLY | LAN_ONLY | ADD1_ONLY | TB_LAN | LAN_ADD1 | etc
  history: [],
  isLeader: false,

  // ─── INIT ──────────────────────────────────────────────────
  init(orbitState) {
    if (orbitState) this.isLeader = orbitState.isLeader;
    this.log('zwitch init · 3 Kanäle real separiert');
    this.apply(this.mode);
    return this;
  },

  // ─── SWITCH LOGIC — wie P5E3 Perle BIOS ────────────────────
  apply(mode) {
    this.mode = mode;
    const c = this.channels;

    // alle aus, dann nach Mode an
    Object.values(c).forEach(ch => ch.active = false);

    switch(mode) {
      case 'ALL':        c.TB.active = c.LAN.active = c.ADD1.active = true; break;
      case 'TB_ONLY':    c.TB.active = true; break;
      case 'LAN_ONLY':   c.LAN.active = true; break;
      case 'ADD1_ONLY':  c.ADD1.active = true; break;
      case 'TB_LAN':     c.TB.active = c.LAN.active = true; break;
      case 'LAN_ADD1':   c.LAN.active = c.ADD1.active = true; break;
      case 'TB_ADD1':    c.TB.active = c.ADD1.active = true; break;
      case 'OFF':        break;
      default:           c.TB.active = c.LAN.active = c.ADD1.active = true;
    }

    this.history.push({ ts: Date.now(), mode, active: this.getActiveIds() });
    if (this.history.length > 20) this.history.shift();

    this.broadcast();
    this.log(`zwitch → ${mode} · aktiv: ${this.getActiveIds().join(', ') || 'keiner'}`);
    this.render();
  },

  getActiveIds() {
    return Object.values(this.channels).filter(ch => ch.active).map(ch => ch.id);
  },

  // ─── INTEGRATION MIT ORBIT v5 + BOSS ──────────────────────
  // IQQ = LAN, OCTA = TB, A81 = ADD+1, NC = ADD+1 Agent
  onAxiom(axiom) {
    // Wenn Orbit v5 in IQQ ist → nur LAN an (MS)
    // Wenn OCTA → nur TB an (HOLO)
    // Wenn A81 → nur ADD+1 an (BOSS/NC.boerse)
    // Wenn NC → ADD+1 Agent
    if (!this.isLeader) return;

    switch(axiom) {
      case 'IQQ':  this.apply('LAN_ONLY'); break;
      case 'OCTA': this.apply('TB_ONLY'); break;
      case 'A81':  this.apply('ADD1_ONLY'); break;
      case 'NC':   this.apply('ADD1_ONLY'); break;
      default: break;
    }
  },

  onOrbitStep(symbol, axiomMap) {
    const axiom = axiomMap[symbol] || null;
    if (axiom) this.onAxiom(axiom);
  },

  // ─── BROADCAST — HarmonyOS + BroadcastChannel kompatibel ───
  broadcast() {
    try {
      const payload = {
        type: 'zwitch.state',
        mode: this.mode,
        active: this.getActiveIds(),
        channels: this.channels,
        ts: Date.now()
      };
      // für Orbit v5
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('iki1uc-orbit');
        bc.postMessage(payload);
        bc.close();
      }
      // für HarmonyOS Soft Bus / localStorage Fallback
      localStorage.setItem('iki1uc-zwitch', JSON.stringify(payload));
    } catch(e) {}
  },

  // ─── RENDER — für Orbit Canvas / Log ───────────────────────
  render() {
    const el = document.getElementById('zwitchStatus');
    if (!el) return;
    const active = this.getActiveIds();
    el.innerHTML = active.map(id => {
      const ch = this.channels[id === 'ADD+1' ? 'ADD1' : id];
      const cls = ch.active ? 'ok' : 'err';
      return `<span class="${cls}">● ${id} (${ch.chip})</span>`;
    }).join(' | ') || '<span class="err">○ OFF</span>';
  },

  log(msg) {
    const box = document.getElementById('log');
    if (!box) { console.log('[zwitch] ' + msg); return; }
    const line = document.createElement('div');
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    box.appendChild(line);
    while (box.children.length > 80) box.removeChild(box.firstChild);
  },

  // ─── FÜR Q702 + EQ13 + i5-6500 SET ─────────────────────────
  // Hardware Mapping
  hardwareMap: {
    'Q702': { TB: 'Tablet HDMI', LAN: 'Dock LAN', ADD1: 'USB LAN Dongle' },
    'EQ13': { TB: 'USB-C DP', LAN: 'i225-1', ADD1: 'i225-2' },
    'H110M': { TB: 'HDMI', LAN: 'Realtek LAN', ADD1: 'PCIe LAN' }
  },

  getHardware(type) {
    return this.hardwareMap[type] || this.hardwareMap['EQ13'];
  }
};

// ─── AUTO‑BIND AN ORBIT v5 WENN VORHANDEN ────────────────────
if (typeof window !== 'undefined') {
  window.ZWITCH = ZWITCH;
  // Warte auf Orbit State
  setTimeout(() => {
    if (window.state) {
      ZWITCH.init(window.state);
      // Hook in stepOrbit wenn vorhanden
      const origStep = window.stepOrbit;
      if (typeof origStep === 'function') {
        window.stepOrbit = function() {
          const res = origStep.apply(this, arguments);
          const sym = window.ORBIT ? window.ORBIT[window.state.index] : '?';
          const map = window.AXIOM_MAP || {};
          ZWITCH.onOrbitStep(sym, map);
          return res;
        };
      }
    } else {
      ZWITCH.init();
    }
  }, 500);
}

// Für Node / BOSS Module
if (typeof module !== 'undefined') module.exports = ZWITCH;

