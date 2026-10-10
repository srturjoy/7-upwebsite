export interface ServiceItem {
  id: string
  name_en: string
  name_bn: string
  category: string
  description_en: string
  description_bn: string
  starting_price: string
  currency: string
  deliverables: string[]
  prerequisites: string
  keywords: string[]
  banglish_aliases: string[]
  official_url: string
}

export interface FaqItem {
  id: string
  question_en: string
  question_bn: string
  answer_en: string
  answer_bn: string
  keywords: string[]
  banglish_aliases: string[]
  related_service_id?: string | null
}

export interface PolicyItem {
  id: string
  title_en: string
  title_bn: string
  details_en: string
  details_bn: string
}

export interface PricingPackage {
  name_en: string
  name_bn: string
  price_bdt: string
  ideal_for_en: string
  ideal_for_bn: string
  features: string[]
}

export interface PricingData {
  currency: string
  dollar_rate_note_en: string
  dollar_rate_note_bn: string
  packages: PricingPackage[]
  ad_spend_recommendations: {
    minimum_daily_budget_meta: string
    recommended_monthly_ad_spend: string
    payment_methods: string[]
  }
}

export interface AgencyData {
  agency: {
    name: string
    tagline_en: string
    tagline_bn: string
    founded: string
    address_en: string
    address_bn: string
    phone: string
    whatsapp: string
    whatsapp_display: string
    email: string
    website: string
    service_catalog_url: string
    facebook: string
    business_hours_en: string
    business_hours_bn: string
    stats: Record<string, string>
    description_en: string
    description_bn: string
  }
}

export interface ContactData {
  business_name: string
  phone: string
  phone_raw: string
  whatsapp: string
  whatsapp_direct_number: string
  email: string
  address_en: string
  address_bn: string
  facebook_page: string
  website: string
  service_catalog: string
  hours_en: string
  hours_bn: string
}

export interface ActionLink {
  label_en: string
  label_bn: string
  url: string
  isExternal?: boolean
  type: "whatsapp" | "phone" | "service" | "link"
}

export interface SearchAnswer {
  title_en: string
  title_bn: string
  text_en: string
  text_bn: string
  confidence: number
  matchedCategory?: string
  actions?: ActionLink[]
  suggestedQuestions?: Array<{ en: string; bn: string }>
}

export interface ChatMessage {
  id: string
  sender: "user" | "assistant"
  text: string
  timestamp: string
  actions?: ActionLink[]
  suggestedQuestions?: Array<{ en: string; bn: string }>
  isSearching?: boolean
  topic?: TopicCategory
  classification?: MessageClassification
}

export type TopicCategory =
  | "budget_and_rates"
  | "meta_ads"
  | "google_ads"
  | "tracking_analytics"
  | "creative_design"
  | "web_design"
  | "payment_and_billing"
  | "refund_and_balance"
  | "onboarding_process"
  | "contact_and_office"
  | "pricing_packages"
  | "guarantee_sales"
  | "general_help"

export type MessageClassification = "follow_up" | "subtopic" | "new_topic" | "ambiguous"

export interface ConversationTurn {
  id: string
  role: "user" | "assistant"
  text: string
  topic?: TopicCategory
  categoryName?: string
  timestamp: string
}

export interface ConversationContext {
  sessionId: string
  activeTopic?: TopicCategory
  lastUserQuery?: string
  lastBotAnswerCategory?: string
  turns: ConversationTurn[]
}
