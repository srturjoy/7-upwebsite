/**
 * Meta Pixel Browser Dispatch Helpers
 */
import { MetaPixelEvent } from "./meta-pixel-config"

export function trackPixelEvent(event: MetaPixelEvent): void {
  if (typeof window !== "undefined" && (window as any).fbq) {
    if (event.eventID) {
      ;(window as any).fbq("track", event.eventName, event.customData || {}, { eventID: event.eventID })
    } else {
      ;(window as any).fbq("track", event.eventName, event.customData || {})
    }
  }
}
