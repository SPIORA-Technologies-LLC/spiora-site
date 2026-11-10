"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HeaderLogo } from "@/components/HeaderLogo";
import "@/lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { copy } from "@/content/en";

const links = [
  { href: "/#modules", label: copy.nav.features },
  { href: "/#security", label: copy.nav.security },
  { href: "/#team", label: copy.nav.team },
  { href: "/#contacts", label: copy.nav.contacts },
] as const;

type HeaderProps = {
  loginUrl: string;
};

const LOGO_MOTION = "(prefers-reduced-motion: reduce)";

export function Header({ loginUrl }: HeaderProps) {
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
    if (detailsRef.current) detailsRef.current.open = false;
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
        <Link className="logo-link" href="/#top" aria-label="SPIORA" onClick={playLogo}>
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
          <Link className="btn btn-outline" href="/#demo">
            {copy.nav.demo}
          </Link>
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
            <Link className="btn btn-outline" href="/#demo" onClick={closeMenu}>
              {copy.nav.demo}
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
