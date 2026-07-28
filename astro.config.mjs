// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Defaults target the GitHub Pages demo, because that is where this actually
  // resolves today. When lambdasoft.com is registered, build with:
  //   SITE_URL=https://lambdasoft.com BASE_PATH=/ npm run build
  // This is the base for the canonical URL, hreflang, the sitemap, og:image and
  // the JSON-LD @ids, so all of them follow from these two values.
  site: process.env.SITE_URL ?? 'https://kamkoum04.github.io',
  base: process.env.BASE_PATH ?? '/lambdasoft',
  trailingSlash: 'always',
  // English at the root, French under /fr/. prefixDefaultLocale stays false so
  // the existing / URL keeps working and nothing that already links to it breaks.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } } })],
  build: { inlineStylesheets: 'auto' },
});
