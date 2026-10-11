/**
 * Server-Side Unified Event Dispatcher
 * Routes events concurrently to Meta CAPI, GA4 Measurement Protocol, and Logging
 */
import { generateEventId } from "./deduplication-keys"

export interface ServerEvent {
  name: string
  url: string
  ip?: string
  userAgent?: string
  customParams?: Record<string, unknown>
}

export function prepareServerEvent(event: ServerEvent) {
  return {
    eventId: generateEventId(),
    timestamp: Math.floor(Date.now() / 1000),
    ...event
  }
}
