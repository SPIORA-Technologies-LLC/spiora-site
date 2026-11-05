import type { Metadata } from "next";
import { copy } from "@/content/en";

export const metadata: Metadata = {
  title: copy.meta.privacyTitle,
  description: copy.meta.privacyDescription,
  alternates: process.env.NEXT_PUBLIC_SITE_URL
    ? { canonical: "/privacy" }
    : undefined,
};

export default function PrivacyPage() {
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
