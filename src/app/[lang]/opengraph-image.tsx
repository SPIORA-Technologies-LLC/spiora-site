import { ImageResponse } from "next/og";
import { isLocale, locales, type Locale } from "@/i18n/config";

const headline: Record<Locale, string> = {
  en: "One system for client work",
  ru: "Единая система для работы с клиентами",
};

export const alt = "SPIORA — One system for client work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          background: "#080909",
          color: "#F4F2ED",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.08em", color: "#FF7A1A" }}>SPIORA</div>
        <div style={{ fontSize: 68, lineHeight: 1.1, maxWidth: 900 }}>{headline[locale]}</div>
      </div>
    ),
    size,
  );
}
