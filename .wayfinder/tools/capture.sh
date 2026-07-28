#!/usr/bin/env bash
# Capture a full render set. Usage: capture.sh <outdir> <port>
# Dependency-free: headless Chrome + python3/PIL, both already present.
#
# Every frame is captured and self-verified in ONE Chrome invocation. An earlier
# version probed with one run and screenshotted with a second, so the bar's
# IntersectionObserver race played out afresh in the frame that was kept — the
# verification passed on a page that was then thrown away. That produced clean
# results 3 runs in 5 and ~57k-104k changed pixels across the bar in the others.
set -u
OUT="${1:?outdir}"; PORT="${2:-4324}"; PREFIX="${BASE_PREFIX:-}"
mkdir -p "$OUT"
CH=google-chrome
FLAGS="--headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --virtual-time-budget=60000"
FAILED=0

shoot() { # locale, width, height, scrollY, name -> frame + its own report
  local info
  info=$($CH $FLAGS --window-size=1700,1100 --dump-dom --screenshot="$OUT/$5.png" \
        "http://localhost:$PORT$PREFIX/.wf/shoot.html?u=$1&w=$2&h=$3&y=$4" 2>/dev/null \
        | grep -o '<title>[^<]*' | sed 's/<title>//')
  echo "$info" > "$OUT/$5.json"
  echo "$info" | python3 -c "
import json,sys
try: d=json.load(sys.stdin)
except Exception: print('  UNREADABLE REPORT: $5'); sys.exit(1)
if d.get('converged') is False:
    print('  NOT CONVERGED: $5 bar=%s want=%s' % (d.get('scrolled'), d.get('want'))); sys.exit(1)
if d.get('dec','0/0').split('/')[0] != d.get('dec','0/1').split('/')[1]:
    print('  IMAGES NOT DECODED: $5 %s' % d.get('dec')); sys.exit(1)
" || FAILED=1
  python3 -c "
from PIL import Image
Image.open('$OUT/$5.png').convert('RGB').crop((0,0,$2,$3)).save('$OUT/$5.png')"
  echo "$info"
}

for U in "$PREFIX/" "$PREFIX/fr/"; do
  L=$([ "$U" = "$PREFIX/" ] && echo en || echo fr)
  for VP in 1440x900 800x900 390x780; do
    W=${VP%x*}; H=${VP#*x}
    INFO=$(shoot "$U" "$W" "$H" 0 "${L}-${VP}-s0")
    PAGE=$(echo "$INFO" | tail -1 | python3 -c "import json,sys;print(json.load(sys.stdin)['page'])")
    echo "  $L $VP  page=${PAGE}px"
    K=1; Y=$H
    while [ "$Y" -lt "$PAGE" ]; do
      shoot "$U" "$W" "$H" "$Y" "${L}-${VP}-s${K}" >/dev/null
      K=$((K+1)); Y=$((K*H))
    done
  done
done

for W in 390 520 700 1060 1440; do shoot "$PREFIX/fr/" "$W" 200 0 "bar-fr-${W}" >/dev/null; done

( cd "$OUT" && sha256sum *.png | sort -k2 > MANIFEST.sha256 )
echo "  frames: $(ls -1 "$OUT"/*.png | wc -l)"
[ "$FAILED" -ne 0 ] && { echo "  CAPTURE INVALID"; exit 1; }
exit 0
