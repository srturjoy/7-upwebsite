"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { termsAndConditionsData, TermSection } from "@/lib/terms-data"
import {
  ShieldCheck,
  FileText,
  CreditCard,
  Lock,
  Clock,
  RefreshCcw,
  AlertCircle,
  Search,
  CheckCircle2,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  Printer
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsAndConditionsPage() {
  const { language } = useLanguage()
  const isEnglish = language === "en"
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const filteredSections = useMemo(() => {
    return termsAndConditionsData.filter((section) => {
      const matchesCategory =
        selectedCategory === "all" || section.category === selectedCategory

      if (!searchQuery.trim()) return matchesCategory

      const query = searchQuery.toLowerCase()
      const title = (isEnglish ? section.title_en : section.title_bn).toLowerCase()
      const summary = (isEnglish ? section.summary_en : section.summary_bn).toLowerCase()
      const points = (isEnglish ? section.points_en : section.points_bn).join(" ").toLowerCase()

      const matchesSearch =
        title.includes(query) || summary.includes(query) || points.includes(query)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, isEnglish])

  const categories = [
    {
      id: "all",
      label_en: "All Sections (T&C)",
      label_bn: "সকল নীতিমালা (T&C)",
      count: termsAndConditionsData.length
    },
    {
      id: "terms",
      label_en: "Service Terms",
      label_bn: "সেবা শর্তাবলী",
      count: termsAndConditionsData.filter((s) => s.category === "terms").length
    },
    {
      id: "payment",
      label_en: "Payment & Refund",
      label_bn: "পেমেন্ট ও রিফান্ড",
      count: termsAndConditionsData.filter((s) => s.category === "payment").length
    },
    {
      id: "privacy",
      label_en: "Privacy & Data Protection",
      label_bn: "গোপনীয়তা ও ডেটা সুরক্ষা",
      count: termsAndConditionsData.filter((s) => s.category === "privacy").length
    },
    {
      id: "compliance",
      label_en: "Compliance & Legal",
      label_bn: "কমপ্লায়েন্স ও আইনি দিক",
      count: termsAndConditionsData.filter((s) => s.category === "compliance").length
    }
  ]

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-16 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
              <span>
                {isEnglish
                  ? "Official Agency Policy & Legal Document"
                  : "অফিশিয়াল এজেন্সি নীতিমালা ও আইনি দলিল"}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {isEnglish ? (
                <>
                  Terms & Conditions <span className="text-cyan-400">and</span> Privacy Policy
                </>
              ) : (
                <>
                  শর্তাবলী, নিয়মাবলী <span className="text-cyan-400">ও</span> গোপনীয়তা নীতিমালা
                </>
              )}
            </h1>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              {isEnglish
                ? "Transparent, professional guidelines protecting both our clients and Boosting Agency BD. Covers our 100% advance ad spend policy, refund rights, commercial dollar rates, and non-disclosure standards."
                : "বুস্টিং এজেন্সি বিডি ও আমাদের সকল ক্লায়েন্টের পারস্পরিক স্বার্থ রক্ষায় সম্পূর্ণ স্বচ্ছ ও প্রফেশনাল নীতিমালা। ১০০% প্রিপেইড বাজেট, রিফান্ড অধিকার, ডলার রেট ও তথ্যের গোপনীয়তার বিস্তারিত দিকনির্দেশনা।"}
            </p>

            {/* Quick Metrics / Key Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 text-left">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <RefreshCcw className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {isEnglish ? "Refundable" : "রিফান্ডযোগ্য"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-white">
                  {isEnglish ? "100% Unspent Spend" : "১০০% অব্যবহৃত বাজেট"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {isEnglish ? "Turnaround" : "সময়সীমা"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-white">
                  {isEnglish ? "24–48 Business Hours" : "২৪–৪৮ কার্যঘণ্টা"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Lock className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {isEnglish ? "Data Security" : "তথ্য নিরাপত্তা"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-white">
                  {isEnglish ? "Strict NDA & Privacy" : "১০০% গোপনীয়তা"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-cyan-400">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {isEnglish ? "USD Service Rate" : "ডলার সার্ভিস রেট"}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-white">
                  {isEnglish ? "৳145 Standard Rate" : "৳১৪৫ স্ট্যান্ডার্ড রেট"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span>{isEnglish ? "Last Updated: October 10, 2026" : "সর্বশেষ হালনাগাদ: ১০ অক্টোবর, ২০২৬"}</span>
              <span>•</span>
              <span>{isEnglish ? "Effective for: All Active Clients" : "প্রযোজ্য: সকল সক্রিয় ক্লায়েন্ট"}</span>
              <span>•</span>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>{isEnglish ? "Print Document" : "প্রিন্ট করুন"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Controls: Search & Category Filter */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                      : "border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <span>{isEnglish ? cat.label_en : cat.label_bn}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEnglish
                  ? "Search in terms (e.g. refund, dollar)..."
                  : "খুঁজুন (যেমন: রিফান্ড, ডলার, পেমেন্ট)..."
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-900/90 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Section Cards */}
        {filteredSections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-slate-500" />
            <h3 className="mt-4 text-base font-semibold text-white">
              {isEnglish ? "No matching policy sections found" : "কোনো পলিসি সেকশন পাওয়া যায়নি"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {isEnglish
                ? "Try searching with a different keyword or reset category filters."
                : "অন্য কি-ওয়ার্ড দিয়ে খুঁজুন অথবা ক্যাটাগরি ফিল্টার রিসেট করুন।"}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-slate-700 text-white"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              {isEnglish ? "Reset Filters" : "ফিল্টার রিসেট করুন"}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSections.map((section: TermSection, idx: number) => {
              const title = isEnglish ? section.title_en : section.title_bn
              const summary = isEnglish ? section.summary_en : section.summary_bn
              const points = isEnglish ? section.points_en : section.points_bn
              const badge = isEnglish ? section.badge?.en : section.badge?.bn

              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                        {idx + 1}
                      </span>
                      <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
                    </div>

                    {badge && (
                      <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-medium text-cyan-300">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Summary Callout */}
                  <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-950/40 p-4">
                    <p className="text-sm font-medium leading-relaxed text-slate-300">
                      {summary}
                    </p>
                  </div>

                  {/* Detailed Points */}
                  <div className="mt-6 space-y-3">
                    {points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
                        <p className="text-sm leading-relaxed text-slate-300">{pt}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Agency Transparency & Contact Box */}
        <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-8 sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                <FileText className="h-3.5 w-3.5" />
                <span>{isEnglish ? "Legal Notice & Grievance" : "আইনি সহায়তা ও অভিযোগ"}</span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-white">
                {isEnglish
                  ? "Questions About Our Terms or Privacy Policy?"
                  : "আমাদের শর্তাবলী বা পলিসি নিয়ে কোনো প্রশ্ন আছে?"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {isEnglish
                  ? "Our legal and billing support team is available 24/7. Whether you need clarity on your unspent ad budget refund, wish to request an NDA, or need custom enterprise contracts, reach out directly."
                  : "আমাদের পলিসি ও বিলিং সাপোর্ট টিম সর্বদাই প্রস্তুত। বিজ্ঞাপন ব্যালেন্স রিফান্ড, এনডিএ চুক্তি বা স্পেশাল বিজনেস প্যাকেজের যে কোনো প্রশ্নে আমাদের সাথে সরাসরি যোগাযোগ করুন।"}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="https://wa.me/8801518961899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-cyan-400"
                >
                  <Phone className="h-4 w-4" />
                  <span>{isEnglish ? "Chat on WhatsApp" : "হোয়াটসঅ্যাপে চ্যাট করুন"}</span>
                </a>

                <a
                  href="tel:+8801518961899"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-700"
                >
                  <Phone className="h-4 w-4" />
                  <span>+880 1518 961899</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                {isEnglish ? "Registered Headquarters" : "প্রধান কার্যালয়"}
              </h4>
              <p className="mt-2 text-base font-bold text-white">Boosting Agency BD</p>

              <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <span>
                    {isEnglish
                      ? "Rupnagor R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh"
                      : "রূপনগর আ/এ, রোড-১৬, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <span>+880 1518 961899 (WhatsApp & Call)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <a
                    href="https://boostingagencyofficial.site"
                    className="hover:underline text-cyan-400"
                  >
                    boostingagencyofficial.site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>←</span>
            <span>{isEnglish ? "Back to Home Page" : "হোমপেজে ফিরে যান"}</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
