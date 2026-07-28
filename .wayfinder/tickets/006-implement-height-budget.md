---
title: Implement the height budget assertion and the sentinel fix
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: [001, 005]
---

## Question

Candidate 3, execution. Implement what
[Decide how the hero height budget is owned and asserted](005-decide-height-budget-ownership.md)
settled on.

The assertion itself is one line in a browser driver — hero height === viewport
height, at three viewport heights — and it is the single most load-bearing
invariant in the codebase with nothing checking it.

Expected render delta: **zero**, unless the grilling ruled the 8px sentinel
correction in. If it did, capture the scroll position where the bar solidifies
before and after and record both.

---

## Resolution

**`checks/render.mjs`**, run by `npm run check:render`. It starts a preview
server, measures in a fixed-width iframe at 6 combinations (2 locales × 3
viewports) and asserts two things: the hero equals exactly one viewport, and the
sentinel sits on the bar's lower edge. Separate from `npm test` because it needs
a browser.

**Sentinel fixed.** `Hero.astro` hardcoded `4rem` while `--bar-height` is
`4.5rem`, so it sat 8px *above* the bar's lower edge — the opposite of its own
comment — and drifted whenever the token changed. It now reads
`var(--bar-height)`, and the check confirms it: sentinel 72, bar 73 (the bar's
border box includes its 1px bottom border).

**`Nav` no longer depends on a hero existing.** Without a sentinel it left the
bar transparent over the whole document; it now falls back to a solid bar. Both
pages render a hero so this branch has never fired, which is why it was easy to
lose.

**Changed pixels: 0.** The 8px shift was expected to be invisible to frames
captured at viewport multiples, and it is.

### The check failed on its first run, and the failure is real

    /     1440x900  hero 900 / viewport 900   ok
    /     1440x700  hero 814 / viewport 700   FAIL
    /     390x780   hero 939 / viewport 780   FAIL

**The hero overflows its one-viewport budget at short and narrow viewports** —
by 114px at 1440×700 and 159px at 390×780. That is precisely the failure the
`Hero.astro` comment warns about: the container grows, and because the
photograph is `object-fit: cover` on it, the image re-crops. There is a
`@media (max-height: 800px)` rule that steps the type down for this reason; it
is not enough.

**Pre-existing, and not caused by this ticket.** Verified empirically: with the
`.hero__end` rule deleted outright, the hero still measures 814 and 939. An
absolutely-positioned 1px element cannot change its container's height.

**Not fixed here.** Correcting it means changing layout at those viewports,
which is a design change and out of scope for this map. Raised as a new ticket.

**State:** closed.
