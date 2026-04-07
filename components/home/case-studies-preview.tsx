"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, TrendingUp, Target, Zap, BarChart3, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

const caseStudies = [
  {
    title: "E-commerce Revenue Growth",
    titleBn: "ই-কমার্স রেভিনিউ বৃদ্ধি",
    client: "Fashion Retailer - StyleMart BD",
    clientBn: "ফ্যাশন রিটেইলার - স্টাইলমার্ট বিডি",
    description: "Transformed a struggling e-commerce store into a market leader with 450% revenue growth through strategic multi-channel advertising campaigns and conversion optimization.",
    descriptionBn: "কৌশলগত মাল্টি-চ্যানেল বিজ্ঞাপন ক্যাম্পেইন এবং কনভার্সন অপ্টিমাইজেশনের মাধ্যমে একটি সংগ্রামরত ই-কমার্স স্টোরকে ৪৫০% রেভিনিউ বৃদ্ধি সহ মার্কেট লিডারে রূপান্তরিত করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    results: [
      { label: "Revenue Increase", labelBn: "রেভিনিউ বৃদ্ধি", value: "+450%" },
      { label: "ROAS", labelBn: "রোয়াস", value: "5.2x" },
    ],
    category: "Paid Advertising",
    categoryBn: "পেইড বিজ্ঞাপন",
    strategy: {
      title: "Strategy",
      titleBn: "কৌশল",
      points: [
        "Conducted in-depth market analysis identifying 8 high-value customer segments based on purchase history, browsing behavior, and demographic data",
        "Developed a full-funnel advertising strategy targeting awareness, consideration, and conversion stages with tailored messaging for each segment",
        "Implemented dynamic product catalog ads with AI-powered personalization to show relevant products based on user preferences",
        "Created comprehensive A/B testing framework for ad creatives, copy, landing pages, and checkout flow optimization",
        "Built cross-platform remarketing sequences to recover abandoned carts with personalized incentives and urgency triggers"
      ],
      pointsBn: [
        "ক্রয় ইতিহাস, ব্রাউজিং আচরণ এবং ডেমোগ্রাফিক ডেটার উপর ভিত্তি করে ৮টি উচ্চ-মূল্য গ্রাহক সেগমেন্ট চিহ্নিত করে গভীর বাজার বিশ্লেষণ পরিচালনা করা হয়েছে",
        "প্রতিটি সেগমেন্টের জন্য উপযুক্ত মেসেজিং সহ সচেতনতা, বিবেচনা এবং কনভার্সন পর্যায় টার্গেট করে ফুল-ফানেল বিজ্ঞাপন কৌশল তৈরি করা হয়েছে",
        "ব্যবহারকারীর পছন্দের উপর ভিত্তি করে প্রাসঙ্গিক পণ্য দেখাতে AI-চালিত পার্সোনালাইজেশন সহ ডাইনামিক প্রোডাক্ট ক্যাটালগ বিজ্ঞাপন বাস্তবায়ন করা হয়েছে",
        "বিজ্ঞাপন ক্রিয়েটিভ, কপি, ল্যান্ডিং পেজ এবং চেকআউট ফ্লো অপ্টিমাইজেশনের জন্য ব্যাপক A/B টেস্টিং ফ্রেমওয়ার্ক তৈরি করা হয়েছে",
        "ব্যক্তিগতকৃত ইনসেন্টিভ এবং আর্জেন্সি ট্রিগার সহ পরিত্যক্ত কার্ট পুনরুদ্ধারের জন্য ক্রস-প্ল্যাটফর্ম রিমার্কেটিং সিকোয়েন্স তৈরি করা হয়েছে"
      ]
    },
    execution: {
      title: "Execution",
      titleBn: "বাস্তবায়ন",
      points: [
        "Launched 24 targeted Facebook and Instagram campaigns across 3 primary audience segments with custom creatives for each platform",
        "Implemented Google Shopping with enhanced product feeds and Performance Max campaigns with automated bidding strategies",
        "Created 75+ ad variations including video ads, carousel ads, and dynamic retargeting ads with professional product photography",
        "Set up comprehensive conversion tracking with Facebook Pixel, Google Analytics 4, and server-side tracking for accurate attribution",
        "Developed automated email sequences triggered by user behavior to complement ad campaigns and increase customer lifetime value"
      ],
      pointsBn: [
        "প্রতিটি প্ল্যাটফর্মের জন্য কাস্টম ক্রিয়েটিভ সহ ৩টি প্রাথমিক অডিয়েন্স সেগমেন্ট জুড়ে ২৪টি টার্গেটেড ফেসবুক এবং ইনস্টাগ্রাম ক্যাম্পেইন চালু করা হয়েছে",
        "অটোমেটেড বিডিং স্ট্র্যাটেজি সহ বর্ধিত প্রোডাক্ট ফিড এবং পারফরম্যান্স ম্যাক্স ক্যাম্পেইন সহ গুগল শপিং বাস্তবায়ন করা হয়েছে",
        "প্রফেশনাল প্রোডাক্ট ফটোগ্রাফি সহ ভিডিও বিজ্ঞাপন, ক্যারোসেল বিজ্ঞাপন এবং ডাইনামিক রিটার্গেটিং বিজ্ঞাপন সহ ৭৫+ বিজ্ঞাপন ভ্যারিয়েশন তৈরি করা হয়েছে",
        "সঠিক অ্যাট্রিবিউশনের জন্য ফেসবুক পিক্সেল, গুগল অ্যানালিটিক্স ৪ এবং সার্ভার-সাইড ট্র্যাকিং সহ ব্যাপক কনভার্সন ট্র্যাকিং সেট আপ করা হয়েছে",
        "বিজ্ঞাপন ক্যাম্পেইন পরিপূরক করতে এবং গ্রাহক লাইফটাইম ভ্যালু বাড়াতে ব্যবহারকারীর আচরণ দ্বারা ট্রিগার করা অটোমেটেড ইমেইল সিকোয়েন্স তৈরি করা হয়েছে"
      ]
    },
    detailedResults: {
      title: "Results Achieved",
      titleBn: "অর্জিত ফলাফল",
      metrics: [
        { label: "Revenue Growth", labelBn: "রেভিনিউ বৃদ্ধি", value: "+450%", description: "Year-over-year increase in total sales", descriptionBn: "মোট বিক্রিতে বছর-পর-বছর বৃদ্ধি" },
        { label: "Return on Ad Spend", labelBn: "বিজ্ঞাপন খরচে রিটার্ন", value: "5.2x", description: "Average ROAS across all campaigns", descriptionBn: "সব ক্যাম্পেইনে গড় রোয়াস" },
        { label: "Conversion Rate", labelBn: "কনভার্সন রেট", value: "+180%", description: "Website conversion improvement", descriptionBn: "ওয়েবসাইট কনভার্সন উন্নতি" },
        { label: "Customer Acquisition Cost", labelBn: "কাস্টমার অধিগ্রহণ খরচ", value: "-40%", description: "Reduction in cost per customer", descriptionBn: "প্রতি গ্রাহকে খরচ হ্রাস" }
      ]
    }
  },
  {
    title: "SaaS Lead Generation",
    titleBn: "SaaS লিড জেনারেশন",
    client: "Tech Startup - CloudSync Pro",
    clientBn: "টেক স্টার্টআপ - ক্লাউডসিঙ্ক প্রো",
    description: "Built a scalable lead generation engine that delivers 2,000+ qualified leads monthly through integrated multi-channel digital marketing and marketing automation.",
    descriptionBn: "সমন্বিত মাল্টি-চ্যানেল ডিজিটাল মার্কেটিং এবং মার্কেটিং অটোমেশনের মাধ্যমে মাসিক ২,০০০+ কোয়ালিফাইড লিড সরবরাহকারী একটি স্কেলেবল লিড জেনারেশন ইঞ্জিন তৈরি করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    results: [
      { label: "Leads/Month", labelBn: "লিড/মাস", value: "2,000+" },
      { label: "Cost Per Lead", labelBn: "প্রতি লিড খরচ", value: "-65%" },
    ],
    category: "Lead Generation",
    categoryBn: "লিড জেনারেশন",
    strategy: {
      title: "Strategy",
      titleBn: "কৌশল",
      points: [
        "Developed comprehensive buyer personas based on interviews with existing customers and market research to identify ideal customer profiles",
        "Created multi-channel lead generation strategy spanning LinkedIn Ads, Google Search, Facebook Lead Ads, and content syndication networks",
        "Designed content marketing funnel with gated whitepapers, webinars, case studies, and free tool offerings to capture leads at different stages",
        "Implemented lead scoring system based on engagement, demographics, and firmographics to prioritize high-quality prospects for sales team",
        "Built account-based marketing campaigns targeting enterprise prospects with personalized outreach and custom landing pages"
      ],
      pointsBn: [
        "আদর্শ গ্রাহক প্রোফাইল চিহ্নিত করতে বিদ্যমান গ্রাহকদের সাথে সাক্ষাৎকার এবং বাজার গবেষণার উপর ভিত্তি করে ব্যাপক ক্রেতা পার্সোনা তৈরি করা হয়েছে",
        "লিংকডইন বিজ্ঞাপন, গুগল সার্চ, ফেসবুক লিড বিজ্ঞাপন এবং কন্টেন্ট সিন্ডিকেশন নেটওয়ার্ক বিস্তৃত মাল্টি-চ্যানেল লিড জেনারেশন কৌশল তৈরি করা হয়েছে",
        "বিভিন্ন পর্যায়ে লিড ক্যাপচার করতে গেটেড হোয়াইটপেপার, ওয়েবিনার, কেস স্টাডি এবং বিনামূল্যে টুল অফারিং সহ কন্টেন্ট মার্কেটিং ফানেল ডিজাইন করা হয়েছে",
        "সেলস টিমের জন্য উচ্চ-মানের প্রসপেক্টদের অগ্রাধিকার দিতে এনগেজমেন্ট, ডেমোগ্রাফিক্স এবং ফার্মোগ্রাফিক্সের উপর ভিত্তি করে লিড স্কোরিং সিস্টেম বাস্তবায়ন করা হয়েছে",
        "ব্যক্তিগতকৃত আউটরিচ এবং কাস্টম ল্যান্ডিং পেজ সহ এন্টারপ্রাইজ প্রসপেক্ট টার্গেট করে অ্যাকাউন্ট-ভিত্তিক মার্কেটিং ক্যাম্পেইন তৈরি করা হয়েছে"
      ]
    },
    execution: {
      title: "Execution",
      titleBn: "বাস্তবায়ন",
      points: [
        "Built 15 custom landing pages optimized for each traffic source with unique value propositions and conversion-focused copy",
        "Implemented HubSpot marketing automation with 8 email nurture sequences based on lead behavior and engagement patterns",
        "Created 12 high-value lead magnets including industry reports, ROI calculators, comparison guides, and exclusive webinars",
        "Set up sophisticated retargeting sequences across platforms targeting different funnel stages with appropriate messaging",
        "Developed real-time lead routing and notification system to ensure immediate follow-up by sales representatives"
      ],
      pointsBn: [
        "অনন্য মূল্য প্রস্তাব এবং কনভার্সন-ফোকাসড কপি সহ প্রতিটি ট্রাফিক সোর্সের জন্য অপ্টিমাইজড ১৫টি কাস্টম ল্যান্ডিং পেজ তৈরি করা হয়েছে",
        "লিড আচরণ এবং এনগেজমেন্ট প্যাটার্নের উপর ভিত্তি করে ৮টি ইমেইল নার্চার সিকোয়েন্স সহ হাবস্পট মার্কেটিং অটোমেশন বাস্তবায়ন করা হয়েছে",
        "ইন্ডাস্ট্রি রিপোর্ট, ROI ক্যালকুলেটর, তুলনা গাইড এবং একচেটিয়া ওয়েবিনার সহ ১২টি উচ্চ-মূল্য লিড ম্যাগনেট তৈরি করা হয়েছে",
        "উপযুক্ত মেসেজিং সহ বিভিন্ন ফানেল স্টেজ টার্গেট করে প্ল্যাটফর্ম জুড়ে সফিস্টিকেটেড রিটার্গেটিং সিকোয়েন্স সেট আপ করা হয়েছে",
        "সেলস রিপ্রেজেন্টেটিভদের দ্বারা তাৎক্ষণিক ফলো-আপ নিশ্চিত করতে রিয়েল-টাইম লিড রাউটিং এবং নোটিফিকেশন সিস্টেম তৈরি করা হয়েছে"
      ]
    },
    detailedResults: {
      title: "Results Achieved",
      titleBn: "অর্জিত ফলাফল",
      metrics: [
        { label: "Monthly Qualified Leads", labelBn: "মাসিক কোয়ালিফাইড লিড", value: "2,000+", description: "Consistent high-quality lead flow", descriptionBn: "ধারাবাহিক উচ্চ-মানের লিড প্রবাহ" },
        { label: "Cost Per Lead", labelBn: "প্রতি লিড খরচ", value: "-65%", description: "Reduction from initial baseline", descriptionBn: "প্রাথমিক বেসলাইন থেকে হ্রাস" },
        { label: "Lead to SQL Rate", labelBn: "লিড থেকে SQL রেট", value: "35%", description: "High-quality sales qualified leads", descriptionBn: "উচ্চ-মানের সেলস কোয়ালিফাইড লিড" },
        { label: "Pipeline Value", labelBn: "পাইপলাইন ভ্যালু", value: "$2.5M", description: "Monthly sales pipeline generated", descriptionBn: "মাসিক সেলস পাইপলাইন জেনারেটেড" }
      ]
    }
  },
  {
    title: "Local Business SEO Domination",
    titleBn: "লোকাল বিজনেস SEO আধিপত্য",
    client: "Restaurant Chain - Taste of Bengal",
    clientBn: "রেস্টুরেন্ট চেইন - টেস্ট অফ বেঙ্গল",
    description: "Established complete local search dominance across 15 locations, achieving top 3 rankings for 50+ local keywords and driving 200% increase in foot traffic.",
    descriptionBn: "১৫টি লোকেশন জুড়ে সম্পূর্ণ লোকাল সার্চ আধিপত্য প্রতিষ্ঠা করা হয়েছে, ৫০+ লোকাল কীওয়ার্ডে টপ ৩ র‌্যাংকিং অর্জন এবং ফুট ট্রাফিক ২০০% বৃদ্ধি করা হয়েছে।",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    results: [
      { label: "Keyword Rankings", labelBn: "কীওয়ার্ড র‌্যাংকিং", value: "Top 3" },
      { label: "Foot Traffic", labelBn: "ফুট ট্রাফিক", value: "+200%" },
    ],
    category: "SEO",
    categoryBn: "এসইও",
    strategy: {
      title: "Strategy",
      titleBn: "কৌশল",
      points: [
        "Conducted comprehensive local SEO audit identifying technical issues, citation inconsistencies, and competitive gaps across all 15 locations",
        "Developed location-specific keyword strategy targeting high-intent local searches like 'best restaurant near me' and cuisine-specific terms",
        "Created systematic Google Business Profile optimization plan including category optimization, attribute management, and regular posting schedule",
        "Built comprehensive review generation and management strategy to improve ratings and increase review volume across all platforms",
        "Implemented local link building campaign targeting community websites, local news outlets, food bloggers, and business directories"
      ],
      pointsBn: [
        "সব ১৫টি লোকেশন জুড়ে প্রযুক্তিগত সমস্যা, সাইটেশন অসঙ্গতি এবং প্রতিযোগিতামূলক ফাঁক চিহ্নিত করে ব্যাপক লোকাল SEO অডিট পরিচালনা করা হয়েছে",
        "'আমার কাছে সেরা রেস্টুরেন্ট' এবং কুইজিন-স্পেসিফিক টার্ম যেমন উচ্চ-ইনটেন্ট লোকাল সার্চ টার্গেট করে লোকেশন-স্পেসিফিক কীওয়ার্ড কৌশল তৈরি করা হয়েছে",
        "ক্যাটেগরি অপ্টিমাইজেশন, অ্যাট্রিবিউট ম্যানেজমেন্ট এবং নিয়মিত পোস্টিং শিডিউল সহ সিস্টেমেটিক গুগল বিজনেস প্রোফাইল অপ্টিমাইজেশন প্ল্যান তৈরি করা হয়েছে",
        "সব প্ল্যাটফর্ম জুড়ে রেটিং উন্নত করতে এবং রিভিউ ভলিউম বাড়াতে ব্যাপক রিভিউ জেনারেশন এবং ম্যানেজমেন্ট কৌশল তৈরি করা হয়েছে",
        "কমিউনিটি ওয়েবসাইট, লোকাল নিউজ আউটলেট, ফুড ব্লগার এবং বিজনেস ডিরেক্টরি টার্গেট করে লোকাল লিংক বিল্ডিং ক্যাম্পেইন বাস্তবায়ন করা হয়েছে"
      ]
    },
    execution: {
      title: "Execution",
      titleBn: "বাস্তবায়ন",
      points: [
        "Optimized all 15 Google Business Profiles with professional photos, complete attribute information, and weekly Google Posts featuring specials and events",
        "Created 50+ location-specific landing pages with unique content, local keywords, customer testimonials, and embedded maps",
        "Implemented comprehensive schema markup including LocalBusiness, Restaurant, Menu, and Review schemas for enhanced search visibility",
        "Built 200+ high-quality local citations ensuring NAP consistency across directories, review platforms, and social media profiles",
        "Developed automated review request system via SMS and email with personalized follow-ups to increase review generation by 400%"
      ],
      pointsBn: [
        "স্পেশাল এবং ইভেন্ট ফিচার করে প্রফেশনাল ফটো, সম্পূর্ণ অ্যাট্রিবিউট তথ্য এবং সাপ্তাহিক গুগল পোস্ট সহ সব ১৫টি গুগল বিজনেস প্রোফাইল অপ্টিমাইজ করা হয়েছে",
        "অনন্য কন্টেন্ট, লোকাল কীওয়ার্ড, গ্রাহক প্রশংসাপত্র এবং এম্বেডেড ম্যাপ সহ ৫০+ লোকেশন-স্পেসিফিক ল্যান্ডিং পেজ তৈরি করা হয়েছে",
        "উন্নত সার্চ ভিজিবিলিটির জন্য LocalBusiness, Restaurant, Menu এবং Review স্কিমা সহ ব্যাপক স্কিমা মার্কআপ বাস্তবায়ন করা হয়েছে",
        "ডিরেক্টরি, রিভিউ প্ল্যাটফর্ম এবং সোশ্যাল মিডিয়া প্রোফাইল জুড়ে NAP কনসিস্টেন্সি নিশ্চিত করে ২০০+ উচ্চ-মানের লোকাল সাইটেশন তৈরি করা হয়েছে",
        "রিভিউ জেনারেশন ৪০০% বাড়াতে ব্যক্তিগতকৃত ফলো-আপ সহ SMS এবং ইমেইলের মাধ্যমে অটোমেটেড রিভিউ রিকোয়েস্ট সিস্টেম তৈরি করা হয়েছে"
      ]
    },
    detailedResults: {
      title: "Results Achieved",
      titleBn: "অর্জিত ফলাফল",
      metrics: [
        { label: "Keyword Rankings", labelBn: "কীওয়ার্ড র‌্যাংকিং", value: "50+ Top 3", description: "Local keywords in top positions", descriptionBn: "শীর্ষ অবস্থানে লোকাল কীওয়ার্ড" },
        { label: "Foot Traffic", labelBn: "ফুট ট্রাফিক", value: "+200%", description: "Increase in store visits", descriptionBn: "স্টোর ভিজিটে বৃদ্ধি" },
        { label: "Online Orders", labelBn: "অনলাইন অর্ডার", value: "+320%", description: "Increase in digital orders", descriptionBn: "ডিজিটাল অর্ডারে বৃদ্ধি" },
        { label: "Google Reviews", labelBn: "গুগল রিভিউ", value: "4.8★", description: "Average rating across all locations", descriptionBn: "সব লোকেশনে গড় রেটিং" }
      ]
    }
  },
]

