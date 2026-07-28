---
title: Record the decision not to share the media-backed sections
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: []
---

## Question

Candidate 6, which resolves to *do not build it*.

Four sections — `Hero`, `WhatWeBuild`, `Contact`, `Footer` — look like four
copies of "full-bleed image behind content". They are not. Each darkens its
image by a different technique for a separately measured reason: a scrim
gradient tuned to a headline, a screen blend that requires a pure-black source,
a flat opacity, and a deliberate absence. A shared module would need ~13 knobs
to abstract ~12 lines of CSS — interface as complex as implementation, and
deleting it would move complexity rather than concentrate it.

Write `docs/adr/0001-no-shared-media-backed-section-module.md` recording the
context, the decision, and the deletion-test reasoning, so a future architecture
review does not re-suggest it. This is the repo's first ADR — `docs/adr/` does
not exist yet.

Record in the ADR the one genuine issue hiding underneath: `night-water.jpg` is
configured independently in `Hero.astro` and `Contact.astro` with two crop
budgets that must stay mutually consistent, and the invariant governing both is
written out twice in different words. That belongs to
[Decide how the hero height budget is owned and asserted](005-decide-height-budget-ownership.md),
not to a shared module.

Expected render delta: **zero**. This ticket writes prose only.

---

## Resolution

Written: `docs/adr/0001-no-shared-media-backed-section-module.md` — the repo's
first ADR.

Records the decision **not** to extract a shared media-backed section module,
with the deletion-test reasoning: ~13 knobs of interface to abstract ~12 lines of
implementation is a shallow module, and deleting it would move complexity rather
than concentrate it. The four sections darken their images by four different
techniques for four separately measured reasons; the similarity is scaffolding,
not behaviour.

Also records the revisit condition — two sections wanting the *same* darkening
technique would be two adapters, which justifies a seam where one does not — and
the one real defect the ADR does not solve: `night-water.jpg` configured twice
with two crop budgets and its governing invariant written out twice. That is
routed to [Decide how the hero height budget is owned and asserted](005-decide-height-budget-ownership.md).

Prose only. No file under `src/` touched. **Changed pixels: 0.**

**State:** closed.
