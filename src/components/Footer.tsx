import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/en";

const explore = [
  { href: "/#modules", label: copy.nav.features },
  { href: "/#ai", label: copy.nav.ai },
  { href: "/#security", label: copy.nav.security },
  { href: "/#team", label: copy.nav.team },
  { href: "/#contacts", label: copy.nav.contacts },
  { href: "/#demo", label: copy.nav.demo },
] as const;

type FooterProps = {
  salesEmail: string;
  loginUrl: string;
};

export function Footer({ salesEmail, loginUrl }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link className="footer-brand" href="/#top" aria-label="SPIORA">
          <Image className="footer-logo" src="/logo2.svg" alt="" width={222} height={50} unoptimized />
        </Link>

        <nav className="footer-col" aria-label={copy.footer.explore}>
          <p className="footer-label">{copy.footer.explore}</p>
          <ul>
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            {loginUrl ? (
              <li>
                <a href={loginUrl}>{copy.nav.login}</a>
              </li>
            ) : null}
          </ul>
        </nav>

        <nav className="footer-col" aria-label={copy.footer.company}>
          <p className="footer-label">{copy.footer.company}</p>
          <ul>
            <li>
              <Link href="/privacy">{copy.footer.privacy}</Link>
            </li>
            {salesEmail ? (
              <li>
                <a href={`mailto:${salesEmail}`}>
                  {copy.footer.sales}: {salesEmail}
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>{copy.footer.copyright}</p>
      </div>
    </footer>
  );
}
