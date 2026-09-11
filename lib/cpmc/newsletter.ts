import { z } from "zod";

export type NewsletterStore = {
  reserveAttempt(key: string, expiresAt: number, now: number): Promise<number>;
  subscribe(email: string, consentAt: string): Promise<void>;
};
const payloadSchema = z.object({
  email: z.string().trim().max(254).email().transform(value => value.toLowerCase()),
  consent: z.literal(true),
  company: z.string().max(0).optional(),
}).strict();
const CONSENT_ERROR = "Please enter a valid email address and agree to receive college updates.";
function json(body: Record<string, unknown>, status = 200, extraHeaders?: Record<string, string>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
}
async function boundedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > 4096) throw new RangeError("payload_limit");
  if (!request.body) throw new SyntaxError("empty_body");
  const reader = request.body.getReader(); const chunks: Uint8Array[] = []; let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > 4096) { await reader.cancel(); throw new RangeError("payload_limit"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
export async function handleNewsletter(request: Request, getStore: () => NewsletterStore): Promise<Response> {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ error: "Please submit this form from the college website." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "Please submit the newsletter form." }, 415);
  let payload: unknown;
  try { payload = await boundedJson(request); }
  catch (error) { return json({ error: error instanceof RangeError ? "The submitted form is too large." : "The submitted form could not be read." }, error instanceof RangeError ? 413 : 400); }
  const parsed = payloadSchema.safeParse(payload);
  if (!parsed.success) return json({ error: CONSENT_ERROR }, 400);
  try {
    const store = getStore(); const now = Date.now();
    // Retain only a minute-scoped hash, never a raw client address.
    const bucket = Math.floor(now / 60000);
    const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const clientAddress =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-vercel-forwarded-for") ||
      forwardedFor ||
      "local";
    const fingerprint = `${clientAddress}:${bucket}:cpmc-newsletter-v1`;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(fingerprint));
    const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
    const attempts = await store.reserveAttempt(key, (bucket + 1) * 60000, now);
    if (attempts > 5) return json({ error: "Too many attempts. Please wait a minute and try again." }, 429, { "Retry-After": "60" });
    await store.subscribe(parsed.data.email, new Date(now).toISOString());
    // Duplicate signups have the same response; no email addresses are disclosed.
    return json({ ok: true, message: "Your subscription has been saved." });
  } catch {
    console.error("newsletter_storage_unavailable");
    return json({ error: "Newsletter signup is temporarily unavailable. Please try again later." }, 503);
  }
}
