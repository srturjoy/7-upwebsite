"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  {
    name: "Siddiqur Rahman Turjoy",
    role: "Founder & CEO",
    titles: "Digital Marketer | FB, Google & YouTube Ads Expert | Business Analyst | Software Engineer",
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
    name: "Karim Ahmed",
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
          className="flex-shrink-0 w-[300px] border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <CardContent className="p-6">
            {/* Initials Badge */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary text-primary-foreground text-xl font-bold mb-4 mx-auto">
              {getInitials(member.name)}
            </div>
            
            {/* Name */}
            <h3 className="text-lg font-semibold text-foreground text-center">
              {member.name}
            </h3>
            
            {/* Role */}
            <p className="text-primary text-sm font-medium text-center mt-1">
              {member.role}
            </p>
            
            {/* Divider */}
            <div className="w-12 h-0.5 bg-primary/30 mx-auto my-4" />
            
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
