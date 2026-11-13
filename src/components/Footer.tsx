"use client";

import Image from "next/image";
import Link from "next/link";
import { anchorHref, localePath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

export function Footer() {
  const locale = useLocale();
  const { copy } = useDictionary();
  const links = [
    { href: anchorHref(locale, "modules"), label: copy.nav.product },
    { href: anchorHref(locale, "case"), label: copy.nav.howItWorks },
    { href: anchorHref(locale, "security"), label: copy.nav.security },
    { href: anchorHref(locale, "team"), label: copy.footer.company },
    { href: anchorHref(locale, "contacts"), label: copy.nav.contacts },
  ];
  const linkedin = copy.contacts.linkedin;

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-main">
        <Link
          className="footer-brand-link"
          href={anchorHref(locale, "top")}
          aria-label={copy.brand}
          onClick={() => window.dispatchEvent(new Event("spiora-logo-play"))}
        >
          <Image className="footer-logo" src="/logo-wordmark.svg" alt="" width={330} height={48} unoptimized />
        </Link>
        <p className="footer-blurb">{copy.footer.blurb}</p>

        <nav className="footer-nav" aria-label={copy.footer.platform}>
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {linkedin ? (
              <li className="footer-social">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 448 512" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                    />
                  </svg>
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span className="footer-line" aria-hidden="true" />
        <p>
          {copy.footer.copyright}
          <span className="footer-dot" aria-hidden="true">
            ·
          </span>
          <Link href={localePath(locale, "/privacy")}>{copy.footer.privacy}</Link>
        </p>
      </div>
    </footer>
  );
}
