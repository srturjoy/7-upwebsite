# Central Project Configuration Index

To adhere strictly to framework specifications and Next.js / Cloudflare build tools, core configuration files remain at the project root while being documented and indexed here.

## Root Configuration Files

| File | Purpose | Framework Requirement |
|---|---|---|
| `next.config.mjs` | Next.js build options, static export, remote images | Required at project root by Next.js |
| `tsconfig.json` | TypeScript compiler options, path aliases (`@/*`) | Required at project root by tsc |
| `postcss.config.mjs` | Tailwind CSS PostCSS plugin integration | Required at project root by PostCSS |
| `wrangler.jsonc` | Cloudflare Pages deployment configuration | Required at project root by Wrangler |
| `metadata.json` | AI Studio Applet capabilities and branding metadata | Required at project root by AI Studio |
| `package.json` | Project dependencies and execution scripts | Required at project root by npm |
