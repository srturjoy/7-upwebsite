import agencyInfoJson from "@/data/knowledge-base/agency-info.json"
import servicesJson from "@/data/knowledge-base/services.json"
import pricingJson from "@/data/knowledge-base/pricing.json"
import faqJson from "@/data/knowledge-base/faq.json"
import policiesJson from "@/data/knowledge-base/policies.json"
import contactJson from "@/data/knowledge-base/contact.json"

import {
  ServiceItem,
  FaqItem,
  PolicyItem,
  AgencyData,
  ContactData,
  SearchAnswer,
  ActionLink
} from "./types"
import { normalizeEnglish, tokenize } from "./text-normalizer"
import { expandQueryTokens } from "./banglish-map"

// Safely typed loaded data
export const agencyData: AgencyData = agencyInfoJson as unknown as AgencyData
export const servicesList: ServiceItem[] = servicesJson as unknown as ServiceItem[]
export const pricingData = pricingJson as any
export const faqList: FaqItem[] = faqJson as unknown as FaqItem[]
export const policiesData = policiesJson as unknown as { policies: PolicyItem[] }
export const contactData: ContactData = contactJson as unknown as ContactData

const WHATSAPP_BASE_URL = `https://wa.me/8801518961899`

function buildWhatsAppAction(messageEn: string, messageBn: string): ActionLink {
  return {
    label_en: "Chat on WhatsApp (Instant)",
    label_bn: "হোয়াটসঅ্যাপে চ্যাট করুন (তাৎক্ষণিক)",
    url: `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(messageEn)}`,
    isExternal: true,
    type: "whatsapp"
  }
}

function buildPhoneAction(): ActionLink {
  return {
    label_en: "Call 01518961899",
    label_bn: "কল করুন: ০১৫১৮৯৬১৮৯৯",
    url: "tel:+8801518961899",
    isExternal: false,
    type: "phone"
  }
}

/**
 * Computes match score between query tokens and target item tokens
 */
function computeScore(queryTokens: string[], targetKeywords: string[], targetAliases: string[]): number {
  let score = 0
  const qSet = new Set(queryTokens)

  // Direct alias check (higher weight)
  for (const alias of targetAliases) {
    const aliasNormalized = normalizeEnglish(alias)
    if (queryTokens.some((t) => aliasNormalized.includes(t))) {
      score += 4
    }
  }

  // Target keyword overlaps
  for (const kw of targetKeywords) {
    const kwNormalized = normalizeEnglish(kw)
    const kwTokens = kwNormalized.split(/\s+/)
    for (const t of kwTokens) {
      if (qSet.has(t)) {
        score += 2.5
      }
    }
  }

  return score
}

/**
 * Searches the knowledge base and generates the best matching response
 */
