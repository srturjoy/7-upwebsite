/**
 * Meta Conversions API (CAPI) Dispatcher
 * Sends server-side conversion payloads directly to Meta Graph API
 */

export interface CAPIPayload {
  data: Array<{
    event_name: string
    event_time: number
    event_id: string
    event_source_url: string
    action_source: "website"
    user_data: {
      client_ip_address?: string
      client_user_agent?: string
      ph?: string[]
      em?: string[]
    }
    custom_data?: Record<string, unknown>
  }>
}

export async function sendCAPIEvent(pixelId: string, accessToken: string, payload: CAPIPayload) {
  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return res.json()
}
