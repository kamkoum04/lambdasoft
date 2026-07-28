---
title: Decide the locale-set authority and what replaces the broken guarantee
state: closed
type: grilling
mode: HITL
assignee: claude
blocked-by: []
---

## Question

Candidate 4. Adding a locale today means editing nine places that do not
reference each other, three of which re-assert the locale union as a cast
because `Object.keys` loses the key type.

Decide, with the human:

- **What replaces `fr: typeof en`.** The comment at `ui.ts:11-13` promises a
  missing translation fails the build. It cannot: `en` is `as const`, so
  `typeof en` is a tree of string *literal* types and every French string
  violates it — 56 errors today — and nothing runs a typechecker anyway. With
  no `tsc` available under this map's zero-dependency rule, the guarantee has to
  become a runtime key-parity check. Decide whether the annotation is corrected,
  loosened, or deleted, and whether the comment's promise is rewritten to match
  what actually holds.
- **How far the derivation goes.** `isLang` restates `Lang`'s members as
  literals rather than checking membership, so the two can drift with no error.
  `pathFor` hardcodes the `fr` prefix. Both are fixable without touching output.
- **The x-default ordering trap.** `Base.astro:78` points x-default at
  `alternates[0]`, correct only because `en` is declared first in `languages`.
  Reordering that object for display reasons would silently make French the
  default for every search engine. Decide whether x-default names its locale
  explicitly, or whether the ordering constraint is asserted.

Note the ordering constraint is a fact about the *interface* of `languages` that
is currently recorded nowhere at all — not even in a comment.

---

## Resolution

**Decision: drop the broken annotation, add a runtime key-parity check.**

`fr: typeof en` is removed. It never delivered its promise and could not: `en` is
`as const`, so `typeof en` is a tree of string *literal* types that every French
string violates — 56 errors — and no typechecker runs under this map's
zero-dependency rule.

Replaced by a deep key-set diff in `checks/i18n.test.js`, which fails on a missing
key *and* on an extra one. That catches the case the annotation was written for
and never caught.

Rejected — *hand-write a `Dict` type*: correct on paper, enforced by nothing,
and a large type to maintain beside the data for zero effect today.

**The comment at `ui.ts:11-13` is rewritten** to describe what actually holds.
Leaving a promise the code does not keep is the defect this map exists to remove.

**Also in scope for execution:** `isLang` derives from `languages` rather than
restating its members; `pathFor` stops hardcoding the `fr` prefix; the three
`as 'en' | 'fr'` casts go; and the x-default ordering trap — correct only because
`en` is declared first — is made explicit rather than left as an unrecorded fact.

**State:** closed.
