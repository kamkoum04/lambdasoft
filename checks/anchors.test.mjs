/**
 * Anchor integrity, asserted against the built pages.
 *
 * A dead `#process` link survived in `src/site.ts` for days because the copy
 * being read lived elsewhere. Nothing compared the two. This does.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const PAGES = ['dist/index.html', 'dist/fr/index.html'];

test('every in-page link resolves to an id on that page', () => {
  assert.ok(existsSync(PAGES[0]), 'run `npm run build` first');
  for (const page of PAGES) {
    const html = readFileSync(page, 'utf8');
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
    const targets = new Set(
      [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]).filter(Boolean),
    );
    const dead = [...targets].filter((t) => !ids.has(t));
    assert.deepEqual(dead, [], `${page} links to missing ids: ${dead.join(', ')}`);
  }
});

test('the colophon claim is true: no third-party scripts ship', () => {
  // ui.ts asserts to visitors: "No analytics, no cookies, no trackers."
  // Adding any external script makes the shipped page lie.
  for (const page of PAGES) {
    const html = readFileSync(page, 'utf8');
    const external = [...html.matchAll(/<script[^>]+src="(https?:)?\/\/[^"]+"/g)].map((m) => m[0]);
    assert.deepEqual(external, [], `${page} loads a third-party script`);
  }
});

test('the placeholder inbox is not published as machine-readable fact', () => {
  // site.emailIsPlaceholder gates the JSON-LD contactPoint. A placeholder
  // published as structured data is how it ends up quoted back at you.
  for (const page of PAGES) {
    const html = readFileSync(page, 'utf8');
    if (!html.includes('hello@lambdasoft.com')) continue;
    assert.ok(
      !html.includes('"contactPoint"'),
      `${page} publishes a contactPoint while the address is still the placeholder`,
    );
  }
});

test('both locales point at each other and declare one x-default', () => {
  for (const page of PAGES) {
    const html = readFileSync(page, 'utf8');
    const alts = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
    assert.ok(alts.includes('en') && alts.includes('fr'), `${page} is missing an hreflang pair`);
    assert.equal(
      alts.filter((a) => a === 'x-default').length, 1,
      `${page} must declare exactly one x-default`,
    );
  }
});
