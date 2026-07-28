import { ui, defaultLang, languages, type Lang } from './ui';

export { languages, defaultLang, type Lang };

/**
 * Derived from `languages`, not restated. Listing the members here as literals
 * let `Lang` and `isLang` drift apart with nothing to catch it.
 */
export const locales = Object.keys(languages) as Lang[];

export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && Object.hasOwn(languages, value);
}

/**
 * Astro.currentLocale is typed as `string | undefined` and is undefined on any
 * route the i18n config does not recognise, so it is narrowed here rather than
 * cast at every call site.
 */
export function useTranslations(locale: string | undefined) {
  return ui[isLang(locale) ? locale : defaultLang];
}

export function langOf(locale: string | undefined): Lang {
  return isLang(locale) ? locale : defaultLang;
}

/**
 * English lives at the root and French under /fr/, so the switcher cannot just
 * swap a prefix — it has to add or remove one. Trailing slash is kept because
 * the canonical URLs and the sitemap both use it.
 *
 * The deploy base is included. On GitHub Pages the site is served under
 * /lambdasoft/, and Astro does not rewrite href strings built in a component —
 * without this the language switcher would point at the domain root and 404.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function pathFor(lang: Lang, pathname: string): string {
  // The prefix set comes from `languages` too. Hardcoding /fr/ here meant a new
  // locale would be stripped by nothing and nest under the old one.
  const prefixed = locales.filter((l) => l !== defaultLang);
  const unbased = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  const bare =
    prefixed.reduce(
      (path, l) => path.replace(new RegExp(`^/${l}(?=/|$)`), ''),
      unbased,
    ) || '/';
  const withSlash = bare.endsWith('/') ? bare : `${bare}/`;
  const localised = lang === defaultLang ? withSlash : `/${lang}${withSlash}`;
  return `${BASE}${localised}`;
}
