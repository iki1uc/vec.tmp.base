import { runPipelineOnce, paket_prime, paket_pi, paket_e } from './tam/pipeline.js';
const result = runPipelineOnce({prime: paket_prime, pi: paket_pi, e: paket_e}, zoom=2);
C_V_PIPELINE.state.input = result.satt.primzahl;
C_V_PIPELINE.state.lane_values = result.ei;
