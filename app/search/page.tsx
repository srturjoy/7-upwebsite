"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, ArrowRight, Globe, TrendingUp, Sparkles, BookOpen, Briefcase, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export default function SearchPage() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"
  const [searchQuery, setSearchQuery] = useState("")

  const searchableItems = [
    {
      title: isEnglish ? "Facebook & Instagram Ads" : "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন",
      category: isEnglish ? "Service" : "সেবা",
      url: "/services#social-ads",
      description: isEnglish ? "Precision-targeted social media advertising campaigns that drive real results." : "প্রকৃত ফলাফল চালনা করার জন্য টার্গেট অডিয়েন্সের কাছে সোশ্যাল মিডিয়া বিজ্ঞাপন।",
      icon: Sparkles
    },
    {
      title: isEnglish ? "Google Ads Management" : "গুগল বিজ্ঞাপন ম্যানেজমেন্ট",
      category: isEnglish ? "Service" : "সেবা",
      url: "/services#google-ads",
      description: isEnglish ? "Drive qualified traffic and conversions across Search, Display, and YouTube." : "সার্চ, ডিসপ্লে এবং ইউটিউব জুড়ে দক্ষভাবে পরিচালিত গুগল বিজ্ঞাপন।",
      icon: Search
    },
    {
      title: isEnglish ? "SEO Services" : "এসইও সেবা",
      category: isEnglish ? "Service" : "সেবা",
      url: "/services#seo",
      description: isEnglish ? "Improve search rankings and drive organic traffic with proven SEO strategies." : "প্রমাণিত এসইও কৌশল দিয়ে সার্চ র‍্যাংকিং উন্নত করুন এবং অর্গানিক ট্রাফিক আনুন।",
      icon: TrendingUp
    },
    {
      title: isEnglish ? "Web Design & Development" : "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
      category: isEnglish ? "Service" : "সেবা",
      url: "/services#web-design",
      description: isEnglish ? "Create stunning, high-converting websites that represent your brand." : "আপনার ব্র্যান্ডের প্রতিনিধিত্বকারী আকর্ষণীয় ও উচ্চ-কনভার্শন ওয়েবসাইট তৈরি করুন।",
      icon: Globe
    },
    {
      title: isEnglish ? "AI Automation for Business" : "ব্যবসার জন্য এআই অটোমেশন",
      category: isEnglish ? "Service" : "সেবা",
      url: "/services#ai-automation",
      description: isEnglish ? "Leverage AI to automate workflows, improve efficiency, and scale operations." : "ওয়ার্কফ্লো অটোমেট করতে এবং দক্ষতা বাড়াতে AI ব্যবহার করুন।",
      icon: Sparkles
    },
    {
      title: isEnglish ? "About Boosting Agency BD" : "বুস্টিং এজেন্সি বিডি সম্পর্কে",
      category: isEnglish ? "Company" : "কোম্পানি",
      url: "/about",
      description: isEnglish ? "Learn about Bangladesh's premier digital marketing agency founded by Siddiqur Rahman Turjoy." : "সিদ্দিকুর রহমান তুর্জয় কর্তৃক প্রতিষ্ঠিত বাংলাদেশের শীর্ষস্থানীয় ডিজিটাল মার্কেটিং এজেন্সি সম্পর্কে জানুন।",
      icon: Briefcase
    },
    {
      title: isEnglish ? "Our Portfolio & Case Studies" : "আমাদের পোর্টফোলিও ও কেস স্টাডি",
      category: isEnglish ? "Portfolio" : "পোর্টফোলিও",
      url: "/portfolio",
      description: isEnglish ? "Explore 150+ successful client campaigns and high-ROAS case studies." : "১৫০+ সফল ক্লায়েন্ট ক্যাম্পেইন এবং উচ্চ আরওএএস কেস স্টাডি দেখুন।",
      icon: Briefcase
    },
    {
      title: isEnglish ? "Digital Marketing Blog" : "ডিজিটাল মার্কেটিং ব্লগ",
      category: isEnglish ? "Blog" : "ব্লগ",
      url: "/blog",
      description: isEnglish ? "Read expert articles on Facebook ads, tracking, CAPI setup, and digital growth." : "ফেসবুক অ্যাডস, ট্র্যাকিং, সিপিআই সেটআপ এবং ডিজিটাল গ্রোথ নিয়ে বিশেষজ্ঞ আর্টিকেল পড়ুন।",
      icon: BookOpen
    },
    {
      title: isEnglish ? "Contact Us" : "যোগাযোগ করুন",
      category: isEnglish ? "Contact" : "যোগাযোগ",
      url: "/contact",
      description: isEnglish ? "Get in touch with our team in Mirpur-2, Dhaka or reach us on WhatsApp." : "মিরপুর-২, ঢাকা অফিসে আমাদের টিমের সাথে যোগাযোগ করুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন।",
      icon: ArrowRight
    }
  ]

  const filteredItems = searchQuery.trim() === "" 
    ? searchableItems 
    : searchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )

  return (
    <div className="min-h-screen py-16 lg:py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
          <Search className="h-4 w-4" />
          <span>{isEnglish ? "Site Search & Quick Finder" : "সাইট সার্চ ও কুইক ফাইন্ডার"}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
          {isEnglish ? "What are you looking for?" : "আপনি কি খুঁজছেন?"}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {isEnglish 
            ? "Search across all our services, portfolio projects, blog posts, and agency details." 
            : "আমাদের সকল সেবা, পোর্টফোলিও প্রজেক্ট, ব্লগ পোস্ট এবং এজেন্সির তথ্য এক জায়গায় খুঁজুন।"}
        </p>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={isEnglish ? "Search services, ads, SEO, web design..." : "সেবা, অ্যাডস, এসইও, ওয়েব ডিজাইন খুঁজুন..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-6 text-lg rounded-2xl border-primary/30 bg-card/50 backdrop-blur shadow-lg focus-visible:ring-primary"
          />
        </div>
      </ScrollReveal>

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {isEnglish ? `Search Results (${filteredItems.length})` : `সার্চ ফলাফল (${filteredItems.length})`}
          </h2>
          {searchQuery && (
            <Button variant="ghost" onClick={() => setSearchQuery("")} className="text-sm text-muted-foreground hover:text-foreground">
              {isEnglish ? "Clear Search" : "রিসেট করুন"}
            </Button>
          )}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-3xl border border-border/50">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isEnglish ? "No results found" : "কোনো ফলাফল পাওয়া যায়নি"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              {isEnglish ? "Try searching with different keywords like 'Facebook Ads', 'SEO', or 'Web Design'." : "'ফেসবুক অ্যাডস', 'এসইও' বা 'ওয়েব ডিজাইন' ইত্যাদি কীওয়ার্ড দিয়ে আবার চেষ্টা করুন।"}
            </p>
            <Button asChild className="gradient-primary text-primary-foreground">
              <Link href="/contact">
                {isEnglish ? "Contact Support" : "সরাসরি যোগাযোগ করুন"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <Link href={item.url} className="block h-full group">
                    <Card className="h-full bg-card/60 backdrop-blur-sm border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between">
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            <Icon className="h-3.5 w-3.5" />
                            {item.category}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
