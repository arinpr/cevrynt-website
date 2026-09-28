<div align="center">

<a href="https://www.cevrynt.com">
  <img src="public/brand/cevrynt-logo-v2.png" alt="Cevrynt" width="240" />
</a>

<h3>From borrower documents to decision-ready underwriting.</h3>

<p>The official website of <strong>Cevrynt, Inc.</strong></p>

<p>
  <a href="https://www.cevrynt.com"><strong>cevrynt.com</strong></a> ·
  <a href="https://calendly.com/arin-cevrynt/cevrynt-demo">Book a walkthrough</a> ·
  <a href="mailto:sales@cevrynt.com">sales@cevrynt.com</a>
</p>

<p>
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16.3-013e37?logo=nextdotjs&logoColor=white" />
  <img alt="React 19" src="https://img.shields.io/badge/React-19.2-013e37?logo=react&logoColor=white" />
  <img alt="Cloudflare Workers" src="https://img.shields.io/badge/Deploy-Cloudflare%20Workers-013e37?logo=cloudflare&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-11-013e37?logo=pnpm&logoColor=white" />
</p>

</div>

---

## About Cevrynt

Cevrynt is an AI underwriting and decision-intelligence platform for U.S. alternative lenders, starting with merchant cash advance and SMB finance. It turns borrower documents and business signals into evidence-linked analysis that human underwriters can review, question and act on.

```
Intake → Documents → Financials → Verification → Fraud → Policy → Report → Human Decision
```

- **Document intelligence**: structured, source-linked extraction from borrower files.
- **Bank statement analysis**: cash flow, deposits, balances and transaction patterns.
- **Business verification** and **fraud signals**.
- **Policy engine**: evaluation against each lender's own credit policy.
- **Underwriting report**: evidence-backed, with reviewer notes, overrides and audit history.

Cevrynt is AI-assisted infrastructure. It is not a lender, does not make or guarantee funding offers, and lenders keep final approval authority.

## This repository

This is the marketing website at [www.cevrynt.com](https://www.cevrynt.com). The product application is a separate codebase, reached through **Sign In** (`NEXT_PUBLIC_APP_URL`, default `https://app.cevrynt.com`).

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, JavaScript/JSX only |
| Rendering | Server Components with static generation and ISR (`revalidate = 3600`) |
| Styling | Tailwind CSS 4 and `src/app/globals.css`, following `design-system/cevrynt/MASTER.md` |
| Motion | CSS first; GSAP and Motion where sequencing matters; reduced motion respected |
| SEO | Metadata API via `src/lib/seo.js`, sitemap, robots, JSON-LD, prerendered share cards |
| Analytics | GA4 in Consent Mode v2, production host only (`src/lib/analytics.js`) |
| Hosting | Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare) |

### Project layout

```
src/
  app/          Routes, metadata, sitemap, robots, share images
  components/   Server and client UI components
  content/      Page, navigation, blog and legal copy
  config/       Site configuration (canonical URL, app URL)
  lib/          SEO, analytics and share-image helpers
public/         Brand assets and media
design-system/  Visual and interaction standards
.agents/skills/ Performance and product-context rules for contributors and agents
```

## Getting started

Requirements: **Node.js 20+** and **pnpm 11** (`corepack enable`).

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm dev:mobile     # listen on the LAN at port 3001 for device testing
```

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Local development server (no-cache headers, no stale content) |
| `pnpm build` | Production Next.js build |
| `pnpm start` | Serve the production build with Node |
| `pnpm lint` | ESLint |
| `pnpm cf:build` | Build the Cloudflare Worker bundle into `.open-next/` |
| `pnpm preview` | Build for Workers and run it locally in the Workers runtime |
| `pnpm run deploy` | Build for Workers and deploy to Cloudflare |
| `pnpm run upload` | Build for Workers and upload a new version without promoting it |
| `pnpm indexnow` | Notify IndexNow-compatible search engines of changed URLs |

### Environment variables

All are optional. Set them in `.env.local` for development and as build variables in Cloudflare for production; `NEXT_PUBLIC_*` values are inlined at build time.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for canonicals, sitemap, JSON-LD and og:image. Defaults to `https://www.cevrynt.com`; set it on any other host. |
| `NEXT_PUBLIC_APP_URL` | Cevrynt application URL used by **Sign In** |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID override |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools verification |

## Deployment: Cloudflare Workers

The site runs on Cloudflare Workers through the [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) adapter. Configuration lives in `wrangler.jsonc` and `open-next.config.js`. The adapter defaults to `open-next.config.ts`, so the scripts pass `--openNextConfigPath open-next.config.js` to keep the project JavaScript-only.

| Binding | Resource | Used for |
| --- | --- | --- |
| `ASSETS` | Workers static assets (`.open-next/assets`) | `public/`, `_next/static` and prerendered output |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 bucket `cevrynt-website-cache` | ISR / incremental cache |
| `WORKER_SELF_REFERENCE` | Service binding to this Worker | Background ISR revalidation |
| `IMAGES` | Cloudflare Images | `next/image` optimization |

### First deploy

```bash
pnpm install
pnpm wrangler login
pnpm wrangler r2 bucket create cevrynt-website-cache
pnpm run deploy
```

Use `pnpm run deploy`, not `pnpm deploy`, which is a built-in pnpm command.

Then, in the Cloudflare dashboard, attach the custom domains `www.cevrynt.com` and `cevrynt.com` to the `cevrynt-website` Worker. The apex redirects to `www` in `next.config.js`.

### Continuous deployment (Workers Builds)

Connect this repository under **Workers & Pages → Create → Import a repository**, then use:

| Setting | Value |
| --- | --- |
| Build command | `pnpm run cf:build` |
| Deploy command | `pnpm exec opennextjs-cloudflare deploy` |
| Non-production branch deploy command | `pnpm exec opennextjs-cloudflare upload` |

Keep request-time code free of Node-only APIs (`fs`, `path`, `process.cwd`). Share cards are prerendered at build time.

## Contributing

Read these before changing the site:

1. [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md): product, copy, design, navigation and performance decisions.
2. [`AGENTS.md`](AGENTS.md): project standards and required skills.
3. [`.agents/skills/cevrynt-web-performance/SKILL.md`](.agents/skills/cevrynt-web-performance/SKILL.md) and [`.agents/skills/cevrynt-product-context/SKILL.md`](.agents/skills/cevrynt-product-context/SKILL.md).
4. [`design-system/cevrynt/MASTER.md`](design-system/cevrynt/MASTER.md).

Checks before merging:

- `pnpm lint` and `pnpm build` pass, and routes stay static or ISR.
- Performance budgets hold: LCP ≤ 1.5s, CLS ≤ 0.1, INP ≤ 200ms.
- Layouts are verified at 375, 768, 1024 and 1440px, including mobile navigation.
- Copy contains no fabricated customers, metrics, integrations or claims, and lenders keep final authority.

## Contact

- Demo: [calendly.com/arin-cevrynt/cevrynt-demo](https://calendly.com/arin-cevrynt/cevrynt-demo)
- Sales: [sales@cevrynt.com](mailto:sales@cevrynt.com)
- Founder: [arin@cevrynt.com](mailto:arin@cevrynt.com)
- LinkedIn: [linkedin.com/company/cevrynt](https://www.linkedin.com/company/cevrynt)

---

<div align="center">
<sub>© Cevrynt, Inc. All rights reserved. This repository is proprietary and not licensed for reuse.</sub>
</div>
