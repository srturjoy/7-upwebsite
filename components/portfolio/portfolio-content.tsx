"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { 
  Search, 
  ExternalLink, 
  Globe, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronDown
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { CLIENTS, CLIENT_CATEGORIES, ClientRecord, ClientCategory } from "@/data/clients"

export function PortfolioContent() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<typeof CLIENT_CATEGORIES[number]>("All")
  const [visibleCount, setVisibleCount] = useState(15)
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null)

  // Open modal cleanly without modifying browser history stack
  const handleOpenClient = useCallback((client: ClientRecord) => {
    setSelectedClient(client)
  }, [])

  // Close modal cleanly
  const handleCloseClient = useCallback(() => {
    setSelectedClient(null)
  }, [])

  // Keyboard Escape key listener to close modal
  useEffect(() => {
    if (!selectedClient) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleCloseClient()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedClient, handleCloseClient])

  // Reset pagination count when category or search changes
  useEffect(() => {
    setVisibleCount(15)
  }, [activeCategory, searchQuery])

  // Filter and sort clients: Priority Group A first, then Group B
  const filteredClients = useMemo(() => {
    let result = CLIENTS

    if (activeCategory !== "All") {
      result = result.filter((client) => client.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(q) ||
          (client.nameBn && client.nameBn.toLowerCase().includes(q)) ||
          client.description.toLowerCase().includes(q) ||
          client.category.toLowerCase().includes(q)
      )
    }

    // Stable sort: priority ascending (1 -> 49)
    return [...result].sort((a, b) => a.priority - b.priority)
  }, [activeCategory, searchQuery])

  // Paginated slice
  const displayedClients = useMemo(() => {
    return filteredClients.slice(0, visibleCount)
  }, [filteredClients, visibleCount])

  // Count by category for filter pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: CLIENTS.length }
    CLIENTS.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1
    })
    return counts
  }, [])

  // Generate initials for avatar badge
  const getInitials = (name: string) => {
    const clean = name.replace(/[^a-zA-Z0-9\s]/g, "").trim()
    const parts = clean.split(/\s+/).filter(Boolean)
    if (parts.length === 0) return "BA"
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  return (
    <>
      {/* Search & Category Filter Navigation Bar */}
      <section className="border-b border-border sticky top-[73px] bg-background/95 backdrop-blur-md z-40 shadow-xs">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 space-y-4">
          {/* Top row: Live search bar & results summary */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEnglish ? "Search business or page name..." : "ব্যবসা বা পেজের নাম দিয়ে খুঁজুন..."}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-secondary/80 border border-border/80 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-slate-300 hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-slate-300 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {isEnglish
                  ? `Showing ${displayedClients.length} of ${filteredClients.length} verified pages (${CLIENTS.length} total)`
                  : `${CLIENTS.length} টির মধ্যে ${displayedClients.length} টি ভেরিফাইড পেজ প্রদর্শিত`}
              </span>
            </div>
          </div>

          {/* Bottom row: Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CLIENT_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "bg-secondary/70 text-secondary-foreground hover:bg-secondary border border-border/70"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`ml-2 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-white/25 text-white" : "bg-muted text-muted-foreground dark:text-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Client Portfolio Grid */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Introduction */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-xs font-semibold mb-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isEnglish ? "Authentic Client Portfolio" : "প্রামাণিক ক্লায়েন্ট পোর্টফোলিও"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {isEnglish ? "Our Clients & Marketing Projects" : "আমাদের ক্লায়েন্ট ও মার্কেটিং প্রজেক্টসমূহ"}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {isEnglish
                ? "At Boosting Agency BD, we work with businesses across fashion, e-commerce, furniture, education, healthcare, travel, and other industries. Explore a selection of business pages and websites associated with our marketing work."
                : "বুস্টিং এজেন্সি বিডি-তে আমরা ফ্যাশন, ই-কমার্স, ফার্নিচার, শিক্ষা, স্বাস্থ্যসেবা, ট্রাভেল এবং অন্যান্য বিভিন্ন খাতের ব্যবসার সাথে কাজ করি। আমাদের মার্কেটিং কাজের সাথে যুক্ত বিজনেস পেজ ও ওয়েবসাইটগুলোর একটি নির্বাচিত তালিকা এখানে এক্সপ্লোর করুন।"}
            </p>
          </div>

          {/* Grid of Client Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedClients.map((client) => (
              <Card
                key={client.id}
                onClick={() => handleOpenClient(client)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleOpenClient(client)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details of ${isEnglish ? client.name : (client.nameBn || client.name)}`}
                className="group rounded-3xl border border-border/80 hover:border-cyan-500/70 transition-all duration-300 card-3d hover:shadow-xl hover:shadow-cyan-500/15 bg-card flex flex-col justify-between overflow-hidden relative cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                {/* Subtle corner hover glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="p-6 relative flex flex-col h-full">
                  {/* Card Header: Initials Avatar + Category & Featured Tag */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-white text-lg font-black shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 flex-shrink-0">
                      {getInitials(client.name)}
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-semibold bg-secondary/90 hover:bg-secondary text-secondary-foreground border border-border/60 px-2 py-0.5 rounded-lg"
                      >
                        {client.category}
                      </Badge>
                      {client.isGroupA && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="h-2.5 w-2.5" />
                          <span>{isEnglish ? "Featured" : "ফিচার্ড"}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Business Name */}
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {isEnglish ? client.name : (client.nameBn || client.name)}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed line-clamp-3 flex-grow">
                    {isEnglish ? client.description : (client.descriptionBn || client.description)}
                  </p>

                  {/* Verified Follower Count (ONLY shown if verified) */}
                  {client.followerCount && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-xl w-fit">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{client.followerCount} Verified Followers</span>
                    </div>
                  )}

                  {/* Featured Service tags (if known) */}
                  {client.featuredServices && client.featuredServices.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(isEnglish ? client.featuredServices : (client.featuredServicesBn || client.featuredServices)).map(
                        (srv) => (
                          <span
                            key={srv}
                            className="text-[10px] text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md font-medium"
                          >
                            {srv}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {/* Action Buttons: Facebook & Official Website */}
                  <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-2">
                    {/* Facebook Button (Always Present) */}
                    <a
                      href={client.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500 dark:hover:text-slate-950 text-xs font-semibold transition-all duration-200 border border-blue-500/20 dark:border-cyan-500/25"
                      aria-label={`Visit Facebook Page of ${client.name}`}
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>Facebook</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    {/* Official Website Button (ONLY rendered when verified website URL exists) */}
                    {client.websiteUrl && (
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-600 hover:text-white dark:text-cyan-400 dark:hover:text-white text-xs font-semibold transition-all duration-200 border border-cyan-500/20"
                        aria-label={`Visit Official Website of ${client.name}`}
                      >
                        <Globe className="h-3.5 w-3.5" />
                        <span>Website</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {/* Quick View Details Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenClient(client)
                      }}
                      className="ml-auto p-1.5 text-xs text-muted-foreground hover:text-cyan-500 rounded-lg hover:bg-secondary transition-colors"
                      title={isEnglish ? "View details" : "বিস্তারিত দেখুন"}
                      aria-label={`View details of ${client.name}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <div className="text-center py-16 bg-secondary/30 rounded-3xl border border-border/60">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-60" />
              <p className="text-base font-semibold text-foreground">
                {isEnglish ? "No client pages match your search." : "আপনার অনুসন্ধানের সাথে কোনো পেজ মেলেনি।"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                }}
                className="mt-3 text-xs font-semibold text-cyan-500 hover:underline"
              >
                {isEnglish ? "Clear filters and view all 49 clients" : "ফিল্টার পরিষ্কার করে সব ৪৯টি পেজ দেখুন"}
              </button>
            </div>
          )}

          {/* Load More Interaction (Keeps page fast while allowing complete discovery) */}
          {visibleCount < filteredClients.length && (
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 18, filteredClients.length))}
                className="rounded-2xl px-8 border-border hover:border-cyan-500/50 hover:bg-secondary text-sm font-semibold group shadow-sm cursor-pointer"
              >
                <span>
                  {isEnglish
                    ? `Load More Clients (${displayedClients.length} of ${filteredClients.length})`
                    : `আরও পেজ লোড করুন (${displayedClients.length} / ${filteredClients.length})`}
                </span>
                <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </div>
          )}

          {/* SECTION 8 DISCLOSURES — TRANSPARENT & COMPLIANT */}
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-secondary/40 border border-border/70 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">
                  {isEnglish
                    ? "Selected Business Pages & Portfolio Examples"
                    : "নির্বাচিত বিজনেস পেজ ও পোর্টফোলিও উদাহরণ"}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {isEnglish
                    ? "This section highlights selected business pages and websites across different industries. The examples shown are not a complete directory of all businesses or projects, and inclusion does not imply that every listed business used every service offered by Boosting Agency BD."
                    : "এই সেকশনে বিভিন্ন খাতের নির্বাচিত বিজনেস পেজ ও ওয়েবসাইটগুলো তুলে ধরা হয়েছে। এখানে প্রদর্শিত তালিকাটি সব ব্যবসা বা প্রজেক্টের পূর্ণাঙ্গ ডিরেক্টরি নয় এবং তালিকায় অন্তর্ভুক্তি নির্দেশ করে না যে প্রতিটি ব্যবসা প্রতিষ্ঠান বুস্টিং এজেন্সি বিডি-র প্রতিটি সেবা গ্রহণ করেছে।"}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/40 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-11">
              <span className="font-semibold text-foreground dark:text-white">
                {isEnglish ? "Pricing Disclosure: " : "মূল্য সংক্রান্ত তথ্য: "}
              </span>
              {isEnglish
                ? "Service prices shown on our website are starting prices and may vary depending on project scope, campaign objectives, advertising budget, technical requirements, and the services selected."
                : "আমাদের ওয়েবসাইটে প্রদর্শিত সেবামূল্য প্রাথমিক বা প্রারম্ভিক মূল্য এবং প্রজেক্টের পরিধি, ক্যাম্পেইনের লক্ষ্য, বিজ্ঞাপনের বাজেট, প্রযুক্তিগত প্রয়োজনীয়তা ও নির্বাচিত সেবার ওপর ভিত্তি করে পরিবর্তিত হতে পারে।"}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT DETAIL MODAL with History Back & Backspace Protection */}
      <Dialog
        open={!!selectedClient}
        onOpenChange={(open) => {
          if (!open) handleCloseClient()
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border bg-card shadow-2xl z-[100]"
        >
          {selectedClient && (
            <div className="relative">
              {/* Header Banner */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-t-3xl overflow-hidden border-b border-border/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseClient}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                  aria-label="Close client modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl gradient-primary text-white text-3xl font-black shadow-xl shadow-cyan-500/30 flex-shrink-0">
                    {getInitials(selectedClient.name)}
                  </div>

                  <div className="flex-1 pr-6 sm:pr-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{selectedClient.category}</span>
                      {selectedClient.isGroupA && <span>· Featured</span>}
                    </div>

                    <DialogHeader>
                      <DialogTitle className="text-2xl sm:text-3xl font-bold text-white">
                        {isEnglish ? selectedClient.name : (selectedClient.nameBn || selectedClient.name)}
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm text-cyan-300 mt-1 font-medium">
                        {isEnglish ? "Verified Client Page Record" : "যাচাইকৃত ক্লায়েন্ট পেজ রেকর্ড"}
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    {isEnglish ? "Business Overview" : "ব্যবসার সংক্ষিপ্ত বিবরণ"}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {isEnglish ? selectedClient.description : (selectedClient.descriptionBn || selectedClient.description)}
                  </p>
                </div>

                {/* Verified Follower Count (if available) */}
                {selectedClient.followerCount && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        {selectedClient.followerCount} Verified Facebook Followers
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Public follower metric recorded during profile verification.
                      </p>
                    </div>
                  </div>
                )}

                {/* Links */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                    {isEnglish ? "Official Verified Links" : "অফিশিয়াল ভেরিফাইড লিংকসমূহ"}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selectedClient.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>{isEnglish ? "Open Facebook Page" : "ফেসবুক পেজ দেখুন"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {selectedClient.websiteUrl && (
                      <a
                        href={selectedClient.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                      >
                        <Globe className="h-4 w-4" />
                        <span>{isEnglish ? "Visit Official Website" : "অফিশিয়াল ওয়েবসাইট"}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* WhatsApp Consultation Action */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    {isEnglish
                      ? "Looking to scale your brand like this client? Connect directly with Boosting Agency BD."
                      : "আপনার ব্র্যান্ডকেও এভাবে এগিয়ে নিতে চান? বুস্টিং এজেন্সি বিডি-র সাথে যোগাযোগ করুন।"}
                  </p>
                  <a
                    href={`https://wa.me/8801518961899?text=${encodeURIComponent(
                      `Hello Boosting Agency BD, I saw your client project "${selectedClient.name}" and would like to discuss digital marketing services.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-5 py-3 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 shrink-0"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{isEnglish ? "WhatsApp Discussion" : "হোয়াটসঅ্যাপে যোগাযোগ"}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
