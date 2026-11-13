import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";

type PageProps = { params: Promise<{ lang: string }> };

async function dictionaryFor(params: PageProps["params"]) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return getDictionary(lang);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { copy, locale } = await dictionaryFor(params);
  return {
    title: copy.meta.privacyTitle,
    description: copy.meta.privacyDescription,
    alternates: process.env.NEXT_PUBLIC_SITE_URL
      ? {
          canonical: localePath(locale, "/privacy"),
          languages: {
            en: localePath("en", "/privacy"),
            ru: localePath("ru", "/privacy"),
            "x-default": localePath(defaultLocale, "/privacy"),
          },
        }
      : undefined,
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { copy } = await dictionaryFor(params);

  return (
    <main id="content" className="section">
      <div className="container privacy-copy">
        <h1>{copy.privacy.title}</h1>
        <p className="draft-note">{copy.privacy.draft}</p>
        <p className="lead">{copy.privacy.intro}</p>
        <section>
          <h2>{copy.privacy.collectTitle}</h2>
          <p>{copy.privacy.collect}</p>
        </section>
        <section>
          <h2>{copy.privacy.whyTitle}</h2>
          <p>{copy.privacy.why}</p>
        </section>
        <section>
          <h2>{copy.privacy.deliveryTitle}</h2>
          <p>{copy.privacy.delivery}</p>
        </section>
        <section>
          <h2>{copy.privacy.pendingTitle}</h2>
          <p>{copy.privacy.pending}</p>
        </section>
      </div>
    </main>
  );
}
