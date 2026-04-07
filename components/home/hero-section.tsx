"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

// Distant Particle Network - Clean, subtle, far from content
function DistantParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      pulseSpeed: number
      pulseOffset: number
      color: string
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      initParticles()
    }

    const initParticles = () => {
      // Fewer, smaller particles for subtle effect
      const particleCount = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 25000)
      particles = []
      
      const colors = [
        "rgba(59, 130, 246, ", // Cool blue
        "rgba(96, 165, 250, ", // Light blue
        "rgba(147, 197, 253, ", // Soft blue
        "rgba(251, 191, 193, ", // Very faint pink
        "rgba(254, 215, 170, ", // Very faint orange
      ]
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.15, // Slower drift
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 1.5 + 0.5, // Smaller
          opacity: Math.random() * 0.25 + 0.1, // More subtle
          pulseSpeed: Math.random() * 0.008 + 0.004, // Slower pulse
          pulseOffset: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.offsetWidth
        if (particle.x > canvas.offsetWidth) particle.x = 0
        if (particle.y < 0) particle.y = canvas.offsetHeight
        if (particle.y > canvas.offsetHeight) particle.y = 0

        const pulsingOpacity =
          particle.opacity * (0.6 + 0.4 * Math.sin(time * particle.pulseSpeed + particle.pulseOffset))

        // Soft glowing particle
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        )
        gradient.addColorStop(0, `${particle.color}${pulsingOpacity})`)
        gradient.addColorStop(1, `${particle.color}0)`)

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Very subtle connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const lineOpacity = (1 - distance / 100) * 0.08
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(59, 130, 246, ${lineOpacity})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}

