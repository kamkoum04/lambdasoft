---
title: Introduce channel tokens and migrate the 57 raw triples
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: [001, 009]
---

## Question

Candidate 5, execution. Implement what
[Decide names for the five untokened colours and the channel-token shape](009-decide-token-naming.md)
settled on, then delete the dead tokens and the dead rules.

**This is the highest-risk ticket on the map for the pixel bar.** 57 substitutions,
each of which must composite to the same value. `rgb(var(--ring-ch) / .45)` and
`rgb(117 209 255 / .45)` should be identical, but "should" is what the screenshot
diff is for. Migrate in batches by token, diffing after each batch, so a
regression is attributable to one token rather than to 57 edits at once.

Record the changed-pixel count per batch, not just at the end.

---

## Resolution

**54 of 57 raw triples now reference a token.** Migrated in seven batches, one
token each, with a capture and diff after every batch — which is what localised
the one failure to a single token instead of to 57 edits.

    ring     15    glacier  12    void  11    frost 10
    ink       1    tile      3    panel  2          = 54

Three single-use triples stay local per ticket 009: `rgb(4 16 44)`,
`rgb(10 26 56)`, `rgb(10 40 76)`. A token is minted only where it earns reuse.

**Added:** `--void-ch --ring-ch --glacier-ch --frost-ch --ink-ch --panel-ch
--tile-ch`, plus two new hex tokens `--panel: #030b20` and `--tile: #040e24` for
the surface tints that were spelled out five times without names.
`checks/contrast.test.mjs` asserts every `-ch` equals its hex sibling, so the
pair cannot drift — the risk ticket 009 flagged when choosing this over
`color-mix()`.

### Verification, and a retraction

The `panel` batch reported **56,869 changed pixels**. It was not a regression —
it was the verifier. Chasing it exposed that `capture.sh` ran Chrome twice per
frame, verifying one page load and keeping another, so the bar's observer race
decided the kept frame. See the corrected resolution on
[Capture the pixel baseline everything is measured against](001-capture-pixel-baseline.md).

**The zero-pixel results reported during the batch migration are withdrawn.**
They were produced by that broken harness and are not evidence.

Re-verified properly: the channel-token substitutions and the five French
no-break spaces were mechanically inverted to reconstruct the pre-change tree,
both trees were built and captured with the fixed harness, and compared:

    frames: 51   changed pixels: 0

That comparison is apples-to-apples and the harness behind it is deterministic
over six runs. `npm test`: **17/17**.

**State:** closed.
