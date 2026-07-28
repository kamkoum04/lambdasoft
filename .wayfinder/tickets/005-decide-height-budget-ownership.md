---
title: Decide how the hero height budget is owned and asserted
state: closed
type: grilling
mode: HITL
assignee: claude
blocked-by: []
---

## Question

Candidate 3. The hero's "must equal exactly one viewport, or the photograph
re-crops" rule is declared in `Hero.astro` and spent by `StackGrid.astro`, which
does not know it exists. `Contact.astro` restates the same invariant in
different words for a different photograph. Raising `--tile` in `StackGrid`
silently re-crops the hero — the failure lands in a different file from the edit.

Decide, with the human:

- **Who owns the budget.** An assertion on rendered height is the cheap answer
  and needs no source change. A structural answer — the hero declaring a budget
  the grid draws from — is deeper but touches layout, which risks the pixel bar.
- **Whether the sentinel drift gets fixed now.** `Hero.astro:161` hardcodes
  `4rem` while `--bar-height` is `4.5rem`, so the sentinel sits 8px *above* the
  bar's lower edge, not below it as its comment claims. Correcting it to read the
  token changes when the bar solidifies by 8px of scroll — a real behaviour
  change, and one a screenshot diff at a fixed scroll position may or may not
  catch. Decide whether that counts as touching the design.
- **Whether `Nav` should survive a page with no hero.** Today it queries
  `[data-hero-end]` and, finding nothing, leaves the bar transparent over the
  whole document. Both pages happen to render a hero, so this has never fired.
  Fixing it is invisible today and load-bearing the moment a third page exists.

---

## Resolution

**Decision: assert the rendered height, and fix the sentinel to read the token.**

The budget is owned by an assertion — hero height === viewport height at three
viewport heights — rather than by a structural change. A structural answer (the
hero declaring a budget the grid draws from) would touch layout, and layout is
what the pixel bar protects.

**The sentinel drift is fixed.** `Hero.astro:161` hardcoded `4rem` while
`--bar-height` is `4.5rem`, so it sat 8px *above* the bar's lower edge — the
opposite of what its own comment claimed — and drifted silently whenever the
token changed. It now reads `var(--bar-height)`.

This is a **real behaviour change**: the bar solidifies 8px earlier in scroll.
It is reported as such, not claimed as zero-delta. The capture frames land on
viewport multiples so the diff is not expected to catch it, and the resolution of
[Implement the height budget assertion and the sentinel fix](006-implement-height-budget.md)
records the scroll offset where the bar flips, before and after.

**`Nav` surviving a hero-less page** is in scope for that ticket: today it queries
`[data-hero-end]`, finds nothing, and leaves the bar transparent over the whole
document. Both pages happen to render a hero, so it has never fired.

**State:** closed.
