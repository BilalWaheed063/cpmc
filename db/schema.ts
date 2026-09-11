import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const newsletterSubscriptions = sqliteTable("newsletter_subscriptions", {
  email: text("email").primaryKey(),
  consentAt: text("consent_at").notNull(),
  consentVersion: text("consent_version").notNull(),
  source: text("source").notNull().default("homepage"),
});
export const newsletterRateLimits = sqliteTable("newsletter_rate_limits", {
  key: text("key").primaryKey(),
  attempts: integer("attempts").notNull().default(1),
  expiresAt: integer("expires_at").notNull(),
}, table => [index("idx_newsletter_rate_limits_expires_at").on(table.expiresAt)]);
