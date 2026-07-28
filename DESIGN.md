<!-- Tokens below are live: they mirror src/styles/global.css.
     Scope today is the landing hero and the top bar. Sections are being added
     one at a time; re-run $impeccable document as the system grows. -->
---
name: lambdasoft
description: Full-stack software partner. Web, mobile, desktop, cloud, AI.
colors:
  void: "#02081C"
  deep: "#05122C"
  ring: "#75D1FF"
  glow: "#CBFFFF"
  survey-navy: "#03045E"
  ridge-blue: "#0077B6"
  signal-cyan: "#00B4D8"
  glacier: "#90E0EF"
  frost: "#CAF0F8"
  ink: "#FFFFFF"
  ink-muted: "#9FC4DD"
  action: "#F2F8FC"
typography:
  display:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.3rem + 4vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope Variable, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.005em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "20px"
  pill: "999px"
components:
  action:
    textColor: "{colors.ink}"
    typography: "600 1.0625rem"
  action-quiet:
    textColor: "{colors.ink-muted}"
    typography: "500 0.9375rem"
---

# Design System: lambdasoft

## Overview

**Creative North Star: "Still Water"**

A flat black sea at night with a single ring of light burning under the surface. Nothing on the surface moves, and all of the energy is below it. That is the argument lambdasoft is making: the interesting work is underneath, in the infrastructure and the code, not in the thing the customer looks at.

The whole system is derived from one photograph, `src/assets/night-water.jpg`. Its sky supplies the page background, its ring supplies the accent, and its composition dictates the layout: the frame is dark and empty for its top half, then the horizon ignites and the glowing pool takes over. Because light type fails against that glow, **all content lives in the top of the frame and the lower half is left to the photograph**. The restraint is not stylistic, it is measured.

The register is dark, calm and soft. Edges are rounded, controls are flat, and the interface stays out of the photograph's way. What this system rejects is the version of itself that tries too hard: purple-to-blue mesh, neon edge lighting, floating geometry, glass panels stacked for texture, and fabricated dashboards. The palette is blue and the subject is AI, which is precisely the combination that drifts into the generated-startup look, so the guard is deliberate.

**Key Characteristics:**
- The hero owns the entire first screen at every viewport height
- Content is confined to the type-safe top of the photograph, never over the glow
- The photograph owns the colour; the interface is white, near-black and one thin accent
- Centred composition, following the image's own symmetry
- Soft: pill actions, 20px panels, generous leading, no hard rules
- One typeface at contrasting weights

## Colors

One dark ground, one luminous accent, and a narrow blue ramp between them. Every value except the neutrals is sampled from the photograph or inherited from the committed brand ramp.

### Primary
- **Void** (`#02081C`): The page. Taken from the top of the photograph's sky so the interface and the image are the same surface. Everything else is measured against it.

### Secondary
- **Ring** (`#75D1FF`): The glow on the water, and the entire accent budget. The logo mark, focus rings, and the nav link underline. 11.69:1 on Void.
- **Signal Cyan** (`#00B4D8`): The deeper end of the accent, held in reserve. 8.08:1 on Void.

### Tertiary
- **Deep** (`#05122C`): Raised surfaces and the scrolled top bar. A step off the page, never a border.
- **Ridge Blue** (`#0077B6`): 4.09:1 on Void. Large text and non-text structure only. Not an ink.

### Neutral
- **White** (`#FFFFFF`): Headlines. 19.92:1 on Void, and 18.27:1 measured where the headline actually sits on the photograph.
- **Frost** (`#CAF0F8`): Body copy on the page ground. 16.44:1.
- **Ink Muted** (`#9FC4DD`): Supporting copy and the hero description. 10.83:1 on Void, 8.41:1 measured where it sits on the photograph. This is the floor; nothing dimmer carries text.

### Named Rules

**The Top Half Rule.** Light text is only legible in the top 52% of the hero photograph. At 55% the effective background reaches `#3F77B9` and frost drops to 3.81:1; by 58% everything fails. The content block is therefore biased upward rather than truly centred: its optical centre lands near 38%, set by a trailing padding of `calc(26svh + bar-height)`, and the type steps down below 800px viewport height. Raise that padding to lift the block. Never place body text over the horizon or the pool.

