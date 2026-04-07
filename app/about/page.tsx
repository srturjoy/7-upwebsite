"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Target, Eye, Lightbulb, Users, Award } from "lucide-react"
import { TeamCarousel } from "@/components/about/team-carousel"
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
      <section className="relative py-24 overflow-hidden">
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
      <section className="py-12 border-y border-border bg-secondary/30">
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
      <section className="py-24">
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
      <section className="py-24 gradient-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <Card className="bg-primary-foreground/5 border-primary-foreground/10">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 mb-6">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground">{t("ourMission")}</h3>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  {t("missionDescription")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/5 border-primary-foreground/10">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 mb-6">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground">{t("ourVision")}</h3>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">
                  {t("visionDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourValues")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("whatDrivesUs")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground mb-4">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-secondary/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourTeam")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("meetExperts")}
            </h2>
          </div>
        </div>
        <TeamCarousel />
      </section>

      {/* CTA Section */}
      <section className="py-24">
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
