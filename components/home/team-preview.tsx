"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle, Users } from "lucide-react"
import { TEAM_MEMBERS } from "@/data/team"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export function TeamPreview() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  // Show top members: Siddiqur Rahman (Founder & CEO) + 3 specialist members
  const featuredTeam = TEAM_MEMBERS.slice(0, 4)

  return (
    <section className="py-16 lg:py-24 ambient-light-bg dark:ambient-dark-bg relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none floating-orb" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none floating-orb" style={{ animationDelay: "5s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-bold mb-3 border border-cyan-500/25">
            <Users className="h-4 w-4" />
            <span>{isEnglish ? "Executive Leadership & Specialists" : "লিডারশিপ ও এক্সপার্ট টিম"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            {isEnglish ? "Meet the Experts Behind" : "যাঁদের হাত ধরে সফল হয়"}{" "}
            <span className="text-gradient">{isEnglish ? "Boosting Agency BD" : "বুস্টিং এজেন্সি বিডি"}</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEnglish
              ? "Our seasoned growth leaders, media buyers, tracking specialists, and technical architects dedicated to scaling your business."
              : "আমাদের অভিজ্ঞ মিডিয়া বায়ার, ট্র্যাকিং স্পেশালিস্ট এবং গ্রোথ স্ট্র্যাটেজিস্টরা সর্বদা প্রস্তুত আপনার ব্যবসাকে পরবর্তী ধাপে নিয়ে যেতে।"}
          </p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6"
        >
          {featuredTeam.map((member, index) => (
            <motion.div key={member.id} variants={fadeInUp} custom={index}>
              <Card className="group rounded-2xl sm:rounded-3xl border border-border/80 hover:border-cyan-500/75 transition-all duration-300 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 bg-card flex flex-col justify-between overflow-hidden relative h-full">
                {/* Photo Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                  <img
                    src={member.defaultImages[0]?.url || `/images/team/${member.id}.webp`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4">
                    <p className="text-[10px] sm:text-xs font-medium text-cyan-300 mb-0.5 truncate">
                      {isEnglish ? member.role : (member.roleBn || member.role)}
                    </p>
                    <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {isEnglish ? member.name : (member.nameBn || member.name)}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-3.5 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
                  <p className="text-[11px] sm:text-xs text-muted-foreground dark:text-slate-300 leading-relaxed line-clamp-2">
                    {isEnglish ? member.description : (member.descriptionBn || member.description)}
                  </p>

                  <div className="pt-2 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                    <Link href="/team" className="flex items-center justify-between w-full">
                      <span>{isEnglish ? "View Profile" : "প্রোফাইল দেখুন"}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8 py-6 font-bold text-sm sm:text-base gradient-primary text-white shadow-xl shadow-cyan-500/25 hover:scale-[1.02] transition-all group cursor-pointer">
            <Link href="/team">
              <span>{isEnglish ? "Meet All Team Members & Specialists" : "সকল এক্সপার্ট ও টিম মেম্বারদের দেখুন"}</span>
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
