"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export function FAQSection() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: isEnglish 
        ? "What digital marketing services does Boosting Agency BD offer?" 
        : "বুস্টিং এজেন্সি বিডি কী কী ডিজিটাল মার্কেটিং সেবা প্রদান করে?",
      answer: isEnglish
        ? "We specialize in high-ROAS Facebook & Instagram Ads boosting, Google Ads management (Search, Display, YouTube), TikTok & social media marketing, Conversion API (CAPI) & advanced tracking setup, custom website development, UI/UX design, SEO, and AI workflow automation."
        : "আমরা হাই-আরওআস ফেসবুক ও ইনস্টাগ্রাম অ্যাডস বুস্টিং, গুগল অ্যাডস ম্যানেজমেন্ট (সার্চ, ডিসপ্লে, ইউটিউব), টিকটক মার্কেটিং, কনভার্সন এপিআই (CAPI) ও অ্যাডভান্সড ট্র্যাকিং সেটআপ, কাস্টম ওয়েবসাইট ডেভেলপমেন্ট, এসইও এবং এআই অটোমেশনে বিশেষজ্ঞ।",
    },
    {
      question: isEnglish 
        ? "How do you set up and manage Facebook & Instagram advertising campaigns?" 
        : "ফেসবুক ও ইনস্টাগ্রাম অ্যাডস ক্যাম্পেইন কীভাবে সেটআপ ও ম্যানেজ করা হয়?",
      answer: isEnglish
        ? "Our process includes comprehensive audience research, competitor analysis, conversion tracking setup (Meta Pixel & CAPI), professional ad creative strategy, rigorous A/B testing, and continuous budget optimization to ensure lowest cost per result and maximum ROAS."
        : "আমাদের প্রসেসে রয়েছে অডিয়েন্স রিসার্চ, কম্পিটিটর অ্যানালাইসিস, পিক্সেল ও কনভার্সন এপিআই (CAPI) সেটআপ, প্রফেশনাল অ্যাড ক্রিয়েটিভ স্ট্র্যাটেজি, এ/বি টেস্ট এবং সিপিএ (CPA) কমাতে কন্টিনিউয়াস অপ্টিমাইজেশন।",
    },
    {
      question: isEnglish 
        ? "What is the recommended advertising budget and your agency service fee?" 
        : "রেকমেন্ডেড অ্যাড বাজেট এবং আপনাদের এজেন্সি সার্ভিস ফি কত?",
      answer: isEnglish
        ? "Advertising budgets vary based on your business goals, industry, and target market (starting from ৳10,000–৳20,000+ monthly ad spend for effective testing). Our agency service fees depend on the scope of work, campaign complexity, and management tier. Contact us for a custom quote tailored to your business."
        : "অ্যাড বাজেট আপনার ব্যবসার লক্ষ্য এবং খাতের ওপর নির্ভর করে (কার্যকর টেস্টের জন্য সাধারণত মাসিক কমপক্ষে ১০,০০০–২০,০০০+ টাকা অ্যাড বাজেট সুপারিশ করা হয়)। আমাদের সার্ভিস ফি কাজের পরিধি ও ম্যানেজমেন্ট টিয়ারের ওপর নির্ভর করে। সুনির্দিষ্ট কোটেশনের জন্য আমাদের সাথে যোগাযোগ করুন।",
    },
    {
      question: isEnglish 
        ? "How do you handle reporting, tracking, and campaign analytics?" 
        : "আপনারা রিপোর্টিং, ট্র্যাকিং এবং ক্যাম্পেইন অ্যানালিটিক্স কীভাবে পরিচালনা করেন?",
      answer: isEnglish
        ? "We provide transparent, real-time performance tracking using Meta Ads Manager insights, Google Analytics 4 (GA4), and custom reporting dashboards. You receive regular updates on key metrics including reach, conversions, cost per acquisition (CPA), and return on ad spend (ROAS)."
        : "আমরা মেটা অ্যাডস ম্যানেজার ইনসাইটস, গুগল অ্যানালিটিক্স ৪ (GA4) এবং কাস্টম ড্যাশবোর্ডের মাধ্যমে স্বচ্ছ ও রিয়েল-টাইম পারফরম্যান্স ট্র্যাকিং নিশ্চিত করি। আপনি কনভার্সন, সিপিএ এবং আরওআই (ROAS) এর নিয়মিত আপডেট পাবেন।",
    },
    {
      question: isEnglish 
        ? "What is the typical timeline for launching a campaign or website project?" 
        : "ক্যাম্পেইন লঞ্চ বা ওয়েবসাইট প্রজেক্টের সাধারণ সময়সীমা কত?",
      answer: isEnglish
        ? "Standard Meta or Google ad campaigns can be launched within 24 to 48 hours following strategy approval and asset collection. Custom website development, funnel setup, or advanced tracking implementations typically take 3 to 7 business days depending on project complexity."
        : "স্ট্র্যাটেজি চূড়ান্ত হওয়ার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে সাধারণ মেটা বা গুগল অ্যাড ক্যাম্পেইন লঞ্চ করা সম্ভব। কাস্টম ওয়েবসাইট ডেভেলপমেন্ট এবং ট্র্যাকিং সেটআপের জন্য সাধারণত ৩ থেকে ৭ কার্যদিবস সময় লাগে।",
    },
    {
      question: isEnglish 
        ? "Do you provide website development and SEO services?" 
        : "আপনারা কি ওয়েবসাইট ডেভেলপমেন্ট এবং এসইও সেবা দিয়ে থাকেন?",
      answer: isEnglish
        ? "Yes! We build high-speed, mobile-responsive, conversion-optimized e-commerce stores and business websites using Next.js and modern tech stacks. We also implement technical SEO, on-page optimization, and structured data to improve your search visibility."
        : "হ্যাঁ! আমরা নেক্সট.জেএস (Next.js) এবং আধুনিক প্রযুক্তির সাহায্যে দ্রুতগতির, মোবাইল-রেসপন্সিভ এবং কনভার্সন-অপ্টিমাইজড ই-কমার্স ও বিজনেস ওয়েবসাইট তৈরি করি। পাশাপাশি এসইও এবং স্ট্রাকচার্ড ডাটা অপ্টিমাইজেশন সেবা প্রদান করি।",
    },
    {
      question: isEnglish 
        ? "How can I get started with Boosting Agency BD?" 
        : "বুস্টিং এজেন্সি বিডি-র সাথে কাজ শুরু করার প্রক্রিয়া কী?",
      answer: isEnglish
        ? "Getting started is simple! You can click the WhatsApp button on our website, fill out our consultation contact form, or call us directly. Our growth experts will review your business goals and propose a tailored marketing strategy."
        : "শুরু করা খুবই সহজ! আপনি আমাদের ওয়েবসাইটের হোয়াটসঅ্যাপ বোতামে ক্লিক করতে পারেন, কনটাক্ট ফর্ম পূরণ করতে পারেন অথবা সরাসরি কল করতে পারেন। আমাদের এক্সপার্টরা আপনার ব্যবসার লক্ষ্য বিশ্লেষণ করে সুনির্দিষ্ট কৌশল প্রস্তাব করবেন।",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-3 border border-cyan-500/25">
            <HelpCircle className="h-4 w-4" />
            <span>{isEnglish ? "Frequently Asked Questions" : "সাধারণ জিজ্ঞাসা ও উত্তর"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground text-balance">
            {isEnglish ? "Everything You Need to Know About" : "আমাদের সেবা ও কার্যপদ্ধতি সম্পর্কে"}{" "}
            <span className="text-gradient">{isEnglish ? "Our Services & Workflow" : "আপনার যা জানা প্রয়োজন"}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {isEnglish
              ? "Clear answers about campaign setup, pricing, tracking, timelines, and how we help Bangladeshi businesses scale."
              : "ক্যাম্পেইন সেটআপ, বাজেট, ট্র্যাকিং, সময়সীমা এবং আমাদের সেবা সম্পর্কে স্বচ্ছ ধারণা পেতে নিচের প্রশ্নগুলো দেখতে পারেন।"}
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div key={index} variants={fadeInUp} custom={index}>
                <Card className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-card ${isOpen ? "border-cyan-500/60 shadow-lg shadow-cyan-500/10" : "border-border/80 hover:border-border"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {faq.question}
                    </span>
                    <div className={`h-8 w-8 rounded-xl bg-secondary flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 text-xs sm:text-sm text-muted-foreground dark:text-slate-300 leading-relaxed border-t border-border/40 mt-2">
                          {faq.answer}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* FAQ Contact / WhatsApp CTA */}
        <ScrollReveal className="mt-14 text-center">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">
                {isEnglish ? "Have a specific question about your business?" : "আপনার ব্যবসা নিয়ে কি কোনো সুনির্দিষ্ট প্রশ্ন আছে?"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {isEnglish
                  ? "Talk directly with our growth team on WhatsApp for an instant consultation and ad budget recommendation."
                  : "তাৎক্ষণিক পরামর্শ এবং অ্যাড বাজেট রিকমেন্ডেশনের জন্য আমাদের হোয়াটসঅ্যাপে সরাসরি কথা বলুন।"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg gap-2 cursor-pointer">
                  <a href="https://wa.me/8801700000000?text=Hello%20Boosting%20Agency%20BD,%20I%20have%20a%20question%20about%20your%20digital%20marketing%20services." target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    <span>{isEnglish ? "Chat on WhatsApp" : "হোয়াটসঅ্যাপে চ্যাট করুন"}</span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-bold gap-2 cursor-pointer">
                  <Link href="/contact">
                    <span>{isEnglish ? "Contact Us Form" : "কনটাক্ট ফর্ম পূরণ করুন"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
