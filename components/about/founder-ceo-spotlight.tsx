"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { TEAM_MEMBERS } from "@/data/team"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Globe, 
  ExternalLink, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle,
  Sparkles
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FounderCeoSpotlight() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const founder = TEAM_MEMBERS.find((m) => m.id === "siddiqur-rahman-turjoy") || TEAM_MEMBERS[0]

  const [photoUrl, setPhotoUrl] = useState<string>(
    founder.defaultImages[0]?.url || "/images/team/siddiqur-rahman-turjoy.webp"
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const saved = localStorage.getItem(`ba_team_images_${founder.id}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0]?.url) {
          setPhotoUrl(parsed[0].url)
        }
      }
    } catch {}
  }, [founder.id])

  const websiteUrl = founder.website || "https://turjoy.boostingagencyofficial.site/"

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
      <Card className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-card via-card to-secondary/30 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 relative z-10">
          {/* Photo Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] relative rounded-3xl overflow-hidden bg-slate-900 border border-border/80 shadow-2xl">
              <Image
                src={photoUrl}
                alt={founder.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30 text-xs font-semibold">
                  {isEnglish ? founder.role : (founder.roleBn || founder.role)}
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  {isEnglish ? founder.name : (founder.nameBn || founder.name)}
                </h3>
              </div>
            </div>
          </div>

          {/* Details & Biography Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{isEnglish ? "Founder & Executive Leadership" : "প্রতিষ্ঠাতা ও নির্বাহী নেতৃত্ব"}</span>
                </div>
                <Badge variant="outline" className="text-[11px] border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                  {isEnglish ? "Agency Head" : "এজেন্সি প্রধান"}
                </Badge>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {isEnglish ? founder.name : (founder.nameBn || founder.name)}
                </h2>
                <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 mt-1">
                  {isEnglish ? founder.role : (founder.roleBn || founder.role)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed mt-1">
                  {isEnglish ? founder.titles : (founder.titlesBn || founder.titles)}
                </p>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isEnglish ? founder.bio : (founder.bioBn || founder.bio)}
              </p>

              {/* Strengths & Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {(isEnglish ? founder.strengths : (founder.strengthsBn || founder.strengths)).slice(0, 4).map((str, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-secondary/40 border border-border/60 flex items-start gap-2.5 text-xs text-foreground/90 font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Personal Website + Profile + WhatsApp */}
            <div className="pt-6 border-t border-border/60 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 cursor-pointer h-11 px-5"
              >
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>{isEnglish ? "Visit Founder's Website" : "ফাউন্ডারের ওয়েবসাইট ভিজিট করুন"}</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-border/80 hover:bg-secondary text-xs sm:text-sm font-semibold cursor-pointer h-11 px-5"
              >
                <Link href={`/team/${founder.id}`} className="inline-flex items-center gap-2">
                  <span>{isEnglish ? "View Full Profile" : "সম্পূর্ণ প্রোফাইল দেখুন"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 text-xs sm:text-sm font-semibold cursor-pointer h-11 px-4"
              >
                <a
                  href={`https://wa.me/8801518961899?text=${encodeURIComponent(founder.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{isEnglish ? "WhatsApp Consultation" : "হোয়াটসঅ্যাপ পরামর্শ"}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
