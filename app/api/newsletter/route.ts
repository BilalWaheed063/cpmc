import { handleNewsletter, type NewsletterStore } from "@/lib/cpmc/newsletter";

/**
 * Vercel does not provide Cloudflare D1 bindings. The original Sites build uses
 * `db/newsletter.ts`, which imports `cloudflare:workers` and therefore cannot be
 * bundled by Vercel's Next.js runtime.
 *
 * Rate limiting can safely be process-local, but subscriptions must never be
 * reported as saved unless a durable destination exists. Set
 * NEWSLETTER_WEBHOOK_URL in Vercel to a private endpoint that persists the
 * payload (CRM, automation, database function, etc.). Without it, the existing
 * UI receives the same 503 storage-unavailable response instead of losing data.
 */
const attempts = new Map<string, { count: number; expiresAt: number }>();

function getVercelNewsletterStore(): NewsletterStore {
  return {
    async reserveAttempt(key, expiresAt, now) {
      for (const [entryKey, entry] of attempts) {
        if (entry.expiresAt <= now) attempts.delete(entryKey);
      }

      const current = attempts.get(key);
      const count = current && current.expiresAt > now ? current.count + 1 : 1;
      attempts.set(key, { count, expiresAt });
      return count;
    },

    async subscribe(email, consentAt) {
      const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
      if (!webhookUrl) throw new Error("newsletter_storage_unavailable");

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.NEWSLETTER_WEBHOOK_TOKEN
            ? { authorization: `Bearer ${process.env.NEWSLETTER_WEBHOOK_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({
          email,
          consentAt,
          consentVersion: "2026-09",
          source: "homepage",
        }),
        cache: "no-store",
      });

      if (!response.ok) throw new Error("newsletter_storage_unavailable");
    },
  };
}

export async function POST(request: Request) {
  return handleNewsletter(request, getVercelNewsletterStore);
}
