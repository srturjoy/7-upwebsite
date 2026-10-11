"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Target, Eye, Lightbulb, Users, Award } from "lucide-react"
import { TeamCarousel } from "@/components/about/team-carousel"
import { FounderCeoSpotlight } from "@/components/about/founder-ceo-spotlight"
import { useLanguage } from "@/lib/language-context"

export default function AboutPage() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  const values = [
    {
      title: t("innovation"),
      description: t("innovationDesc"),
      icon: Lightbulb,
    },
    {
      title: t("transparency"),
      description: t("transparencyDesc"),
      icon: Eye,
    },
    {
      title: t("excellence"),
      description: t("excellenceDesc"),
      icon: Award,
    },
    {
      title: t("collaboration"),
      description: t("collaborationDesc"),
      icon: Users,
    },
  ]

  const stats = [
    { value: "500+", label: t("projectsCompleted") },
    { value: "200+", label: t("happyClientsLabel") },
    { value: "10+", label: t("yearsExperience") },
    { value: "50M+", label: t("adImpressions") },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("aboutUs")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t("weHelpBusinesses")}{" "}
              <span className="text-gradient">{t("growSucceed")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("aboutDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 lg:py-14 border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourStory")}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                {t("fromSmallTeam")}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("aboutStoryP1")}</p>
                <p>{t("aboutStoryP2")}</p>
                <p>{t("aboutStoryP3")}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt={isEnglish ? "Boosting Agency BD team" : "বুস্টিং এজেন্সি বিডি টিম"}
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 lg:py-20 gradient-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            <Card className="bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 rounded-3xl card-3d hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl gradient-primary text-white mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{t("ourMission")}</h3>
                <p className="mt-4 text-slate-200 leading-relaxed text-sm sm:text-base">
                  {t("missionDescription")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 rounded-3xl card-3d hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <CardContent className="p-6 sm:p-8 relative">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl gradient-primary text-white mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Eye className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{t("ourVision")}</h3>
                <p className="mt-4 text-slate-200 leading-relaxed text-sm sm:text-base">
                  {t("visionDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourValues")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("whatDrivesUs")}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center rounded-2xl sm:rounded-3xl border-border/70 hover:border-cyan-500/60 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-500 bg-card overflow-hidden relative group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-28 sm:w-36 h-28 sm:h-36 bg-cyan-500/15 rounded-full blur-2xl" />
                </div>
                <CardContent className="p-3.5 sm:p-6 relative">
                  <div className="mx-auto flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl gradient-primary text-white mb-3 sm:mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <value.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                  <h3 className="text-xs sm:text-lg font-bold text-foreground leading-tight">{value.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Leadership & Team Section */}
      <section className="py-14 lg:py-20 bg-secondary/30 overflow-hidden">
        {/* CEO & Founder Spotlight on TOP as requested */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
              {isEnglish ? "Executive Leadership" : "নির্বাহী নেতৃত্ব"}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {isEnglish ? "Founder & CEO" : "প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা"}
            </h2>
          </div>
        </div>

        <FounderCeoSpotlight />

        {/* Then the specialist team below */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 pt-10 border-t border-border/70">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourTeam")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("meetExperts")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {isEnglish 
                ? "Our specialized growth engineers, media buyers, and marketing technologists."
                : "আমাদের বিশেষায়িত গ্রোথ ইঞ্জিনিয়ার, মিডিয়া বায়ার ও মার্কেটিং টেকনোলজিস্ট টিম।"}
            </p>
          </div>
        </div>
        <TeamCarousel />
      </section>

      {/* CTA Section */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("readyToWork")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground">
                <Link href="/contact">
                  {t("getInTouchCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
