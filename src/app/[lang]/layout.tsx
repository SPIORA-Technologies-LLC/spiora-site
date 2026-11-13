import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Manrope } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/lib/fontawesome";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/content";
import { defaultLocale, htmlLang, isLocale, localePath, locales, ogLocale, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { publicSite } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const { siteUrl, loginUrl } = publicSite();

type LayoutParams = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

async function resolveLocale(params: LayoutParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang;
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { copy } = getDictionary(locale);

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: copy.meta.title,
      template: "%s — SPIORA",
    },
    description: copy.meta.description,
    applicationName: copy.brand,
    alternates: siteUrl
      ? {
          canonical: localePath(locale, "/"),
          languages: {
            en: localePath("en", "/"),
            ru: localePath("ru", "/"),
            "x-default": localePath(defaultLocale, "/"),
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocale[item]),
      siteName: copy.brand,
      title: copy.meta.title,
      description: copy.meta.description,
      url: siteUrl ? `${siteUrl}${localePath(locale, "/") === "/" ? "" : localePath(locale, "/")}` : undefined,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LayoutParams>) {
  const locale = await resolveLocale(params);

  return (
    <html lang={htmlLang[locale]} className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <Header loginUrl={loginUrl} />
          {children}
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
