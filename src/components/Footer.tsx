import Image from "next/image";
import Link from "next/link";
import { copy } from "@/content/en";

type FooterProps = {
  salesEmail: string;
};

export function Footer({ salesEmail }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-bar">
        <Image className="footer-logo" src="/logo2.svg" alt="SPIORA" width={222} height={50} unoptimized />
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
