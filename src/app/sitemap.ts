import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { publicSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = publicSite();
  if (!siteUrl) return [];

  const lastModified = new Date();
  const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

  return ["/", "/privacy"].flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(localePath(locale, path)),
      lastModified,
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, absolute(localePath(item, path))])),
      },
    })),
  );
}
