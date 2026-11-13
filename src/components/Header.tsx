"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HeaderLogo } from "@/components/HeaderLogo";
import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { anchorHref } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

type HeaderProps = {
  loginUrl: string;
};

const LOGO_MOTION = "(prefers-reduced-motion: reduce)";

export function Header({ loginUrl }: HeaderProps) {
  const locale = useLocale();
  const { copy } = useDictionary();
  const links = [
    { href: anchorHref(locale, "modules"), label: copy.nav.product },
    { href: anchorHref(locale, "case"), label: copy.nav.howItWorks },
    { href: anchorHref(locale, "security"), label: copy.nav.security },
    { href: anchorHref(locale, "implementation"), label: copy.nav.implementation },
    { href: anchorHref(locale, "team"), label: copy.nav.team },
  ];
  const demoHref = anchorHref(locale, "demo");
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [logoPlaying, setLogoPlaying] = useState(false);
  const finishLogo = useCallback(() => setLogoPlaying(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !detailsRef.current?.open) return;
      event.preventDefault();
      detailsRef.current.open = false;
      summaryRef.current?.focus();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function closeMenu() {
    if (!detailsRef.current?.open) return;
    detailsRef.current.open = false;
    summaryRef.current?.focus();
  }

  const playLogo = useCallback(() => {
    if (window.matchMedia(LOGO_MOTION).matches) return;
    setLogoPlaying(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setLogoPlaying(true));
    });
  }, []);

  useEffect(() => {
    playLogo();
    window.addEventListener("spiora-logo-play", playLogo);
    return () => window.removeEventListener("spiora-logo-play", playLogo);
  }, [playLogo]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <div className="container header-bar">
        <Link className="logo-link" href={anchorHref(locale, "top")} aria-label={copy.brand} onClick={playLogo}>
          <HeaderLogo playing={logoPlaying} onDone={finishLogo} />
        </Link>

        <nav className="desktop-nav" aria-label={copy.nav.label}>
          {links.map((link) => (
            <Link key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </Link>
          ))}
          {loginUrl ? (
            <a className="nav-link" href={loginUrl}>
              {copy.nav.login}
            </a>
          ) : null}
          <Button variant="outline" href={demoHref}>
            {copy.nav.discuss}
          </Button>
          <LanguageSwitcher />
        </nav>

        <details
          ref={detailsRef}
          className="mobile-details"
          onToggle={(event) => setOpen(event.currentTarget.open)}
        >
          <summary ref={summaryRef} className="menu-toggle" aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}>
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </summary>
          <nav className="mobile-nav" aria-label={copy.nav.label}>
            {links.map((link) => (
              <Link key={link.href} className="nav-link" href={link.href} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
            {loginUrl ? (
              <a className="nav-link" href={loginUrl}>
                {copy.nav.login}
              </a>
            ) : null}
            <Button variant="outline" href={demoHref} onClick={closeMenu}>
              {copy.nav.discuss}
            </Button>
            <LanguageSwitcher />
          </nav>
        </details>
      </div>
    </header>
  );
}
