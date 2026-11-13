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

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link
          className="footer-brand-link"
          href={anchorHref(locale, "top")}
          aria-label={copy.brand}
          onClick={() => window.dispatchEvent(new Event("spiora-logo-play"))}
        >
          <Image className="footer-logo" src="/logo2.svg" alt="" width={200} height={45} unoptimized />
        </Link>
        <p className="footer-blurb">{copy.footer.blurb}</p>

        <nav className="footer-nav" aria-label={copy.footer.platform}>
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
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
