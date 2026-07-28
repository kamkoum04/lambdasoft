---
title: Derive the locale set and add the key-parity check
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: [001, 007]
---

## Question

Candidate 4, execution. Implement what
[Decide the locale-set authority and what replaces the broken guarantee](007-decide-locale-authority.md)
settled on.

Nine sites, listed in the review:
`astro.config.mjs:14`, `astro.config.mjs:17`, `ui.ts:16-19`, the dictionary,
`utils.ts:6`, `utils.ts:28`, `Base.astro:18`, `Nav.astro:35`, `Footer.astro:76`.

Expected render delta: **zero**. Every emitted `hreflang`, `lang`, canonical and
sitemap entry must be byte-identical afterwards — this ticket changes how the
locale set is computed, never what it contains. Diff the emitted `<head>` of both
pages explicitly, not just the screenshots; most of this ticket's output is
invisible to a camera.

---

## Resolution

The locale set is now derived from `languages` in one place.

- `locales` exported from `utils.ts` as `Lang[]`; `isLang` checks membership with
  `Object.hasOwn` instead of restating `'en' | 'fr'` as literals, so `Lang` and
  `isLang` can no longer drift.
- `pathFor` derives the prefix set from `locales` rather than hardcoding `/fr/`.
  A third locale would previously have been stripped by nothing and nested under
  the old one.
- The three `as 'en' | 'fr'` casts are gone — `Nav`, `Footer` and `Base` iterate
  `locales`, which is already typed.
- **x-default now names its locale.** It was `alternates[0]`, correct only
  because `en` happens to be declared first; reordering `languages` for display
  reasons would have made French the default for every search engine.
- `fr: typeof en` removed and its comment rewritten to describe what actually
  holds. The comment now points at `checks/i18n.test.mjs`, which is the real
  guarantee, and says not to restore the annotation.

**Verification:** all build outputs byte-identical to the baseline. Every
emitted `hreflang`, `lang`, canonical and sitemap entry unchanged — this changed
how the locale set is computed, never what it contains. `npm test` 17/17.

**Changed pixels: 0.**

**State:** closed.
