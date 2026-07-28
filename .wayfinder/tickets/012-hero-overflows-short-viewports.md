---
title: The hero overflows one viewport at short and narrow sizes
state: open
type: grilling
mode: HITL
assignee: unassigned
blocked-by: []
---

## Question

Found by `npm run check:render` when it was first run
([Implement the height budget assertion and the sentinel fix](006-implement-height-budget.md)).

    1440x900   hero 900 / viewport 900   ok
    1440x700   hero 814 / viewport 700   over by 114px
    390x780    hero 939 / viewport 780   over by 159px

The hero is `min-height: 100svh` with `object-fit: cover` on the photograph, so
when content exceeds the viewport the container grows **and the image re-crops**.
This is the exact failure the module's own comment warns about, and it is live at
two of the three viewports checked. Pre-existing — confirmed by deleting the
sentinel rule and re-measuring.

Decide, with the human:

- **Is it a defect or accepted?** At 700px viewport height the page still reads;
  it just is not the composition that was designed and measured. DESIGN.md's Top
  Half Rule is stated in percentages of the frame, and a re-cropped frame moves
  the safe band — so the contrast argument behind the hero may not hold there.
- **What gives at short heights?** The type already steps down under
  `@media (max-height: 800px)`. The remaining candidates are the stack grid
  (three rows of tiles, the thing that spends the budget without knowing it
  exists) and the trailing padding.
- **Does 390×780 need a different answer than 1440×700?** The narrow case
  overflows more, and for a different reason: the tile rows wrap.

**Any fix is a design change**, so it falls outside the "zero visual change" map
and needs its own decision before work starts.
