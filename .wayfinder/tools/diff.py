#!/usr/bin/env python3
"""Compare two capture sets. Exits 1 if any pixel moved."""
import sys, pathlib
from PIL import Image, ImageChops
a, b = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
names = sorted({p.name for p in a.glob('*.png')} | {p.name for p in b.glob('*.png')})
na, nb = len(list(a.glob('*.png'))), len(list(b.glob('*.png')))
if na != nb:
    # Counting a missing frame as one "changed pixel" once disguised a broken
    # capture (5 frames instead of 51) as a small, stable, believable diff.
    print(f'  FRAME COUNT MISMATCH: {na} vs {nb} — the capture is incomplete, not the page')
total = 0; worst = []
for n in names:
    pa, pb = a/n, b/n
    if not pa.exists(): print(f'  + {n} (new frame)'); total += 1; continue
    if not pb.exists(): print(f'  - {n} (frame gone)'); total += 1; continue
    ia, ib = Image.open(pa).convert('RGB'), Image.open(pb).convert('RGB')
    if ia.size != ib.size:
        print(f'  ! {n} size {ia.size} -> {ib.size}'); total += 1; continue
    bbox = ImageChops.difference(ia, ib).getbbox()
    if bbox:
        px = sum(1 for p in ImageChops.difference(ia, ib).getdata() if p != (0,0,0))
        total += px; worst.append((px, n, bbox))
worst.sort(reverse=True)
for px, n, box in worst[:12]:
    print(f'  ~ {n}: {px} px changed, bbox {box}')
print(f'\n  frames: {len(names)}   changed pixels: {total}')
sys.exit(1 if total else 0)
