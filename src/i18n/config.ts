export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ru: { short: "RU", full: "Русский" },
};

export const htmlLang: Record<Locale, string> = { en: "en", ru: "ru" };

export const ogLocale: Record<Locale, string> = { en: "en_US", ru: "ru_RU" };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** URL prefix for a locale. Russian lives at the root, English under /en. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/** Locale-aware path, e.g. ("ru", "/privacy") -> "/ru/privacy". */
export function localePath(locale: Locale, path = "/"): string {
  const prefix = localePrefix(locale);
  if (path === "/" || path === "") return prefix || "/";
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Link to an anchor on the home page, e.g. ("ru", "demo") -> "/ru#demo". */
export function anchorHref(locale: Locale, anchor: string): string {
  return `${localePrefix(locale) || "/"}#${anchor}`;
}

/** Strip any locale prefix from a pathname: "/ru/privacy" -> "/privacy". */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");
  return stripped || "/";
}
