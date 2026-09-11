CREATE TABLE `newsletter_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`attempts` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_newsletter_rate_limits_expires_at` ON `newsletter_rate_limits` (`expires_at`);--> statement-breakpoint
CREATE TABLE `newsletter_subscriptions` (
	`email` text PRIMARY KEY NOT NULL,
	`consent_at` text NOT NULL,
	`consent_version` text NOT NULL,
	`source` text DEFAULT 'homepage' NOT NULL
);
