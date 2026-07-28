/**
 * Colour maths for the checks. No dependencies.
 *
 * The point of parsing the stylesheet rather than restating its values: a claim
 * and the value it guards have to be the same fact. Before this module, the
 * comment asserting "10.83 on --void" and the `--ink-muted` it described sat
 * three lines apart and nothing compared them.
 */
import { readFileSync } from 'node:fs';

/** Every `--name: value` in a CSS file, as a flat map. */
export function parseTokens(path) {
  // Comments are stripped first, and that is not cosmetic: global.css documents
  // --ink-muted with "/* 10.83 on --void: the dimmest permitted body ink */",
  // and a naive scan reads that as a declaration of --void.
  const css = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const tokens = {};
  for (const [, name, value] of css.matchAll(/--([\w-]+)\s*:\s*([^;}]+)[;}]/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
}

/** `#rgb`, `#rrggbb`, `rgb(r g b)` or a bare `r g b` triple -> [r,g,b]. */
export function toRgb(value) {
  // over() returns a channel array, and its results get composited again for
  // stacked surfaces, so an array has to round-trip back through here.
  if (Array.isArray(value)) return value;
  const v = String(value).trim();
  let m = v.match(/^#([0-9a-f]{3})$/i);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16));
  m = v.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = v.match(/^rgb\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (m) return [+m[1], +m[2], +m[3]];
  m = v.match(/^([\d.]+)\s+([\d.]+)\s+([\d.]+)$/);
  if (m) return [+m[1], +m[2], +m[3]];
  throw new Error(`cannot parse colour: ${value}`);
}

/** Source-over composite of `fg` at `alpha` onto opaque `bg`. */
export function over(fg, alpha, bg) {
  const f = toRgb(fg), b = toRgb(bg);
  return f.map((c, i) => c * alpha + b[i] * (1 - alpha));
}

const channel = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

export function luminance(colour) {
  const [r, g, b] = toRgb(colour).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.2 contrast ratio. Order-independent. */
export function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export const round = (n) => Math.round(n * 100) / 100;
