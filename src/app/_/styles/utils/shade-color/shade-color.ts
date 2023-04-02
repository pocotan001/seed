/**
 * Lighten or Darken a given color
 * https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-hex--
 *
 * @example
 * shadeColor("#663399", 0.5)
 * shadeColor("#663399", -0.5)
 */
export const shadeColor = (hex: string, percent: number): string => {
  const f = Number.parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const r = f >> 16;
  const g = (f >> 8) & 0x00_ff;
  const b = f & 0x00_00_ff;

  return `#${(
    0x1_00_00_00 +
    (Math.round((t - r) * p) + r) * 0x1_00_00 +
    (Math.round((t - g) * p) + g) * 0x1_00 +
    (Math.round((t - b) * p) + b)
  )
    .toString(16)
    .slice(1)}`;
};