**The Crossing Rule.** Nothing crosses the horizon. Plain white text measures 2.75:1 over the bright band and its underline 1.70:1, both failing, and a filled control placed there needs a rim to stay identifiable at all. Rather than armour the interface against its own background, the content block finishes above the glow. Anything added low in the frame must be measured on the rendered page, never assumed from the token values.

**The One Light Rule.** There is a single source of light on any screen, exactly as in the photograph, and it is the glowing pool. The interface does not compete with it: the primary action is white, and cyan is spent only on small marks (the logo glyph, a focus ring, a hover underline). If cyan starts filling surfaces, the image and the interface are fighting.

**The No Gloss Rule.** Interface elements are flat. A vertical light-to-dark gradient on a control is the Web 2.0 button formula and dates a page instantly, as does a wide diffuse colour glow behind it. Depth comes from a hairline inner shade and a tight shadow. Gradients belong to the photograph, not to the interface. Purple-to-blue, pink-to-orange, mesh and rainbow gradients are prohibited outright.

## Typography

**Display Font:** Manrope Variable (with system-ui, sans-serif)
**Body Font:** Manrope Variable, same family at lighter weights

**Character:** Open apertures and softly cut terminals. Manrope is what keeps a near-black page from reading cold and severe; a hard grotesk in this palette turns technical into forbidding. Hierarchy comes from weight and scale within the one family.

Chosen against the register's reflex-reject list. Inter, DM Sans, Plus Jakarta Sans, Outfit, Instrument Sans, Space Grotesk and IBM Plex remain prohibited. Inter in particular is what the nearest competitor in this category already ships.

### Hierarchy
- **Display** (700, `clamp()` max 4.5rem, line-height 1.1, tracking -0.02em): The hero statement. One per page. Steps down below 820px viewport height so it never reaches the glow.
- **Body** (400, 1.7 line-height, +0.005em tracking): All prose. Light type on a dark ground reads lighter than it measures, so it takes more leading and slight positive tracking than a light-mode setting would.
- **Lead** (`clamp()` to 1.25rem, 1.62 line-height, Ink Muted): The hero description only.

### Named Rules

**The Dark Leading Rule.** Body copy on the dark ground carries at least 1.7 line-height and positive letter-spacing. A light-mode setting transplanted onto black looks thin and tight, and it is the most common reason dark pages feel hard to read.

## Elevation

Near-flat. Depth comes from the photograph, not from the interface. Surfaces separate by tint (`--void` to `--deep`) and by translucency, never by a border plus a shadow.

There are no drop shadows in the interface. The hero control gets its dimension from a backdrop blur and a single inner top highlight, not from a shadow beneath it. The only glow on the page is the one in the photograph, and the interface never adds a second light source.

### Named Rules

**The No Ghost-Card Rule.** A 1px border and a wide soft drop shadow must never appear on the same element. Pick one. This pattern is the most reliable tell of generated UI.

## Components

### The hero action (`.cta`)
A frosted pill, not a filled one. The photograph shows through it, so it belongs to the scene rather than sitting on top of it. This came after a filled control was tried three ways (glossy gradient, flat white, outlined) and each one read as pasted on.

- **Shape:** full pill, 3.25rem minimum height.
- **Surface:** 12% frost fill, 16px backdrop blur with a light saturation lift, and a single 1px inner highlight along the top edge so it reads as a surface catching light from above.
- **Border:** 62% frost, 1px. This opacity is load-bearing, not aesthetic. The translucent fill only reaches about 1.5:1 against the sky, so the border alone carries the control's boundary. Measured on the rendered page it holds 3.96:1, 4.03:1 and 4.30:1 at 800, 900 and 1080px. Lowering it below roughly 55% breaks WCAG 1.4.11.
- **Label:** white, 10.3:1 to 11.2:1 against the frosted fill.
- **Hover:** fill lifts to 17%, border takes the Ring colour, the whole pill rises 1px and the arrow slides 4px. No glow, no gradient, no gloss.

