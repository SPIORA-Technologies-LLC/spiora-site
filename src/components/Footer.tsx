import Link from "next/link";
import { copy } from "@/content/en";

type FooterProps = {
  salesEmail: string;
};

export function Footer({ salesEmail }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-bar">
        <div>
          <p className="footer-brand">SPIORA</p>
          <p className="footer-slogan">{copy.footer.slogan}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {salesEmail ? (
            <a href={`mailto:${salesEmail}`}>
              {copy.footer.sales}: {salesEmail}
            </a>
          ) : null}
          <Link href="/privacy">{copy.footer.privacy}</Link>
        </nav>
      </div>
    </footer>
  );
}