export function queryKnowledgeBase(query: string, currentLang: "en" | "bn" = "bn"): SearchAnswer {
  const rawTokens = tokenize(query)
  const tokens = expandQueryTokens(rawTokens)
  const lowerQuery = query.toLowerCase()

  // 1. Direct Intent: Address, Office Location & Hours
  if (
    tokens.includes("contact") ||
    tokens.includes("thikana") ||
    tokens.includes("office") ||
    tokens.includes("address") ||
    tokens.includes("mirpur") ||
    tokens.includes("hours") ||
    lowerQuery.includes("ঠিকানা") ||
    lowerQuery.includes("অফিস") ||
    lowerQuery.includes("কোথায়") ||
    lowerQuery.includes("খোলা") ||
    lowerQuery.includes("সময়") ||
    lowerQuery.includes("hours")
  ) {
    return {
      title_en: "Official Office Location & Contact",
      title_bn: "অফিসের ঠিকানা ও যোগাযোগের মাধ্যম",
      text_en: `📍 **Office Address:** ${contactData.address_en}\n\n📞 **Phone:** ${contactData.phone}\n💬 **WhatsApp:** ${contactData.phone_raw}\n⏰ **Office Hours:** ${contactData.hours_en}\n\nYou are welcome to visit our office in Mirpur-2 for in-person consultations. Please message us on WhatsApp in advance!`,
      text_bn: `📍 **অফিস ঠিকানা:** ${contactData.address_bn}\n\n📞 **ফোন:** ${contactData.phone}\n💬 **হোয়াটসঅ্যাপ:** ${contactData.phone_raw}\n⏰ **কাজের সময়:** ${contactData.hours_bn}\n\nমিরপুর-২ রূপনগর আবাসিক এলাকায় আমাদের অফিসে সরাসরি এসেও কথা বলতে পারেন। সাক্ষাতের আগে দয়া করে হোয়াটসঅ্যাপে যোগাযোগ করে আসুন।`,
      confidence: 95,
      matchedCategory: "Contact",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I want to visit your Mirpur office.",
          "আসসালামু আলাইকুম, আমি আপনাদের মিরপুর অফিসে সরাসরি কথা বলতে আসতে চাই।"
        ),
        buildPhoneAction()
      ],
      suggestedQuestions: [
        { en: "How do I get started?", bn: "কীভাবে কাজ শুরু করব?" },
        { en: "What is your dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" }
      ]
    }
  }

  // 2. Direct Intent: Minimum Budget & Daily Budget Calculation (Prioritized for daily/budget inquiries)
  const isDailyOrMinBudget =
    tokens.includes("minimum-budget") ||
    lowerQuery.includes("প্রতিদিন") ||
    lowerQuery.includes("দৈনিক") ||
    lowerQuery.includes("daily") ||
    lowerQuery.includes("per day") ||
    lowerQuery.includes("সর্বনিম্ন বাজেট") ||
    lowerQuery.includes("কম বাজেট") ||
    lowerQuery.includes("20 dollar") ||
    lowerQuery.includes("20$") ||
    lowerQuery.includes("2 dollar") ||
    lowerQuery.includes("2$") ||
    lowerQuery.includes("2900") ||
    lowerQuery.includes("290") ||
    lowerQuery.includes("বাজেট হিসাব") ||
    (tokens.includes("budget") && (tokens.includes("minimum") || tokens.includes("kom") || tokens.includes("lowest")))

  if (isDailyOrMinBudget && !lowerQuery.includes("পিক্সেল") && !lowerQuery.includes("pixel")) {
    return {
      title_en: "Minimum Advertising Budget & Calculation",
      title_bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট ও হিসাবের নিয়ম",
      text_en: `Here are our verified minimum budget requirements:\n\n• **Minimum Campaign Budget:** $20 total.\n• **Minimum Daily Budget:** $2 per day.\n• At $2/day, a $20 advertising budget runs for approximately 10 days.\n\n📊 **Budget Calculation (at standard ৳145/USD rate):**\n• Ad Budget in BDT = USD Budget × ৳145.\n• Example: $20 × ৳145 = ৳2,900 advertising spend.\n• Daily: $2/day × ৳145 = ৳290/day.\n\n💡 **Distinction:** This covers the advertising platform spend only. Agency management fees and payment processing charges are calculated separately. These minimum budget rules ensure Meta's machine learning algorithm has sufficient data, but are not an automated guarantee of sales.`,
      text_bn: `আমাদের বিজ্ঞাপনের সর্বনিম্ন বাজেটের নিয়ম:\n\n• **সর্বনিম্ন ক্যাম্পেইন বাজেট:** মোট $২০।\n• **দৈনিক সর্বনিম্ন বাজেট:** প্রতিদিন $২।\n• প্রতিদিন $২ বাজেটে $২০ বাজেট দিয়ে প্রায় ১০ দিন বিজ্ঞাপন চালানো যায়।\n\n📊 **বাজেট হিসাব (স্ট্যান্ডার্ড ১৪৫ টাকা রেটে):**\n• বাংলাদেশি টাকায় বাজেট = ডলার বাজেট × ১৪৫ টাকা।\n• উদাহরণ: $২০ × ১৪৫ = ২,৯০০ টাকা।\n• দৈনিক: $২/দিন × ১৪৫ = ২৯০ টাকা/দিন।\n\n💡 **পার্থক্য:** এটি শুধুমাত্র বিজ্ঞাপনের প্ল্যাটফর্ম বাজেট। এজেন্সির ম্যানেজমেন্ট ফি ও পেমেন্ট চার্জ আলাদা। এটি সিস্টেমের সর্বনিম্ন নীতি, ফলের শতভাগ গ্যারান্টি নয়।`,
      confidence: 96,
      matchedCategory: "Budget & Pricing",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I want to run a $20 campaign for my page.",
          "আসসালামু আলাইকুম, আমি আমার পেজের জন্য ২০ ডলারের ক্যাম্পেইন চালাতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
        { en: "When will my campaign start?", bn: "পেমেন্ট করার পর বিজ্ঞাপন কখন চালু হবে?" }
      ]
    }
  }

  // 3. Direct Intent: USD Rate / Dollar Rate specifically
  if (
    tokens.includes("dollar-rate") ||
    tokens.includes("145") ||
    tokens.includes("135") ||
    tokens.includes("155") ||
    lowerQuery.includes("dollar rate") ||
    lowerQuery.includes("ডলার রেট") ||
    lowerQuery.includes("ডলারের দাম") ||
    (tokens.includes("dollar") && (tokens.includes("rate") || tokens.includes("dam") || tokens.includes("koto")))
  ) {
    return {
      title_en: "USD Conversion Rates for Advertising",
      title_bn: "বিজ্ঞাপনের জন্য ডলার কনভার্সন রেট",
      text_en: `Our USD rate depends on the specific service provided:\n\n• **Standard Managed Meta Ads:** ৳145 per USD (includes campaign monitoring, optimization support, and account billing).\n• **Advertising Account + Dollar Top-up Only:** ৳135 per USD (for account balance funding only, excluding campaign management).\n• **Regulated Categories (Betting / Herbal):** ৳155 per USD (strictly where explicitly permitted by agency policy).\n\n📌 **Important Note:** Agency USD billing rates represent commercial ad account management and international payment processing rates, and are distinct from raw interbank currency market rates. We explain the applicable service and rate before providing any quotation.`,
      text_bn: `সার্ভিসের ধরন অনুযায়ী আমাদের ডলার রেট নির্ধারিত হয়:\n\n• **স্ট্যান্ডার্ড ম্যানেজড মেটা অ্যাডস:** প্রতি ডলার ১৪৫ টাকা (ক্যাম্পেইন ম্যানেজমেন্ট, বাজেট অপটিমাইজেশন ও অ্যাকাউন্ট বিলিং সহ)।\n• **অ্যাড একাউন্ট + ডলার টপ-আপ অনলি:** প্রতি ডলার ১৩৫ টাকা (শুধুমাত্র একাউন্ট ব্যালেন্স টপ-আপ, ক্যাম্পেইন তৈরি অন্তর্ভুক্ত নয়)।\n• **নিয়ন্ত্রিত ক্যাটাগরি (বেটিং / হারবাল / ভেষজ):** প্রতি ডলার ১৫৫ টাকা (এজেন্সির বর্তমান পলিসিতে অনুমোদিত হলে প্রযোজ্য)।\n\n📌 **গুরুত্বপূর্ণ নোট:** এজেন্সির ডলার রেট হলো বাণিজ্যিক সার্ভিস রেট এবং সাধারণ ব্যাংকের মার্কেট রেট থেকে আলাদা। কোটেশন প্রদানের আগে কোন রেট প্রযোজ্য তা স্পষ্ট জানানো হয়।`,
      confidence: 96,
      matchedCategory: "USD Rate & Currency",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I want to calculate an ad budget quotation.",
          "আসসালামু আলাইকুম, আমি বিজ্ঞাপনের বাজেট ও ডলার রেট সম্পর্কে জানতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "Minimum advertising budget", bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট কত?" },
        { en: "What Meta Ads service options do you offer?", bn: "মেটা অ্যাডসের সার্ভিস অপশনগুলো কী কী?" }
      ]
    }
  }

  // 4. Direct Intent: Pixel / Server-Side Tracking & CAPI Pricing
  const isPixelTrackingQuery =
    tokens.includes("server-side-tracking") ||
    lowerQuery.includes("পিক্সেল") ||
    lowerQuery.includes("pixel") ||
    lowerQuery.includes("capi") ||
    lowerQuery.includes("সার্ভার সাইড") ||
    lowerQuery.includes("ট্র্যাকিং")

  if (isPixelTrackingQuery) {
    return {
      title_en: "Pixel Setup & Server-Side Tracking (CAPI)",
      title_bn: "পিক্সেল সেটআপ ও সার্ভার-সাইড ট্র্যাকিং (CAPI)",
      text_en: `Here are our verified tracking setup charges and details:\n\n• **Basic Pixel Setup:** ৳500 (Standard browser pixel event configuration).\n• **Full CMS Pixel / Tracking Setup:** ৳3,000 (WordPress/Shopify standard e-commerce events: ViewContent, AddToCart, InitiateCheckout, Purchase).\n• **Custom Tracking / Server-Side CAPI:** ৳5,000 (Cloud server GTM and Conversion API setup to bypass iOS 14.5+ ad blockers and data loss).\n\n⚠️ **Verification Notice:** These prices cover tracking technical configuration only, excluding server hosting or third-party platform subscriptions. Deliverables are verified against current project scopes upon inquiry.`,
      text_bn: `আমাদের পিক্সেল ও ট্র্যাকিং সেটআপের সেবামূল্য ও বিবরণ:\n\n• **বেসিক পিক্সেল সেটআপ:** ৫০০ টাকা (সাধারণ ব্রাউজার পিক্সেল ইভেন্ট কনফিগারেশন)।\n• **ফুল সিএমএস পিক্সেল/ট্র্যাকিং সেটআপ:** ৩,০০০ টাকা (ওয়ার্ডপ্রেস বা শপিফাই ই-কমার্স ইভেন্টস: ViewContent, AddToCart, InitiateCheckout, Purchase সহ)।\n• **কাস্টম ট্র্যাকিং / সার্ভার-সাইড CAPI:** ৫,০০০ টাকা (ক্লাউড সার্ভার GTM ও মেটা কনভার্সন এপিআই সেটাপ, যা iOS 14.5+ ডাটা ড্রপ রোধ করে)।\n\n⚠️ **যাচাইকরণ নোট:** এই খরচ শুধুমাত্র টেকনিক্যাল ট্র্যাকিং সেটাপের জন্য, এতে বিজ্ঞাপনের বাজেট বা সার্ভার সাবস্ক্রিপশন অন্তর্ভুক্ত নয়। বর্তমান অফারের জন্য যোগাযোগ করুন।`,
      confidence: 95,
      matchedCategory: "Analytics & Tracking",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I want to set up Pixel / CAPI for my website.",
          "আসসালামু আলাইকুম, আমি আমার ওয়েবসাইটের জন্য পিক্সেল / CAPI সেটআপ করতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "Why do I need CAPI?", bn: "সার্ভার-সাইড ট্র্যাকিং ও CAPI কেন প্রয়োজন?" },
        { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" }
      ]
    }
  }

  // 5. Direct Intent: Payment Methods
  const isPaymentQuery =
    tokens.includes("payment") ||
    lowerQuery.includes("বিকাশ") ||
    lowerQuery.includes("নগদ") ||
    lowerQuery.includes("রকেট") ||
    lowerQuery.includes("ব্যাংক") ||
    lowerQuery.includes("পেমেন্ট") ||
    lowerQuery.includes("bkash") ||
    lowerQuery.includes("nagad")

  if (isPaymentQuery && !tokens.includes("refund")) {
    return {
      title_en: "Payment Methods & Advance Terms",
      title_bn: "পেমেন্ট মাধ্যম ও অগ্রিম পরিশোধের শর্ত",
      text_en: `We accept all standard Bangladeshi payment channels:\n\n• **Mobile Financial Services:** bKash (Personal & Merchant), Nagad, Rocket.\n• **Bank Transfer:** Direct transfer to BRAC Bank, The City Bank, or Dutch-Bangla Bank (DBBL).\n• **Direct Cards:** Dual-currency card settlement.\n\n📌 **Payment Terms:** Advertising spend must be 100% prepaid before campaigns launch. Monthly management fees require advance payment (e.g. ৳10,000 prepaid) as agreed upon onboarding.`,
      text_bn: `আমরা বাংলাদেশের সকল প্রধান মাধ্যমে পেমেন্ট গ্রহণ করি:\n\n• **মোবাইল ব্যাংকিং:** বিকাশ (পার্সোনাল ও মার্চেন্ট), নগদ, রকেট।\n• **ব্যাংক ট্রান্সফার:** ব্র্যাক ব্যাংক, দি সিটি ব্যাংক, ডাচ-বাংলা ব্যাংক (DBBL)।\n• **ডুয়াল কারেন্সি কার্ড:** সরাসরি কার্ড সেটেলমেন্ট।\n\n📌 **পেমেন্ট শর্ত:** ক্যাম্পেইন লাইভ করার আগেই বিজ্ঞাপনের ডলার বাজেট সম্পূর্ণ অগ্রিম (প্রিপেইড) দিতে হয়। মাসিক ম্যানেজমেন্ট ফি অগ্রিম পরিশোধযোগ্য।`,
      confidence: 95,
      matchedCategory: "Payment",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I want payment details to confirm an ad budget.",
          "আসসালামু আলাইকুম, আমি পেমেন্ট সম্পন্ন করতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "When will my campaign start?", bn: "পেমেন্ট করার পর বিজ্ঞাপন কখন চালু হবে?" },
        { en: "What is your refund policy?", bn: "আপনাদের রিফান্ড পলিসি কী?" }
      ]
    }
  }

  // 4. Direct Intent: Refund, Balance & Pausing campaigns
  if (
    tokens.includes("refund") ||
    lowerQuery.includes("রিফান্ড") ||
    lowerQuery.includes("টাকা ফেরত") ||
    lowerQuery.includes("বাতিল") ||
    lowerQuery.includes("ব্যালেন্স") ||
    lowerQuery.includes("unspent") ||
    lowerQuery.includes("cancel")
  ) {
    return {
      title_en: "Refund, Pause & Unspent Balance Policy",
      title_bn: "রিফান্ড, বিরতি ও অবশিষ্ট ব্যালেন্স নীতিমালা",
      text_en: `Our verified balance & refund rules:\n\n• **Unspent Ad Spend:** If you pause or conclude a campaign early, any unspent advertising budget on Meta or Google is fully refundable, or can be retained as an account credit for your next campaign.\n• **Agency Service Fees:** Non-refundable once research, strategy, audience structuring, and creative work have commenced.\n• **Platform Restrictions:** If Meta restricts an account due to client product policy violations, unspent ad budget remains safe, but completed agency setup work cannot be refunded.`,
      text_bn: `আমাদের ব্যালেন্স ও রিফান্ড নীতিমালা:\n\n• **অব্যবহৃত বিজ্ঞাপন বাজেট:** ক্যাম্পেইন বন্ধ করলে মেটা বা গুগলে অব্যবহৃত যেকোনো ডলার বা টাকা সম্পূর্ণ ফেরতযোগ্য, অথবা পরবর্তী ক্যাম্পেইনের জন্য ক্রেডিট হিসেবে জমা রাখা যায়।\n• **এজেন্সির সার্ভিস ফি:** স্ট্র্যাটেজি, রিসার্চ ও ক্যাম্পেইন সেটআপের কাজ শুরু হওয়ার পর সার্ভিস ফি ফেরতযোগ্য নয়।\n• **প্ল্যাটফর্ম বিধিনিষেধ:** ক্লায়েন্টের পণ্যের পলিসি সমস্যার কারণে একাউন্ট রেস্ট্রিক্টেড হলে অব্যবহৃত বাজেট অক্ষত থাকে, কিন্তু কাজের ফি ফেরত হয় না।`,
      confidence: 95,
      matchedCategory: "Policies",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I have a query regarding balance and refund.",
          "আসসালামু আলাইকুম, আমি ব্যালেন্স ও রিফান্ড পলিসি সম্পর্কে আলোচনা করতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "What payment methods do you accept?", bn: "আপনারা কোন কোন মাধ্যমে পেমেন্ট নেন?" },
        { en: "How to get started?", bn: "কীভাবে কাজ শুরু করব?" }
      ]
    }
  }

  // 5. Direct Intent: Pricing & Packages Overview
  const isPricingQuery =
    tokens.includes("pricing") ||
    tokens.includes("budget") ||
    lowerQuery.includes("দাম") ||
    lowerQuery.includes("খরচ") ||
    lowerQuery.includes("টাকা") ||
    lowerQuery.includes("cost") ||
    lowerQuery.includes("price") ||
    lowerQuery.includes("package")

  if (isPricingQuery && !tokens.includes("server-side-tracking") && !tokens.includes("seo") && !tokens.includes("web-design")) {
    const pkgTextEn = (pricingData.packages as any[])
      .map((p) => `• **${p.name_en}**: ${p.price_bdt}\n  _${p.ideal_for_en}_`)
      .join("\n\n")

    const pkgTextBn = (pricingData.packages as any[])
      .map((p) => `• **${p.name_bn}**: ${p.price_bdt}\n  _${p.ideal_for_bn}_`)
      .join("\n\n")

    return {
      title_en: "Pricing & Advertising Packages",
      title_bn: "বিজ্ঞাপন প্যাকেজ ও খরচের বিবরণী",
      text_en: `Here are our verified packages and recorded pricing options:\n\n${pkgTextEn}\n\n💵 **USD Rates:** ৳145/USD (Managed Ads) | ৳135/USD (Top-up only) | ৳155/USD (Permitted betting/herbal).\n📊 **Minimum Budget:** $20 total ($2/day) = ৳2,900 ad spend at ৳145/USD.\n\n⚠️ **Verification Notice:** Recorded standalone fees (e.g., Page Setup ৳1,000, Creative Package ৳6,000 for 15 static + 10 reels, Basic Pixel ৳500, Full CMS Pixel ৳3,000, Custom Tracking ৳5,000, and ৳10,000 vs ৳12,000 monthly management) are verified against current active proposals upon inquiry.`,
      text_bn: `আমাদের প্যাকেজ ও খরচের রূপরেখা নিচে দেওয়া হলো:\n\n${pkgTextBn}\n\n💵 **ডলার রেট:** ১৪৫ টাকা/USD (ম্যানেজড অ্যাড) | ১৩৫ টাকা/USD (টপ-আপ অনলি) | ১৫৫ টাকা/USD (অনুমোদিত বেটিং/ভেষজ)।\n📊 **সর্বনিম্ন বাজেট:** মোট $২০ ($২/দিন) = ১৪৫ টাকা রেটে ২,৯০০ টাকা অ্যাড বাজেট।\n\n⚠️ **যাচাইকরণ নোট:** রেকর্ডকৃত অন্যান্য ফি (যেমন: পেজ সেটআপ ১,০০০ টাকা, ক্রিয়েটিভ প্যাকেজ ৬,০০০ টাকা ১৫টি স্ট্যাটিক + ১০টি রিলস, বেসিক পিক্সেল ৫০০ টাকা, ফুল সিএমএস ৩,০০০ টাকা, কাস্টম ট্র্যাকিং ৫,০০০ টাকা, এবং ১০,০০০ বনাম ১২,০০০ মাসিক ফি) বর্তমান অফারের সাথে চূড়ান্তভাবে যাচাই করে অফার করা হয়।`,
      confidence: 92,
      matchedCategory: "Pricing",
      actions: [
        buildWhatsAppAction(
          "Hello Boosting Agency BD, I would like to get a quote for my business.",
          "আসসালামু আলাইকুম, আমার ব্যবসার জন্য প্যাকেজের খরচ ও বাজেট জানতে চাই।"
        )
      ],
      suggestedQuestions: [
        { en: "What is your dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
        { en: "Minimum advertising budget", bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট কত?" },
        { en: "What payment methods do you accept?", bn: "আপনারা কোন মাধ্যমে পেমেন্ট নেন?" }
      ]
    }
  }

  // 6. Search FAQ items
  let bestFaq: FaqItem | null = null
  let maxFaqScore = 0

  for (const faq of faqList) {
    const score = computeScore(tokens, faq.keywords, faq.banglish_aliases)
    if (score > maxFaqScore) {
      maxFaqScore = score
      bestFaq = faq
    }
  }

  // 7. Search Services items
  let bestService: ServiceItem | null = null
  let maxServiceScore = 0

  for (const service of servicesList) {
    const score = computeScore(tokens, service.keywords, service.banglish_aliases)
    if (score > maxServiceScore) {
      maxServiceScore = score
      bestService = service
    }
  }

  // If FAQ has a strong match (score >= 4)
  if (bestFaq && maxFaqScore >= 4 && maxFaqScore >= maxServiceScore) {
    const relatedService = bestFaq.related_service_id
      ? servicesList.find((s) => s.id === bestFaq.related_service_id)
      : null

    const actions: ActionLink[] = [
      buildWhatsAppAction(
        `Hello, I have a question regarding ${bestFaq.question_en}`,
        `আসসালামু আলাইকুম, ${bestFaq.question_bn} বিষয়ে জানতে চাই।`
      )
    ]

    if (relatedService) {
      actions.push({
        label_en: `View ${relatedService.name_en}`,
        label_bn: `${relatedService.name_bn} দেখুন`,
        url: relatedService.official_url,
        isExternal: true,
        type: "service"
      })
    }

    return {
      title_en: bestFaq.question_en,
      title_bn: bestFaq.question_bn,
      text_en: bestFaq.answer_en,
      text_bn: bestFaq.answer_bn,
      confidence: Math.min(95, Math.round(maxFaqScore * 10)),
      matchedCategory: "FAQ",
      actions,
      suggestedQuestions: [
        { en: "What is your USD rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
        { en: "Minimum advertising budget", bn: "সর্বনিম্ন বাজেট কত?" },
        { en: "Where is your office?", bn: "আপনাদের অফিস কোথায়?" }
      ]
    }
  }

  // If Service has a strong match (score >= 3.5)
  if (bestService && maxServiceScore >= 3.5) {
    const deliverablesEn = bestService.deliverables.map((d) => `• ${d}`).join("\n")
    const deliverablesBn = bestService.deliverables.map((d) => `• ${d}`).join("\n")

    return {
      title_en: bestService.name_en,
      title_bn: bestService.name_bn,
      text_en: `**${bestService.name_en}**\n_${bestService.category}_\n\n${bestService.description_en}\n\n💰 **Starting Price / Rate:** ${bestService.starting_price}\n\n📋 **What's Included:**\n${deliverablesEn}\n\n⚙️ **Prerequisites:** ${bestService.prerequisites}`,
      text_bn: `**${bestService.name_bn}**\n_${bestService.category}_\n\n${bestService.description_bn}\n\n💰 **শুরু মূল্য / রেট:** ${bestService.starting_price}\n\n📋 **সেবাসমূহ:**\n${deliverablesBn}\n\n⚙️ **প্রয়োজনীয়তা:** ${bestService.prerequisites}`,
      confidence: Math.min(95, Math.round(maxServiceScore * 12)),
      matchedCategory: bestService.category,
      actions: [
        buildWhatsAppAction(
          `Hi Boosting Agency BD, I want to inquire about ${bestService.name_en}`,
          `আসসালামু আলাইকুম, আমি ${bestService.name_bn} সার্ভিসটি সম্পর্কে আলোচনা করতে চাই।`
        ),
        {
          label_en: "Service Catalog Details",
          label_bn: "ক্যাটালগে বিস্তারিত দেখুন",
          url: bestService.official_url,
          isExternal: true,
          type: "service"
        }
      ],
      suggestedQuestions: [
        { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
        { en: "Minimum advertising budget", bn: "সর্বনিম্ন বাজেট কত?" }
      ]
    }
  }

  // 8. Fallback Response (Safe, helpful, zero hallucinations)
  return {
    title_en: "How can Boosting Agency BD help you?",
    title_bn: "বুস্টিং এজেন্সি বিডি কীভাবে সাহায্য করতে পারে?",
    text_en: `I couldn't find an exact match for your inquiry, but here is what our verified team can help you with:\n\n• **Meta Advertising:** Standard managed Meta ads at ৳145/USD, minimum $20 ($2/day) budget (~৳2,900).\n• **Dollar Top-up Only:** Dedicated account top-up at ৳135/USD.\n• **Analytics & Tracking:** Basic Pixel (৳500), Full CMS (৳3,000), Custom CAPI (৳5,000) - subject to verification.\n• **Creative & Branding:** Social media creative packages (15 static + 10 reels at ৳6,000).\n\nWould you like to connect directly with our human digital strategist on WhatsApp or call?`,
    text_bn: `আপনার প্রশ্নের সরাসরি উত্তর খুঁজে পাইনি, তবে আমাদের টিম যেসব বিষয়ে আপনাকে সাহায্য করতে প্রস্তুত:\n\n• **মেটা বিজ্ঞাপন:** স্ট্যান্ডার্ড ম্যানেজড মেটা অ্যাডস ১৪৫ টাকা/USD, সর্বনিম্ন $২০ ($২/দিন) বাজেট (২,৯০০ টাকা)।\n• **ডলার টপ-আপ অনলি:** নির্ধারিত একাউন্ট টপ-আপ ১৩৫ টাকা/USD রেটে।\n• **ট্র্যাকিং ও পিক্সেল:** বেসিক পিক্সেল (৫০০ টাকা), ফুল সিএমএস (৩,০০০ টাকা), কাস্টম ট্র্যাকিং (৫,০০০ টাকা) — যাচাইসাপেক্ষ।\n• **ক্রিয়েটিভ প্যাকেজ:** ১৫টি স্ট্যাটিক + ১০টি রিলস ভিডিও প্যাকেজ (৬,০০০ টাকা)।\n\nআপনি চাইলে এখনই আমাদের অফিসিয়াল হোয়াটসঅ্যাপে বা ফোনে সরাসরি কথা বলতে পারেন।`,
    confidence: 40,
    matchedCategory: "General Help",
    actions: [
      buildWhatsAppAction(
        `Hello Boosting Agency BD, I have a custom inquiry: "${query}"`,
        `আসসালামু আলাইকুম, আমি "${query}" বিষয়ে পরামর্শ করতে চাই।`
      ),
      buildPhoneAction()
    ],
    suggestedQuestions: [
      { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
      { en: "Minimum advertising budget", bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট কত?" },
      { en: "Where is your office located?", bn: "আপনাদের অফিস কোথায়?" }
    ]
  }
}
