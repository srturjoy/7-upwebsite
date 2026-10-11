/**
 * Event Deduplication Key Generator
 * Matches browser pixel events with server CAPI events via event_id
 */

export function generateEventId(prefix = "babd"): string {
  const ts = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 9)
  return `${prefix}_${ts}_${randomStr}`
}
