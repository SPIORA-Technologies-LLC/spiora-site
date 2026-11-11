import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { copy } from "@/content/en";
import { publicSite } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const { siteUrl, loginUrl } = publicSite();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: copy.meta.title,
    template: "%s — SPIORA",
  },
  description: copy.meta.description,
  applicationName: copy.brand,
  alternates: siteUrl
    ? {
        canonical: "/",
        languages: { en: "/" },
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: copy.brand,
    title: copy.meta.title,
    description: copy.meta.description,
    url: siteUrl || undefined,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <Header loginUrl={loginUrl} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
