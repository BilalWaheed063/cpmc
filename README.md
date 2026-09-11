# Central Park Medical College — comprehensive homepage

The complete second version of the CPMC homepage, with an original design inspired by the density and academic structure of VamTam Estudiar. This is a React/TypeScript application using Vinext, Vite, Tailwind CSS and Cloudflare Workers. It includes a real D1-backed newsletter signup endpoint. It does not include or require the commercial Estudiar theme source.

## Included

- Utility bar, sticky navigation with accessible dropdowns, student portal, social links and mobile navigation drawer.
- Campus photograph carousel, programme search, subject selector and animated institutional counters.
- Filterable MBBS, nursing, DPT, allied health and postgraduate cards, plus an accurately labelled BDS enquiry card.
- Dedicated teaching hospital, campus facilities, principal’s message, four-stage admissions pathway, dated news filters, authentic student/faculty quotations and a comprehensive footer.
- Consent-based newsletter storage with validation, duplicate-safe writes, request limits and useful error/success states.
- A newsletter privacy page, self-hosted images/fonts, reduced-motion support, keyboard controls and responsive layouts.

Only the homepage and its newsletter privacy page are recreated. Department, admissions, hospital and student-service links open the corresponding existing official services.

## Run locally

Use Node.js 24 LTS (recommended) and npm.

```bash
npm ci
npm run dev
```

The standalone preview supplies shared CPMC theme defaults. It does not modify the client's WordPress/Elementor installation.

```bash
npm run typecheck
npm test
npm run build
```

The build creates a Cloudflare-compatible worker at `dist/server/index.js` and public assets under `dist/client`. The project uses the logical D1 binding `DB`, declared in `.openai/hosting.json`; Sites supplies the production database and applies the included migration during deployment.

For a first-time local newsletter database, run the build, then apply the included schema once:

```bash
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --persist-to .wrangler/state --config dist/server/wrangler.json --file drizzle/0000_good_mandarin.sql
npm start
```

This command creates local development tables; it does not contact the live database. Repeating that initial schema command on an already initialized database will report existing tables. Subsequent schema changes belong in new generated migrations (`npm run db:generate`).

## Main source files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Homepage route |
| `components/cpmc/homepage.tsx` | Complete page, named section components and client interactions |
| `lib/cpmc/content.ts` | Programmes, navigation, sources, metrics, stories and quotations |
| `app/globals.css` | Shared brand tokens, typography, responsive layouts and motion |
| `app/layout.tsx` | Document metadata, favicon and global styles |
| `app/api/newsletter/route.ts` | Newsletter endpoint |
| `lib/cpmc/newsletter.ts` | Validation, request handling and rate-limit policy |
| `db/newsletter.ts` | Prepared D1 queries |
| `db/schema.ts` and `drizzle/` | Schema and deployment migration |
| `app/privacy/page.tsx` | Newsletter privacy and removal contact |
| `public/assets/` | Official CPMC/CPTH images and self-hosted fonts |
| `tests/newsletter.test.ts` | Newsletter boundary, persistence and programme-finder checks |

## CPMC theme integration

All component colours and type families resolve through global CSS custom properties. Poppins is the active heading/body font. The six base brand colours are Royal Blue `#0362FD`, Red `#E40000`, Bright Blue `#059AFB`, Warm Gold `#D4AB64`, White `#FFFFFF` and Deep Neutral `#0B0B0D`. The requested navy, cyan and slate surfaces derive from these base tokens.

Defaults are declared in the low-priority `cpmc-theme` cascade layer. Existing unlayered global plugin variables can override them without editing component rules. Key variables include `--cpmc-primary`, `--cpmc-navy`, `--cpmc-cyan`, `--cpmc-font-heading`, `--cpmc-font-body`, `--cpmc-h2`, `--cpmc-radius`, `--cpmc-button-radius`, and `--cpmc-content-width`. There are no decorative eyebrow dashes. This package is application source, not a single Elementor HTML widget.

## Content decisions and sources

Content was checked against the official college and hospital sites on 10 September 2026. Detailed image provenance is in `content-sources.json`; initial asset/font provenance is retained in `asset-sources.json` and `font-sources.json`.

| Item | Published evidence and presentation |
| --- | --- |
| Foundation / campus / alumni | College introduction: founded in 2008, approximately 26 acres, more than 1,000 doctors graduated. https://www.cpmc.edu.pk/introduction/ |
| Hospital | Current hospital site: 600+ beds, 28 departments and 24-hour emergency services. https://cpth.pk/ |
| OPD | The 2022–23 prospectus reports **400 daily patients**. No verified annual OPD total was found, so an annual figure is not invented. https://www.cpmc.edu.pk/wp-content/uploads/2022/11/Complete-Prospectus-2022.pdf |
| Passing rate | 98.9% relates specifically to Third Professional MBBS results announced in March 2024; it is not presented as a current overall rate. https://www.cpmc.edu.pk/cpmc-1st-position-third-professional-mbbs-2024/ |
| Recognition | PM&DC recognition and UHS affiliation are distinguished from HEC digital-library access. The page does not claim HEC college accreditation. |
| BDS | Not confirmed in CPMC's published programme list. The dentistry card is explicitly an admissions enquiry, not an advertised degree intake. |
| Nursing | Published CNA and post-basic critical-care / trauma-and-emergency diplomas are used. No unverified BS Nursing programme is invented. https://www.cpmc.edu.pk/programs/ |
| Principal | Prof. Muhammad Amer Mian; the official portrait and short quotation are used. The name treatment is typographic, not a fabricated handwritten signature. https://www.cpmc.edu.pk/principals-message/ |
| Testimonials | Two short, attributed student excerpts from the 2022–23 prospectus, plus a faculty excerpt from the principal's message. Roles are dated rather than implied to be current. |
| Admissions | Current intake dates and an “admissions open” status are not invented. Interview requirements are explicitly programme-dependent. Official URLs retain any older year present in their paths. |
| News | Hospital story dated February 2026; college research/results stories clearly dated 2024 and labelled as archive content. These are curated records, not an automatic feed. |

Design reference: https://estudiar.vamtam.com/

## Newsletter operation

Successful submissions persist a normalized, unique email address with consent timestamp/version. No welcome or campaign email is sent by this package. Connect the college's chosen mailing provider before sending campaigns, and include its authenticated unsubscribe workflow in every email. The privacy page currently routes removal requests to the official college contact service; the site administrator must fulfil those requests in the subscriber database and any connected provider.

The endpoint accepts same-origin JSON, requires explicit consent, limits body size and applies five attempts per minute per hashed client identifier. Rate-limit rows expire after their minute and are cleaned up on later valid form requests. Missing storage returns a 503 and the UI preserves the user's input; no success is shown without a completed write. There is no public subscriber-list endpoint.

## Validation and launch

The source includes automated checks for validation failures, consent, normalized/idempotent persistence, request limiting, storage failure and programme filtering. Production compilation and TypeScript checking are required before delivery. Browser visual or end-to-end tests have not been requested or run.

The preview metadata is `noindex, nofollow`. Set production indexing/canonical metadata when integrating with the approved college domain. Review any new intake details or updated institutional figures when the college supplies them. This revision is saved as source and build output; the earlier live draft is not automatically republished by a code-only update.
