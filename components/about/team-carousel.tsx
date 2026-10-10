"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Siddiqur Rahman Turjoy",
    role: "Founder & CEO",
    titles: "Digital Marketer | Facebook, Google & YouTube Ads Expert | Business Analyst | Software Engineer",
  },
  {
    name: "Rudra",
    role: "Head of Marketing",
    titles: "Marketing Strategy | Campaign Management | Brand Development",
  },
  {
    name: "Arif Hassan",
    role: "Lead Developer",
    titles: "Full-stack Development | Web Applications | Technical Architecture",
  },
  {
    name: "Nadia Khan",
    role: "Creative Director",
    titles: "Brand Design | Visual Identity | Creative Strategy",
  },
  {
    name: "Sarah Rahman",
    role: "SEO Specialist",
    titles: "Search Optimization | Content Strategy | Analytics",
  },
  {
    name: "Masum Ahmed",
    role: "Social Media Manager",
    titles: "Social Strategy | Community Management | Content Creation",
  },
]

// Duplicate for infinite scroll effect
const duplicatedTeam = [...team, ...team]

export function TeamCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed
      
      // Reset position when we've scrolled through half (the original items)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    // Pause on hover
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
  }, [])

  // Generate initials for avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div 
      ref={scrollRef}
      className="flex gap-6 overflow-x-hidden px-6"
      style={{ scrollBehavior: "auto" }}
    >
      {duplicatedTeam.map((member, index) => (
        <Card 
          key={`${member.name}-${index}`} 
          className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-3xl border-border/70 hover:border-cyan-500/60 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 bg-card overflow-hidden relative group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/15 rounded-full blur-2xl" />
          </div>
          <CardContent className="p-6 relative">
            {/* Initials Badge */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white text-xl font-bold mb-4 mx-auto group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
              {getInitials(member.name)}
            </div>
            
            {/* Name */}
            <h3 className="text-lg font-bold text-foreground text-center">
              {member.name}
            </h3>
            
            {/* Role */}
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-center mt-1">
              {member.role}
            </p>
            
            {/* Divider */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto my-4 rounded-full" />
            
            {/* Description/Titles */}
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {member.titles}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
