"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// The 5 official high-resolution uploaded images (1254x1254)
const OFFICIAL_HERO_IMAGES = [
  {
    id: "hero-slide-1",
    url: "/hero/hero-slide-1.png",
    title: "Meta Ads & Creative AI Optimization",
    badge: "10X Growth",
  },
  {
    id: "hero-slide-2",
    url: "/hero/hero-slide-2.png",
    title: "Laser Targeted Audience Boosting",
    badge: "Audience AI",
  },
  {
    id: "hero-slide-3",
    url: "/hero/hero-slide-3.png",
    title: "High-ROI Performance Marketing",
    badge: "Scale 10X",
  },
  {
    id: "hero-slide-4",
    url: "/hero/hero-slide-4.png",
    title: "Conversion Tracking & Ad Creatives",
    badge: "Analytics",
  },
  {
    id: "hero-slide-5",
    url: "/hero/hero-slide-5.png",
    title: "E-Commerce Digital Revenue Scale",
    badge: "Revenue Boost",
  },
]

interface HeroImageCarouselProps {
  mousePosition?: { x: number; y: number }
  isHovering?: boolean
}

export function HeroImageCarousel({ isHovering = false }: HeroImageCarouselProps) {
  const [images, setImages] = useState<Array<{ id: string; url: string; title?: string; badge?: string }>>(
    OFFICIAL_HERO_IMAGES
  )
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isLocalHovered, setIsLocalHovered] = useState<boolean>(false)

  // Fetch verified hero images from manifest if available, fallback to OFFICIAL_HERO_IMAGES
  useEffect(() => {
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.customImages && Array.isArray(data.customImages) && data.customImages.length > 0) {
          setImages(
            data.customImages.map((url: string, idx: number) => ({
              id: `hero-slide-${idx + 1}`,
              url,
              title: `Hero Slide ${idx + 1}`,
              badge: "High Quality",
            }))
          )
        }
      })
      .catch(() => {
        // Fallback to official images
        setImages(OFFICIAL_HERO_IMAGES)
      })
  }, [])

  // Auto-slide every 3.5s when not hovered
  useEffect(() => {
    if (images.length <= 1 || isHovering || isLocalHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [images.length, isHovering, isLocalHovered])

  const currentImage = images[currentIndex] || images[0] || OFFICIAL_HERO_IMAGES[0]

  return (
    <div
      className="relative rounded-3xl overflow-hidden aspect-square w-full max-w-[520px] mx-auto bg-slate-950 border border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_-10px_rgba(6,182,212,0.25)] group/carousel select-none transition-all duration-300"
      onMouseEnter={() => setIsLocalHovered(true)}
      onMouseLeave={() => setIsLocalHovered(false)}
    >
      {/* Animated Image Slides — Razor-sharp with zero dark overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.url + currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Pure, crisp, high-definition image rendering */}
          <img
            src={currentImage.url}
            alt={currentImage.title || "Boosting Agency BD"}
            className="w-full h-full object-cover object-center select-none"
            style={{
              imageRendering: "-webkit-optimize-contrast",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Top Slide Counter Badge (Minimalist & Polished) */}
      <div className="absolute top-3.5 right-3.5 z-20 pointer-events-auto">
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Manual Navigation Arrows (Appear smoothly on hover) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex((prev) => (prev + 1) % images.length)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Bottom Minimalist Dots Indicator */}
      <div className="absolute bottom-3.5 inset-x-0 z-20 flex justify-center pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-cyan-400 shadow-sm shadow-cyan-400"
                  : "w-2 bg-white/40 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
