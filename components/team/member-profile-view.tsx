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
  X,
  GraduationCap,
  Award,
  Briefcase,
  Code2,
  BarChart3,
  Layers,
  AlertCircle,
  Cpu,
  Lock,
  ChevronRight,
  Target,
  Workflow,
  CheckCircle
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
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all")

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

  const isFounder = member.id === "siddiqur-rahman-turjoy"

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
          
          {/* LEFT COLUMN: Photo, Quick Contact & Credentials Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Featured Active Image Card */}
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-card shadow-2xl group">
              <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative overflow-hidden bg-slate-900">
                {activeImage ? (
                  <img
                    src={activeImage.url}
                    alt={isFounder ? "Siddiqur Rahman Turjoy, Founder and CEO of Boosting Agency BD" : member.name}
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-primary text-white text-5xl font-black">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Lightbox zoom button */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all cursor-pointer opacity-80 hover:opacity-100"
                  aria-label="View photo fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Overlay Name & Role Badge */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="inline-block px-3 py-1 rounded-xl bg-cyan-500/20 backdrop-blur-md text-cyan-300 border border-cyan-500/40 text-xs font-bold mb-2">
                    {isEnglish ? member.role : (member.roleBn || member.role)}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {isEnglish 
                      ? (member.preferredName ? `${member.name} (${member.preferredName})` : member.name)
                      : (member.preferredNameBn ? `${member.nameBn || member.name} (${member.preferredNameBn})` : (member.nameBn || member.name))}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Boosting Agency BD
                  </p>
                </div>
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
                  ? `Connect directly with ${member.name} to discuss paid advertising strategy, conversion tracking infrastructure, or digital growth.`
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
                  <span>{isEnglish ? "Visit Founder Website" : "ফাউন্ডারের ওয়েবসাইট ভিজিট করুন"}</span>
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

              {(member.phone || member.email) && (
                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-200">
                  {member.phone && (
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Phone className="h-3.5 w-3.5 text-cyan-400" />
                      <span>{member.phone}</span>
                    </span>
                  )}
                  {member.email && (
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Mail className="h-3.5 w-3.5 text-cyan-400" />
                      <span className="truncate max-w-[150px]">{member.email}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Academic Education Card (BUBT, 2024 - NO CGPA) */}
            {member.education && (
              <Card className="rounded-3xl border border-cyan-500/20 bg-card p-6 shadow-lg relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500 shrink-0">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {isEnglish ? "Higher Education & Technical Foundation" : "উচ্চশিক্ষা ও প্রযুক্তিগত ভিত্তি"}
                    </p>
                    <h4 className="text-base font-bold text-foreground leading-snug">
                      {isEnglish ? member.education.degree : member.education.degreeBn}
                    </h4>
                    <p className="text-xs text-muted-foreground dark:text-slate-300 font-medium">
                      {isEnglish ? member.education.institution : member.education.institutionBn}
                    </p>
                    <div className="pt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-[11px] border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5">
                        {isEnglish ? `Graduation Year: ${member.education.graduationYear}` : `গ্র্যাজুয়েশন সাল: ${member.education.graduationYearBn || member.education.graduationYear}`}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Stated Experience & Credentials Summary Card */}
            {member.yearsExperience && (
              <div className="p-5 rounded-3xl bg-secondary/50 border border-border/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      {isEnglish ? "Professional Track Record" : "পেশাদার অভিজ্ঞতা"}
                    </p>
                    <p className="text-sm font-extrabold text-foreground">
                      {isEnglish ? `${member.yearsExperience} Stated Professional Experience` : `${member.yearsExperienceBn || member.yearsExperience} পেশাদার অভিজ্ঞতা`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Full Founder Master Suite (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* 1. Header / Identity & Positioning */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isFounder ? (isEnglish ? "Founder & Executive Leadership" : "প্রতিষ্ঠাতা ও নির্বাহী নেতৃত্ব") : (isEnglish ? "Specialist Profile" : "বিশেষজ্ঞ প্রোফাইল")}</span>
                </div>
                {member.yearsExperience && (
                  <Badge variant="outline" className="text-[11px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                    {isEnglish ? member.yearsExperience : (member.yearsExperienceBn || member.yearsExperience)}
                  </Badge>
                )}
                {member.education && (
                  <Badge variant="outline" className="text-[11px] border-cyan-500/30 text-cyan-500 bg-cyan-500/10">
                    {isEnglish ? "B.Sc. in CSE (BUBT, 2024)" : "বিএসসি ইন সিএসই (বিইউবিটি, ২০২৪)"}
                  </Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                  {isEnglish 
                    ? (member.preferredName ? `${member.name} (${member.preferredName})` : member.name)
                    : (member.preferredNameBn ? `${member.nameBn || member.name} (${member.preferredNameBn})` : (member.nameBn || member.name))}
                </h1>

                <p className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 mt-1">
                  {isEnglish ? member.role : (member.roleBn || member.role)}
                </p>

                <p className="text-xs sm:text-sm text-foreground dark:text-slate-200 font-semibold leading-relaxed mt-2">
                  {isEnglish ? member.titles : (member.titlesBn || member.titles)}
                </p>
              </div>

              {/* Supporting Positioning Statement */}
              {member.positioning && (
                <div className="p-5 rounded-2xl bg-secondary/60 border border-cyan-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                  <p className="text-xs sm:text-sm text-foreground dark:text-slate-100 font-medium italic leading-relaxed">
                    &ldquo;{isEnglish ? member.positioning : (member.positioningBn || member.positioning)}&rdquo;
                  </p>
                </div>
              )}

              {/* Professional Biography */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                  {isEnglish ? "Professional Biography & Overview" : "পেশাদার পরিচিতি ও সারসংক্ষেপ"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {isEnglish ? member.bio : (member.bioBn || member.bio)}
                </p>
              </div>
            </div>

            {/* 2. Four Connected Areas of Expertise (Pillars) */}
            {member.expertisePillars && member.expertisePillars.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/70">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <Target className="h-3.5 w-3.5" />
                    <span>{isEnglish ? "Four Connected Areas of Practice" : "দক্ষতার চারটি মূল স্তম্ভ"}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mt-1">
                    {isEnglish ? "Integrated Growth & Marketing Architecture" : "সমন্বিত গ্রোথ ও মার্কেটিং আর্কিটেকচার"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEnglish 
                      ? "Connecting performance media buying, visual branding, AI agents, and marketing data engineering."
                      : "মিডিয়া বায়ারিং, ভিজ্যুয়াল ব্র্যান্ডিং, এআই অটোমেশন এবং ডেটা ইঞ্জিনিয়ারিংয়ের সমন্বয়।"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.expertisePillars.map((pillar) => (
                    <Card
                      key={pillar.id}
                      className="rounded-2xl border border-border/80 bg-card hover:border-cyan-500/60 transition-all duration-300 shadow-sm hover:shadow-md p-5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-cyan-500" />
                          <h4 className="text-sm font-bold text-foreground">
                            {isEnglish ? pillar.title : pillar.titleBn}
                          </h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {isEnglish ? pillar.description : pillar.descriptionBn}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-border/50">
                        <div className="flex flex-wrap gap-1.5">
                          {pillar.items.slice(0, 6).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-secondary/80 text-foreground dark:text-slate-200 px-2 py-0.5 rounded-md border border-border/60"
                            >
                              {item}
                            </span>
                          ))}
                          {pillar.items.length > 6 && (
                            <span className="text-[10px] text-muted-foreground px-1 py-0.5 font-semibold">
                              +{pillar.items.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Professional Experience & Career Timeline */}
            {member.experienceHistory && member.experienceHistory.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/70">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>{isEnglish ? "Career History & Positions" : "পেশাদার কর্মজীবন ও অভিজ্ঞতা"}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mt-1">
                      {isEnglish ? "Professional Experience Timeline" : "কর্মজীবনের ধারাবাহিক অভিজ্ঞতা"}
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-xs border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                    {isEnglish ? "5+ Years Stated Experience" : "৫+ বছরের অভিজ্ঞতা"}
                  </Badge>
                </div>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border/80">
                  {member.experienceHistory.map((exp, idx) => {
                    const isCurrent = exp.status === "current"
                    const isReview = exp.status === "review"

                    return (
                      <div key={idx} className="relative pl-9 space-y-2">
                        {/* Timeline Bullet */}
                        <div className={`absolute left-2 top-2 h-3.5 w-3.5 rounded-full border-2 ${
                          isCurrent 
                            ? "bg-cyan-500 border-cyan-300 ring-4 ring-cyan-500/20" 
                            : isReview
                            ? "bg-amber-500 border-amber-300 ring-2 ring-amber-500/20"
                            : "bg-slate-600 border-slate-400"
                        }`} />

                        <Card className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-foreground">
                                {isEnglish ? exp.role : (exp.roleBn || exp.role)}
                              </h4>
                              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                                {isEnglish ? exp.company : (exp.companyBn || exp.company)}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {isCurrent && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                                  {isEnglish ? "Active Leadership" : "বর্তমান নেতৃত্ব"}
                                </span>
                              )}
                              <span className="text-xs font-medium text-muted-foreground">
                                {isEnglish ? exp.period : (exp.periodBn || exp.period)}
                              </span>
                            </div>
                          </div>

                          {/* Verification Note (for Tech Innovations or flagged positions) */}
                          {isReview && exp.verificationNote && (
                            <div className="my-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">
                                {isEnglish ? exp.verificationNote : (exp.verificationNoteBn || exp.verificationNote)}
                              </span>
                            </div>
                          )}

                          {/* Responsibilities list */}
                          <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground dark:text-slate-300">
                            {(isEnglish ? exp.responsibilities : (exp.responsibilitiesBn || exp.responsibilities)).map((resp, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 4. Professional Certifications & Credentials */}
            {member.certifications && member.certifications.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/70">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <Award className="h-3.5 w-3.5" />
                    <span>{isEnglish ? "Accredited Certifications" : "পেশাদার সার্টিফিকেশন ও ক্রেডেনশিয়াল"}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mt-1">
                    {isEnglish ? "Verified Industry Certifications" : "যাচাইকৃত পেশাদার সনদসমূহ"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEnglish 
                      ? "Official certifications across Meta Blueprint, Google Ads, GA4 Analytics, HubSpot, and Ethical Hacking."
                      : "মেটা ব্লুপ্রিন্ট, গুগল অ্যাডস, ডেটা অ্যানালিটিক্স, হাবস্পট এবং এথিক্যাল হ্যাকিংয়ে অর্জিত সনদ।"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.certifications.map((cert, cIdx) => (
                    <Card
                      key={cIdx}
                      className="rounded-2xl border border-border/80 bg-card p-5 hover:border-cyan-500/60 transition-all duration-300 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                            {cert.badgeType || "Verified Credential"}
                          </span>
                          <span className="text-xs font-bold text-foreground">
                            {isEnglish ? cert.issuer : (cert.issuerBn || cert.issuer)}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-foreground leading-snug">
                          {isEnglish ? cert.name : (cert.nameBn || cert.name)}
                        </h4>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {isEnglish ? cert.description : (cert.descriptionBn || cert.description)}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{isEnglish ? "Documented Credential" : "সংরক্ষিত সনদ"}</span>
                        </span>
                        <span className="text-muted-foreground font-semibold">
                          {isEnglish ? cert.issuer : (cert.issuerBn || cert.issuer)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Technical Skills & Tools Organized by Categories */}
            {member.skillsByCategory && member.skillsByCategory.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      <Code2 className="h-3.5 w-3.5" />
                      <span>{isEnglish ? "Technical Competencies" : "প্রযুক্তিগত দক্ষতা ও টুলস"}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-foreground mt-1">
                      {isEnglish ? "Skills & Tools by Category" : "ক্যাটাগরি অনুযায়ী টেকনিক্যাল স্কিলসমূহ"}
                    </h3>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-1.5 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveSkillCategory("all")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeSkillCategory === "all"
                        ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white shadow-md shadow-cyan-500/20"
                        : "bg-secondary/70 hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    {isEnglish ? "All Categories" : "সবগুলো"}
                  </button>
                  {member.skillsByCategory.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSkillCategory(cat.category)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeSkillCategory === cat.category
                          ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white shadow-md shadow-cyan-500/20"
                          : "bg-secondary/70 hover:bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isEnglish ? cat.category : (cat.categoryBn || cat.category)}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.skillsByCategory
                    .filter((cat) => activeSkillCategory === "all" || activeSkillCategory === cat.category)
                    .map((cat, idx) => (
                      <Card key={idx} className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                            {isEnglish ? cat.category : (cat.categoryBn || cat.category)}
                          </h4>
                          <span className="text-[11px] font-semibold text-muted-foreground">
                            {cat.skills.length} {isEnglish ? "tools" : "টুলস"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((skill, sIdx) => (
                            <Badge
                              key={sIdx}
                              variant="secondary"
                              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-secondary/80 border border-border/60 text-foreground"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* 6. Featured Portfolio & Verified Client Impact Projects */}
            {member.featuredProjects && member.featuredProjects.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-border/70">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>{isEnglish ? "Client Portfolio & Proof" : "পোর্টফোলিও ও প্রজেক্ট ইমপ্যাক্ট"}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mt-1">
                    {isEnglish ? "Featured Projects & Practical Case Studies" : "বাস্তবায়িত প্রজেক্ট ও কেস স্টাডি"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEnglish 
                      ? "Representative work across multi-channel media buying, server-side CAPI tracking, and automated growth funnels."
                      : "মেটা ও গুগল বিজ্ঞাপন, সার্ভার-সাইড ট্র্যাকিং এবং গ্রোথ ফানেলের বাস্তবমুখী কাজ।"}
                  </p>
                </div>

                <div className="space-y-4">
                  {member.featuredProjects.map((proj, pIdx) => {
                    const isVerified = proj.type === "verified"

                    return (
                      <Card
                        key={pIdx}
                        className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 hover:border-cyan-500/60 transition-all shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                isVerified
                                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                  : "bg-blue-500/10 text-blue-500 border-blue-500/30"
                              }`}>
                                {isEnglish ? proj.typeLabel : (proj.typeLabelBn || proj.typeLabel)}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {isEnglish ? proj.industry : (proj.industryBn || proj.industry)}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-foreground">
                              {isEnglish ? proj.title : (proj.titleBn || proj.title)}
                            </h4>
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                              {isEnglish ? proj.role : (proj.roleBn || proj.role)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                          {isEnglish ? proj.description : (proj.descriptionBn || proj.description)}
                        </p>

                        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground dark:text-white">
                            {isEnglish ? "Key Highlight / Result:" : "মূল অর্জন / ফলাফল:"}
                          </span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {isEnglish ? proj.keyHighlight : (proj.keyHighlightBn || proj.keyHighlight)}
                          </span>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 7. Professional Strengths & Business Impact */}
            {member.strengths && member.strengths.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border/70">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  {isEnglish ? "Core Strategic Strengths" : "পেশাদার শক্তি ও ব্যবসায়িক প্রভাব"}
                </h3>
                <div className="space-y-2.5">
                  {(isEnglish ? member.strengths : (member.strengthsBn || member.strengths)).map((strength, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-secondary/30 border border-border/60 flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-foreground dark:text-slate-100 font-medium">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Consultation Schedule CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-base font-bold text-foreground">
                  {isEnglish ? "Book a Strategy Consultation" : "সরাসরি স্ট্র্যাটেজি সেশন বুক করুন"}
                </h4>
                <p className="text-xs text-muted-foreground dark:text-slate-300">
                  {isEnglish
                    ? "Schedule an in-depth session on advertising ROI, conversion tracking architecture, or AI automation."
                    : "বিজ্ঞাপন আরওআই, সার্ভার-সাইড ট্র্যাকিং আর্কিটেকচার কিংবা এআই অটোমেশন নিয়ে বিস্তারিত আলোচনা করুন।"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button asChild className="gradient-primary text-white rounded-xl shadow-md cursor-pointer">
                  <Link href="/contact">
                    <span>{isEnglish ? "Contact Agency" : "যোগাযোগ করুন"}</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-xl border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer">
                  <a
                    href={`https://wa.me/8801518961899?text=${encodeURIComponent(member.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>WhatsApp</span>
                  </a>
                </Button>
              </div>
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

                  {/* Card Photo Banner */}
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

                    {/* View Profile Indicator */}
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
