/**
 * Google Analytics 4 (GA4) Configuration & Event Map
 */

export interface GA4EventParams {
  page_title?: string
  page_location?: string
  service_category?: string
  contact_method?: "whatsapp" | "phone" | "form"
  value?: number
  currency?: string
}

export function trackGA4Event(eventName: string, params?: GA4EventParams): void {
  if (typeof window !== "undefined" && (window as any).gtag) {
    ;(window as any).gtag("event", eventName, params || {})
  }
}
