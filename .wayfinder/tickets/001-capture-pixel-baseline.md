---
title: Capture the pixel baseline everything is measured against
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: []
---

## Question

Nothing else on this map can be verified until "unchanged" has a referent.

Produce, from the current `src/`, a baseline that later tickets diff against:

- a production build, with a sha256 per file in `dist/`
- screenshots at 3 viewports (1440×900, 800×900, 390×780) × 2 locales (`/`, `/fr/`),
  full page, images forced to decode before capture
- the top bar captured separately at the widths where it reflows (390, 520, 700, 1060, 1440)

Store outside the repo. Record the absolute path in the resolution so every
later ticket can find it.

**Two traps this repo has already sprung, both documented in the review:**
headless Chrome on Linux enforces a ~500px minimum window width, so narrow
viewports must be rendered inside a fixed-width iframe and the width read back
from `clientWidth`; and images with `decoding="async"` are not painted when the
screenshot fires, which has twice produced a phantom defect. Force
`decoding="sync"` and assert a decoded count before capturing.

Also record the answer to: is the build reproducible? Build twice, compare
hashes. If `dist/` is not deterministic, every later ticket needs the screenshot
diff rather than the hash, and that fact belongs in the resolution.

---

## Resolution

**Baseline:** `/tmp/wf-baseline/` — 51 frames + `MANIFEST.sha256` (frame hashes) +
`DIST.sha256` (53 build outputs).

**Tools, kept in-repo so every later ticket re-runs the identical capture:**
`.wayfinder/tools/capture.sh`, `.wayfinder/tools/shoot.html`, `.wayfinder/tools/diff.py`.
Zero dependencies — headless Chrome and python3/PIL, both already present.

    ./.wayfinder/tools/capture.sh /tmp/wf-after 4400
    python3 .wayfinder/tools/diff.py /tmp/wf-baseline /tmp/wf-after

`diff.py` exits non-zero if a single pixel moved, so it can gate a later ticket.

**Coverage:** 3 viewports × 2 locales, scrolled a full viewport at a time to the
foot of each page (en 4707/5460/7154px, fr 4830/5623/7490px), plus the bar alone
at the five widths where it reflows. 7/7 images decoded in every frame.

### The build is reproducible

Two consecutive builds produced byte-identical output across all 53 files. Hash
comparison is therefore a valid cheap first check; screenshots only need to
arbitrate where a ticket legitimately changes CSS text (candidates 3 and 5).

### The harness was not deterministic, and a fixed delay did not fix it

First determinism test: **103,271 changed pixels** on `en-1440x900-s2`, bbox
`(0,0,1440,73)` — exactly the top bar. Cause: the bar's `data-scrolled` is set by
an `IntersectionObserver`, and Chrome screenshots when the page goes idle, so the
observer callback and the capture race.

Adding a 2500ms quiet tail appeared to fix it — two consecutive runs came back
clean. **That was luck.** The third run failed the same way on a different frame
(`s5`, 103,960 px). A race does not yield to a longer timeout.

**This ticket's first fix was also wrong, and its "validated over four runs" claim
did not hold.** Waiting for quiescence still flaked roughly 1 run in 4. Two more
wrong diagnoses followed: `requestAnimationFrame` polling (never fires under
`--virtual-time-budget`, there are no rendering steps), and a "deterministic 46
changed pixels" that was really 46 *missing frames* from a harness whose report
threw a `ReferenceError` — `diff.py` counted a missing frame as one changed
pixel, which disguised a broken capture as a small believable difference.

**The actual cause was in `capture.sh`, not in the waiting.** `shoot()` ran
Chrome twice: once with `--dump-dom` to verify, once with `--screenshot` to
capture. The verification passed on a page load that was then discarded, and the
race played out afresh in the frame that was kept.

Fix: one invocation emits both — `--dump-dom --screenshot=…` together — so a
frame and its own self-report come from the same load. Each frame now writes a
`.json` beside its `.png`, and the capture **fails** if any frame reports
`converged:false` or undecoded images. Validated over **six** runs, all pairs
zero.

Recorded because it generalises, and because of how it failed: three plausible
fixes each produced green runs before the next one exposed them. On this page,
green runs are weak evidence — the verifier needs a reason to be correct, not
just a record of having been.

**State:** closed.
