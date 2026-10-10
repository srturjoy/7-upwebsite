import {
  TopicCategory,
  MessageClassification,
  ConversationContext,
  ConversationTurn
} from "./types"
import { normalizeEnglish, normalizeBengali, tokenize } from "./text-normalizer"
import { expandQueryTokens } from "./banglish-map"

/**
 * Keywords and patterns identifying specific primary topics
 */
interface TopicDefinition {
  category: TopicCategory
  strongKeywords: string[]
  aliases: string[]
}

const TOPIC_DEFINITIONS: TopicDefinition[] = [
  {
    category: "contact_and_office",
    strongKeywords: ["ঠিকানা", "অফিস", "কোথায়", "মিরপুর", "লোকেশন", "রূপনগর", "দেখা করব", "যোগাযোগ", "ফোন", "নাম্বার", "খোলা", "কখন খোলা", "কাজের সময়"],
    aliases: ["office", "thikana", "address", "location", "mirpur", "rupnagor", "phone", "number", "contact", "dekha", "kothai", "open", "hours", "office time", "timing"]
  },
  {
    category: "budget_and_rates",
    strongKeywords: ["ডলার রেট", "ডলারের দাম", "ডলার", "সর্বনিম্ন বাজেট", "বাজেট", "১৪৫", "১৩৫", "১৫৫", "২৯০০", "২৯০", "দৈনিক বাজেট"],
    aliases: ["dollar rate", "usd rate", "dollar dam", "exchange rate", "145", "135", "155", "minimum budget", "20 dollar", "2 dollar", "2900", "290", "daily budget", "budget koto"]
  },
  {
    category: "meta_ads",
    strongKeywords: ["মেটা", "ফেসবুক বিজ্ঞাপন", "বুস্টিং", "বুস্ট", "পেজ বুস্ট", "ক্যাম্পেইন", "ম্যানেজড", "স্পনসর্ড"],
    aliases: ["meta ads", "facebook ads", "fb boost", "page boost", "boosting", "fb ad", "managed ads", "boost kora"]
  },
  {
    category: "google_ads",
    strongKeywords: ["গুগল", "গুগল বিজ্ঞাপন", "ইউটিউব", "সার্চ অ্যাডস"],
    aliases: ["google ads", "google", "youtube ads", "ppc", "search ads", "yt ads"]
  },
  {
    category: "tracking_analytics",
    strongKeywords: ["পিক্সেল", "ট্র্যাকিং", "সার্ভার সাইড", "কনভার্সন এপিআই"],
    aliases: ["pixel", "capi", "server side", "gtm", "tracking", "ios 14", "analytics", "tag manager"]
  },
  {
    category: "creative_design",
    strongKeywords: ["ক্রিয়েটিভ", "রিলস", "ভিডিও", "ব্যানার", "পোস্টার", "গ্রাফিক"],
    aliases: ["creative", "reels", "video", "banner", "static creative", "graphic design", "content"]
  },
  {
    category: "web_design",
    strongKeywords: ["ওয়েবসাইট", "ওয়েব ডিজাইন", "ল্যান্ডিং পেজ"],
    aliases: ["website", "web design", "landing page", "ecommerce", "site"]
  },
  {
    category: "payment_and_billing",
    strongKeywords: ["বিকাশ", "নগদ", "রকেট", "ব্যাংক", "পেমেন্ট", "কার্ড", "টাকা দিব", "অগ্রিম"],
    aliases: ["bkash", "nagad", "rocket", "bank", "payment", "card", "advance", "prepaid", "taka dibo"]
  },
  {
    category: "refund_and_balance",
    strongKeywords: ["রিফান্ড", "টাকা ফেরত", "বাতিল", "ব্যালেন্স ফেরত", "বন্ধ করলে"],
    aliases: ["refund", "ferot", "taka ferot", "money back", "cancel", "unspent", "balance ferot"]
  },
  {
    category: "onboarding_process",
    strongKeywords: ["কীভাবে শুরু", "কাজের প্রক্রিয়া", "কখন চালু হবে", "কবে শুরু হবে", "শুরু করতে কি"],
    aliases: ["how to start", "onboarding", "process", "kemne shuru", "kobe chalu", "launch time", "start kobe"]
  },
  {
    category: "guarantee_sales",
    strongKeywords: ["বিক্রির গ্যারান্টি", "গ্যারান্টি", "সেল আসবে", "লাভ হবে"],
    aliases: ["guarantee", "sales guarantee", "order ashbe", "result guarantee"]
  }
]

/**
 * Indicators that the user query is a follow-up or subtopic inquiry
 */
