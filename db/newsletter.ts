import { env } from "cloudflare:workers";
import type { NewsletterStore } from "@/lib/cpmc/newsletter";

export function getNewsletterStore(): NewsletterStore {
  const database = env.DB;
  if (!database) throw new Error("newsletter_storage_unavailable");
  return {
    async reserveAttempt(key, expiresAt, now) {
      // D1 batch is transactional. The primary key makes concurrent increments atomic.
      const results = await database.batch([
        database.prepare("DELETE FROM newsletter_rate_limits WHERE expires_at <= ?").bind(now),
        database.prepare("INSERT INTO newsletter_rate_limits (key, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1 RETURNING attempts").bind(key, expiresAt),
      ]);
      const result = results[1].results[0] as { attempts?: number } | undefined;
      if (!result?.attempts) throw new Error("newsletter_rate_limit_unavailable");
      return result.attempts;
    },
    async subscribe(email, consentAt) {
      await database.prepare("INSERT INTO newsletter_subscriptions (email, consent_at, consent_version, source) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING")
        .bind(email, consentAt, "2026-09", "homepage").run();
    },
  };
}
