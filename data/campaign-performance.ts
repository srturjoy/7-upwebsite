/**
 * Campaign Performance Data Structure for Boosting Agency BD
 * 
 * Only real uploaded Meta Ads Manager screenshots are stored and displayed.
 * No demo text or simulated case studies.
 */

export type CampaignCategory = "message_leads" | "website_purchases"

export interface CampaignCaseStudy {
  id: string
  title?: string
  category: CampaignCategory
  screenshotUrl: string
  createdAt?: string
}

export const CAMPAIGN_CATEGORIES: { id: CampaignCategory; label: string; labelBn: string; countDescription: string; countDescriptionBn: string }[] = [
  {
    id: "message_leads",
    label: "Message Lead Campaigns",
    labelBn: "মেসেজ লিড ক্যাম্পেইন",
    countDescription: "Real Meta Ads Manager screenshots for Messenger & WhatsApp campaigns",
    countDescriptionBn: "মেসেঞ্জার ও হোয়াটসঅ্যাপ ক্যাম্পেইনের আসল মেটা অ্যাডস ম্যানেজার স্ক্রিনশট",
  },
  {
    id: "website_purchases",
    label: "Website Purchase Campaigns",
    labelBn: "ওয়েবসাইট পারচেজ ক্যাম্পেইন",
    countDescription: "Real Meta Ads Manager screenshots for Website Purchases & E-Commerce sales",
    countDescriptionBn: "ওয়েবসাইট পারচেজ ও ই-কমার্স ক্যাম্পেইনের আসল মেটা অ্যাডস ম্যানেজার স্ক্রিনশট",
  },
]

// Zero dummy/demo case studies - only real uploaded screenshots will be displayed
export const CAMPAIGN_CASE_STUDIES: CampaignCaseStudy[] = []
