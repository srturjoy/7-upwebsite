"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { TeamMember, TEAM_MEMBERS } from "@/data/team"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2,
  Sparkles, 
  Camera, 
  Mail, 
  Phone, 
  Share2, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Maximize2,
  Globe,
  ExternalLink,
  X
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MemberProfileViewProps {
  member: TeamMember
}

interface GalleryImage {
  id: string
  url: string
  caption: string
  isCustom?: boolean
}

export function MemberProfileView({ member }: MemberProfileViewProps) {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  // State for gallery images
  const [images, setImages] = useState<GalleryImage[]>(() =>
    member.defaultImages.map((img, i) => ({
      id: `default-${i}`,
      url: img.url,
      caption: isEnglish ? img.caption : (img.captionBn || img.caption),
      isCustom: false,
    }))
  )
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Initialize images from member genuine WebP images
  useEffect(() => {
    const loadedImages: GalleryImage[] = member.defaultImages.map((img, i) => ({
      id: `default-${i}`,
      url: img.url,
      caption: isEnglish ? img.caption : (img.captionBn || img.caption),
      isCustom: false,
    }))
    setImages(loadedImages)
  }, [member, isEnglish])

  // Copy profile link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  // Other specialists (related team members)
  const otherMembers = TEAM_MEMBERS.filter((m) => m.id !== member.id)

  const activeImage = images[activeImageIndex] || images[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header / Breadcrumb Bar */}
      <div className="border-b border-border bg-secondary/30 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-cyan-500 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{isEnglish ? "Back to About & Team" : "টিম সেকশনে ফিরে যান"}</span>
          </Link>

          <div className="flex items-center gap-2">
            {member.website && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 rounded-xl text-xs gap-1.5 border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10"
              >
                <a href={member.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{isEnglish ? "Founder Website" : "ফাউন্ডারের ওয়েবসাইট"}</span>
                  <ExternalLink className="h-3 w-3 opacity-75" />
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="h-8 rounded-xl text-xs gap-1.5 border-border hover:bg-secondary"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">
                {copiedLink ? (isEnglish ? "Copied!" : "কপি হয়েছে!") : (isEnglish ? "Share Profile" : "শেয়ার")}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Profile Content Container */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT COLUMN: 2-3 Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Featured Active Image Card */}
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card shadow-2xl group">
              <div className="aspect-square relative overflow-hidden bg-slate-900">
                {activeImage ? (
                  <img
                    src={activeImage.url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-primary text-white text-5xl font-black">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Lightbox zoom button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  aria-label="View photo fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact & WhatsApp Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700/80 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">
                  {isEnglish ? "Direct Strategy Consultation" : "সরাসরি স্ট্র্যাটেজি পরামর্শ"}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEnglish
                  ? `Connect directly with ${member.name} to discuss your marketing campaigns, tracking infrastructure, or digital growth.`
                  : `আপনার ডিজিটাল মার্কেটিং, ট্র্যাকিং কিংবা ব্যবসা স্কেলিং নিয়ে সরাসরি ${member.name}-এর সাথে পরামর্শ করুন।`}
              </p>

              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm py-3 px-5 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span>{isEnglish ? "Visit Founder's Website" : "ফাউন্ডারের অফিসিয়াল ওয়েবসাইট"}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              )}

              <a
                href={`https://wa.me/8801518961899?text=${encodeURIComponent(member.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm py-3 px-5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{isEnglish ? "Message on WhatsApp" : "হোয়াটসঅ্যাপে মেসেজ পাঠান"}</span>
              </a>

              {member.phone && (
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-200">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Phone className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{member.phone}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Mail className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="truncate max-w-[150px]">{member.email || "srturjoy@gmail.com"}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Full Member Data, Bio, Expertise, Strengths (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header / Titles */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isEnglish ? "Boosting Agency BD Team Specialist" : "বুস্টিং এজেন্সি বিডি টিম বিশেষজ্ঞ"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                {isEnglish ? member.name : (member.nameBn || member.name)}
              </h1>

              <p className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">
                {isEnglish ? member.role : (member.roleBn || member.role)}
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 font-medium leading-relaxed pt-1">
                {isEnglish ? member.titles : (member.titlesBn || member.titles)}
              </p>
            </div>

            {/* Member Quotation / Highlights Callout */}
            <div className="p-5 sm:p-6 rounded-3xl bg-secondary/50 border border-border/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-sm sm:text-base italic text-foreground dark:text-slate-100 font-medium leading-relaxed relative">
                &ldquo;{isEnglish ? member.description : (member.descriptionBn || member.description)}&rdquo;
              </p>
            </div>

            {/* Professional Summary / Detailed Bio */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                {isEnglish ? "Professional Biography & Career Overview" : "পেশাদার পরিচিতি ও কর্মজীবন"}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {isEnglish ? member.bio : (member.bioBn || member.bio)}
              </p>
            </div>

            {/* Core Areas of Expertise */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {isEnglish ? "Core Technical & Marketing Expertise" : "প্রযুক্তিগত ও মার্কেটিং দক্ষতার মূল ক্ষেত্রসমূহ"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(isEnglish ? member.expertise : (member.expertiseBn || member.expertise)).map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-secondary/90 hover:bg-secondary border border-border/70 text-foreground"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Professional Strengths & Business Impact */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {isEnglish ? "Professional Strengths & Measurable Impact" : "পেশাদার শক্তি ও ব্যবসায়িক প্রভাব"}
              </h3>
              <div className="space-y-3">
                {(isEnglish ? member.strengths : (member.strengthsBn || member.strengths)).map((strength, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-secondary/30 border border-border/60 flex items-start gap-3 text-xs sm:text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-foreground dark:text-slate-100 font-medium">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agency Standard Commitment */}
            <div className="p-6 rounded-3xl bg-secondary/40 border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-foreground">
                  {isEnglish ? "Schedule a Direct Session" : "সরাসরি সেশন বুক করুন"}
                </h4>
                <p className="text-xs text-muted-foreground dark:text-slate-300">
                  {isEnglish
                    ? "Available for full-funnel consulting, account audits, and media buying planning."
                    : "ফুল-ফানেল অডিট, বিজ্ঞাপন বাজেট প্ল্যানিং এবং স্ট্র্যাটেজি সেশনের জন্য প্রস্তুত।"}
                </p>
              </div>

              <Button asChild className="gradient-primary text-white rounded-xl shadow-md shrink-0">
                <Link href="/contact">
                  <span>{isEnglish ? "Get in Touch" : "যোগাযোগ করুন"}</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Other Team Members Navigation */}
        <section className="mt-20 pt-16 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {isEnglish ? "Boosting Agency BD Roster" : "বুস্টিং এজেন্সি বিডি টিম"}
              </p>
              <h2 className="text-2xl font-bold text-foreground mt-1">
                {isEnglish ? "Meet Our Other Team Specialists" : "আমাদের অন্যান্য টিম বিশেষজ্ঞদের দেখুন"}
              </h2>
            </div>
            <Button variant="outline" asChild className="rounded-xl border-border">
              <Link href="/about">
                <span>{isEnglish ? "View All Team" : "সম্পূর্ণ টিম দেখুন"}</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherMembers.map((other) => {
              const photoUrl = other.defaultImages[0]?.url || `/images/team/${other.id}.webp`
              return (
                <Card
                  key={other.id}
                  className="rounded-3xl border-border/70 hover:border-cyan-500/80 transition-all duration-300 card-3d hover:shadow-2xl hover:shadow-cyan-500/20 bg-card overflow-hidden relative group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
                  </div>

                  {/* Card Photo Banner - Full Image exactly like About */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                    <img
                      src={photoUrl}
                      alt={isEnglish ? other.name : (other.nameBn || other.name)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <CardContent className="p-5 relative flex flex-col flex-grow justify-between">
                    <div>
                      {/* Name */}
                      <h3 className="text-base font-bold text-foreground group-hover:text-cyan-500 transition-colors">
                        {isEnglish ? other.name : (other.nameBn || other.name)}
                      </h3>

                      {/* Role */}
                      <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                        {isEnglish ? other.role : (other.roleBn || other.role)}
                      </p>
                      
                      {/* Card Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-2">
                        {isEnglish ? other.description : (other.descriptionBn || other.description)}
                      </p>

                      {/* Expertise / Titles */}
                      <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium mt-1.5 line-clamp-1">
                        {isEnglish ? other.titles : (other.titlesBn || other.titles)}
                      </p>
                    </div>

                    {/* Clean View Profile Indicator */}
                    <div className="pt-3 border-t border-border/50">
                      <Link 
                        href={`/team/${other.id}`}
                        className="flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors w-full"
                      >
                        <span>{isEnglish ? "View Profile" : "প্রোফাইল দেখুন"}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="h-6 w-6" />
          </button>

          <div 
            className="relative max-w-4xl max-h-[85vh] w-full aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {activeImage && (
              <img
                src={activeImage.url}
                alt={activeImage.caption}
                className="w-full h-full object-contain"
              />
            )}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                {activeImage?.caption}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
