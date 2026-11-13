"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { anchorHref, localePath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

export function Footer() {
  const locale = useLocale();
  const { copy } = useDictionary();
  const platform = [
    { href: anchorHref(locale, "modules"), label: copy.nav.product },
    { href: anchorHref(locale, "case"), label: copy.nav.howItWorks },
    { href: anchorHref(locale, "security"), label: copy.nav.security },
    { href: anchorHref(locale, "implementation"), label: copy.nav.implementation },
  ];
  const company = [
    { href: anchorHref(locale, "team"), label: copy.nav.team },
    { href: anchorHref(locale, "contacts"), label: copy.nav.contacts },
    { href: localePath(locale, "/privacy"), label: copy.footer.privacy },
  ];
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link
            className="footer-brand-link"
            href={anchorHref(locale, "top")}
            aria-label={copy.brand}
            onClick={() => window.dispatchEvent(new Event("spiora-logo-play"))}
          >
            <Image className="footer-logo" src="/logo2.svg" alt="" width={178} height={40} unoptimized />
          </Link>
          <p className="footer-blurb">{copy.footer.blurb}</p>
        </div>

        <nav className="footer-col" aria-labelledby="footer-platform">
          <h2 className="footer-label" id="footer-platform">
            {copy.footer.platform}
          </h2>
          <ul>
            {platform.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-labelledby="footer-company">
          <h2 className="footer-label" id="footer-company">
            {copy.footer.company}
          </h2>
          <ul>
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-demo">
          <h2 className="footer-label" id="footer-demo">
            {copy.footer.demo}
          </h2>
          <p className="footer-blurb">{copy.footer.demoLead}</p>
          <Button variant="outline" href={anchorHref(locale, "demo")}>
            {copy.nav.demo}
          </Button>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}
