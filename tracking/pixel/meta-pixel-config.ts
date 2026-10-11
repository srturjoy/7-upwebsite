/**
 * Meta Pixel Base Configuration & Event Definitions
 * Agency standard tracking definitions for Meta Events Manager
 */

export interface MetaPixelEvent {
  eventName: "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase" | "Lead" | "Contact"
  eventID?: string
  customData?: Record<string, unknown>
  userData?: {
    em?: string // SHA256 hashed email
    ph?: string // SHA256 hashed phone
    fn?: string // SHA256 hashed first name
    client_ip_address?: string
    client_user_agent?: string
  }
}

export const META_PIXEL_DEFAULT_EVENTS = {
  PAGE_VIEW: "PageView",
  LEAD: "Lead",
  CONTACT: "Contact",
  VIEW_CONTENT: "ViewContent",
  PURCHASE: "Purchase",
} as const