### The stack strip (`StackStrip`)
Fifteen technology marks sitting on the photograph's waterline, with no container behind them.

- **Colour is inverted here, and that is deliberate.** Across the lit horizon band a dark mark measures 4.6:1 to 13.7:1, while a light one collapses to 1.2–3.6:1 and brand colours fare worse than either (AWS orange lands near 1.05:1). The marks are therefore navy silhouettes at 82% opacity, measured at 6.9–7.6:1 on the rendered page. This is the only element on the site that is dark-on-light, and the photograph is the reason.
- **Position:** `inset-block-start: 59%`. The waterline drifts a few percent as the image crops at different aspect ratios, so this value centres the marks on the split across 800, 900 and 1080px rather than nailing one height. Measured offset stays within about 30px of the line.
- **Motion:** an infinite marquee, the set rendered twice and translated −50%, paused on hover and stopped entirely under `prefers-reduced-motion`. Both edges are dissolved with a `mask-image` gradient so marks fade rather than clip.
- **Marks:** official paths from `simple-icons`. AWS is absent from that set, Amazon having had it withdrawn over trademark policy, so it appears as a wordmark rather than a redrawn logo. Never redraw a protected mark from memory.
- The whole strip is `aria-hidden`; a visually hidden sentence carries the list for screen readers, because a scrolling marquee of logos is noise to a screen reader.

### Text action (`.action`)
A label with a rule under it and an arrow beside it, used for the quieter top-bar action. The rule is present at rest, not only on hover: a bare text link that gives no signal until pointed at is a discoverability failure, and hover does not exist on touch at all.

### Top bar
- Fixed, transparent over the hero, becoming a 72% Void surface with a 14px blur and a faint frost hairline once the hero has scrolled past.
- Three columns: wordmark left with the lambda glyph in Ring, section links centred, one ghost action right. The grid keeps the centre column optically centred in the viewport regardless of how wide the wordmark or action become.
- Links hide below 58rem, leaving wordmark and action. A mobile menu lands when there is enough navigation to justify one.
- Link hover grows a 1px Ring underline from the centre. That is the entire interaction budget for a nav link.
- **The links currently point at sections that do not exist yet** (`#build`, `#process`, `#contact`). This is a deliberate, time-boxed state: those three sections are the next thing built. If they are not built, the links must be removed rather than left dangling.

## Do's and Don'ts

### Do:
- **Do** keep every piece of text inside the top 52% of the hero photograph, per the Top Half Rule.
- **Do** use White for the headline and Ink Muted for supporting copy. Nothing dimmer than `#9FC4DD` carries text.
- **Do** let the photograph carry the lower half of the screen on its own. Empty is correct there.
- **Do** keep any control translucent so the photograph reads through it, and give its border enough opacity to carry the boundary on its own.
- **Do** give dark-ground body copy 1.7 line-height and positive tracking.
- **Do** gate all motion behind `prefers-reduced-motion`, with a static, fully legible fallback. Content is visible by default and the entrance only enhances it.

### Don't:
- **Don't** place text over the horizon glow or the glowing pool. It fails contrast and it covers the one thing worth looking at.
- **Don't** introduce a second accent colour, and don't fill a surface with cyan. It belongs to the photograph.
- **Don't** give a hero control an opaque fill. Frosted works because the image survives it; solid always reads as pasted on.
- **Don't** put a vertical light-to-dark gradient or a diffuse colour glow on anything. That combination is the single clearest way to make this page look a decade old.
- **Don't** use purple-to-blue, mesh, or rainbow gradients. Single hue, low chroma, primary action only.
- **Don't** add neon edge lighting, floating orbs, glass panels used as texture, or fabricated dashboard screenshots.
- **Don't** put navigation links in the bar for sections that do not exist yet.
- **Don't** use marketing buzzwords: unleash, elevate, revolutionize, next-gen, seamless, empower, transformative.
- **Don't** fabricate proof: no invented client logos, no made-up metrics, no case studies for work that was not done.
- **Don't** use Ridge Blue for body copy. 4.09:1 on Void fails AA.
