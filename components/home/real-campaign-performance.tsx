"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  MessageSquare,
  ShoppingCart,
  ShieldCheck,
  Maximize2,
  X,
  Layers,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Sparkles,
  ExternalLink,
  Loader2,
  ZoomIn,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { useBackHandler } from "@/lib/back-navigation"
import { CampaignCategory } from "@/data/campaign-performance"
import { StoredCampaignScreenshot, StoredCampaignMetric } from "@/lib/campaign-storage"

interface Props {
  className?: string
  id?: string
  showSectionHeader?: boolean
  initialCategory?: "all" | CampaignCategory
  isHomePage?: boolean
  seeMoreHref?: string
}

type TabType = "all" | CampaignCategory

export function RealCampaignPerformanceSection({
  className = "",
  id = "campaign-performance",
  showSectionHeader = true,
  initialCategory = "message_leads",
  isHomePage = false,
  seeMoreHref = "/services#campaign-performance",
}: Props) {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const [activeTab, setActiveTab] = useState<TabType>(initialCategory)
  const [selectedScreenshot, setSelectedScreenshot] = useState<StoredCampaignScreenshot | null>(null)
  const [lightboxZoom, setLightboxZoom] = useState(false)

  // Handle closing lightbox cleanly
  const handleCloseLightbox = useCallback(() => {
    setSelectedScreenshot(null)
    setLightboxZoom(false)
  }, [])

  // Intercept browser back button to close lightbox first
  const { safeClose } = useBackHandler(
    !!selectedScreenshot,
    handleCloseLightbox,
    "campaign-screenshot-lightbox"
  )

  // Real campaign screenshots loaded from backend API
  const [campaigns, setCampaigns] = useState<StoredCampaignScreenshot[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch verified campaign screenshots from persistent storage
  const fetchCampaigns = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/campaigns")
      if (res.ok) {
        const data = await res.json()
        if (data.success && Array.isArray(data.campaigns)) {
          setCampaigns(data.campaigns)
        }
      }
    } catch (err) {
      console.warn("Could not fetch campaign screenshots:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  // Filter items by category
  const filteredCampaigns = useMemo(() => {
    if (activeTab === "all") return campaigns
    return campaigns.filter((c) => c.category === activeTab)
  }, [activeTab, campaigns])

  // On home page: max 6 items on desktop (3 on mobile). Otherwise show all.
  const displayedCampaigns = useMemo(() => {
    if (isHomePage) {
      return filteredCampaigns.slice(0, 6)
    }
    return filteredCampaigns
  }, [isHomePage, filteredCampaigns])

  const totalCount = campaigns.length
  const leadCount = campaigns.filter((c) => c.category === "message_leads").length
  const purchaseCount = campaigns.filter((c) => c.category === "website_purchases").length

  // Helper to extract 3 standard metrics for card display
  const getMetricsList = (item: StoredCampaignScreenshot): StoredCampaignMetric[] => {
    if (Array.isArray(item.metrics)) {
      return item.metrics
    }
    if (item.metrics && typeof item.metrics === "object") {
      const list: StoredCampaignMetric[] = []
      if (item.metrics.results?.value) {
        list.push({
          label: "Results",
          labelBn: "ফলাফল",
          value: item.metrics.results.value,
          subtext: item.metrics.results.metricName || "Conversations / Purchases",
        })
      }
      if (item.metrics.costPerResult?.value) {
        list.push({
          label: "Cost / Result",
          labelBn: "প্রতি রেজাল্টে খরচ",
          value: item.metrics.costPerResult.value,
          subtext: item.metrics.costPerResult.subtext || "CPA",
        })
      }
      if (item.metrics.amountSpent?.value) {
        list.push({
          label: "Ad Spend",
          labelBn: "বাজেট স্পেন্ড",
          value: item.metrics.amountSpent.value,
          subtext: "Total Spend",
        })
      }
      if (Array.isArray(item.metrics.additionalMetrics)) {
        list.push(...item.metrics.additionalMetrics)
      }
      return list
    }
    return []
  }

  return (
    <section id={id} className={`relative py-16 lg:py-24 bg-background ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showSectionHeader && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-4 border border-cyan-500/25 shadow-xs">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {isEnglish
                  ? "100% Original Meta Ads Manager Verified Screenshots"
                  : "১০০% অরিজিনাল মেটা অ্যাডস ম্যানেজার ভেরিফায়েড স্ক্রিনশট"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground text-balance">
              {isEnglish ? "Real Campaign" : "বাস্তব ক্যাম্পেইন"}{" "}
              <span className="text-gradient">
                {isEnglish ? "Performance Case Studies" : "পারফরম্যান্স ও রেজাল্ট কেস স্টাডি"}
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {isEnglish
                ? "Browse authentic Meta Ads Manager screenshots from our live client campaigns in Bangladesh with verified conversation costs, sales conversions, and ROI metrics."
                : "আমাদের পরিচালিত লাইভ ক্লায়েন্ট ক্যাম্পেইনের আসল মেটা অ্যাডস ম্যানেজার স্ক্রিনশট এবং ভেরিফায়েড ডাটা—রেকর্ড সর্বনিম্ন খরচে মেসেঞ্জার লিড এবং ই-কমার্স সেলস কনভার্সন।"}
            </p>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-secondary/80 dark:bg-secondary/40 border border-border shadow-inner max-w-full overflow-x-auto scrollbar-none gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("message_leads")}
              className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === "message_leads"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{isEnglish ? "Message Lead Campaigns" : "মেসেজ লিড ক্যাম্পেইন"}</span>
              <span
                className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "message_leads" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {leadCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("website_purchases")}
              className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === "website_purchases"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isEnglish ? "Website Purchase Campaigns" : "ওয়েবসাইট পারচেজ ক্যাম্পেইন"}</span>
              <span
                className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "website_purchases" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {purchaseCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>{isEnglish ? "View All Results" : "সকল রেজাল্ট"}</span>
              <span
                className={`ml-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "all" ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {totalCount}
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-sm font-medium">
              {isEnglish
                ? "Loading verified Meta Ads case studies..."
                : "ভেরিফায়েড মেটা অ্যাডস কেস স্টাডি লোড হচ্ছে..."}
            </p>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <p>{isEnglish ? "No campaigns found in this category." : "এই ক্যাটাগরিতে কোনো ক্যাম্পেইন পাওয়া যায়নি।"}</p>
          </div>
        ) : (
          /* Cards Grid: Screenshot on top, Details & Marketing Copy Below - 2 Columns on Mobile */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8">
            {displayedCampaigns.map((item, index) => {
              const isLead = item.category === "message_leads"
              const isHiddenOnMobile = isHomePage && index >= 4
              const displayTitle = isEnglish
                ? item.title || item.titleBn || `Campaign Case Study #${index + 1}`
                : item.titleBn || item.title || `ক্যাম্পেইন কেস স্টাডি #${index + 1}`
              
              const displayNiche = isEnglish
                ? item.clientNiche || "E-Commerce & Retail"
                : item.clientNicheBn || item.clientNiche || "ই-কমার্স ও রিটেইল"

              const displayCopy = isEnglish
                ? item.marketingCopy || item.description || "High-converting campaign optimized by Boosting Agency BD with precision audience targeting and scalable ad spend."
                : item.marketingCopyBn || item.marketingCopy || item.description || "বুস্টিং এজেন্সি বিডির নিখুঁত অডিয়েন্স টার্গেটিং ও স্ট্র্যাটেজিক অ্যাড কপি অপ্টিমাইজেশনের মাধ্যমে ক্লায়েন্টের জন্য সর্বনিম্ন খরচে সর্বোচ্চ সেলস নিশ্চিত করা হয়েছে।"

              const highlights = isEnglish
                ? (item.highlights && item.highlights.length > 0 ? item.highlights : null)
                : (item.highlightsBn && item.highlightsBn.length > 0 ? item.highlightsBn : item.highlights)

              const metricsList = getMetricsList(item)

              return (
                <Card
                  key={item.id}
                  className={cn(
                    "group rounded-2xl sm:rounded-3xl border border-border/80 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl bg-card justify-between",
                    isHiddenOnMobile ? "hidden sm:flex flex-col" : "flex flex-col"
                  )}
                >
                  <div>
                    {/* Top Screenshot Container: Crisp screenshot image right at the top */}
                    <div
                      className="relative aspect-[16/11] bg-slate-950 overflow-hidden cursor-pointer border-b border-border/60 group/img flex items-center justify-center"
                      onClick={() => setSelectedScreenshot(item)}
                    >
                      <Image
                        src={item.screenshotUrl}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover/img:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top floating badges on the image */}
                      <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between pointer-events-none">
                        <Badge
                          variant="secondary"
                          className={`text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 backdrop-blur-md shadow-md border ${
                            isLead
                              ? "bg-blue-600/95 text-white border-blue-400/30"
                              : "bg-emerald-600/95 text-white border-emerald-400/30"
                          }`}
                        >
                          {isLead
                            ? isEnglish ? "Message" : "মেসেজ"
                            : isEnglish ? "Purchase" : "পারচেজ"}
                        </Badge>

                        <div className="hidden xs:inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 rounded-full bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[9px] sm:text-xs font-mono font-medium border border-emerald-500/30 shadow-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="hidden sm:inline">Meta Ads</span> Verified
                        </div>
                      </div>

                      {/* Hover Overlay with Enlarge Button */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center p-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold shadow-lg border border-white/30 text-center">
                          <Maximize2 className="h-3.5 w-3.5 shrink-0" />
                          <span className="hidden xs:inline">{isEnglish ? "Enlarge" : "বড় করুন"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content & Marketing Copy Area */}
                    <CardContent className="p-2.5 sm:p-5 lg:p-6 space-y-2 sm:space-y-3.5">
                      {/* Niche & Category Bar */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-primary truncate max-w-[70%]">
                          <Sparkles className="w-3 h-3 text-cyan-500 shrink-0" />
                          <span className="truncate">{displayNiche}</span>
                        </span>
                        <span className="font-mono text-[9px] sm:text-[11px] text-muted-foreground shrink-0">
                          #{index + 1}
                        </span>
                      </div>

                      {/* High-Converting Title */}
                      <h3
                        onClick={() => setSelectedScreenshot(item)}
                        className="text-xs sm:text-base lg:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors cursor-pointer line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]"
                      >
                        {displayTitle}
                      </h3>

                      {/* Real Scanned Metrics Grid (compact for 2 columns on mobile) */}
                      {metricsList.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 py-0.5 sm:py-1">
                          {metricsList.slice(0, 3).map((metric, mIdx) => (
                            <div
                              key={mIdx}
                              className={`rounded-lg sm:rounded-xl bg-secondary/60 dark:bg-secondary/30 border border-border/60 p-1.5 sm:p-2 text-center flex flex-col justify-center ${
                                mIdx === 2 ? "col-span-2 sm:col-span-1" : ""
                              }`}
                            >
                              <span className="text-[8px] sm:text-[10px] text-muted-foreground line-clamp-1 font-medium">
                                {isEnglish ? metric.label : (metric.labelBn || metric.label)}
                              </span>
                              <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-foreground font-mono mt-0.5 tracking-tight text-gradient">
                                {metric.value}
                              </span>
                              {metric.subtext && (
                                <span className="hidden sm:block text-[8px] sm:text-[9px] text-muted-foreground/80 line-clamp-1 mt-0.5">
                                  {metric.subtext}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Agency Strategy & Copywriting */}
                      <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {displayCopy}
                      </p>

                      {/* Key Highlights list (visible on tablet/desktop) */}
                      {highlights && highlights.length > 0 && (
                        <div className="hidden sm:block space-y-1.5 pt-1 border-t border-border/40">
                          {highlights.slice(0, 2).map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-foreground/80">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-2 sm:p-4 pt-0 border-t border-border/40 flex flex-col xs:flex-row items-stretch xs:items-center gap-1.5 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedScreenshot(item)}
                      className="flex-1 h-7 sm:h-8 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold gap-1 px-2 border-border/80 hover:bg-secondary cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3 text-cyan-500 shrink-0" />
                      <span className="truncate">{isEnglish ? "View" : "ভিউ"}</span>
                    </Button>

                    <a
                      href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                        `Hello Boosting Agency BD, I saw your case study "${item.title || displayTitle}" and want a similar Meta Ads campaign for my business.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-xs shrink-0"
                    >
                      <MessageCircle className="w-3 h-3 shrink-0" />
                      <span className="truncate">{isEnglish ? "Inquire" : "পরামর্শ"}</span>
                    </a>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* See More Button for Home Page -> Navigates to Services Section */}
        {isHomePage && (
          <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 py-6 font-bold text-sm sm:text-base gradient-primary text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all group cursor-pointer"
            >
              <Link href={seeMoreHref}>
                <span>{isEnglish ? "See More Case Studies in Services" : "সি মোর — সার্ভিস সেকশনে সব দেখুন"}</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {isEnglish
                ? "Displaying 6 selected campaigns on desktop & 4 on mobile. Click See More to explore all 44+ verified campaigns in our Services section."
                : "ডেস্কটপে ৬টি এবং ফোনে ৪টি কেস স্টাডি দেখানো হয়েছে। সম্পূর্ণ ৪৪টি কেস স্টাডি দেখতে সি মোর বাটনে ক্লিক করুন।"}
            </p>
          </div>
        )}
      </div>

      {/* ================= LIGHTBOX POPUP DIALOG ================= */}
      <Dialog
        open={!!selectedScreenshot}
        onOpenChange={(open) => {
          if (!open) {
            safeClose()
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 bg-card border-border">
          {selectedScreenshot && (
            <div className="space-y-4">
              {/* Lightbox Header */}
              <DialogHeader className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="secondary"
                    className={`text-xs font-bold ${
                      selectedScreenshot.category === "message_leads"
                        ? "bg-blue-600 text-white"
                        : "bg-emerald-600 text-white"
                    }`}
                  >
                    {selectedScreenshot.category === "message_leads"
                      ? isEnglish ? "Message Lead Campaign" : "মেসেজ লিড ক্যাম্পেইন"
                      : isEnglish ? "Website Purchase Campaign" : "ওয়েবসাইট পারচেজ ক্যাম্পেইন"}
                  </Badge>
                  <div className="inline-flex items-center gap-1 text-emerald-500 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Meta Ads Screenshot</span>
                  </div>
                </div>

                <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                  {isEnglish
                    ? selectedScreenshot.title || selectedScreenshot.titleBn
                    : selectedScreenshot.titleBn || selectedScreenshot.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                  {isEnglish
                    ? selectedScreenshot.clientNiche || "E-Commerce Performance Campaign"
                    : selectedScreenshot.clientNicheBn || selectedScreenshot.clientNiche || "ই-কমার্স পারফরম্যান্স ক্যাম্পেইন"}
                </DialogDescription>
              </DialogHeader>

              {/* Lightbox Screenshot Image View */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-2 cursor-pointer transition-all ${
                  lightboxZoom ? "min-h-[600px] h-auto" : "h-[400px] sm:h-[500px]"
                }`}
                onClick={() => setLightboxZoom(!lightboxZoom)}
                title={isEnglish ? "Click to toggle zoom" : "জুম করতে ক্লিক করুন"}
              >
                <Image
                  src={selectedScreenshot.screenshotUrl}
                  alt={selectedScreenshot.title || "Meta Ads Campaign"}
                  fill={!lightboxZoom}
                  width={lightboxZoom ? 1200 : undefined}
                  height={lightboxZoom ? 800 : undefined}
                  className={`rounded-lg ${lightboxZoom ? "object-contain w-full h-auto" : "object-contain"}`}
                  referrerPolicy="no-referrer"
                  priority
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxZoom(!lightboxZoom)
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 shadow-lg"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lightboxZoom ? (isEnglish ? "Normal View" : "সাধারণ ভিউ") : (isEnglish ? "Zoom In" : "বড় করুন")}</span>
                </button>
              </div>

              {/* Lightbox Details & Metrics */}
              <div className="space-y-4 pt-2">
                {/* Metrics Grid */}
                {getMetricsList(selectedScreenshot).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {getMetricsList(selectedScreenshot).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-secondary/50 border border-border/80 text-center"
                      >
                        <span className="text-xs text-muted-foreground block font-medium">
                          {isEnglish ? m.label : (m.labelBn || m.label)}
                        </span>
                        <span className="text-base sm:text-lg font-black text-foreground font-mono mt-0.5 block text-gradient">
                          {m.value}
                        </span>
                        {m.subtext && (
                          <span className="text-[10px] text-muted-foreground block mt-0.5">
                            {m.subtext}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Marketing Copy summary */}
                <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    {isEnglish ? "Strategy & Performance Summary" : "মার্কেটিং স্ট্র্যাটেজি ও পারফরম্যান্স সারসংক্ষেপ"}
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    {isEnglish
                      ? selectedScreenshot.marketingCopy || selectedScreenshot.description
                      : selectedScreenshot.marketingCopyBn || selectedScreenshot.marketingCopy || selectedScreenshot.description}
                  </p>
                </div>

                {/* Lightbox Highlights */}
                {selectedScreenshot.highlights && selectedScreenshot.highlights.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {isEnglish ? "Key Campaign Takeaways" : "ক্যাম্পেইনের মূল হাইলাইটস"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isEnglish
                        ? selectedScreenshot.highlights
                        : selectedScreenshot.highlightsBn || selectedScreenshot.highlights
                      ).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/90 p-2.5 rounded-xl bg-secondary/40 border border-border/40">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* WhatsApp Consultation Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-muted-foreground text-center sm:text-left">
                    <span>
                      {isEnglish
                        ? "Want similar performance for your business?"
                        : "আপনার বিজনেসের জন্যও এমন দুর্দান্ত রেজাল্ট চান?"}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/8801700000000?text=${encodeURIComponent(
                      `Hello Boosting Agency BD, I want to discuss a campaign like: "${selectedScreenshot.title || 'Meta Ads Campaign'}"`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isEnglish ? "Start Campaign on WhatsApp" : "হোয়াটসঅ্যাপে ক্যাম্পেইন শুরু করুন"}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
