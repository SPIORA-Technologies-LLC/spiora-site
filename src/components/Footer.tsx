"use client";

import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/en";
import { Button } from "@/components/ui/Button";

const platform = [
  { href: "/#modules", label: copy.nav.features },
  { href: "/#security", label: copy.nav.security },
  { href: "/privacy", label: copy.footer.privacy },
] as const;

const company = [
  { href: "/#team", label: copy.nav.team },
  { href: "/#contacts", label: copy.nav.contacts },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link
            className="footer-brand-link"
            href="/#top"
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
          <Button variant="outline" href="/#demo">
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
