import { queryKnowledgeBase } from "./search-matcher"
import { ChatMessage, SearchAnswer, ConversationContext } from "./types"
import {
  classifyAndResolveMessage,
  recordConversationTurn,
  createInitialContext
} from "./conversation-manager"

export function getInitialGreeting(lang: "en" | "bn" = "bn"): ChatMessage {
  const isEn = lang === "en"
  return {
    id: "welcome-msg",
    sender: "assistant",
    text: isEn
      ? "👋 Welcome to **Boosting Agency BD**! I am your automated Smart FAQ assistant. Ask me anything about our advertising USD rates (৳145/USD), minimum budgets ($20 / $2/day), Meta & Google Ads, Pixel/CAPI tracking, policies, or office location."
      : "👋 **বুস্টিং এজেন্সি বিডি**-তে স্বাগতম! আমি আপনার স্বয়ংক্রিয় স্মার্ট FAQ সহায়ক। বিজ্ঞাপনের ডলার রেট (১৪৫ টাকা/USD), সর্বনিম্ন বাজেট ($২০ / ২,৯০০ টাকা), মেটা ও গুগল বিজ্ঞাপন, পিক্সেল ট্র্যাকিং, রিফান্ড পলিসি বা অফিস সম্পর্কে যেকোনো প্রশ্ন করতে পারেন।",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    suggestedQuestions: [
      { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
      { en: "What is the minimum ad budget?", bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট কত?" },
      { en: "What Meta Ads service options do you offer?", bn: "মেটা বিজ্ঞাপনের সার্ভিস অপশন কী কী?" },
      { en: "Where is your office located?", bn: "আপনাদের অফিস কোথায়?" }
    ]
  }
}

/**
 * Context-aware retrieval engine that maintains conversational memory and detects topic switching.
 */
export function processUserQuery(
  userQuery: string,
  currentLang: "en" | "bn" = "bn",
  context?: ConversationContext
): { message: ChatMessage; answer: SearchAnswer; updatedContext: ConversationContext } {
  const activeCtx = context || createInitialContext()
  const isEn = currentLang === "en"

  // 1. Classify message intent relative to conversation context & detect topic changes
  const {
    classification,
    detectedTopic,
    activeTopic,
    resolvedQuery,
    clarificationNeeded
  } = classifyAndResolveMessage(userQuery, activeCtx)

  // 2. Handle ambiguous query when no context exists
  if (clarificationNeeded) {
    const clarificationAnswer: SearchAnswer = {
      title_en: "Which service would you like to inquire about?",
      title_bn: "আপনি কোন সার্ভিস বা বাজেট সম্পর্কে জানতে চান?",
      text_en: "Could you please specify which service or pricing details you are inquiring about?\n\n• **Meta Advertising:** Managed ads at ৳145/USD (Minimum $20 budget = ৳2,900).\n• **Dollar Top-up Only:** Account funding at ৳135/USD.\n• **Tracking & Pixel:** Setup starting from ৳500 to ৳5,000.\n• **Office & Contact:** Mirpur-2, Dhaka (WhatsApp: 01518961899).",
      text_bn: "দয়া করে নির্দিষ্ট করে জানান আপনি কোন সার্ভিস বা খরচের বিবরণ জানতে চাচ্ছেন?\n\n• **মেটা বিজ্ঞাপন:** ম্যানেজড অ্যাডস প্রতি ডলার ১৪৫ টাকা (সর্বনিম্ন $২০ বা ২,৯০০ টাকা বাজেট)।\n• **ডলার টপ-আপ অনলি:** একাউন্ট ব্যালেন্স প্রতি ডলার ১৩৫ টাকা।\n• **পিক্সেল ও ট্র্যাকিং:** সেটআপ ৫০০ থেকে ৫,০০০ টাকা (যাচাইসাপেক্ষ)।\n• **অফিস ও যোগাযোগ:** মিরপুর-২, ঢাকা (হোয়াটসঅ্যাপ: ০১৫১৮৯৬১৮৯৯)।",
      confidence: 100,
      matchedCategory: "Clarification",
      actions: [
        {
          label_en: "WhatsApp Consultation",
          label_bn: "হোয়াটসঅ্যাপে পরামর্শ",
          url: "https://wa.me/8801518961899?text=" + encodeURIComponent("Hello Boosting Agency BD, I want to learn more about your services."),
          isExternal: true,
          type: "whatsapp"
        }
      ],
      suggestedQuestions: [
        { en: "What is your USD dollar rate?", bn: "বিজ্ঞাপনের ডলার রেট কত?" },
        { en: "What is the minimum ad budget?", bn: "সর্বনিম্ন বিজ্ঞাপনের বাজেট কত?" },
        { en: "Pixel and tracking setup cost", bn: "পিক্সেল সেটআপের খরচ কত?" },
        { en: "Where is your office located?", bn: "আপনাদের অফিস কোথায়?" }
      ]
    }

    const message: ChatMessage = {
      id: `assistant-${Date.now()}`,
      sender: "assistant",
      text: isEn ? clarificationAnswer.text_en : clarificationAnswer.text_bn,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: clarificationAnswer.actions,
      suggestedQuestions: clarificationAnswer.suggestedQuestions,
      topic: undefined,
      classification: "ambiguous"
    }

    const updatedContext = recordConversationTurn(
      activeCtx,
      userQuery,
      message.text,
      undefined,
      "Clarification"
    )

    return { message, answer: clarificationAnswer, updatedContext }
  }

  // 3. Query the knowledge base using the resolved contextual query
  const answer: SearchAnswer = queryKnowledgeBase(resolvedQuery, currentLang)

  const message: ChatMessage = {
    id: `assistant-${Date.now()}`,
    sender: "assistant",
    text: isEn ? answer.text_en : answer.text_bn,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    actions: answer.actions,
    suggestedQuestions: answer.suggestedQuestions,
    topic: activeTopic || undefined,
    classification
  }

  // 4. Update and persist conversational history
  const updatedContext = recordConversationTurn(
    activeCtx,
    userQuery,
    message.text,
    activeTopic || undefined,
    answer.matchedCategory
  )

  return { message, answer, updatedContext }
}

/**
 * Async helper if needed
 */
export async function getAssistantResponse(
  userQuery: string,
  currentLang: "en" | "bn" = "bn",
  context?: ConversationContext
): Promise<{ message: ChatMessage; updatedContext: ConversationContext }> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  const { message, updatedContext } = processUserQuery(userQuery, currentLang, context)
  return { message, updatedContext }
}
