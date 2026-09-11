# Vercel deployment

This package now uses native Next.js commands for the default `dev`, `build`, and `start` scripts so Vercel receives the `.next` output it expects.

## Vercel settings

- Framework Preset: **Next.js**
- Build Command: **npm run build** (or leave the detected default)
- Output Directory: **leave blank / framework default**
- Install Command: **npm install** or the detected default

Do **not** set the Output Directory to `dist`, `dist/client`, or `.output` for this native Next.js deployment.

The previous Vinext + Cloudflare commands remain available as `npm run dev:sites`, `npm run build:sites`, and `npm run start:sites`.

## Newsletter on Vercel

The original newsletter backend uses Cloudflare D1 and cannot run on Vercel. To keep deployment safe, the Vercel route only reports a successful subscription when `NEWSLETTER_WEBHOOK_URL` is configured to a durable private endpoint. Optionally set `NEWSLETTER_WEBHOOK_TOKEN`; it will be sent as a Bearer token.
