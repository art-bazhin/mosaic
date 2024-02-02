function toHex(num: number) {
  return num.toString(16).padStart(2, '0').toUpperCase();
}

export function getHexString(r: number, g: number, b: number, a: number) {
  if (!a) return null;
  return '#' + toHex(r) + toHex(g) + toHex(b);
}
