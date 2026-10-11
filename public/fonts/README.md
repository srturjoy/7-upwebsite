# Typography and Local Fonts

This directory is designated for self-hosted web font binaries (e.g. `.woff2`, `.woff`, `.ttf`) used across the website.

## Current Font Stack
The Boosting Agency BD platform currently utilizes modern system font stacks and Google Fonts via `@next/font` and CSS font variables configured in Tailwind CSS:

1. **Latin Typography**: Inter, Geist Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif.
2. **Bengali Typography**: "Hind Siliguri", "Noto Sans Bengali", "Kalpurush", SolaimanLipi, system-ui.

## Guidelines for Adding Local Fonts
- Prefer `.woff2` format for optimal compression and fast rendering.
- Declare `@font-face` rules in `app/globals.css` with `font-display: swap`.
- Retain license documentation for any custom proprietary font family.
