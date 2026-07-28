/**
 * The contrast claims that were previously prose.
 *
 * Every threshold here was recorded in a comment somewhere in src/, next to a
 * value that nothing compared it against. The numbers are WCAG 2.2 AA as
 * PRODUCT.md commits to it: 4.5:1 body text, 3:1 large text and meaningful
 * non-text. Judgements ("gaps are rhythm", "no second call to action") are NOT
 * here — they are not thresholds and asserting them would be theatre.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTokens, ratio, over, toRgb, round } from './lib/color.mjs';

const T = parseTokens('src/styles/global.css');
const VOID = T['void'];

const atLeast = (fg, bg, min, what) => {
  const r = ratio(fg, bg);
  assert.ok(r >= min, `${what}: ${round(r)}:1, needs ${min}:1`);
};

test('body inks clear 4.5:1 on the page ground', () => {
  atLeast(T.ink, VOID, 4.5, 'white on --void');
  atLeast(T.frost, VOID, 4.5, 'frost on --void');
  atLeast(T['ink-muted'], VOID, 4.5, 'ink-muted on --void');
});

test('--ink-muted is the dimmest ink and still clears the floor', () => {
  // DESIGN.md: "This is the floor; nothing dimmer carries text."
  const floor = ratio(T['ink-muted'], VOID);
  assert.ok(floor >= 4.5, `ink-muted floor is ${round(floor)}:1`);
  for (const name of ['glacier', 'ring', 'frost', 'ink']) {
    assert.ok(
      ratio(T[name], VOID) >= floor,
      `--${name} is dimmer than the stated floor --ink-muted`,
    );
  }
});

test('accents used on large text or non-text clear 3:1', () => {
  atLeast(T.ring, VOID, 3, '--ring on --void');
  atLeast(T['signal-cyan'], VOID, 3, '--signal-cyan on --void');
});

test('--signal-cyan clears 4.5:1 on every page ground', () => {
  // PRODUCT.md states: "the mid-cyan (#00B4D8) fails AA against the deep navy
  // for body text. It is an accent and large-text colour only."
  //
  // The first sentence is FALSE and this check is what found it. Measured:
  // 8.08:1 on --void, 7.54:1 on --deep, 7.20:1 on --survey-navy. It fails only
  // against --ridge-blue (1.97:1), which is another accent, not a ground.
  // DESIGN.md records the correct 8.08:1 a few lines away, so the two documents
  // contradict each other.
  //
  // The *policy* may still be right — DESIGN.md's One Light Rule spends cyan
  // only on small marks so the interface never competes with the photograph —
  // but that is a composition argument, not a contrast one. Left as a live
  // question for the humans; asserted here as what actually holds.
  for (const ground of ['void', 'deep', 'survey-navy']) {
    if (!T[ground]) continue;
    atLeast(T['signal-cyan'], T[ground], 4.5, `--signal-cyan on --${ground}`);
  }
});

test('the contact field border is a UI boundary and owes 3:1', () => {
  // Contact.astro: measured 1.59:1 at alpha 0.18, raised to 0.42.
  const panel = over('rgb(3 11 32)', 0.86, VOID);
  const border = over(T.frost, 0.42, panel);
  atLeast(border, panel, 3, 'field border on the form panel');
});

test('every technology mark clears 3:1 on its tile', async () => {
  const icons = JSON.parse(await import('node:fs').then((fs) => fs.readFileSync('src/stack-icons.json', 'utf8')));
  const tile = over('rgb(4 14 36)', 0.74, VOID);
  for (const icon of icons) {
    atLeast(icon.hex, tile, 3, `${icon.label} (${icon.hex}) on the tile`);
  }
});

test('each channel token equals its hex sibling', () => {
  // Channel triples exist because a custom property cannot go inside
  // rgb(r g b / a). The two spellings can drift; this is what stops them.
  const pairs = Object.keys(T).filter((k) => k.endsWith('-ch'));
  assert.ok(pairs.length > 0, 'no channel tokens found');
  for (const ch of pairs) {
    const hex = ch.slice(0, -3);
    assert.ok(T[hex], `--${ch} has no --${hex} to match`);
    assert.deepEqual(
      toRgb(T[ch]), toRgb(T[hex]),
      `--${ch} (${T[ch]}) does not match --${hex} (${T[hex]})`,
    );
  }
});
