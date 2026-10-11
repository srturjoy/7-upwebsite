# Deployment Guide

## Build & Export Command
```bash
npm run build
```
This produces a production-optimized static export inside the `./out` directory.

## Environment Variables
- Processed via `.env.example`
- Server-side Gemini API key: `GEMINI_API_KEY`
- All client variables must use `NEXT_PUBLIC_` prefix.
