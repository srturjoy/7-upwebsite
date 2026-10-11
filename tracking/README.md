# Tracking & Analytics Architecture

This directory organizes all source code specifications, event dictionaries, payload schemas, and integration documentation for client and internal conversion tracking.

## Category Folders

- `tracking/pixel/`: Meta Pixel (browser-side events, base code, custom conversion events).
- `tracking/conversion-api/`: Meta Conversions API (CAPI server payload schema, event dispatch logic).
- `tracking/analytics/`: Google Analytics 4 (GA4 measurement configurations, e-commerce event mapping).
- `tracking/google-tag-manager/`: Google Tag Manager (GTM web and server container schemas, dataLayer helpers).
- `tracking/server-side/`: Server-side tracking architecture, event deduplication algorithms, EMQ scores.

## Zero-Change Safety Note
No live tracking triggers or event listeners on the website are modified. This directory acts as the central source of truth and modular architecture for tracking operations.
