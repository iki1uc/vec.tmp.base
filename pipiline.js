// C/V_PIPELINE = { state: input, impulse, lane_values, impulse_engine: forward/backward/neutral, router: select_direction/select_axis, dispatcher: input→mode→output, lanes: 16 parallele Träger, display: slot/mode/transformed_value }

export const C_V_PIPELINE = {
  state: { input: null, impulse: null, lane_values: [] },
  impulse_engine: {
    forward: (v) => v * 1,
    backward: (v) => v * -1,
    neutral: (v) => v * 0,
  },
  router: {
    select_direction: (navi) => navi?.direction ?? 'neutral',
    select_axis: (pos) => pos?.x ?? 0,
  },
  dispatcher: {
    run: (input, mode) => {
      const fn = C_V_PIPELINE.impulse_engine[mode] || C_V_PIPELINE.impulse_engine.neutral;
      return fn(input);
    }
  },
  lanes: Array.from({length:16}, (_,i) => ({ id:i, value:0 })), // 16 parallele Bedeutungs-Träger
  display: { slot: null, mode: null, transformed_value: null }
};

// TAM Pipeline: HUHN → EI → OMELETT → SATT
// HUHN = Rohdaten (prime, pi, e bleiben unberührt)
// EI = 4-Layer Versatz + Zoom (prime normal, pi normal, prime x2, pi x2)
// OMELETT = Hash + XOR → Zahl
// SATT = prevPrime → Primzahl

function hashString(str){ let h=0>>>0; for(let i=0;i<str.length;i++) h=(h*131+str.charCodeAt(i))>>>0; return h>>>0; }
function isPrime(n){ if(n<2) return false; if(n%2===0) return n===2; for(let i=3;i*i<=n;i+=2) if(n%i===0) return false; return true; }
function prevPrime(n){ let x=n; while(x>=2 && !isPrime(x)) x--; return x>=2?x:null; }

export function runPipelineOnce({prime, pi, e}, zoom=1){
  const huhn = { prime, pi, e };
  const build = (paket, z, o) => paket.items.map(it => ({...it, item: it.item+`_z${z}_o${o}`, zoom:z, offset:o }));
  const ei = [
    ...build(prime, zoom, 0),
    ...build(pi, zoom, 1),
    ...build(e, zoom, 2),
    ...build(prime, zoom*2, 3),
  ];
  let acc=0>>>0;
  for(const it of ei) acc = (acc ^ hashString(`${it.item}|${it.molekuel}|${it.ort}|${it.zoom}|${it.offset}`))>>>0;
  const omelett = acc;
  const satt = { basis: omelett, primzahl: prevPrime(omelett) };
  return { huhn, ei, omelett, satt, zoom };
}

// TIME 3×11 → 3×7 / 3×4 / 3×3 Schnitt + Scroll + Zoom
export function sliceTime(slots, maxCol){
  return slots.filter(s=>s.pos[1]<=maxCol).map(s=>({ pos:s.pos, ref:s.refs?.[0]||s.ref||"?" }));
}
export function renderTime(gridId, mask, rows=3, cols=11){
  const grid=document.getElementById(gridId); if(!grid) return;
  grid.innerHTML=""; grid.style.gridTemplateColumns=`repeat(${cols}, 80px)`;
  for(let r=1;r<=rows;r++) for(let c=1;c<=cols;c++){
    const cell=document.createElement("div"); cell.className="cell"; cell.id=`cell-${r}-${c}`;
    const hit=mask.find(s=>s.pos[0]===r && s.pos[1]===c);
    cell.textContent=hit?hit.ref:""; grid.appendChild(cell);
  }
}

// 3xX Pakete Beispiel (ersetzt deine 3xX_prime.js etc.)
export const paket_prime = { items: [{item:"p1",molekuel:"Primzahl Start",ort:"r0c0"}, {item:"p2",molekuel:"Teiler",ort:"r0c1"}] };
export const paket_pi = { items: [{item:"pi1",molekuel:"Kreis",ort:"r1c0"}, {item:"pi2",molekuel:"Welle",ort:"r1c1"}] };
export const paket_e = { items: [{item:"e1",molekuel:"Wachstum",ort:"r2c0"}] };
