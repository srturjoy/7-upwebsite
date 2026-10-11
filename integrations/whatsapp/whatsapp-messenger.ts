/**
 * Official WhatsApp Integration Helper
 * Boosting Agency BD official number: +8801518961899
 */

export const OFFICIAL_WHATSAPP_NUMBER = "8801518961899"
export const OFFICIAL_WHATSAPP_DISPLAY = "+880 1518 961899"

export function getWhatsAppDirectUrl(customMessage?: string): string {
  const defaultMsg = "Hello Boosting Agency BD, I want to know more about your digital marketing services."
  const msg = customMessage || defaultMsg
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}
