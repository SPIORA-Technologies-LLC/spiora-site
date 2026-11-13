"use client";

import { usePathname } from "next/navigation";
import { localeNames, localePath, locales, stripLocale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

export function LanguageSwitcher() {
  const locale = useLocale();
  const { copy } = useDictionary();
  const path = stripLocale(usePathname() || "/");

  return (
    <div className="lang-switch" role="group" aria-label={copy.ui.language}>
      {locales.map((item) => {
        const active = item === locale;
        const href = localePath(item, path);
        return (
          <a
            key={item}
            className={active ? "lang-option is-active" : "lang-option"}
            href={href}
            hrefLang={item}
            lang={item}
            aria-current={active ? "true" : undefined}
            aria-label={localeNames[item].full}
            onClick={(event) => {
              if (active) {
                event.preventDefault();
                return;
              }
              // Keep the reader on the same section after switching.
              if (window.location.hash) {
                event.preventDefault();
                window.location.assign(`${href}${window.location.hash}`);
              }
            }}
          >
            {localeNames[item].short}
          </a>
        );
      })}
    </div>
  );
}
