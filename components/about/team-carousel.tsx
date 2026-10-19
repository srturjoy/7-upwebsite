"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageCircle, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  LayoutGrid, 
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { TEAM_MEMBERS, TeamMember } from "@/data/team"

// Exclude CEO & Founder (who is featured above in the Executive Leadership Spotlight)
export const SPECIALIST_MEMBERS = TEAM_MEMBERS.filter((m) => m.id !== "siddiqur-rahman-turjoy")

// Duplicate list for infinite smooth marquee
const duplicatedTeam = [...SPECIALIST_MEMBERS, ...SPECIALIST_MEMBERS]

export function TeamCarousel() {
  const router = useRouter()
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")
  const isHoveredRef = useRef(false)
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  // Helper to get active photo URL for member (genuine team image only)
  const getPhotoUrl = (member: TeamMember) => {
    return member.defaultImages[0]?.url || `/images/team/${member.id}.webp`
  }

  // Navigate to dedicated team member page
  const handleNavigateMember = (memberId: string) => {
    router.push(`/team/${memberId}`)
  }

  // Continuous marquee carousel scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || viewMode !== "carousel") return

    let animationId: number
    let scrollPosition = scrollContainer.scrollLeft || 0
    const scrollSpeed = 0.55

    const scroll = () => {
      if (isAutoScroll && !isHoveredRef.current) {
        scrollPosition += scrollSpeed
        
        // Reset position when we've scrolled through half (the original items)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      } else {
        scrollPosition = scrollContainer.scrollLeft
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => { isHoveredRef.current = true }
    const handleMouseLeave = () => { isHoveredRef.current = false }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isAutoScroll, viewMode])

  // Manual scroll controls
  const handleScrollManual = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return
    const amount = direction === "left" ? -340 : 340
    container.scrollBy({ left: amount, behavior: "smooth" })
  }

  // Pointer event tracking to distinguish deliberate swipe from click
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
  }

  const handlePointerUp = (memberId: string, e: React.PointerEvent) => {
    if (!pointerStartRef.current) {
      handleNavigateMember(memberId)
      return
    }

    const deltaX = Math.abs(e.clientX - pointerStartRef.current.x)
    const deltaY = Math.abs(e.clientY - pointerStartRef.current.y)
    const deltaTime = Date.now() - pointerStartRef.current.time

    if (deltaX < 12 && deltaY < 12 && deltaTime < 600) {
      handleNavigateMember(memberId)
    }
    pointerStartRef.current = null
  }

  // Generate initials for avatar placeholder
  const getInitials = (name: string) => {
    const cleanName = name.replace(/[\(\)]/g, "").trim()
    const parts = cleanName.split(/\s+/)
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  return (
    <div className="w-full">
      {/* Carousel Top Controls Bar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {isEnglish ? "Specialist Profiles" : "বিশেষজ্ঞ প্রোফাইলসমূহ"}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">
            ({TEAM_MEMBERS.length} {isEnglish ? "Experts · Dedicated Pages" : "বিশেষজ্ঞ · আলাদা পেইজ"})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-secondary/80 p-1 rounded-xl border border-border/60">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "carousel" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              title={isEnglish ? "Carousel View" : "ক্যারোসেল ভিউ"}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isEnglish ? "Carousel" : "ক্যারোসেল"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
              title={isEnglish ? "Grid View" : "গ্রিড ভিউ"}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isEnglish ? "All 4 Experts" : "সব ৪ জন"}</span>
            </button>
          </div>

          {/* Carousel Arrows */}
          {viewMode === "carousel" && (
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScrollManual("left")}
                className="h-8 w-8 rounded-xl border-border/80 hover:bg-secondary cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAutoScroll(!isAutoScroll)}
                className="h-8 w-8 rounded-xl border-border/80 hover:bg-secondary cursor-pointer"
                title={isAutoScroll ? "Pause auto-scroll" : "Resume auto-scroll"}
                aria-label={isAutoScroll ? "Pause auto-scroll" : "Resume auto-scroll"}
              >
                {isAutoScroll ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScrollManual("right")}
                className="h-8 w-8 rounded-xl border-border/80 hover:bg-secondary cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* RENDER VIEW 1: CAROUSEL */}
      {viewMode === "carousel" ? (
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-none select-none"
          style={{ scrollBehavior: "auto" }}
        >
          {duplicatedTeam.map((member, index) => (
            <Card 
              key={`${member.id}-${index}`} 
              onPointerDown={handlePointerDown}
              onPointerUp={(e) => handlePointerUp(member.id, e)}
              onClick={() => handleNavigateMember(member.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handleNavigateMember(member.id)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View dedicated page of ${isEnglish ? member.name : (member.nameBn || member.name)}`}
              className="flex-shrink-0 w-[290px] sm:w-[320px] rounded-3xl border-border/70 hover:border-cyan-500/80 transition-all duration-300 card-3d hover:shadow-2xl hover:shadow-cyan-500/20 bg-card overflow-hidden relative group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex flex-col justify-between"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
              </div>

              {/* Card Photo Banner */}
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-900 flex items-center justify-center">
                {getPhotoUrl(member) ? (
                  <img
                    src={getPhotoUrl(member)}
                    alt={isEnglish ? member.name : (member.nameBn || member.name)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-cyan-400 text-3xl font-black">
                    {getInitials(member.name)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>

              <CardContent className="p-5 relative flex flex-col flex-grow justify-between">
                <div>
                  {/* Name */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-cyan-500 transition-colors">
                    {isEnglish ? member.name : (member.nameBn || member.name)}
                  </h3>

                  {/* Role */}
                  <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-1">
                    {isEnglish ? member.role : (member.roleBn || member.role)}
                  </p>
                  
                  {/* Card Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 line-clamp-2">
                    {isEnglish ? member.description : (member.descriptionBn || member.description)}
                  </p>

                  {/* Expertise / Titles */}
                  <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium mt-2 line-clamp-1">
                    {isEnglish ? member.titles : (member.titlesBn || member.titles)}
                  </p>
                </div>

                {/* Clean View Profile Indicator */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                  <span>{isEnglish ? "View Profile & Details" : "বিস্তারিত প্রোফাইল দেখুন"}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* RENDER VIEW 2: RESPONSIVE GRID (4 SPECIALIST EXPERTS) - 2 Columns on Mobile */
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {SPECIALIST_MEMBERS.map((member) => (
              <Card 
                key={member.id} 
                onClick={() => handleNavigateMember(member.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleNavigateMember(member.id)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View dedicated page of ${isEnglish ? member.name : (member.nameBn || member.name)}`}
                className="rounded-2xl sm:rounded-3xl border-border/70 hover:border-cyan-500/80 transition-all duration-300 card-3d hover:shadow-2xl hover:shadow-cyan-500/20 bg-card overflow-hidden relative group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 flex flex-col justify-between"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
                </div>

                {/* Card Photo Banner */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                  <img
                    src={getPhotoUrl(member)}
                    alt={isEnglish ? member.name : (member.nameBn || member.name)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                <CardContent className="p-3 sm:p-5 relative flex flex-col flex-grow justify-between">
                  <div>
                    {/* Name */}
                    <h3 className="text-xs sm:text-base font-bold text-foreground group-hover:text-cyan-500 transition-colors line-clamp-1">
                      {isEnglish ? member.name : (member.nameBn || member.name)}
                    </h3>

                    {/* Role */}
                    <p className="text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5 truncate">
                      {isEnglish ? member.role : (member.roleBn || member.role)}
                    </p>
                    
                    {/* Card Description */}
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-snug sm:leading-relaxed mt-1 sm:mt-2 line-clamp-2">
                      {isEnglish ? member.description : (member.descriptionBn || member.description)}
                    </p>

                    {/* Expertise / Titles */}
                    <p className="text-[9px] sm:text-[11px] text-slate-500 dark:text-slate-300 leading-snug font-medium mt-1 line-clamp-1">
                      {isEnglish ? member.titles : (member.titlesBn || member.titles)}
                    </p>
                  </div>

                  {/* Clean View Profile Indicator */}
                  <div className="pt-2 sm:pt-3 border-t border-border/50 flex items-center justify-between text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors mt-2 sm:mt-3">
                    <span className="truncate">{isEnglish ? "Details" : "বিস্তারিত"}</span>
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1 shrink-0 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
