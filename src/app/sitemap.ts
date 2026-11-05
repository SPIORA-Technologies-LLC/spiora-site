import type { MetadataRoute } from "next";
import { publicSite } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = publicSite();
  if (!siteUrl) return [];

  const lastModified = new Date();
  return [
    { url: siteUrl, lastModified },
    { url: `${siteUrl}/privacy`, lastModified },
  ];
}
