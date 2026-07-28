# Local markdown tracker

No git remote and no issue tracker on this repo, so wayfinder falls back to the
local-markdown tracker.

- `map.md` — the map. Label `wayfinder:map`. Load this once per session.
- `tickets/NNN-*.md` — child issues of the map. One decision each.

Ticket frontmatter is the tracker:

    state:      open | closed
    type:       research | prototype | grilling | task
    mode:       HITL | AFK
    assignee:   unassigned | <name>      # assigning IS the claim
    blocked-by: [003, 004]               # unblocked when all are closed

The **frontier** is every ticket that is `open`, `unassigned`, and has no open
blocker. Run `.wayfinder/frontier.sh` to list it.
