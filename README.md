# lambdasoft

Landing page for lambdasoft — a full-stack software studio. Astro, static output,
English and French.

**Demo:** https://kamkoum04.github.io/lambdasoft/

## Running it

```bash
npm install
npm run dev        # dev server
npm run build      # static build into dist/
npm run preview    # serve the build
```

## Checks

There are no test dependencies. Checks run on Node's built-in test runner.

```bash
npm test           # 17 assertions: contrast, i18n parity, anchors, honesty
npm run check:render   # needs a browser: hero geometry at 6 viewport/locale pairs
```

`npm test` asserts the things that used to live only in comments — WCAG contrast
ratios computed from the tokens in `src/styles/global.css`, key parity between
locales, French spacing rules, that every `href="#…"` resolves, and that the
shipped page loads no third-party scripts (the footer tells visitors it doesn't).

## Layout

```
src/components/   the sections
src/i18n/         every string, both locales
src/styles/       design tokens
checks/           the assertions
docs/adr/         architecture decisions
.wayfinder/       the map for the current refactor effort
DESIGN.md         the design system
PRODUCT.md        who this is for and what it must not do
```

## Known issues

- `npm run check:render` fails at 1440×700 and 390×780: the hero exceeds one
  viewport, so the photograph re-crops. Pre-existing, tracked in
  `.wayfinder/tickets/012-hero-overflows-short-viewports.md`.
- The contact address and the form endpoint are placeholders. Both are set in
  `src/site.ts` and are visibly marked as unset in the page.
