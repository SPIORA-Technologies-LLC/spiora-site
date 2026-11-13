# SPIORA marketing site

Marketing page for SPIORA, a digital office for immigration and consulting teams. English is served at `/`, Russian at `/ru`. The EN/RU switcher in the header keeps the reader on the same page and section.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

Open [http://localhost:3000](http://localhost:3000). The privacy draft is at `/privacy`.

## Environment

Copy `.env.example` to `.env.local`. Leave a value empty until it is approved.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public origin, no trailing slash. Turns on canonical, hreflang `en`/`ru`, and the sitemap. |
| `NEXT_PUBLIC_PLATFORM_LOGIN_URL` | Platform login URL. The header link stays hidden until this is set. |
| `NEXT_PUBLIC_SALES_EMAIL` | Approved sales address. The footer shows it only when set. |
| `DEMO_WEBHOOK_URL` | HTTPS endpoint that receives demo requests. |
| `DEMO_WEBHOOK_SECRET` | Bearer token sent with each request. Server-only. |

`POST /api/demo` returns “temporarily unavailable” until both webhook values are set. The secret is never sent to the browser. Request bodies are not written to application logs or browser storage.

The route waits at most 8 seconds, forwards an `Idempotency-Key`, and limits each IP to 5 requests in 10 minutes inside the current server process. On Vercel that memory resets between instances, so also set a platform rate limit before production traffic.

## Check a demo delivery

1. Start the site with no webhook variables. Submit the form. The fields stay filled and the status says demo requests are temporarily unavailable.
2. Point `DEMO_WEBHOOK_URL` at an HTTPS collector you control and set `DEMO_WEBHOOK_SECRET`. Restart the server.
3. Submit a synthetic name, company, and work email. The collector should receive JSON: `name`, `company`, `email`, `locale` (`en` or `ru`), `source` (`spiora-marketing-site`), plus `Authorization: Bearer …` and `Idempotency-Key`.
4. Submit again while the button says “Sending…”. The button stays disabled until the request finishes.
5. Send an empty form and an invalid email. Both the page and `POST /api/demo` reject them and keep the typed values.

## Where to replace copy and visuals

- Copy, menu, errors, alt text, and metadata: `src/content/en/*` (English) and `src/content/ru/*` (Russian). Both have the same shape; TypeScript fails the build if a Russian key is missing.
- Language routing: `src/middleware.ts` and `src/i18n/config.ts`
- Logo: `public/logo2.svg`, the original SPIORA mark with the slogan. The gray sheet around the export is not shown.
- Workspace and AI frames: `src/components/Shot.tsx`, used in `src/app/page.tsx`. Replace each frame with an approved screenshot from the demo environment. Synthetic data only: no real names, documents, amounts, messages, or client avatars.
- Privacy text: `src/app/privacy/page.tsx` and the privacy strings in `src/content/en/site.ts` and `src/content/ru/site.ts`

## Still needed before production

- Approved login URL
- Approved public domain
- Approved sales contact (presentation slide 30 was not machine-readable here; do not invent an address)
- Approved privacy policy, and consent wording if it should sit beside the form
- Approved workspace screenshot and AI Workspace screenshot on synthetic data
- A tested webhook delivery
- Confirmation before publishing case studies, rollout times, ownership terms, compliance claims, or technical guarantees. Those are intentionally absent.
- Sharp & Spice credit, only if confirmed. It is not in the footer.

Security copy stays at role-based access and a separate client portal. Statements about 2FA, data residency, HTTPS/TLS, and how AI handles data stay out until the product owner confirms the live configuration.