const FOLLOW_UP_PATTERNS = [
  /প্রতিদিন\s*কত/i,
  /দৈনিক\s*কত/i,
  /daily\s*(koto|budget|rate)?/i,
  /per\s*day/i,
  /minimum\s*(koto|budget)?/i,
  /কতদিন\s*চলবে/i,
  /koto\s*din\s*cholbe/i,
  /১০\s*দিন/i,
  /10\s*days?/i,
  /বাজেট\s*কত/i,
  /টাকা\s*কত/i,
  /খরচ\s*কত/i,
  /দাম\s*কত/i,
  /koto\s*taka/i,
  /khoroch\s*koto/i,
  /dam\s*koto/i,
  /কী\s*কী\s*লাগবে/i,
  /কি\s*কি\s*লাগবে/i,
  /ki\s*ki\s*lagbe/i,
  /কীভাবে\s*করব/i,
  /kivabe\s*korbo/i,
  /kemne\s*korbo/i,
  /তাহলে/i,
  /আর\s*কী/i,
  /আর\s*কি/i,
  /ar\s*ki/i,
  /তাহলে\s*কী/i,
  /সেটা\s*কীভাবে/i,
  /সেটা\s*কিভাবে/i,
  /এটাতে\s*কী/i,
  /eta\s*te\s*ki/i,
  /how\s*much/i,
  /what\s*about/i,
  /how\s*long/i,
  /when\s*starts?/i,
  /কখন\s*শুরু\s*হবে/i,
  /kobe\s*start/i,
  /খোলা/i,
  /open/i,
  /hours/i,
  /timing/i,
  /কখন\s*খোলা/i,
  /সময়/i
]

/**
 * Ambiguous single-word or ultra-short queries without context
 */
const AMBIGUOUS_WORDS = new Set([
  "কত", "খরচ", "দাম", "টাকা", "বাজেট", "সার্ভিস", "প্যাকেজ",
  "koto", "dam", "khoroch", "price", "cost", "budget", "service", "package"
])

/**
 * Creates an empty initial conversation context
 */
