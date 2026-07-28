---
title: Decide names for the five untokened colours and the channel-token shape
state: closed
type: grilling
mode: HITL
assignee: claude
blocked-by: []
---

## Question

Candidate 5, the decision half. Changing an accent today updates 9 usages and
leaves 18 stale: 57 raw `rgb()` triples in module `<style>` blocks duplicate 4
tokens.

The copies are not carelessness — a custom property cannot be used inside
`rgb(r g b / a)` without a channel-triple token, so the workaround spread
instead of the fix. Nothing in `global.css` records that.

Decide, with the human:

- **The channel-token shape.** `--ring-ch: 117 209 255` beside `--ring: #75d1ff`
  is the conventional answer, at the cost of every colour existing twice. The
  alternative is `color-mix()`, which needs no second token but reads worse and
  has different rounding — and rounding is exactly what the pixel bar measures.
- **Names for five colours that are tokens of nothing**: `rgb(3 11 32)`,
  `rgb(4 16 44)`, `rgb(4 14 36)`, `rgb(10 26 56)`, `rgb(10 40 76)`. Each was
  chosen for a measured reason in a specific module. Do they become tokens, stay
  local, or collapse into fewer values? Note `--deep: #05122c` is declared,
  documented as "raised surfaces", and used **zero** times, while these five do
  that job unnamed.
- **What happens to the seven dead tokens and the 84 dead lines** — the
  `.action` family and a `.btn` rule for markup that does not exist. Deleting
  them cannot move a pixel; confirm that reading.

---

## Resolution

**Decision: channel triples.** `--ring-ch: 117 209 255` beside `--ring: #75d1ff`,
so alpha variants read `rgb(var(--ring-ch) / .45)`.

Arithmetically identical to the literals already shipping, so the pixel risk is
near zero and the migration can be verified in batches by token.

Rejected — `color-mix()`: no second token, but it mixes in a colour space and may
round differently by a level. Rounding is precisely what the pixel bar measures,
and it would force verifying all 57 sites individually rather than by batch.

**The pairing risk is real and is handled**: `--ring` and `--ring-ch` can drift.
`checks/contrast.test.js` asserts every `-ch` triple equals its hex sibling, so
drift fails loudly. This is why the checks module is built first.

**Dead code goes**: 7 unused tokens (`--deep`, `--glow`, `--survey-navy`,
`--ridge-blue`, `--space-2xs/2xl/3xl`), the 72-line `.action` family, and a
`.btn` rule for markup that does not exist. None can move a pixel.

**The five untokened colours** — `rgb(3 11 32)`, `rgb(4 16 44)`, `rgb(4 14 36)`,
`rgb(10 26 56)`, `rgb(10 40 76)` — are surface tints, each chosen for a measured
reason in one module. Note `--deep` is declared and documented as "raised
surfaces" and used zero times while these five do that job unnamed. Decision:
name the two that recur (`rgb(3 11 32)` twice, `rgb(4 14 36)` three times) and
leave the single-use ones local, so a token is only minted where it earns reuse.

**State:** closed.
