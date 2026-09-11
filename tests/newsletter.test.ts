import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { test } from "node:test";
import { handleNewsletter, type NewsletterStore } from "../lib/cpmc/newsletter.ts";
import { filterPrograms } from "../lib/cpmc/content.ts";

function createStore() {
  const database = new DatabaseSync(":memory:");
  database.exec(readFileSync(new URL("../drizzle/0000_good_mandarin.sql", import.meta.url), "utf8"));
  const store: NewsletterStore = {
    async reserveAttempt(key, expiresAt, now) {
      database.prepare("DELETE FROM newsletter_rate_limits WHERE expires_at <= ?").run(now);
      const row = database.prepare("INSERT INTO newsletter_rate_limits (key, attempts, expires_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1 RETURNING attempts").get(key, expiresAt) as { attempts: number };
      return row.attempts;
    },
    async subscribe(email, consentAt) {
      database.prepare("INSERT INTO newsletter_subscriptions (email, consent_at, consent_version, source) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING").run(email, consentAt, "2026-09", "homepage");
    },
  };
  return { database, store };
}
const origin = "https://college.example";
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/newsletter`, { method: "POST", headers: { "content-type": "application/json", origin, ...headers }, body: JSON.stringify(body) });
}
test("valid signup persists normalized email and explicit consent, and retries stay idempotent", async () => {
  const { database, store } = createStore();
  try {
    const body = { email: "  Student@Example.test ", consent: true, company: "" };
    const response = await handleNewsletter(request(body), () => store);
    assert.equal(response.status, 200); assert.equal((await response.json() as { ok?: boolean }).ok, true);
    const original = database.prepare("SELECT * FROM newsletter_subscriptions").get() as Record<string, unknown>;
    assert.equal(original.email, "student@example.test"); assert.equal(original.consent_version, "2026-09"); assert.ok(Date.parse(String(original.consent_at)));
    assert.equal((await handleNewsletter(request(body), () => store)).status, 200);
    assert.equal(database.prepare("SELECT count(*) AS total FROM newsletter_subscriptions").get()?.total, 1);
    assert.equal(database.prepare("SELECT consent_at FROM newsletter_subscriptions").get()?.consent_at, original.consent_at);
  } finally { database.close(); }
});
test("invalid address, missing consent, honeypot, and oversized body never reach storage", async () => {
  const noStore = () => { throw new Error("Storage must not be accessed"); };
  for (const body of [{ email: "invalid", consent: true }, { email: "person@example.test", consent: false }, { email: "person@example.test", consent: true, company: "spam" }]) {
    assert.equal((await handleNewsletter(request(body), noStore)).status, 400);
  }
  assert.equal((await handleNewsletter(request({ email: "a".repeat(5000), consent: true }), noStore)).status, 413);
  const malformed = new Request(`${origin}/api/newsletter`, { method: "POST", headers: { "content-type": "application/json" }, body: "{" });
  assert.equal((await handleNewsletter(malformed, noStore)).status, 400);
});
test("cross-origin requests are rejected and storage outages return a retryable error", async () => {
  const noStore = () => { throw new Error("unavailable"); };
  assert.equal((await handleNewsletter(request({ email: "person@example.test", consent: true }, { origin: "https://untrusted.example" }), noStore)).status, 403);
  const response = await handleNewsletter(request({ email: "person@example.test", consent: true }), noStore);
  assert.equal(response.status, 503); assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json() as { ok?: boolean }).ok, undefined);
});
test("the sixth attempt is limited, with no sixth subscription written", async () => {
  const { database, store } = createStore();
  try {
    for (let i = 0; i < 5; i++) assert.equal((await handleNewsletter(request({ email: `person${i}@example.test`, consent: true }), () => store)).status, 200);
    const response = await handleNewsletter(request({ email: "sixth@example.test", consent: true }), () => store);
    assert.equal(response.status, 429); assert.equal(response.headers.get("retry-after"), "60");
    assert.equal(database.prepare("SELECT count(*) AS total FROM newsletter_subscriptions").get()?.total, 5);
    const key = database.prepare("SELECT key FROM newsletter_rate_limits").get()?.key;
    assert.match(String(key), /^[a-f0-9]{64}$/);
  } finally { database.close(); }
});
test("programme finder supports subject terms, categories and honest dentistry enquiries", () => {
  assert.deepEqual(filterPrograms("all", "  MbBs ").map(p => p.id), ["mbbs"]);
  assert.deepEqual(filterPrograms("all", "physiotherapy").map(p => p.id), ["dpt"]);
  assert.equal(filterPrograms("nursing", "mbbs").length, 0);
  assert.equal(filterPrograms("allied", "").length, 2);
  assert.equal(filterPrograms("all", "not-a-course").length, 0);
  assert.equal(filterPrograms("dentistry", "bds")[0]?.enquiry, true);
});
