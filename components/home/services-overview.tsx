"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Facebook, Search, Globe, Palette, Lightbulb, Video, Bot, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

const services = [
  {
    title: "Facebook & Instagram Ads",
    titleBn: "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন",
    description: "Reach your target audience with precision-targeted social media advertising campaigns.",
    descriptionBn: "সুনির্দিষ্ট-টার্গেটেড সোশ্যাল মিডিয়া বিজ্ঞাপন ক্যাম্পেইনের মাধ্যমে আপনার টার্গেট অডিয়েন্সে পৌঁছান।",
    icon: Facebook,
    href: "/services#social-ads",
  },
  {
    title: "Google Ads",
    titleBn: "গুগল বিজ্ঞাপন",
    description: "Drive qualified traffic and conversions with expertly managed Google Ads campaigns.",
    descriptionBn: "দক্ষভাবে পরিচালিত গুগল বিজ্ঞাপন ক্যাম্পেইনের মাধ্যমে কোয়ালিফাইড ট্রাফিক এবং কনভার্সন চালান।",
    icon: Search,
    href: "/services#google-ads",
  },
  {
    title: "SEO Services",
    titleBn: "এসইও সেবা",
    description: "Improve your search rankings and drive organic traffic with our proven SEO strategies.",
    descriptionBn: "আমাদের প্রমাণিত SEO কৌশলের মাধ্যমে আপনার সার্চ র‌্যাংকিং উন্নত করুন এবং অর্গানিক ট্রাফিক চালান।",
    icon: TrendingUp,
    href: "/services#seo",
  },
  {
    title: "Web Design & Development",
    titleBn: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
    description: "Create stunning, high-converting websites that represent your brand perfectly.",
    descriptionBn: "আকর্ষণীয়, উচ্চ-রূপান্তরকারী ওয়েবসাইট তৈরি করুন যা আপনার ব্র্যান্ডকে নিখুঁতভাবে উপস্থাপন করে।",
    icon: Globe,
    href: "/services#web-design",
  },
  {
    title: "Branding & Design",
    titleBn: "ব্র্যান্ডিং ও ডিজাইন",
    description: "Build a memorable brand identity that resonates with your target audience.",
    descriptionBn: "একটি স্মরণীয় ব্র্যান্ড পরিচয় তৈরি করুন যা আপনার টার্গেট অডিয়েন্সের সাথে অনুরণিত হয়।",
    icon: Palette,
    href: "/services#branding",
  },
  {
    title: "Digital Marketing Strategy",
    titleBn: "ডিজিটাল মার্কেটিং কৌশল",
    description: "Comprehensive strategies to achieve your business goals through digital channels.",
    descriptionBn: "ডিজিটাল চ্যানেলের মাধ্যমে আপনার ব্যবসায়িক লক্ষ্য অর্জনের জন্য সম্পূর্ণ কৌশল।",
    icon: Lightbulb,
    href: "/services#strategy",
  },
  {
    title: "Content & Video Production",
    titleBn: "কন্টেন্ট ও ভিডিও প্রোডাকশন",
    description: "Engaging content that tells your story and connects with your audience.",
    descriptionBn: "আকর্ষণীয় কন্টেন্ট যা আপনার গল্প বলে এবং আপনার অডিয়েন্সের সাথে সংযোগ করে।",
    icon: Video,
    href: "/services#content",
  },
  {
    title: "AI Automation",
    titleBn: "এআই অটোমেশন",
    description: "Leverage AI to automate workflows, improve efficiency, and scale your business.",
    descriptionBn: "ওয়ার্কফ্লো অটোমেট করতে, দক্ষতা উন্নত করতে এবং আপনার ব্যবসা স্কেল করতে AI ব্যবহার করুন।",
    icon: Bot,
    href: "/services#ai-automation",
  },
]

export function ServicesOverview() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  return (
    <section className="py-14 lg:py-20 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourServices")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t("servicesTitle")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("servicesDescription")}
          </p>
        </ScrollReveal>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              custom={index}
            >
              <Card className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border-border/70 hover:border-cyan-500/60 transition-all duration-500 card-3d h-full bg-card/95 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/15 flex flex-col justify-between">
                {/* 3D luminous border rim on hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-cyan-500/15 via-transparent to-blue-500/10" />
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-28 sm:w-36 h-28 sm:h-36 bg-cyan-500/20 rounded-full blur-2xl" />
                </div>
                
                <CardHeader className="relative p-3.5 sm:p-6 pb-2 sm:pb-3">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl gradient-primary text-white mb-3 sm:mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-xs sm:text-base lg:text-lg font-bold tracking-tight text-foreground line-clamp-2 leading-tight">
                    {isEnglish ? service.title : service.titleBn}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative p-3.5 sm:p-6 pt-0 sm:pt-0 flex flex-col justify-between flex-1">
                  <CardDescription className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                    {isEnglish ? service.description : service.descriptionBn}
                  </CardDescription>
                  <Link 
                    href={service.href}
                    className="mt-3 sm:mt-4 inline-flex items-center text-[11px] sm:text-xs lg:text-sm font-semibold text-primary hover:text-cyan-500 transition-colors group/link"
                  >
                    {t("learnMore")}
                    <ArrowRight className="ml-1 h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <ScrollReveal className="mt-12 text-center" delay={0.3}>
          <Button asChild size="lg" variant="outline" className="group hover:shadow-lg transition-all duration-300">
            <Link href="/services">
              {t("viewAllServices")}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
