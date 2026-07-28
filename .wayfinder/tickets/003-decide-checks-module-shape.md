---
title: Decide what the checks module asserts and what its interface is
state: closed
type: grilling
mode: HITL
assignee: claude
blocked-by: []
---

## Question

Candidate 1, the decision half. Fourteen numeric thresholds are part of their
module's interface but live only in prose, and eight comments already
misdescribe the code above them.

Decide, with the human:

- **Which claims become assertions.** The review sorts them into three groups:
  checkable from literals with no rendering; checkable only in a browser;
  and judgements that must stay prose. Confirm the sort — particularly the
  seven judgements ("headings must not outrun what the body supports", "no
  second call to action", "gaps are rhythm"). Turning those into checks would
  be theatre.
- **Where the module lives and what its interface is.** One `run()` returning
  violations, or one assertion per claim? The interface is the test surface —
  decide it deliberately, not by whatever `node:test` makes convenient.
- **How a claim and its value stay adjacent.** The failure mode being fixed is
  that `--ink-muted` and the comment asserting 10.83:1 are three lines apart and
  nothing compares them. Does the check import the token, parse the stylesheet,
  or is the token re-stated in the check? Re-stating rebuilds the original
  problem one level up.
- **What happens to the eight stale comments.** Delete, correct, or replace with
  a pointer to the assertion that now holds the fact.

No new dependencies: `node:test`, `node:assert`, `node:fs`.

---

## Resolution

**Decision: the check parses `src/styles/global.css` and extracts the tokens itself.**
CSS stays the single authority for the palette; a token edit is immediately
re-measured. Cost is a ~20-line regex parser, which the checks module owns.

Rejected — *restate the values in the check*: it writes the palette down a second
time, so changing `--ink-muted` leaves the check passing against the old colour.
That is the bug being fixed, relocated one level up.

Rejected — *move tokens to TypeScript and generate the CSS*: strongest link, but
it adds a build step and stops the stylesheet being hand-authored, which is a
larger change than this bar warrants.

**Interface:** `node --test checks/`. Test files under `checks/`, shared maths in
`checks/lib/`. Assertions carry the claim in their message, so a failure prints
the threshold and the measured value.

**The seven judgements stay prose** — "headings must not outrun what the body
supports", "no second call to action", "gaps are rhythm", and the rest. They are
not thresholds and asserting them would be theatre.

**Stale comments:** replaced by a pointer to the assertion that now holds the
fact, rather than deleted, so the reasoning survives where the number moved.

**State:** closed.
