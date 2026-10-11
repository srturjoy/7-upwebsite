"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCircle2, Sparkles, ArrowRight, X } from "lucide-react"

export interface TeamMember {
  id: string
  name: string
  role: string
  titles: string
  description: string
  bio: string
  expertise: string[]
  strengths: string[]
  whatsappMessage: string
}

const team: TeamMember[] = [
  {
    id: "siddiqur-rahman-turjoy",
    name: "Siddiqur Rahman Turjoy",
    role: "Founder & CEO",
    titles: "Digital Marketer | Facebook, Google & YouTube Ads Expert | Business Analyst | Software Engineer",
    description: "Founder & Lead Strategist driving scalable digital growth through high-performance Meta & Google advertising, full-funnel tracking, and business systems.",
    bio: "Siddiqur Rahman Turjoy is the Founder & CEO of Boosting Agency BD. Combining advanced software engineering with performance marketing analytics, he has engineered profitable advertising architectures for 500+ businesses across Bangladesh and global markets. He specializes in high-ROI Meta & Google advertising campaigns, conversion-focused funnel design, and enterprise-grade server-side tracking (CAPI & GA4).",
    expertise: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads & YouTube Campaigns",
      "Performance Marketing Strategy",
      "Business Analytics & ROI Modeling",
      "Server-Side Tracking (CAPI & GA4)",
      "Software Engineering & MarTech",
      "Funnel Architecture & Conversion Optimization",
    ],
    strengths: [
      "Bridges technical software engineering with high-converting marketing strategies.",
      "Proven track record managing over ৳10M+ in profitable ad spend.",
      "Architects custom tracking and analytics systems for enterprise accuracy.",
      "Delivers end-to-end growth consulting with transparent performance metrics.",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to schedule a strategy consultation with Founder Siddiqur Rahman Turjoy.",
  },
  {
    id: "joynal-abedin-joy",
    name: "Joynal Abedin (Joy)",
    role: "Marketing Technology & Creative Lead",
    titles: "Website Development · Video Marketing · Marketing Technology · Conversion Tracking",
    description: "Combining creative marketing with technical expertise to build better digital experiences, engaging video content, and reliable tracking solutions.",
    bio: "Joynal Abedin (Joy) works across website development, video marketing, and marketing technology. His combined creative and technical capabilities help businesses establish a stronger digital presence through professional websites, engaging marketing videos, and reliable tracking implementations.",
    expertise: [
      "Website Development",
      "Marketing Video Production",
      "Video Marketing Strategy",
      "Marketing Technology Implementation",
      "Conversion Tracking Setup",
      "Digital Marketing Technical Support",
      "Website & Marketing Integration",
    ],
    strengths: [
      "Combines website development with creative marketing execution.",
      "Understands how website experiences and marketing content support customer acquisition.",
      "Can contribute to implementing tracking solutions that help businesses understand campaign performance.",
      "Bridges creative production and technical implementation.",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss website development and creative marketing solutions with Joynal Abedin (Joy).",
  },
  {
    id: "mohidul-islam-sojib",
    name: "Mohidul Islam Sojib",
    role: "Head of Performance Marketing & Strategy",
    titles: "Meta Ads Campaign Management · Performance Marketing Strategy · Advertising Campaign Analysis · Sales-Focused Campaign Planning",
    description: "Approaching advertising as a performance-driven business activity with sales-focused Meta campaigns and strategic market analysis.",
    bio: "Mohidul Islam Sojib specializes in sales-oriented thinking, marketing analysis, idea generation, and Meta advertising. His strength lies in approaching advertising as a performance-driven business activity—analyzing campaign performance, identifying opportunities, developing marketing ideas, and shaping strategies around business objectives.",
    expertise: [
      "Meta Ads Campaign Management",
      "Facebook & Instagram Advertising",
      "Performance Marketing Strategy",
      "Advertising Campaign Analysis",
      "Audience & Campaign Research",
      "Marketing Idea Generation",
      "Sales-Focused Campaign Planning",
      "Campaign Optimization & Scaling",
    ],
    strengths: [
      "Approaches advertising as a performance-driven, profit-focused business activity.",
      "In-depth campaign analysis that identifies revenue opportunities and eliminates ad waste.",
      "Generates sales-oriented marketing ideas and audience angles tailored to real business goals.",
      "Executes systematic campaign optimization to maximize return on ad spend.",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss performance marketing and Meta advertising strategy with Mohidul Islam Sojib.",
  },
  {
    id: "abir-islam-joy",
    name: "Abir Islam Joy",
    role: "Creative Media Buyer & Growth Strategist",
    titles: "Media Buying · Creative Ad Strategy · Meta Campaign Management · Audience Research",
    description: "Driving brand reach and qualified customer acquisition through high-converting creative media buying and strategic campaign execution.",
    bio: "Abir Islam Joy specializes in creative media buying, high-intent audience research, and multi-channel campaign management. He combines creative storytelling with aggressive media buying tactics to scale customer acquisition, lower acquisition costs, and maximize return on ad spend for growing brands.",
    expertise: [
      "Media Buying & Budget Allocation",
      "Creative Ad Strategy & Storytelling",
      "Meta Campaign Management",
      "Audience Research & Demographic Targeting",
      "Retargeting & Lookalike Modeling",
      "High-Converting Ad Hooks & Copy",
      "Campaign Scaling & ROAS Optimization",
    ],
    strengths: [
      "Finds high-converting creative angles and ad hooks that capture audience attention.",
      "Executes disciplined media buying and budget pacing to sustain profitability.",
      "Deep audience research that uncovers untapped customer segments.",
      "Integrates compelling visuals with sales-focused ad copy.",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss creative media buying and ad campaigns with Abir Islam Joy.",
  },
  {
    id: "azom",
    name: "Azom",
    role: "Performance Marketing & eCommerce Specialist",
    titles: "eCommerce Advertising · Performance Marketing · Conversion Optimization · Campaign Scaling",
    description: "Scaling businesses and eCommerce brands with data-backed advertising strategies, conversion optimization, and measurable ROI.",
    bio: "Azom specializes in eCommerce growth, DTC brand scaling, and conversion rate optimization. He leverages performance data to optimize sales funnels, scale Meta and social ad campaigns, and drive sustainable revenue growth for retail, digital, and eCommerce businesses.",
    expertise: [
      "eCommerce Advertising & Scaling",
      "Performance Marketing & DTC Growth",
      "Conversion Rate Optimization (CRO)",
      "Sales Funnel Architecture & Testing",
      "Ad Spend Efficiency & ROAS Maximization",
      "Campaign Analytics & Daily Performance Pacing",
      "Customer Retention & Repeat Purchase Strategy",
    ],
    strengths: [
      "Extensive experience scaling eCommerce stores with profitable and sustainable ROAS.",
      "Deep understanding of consumer psychology and checkout conversion drivers.",
      "Data-driven scaling protocols that maintain profitability at high daily ad spend.",
      "Continuous funnel testing to eliminate friction and increase average order value.",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss eCommerce advertising and performance scaling with Azom.",
  },
]

// Duplicate for infinite scroll effect
const duplicatedTeam = [...team, ...team]

export function TeamCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const isClosingViaHistoryRef = useRef(false)

  // Open modal and push history state so phone back button / swipe back gesture closes modal without leaving website
  const handleOpenMember = useCallback((member: TeamMember) => {
    setSelectedMember(member)
    if (typeof window !== "undefined") {
      isClosingViaHistoryRef.current = false
      window.history.pushState({ modal: "team-member", id: member.id }, "")
    }
  }, [])

  // Close modal and cleanly pop history state if it was pushed
  const handleCloseMember = useCallback(() => {
    setSelectedMember((current) => {
      if (!current) return null
      if (typeof window !== "undefined" && window.history.state?.modal === "team-member") {
        isClosingViaHistoryRef.current = true
        window.history.back()
      }
      return null
    })
  }, [])

  // Browser Back button / mobile swipe back gesture listener
  useEffect(() => {
    const handlePopState = () => {
      if (isClosingViaHistoryRef.current) {
        isClosingViaHistoryRef.current = false
        return
      }
      // If modal was open, close it so user stays on the website
      setSelectedMember(null)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Keyboard Backspace ("back speacch") and Escape key listener
  useEffect(() => {
    if (!selectedMember) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)

      if ((e.key === "Backspace" && !isInput) || e.key === "Escape") {
        e.preventDefault()
        handleCloseMember()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedMember, handleCloseMember])

  // Continuous marquee carousel scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = scrollContainer.scrollLeft || 0
    const scrollSpeed = 0.5

    const scroll = () => {
      // Pause automatic scroll when modal is active
      if (!selectedMember) {
        scrollPosition += scrollSpeed
        
        // Reset position when we've scrolled through half (the original items)
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    // Pause on mouse hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [selectedMember])

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
    <>
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6 py-4"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedTeam.map((member, index) => (
          <Card 
            key={`${member.id}-${index}`} 
            onClick={() => handleOpenMember(member)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleOpenMember(member)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View full details of ${member.name}, ${member.role}`}
            className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-3xl border-border/70 hover:border-cyan-500/80 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-cyan-500/20 bg-card overflow-hidden relative group cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
            </div>
            <CardContent className="p-6 relative flex flex-col h-full">
              {/* Initials Badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white text-xl font-bold mb-4 mx-auto group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                {getInitials(member.name)}
              </div>
              
              {/* Name */}
              <h3 className="text-lg font-bold text-foreground text-center group-hover:text-cyan-500 transition-colors">
                {member.name}
              </h3>
              
              {/* Role */}
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-center mt-1">
                {member.role}
              </p>
              
              {/* Card Description */}
              {member.description && (
                <p className="text-xs text-foreground/85 text-center leading-relaxed mt-2 mb-3">
                  &ldquo;{member.description}&rdquo;
                </p>
              )}

              {/* Divider */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto my-3 rounded-full" />
              
              {/* Expertise / Titles */}
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed font-medium mb-4 flex-grow">
                {member.titles}
              </p>

              {/* Interactive CTA Cue */}
              <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500">
                <span>View Full Profile</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Member Full Details Modal with History Back & Backspace Protection */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => { if (!open) handleCloseMember() }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border bg-card">
          {selectedMember && (
            <div className="relative">
              {/* Modal Header Banner */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-t-3xl overflow-hidden border-b border-border/40">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
                
                <button
                  type="button"
                  onClick={handleCloseMember}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close profile modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  {/* Large Avatar Badge */}
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl gradient-primary text-white text-3xl font-black shadow-xl shadow-cyan-500/30 flex-shrink-0">
                    {getInitials(selectedMember.name)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Boosting Agency BD Team</span>
                    </div>
                    <DialogHeader>
                      <DialogTitle className="text-2xl sm:text-3xl font-bold text-white">
                        {selectedMember.name}
                      </DialogTitle>
                      <DialogDescription className="text-sm sm:text-base font-medium text-cyan-300 mt-1">
                        {selectedMember.role}
                      </DialogDescription>
                    </DialogHeader>
                    <p className="text-xs text-slate-300 mt-2 font-medium">
                      {selectedMember.titles}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Professional Summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                    Professional Summary
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Key Expertise Tags */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                    Core Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.expertise.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="px-3 py-1.5 text-xs font-medium rounded-xl bg-secondary/80 hover:bg-secondary border border-border/60"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Strengths */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                    Professional Strengths & Impact
                  </h4>
                  <div className="space-y-2.5">
                    {selectedMember.strengths.map((strength, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Quotation */}
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60">
                  <p className="text-xs sm:text-sm italic text-foreground/90 text-center font-medium">
                    &ldquo;{selectedMember.description}&rdquo;
                  </p>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    Have questions or need growth assistance? Connect with our team directly.
                  </p>
                  <a
                    href={`https://wa.me/8801518961899?text=${encodeURIComponent(selectedMember.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-5 py-3 shadow-md shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer flex-shrink-0"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Consultation</span>
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

