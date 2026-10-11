/**
 * Google Tag Manager dataLayer Helper
 */

export function pushToDataLayer(eventObject: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(eventObject)
  }
}