// Typewriter Animation Component
function TypewriterText({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000

    if (!isDeleting && currentText === currentWord) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && currentText === "") {
      // Move to next word
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <span 
      className="relative"
      style={{
        // Prevent blurry text during animations
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(value.replace(/\D/g, ""))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.floor(increment * step), numericValue)
      
      if (value.includes("M")) {
        setDisplayValue(`${(current / 1000000).toFixed(current >= 1000000 ? 0 : 1)}M`)
      } else if (value.includes("+")) {
        setDisplayValue(`${current}+`)
      } else if (value.includes("%")) {
        setDisplayValue(`${current}%`)
      } else {
        setDisplayValue(current.toString())
      }

      if (step >= steps) {
        setDisplayValue(value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <p ref={ref} className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
      {displayValue}
      {suffix}
    </p>
  )
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef} 
      className="relative overflow-hidden min-h-[90vh] bg-background"
    >
      {/* Clean white-to-light-gray gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      {/* Distant particle network - far from content */}
      <DistantParticleNetwork />
      
      {/* Very subtle ambient glow - far corners only */}
      <div 
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
        }}
      />
      <div 
        className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251, 191, 193, 0.05) 0%, transparent 70%)",
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content with High Contrast */}
          <div 
            className="max-w-2xl"
            style={{
              transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
              transition: "transform 0.4s ease-out",
              // Prevent blurry text during transforms
              WebkitFontSmoothing: "antialiased",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              {t("heroTagline")}
            </div>
            
            {/* Main Heading - Deep black with dynamic typewriter effect */}
            <h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance"
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                textRendering: "optimizeLegibility",
              }}
            >
              <span className="text-slate-900 dark:text-slate-100">
                {t("heroTitle1")}{" "}
              </span>
              <span className="relative inline-block min-w-[200px] sm:min-w-[280px] text-blue-600 dark:text-blue-400">
                <TypewriterText 
                  words={
                    isEnglish 
                      ? ["Data-Driven Marketing", "SEO Optimization", "Paid Ads", "Social Media", "AI Automation"]
                      : ["ডেটা-চালিত মার্কেটিং", "এসইও অপটিমাইজেশন", "পেইড বিজ্ঞাপন", "সোশ্যাল মিডিয়া", "এআই অটোমেশন"]
                  } 
                />
                <span 
                  className="absolute -inset-2 rounded-lg -z-10 opacity-20 blur-xl"
                  style={{ background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" }}
                />
              </span>
            </h1>
            
            {/* Subheading - High contrast for legibility */}
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
              {t("heroDescription")}
            </p>
            
            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 group relative overflow-hidden"
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center">
                    {t("getFreeConsultation")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Link href="/portfolio">
                  <Play className="mr-2 h-4 w-4" />
                  {t("viewOurWork")}
                </Link>
              </Button>
            </div>
            
            {/* Stats with Premium Glassmorphism - Responsive */}
            <div 
              className="mt-10 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-8 p-4 sm:p-6 -ml-2 sm:-ml-6 rounded-2xl relative overflow-hidden bg-white/90 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-slate-700/50"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
                transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                transition: "transform 0.4s ease-out",
              }}
            >
              {/* Glass refraction highlight - Light mode only */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent rounded-t-2xl dark:from-slate-700/20" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 dark:via-blue-500/30 to-transparent" />
              
              <div className="text-center relative">
                <AnimatedCounter value="500+" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">{t("happyClients")}</p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-600 to-transparent" />
              <div className="text-center relative">
                <AnimatedCounter value="95%" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">{t("clientRetention")}</p>
              </div>
              <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-600 to-transparent" />
              <div className="text-center relative">
                <AnimatedCounter value="10M+" />
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">{t("adSpendManaged")}</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image with 3D Effects and Data Visualization */}
          <div 
            className="relative lg:ml-auto"
            style={{
              perspective: "1200px",
              transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <div 
              className="relative aspect-square w-full max-w-lg mx-auto"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                transformStyle: "preserve-3d",
                transform: isHovering 
                  ? `rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)`
                  : "rotateY(0deg) rotateX(0deg)",
                transition: "transform 0.4s ease-out",
              }}
            >
              {/* Soft shadow beneath laptop */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-8 rounded-full"
                style={{
                  background: "radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)",
                  transform: "translateZ(-20px) translateY(20px)",
                  filter: "blur(8px)",
                }}
              />
              
              {/* Floating Data Visualization Points */}
              <div 
                className="absolute -top-8 left-8 w-4 h-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                  transform: `translateZ(40px) translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px)`,
                  transition: "transform 0.5s ease-out",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
              <div 
                className="absolute top-20 -right-4 w-3 h-3 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
                  transform: `translateZ(50px) translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                  transition: "transform 0.6s ease-out",
                  animation: "float 4s ease-in-out infinite 0.5s",
                }}
              />
              <div 
                className="absolute bottom-32 -left-6 w-5 h-5 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)",
                  boxShadow: "0 0 18px rgba(251, 146, 60, 0.3)",
                  transform: `translateZ(35px) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                  transition: "transform 0.55s ease-out",
                  animation: "float 3.5s ease-in-out infinite 1s",
                }}
              />
              
              {/* Light trails around laptop */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: "translateZ(15px)" }}
              >
                <defs>
                  <linearGradient id="lightTrail1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                    <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
                  </linearGradient>
                  <linearGradient id="lightTrail2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                    <stop offset="50%" stopColor="rgba(16, 185, 129, 0.25)" />
                    <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M30,300 Q100,200 200,220 T380,150"
                  stroke="url(#lightTrail1)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                >
                  <animate attributeName="opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
                </path>
                <path
                  d="M400,350 Q350,280 280,300 T150,250"
                  stroke="url(#lightTrail2)"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                >
                  <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
                </path>
              </svg>
              
              {/* Main Laptop Image */}
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  transform: "translateZ(25px)",
                  boxShadow: isHovering 
                    ? "0 40px 80px -20px rgba(0, 0, 0, 0.2), 0 20px 40px -20px rgba(59, 130, 246, 0.15)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  transition: "box-shadow 0.4s ease-out",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop"
                  alt="Digital marketing analytics dashboard"
                  width={800}
                  height={800}
                  className="relative rounded-3xl object-cover"
                  priority
                />
                {/* Perfect lighting overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at ${50 + mousePosition.x * 20}% ${30 + mousePosition.y * 20}%, rgba(255,255,255,0.15) 0%, transparent 50%),
                      linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, transparent 30%)
                    `,
                  }}
                />
              </div>
              
              {/* Revenue Growth Card - Premium Glassmorphism */}
              <div 
                className="absolute -bottom-6 -left-6 rounded-2xl p-4 group hover:scale-105 transition-all duration-300"
                style={{
                  transform: `translateZ(55px) translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)`,
                  transition: "transform 0.45s ease-out, scale 0.3s ease-out",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: `
                    0 12px 40px rgba(0, 0, 0, 0.08),
                    0 4px 12px rgba(0, 0, 0, 0.04),
                    inset 0 1px 0 rgba(255,255,255,1),
                    inset 0 -1px 0 rgba(0,0,0,0.02),
                    0 0 0 1px rgba(59, 130, 246, 0.05)
                  `,
                }}
              >
                {/* Glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl pointer-events-none" />
                {/* Glowing border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.2)" }} />
                
                <div className="relative flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">{isEnglish ? "Revenue Growth" : "রেভিনিউ বৃদ্ধি"}</p>
                    <p className="text-2xl font-bold text-blue-600">+247%</p>
                  </div>
                </div>
              </div>
              
              {/* Live Analytics Card */}
              <div 
                className="absolute -top-4 -right-4 rounded-xl p-3"
                style={{
                  transform: `translateZ(45px) translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px)`,
                  transition: "transform 0.5s ease-out",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.82) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.8)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,1)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" />
                  <span className="text-xs font-semibold text-slate-700">{isEnglish ? "Live Analytics" : "লাইভ অ্যানালিটিক্স"}</span>
                </div>
              </div>
              
              {/* Additional floating data point */}
              <div 
                className="absolute top-1/2 -right-8 rounded-lg px-3 py-2"
                style={{
                  transform: `translateZ(35px) translate(${mousePosition.x * 22}px, ${mousePosition.y * 22}px)`,
                  transition: "transform 0.55s ease-out",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold text-emerald-600">+18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