export function createInitialContext(sessionId?: string): ConversationContext {
  return {
    sessionId: sessionId || `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    activeTopic: undefined,
    turns: []
  }
}

/**
 * Detects whether the query directly matches a distinct topic definition.
 */
export function detectQueryTopic(rawQuery: string): { topic: TopicCategory | null; confidence: number } {
  const normBn = normalizeBengali(rawQuery)
  const normEn = normalizeEnglish(rawQuery)
  const rawTokens = tokenize(rawQuery)
  const expandedTokens = expandQueryTokens(rawTokens)
  const tokenSet = new Set(expandedTokens)

  let bestTopic: TopicCategory | null = null
  let maxScore = 0

  for (const def of TOPIC_DEFINITIONS) {
    let score = 0

    // Strong keywords in Bengali / raw text (substring check has high weight)
    for (const kw of def.strongKeywords) {
      if (rawQuery.includes(kw) || normBn.includes(kw)) {
        score += 5
      }
    }

    // Strong aliases in English / Banglish
    for (const alias of def.aliases) {
      if (normEn.includes(alias.toLowerCase())) {
        score += 4
      }
      const aliasParts = alias.toLowerCase().split(/\s+/)
      if (aliasParts.length > 1 && aliasParts.every((p) => tokenSet.has(p))) {
        score += 3.5
      }
    }

    if (score > maxScore && score >= 3.5) {
      maxScore = score
      bestTopic = def.category
    }
  }

  return { topic: bestTopic, confidence: maxScore }
}

/**
 * Classifies an incoming message into follow_up, subtopic, new_topic, or ambiguous,
 * and produces a context-aware resolved query for knowledge retrieval.
 */
export function classifyAndResolveMessage(
  query: string,
  context?: ConversationContext
): {
  classification: MessageClassification
  detectedTopic: TopicCategory | null
  activeTopic: TopicCategory | null
  resolvedQuery: string
  clarificationNeeded: boolean
} {
  const trimmed = query.trim()
  const rawTokens = tokenize(trimmed)
  const activeTopic = context?.activeTopic || null

  const { topic: detectedTopic, confidence } = detectQueryTopic(trimmed)

  // Check if it matches ambiguous criteria (very short query with no explicit topic)
  const isAmbiguousQuery =
    (rawTokens.length <= 1 && AMBIGUOUS_WORDS.has(rawTokens[0]?.toLowerCase())) ||
    (rawTokens.length === 0)

  // 1. If it's ambiguous AND we have NO active topic -> Needs Clarification
  if (isAmbiguousQuery && !activeTopic) {
    return {
      classification: "ambiguous",
      detectedTopic: null,
      activeTopic: null,
      resolvedQuery: query,
      clarificationNeeded: true
    }
  }

  // 2. Clearly NEW TOPIC detection:
  // If the user mentions a specific topic that differs from current active topic
  if (detectedTopic && (!activeTopic || detectedTopic !== activeTopic)) {
    // If active topic was budget_and_rates and detectedTopic is meta_ads (or vice versa),
    // they are closely related subtopics unless the user asked specifically about an unrelated feature
    const isBudgetAndMetaCross =
      (activeTopic === "budget_and_rates" && detectedTopic === "meta_ads") ||
      (activeTopic === "meta_ads" && detectedTopic === "budget_and_rates")

    if (!isBudgetAndMetaCross) {
      return {
        classification: "new_topic",
        detectedTopic,
        activeTopic: detectedTopic,
        // CRITICAL: Clean new topic query - do NOT inject previous topic tokens!
        resolvedQuery: query,
        clarificationNeeded: false
      }
    }
  }

  // 3. FOLLOW-UP / CONTINUATION detection:
  // Check if the query has follow-up patterns or continuity indicators
  const hasFollowUpPattern = FOLLOW_UP_PATTERNS.some((pattern) => pattern.test(trimmed))

  if (activeTopic && (hasFollowUpPattern || isAmbiguousQuery || (!detectedTopic && rawTokens.length <= 4))) {
    // Enrich the query specifically using the active topic context
    let resolvedQuery = query

    if (activeTopic === "meta_ads" || activeTopic === "budget_and_rates") {
      if (
        /প্রতিদিন/i.test(trimmed) ||
        /দৈনিক/i.test(trimmed) ||
        /daily/i.test(trimmed) ||
        /per\s*day/i.test(trimmed)
      ) {
        resolvedQuery = `minimum daily advertising budget 2 dollar 290 taka 10 days প্রতিদিন কত দৈনিক বাজেট ${query}`
      } else if (/কখন|kobe|launch|start|শুরু/i.test(trimmed)) {
        resolvedQuery = `facebook meta ads campaign launch time 24 to 48 hours payment onboarding ${query}`
      } else if (/কীভাবে|kemne|kivabe|কি\s*কি\s*লাগবে|কী\s*কী\s*লাগবে/i.test(trimmed)) {
        resolvedQuery = `facebook meta ads onboarding requirements page access ad account budget ${query}`
      } else {
        resolvedQuery = `meta ads advertising budget dollar rate 145 taka ${query}`
      }
    } else if (activeTopic === "contact_and_office") {
      if (/কখন|সময়|open|time|খোলা|কয়টা/i.test(trimmed)) {
        resolvedQuery = `office hours 10 am to 8 pm mirpur 2 rupnagor contact time ${query}`
      } else {
        resolvedQuery = `office address mirpur rupnagor dhaka contact ${query}`
      }
    } else if (activeTopic === "tracking_analytics") {
      if (/খরচ|কত|দাম|cost|price/i.test(trimmed)) {
        resolvedQuery = `pixel tracking capi setup cost basic 500 cms 3000 custom 5000 ${query}`
      } else {
        resolvedQuery = `server side tracking pixel capi conversion api ${query}`
      }
    } else if (activeTopic === "payment_and_billing") {
      resolvedQuery = `payment methods bkash nagad bank advance prepaid ${query}`
    } else if (activeTopic === "refund_and_balance") {
      resolvedQuery = `unspent budget refund policy pause campaign balance ${query}`
    } else if (activeTopic === "creative_design") {
      resolvedQuery = `creative package 15 static 10 reels 6000 taka design ${query}`
    }

    return {
      classification: "follow_up",
      detectedTopic: activeTopic,
      activeTopic,
      resolvedQuery,
      clarificationNeeded: false
    }
  }

  // 4. If detectedTopic matches activeTopic, it's a subtopic / continuation
  if (detectedTopic && detectedTopic === activeTopic) {
    return {
      classification: "subtopic",
      detectedTopic,
      activeTopic,
      resolvedQuery: query,
      clarificationNeeded: false
    }
  }

  // 5. Default / standalone match
  const finalActiveTopic = detectedTopic || activeTopic || "general_help"
  return {
    classification: detectedTopic ? "new_topic" : "subtopic",
    detectedTopic,
    activeTopic: finalActiveTopic,
    resolvedQuery: query,
    clarificationNeeded: false
  }
}

/**
 * Updates context turns and active topic
 */
export function recordConversationTurn(
  context: ConversationContext,
  userText: string,
  botText: string,
  topic?: TopicCategory,
  categoryName?: string
): ConversationContext {
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  const userTurn: ConversationTurn = {
    id: `turn-u-${Date.now()}`,
    role: "user",
    text: userText,
    topic,
    timestamp: now
  }

  const botTurn: ConversationTurn = {
    id: `turn-b-${Date.now() + 1}`,
    role: "assistant",
    text: botText,
    topic,
    categoryName,
    timestamp: now
  }

  // Keep recent history (e.g. up to 20 turns)
  const updatedTurns = [...context.turns, userTurn, botTurn].slice(-20)

  return {
    ...context,
    activeTopic: topic || context.activeTopic,
    lastUserQuery: userText,
    lastBotAnswerCategory: categoryName,
    turns: updatedTurns
  }
}
