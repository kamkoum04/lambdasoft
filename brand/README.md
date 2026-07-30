# lambdasoft brand assets

Everything here is served from the site root. A file at `public/brand/mark.png`
is reachable at `/brand/mark.png` in dev and in the build — no import needed.

## Where these came from

One master: `image/logo_wallpaper.jpg`, hue-rotated from green to cyan-blue.
Only the hue moved. Every highlight, shadow and capsule crossing sits exactly
where the original render put it, so the depth is the source artwork's, not an
approximation of it.

The blues are the committed ramp in `src/styles/global.css` — nothing new was
invented for these files:

| token           | value     |
|-----------------|-----------|
| `--void`        | `#02081c` |
| `--survey-navy` | `#03045e` |
| `--ridge-blue`  | `#0077b6` |
| `--signal-cyan` | `#00b4d8` |
| `--glacier`     | `#90e0ef` |
| `--frost`       | `#caf0f8` |

The wordmark is Manrope 700 at `-0.038em` tracking — the same setting
`Footer.astro` uses for `.foot__mark`, so the lockup and the live footer can
never drift apart.

## The mark alone

| file | size | use |
|---|---|---|
| `mark.png` / `.webp` | 1600×1536 | The transparent master. Cut everything else from this. |
| `mark-750.png` | 750×720 | Same, at the source's native resolution. |
| `mark-tile-1024.png` | 1024² | Black square, generous padding. Slide corners, video bugs, watermarks. |
| `mark-tile-tight-1024.png` | 1024² | Same, less padding. When the container is already small. |
| `mark-tile-512.png` | 512² | Pre-sized. |
| `mark-tile-256.png` | 256² | Pre-sized. |
| `avatar-round-1024.png` | 1024² | Circle-cropped. LinkedIn, GitHub, X, Slack, Discord. |
| `avatar-round-400.png` | 400² | Same, upload-sized. |

## With the name

| file | size | use |
|---|---|---|
| `lockup-horizontal-black.png` | 1700×480 | Primary lockup on its own black panel. |
| `lockup-horizontal.png` / `.webp` | 1076×199 | Cut out, **white** wordmark — for dark surfaces. |
| `lockup-horizontal-darktext.png` / `.webp` | 1076×199 | Cut out, **navy** wordmark — for white paper and light decks. |
| `lockup-stacked-black.png` | 1100×900 | Mark over name, black panel. Narrow columns, phones. |
| `lockup-stacked.png` | 670×429 | Same, cut out. |

Pick by background, not by taste: white text vanishes on white paper.

## Long containers

| file | size | use |
|---|---|---|
| `banner-2400x600.png` / `.webp` | 2400×600 | 4:1. GitHub header, README top, LinkedIn cover, email header. |
| `og-card.png` | 1200×630 | Open Graph / link previews. |
| `og-card.jpg` | 1200×630 | Same card as JPEG — some scrapers still prefer it. |

## Platform icons

| file | size | use |
|---|---|---|
| `apple-touch-icon.png` | 180² | iOS home screen. |
| `icon-192.png`, `icon-512.png` | 192², 512² | PWA manifest, Android. |
| `favicon-32.png`, `favicon-16.png` | 32², 16² | Legacy tab icons. |
| `favicon-mark.svg` | vector | The flat Λ, for the browser tab. See below. |

## One caveat about the tab

The hue-rotated mark is a raster with real 3D shading. At 16×16 that shading has
nowhere to go and the mark turns to mush — compare `favicon-16.png` against
`favicon-mark.svg` at actual size.

`favicon-mark.svg` is the same Λ in the same blues, redrawn flat as two
round-capped strokes so it survives the shrink. It is under 400 bytes and it is
**not wired up** — `public/favicon.svg` is still the original λ. To switch:

```html
<link rel="icon" href="/brand/favicon-mark.svg" type="image/svg+xml" />
```

## Not yet wired up

`src/layouts/Base.astro` currently sets `twitter:card` to `summary_large_image`
but declares no `og:image`, so link previews render blank. To fix:

```astro
<meta property="og:image" content={new URL('/brand/og-card.png', Astro.site)} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="twitter:image" content={new URL('/brand/og-card.png', Astro.site)} />
<link rel="apple-touch-icon" href="/brand/apple-touch-icon.png" />
```

`og:image` must be an absolute URL — relative paths are ignored by every scraper.

## Using one in a component

```astro
<img src="/brand/lockup-horizontal.png" alt="lambdasoft" width="1076" height="199" />
```

Files under `public/` are copied verbatim and are not optimised by Astro. For
anything rendered in-page, prefer the `.webp` where one exists — `mark.webp` is
159 KB against 740 KB for the PNG, pixel for pixel.
