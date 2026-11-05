import type { MetadataRoute } from "next";
import { publicSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = publicSite();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  };
}
