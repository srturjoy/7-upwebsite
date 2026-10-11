# Boosting Agency BD — Official Web Application

> **Leading Digital Marketing, Paid Media & AI Automation Agency in Bangladesh.**  
> Official Website: [https://boostingagencyofficial.site/](https://boostingagencyofficial.site/)  
> WhatsApp & Hotline: **+880 1518 961899**  
> Office: Rupnagar R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh  

---

## 📁 Project Directory Organization Guide

The project is organized into professional, purpose-driven categories designed for maintainability, security, and developer clarity:

```text
project-root/
│
├── public/                 # Public web-accessible assets
│   ├── images/             # Organized visual graphics (hero slides, banners)
│   ├── icons/              # Organized favicons, touch icons, logos
│   ├── fonts/              # Typography documentation and local font assets
│   ├── videos/             # Media video guidelines and specifications
│   └── documents/          # Downloadable public brochures & service catalogs
│
├── app/                    # Next.js 16 App Router (pages, layout, API routes)
├── components/             # Reusable UI components by feature domain
├── contracts/              # Agency legal contracts, retainer templates, SLAs
│   ├── templates/          # Master retainer, ad top-up, tracking SLA, NDA
│   └── documents/          # Codified terms of service, privacy, refunds, SOW
│
├── tracking/               # Digital marketing measurement & conversion tracking
│   ├── pixel/              # Meta Pixel browser-side configuration & event helpers
│   ├── conversion-api/     # Meta Conversions API (CAPI) client & payload schema
│   ├── analytics/          # Google Analytics 4 (GA4) measurement specs
│   ├── google-tag-manager/ # GTM web/server container specs & dataLayer helpers
│   └── server-side/        # Server-side event dispatcher & deduplication keys
│
├── integrations/           # External service connectors & API adapters
│   ├── whatsapp/           # Direct WhatsApp messaging protocol (+8801518961899)
│   ├── meta-graph/         # Meta Marketing Graph API metrics interface
│   └── gemini/             # Server-side Gemini AI models proxy interface
│
├── data/                   # Structured JSON knowledge base (agency, pricing, FAQ)
├── lib/                    # Bilingual context, utils, Banglish NLP FAQ engine
├── configuration/          # Central documentation index for root config files
├── scripts/                # Asset validation and schema integrity scripts
├── tests/                  # Automated sanity and knowledge base test suites
├── docs/                   # Architectural blueprints and deployment guides
│
├── PROJECT_FILE_MAP.md     # Master registry of all project files and safety rationale
└── README.md               # Project guide (this file)
```

---

## 🔍 Where to Find Specific Modules

| Category | Location | Description |
|---|---|---|
| **Public Images** | `public/images/` & `public/hero/` | Hero carousel slides, banners, manifest |
| **Icons & Favicons** | `public/icons/` & `public/` | Favicons (16x16 to 512x512), Apple touch icon, logos |
| **Contracts & Legal** | `contracts/` | Retainer agreements, SLAs, Terms & Conditions |
| **Tracking & Analytics** | `tracking/` | Meta Pixel, Meta CAPI, GA4, GTM, Deduplication |
| **Integrations** | `integrations/` | WhatsApp messaging, Meta Graph API, Gemini AI |
| **Knowledge Base** | `data/knowledge-base/` | Pricing tiers, services, policies, FAQ entries |
| **FAQ Engine (NLP)** | `lib/faq-engine/` | Banglish tokenizer, search matcher, normalizer |
| **Configuration** | Project Root & `configuration/` | Next.js, TypeScript, Tailwind, Cloudflare Wrangler |
| **Deployment Guides** | `docs/` | Architecture, Cloudflare Pages export, FAQ engine |

---

## 🛠️ Verification & Build Commands

```bash
# Run asset integrity check
node scripts/verify-assets.mjs

# Run tracking schema validation
node scripts/verify-tracking-schemas.mjs

# Run knowledge base sanity tests
node tests/sanity-check.test.mjs

# Type-check the codebase
npm run lint

# Compile production static export
npm run build
```

---

## 🛡️ Zero-Change Safety Assurance
All organizational folders have been constructed while preserving 100% of the website's UI/UX, design, responsive styling, business logic, routes, and tracking behaviors.
