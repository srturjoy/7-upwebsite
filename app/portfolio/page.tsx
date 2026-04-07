"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PortfolioContent } from "@/components/portfolio/portfolio-content"
import { useLanguage } from "@/lib/language-context"

export default function PortfolioPage() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  const stats = [
    { value: "500+", label: t("projectsDelivered") },
    { value: "$10M+", label: t("revenueGenerated") },
    { value: "95%", label: t("clientSatisfaction") },
    { value: "200+", label: t("happyClientsLabel") },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourPortfolio")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t("successStories")}{" "}
              <span className="text-gradient">{t("inspireGrowth")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("portfolioDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Content with Category Filter and Projects Grid */}
      <PortfolioContent />

      {/* Stats Section */}
      <section className="py-24 gradient-dark text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("wantSimilarResults")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground">
                <Link href="/contact">
                  {t("startYourProject")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">
                  {t("viewOurServices")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
