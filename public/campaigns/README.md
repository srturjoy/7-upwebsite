# Meta Ads Manager Campaign Screenshots Directory

Place your authentic Meta Ads Manager campaign screenshots in this folder:
`/public/campaigns/`

### How to Add or Update Screenshots:
1. Save your screenshot image file here (e.g. `messenger-leads-unique-point.png` or `website-purchases-ecommerce.png`).
2. Open `data/campaign-performance.ts`.
3. Locate the corresponding campaign item and set the `screenshotUrl` field:
   ```ts
   screenshotUrl: "/campaigns/messenger-leads-unique-point.png"
   ```
4. Update or fine-tune any verified metrics (`results`, `costPerResult`, `amountSpent`, `additionalMetrics`).

### Supported Formats:
- PNG, JPG, JPEG, WebP.
- The interface automatically includes a lightbox zoom feature so visitors can inspect high-resolution Ads Manager columns, date ranges, and attribution figures.
