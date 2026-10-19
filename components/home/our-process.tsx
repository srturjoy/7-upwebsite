"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Target, 
  Rocket, 
  LineChart, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  MessageCircle
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export function OurProcessSection() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const steps = [
    {
      number: "01",
      title: isEnglish ? "Discovery & Business Analysis" : "ডিসকভারি ও বিজনেস অ্যানালাইসিস",
      description: isEnglish
        ? "We analyze your target audience, competitors, historical ad performance, profit margins, and current sales funnels to formulate a high-ROAS growth blueprint."
        : "আমরা আপনার টার্গেট অডিয়েন্স, প্রতিযোগী, পূর্বের অ্যাড পারফরম্যান্স এবং প্রফিট মার্জিন বিশ্লেষণ করে তৈরি করি একটি সুনির্দিষ্ট গ্রোথ ব্লুপ্রিন্ট।",
      icon: Search,
    },
    {
      number: "02",
      title: isEnglish ? "Strategy & Planning" : "স্ট্র্যাটেজি ও মিডিয়া প্ল্যানিং",
      description: isEnglish
        ? "We design custom campaign structures, ad creative angles, audience targeting parameters, budget allocations, and conversion tracking architectures."
        : "আমরা সুনির্দিষ্ট ক্যাম্পেইন স্ট্রাকচার, অ্যাড ক্রিয়েটিভ অ্যাঙ্গেল, অডিয়েন্স টার্গেটিং এবং কনভার্সন ট্র্যাকিং আর্কিটেকচার ডিজাইন করি।",
      icon: Target,
    },
    {
      number: "03",
      title: isEnglish ? "Campaign Setup & Implementation" : "ক্যাম্পেইন সেটআপ ও ইমপ্লিমেন্টেশন",
      description: isEnglish
        ? "Professional Meta Ads Manager setup, Conversion API (CAPI) configuration, pixel verification, and high-converting ad copy deployment."
        : "প্রফেশনাল মেটা অ্যাডস ম্যানেজার সেটআপ, কনভার্সন এপিআই (CAPI) কনফিগারেশন, পিক্সেল ভেরিফিকেশন এবং হাই-কনভার্টিং অ্যাড কপি ডিপ্লয়মেন্ট।",
      icon: Rocket,
    },
    {
      number: "04",
      title: isEnglish ? "Tracking, Testing & Optimization" : "ট্র্যাকিং, এ/বি টেষ্টিং ও অপ্টিমাইজেশন",
      description: isEnglish
        ? "Continuous A/B testing of creatives and headlines, bid adjustments, CPA monitoring, and data-driven scaling of winning ad sets."
        : "ক্রিয়েটিভ ও হেডলাইনের কন্টিনিউয়াস এ/বি টেস্ট, বিড অ্যাডজাস্টমেন্ট, সিপিএ মনিটরিং এবং উইনিং অ্যাড সেটগুলোর ডেটা-ড্রাইভেন স্কেলিং।",
      icon: LineChart,
    },
    {
      number: "05",
      title: isEnglish ? "Reporting & Continuous Growth" : "স্বচ্ছ রিপোর্টিং ও কন্টিনিউয়াস গ্রোথ",
      description: isEnglish
        ? "Transparent performance dashboards, regular ROI reviews, and strategic scaling recommendations to maximize your monthly ad spend returns."
        : "স্বচ্ছ পারফরম্যান্স ড্যাশবোর্ড, নিয়মিত আরওআই রিভিউ এবং আপনার অ্যাড স্পেন্ড রিটার্ন সর্বোচ্চ করার জন্য স্ট্র্যাটেজিক সাজেশন।",
      icon: TrendingUp,
    },
  ]

  return (
    <section className="py-16 lg:py-24 ambient-light-bg dark:ambient-dark-bg relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none floating-orb" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none floating-orb" style={{ animationDelay: "3s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-3 border border-cyan-500/25">
            <ShieldCheck className="h-4 w-4" />
            <span>{isEnglish ? "Proven Step-by-Step Workflow" : "আমাদের প্রমাণিত কর্মপদ্ধতি"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {isEnglish ? "Our 5-Step Growth" : "আমাদের ৫-ধাপের"}{" "}
            <span className="text-gradient">{isEnglish ? "Execution Process" : "গ্রোথ এক্সিকিউশন প্রসেস"}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEnglish
              ? "A structured, data-backed agency methodology designed to eliminate guesswork and maximize return on ad spend (ROAS)."
              : "অনুমানের ওপর নির্ভর না করে ডেটা এবং প্রুভেন ফ্রেমওয়ার্কের মাধ্যমে আপনার ব্যবসার সেলস ও আরওআই নিশ্চিত করার সুশৃঙ্খল প্রক্রিয়া।"}
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={fadeInUp} custom={index}>
              <Card className="group relative rounded-2xl sm:rounded-3xl border border-border/80 hover:border-cyan-500/60 transition-all duration-300 card-3d bg-card/90 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 h-full flex flex-col justify-between overflow-hidden p-4 sm:p-6">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-500 dark:text-cyan-400">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-white shadow-md">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-border/40 text-[11px] font-semibold text-primary dark:text-cyan-400 flex items-center gap-1">
                  <span>{isEnglish ? "Step Verified" : "ভেরিফায়েড স্টেজ"}</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Process CTA */}
        <ScrollReveal className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl max-w-2xl mx-auto">
            <div className="text-left">
              <h4 className="font-bold text-base text-foreground">
                {isEnglish ? "Ready to launch your growth campaign?" : "আপনার গ্রোথ ক্যাম্পেইন শুরু করতে প্রস্তুত?"}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {isEnglish ? "Get a free audit and custom strategy call with our experts." : "আমাদের বিশেষজ্ঞদের সাথে ফ্রি কনসালটেশন নিন।"}
              </p>
            </div>
            <Button asChild className="gradient-primary text-white font-bold rounded-xl shadow-lg shrink-0">
              <Link href="/contact">
                {isEnglish ? "Book Free Consultation" : "ফ্রি কনসালটেশন নিন"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
