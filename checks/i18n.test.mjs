/**
 * What `fr: typeof en` promised and never delivered.
 *
 * That annotation claimed a missing translation would fail the build. It could
 * not: `en` is `as const`, so `typeof en` is a tree of string *literal* types
 * that every French string violates — and nothing ran a typechecker anyway.
 * These assertions are the replacement. Node 24 strips types natively, so this
 * imports the real module rather than parsing it.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ui, languages, defaultLang } from '../src/i18n/ui.ts';

const paths = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) => {
    const here = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === 'object' ? paths(v, here) : [here];
  });

test('every locale carries exactly the same keys', () => {
  const reference = paths(ui[defaultLang]).sort();
  for (const [code, dict] of Object.entries(ui)) {
    if (code === defaultLang) continue;
    const theirs = paths(dict).sort();
    const missing = reference.filter((k) => !theirs.includes(k));
    const extra = theirs.filter((k) => !reference.includes(k));
    assert.deepEqual(missing, [], `${code} is missing: ${missing.join(', ')}`);
    assert.deepEqual(extra, [], `${code} has keys ${defaultLang} does not: ${extra.join(', ')}`);
  }
});

test('no string is empty', () => {
  for (const [code, dict] of Object.entries(ui)) {
    for (const path of paths(dict)) {
      const value = path.split('.').reduce((o, k) => o[k], dict);
      if (typeof value !== 'string') continue;
      assert.ok(value.trim().length > 0, `${code}.${path} is empty`);
    }
  }
});

test('the locale set is the only authority', () => {
  assert.deepEqual(
    Object.keys(ui).sort(), Object.keys(languages).sort(),
    'ui and languages disagree about which locales exist',
  );
  assert.ok(languages[defaultLang], `defaultLang ${defaultLang} is not in languages`);
});

test('x-default is not left to declaration order', () => {
  // Base.astro points x-default at alternates[0], which comes from
  // Object.keys(languages). That is correct only because `en` happens to be
  // declared first. Reordering `languages` for display reasons would silently
  // make French the default for every search engine. Until Base.astro names the
  // locale explicitly, this asserts the ordering it depends on.
  assert.equal(
    Object.keys(languages)[0], defaultLang,
    `languages must declare ${defaultLang} first, or Base.astro's x-default points at the wrong locale`,
  );
});

test('French uses its own spacing before ? ! ; and :', () => {
  // ui.ts:5-9 states the rule. Five strings violated it when this was written.
  const NARROW = ' '; // before ? ! ;
  const NBSP = ' ';   // before :
  const offenders = [];
  for (const path of paths(ui.fr)) {
    const value = path.split('.').reduce((o, k) => o[k], ui.fr);
    if (typeof value !== 'string') continue;
    for (const [, ch] of value.matchAll(/ ([?!;:])/g)) {
      offenders.push(`fr.${path} — plain space before "${ch}"`);
    }
    void NARROW; void NBSP;
  }
  assert.deepEqual(offenders, [], `French spacing rule violated:\n  ${offenders.join('\n  ')}`);
});

test('no translated string can break the SVG it is interpolated into', () => {
  // WhyPartner and WhatWeBuild interpolate alt text into an aria-label inside a
  // template string that is then set:html — with no escaping. A double quote in
  // any of these strings silently breaks the markup. Today they use the curly
  // apostrophe, so it works by luck; this is the guard.
  for (const [code, dict] of Object.entries(ui)) {
    for (const path of paths(dict)) {
      if (!/\.alt$|^art\./.test(path)) continue;
      const value = path.split('.').reduce((o, k) => o[k], dict);
      assert.ok(!String(value).includes('"'), `${code}.${path} contains a double quote`);
    }
  }
});
