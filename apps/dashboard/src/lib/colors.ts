/**
 * Parse an hex color to rgba with an opacity.
 */
export function hexToRgba(hex: string, alpha: number) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}

/**
 * Parse an hex color with alpha to rgba.
 */
export function hexAlphaToRgba(hexAlpha: string) {
  const hex = hexAlpha.slice(0, 7);
  const tempAlpha = hexAlpha.slice(7);
  const alpha = Math.round(
    parseInt(tempAlpha === "" ? "ff" : tempAlpha, 16) / 2.55,
  );

  return hexToRgba(hex, Number(alpha));
}
