"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Building2, CheckCircle2 } from "lucide-react"
import { PortfolioContent } from "@/components/portfolio/portfolio-content"
import { RealCampaignPerformanceSection } from "@/components/home/real-campaign-performance"
import { useLanguage } from "@/lib/language-context"


export default function PortfolioPage() {
  const { language } = useLanguage()
  const isEnglish = language === "en"

  const stats = [
    { value: "49+", label: isEnglish ? "Verified Client Pages" : "যাচাইকৃত ক্লায়েন্ট পেজ" },
    { value: "5+", label: isEnglish ? "Core Business Sectors" : "প্রধান শিল্প খাত" },
    { value: "100%", label: isEnglish ? "Official Verified Links" : "অফিশিয়াল ভেরিফাইড লিংক" },
    { value: "24/7", label: isEnglish ? "Strategic Ad Support" : "কৌশলগত অ্যাড সাপোর্ট" },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background">
        <div className="absolute inset-0 gradient-primary opacity-5 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-4 border border-cyan-500/20">
              <ShieldCheck className="h-4 w-4" />
              <span>{isEnglish ? "Client Portfolio & Verified Work" : "ক্লায়েন্ট পোর্টফোলিও ও কাজের তালিকা"}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground text-balance">
              {isEnglish ? "Our Clients &" : "আমাদের ক্লায়েন্ট ও"}{" "}
              <span className="text-gradient">
                {isEnglish ? "Marketing Projects" : "মার্কেটিং প্রজেক্টসমূহ"}
              </span>
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-semibold text-primary">
              {isEnglish
                ? "Businesses We've Supported Across Different Industries"
                : "বিভিন্ন ইন্ডাস্ট্রিতে আমাদের সহায়তাপ্রাপ্ত ব্যবসাসমূহ"}
            </p>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {isEnglish
                ? "At Boosting Agency BD, we work with businesses across fashion, e-commerce, furniture, education, healthcare, travel, and other industries. Explore a selection of business pages and websites associated with our marketing work."
                : "বুস্টিং এজেন্সি বিডি-তে আমরা ফ্যাশন, ই-কমার্স, ফার্নিচার, শিক্ষা, স্বাস্থ্যসেবা, ট্রাভেল এবং অন্যান্য বিভিন্ন খাতের ব্যবসার সাথে কাজ করি। আমাদের মার্কেটিং কাজের সাথে যুক্ত বিজনেস পেজ ও ওয়েবসাইটগুলোর একটি নির্বাচিত তালিকা এখানে এক্সপ্লোর করুন।"}
            </p>
          </div>
        </div>
      </section>

      {/* Real Campaign Performance Case Studies with Filter Tabs */}
      <RealCampaignPerformanceSection 
        id="campaign-performance" 
        className="border-b border-border/60"
      />

      {/* Main Portfolio Content with Search, Category Filter, and Verified Cards */}
      <PortfolioContent />


      {/* Stats Section */}
      <section className="py-12 lg:py-16 gradient-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-200 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {isEnglish ? "Ready to Scale Your Business?" : "আপনার ব্যবসা বৃদ্ধি করতে প্রস্তুত?"}
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {isEnglish
                ? "Let's discuss how our performance marketing, conversion tracking, and advertising campaigns can help your brand grow."
                : "আসুন আলোচনা করি কীভাবে আমাদের পারফরম্যান্স মার্কেটিং, কনভার্সন ট্র্যাকিং এবং বিজ্ঞাপন ক্যাম্পেইন আপনার ব্র্যান্ডকে এগিয়ে নিতে পারে।"}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground rounded-2xl shadow-lg shadow-cyan-500/20">
                <Link href="/contact">
                  {isEnglish ? "Start Your Campaign" : "আপনার ক্যাম্পেইন শুরু করুন"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-border hover:bg-secondary">
                <Link href="/services">
                  {isEnglish ? "View Our Services" : "আমাদের সেবাসমূহ দেখুন"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
