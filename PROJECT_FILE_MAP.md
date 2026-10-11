# PROJECT FILE MAP — Boosting Agency BD

This document serves as the master registry of the project repository. It lists all major directories, source files, assets, contracts, tracking modules, and configuration components with their category, purpose, dependencies, and placement safety rationale.

---

## 1. Directory Structure Overview

```text
project-root/
│
├── public/                     # Public web-accessible assets
│   ├── images/hero/            # Category-organized promotional & hero graphics
│   ├── icons/favicons/         # Category-organized favicons & app icons
│   ├── icons/logos/            # Category-organized logos
│   ├── fonts/                  # Self-hosted typography documentation & assets
│   ├── videos/                 # Media video specifications & guidelines
│   ├── documents/              # Downloadable agency catalog & whitepapers
│   ├── hero/                   # Mirrored root hero slides (100% URL safety)
│   ├── site-knowledge.json     # Searchable agency knowledge base
│   └── robots.txt, sitemap.xml # SEO crawlers and indexing directives
│
├── app/                        # Next.js App Router (pages & server endpoints)
│   ├── (routes)/               # Page routes (about, blog, contact, portfolio, privacy, services, terms)
│   ├── api/                    # Server-side API endpoints
│   ├── layout.tsx              # Root HTML layout, ThemeProvider, LanguageProvider
│   └── globals.css             # Tailwind CSS & global design tokens
│
├── components/                 # Reusable UI component modules
│   ├── about/                  # About page component modules
│   ├── blog/                   # Blog listing and post view components
│   ├── chat/                   # Smart FAQ bot & WhatsApp floating stack
│   ├── home/                   # Landing page hero, services, CTA sections
│   ├── layout/                 # Main header, footer, navigation bars
│   ├── portfolio/              # Client case studies & portfolio showcase
│   └── ui/                     # Accessible primitives (Radix UI + Tailwind)
│
├── contracts/                  # Agency legal agreements & client contracts
│   ├── templates/              # Reusable retainers, SLAs, top-up agreements, NDAs
│   ├── documents/              # Codified terms, privacy policy, refund guidelines
│   └── README.md               # Legal governance & confidentiality rules
│
├── tracking/                   # Digital marketing tracking & conversion modules
│   ├── pixel/                  # Meta Pixel configuration and event helpers
│   ├── conversion-api/         # Meta Conversions API (CAPI) client & payload schema
│   ├── analytics/              # Google Analytics 4 (GA4) measurement specs
│   ├── google-tag-manager/     # GTM web/server container specs & dataLayer helpers
│   ├── server-side/            # Server-side event dispatcher & deduplication keys
│   └── README.md               # Tracking architecture & verification guide
│
├── integrations/               # External platform interfaces & connectors
│   ├── whatsapp/               # Direct WhatsApp API & deep-link generator
│   ├── meta-graph/             # Meta Marketing Graph API connector interfaces
│   ├── gemini/                 # Server-side Gemini AI models proxy interface
│   └── README.md               # Integration architecture guide
│
├── configuration/              # Central configuration index & documentation
│   └── README.md               # Explanation of all root framework config files
│
├── data/                       # Structured JSON knowledge base & entity records
│   └── knowledge-base/         # Agency info, contact, FAQ, policies, pricing, services
│
├── lib/                        # Core application utilities & algorithms
│   ├── faq-engine/             # Multi-turn Banglish/English NLP search & matching engine
│   ├── language-context.tsx    # Dual-language (EN / BN) context provider & translations
│   ├── terms-data.ts           # Structured legal terms data for /terms view
│   └── utils.ts                # Tailwind clsx/twMerge utility (cn)
│
├── scripts/                    # Maintenance, asset verification & schema validation
│   ├── verify-assets.mjs       # Static asset verification tool
│   ├── verify-tracking-schemas.mjs # Tracking schema validator
│   └── README.md               # Operational scripts index
│
├── tests/                      # Automated test suite
│   ├── sanity-check.test.mjs   # JSON knowledge base & engine integrity test
│   └── README.md               # Test documentation
│
├── docs/                       # System documentation
│   ├── ARCHITECTURE.md         # High-level technical architecture
│   ├── DEPLOYMENT_GUIDE.md     # Production build & Cloudflare Pages export guide
│   ├── FAQ_ENGINE.md           # NLP matching algorithm & normalizer specs
│   └── README.md               # Documentation portal
│
├── PROJECT_FILE_MAP.md         # Master repository file registry (this file)
├── README.md                   # Project overview & developer guide
├── package.json                # NPM packages and script definitions
├── tsconfig.json               # TypeScript compiler options
├── next.config.mjs             # Next.js build configuration (output: export)
├── postcss.config.mjs          # Tailwind CSS PostCSS configuration
└── wrangler.jsonc              # Cloudflare Pages deployment configuration
```

