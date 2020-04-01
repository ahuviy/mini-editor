/**
 * Transforms an rgb color (0-255 decimal representation) to a hex color-string.
 */
export function rgbToHex(r, g, b) {
  const red = decimalToHex(r);
  const green = decimalToHex(g);
  const blue = decimalToHex(b);
  return '#' + red + green + blue;
}

function decimalToHex(decimal) {
  const hex = Number(decimal).toString(16);
  return hex.length < 2 ? '0' + hex : hex;
}
