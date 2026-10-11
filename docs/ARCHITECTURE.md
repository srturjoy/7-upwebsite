# Technical Architecture — Boosting Agency BD

## 1. Overview
Boosting Agency BD is built on Next.js 16 (Turbopack, App Router) with React 19, Tailwind CSS v4, and TypeScript. It compiles down to an ultra-fast static export deployed to Cloudflare Pages and Google Cloud Run.

## 2. Directory Separation of Concerns
- `app/`: File-system routes, metadata, and static HTML generators.
- `components/`: UI components split by feature (`about`, `blog`, `chat`, `home`, `layout`, `portfolio`, `ui`).
- `contracts/`: Master agreement templates, client SLAs, and legal terms.
- `tracking/`: Meta Pixel, Meta CAPI, GA4, GTM, and server-side tracking specifications.
- `integrations/`: Connectors for WhatsApp, Meta Graph API, and Gemini AI proxy.
- `data/`: Structured knowledge bases (`knowledge-base/`).
- `lib/`: Core utilities, language context, and the Banglish NLP FAQ engine.
- `public/`: Static web assets, images, icons, and downloadable documents.
