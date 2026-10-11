# Icons and Brand Mark Assets

This directory contains brand identity assets, favicons, vector and bitmap icons, and application shortcuts used across all modern devices, search engines, and browsers.

## Directory Structure

```text
public/icons/
├── favicons/
│   ├── favicon.ico           # Legacy multi-resolution Windows/browser icon
│   ├── favicon-16x16.png     # Standard browser tab favicon
│   ├── favicon-32x32.png     # Retina browser tab favicon
│   ├── favicon-48x48.png     # Android shortcut & desktop bookmark icon
│   ├── favicon-96x96.png     # Google TV & Android high-density icon
│   ├── favicon-144x144.png   # Windows tile & high-res mobile icon
│   ├── favicon-192x192.png   # PWA manifest standard icon
│   ├── favicon-512x512.png   # PWA splash screen & high-res display icon
│   ├── apple-icon.png        # iOS Home Screen touch icon (180x180)
│   ├── icon-light-32x32.png  # Light-theme adaptive favicon
│   ├── icon-dark-32x32.png   # Dark-theme adaptive favicon
│   └── icon.png              # Primary square app icon (1024x1024 master)
├── logos/
│   ├── logo.png              # High-resolution primary agency logo
│   └── logo-512x512.png      # 512x512 square brand identity logo
└── README.md
```

## Usage in App Manifest & Metadata
These assets are referenced by `/public/site.webmanifest` and Next.js `<head>` tags in `app/layout.tsx`. To preserve strict backward compatibility with browsers, the root files in `/public/` remain accessible at their standard URIs.
