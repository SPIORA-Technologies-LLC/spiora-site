function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function publicSite() {
  const siteUrl = clean(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "");
  const loginUrl = clean(process.env.NEXT_PUBLIC_PLATFORM_LOGIN_URL);
  const salesEmail = clean(process.env.NEXT_PUBLIC_SALES_EMAIL);

  return { siteUrl, loginUrl, salesEmail };
}

export function demoChannel(): { url: string; secret: string } | null {
  const url = clean(process.env.DEMO_WEBHOOK_URL);
  const secret = clean(process.env.DEMO_WEBHOOK_SECRET);
  if (!url || !secret) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return { url, secret };
}