export function CaseStudiesPreview() {
  const [selectedStudy, setSelectedStudy] = useState<typeof caseStudies[0] | null>(null)
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  return (
    <>
      <section className="py-24 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("caseStudies")}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {t("ourSuccessStories")}
              </h2>
            </div>
            <Button variant="outline" asChild className="group hover:shadow-lg transition-all duration-300">
              <a href="/portfolio">
                {t("viewAllProjects")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </ScrollReveal>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {caseStudies.map((study, index) => (
              <motion.button
                key={study.title}
                variants={fadeInUp}
                onClick={() => setSelectedStudy(study)}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 text-left"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                </div>
                <div className="aspect-[3/2] overflow-hidden relative">
                  <Image
                    src={study.image}
                    alt={isEnglish ? study.title : study.titleBn}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground">
                      {isEnglish ? study.category : study.categoryBn}
                    </span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <p className="text-sm text-muted-foreground mb-2">{isEnglish ? study.client : study.clientBn}</p>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {isEnglish ? study.title : study.titleBn}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                    {isEnglish ? study.description : study.descriptionBn}
                  </p>
                  <div className="mt-4 flex gap-6">
                    {study.results.map((result) => (
                      <div key={result.label}>
                        <p className="text-2xl font-bold text-primary flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {result.value}
                        </p>
                        <p className="text-xs text-muted-foreground">{isEnglish ? result.label : result.labelBn}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    {t("viewDetails")}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedStudy && (
            <>
              {/* Hero Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={selectedStudy.image}
                  alt={isEnglish ? selectedStudy.title : selectedStudy.titleBn}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center rounded-full gradient-primary text-white px-4 py-1.5 text-sm font-medium mb-3">
                    {isEnglish ? selectedStudy.category : selectedStudy.categoryBn}
                  </span>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-foreground">
                      {isEnglish ? selectedStudy.title : selectedStudy.titleBn}
                    </DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                      {isEnglish ? selectedStudy.client : selectedStudy.clientBn}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 lg:p-8">
                {/* Overview */}
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {isEnglish ? selectedStudy.description : selectedStudy.descriptionBn}
                </p>

                {/* Strategy & Execution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Strategy */}
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg gradient-primary text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {isEnglish ? selectedStudy.strategy.title : selectedStudy.strategy.titleBn}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {(isEnglish ? selectedStudy.strategy.points : selectedStudy.strategy.pointsBn).map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Execution */}
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg gradient-primary text-white">
                        <Zap className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {isEnglish ? selectedStudy.execution.title : selectedStudy.execution.titleBn}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {(isEnglish ? selectedStudy.execution.points : selectedStudy.execution.pointsBn).map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg gradient-primary text-white">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {isEnglish ? selectedStudy.detailedResults.title : selectedStudy.detailedResults.titleBn}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedStudy.detailedResults.metrics.map((metric) => (
                      <div key={metric.label} className="bg-background rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                        <p className="text-sm font-medium text-foreground">{isEnglish ? metric.label : metric.labelBn}</p>
                        <p className="text-xs text-muted-foreground mt-1">{isEnglish ? metric.description : metric.descriptionBn}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gradient-primary text-white" asChild>
                    <a href="/contact">{t("getFreeConsultation")}</a>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedStudy(null)}>
                    {t("close")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
