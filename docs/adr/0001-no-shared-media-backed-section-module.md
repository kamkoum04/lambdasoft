# ADR-0001 — No shared module for the media-backed sections

- **Status:** accepted
- **Date:** 2026-07-28
- **Context:** architecture review of 2026-07-28, candidate 6

## Context

Four sections render a full-bleed image behind their content: the hero, "What we
do", the contact close, and the footer. Read side by side they look like four
copies of one idea, and the mechanical repetition is real:

| repeated | copies |
|---|---|
| `position: relative; isolation: isolate` on the section | 4 |
| `position: absolute; inset: 0; …; object-fit: cover` | 3 |
| the `mask-image` / `-webkit-mask-image` pair | 2 |
| `night-water.jpg` imported and configured independently | 2 |

The obvious move is to extract a shared module and have each section call it.

## Decision

**Do not build it.** The four sections stay independent.

## Reasoning

The similarity is in the scaffolding, not in the behaviour. Each section darkens
its image by a different technique, chosen for a separately measured reason:

- **Hero** — a five-stop scrim gradient, tuned until the lowest headline line
  clears the large-text threshold over the photograph's bright band.
- **What we do** — `mix-blend-mode: screen`, which requires the source to be
  pure black outside the arc. It is not a stylistic choice; it is why that
  section needs no mask at all.
- **Contact** — a flat `opacity`, with the crop anchored so the pool falls below
  the copy.
- **Footer** — deliberately none of the above. The chevron is screen-blended and
  the section's whole point is that no fade is needed.

Their crop positions (`50% 62%`, `50% 8%`, `50% 96%`) are three unrelated
numbers, each derived from a different feature of a different photograph.

Applying the deletion test to the hypothetical shared module: its interface would
need roughly thirteen knobs — `src`, `widths`, `sizes`, `alt`, `loading`,
`fetchpriority`, `objectPosition`, scrim stops, mask stops, blend mode, opacity,
pointer-events, z-index — to abstract about twelve lines of CSS. That is a
**shallow** module: the interface is as complex as the implementation, and every
caller would still need the per-section reasoning to choose values. Deleting it
would not concentrate complexity; it would move the same thirteen decisions back
out, and additionally force each section to encode which knobs it is *not* using.

The genuine duplication is smaller and lower than a section-level module: four
`relative + isolate` declarations and a doubled `-webkit-mask-image`. That is a
CSS utility at most.

## Consequences

- The four sections keep their own image handling. Changing one does not risk
  the other three — which is the property that matters here, because each was
  tuned against a different photograph by measurement.
- Adding a fifth media-backed section means writing the scaffolding again. That
  is accepted. Revisit only if a fifth and sixth section want the *same*
  darkening technique, since two adapters would then justify a seam where one
  does not.

## One real problem this does not solve

`night-water.jpg` is imported and configured independently in `Hero.astro` and
`Contact.astro`, with two crop budgets that must stay mutually consistent, and
the invariant governing both — grow the section and the photograph re-crops — is
written out twice, in different words, in two files.

That is a real defect and it is **not** fixed by sharing a module. It belongs to
the hero height budget, tracked separately at
`.wayfinder/tickets/005-decide-height-budget-ownership.md`.
