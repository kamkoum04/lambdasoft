#!/usr/bin/env bash
# Lists the frontier: open, unassigned, unblocked tickets.
cd "$(dirname "$0")/tickets" || exit 1
closed=$(grep -l '^state: closed' *.md 2>/dev/null | sed 's/-.*//' | tr '\n' ' ')
for f in *.md; do
  grep -q '^state: open' "$f" || continue
  grep -q '^assignee: unassigned' "$f" || continue
  blockers=$(sed -n 's/^blocked-by: \[\(.*\)\]/\1/p' "$f" | tr -d ' ' | tr ',' '\n')
  open_blocker=0
  for b in $blockers; do
    [ -z "$b" ] && continue
    case " $closed " in *" $b "*) ;; *) open_blocker=1 ;; esac
  done
  [ "$open_blocker" -eq 1 ] && continue
  printf '  %-6s %-9s %s\n' "$(echo "$f" | sed 's/-.*//')" "[$(sed -n 's/^type: //p' "$f")]" "$(sed -n 's/^title: //p' "$f")"
done
