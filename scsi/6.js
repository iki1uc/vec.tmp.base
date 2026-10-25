export const AXIS_MAP = Object.freeze([
  { axis: 'H', from: { position: 1, label: 'H dominiert' }, to: { position: 4, label: 'H zu T' } },
  { axis: 'B', from: { position: 3, label: 'B dominiert' }, to: { position: 6, label: 'B zu T' } },
  { axis: 'T', from: { position: 5, label: 'T dominiert' }, to: { position: 2, label: 'T zu H' } }
]);

export function getAxis(axis) {
  return AXIS_MAP.find((entry) => entry.axis === axis.toUpperCase()) ?? null;
}

