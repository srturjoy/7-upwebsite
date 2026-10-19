"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ShoppingCart, 
  Shirt, 
  Armchair, 
  GraduationCap, 
  Plane, 
  Sparkles, 
  Briefcase, 
  Store, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export function IndustriesWeServe() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const industries = [
    {
      title: isEnglish ? "E-commerce & Online Retail" : "ই-কমার্স ও অনলাইন রিটেইল",
      titleBn: "ই-কমার্স ও অনলাইন রিটেইল",
      description: isEnglish 
        ? "Scale online orders with high-ROAS Facebook & Instagram conversion campaigns and automated retargeting." 
        : "হিক-আরওয়াস ফেসবুক ও ইনস্টাগ্রাম কনভার্সন ক্যাম্পেইন এবং অটোমেটেড রিটার্গেটিংয়ের মাধ্যমে অনলাইন অর্ডার বৃদ্ধি করুন।",
      icon: ShoppingCart,
      href: "/portfolio?category=E-Commerce",
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: isEnglish ? "Fashion & Apparel" : "ফ্যাশন ও ক্লথিং ব্র্যান্ড",
      titleBn: "ফ্যাশন ও ক্লথিং ব্র্যান্ড",
      description: isEnglish 
        ? "Showcase clothing collections with stunning catalog ads, dynamic video creatives, and influencer marketing strategies." 
        : "স্টানিং ক্যাটালগ অ্যাড, ডায়নামিক ভিডিও ক্রিয়েটিভ এবং ইনফ্লুয়েন্সার মার্কেটিংয়ের মাধ্যমে ফ্যাশন কালেকশন প্রদর্শন করুন।",
      icon: Shirt,
      href: "/portfolio?category=Fashion",
      color: "from-pink-600 to-rose-500",
    },
    {
      title: isEnglish ? "Furniture & Home Décor" : "ফার্নিচার ও হোম ডেকোর",
      titleBn: "ফার্নিচার ও হোম ডেকোর",
      description: isEnglish 
        ? "Drive high-ticket furniture inquiries and showroom visits through targeted lead generation and retargeting ads." 
        : "টার্গেটেড লিড জেনারেশন ও রিটার্গেটিং অ্যাডসের মাধ্যমে হাই-টিকিট ফার্নিচার ইনকোয়ারি ও শোরুম ভিজিট বাড়ান।",
      icon: Armchair,
      href: "/portfolio?category=Furniture",
      color: "from-amber-600 to-orange-500",
    },
    {
      title: isEnglish ? "Education & Training" : "শিক্ষা ও ট্রেনিং ইনস্টিটিউট",
      titleBn: "শিক্ষা ও ট্রেনিং ইনস্টিটিউট",
      description: isEnglish 
        ? "Generate qualified student enrollments for coaching centers, universities, and online courses with precision ad targeting." 
        : "কোচিং সেন্টার, বিশ্ববিদ্যালয় এবং অনলাইন কোর্সের জন্য সঠিক অডিয়েন্স টার্গেটিংয়ের মাধ্যমে ছাত্র-ছাত্রী ভর্তি নিশ্চিত করুন।",
      icon: GraduationCap,
      href: "/portfolio?category=Education",
      color: "from-purple-600 to-indigo-500",
    },
    {
      title: isEnglish ? "Travel & Tourism" : "ট্রাভেল ও ট্যুরিজম",
      titleBn: "ট্রাভেল ও ট্যুরিজম",
      description: isEnglish 
        ? "Increase tour package bookings, visa processing leads, and hotel reservations with compelling promotional campaigns." 
        : "আকর্ষণীয় প্রমোশনাল ক্যাম্পেইনের মাধ্যমে ট্যুর প্যাকেজ বুকিং, ভিসা প্রসেসিং লিড এবং হোটেল রিজার্ভেশন বৃদ্ধি করুন।",
      icon: Plane,
      href: "/portfolio?category=Travel",
      color: "from-teal-600 to-emerald-500",
    },
    {
      title: isEnglish ? "Beauty & Personal Care" : "বিউটি ও পার্সোনাল কেয়ার",
      titleBn: "বিউটি ও পার্সোনাল কেয়ার",
      description: isEnglish 
        ? "Build brand loyalty and direct D2C sales for cosmetics, skincare, and wellness products across social platforms." 
        : "সোশ্যাল প্ল্যাটফর্মে কসমেটিকস, স্কিনকেয়ার এবং ওয়েলনেস পণ্যের জন্য ব্র্যান্ড লয়্যালটি ও ডিরেক্ট D2C সেলস তৈরি করুন।",
      icon: Sparkles,
      href: "/portfolio?category=Beauty",
      color: "from-rose-500 to-pink-500",
    },
    {
      title: isEnglish ? "Professional Services" : "প্রফেশনাল সার্ভিসেস",
      titleBn: "প্রফেশনাল সার্ভিসেস",
      description: isEnglish 
        ? "Acquire B2B clients, legal consultations, and agency retainers through authoritative Google Search and Meta lead ads." 
        : "অথোরেটিভ গুগল সার্চ ও মেটা লিড অ্যাডসের মাধ্যমে B2B ক্লায়েন্ট, আইনি পরামর্শ এবং এজেন্সি ক্লায়েন্ট অর্জন করুন।",
      icon: Briefcase,
      href: "/services#social-ads",
      color: "from-cyan-600 to-blue-600",
    },
    {
      title: isEnglish ? "Local Businesses" : "লোকাল বিজনেস ও শপ",
      titleBn: "লোকাল বিজনেস ও শপ",
      description: isEnglish 
        ? "Drive foot traffic and local customer inquiries for physical retail outlets, restaurants, and service providers." 
        : "ফিজিক্যাল রিটেইল আউটলেট, রেস্তোরাঁ এবং সার্ভিস প্রোভাইডারদের জন্য লোকাল কাস্টমার ইনকোয়ারি ও ভিজিট বাড়ান।",
      icon: Store,
      href: "/services",
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: isEnglish ? "B2B & Tech Companies" : "বিটুবি ও টেকনোলজি বিজনেস",
      titleBn: "বিটুবি ও টেকনোলজি বিজনেস",
      description: isEnglish 
        ? "Scale software, SaaS platforms, and tech enterprises with performance-driven acquisition funnels." 
        : "পারফরম্যান্স-ড্রাইভেন অ্যাকুইজিশন ফানেলের মাধ্যমে সফটওয়্যার, SaaS প্ল্যাটফর্ম এবং টেক এন্টারপ্রাইজ স্কেল করুন।",
      icon: Cpu,
      href: "/services#ai-automation",
      color: "from-blue-700 to-indigo-700",
    },
  ]

  return (
    <section className="py-16 lg:py-24 ambient-light-bg dark:ambient-dark-bg relative overflow-hidden">
      {/* Floating luminous orbs */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none floating-orb" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none floating-orb" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-3 border border-cyan-500/25">
            <ShieldCheck className="h-4 w-4" />
            <span>{isEnglish ? "Diverse Expertise" : "বিভিন্ন শিল্পে আমাদের অভিজ্ঞতা"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {isEnglish ? "Industries We" : "যেসব ইন্ডাস্ট্রিতে"}{" "}
            <span className="text-gradient">{isEnglish ? "Serve & Scale" : "আমরা কাজ করি"}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEnglish
              ? "We tailor performance marketing, Facebook boosting, tracking setup, and web solutions to the unique buying behavior and unit economics of each industry."
              : "আমরা প্রতিটি খাতের ক্রেতার আচরণ এবং বিজনেস মডেল বিশ্লেষণ করে তৈরি করি কাস্টমাইজড পারফরম্যান্স মার্কেটিং এবং ফেসবুক বুস্টিং স্ট্র্যাটেজি।"}
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6"
        >
          {industries.map((item, index) => (
            <motion.div key={item.title} variants={fadeInUp} custom={index}>
              <Card className="group relative rounded-2xl sm:rounded-3xl border border-border/80 hover:border-cyan-500/60 transition-all duration-300 card-3d bg-card shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 h-full flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <CardContent className="p-4 sm:p-6 flex flex-col justify-between flex-1 relative">
                  <div>
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.color} text-white mb-3 sm:mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-primary dark:text-cyan-400 hover:text-cyan-500 transition-colors group/link"
                    >
                      <span>{isEnglish ? "View Case Studies" : "কেস স্টাডি দেখুন"}</span>
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
