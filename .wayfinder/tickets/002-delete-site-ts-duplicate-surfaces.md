---
title: Delete the duplicate surfaces in site.ts
state: closed
type: task
mode: AFK
assignee: claude
blocked-by: [001]
---

## Question

Candidate 2. Three of `site.ts`'s seven exports are duplicate surfaces for facts
that live elsewhere.

- `nav` (`site.ts:9-14`) — imported by nothing. Both real consumers read
  `t.nav.items`. It also still contains `#process`, which matches no `id`
  anywhere, and English-only labels duplicating translated ones. Deleting it
  leaves exactly one nav authority.
- `formEndpoint` (`site.ts:29`) — a third shape for one empty string, which is
  already exported directly and already reduced to `formIsLive`.
- `emailIsPlaceholder` (`site.ts:28`) — a hand-set literal sitting next to
  `formIsLive`, which is derived. Two adjacent fields, two disciplines. Derive it.

Deleting `nav` and `formEndpoint` concentrates: one authority per fact.

Expected render delta: **zero**. None of the three is read on a path that emits
markup, except `emailIsPlaceholder`, which gates the JSON-LD `ContactPoint` —
and deriving it must keep that gate closed while the address is still the
placeholder. Assert that the emitted JSON-LD is unchanged.

---

## Resolution

`src/site.ts`: 34 lines → 31, exports 6 symbols → **1**.

**Deleted as dead** (verified: imported by nothing; the matches in `ui.ts` and
`Contact.astro` are the identifier *names quoted as user-facing text* in the
"not connected" notice, not imports):

- `nav` — the stale four-item list containing `#process`, which matches no `id`.
  `ui.ts` is now the only nav authority.
- `PLACEHOLDER_EMAIL`, `FORM_ENDPOINT` — demoted to module-local constants.

**Two more dead exports the ticket did not scope, same defect class:**

- `site.title` — dead **and stale**: it still read
  `'lambdasoft: full-stack software engineering'`, the colon-and-category title
  replaced days ago. Pages pass `t.meta.title`. It never shipped, but anyone
  reading `site.ts` would have believed it.
- `site.description` — dead for the same reason.

**`emailIsPlaceholder` is now derived.** It was a hand-set literal sitting beside
a derived `formIsLive` — two adjacent fields, two disciplines. Both facts now use
the same shape: one constant that is empty until real, everything else derived.

    const CONTACT_EMAIL = '';
    email:              CONTACT_EMAIL || PLACEHOLDER_EMAIL,
    emailIsPlaceholder: CONTACT_EMAIL.length === 0,

Setting `CONTACT_EMAIL` now flips the address and the JSON-LD gate atomically.
Previously, replacing the address without also flipping the flag would have
published a real inbox that search engines were still told to ignore.

### Verification

**All 53 build outputs byte-identical to the baseline.** Since the build is
reproducible (ticket 001), byte-identical output entails an identical render —
a stronger guarantee than a screenshot diff, so no capture was needed.

`contactPoint` still absent from the emitted JSON-LD; `<title>` unchanged.

**Changed pixels: 0.**

**State:** closed.
