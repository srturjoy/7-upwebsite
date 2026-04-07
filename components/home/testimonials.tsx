"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal } from "@/components/ui/motion"

const testimonials = [
  {
    content: "Boosting Agency BD delivered exceptional results for our North American expansion. Their data-driven approach to Facebook and Google Ads helped us achieve a 450% ROI within the first quarter. Highly recommend for any international business looking to scale.",
    contentBn: "বুস্টিং এজেন্সি বিডি আমাদের উত্তর আমেরিকান সম্প্রসারণের জন্য অসাধারণ ফলাফল দিয়েছে। ফেসবুক এবং গুগল বিজ্ঞাপনে তাদের ডেটা-চালিত পদ্ধতি আমাদের প্রথম প্রান্তিকেই ৪৫০% ROI অর্জনে সাহায্য করেছে।",
    author: "Michael Thompson",
    authorBn: "মাইকেল থম্পসন",
    role: "CEO, TechVentures Inc.",
    roleBn: "সিইও, টেকভেঞ্চার্স ইনক.",
    location: "New York, USA",
    locationBn: "নিউ ইয়র্ক, যুক্তরাষ্ট্র",
    rating: 5,
  },
  {
    content: "The team at Boosting Agency truly understands digital marketing at a global level. They managed our multi-market campaigns across Europe and delivered consistent results. Their communication and transparency are outstanding.",
    contentBn: "বুস্টিং এজেন্সির টিম সত্যিই বৈশ্বিক স্তরে ডিজিটাল মার্কেটিং বোঝে। তারা ইউরোপ জুড়ে আমাদের মাল্টি-মার্কেট ক্যাম্পেইন পরিচালনা করেছে এবং ধারাবাহিক ফলাফল দিয়েছে।",
    author: "Emma Richardson",
    authorBn: "এমা রিচার্ডসন",
    role: "Marketing Director, StyleHouse UK",
    roleBn: "মার্কেটিং ডিরেক্টর, স্টাইলহাউস ইউকে",
    location: "London, United Kingdom",
    locationBn: "লন্ডন, যুক্তরাজ্য",
    rating: 5,
  },
  {
    content: "Working with Boosting Agency from Ireland was seamless. Despite the time difference, their responsiveness was impeccable. Our e-commerce sales tripled within 8 months of partnering with them.",
    contentBn: "আয়ারল্যান্ড থেকে বুস্টিং এজেন্সির সাথে কাজ করা অত্যন্ত সহজ ছিল। সময়ের পার্থক্য সত্ত্বেও, তাদের সক্রিয়তা অপ্রতিদ্বন্দ্বী ছিল। তাদের সাথে অংশীদারিত্বের ৮ মাসের মধ্যে আমাদের ই-কমার্স বিক্রি তিনগুণ বেড়েছে।",
    author: "Patrick O'Brien",
    authorBn: "প্যাট্রিক ও'ব্রায়েন",
    role: "Founder, Celtic Digital Solutions",
    roleBn: "প্রতিষ্ঠাতা, সেল্টিক ডিজিটাল সলিউশনস",
    location: "Dublin, Ireland",
    locationBn: "ডাবলিন, আয়ারল্যান্ড",
    rating: 5,
  },
  {
    content: "As an Australian business expanding into Asian markets, Boosting Agency was the perfect partner. Their expertise in both regional and international digital marketing strategies is unmatched. Our brand awareness increased by 280%.",
    contentBn: "এশিয়ান বাজারে সম্প্রসারণকারী একটি অস্ট্রেলিয়ান ব্যবসা হিসেবে, বুস্টিং এজেন্সি ছিল আদর্শ অংশীদার। আঞ্চলিক এবং আন্তর্জাতিক উভয় ডিজিটাল মার্কেটিং কৌশলে তাদের দক্ষতা অতুলনীয়।",
    author: "Sarah Mitchell",
    authorBn: "সারা মিচেল",
    role: "CMO, AussieTech Global",
    roleBn: "সিএমও, অসিটেক গ্লোবাল",
    location: "Sydney, Australia",
    locationBn: "সিডনি, অস্ট্রেলিয়া",
    rating: 5,
  },
  {
    content: "Boosting Agency transformed our lead generation strategy completely. Their SEO expertise helped us rank on the first page for competitive keywords, resulting in a 340% increase in qualified leads.",
    contentBn: "বুস্টিং এজেন্সি আমাদের লিড জেনারেশন কৌশল সম্পূর্ণরূপে রূপান্তরিত করেছে। তাদের SEO দক্ষতা আমাদের প্রতিযোগিতামূলক কীওয়ার্ডে প্রথম পৃষ্ঠায় র‌্যাংক করতে সাহায্য করেছে।",
    author: "James Wilson",
    authorBn: "জেমস উইলসন",
    role: "Director, CanadaFirst Marketing",
    roleBn: "পরিচালক, কানাডাফার্স্ট মার্কেটিং",
    location: "Toronto, Canada",
    locationBn: "টরন্টো, কানাডা",
    rating: 5,
  },
  {
    content: "The AI automation solutions implemented by Boosting Agency revolutionized our customer service operations. Response time decreased by 75% while customer satisfaction increased to 98%. Truly innovative team.",
    contentBn: "বুস্টিং এজেন্সি দ্বারা বাস্তবায়িত AI অটোমেশন সমাধান আমাদের কাস্টমার সার্ভিস অপারেশনে বিপ্লব এনেছে। প্রতিক্রিয়া সময় ৭৫% কমেছে এবং গ্রাহক সন্তুষ্টি ৯৮%-এ বেড়েছে।",
    author: "David Chen",
    authorBn: "ডেভিড চেন",
    role: "CEO, Pacific Retail Group",
    roleBn: "সিইও, প্যাসিফিক রিটেইল গ্রুপ",
    location: "San Francisco, USA",
    locationBn: "সান ফ্রান্সিসকো, যুক্তরাষ্ট্র",
    rating: 5,
  },
  {
    content: "Outstanding Google Ads management and strategic planning. Boosting Agency helped our SaaS company reduce customer acquisition cost by 55% while increasing conversions. Their analytical approach is world-class.",
    contentBn: "অসামান্য গুগল বিজ্ঞাপন ব্যবস্থাপনা এবং কৌশলগত পরিকল্পনা। বুস্টিং এজেন্সি আমাদের SaaS কোম্পানিকে গ্রাহক অধিগ্রহণ খরচ ৫৫% কমাতে সাহায্য করেছে।",
    author: "Rebecca Anderson",
    authorBn: "রেবেকা অ্যান্ডারসন",
    role: "VP Marketing, CloudScale Solutions",
    roleBn: "ভিপি মার্কেটিং, ��্লাউডস্কেল সলিউশনস",
    location: "Manchester, United Kingdom",
    locationBn: "ম্যানচেস্টার, যুক্তরাজ্য",
    rating: 5,
  },
  {
    content: "Their content marketing and brand strategy elevated our company to industry leader status. Blog traffic increased by 620% and we now receive inbound leads daily. The ROI has been incredible.",
    contentBn: "তাদের কন্টেন্ট মার্কেটিং এবং ব্র্যান্ড কৌশল আমাদের কোম্পানিকে ইন্ডাস্ট্রি লিডার মর্যাদায় উন্নীত করেছে। ব্লগ ট্রাফিক ৬২০% বেড়েছে এবং আমরা এখন প্রতিদিন ইনবাউন্ড লিড পাই।",
    author: "Christopher Moore",
    authorBn: "ক্রিস্টোফার মুর",
    role: "Founder, FinanceFirst Advisory",
    roleBn: "প্রতিষ্ঠাতা, ফাইন্যান্সফার্স্ট অ্যাডভাইজরি",
    location: "Melbourne, Australia",
    locationBn: "মেলবোর্ন, অস্ট্রেলিয়া",
    rating: 5,
  },
]

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

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

  return (
    <section className="py-24 gradient-dark text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-wide">{t("testimonials")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {t("whatOurClientsSay")}
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            {t("testimonialsDescription")}
          </p>
        </ScrollReveal>
      </div>
      
      {/* Scrolling carousel */}
      <div 
        ref={scrollRef}
        className="mt-16 flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: "auto" }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card 
            key={`${testimonial.author}-${index}`} 
            className="flex-shrink-0 w-[320px] bg-primary-foreground/5 border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 hover:border-primary-foreground/20 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
          >
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-primary-foreground/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-primary-foreground/90 text-sm leading-relaxed mb-6">
                {`"${isEnglish ? testimonial.content : testimonial.contentBn}"`}
              </p>
              {/* Clean professional layout without images */}
              <div className="border-t border-primary-foreground/10 pt-4">
                <p className="font-semibold text-primary-foreground text-sm">
                  {isEnglish ? testimonial.author : testimonial.authorBn}
                </p>
                <p className="text-primary-foreground/60 text-xs mt-0.5">
                  {isEnglish ? testimonial.role : testimonial.roleBn}
                </p>
                <p className="text-primary-foreground/40 text-xs mt-1 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-foreground/40"></span>
                  {isEnglish ? testimonial.location : testimonial.locationBn}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
