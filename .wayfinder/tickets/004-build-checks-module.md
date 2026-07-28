---
title: Build the contrast and data checks
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: [001, 003]
---

## Question

Candidate 1, the execution half. Implement whatever
[Decide what the checks module asserts and what its interface is](003-decide-checks-module-shape.md)
settled on.

Known-failing on the day this map was charted — these should go red immediately,
which is the point:

- the French spacing rule (`ui.ts:5-9`): narrow no-break space before `? ! ;`.
  Five strings violate it — `ui.ts:149, 181, 190, 205, 250`
- anchor integrity: every `href="#…"` resolves to an `id` in the built HTML.
  Flags `#process` if [Delete the duplicate surfaces in site.ts](002-delete-site-ts-duplicate-surfaces.md)
  has not already removed it
- `Footer.astro:6` names `src/assets/footer-orbit.jpg`, which does not exist

Fix the violations the checks surface, or record why each stands.

Expected render delta: **zero** for the checks themselves. Fixing the French
spacing changes glyphs on the French page — that is a text change, not a design
change, but it *will* move pixels. Flag it and get a ruling rather than assuming.

---

## Resolution

`checks/` — 17 assertions across 4 files, run by `npm test`. **Zero dependencies
added.**

    checks/lib/color.mjs      token parsing, alpha compositing, WCAG ratio
    checks/contrast.test.mjs  the palette claims that were prose
    checks/i18n.test.mjs      what `fr: typeof en` promised and never delivered
    checks/anchors.test.mjs   anchor integrity + honesty of the shipped page

Two things made this cheaper than expected: **Node 24 strips TypeScript types
natively**, so `i18n.test.mjs` imports the real `src/i18n/ui.ts` instead of
parsing it; and `node:test` needs no runner. Files are `.mjs` because
`package.json` has no `"type": "module"` and adding one could affect the Astro
build.

### It found a false claim in PRODUCT.md

PRODUCT.md states: *"the mid-cyan (#00B4D8) fails AA against the deep navy for
body text. It is an accent and large-text colour only."*

**The first sentence is false.** Measured: **8.08:1** on `--void`, 7.54:1 on
`--deep`, 7.20:1 on `--survey-navy`. It fails only against `--ridge-blue`
(1.97:1), which is another accent, not a page ground. DESIGN.md records the
correct 8.08:1 a few lines away — the two documents contradict each other.

The *policy* may still be right for composition reasons (DESIGN.md's One Light
Rule spends cyan only on small marks so the interface never competes with the
photograph), but that is not a contrast argument. **Left for the humans**; the
check asserts what actually holds. This is the check module earning its place on
its first run: a documented constraint that was never true, constraining the
design.

### Fixed: the French spacing rule, all five violations

`fr.meta.description`, `fr.why.intro`, `fr.why.cards.global.body`,
`fr.why.cards.ai.body`, `fr.contact.intro` — all "plain space before `:`", now
U+00A0. **Changed pixels: 0.** The ticket flagged this as likely to move pixels;
it did not — a no-break space is the same width and no line broke differently.
Measured rather than assumed.

Two self-inflicted bugs worth recording, both found by running the checks:

- The token parser read `--void:` **out of a comment** — `global.css` documents
  `--ink-muted` with `/* 10.83 on --void: the dimmest permitted body ink */`.
  Comments are now stripped before parsing.
- The first spacing fix caught 1 of 5. The regex excluded both quote characters,
  so it broke at the apostrophe in `d'ingénierie` — and the French strings are
  double-quoted *precisely because* they contain apostrophes.

### Status

**16 of 17 green.** The one failure — *each channel token equals its hex sibling*
— is red by design: channel tokens do not exist until
[Introduce channel tokens and migrate the 57 raw triples](010-migrate-to-channel-tokens.md).
Ticket 009 decided the check is written first so the migration has something to
verify it.

**State:** closed.
