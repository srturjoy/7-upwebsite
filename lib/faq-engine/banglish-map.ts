/**
 * Banglish (Bengali written in English letters) and common synonyms dictionary.
 * Maps informal customer spellings to canonical topics/intents.
 */

export interface IntentMapping {
  topic: string
  canonicalTokens: string[]
  weight: number
}

export const BANGLISH_SYNONYM_MAP: Record<string, string[]> = {
  // Dollar rate / USD rate
  "dollar-rate": [
    "dollar", "usd", "145", "135", "155", "dolar", "dollar rate", "dollar koto",
    "dollar dam", "exchange rate", "dollar conversion", "1 dollar", "usd rate",
    "ডলার", "রেট", "ডলারের", "দাম"
  ],
  // Minimum budget / Budget calculation
  "minimum-budget": [
    "minimum budget", "20 dollar", "2 dollar", "2900 taka", "290 taka", "kom budget",
    "shobcheye kom", "lowest budget", "koydin cholbe", "10 din", "budget calculation",
    "প্রতিদিন", "দৈনিক", "সর্বনিম্ন", "বাজেট", "2900", "290", "১০", "দিন", "চলবে"
  ],
  // Pricing / Cost
  "pricing": [
    "dam", "daam", "khoroch", "kharach", "khoroc", "budget", "cost", "taka", "price",
    "rate", "package", "fees", "fee", "koto", "koto taka", "kharas", "kom dame",
    "খরচ", "দাম", "প্যাকেজ", "ফি"
  ],
  // Boosting / Meta Ads
  "facebook-ads": [
    "boost", "bust", "bost", "fb boost", "page boost", "boosting", "fb ad", "fb ads",
    "facebook", "insta", "instagram", "facebook ad", "meta", "page like", "follower",
    "reach", "message", "messenger", "post boost", "managed ads",
    "বুস্ট", "বুস্টিং", "মেটা", "ফেসবুক", "বিজ্ঞাপন"
  ],
  // Account top-up only
  "account-topup": [
    "topup", "top up", "balance", "dollar load", "account loading", "135 dollar",
    "টপ", "টপআপ", "ব্যালেন্স"
  ],
  // CAPI & Tracking / Pixel setup
  "server-side-tracking": [
    "pixel", "capi", "conversion api", "tracking", "track", "sgtm", "gtm",
    "analytics", "tag manager", "ios 14", "event track", "purchase track",
    "500 taka", "3000 taka", "5000 taka", "basic pixel", "cms pixel",
    "পিক্সেল", "ট্র্যাকিং", "সার্ভার", "সাইড", "সিএমএস", "500", "3000", "5000"
  ],
  // Creative package
  "creative-package": [
    "creative", "reels", "banner", "static creative", "15 static", "10 reels",
    "6000 taka", "creative package",
    "ক্রিয়েটিভ", "রিলস", "ব্যানার", "পোস্টার", "6000"
  ],
  // Google Ads
  "google-ads": [
    "google", "google ad", "google ads", "pmax", "search ad", "ppc", "youtube ad",
    "google ranking", "display ad",
    "গুগল", "ইউটিউব"
  ],
  // YouTube
  "youtube": [
    "yt", "youtube", "video boost", "subscribers", "views", "watch time", "monetization",
    "video ad", "channel"
  ],
  // TikTok
  "tiktok": [
    "tiktok", "tik tok", "short video", "tiktok ad", "tiktok pixel"
  ],
  // Web Design
  "web-design": [
    "website", "web design", "site", "landing page", "web", "online shop",
    "ecommerce", "developer", "banano", "banabo",
    "ওয়েবসাইট", "ল্যান্ডিং"
  ],
  // SEO
  "seo": [
    "seo", "ranking", "rank", "google prothom", "backlink", "organic"
  ],
  // How to start / Onboarding & Launch timeline
  "onboarding": [
    "shuru", "kemne", "kivabe", "start", "prokriya", "kaj", "process", "niyom",
    "kivabe shuru", "shuru korbo", "kobe start hobe", "kobe chalu", "launch",
    "শুরু", "কবে", "কখন শুরু", "কখন চালু", "চালু"
  ],
  // Contact & Location
  "contact": [
    "thikana", "kothai", "address", "office", "location", "mirpur", "dhaka",
    "phone", "number", "whatsapp", "call", "jogajog", "dekha", "kotha bolbo",
    "ঠিকানা", "অফিস", "মিরপুর", "রূপনগর", "যোগাযোগ"
  ],
  // Security & Safety
  "security": [
    "safe", "security", "password", "nosto", "restriction", "hobe ki", "safe thakbe",
    "নিরাপদ", "নিরাপত্তা", "পাসওয়ার্ড"
  ],
  // Guarantee & Results
  "guarantee": [
    "guarantee", "garanty", "sale", "sales", "order", "result", "roas", "order ashbe",
    "lav hobe", "labh", "loss",
    "গ্যারান্টি", "বিক্রি"
  ],
  // Payment methods & Advance policy
  "payment": [
    "bkash", "nagad", "rocket", "bank", "card", "payment", "bikas", "taka dibo",
    "advance", "prepaid",
    "বিকাশ", "নগদ", "রকেট", "ব্যাংক", "পেমেন্ট", "অগ্রিম"
  ],
  // Refund & Balance
  "refund": [
    "refund", "ferot", "taka ferot", "money back", "cancel", "balance ferot", "unspent",
    "রিফান্ড", "ফেরত", "বাতিল"
  ]
}

/**
 * Expand a user query with canonical synonyms based on detected Banglish words.
 */
export function expandQueryTokens(tokens: string[]): string[] {
  const expanded = new Set<string>(tokens)

  for (const token of tokens) {
    for (const [intent, synonyms] of Object.entries(BANGLISH_SYNONYM_MAP)) {
      if (synonyms.includes(token)) {
        expanded.add(intent)
        // Add related primary synonyms to improve overlap
        for (const s of synonyms.slice(0, 3)) {
          expanded.add(s)
        }
      }
    }
  }

  return Array.from(expanded)
}
