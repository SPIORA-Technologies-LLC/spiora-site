import { NextResponse } from "next/server";
import { copy } from "@/content/en";
import { validateDemo, hasErrors, type DemoInput } from "@/lib/demo";
import { demoChannel } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const SUCCESS_TTL_MS = 10 * 60 * 1000;
const MAX_BODY = 4000;
const KEY_PATTERN = /^[A-Za-z0-9_-]{8,80}$/;

const hits = new Map<string, number[]>();
const successKeys = new Map<string, number>();
const pendingKeys = new Set<string>();

type DemoResponse = {
  ok: boolean;
  error?: string;
  message?: string;
  fields?: Partial<Record<keyof DemoInput, string>>;
};

function json(body: DemoResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 80);
  }
  return request.headers.get("x-real-ip")?.slice(0, 80) || "unknown";
}

function limited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function remembered(key: string): boolean {
  const now = Date.now();
  if (successKeys.size > 5000) successKeys.clear();
  const expiry = successKeys.get(key);
  if (!expiry) return false;
  if (expiry < now) {
    successKeys.delete(key);
    return false;
  }
  return true;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return json({ ok: false, error: "validation", message: copy.demo.checkFields }, 400);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "validation", message: copy.demo.checkFields }, 400);
  }

  if (!isRecord(parsed)) {
    return json({ ok: false, error: "validation", message: copy.demo.checkFields }, 400);
  }

  const { errors, value } = validateDemo({
    name: asText(parsed.name),
    company: asText(parsed.company),
    email: asText(parsed.email),
  });

  if (hasErrors(errors)) {
    return json({ ok: false, error: "validation", message: copy.demo.checkFields, fields: errors }, 400);
  }

  const headerKey = request.headers.get("idempotency-key")?.trim() ?? "";
  const key = KEY_PATTERN.test(headerKey) ? headerKey : crypto.randomUUID();

  if (remembered(key)) {
    return json({ ok: true, message: copy.demo.success }, 200);
  }

  if (limited(clientIp(request))) {
    return json({ ok: false, error: "rate_limit", message: copy.demo.rateLimit }, 429);
  }

  if (pendingKeys.has(key)) {
    return json({ ok: false, error: "in_progress", message: copy.demo.inProgress }, 409);
  }

  const channel = demoChannel();
  if (!channel) {
    return json({ ok: false, error: "unavailable", message: copy.demo.unavailable }, 503);
  }

  pendingKeys.add(key);
  try {
    const response = await fetch(channel.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${channel.secret}`,
        "Idempotency-Key": key,
      },
      body: JSON.stringify({
        name: value.name,
        company: value.company,
        email: value.email,
        locale: "en",
        source: "spiora-marketing-site",
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    if (!response.ok) {
      return json({ ok: false, error: "delivery", message: copy.demo.failed }, 502);
    }

    successKeys.set(key, Date.now() + SUCCESS_TTL_MS);
    return json({ ok: true, message: copy.demo.success }, 200);
  } catch {
    return json({ ok: false, error: "delivery", message: copy.demo.failed }, 502);
  } finally {
    pendingKeys.delete(key);
  }
}