---

## 2. Comprehensive File Inventory

| Relative Path | Category | Purpose | Related Website Feature | Status | Safety Rationale |
|---|---|---|---|---|---|
| `app/layout.tsx` | Framework/Route | Root layout, HTML wrapper, metadata, providers | Entire Site | Left in place | Required at `app/layout.tsx` by Next.js App Router |
| `app/page.tsx` | Framework/Route | Homepage assemble & hero sections | Home (`/`) | Left in place | Root page route in App Router |
| `app/about/page.tsx` | Framework/Route | Agency about page, team, credentials | About (`/about`) | Left in place | Standard route in App Router |
| `app/services/page.tsx` | Framework/Route | Marketing service catalog & pricing cards | Services (`/services`) | Left in place | Standard route in App Router |
| `app/portfolio/page.tsx` | Framework/Route | Case studies, campaign metrics, results | Portfolio (`/portfolio`) | Left in place | Standard route in App Router |
| `app/blog/page.tsx` | Framework/Route | Marketing blog archive & articles listing | Blog (`/blog`) | Left in place | Standard route in App Router |
| `app/blog/[slug]/page.tsx` | Framework/Route | Dynamic blog article details | Blog Post (`/blog/:slug`) | Left in place | Dynamic route in App Router |
| `app/contact/page.tsx` | Framework/Route | Interactive contact cards & WhatsApp CTA | Contact (`/contact`) | Left in place | Standard route in App Router |
| `app/terms/page.tsx` | Framework/Route | 10-clause Terms & Conditions viewer | Terms (`/terms`) | Left in place | Standard route in App Router |
| `app/privacy/page.tsx` | Framework/Route | Privacy & data policy viewer | Privacy (`/privacy`) | Left in place | Standard route in App Router |
| `app/not-found.tsx` | Framework/Route | Custom 404 error handler | Global 404 | Left in place | App Router convention |
| `app/robots.ts` | Framework/Route | Dynamic robots.txt generator | SEO Crawler Control | Left in place | Next.js SEO convention |
| `app/sitemap.ts` | Framework/Route | Dynamic sitemap.xml generator | Search Engine Indexing | Left in place | Next.js SEO convention |
| `app/api/hero-images/route.ts` | API Route | Returns hero carousel slide manifests | Hero Banner Carousel | Left in place | Serverless API route |
| `app/api/site-knowledge/route.ts` | API Route | Serves consolidated AI knowledge base | Search & AI Knowledge | Left in place | Serverless API route |
| `components/chat/chat-widget.tsx` | Component | Floating WhatsApp CTA & AI FAQ assistant | Global Floating Stack | Left in place | Imported by layout.tsx |
| `components/chat/chat-header.tsx` | Component | Header of FAQ assistant with WhatsApp shortcut | Assistant Window | Left in place | Imported by chat-widget.tsx |
| `components/layout/header.tsx` | Component | Responsive navbar, language, theme, WhatsApp CTA | Global Navigation | Left in place | Imported by layout.tsx |
| `components/layout/footer.tsx` | Component | Comprehensive footer, T&C link, hotline | Global Footer | Left in place | Imported by layout.tsx |
| `public/images/hero/` | Public Assets | Category-organized hero banners (1 to 5) | Hero Carousel | Organized copy | Mirror preserved in `/public/hero/` for zero URL breakage |
| `public/icons/favicons/` | Public Assets | Category-organized browser favicons & touch icons | Favicon & Manifest | Organized copy | Mirror preserved in `/public/` for browsers |
| `public/icons/logos/` | Public Assets | Category-organized vector & raster brand marks | Branding | Organized copy | Mirror preserved in `/public/` for root path links |
| `public/documents/` | Public Assets | Public downloadable marketing service catalog | Client Onboarding | Newly categorized | Non-sensitive public repository |
| `contracts/templates/` | Contracts | Retainers, SLAs, media spend agreements, NDAs | Client Engagement | Newly categorized | Kept strictly outside public/ for confidentiality |
| `contracts/documents/` | Contracts | Codified terms, privacy policy, refund policy | Business Governance | Newly categorized | Mirror of legal clauses from terms-data.ts |
| `tracking/pixel/` | Tracking | Meta Pixel base setup and browser events | Conversion Tracking | Newly categorized | Centralized tracking architecture |
| `tracking/conversion-api/` | Tracking | Meta CAPI payload schema & dispatchers | Server-Side Tracking | Newly categorized | Centralized CAPI modules |
| `tracking/analytics/` | Tracking | GA4 configuration and e-commerce events | Analytics Reporting | Newly categorized | Centralized GA4 modules |
| `tracking/google-tag-manager/` | Tracking | GTM container specs and dataLayer helpers | Tag Management | Newly categorized | Centralized GTM modules |
| `tracking/server-side/` | Tracking | Event deduplication keys and unified dispatcher | iOS 14.5+ CAPI Resiliency | Newly categorized | Centralized deduplication logic |
| `integrations/whatsapp/` | Integrations | Direct WhatsApp message generator & phone specs | WhatsApp Messaging | Newly categorized | Unified communication helper |
| `integrations/meta-graph/` | Integrations | Meta Marketing Graph API connector specs | Ad Account Sync | Newly categorized | Unified ad metrics connector |
| `integrations/gemini/` | Integrations | Server-side Gemini model proxy specs | AI Assistant Logic | Newly categorized | Enforces API key server privacy |
| `data/knowledge-base/` | Data | 6 structured JSON knowledge bases | AI FAQ Engine | Left in place | Imported by lib/faq-engine |
| `data/clients.ts` | Data | 49 authentic client records with verified URLs & categories | Client Portfolio & Showcase | Newly created | Imported by portfolio & testimonials |
| `data/team.ts` | Data | 5 real team member records with bio, skills, default gallery | Team System | Newly created | Imported by team pages & carousel |
| `app/team/[id]/page.tsx` | Route | Dedicated team member profile page with gallery & uploader | Team Deep-dive | Newly created | Dynamic static-exported route |
| `components/team/member-profile-view.tsx` | Component | Rich member profile view with 2-3 image gallery & live upload manager | Team Deep-dive | Newly created | Used by app/team/[id]/page.tsx |
| `lib/faq-engine/` | Core Library | Banglish NLP tokenizer, normalizer, search matcher | Interactive Bot | Left in place | Referenced across site components |
| `lib/language-context.tsx` | Core Library | English and Bengali bilingual provider | Bilingual Experience | Left in place | Root context provider |
| `scripts/verify-assets.mjs` | Scripts | Standalone asset integrity verification | DevOps / QA | Newly categorized | Operational utility |
| `scripts/verify-tracking-schemas.mjs` | Scripts | Validates CAPI JSON schema syntax | DevOps / QA | Newly categorized | Operational utility |
| `tests/sanity-check.test.mjs` | Tests | Validates knowledge base JSON and legal data | Automated Testing | Newly categorized | Operational test runner |
| `docs/ARCHITECTURE.md` | Docs | System architecture and design documentation | Technical Manual | Newly categorized | Developer documentation |
| `docs/DEPLOYMENT_GUIDE.md` | Docs | Production build and Cloudflare Pages instructions | Technical Manual | Newly categorized | Deployment documentation |
| `docs/FAQ_ENGINE.md` | Docs | Banglish NLP matching logic documentation | Technical Manual | Newly categorized | Algorithm documentation |
| `next.config.mjs` | Configuration | Next.js build options & image domains | Framework Config | Left in place | Required at project root |
| `tsconfig.json` | Configuration | TypeScript compiler rules & path aliases | TypeScript Config | Left in place | Required at project root |
| `postcss.config.mjs` | Configuration | Tailwind CSS PostCSS plugin integration | CSS PostCSS Config | Left in place | Required at project root |
| `wrangler.jsonc` | Configuration | Cloudflare Pages deployment specification | Cloudflare Config | Left in place | Required at project root |
| `metadata.json` | Configuration | AI Studio Applet capabilities and branding | AI Studio Engine | Left in place | Required at project root |
| `package.json` | Configuration | Node.js project manifest & build commands | Project Manifest | Left in place | Required at project root |
