---
label: wayfinder:map
title: Execute the six architecture-review candidates without changing a pixel
---

# Execute the six architecture-review candidates without changing a pixel

## Destination

All six candidates from the 28 Jul 2026 architecture review are resolved in
`src/`, and the rendered page is **pixel-identical** to the baseline captured
before any of it started. Done when no ticket remains open and the screenshot
diff against the baseline is still zero.

## Notes

**This map carries execution.** Wayfinder plans by default; this effort
overrides that. Tickets typed `task` change code. Tickets typed `grilling`
decide the shape first, one question at a time, and are worked with the human.

**Domain vocabulary** — `PRODUCT.md` and `DESIGN.md`. There is no `CONTEXT.md`;
create it lazily if a deepened module needs a name the domain doesn't have yet.

**Architecture vocabulary** — the `/codebase-design` skill. Module, interface,
implementation, depth, seam, adapter, leverage, locality. Not component,
service, API, boundary, wrapper.

**Two constraints, both settled by grilling before this map existed:**

1. **The bar is pixel identity**, not byte identity. CSS and markup may be
   reorganised; the render may not move. Proof is a screenshot diff at 3
   viewports × 2 locales, zero changed pixels. This is why candidate 5 is in
   scope at all — byte identity would have excluded it.
2. **Zero new dependencies.** Checks run on `node:test` and `node:assert`;
   contrast maths is arithmetic on literals already in the repo; screenshot
   diffs use the headless Chrome already on this machine. `package.json`
   gains scripts, never `devDependencies`. The page's own colophon claims "no
   analytics, no cookies, no trackers" — the toolchain should not undercut it.
   Consequence: candidate 4 cannot use `tsc`, so its guarantee becomes a
   hand-written key-parity check.

**Every execution ticket ends the same way**: rebuild, re-diff against the
baseline, and record the changed-pixel count in its resolution. A ticket that
moves a pixel is not done.

**Source** — `/tmp/architecture-review-20260728-181436.html`. Candidate numbers
below refer to it.

## Decisions so far

<!-- one line per closed ticket -->

- [Capture the pixel baseline everything is measured against](tickets/001-capture-pixel-baseline.md) — baseline at `/tmp/wf-baseline` (51 frames, 3 viewports x 2 locales); build is byte-reproducible so hashes are a valid first check; the capture harness raced the bar's IntersectionObserver and a fixed delay did **not** fix it — it now waits for quiescence, validated over four runs.
- [Delete the duplicate surfaces in site.ts](tickets/002-delete-site-ts-duplicate-surfaces.md) — 6 exports down to 1; `nav` (with its dead `#process`) deleted, and `site.title`/`site.description` found dead **and stale**; `emailIsPlaceholder` now derived so address and JSON-LD gate flip together. 53/53 outputs byte-identical.
- [Record the decision not to share the media-backed sections](tickets/011-adr-no-shared-media-module.md) — ADR-0001 written; candidate 6 ruled out on the deletion test, with the revisit condition and the `night-water.jpg` double-config routed to ticket 005.
- [Decide what the checks module asserts and what its interface is](tickets/003-decide-checks-module-shape.md) — the check parses `global.css`; judgements stay prose; `node --test checks/`.
- [Build the contrast and data checks](tickets/004-build-checks-module.md) — 17 assertions, zero dependencies (Node 24 strips TS natively). Found PRODUCT.md's signal-cyan claim to be **false** (8.08:1, not a failure). Fixed all 5 French spacing violations.
- [Decide how the hero height budget is owned and asserted](tickets/005-decide-height-budget-ownership.md) — assert rendered height; fix the sentinel to read `--bar-height` and report the 8px behaviour change honestly.
- [Decide the locale-set authority and what replaces the broken guarantee](tickets/007-decide-locale-authority.md) — drop `fr: typeof en`, replace with a runtime key-parity check; rewrite the comment to describe what actually holds.
- [Decide names for the five untokened colours and the channel-token shape](tickets/009-decide-token-naming.md) — channel triples over `color-mix()`; name only the two tints that recur.
- [Introduce channel tokens and migrate the 57 raw triples](tickets/010-migrate-to-channel-tokens.md) — 54 migrated, 3 stay local. **Exposed that the capture harness was verifying one page load and keeping another**; earlier zero-pixel claims withdrawn and re-proven against a reconstructed pre-change tree.
- [Implement the height budget assertion and the sentinel fix](tickets/006-implement-height-budget.md) — `npm run check:render`; sentinel now reads `--bar-height`; Nav survives a hero-less page. **The check found the hero overflowing one viewport at 1440x700 and 390x780** — pre-existing, raised as ticket 012.
- [Derive the locale set and add the key-parity check](tickets/008-implement-locale-derivation.md) — one authority for locales, casts gone, x-default names its locale, broken annotation removed. Byte-identical output.

## Not yet specified

- Whether the checks, once they exist, get wired to anything that runs them
  automatically. This repo has no git and no CI, so there is nowhere to hang a
  hook today. Revisit if it is ever initialised.
- The placeholder domain is hardcoded in three files with only one TODO
  (`astro.config.mjs`, `public/robots.txt`, `public/llms.txt`). Surfaced by the
  review, not one of the six. Ticket it when the real domain is registered.
- The `.rise` entrance protocol has four owners and no definition — a class
  name, a data attribute on the element, a data attribute on `<html>`, and a
  class added by script, with 10 consumers and no validation. Whether that
  wants a real seam is not sharp enough to ticket yet.
- `StackGrid` declares `role="list"` with `role="listitem"` tiles separated by
  unroled row elements, which breaks ARIA list ownership. The layout needs the
  rows; the semantics do not want them. No shape for the fix yet.

## Out of scope

- **Building a shared media-backed section module** (candidate 6). Ruled out on
  the deletion test: ~13 knobs to abstract ~12 lines, and deleting it would move
  complexity rather than concentrate it. Recorded in `docs/adr/0001-no-shared-media-backed-section-module.md` so it is
  not re-proposed.
- **Any change that alters rendered pixels.** If a candidate cannot be done
  without moving the render, it stops and comes back to the human.
- **Adding devDependencies.** Settled above.
