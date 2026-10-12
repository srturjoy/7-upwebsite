"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

const posts = [
  {
    title: "10 Facebook Ads Strategies That Actually Work in 2024",
    titleBn: "২০২৪ সালে কার্যকর ১০টি ফেসবুক বিজ্ঞাপন কৌশল",
    excerpt: "Learn the proven Facebook advertising strategies that top brands are using to maximize their ROI and reach their target audience effectively.",
    excerptBn: "শীর্ষ ব্র্যান্ডগুলি তাদের ROI সর্বাধিক করতে এবং তাদের টার্গেট অডিয়েন্সে কার্যকরভাবে পৌঁছাতে যে প্রমাণিত ফেসবুক বিজ্ঞাপন কৌশল ব্যবহার করছে তা শিখুন।",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    date: "Mar 15, 2024",
    dateBn: "১৫ মার্চ, ২০২৪",
    readTime: "8 min read",
    readTimeBn: "৮ মিনিট পড়ুন",
    category: "Social Media",
    categoryBn: "সোশ্যাল মিডিয়া",
    href: "/blog",
  },
  {
    title: "The Complete Guide to SEO in 2024",
    titleBn: "২০২৪ সালে SEO এর সম্পূর্ণ গাইড",
    excerpt: "Everything you need to know about search engine optimization, from keyword research to technical SEO and link building.",
    excerptBn: "সার্চ ইঞ্জিন অপ্টিমাইজেশন সম্পর্কে আপনার যা জানা দরকার সবকিছু, কীওয়ার্ড রিসার্চ থেকে টেকনিক্যাল SEO এবং লিংক বিল্ডিং পর্যন্ত।",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    date: "Mar 10, 2024",
    dateBn: "১০ মার্চ, ২০২৪",
    readTime: "12 min read",
    readTimeBn: "১২ মিনিট পড়ুন",
    category: "SEO",
    categoryBn: "এসইও",
    href: "/blog",
  },
  {
    title: "How AI is Transforming Digital Marketing",
    titleBn: "কিভাবে AI ডিজিটাল মার্কেটিংকে রূপান্তরিত করছে",
    excerpt: "Discover how artificial intelligence is revolutionizing the way businesses approach marketing and customer engagement.",
    excerptBn: "আবিষ্কার করুন কিভাবে কৃত্রিম বুদ্ধিমত্তা ব্যবসাগুলি মার্কেটিং এবং গ্রাহক এনগেজমেন্টে যেভাবে অ্যাপ্রোচ করে তা বিপ্লব ঘটাচ্ছে।",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    date: "Mar 5, 2024",
    dateBn: "৫ মার্চ, ২০২৪",
    readTime: "6 min read",
    readTimeBn: "৬ মিনিট পড়ুন",
    category: "AI & Technology",
    categoryBn: "AI ও প্রযুক্তি",
    href: "/blog",
  },
]

export function BlogPreview() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
              {isEnglish ? "From Our Blog" : "আমাদের ব্লগ থেকে"}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {isEnglish ? "Latest Marketing Insights" : "সর্বশেষ মার্কেটিং ইনসাইট"}
            </h2>
          </div>
          <Button asChild variant="outline" className="group hover:shadow-lg transition-all duration-300">
            <Link href="/blog">
              {isEnglish ? "View All Articles" : "সব আর্টিকেল দেখুন"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </ScrollReveal>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8"
        >
          {posts.map((post, index) => (
            <motion.div key={post.title} variants={fadeInUp}>
              <Link
                href={post.href}
                className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 hover:border-cyan-500/60 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 h-full bg-card"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                  <div className="absolute -top-10 -right-10 w-28 sm:w-36 h-28 sm:h-36 bg-cyan-500/20 rounded-full blur-2xl" />
                </div>
                <div className="aspect-[3/2] overflow-hidden relative rounded-t-2xl sm:rounded-t-3xl">
                  <Image
                    src={post.image}
                    alt={isEnglish ? post.title : post.titleBn}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6 relative justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
                      <span className="inline-flex items-center rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                        {isEnglish ? post.category : post.categoryBn}
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {isEnglish ? post.date : post.dateBn}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-base lg:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {isEnglish ? post.title : post.titleBn}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-muted-foreground dark:text-slate-300 text-[11px] sm:text-xs lg:text-sm leading-snug sm:leading-relaxed line-clamp-2 flex-1">
                      {isEnglish ? post.excerpt : post.excerptBn}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground dark:text-slate-300 font-medium">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500" />
                      {isEnglish ? post.readTime : post.readTimeBn}
                    </span>
                    <span className="text-[11px] sm:text-xs lg:text-sm font-semibold text-primary dark:text-cyan-400 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                      {isEnglish ? "Read" : "পড়ুন"}
                      <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
