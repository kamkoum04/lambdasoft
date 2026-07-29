# Brand artwork

Official vendor artwork, fetched from the gilbarbara/logos mirror of the
published assets — never redrawn, never approximated from memory.

- `aws.svg` — the AWS logo in its official **reversed** colourway: white
  letters, #FF9900 smile. The primary colourway sets the letters in #252F3E,
  which measures ~1.16:1 on our tile; AWS's own guidelines prescribe the white
  version on dark backgrounds. Only the letter fill was changed, to the colour
  AWS themselves publish. Do not invent other colourways.
- `google-cloud.svg` — the Google Cloud mark in its official four colours,
  untouched. (simple-icons ships only a monochrome simplification; this is the
  real one.)

`checks/contrast.test.mjs` asserts every fill in these files clears 3:1 on the
grid tile.
