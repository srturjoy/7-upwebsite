import Link from "next/link"
import Image from "next/image"
import { TEAM_MEMBERS } from "@/data/team"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, ShieldCheck, MessageCircle } from "lucide-react"
import { FounderCeoSpotlight } from "@/components/about/founder-ceo-spotlight"

export const metadata = {
  title: "Meet Our Team & Growth Experts | Boosting Agency BD",
  description: "Meet the executive leadership and performance marketing specialists driving scalable business growth at Boosting Agency BD.",
}

export default function TeamPage() {
  const specialistMembers = TEAM_MEMBERS.filter((m) => m.id !== "siddiqur-rahman-turjoy")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-secondary/40 via-background to-background text-center relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-4 border border-cyan-500/20">
            <ShieldCheck className="h-4 w-4" />
            <span>Executive Leadership & Specialists</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground text-balance">
            Meet the Experts Behind <span className="text-gradient">Boosting Agency BD</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From technical software architecture and high-ROI Meta & Google ads to creative media buying and eCommerce scaling—explore our full leadership and specialist team.
          </p>
        </div>
      </section>

      {/* Founder & CEO Spotlight on Top */}
      <FounderCeoSpotlight />

      {/* Specialist Team Roster Grid (4 Experts) */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10 pt-4 border-t border-border/60">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Specialist Growth &amp; Marketing Team
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Our 4 specialized growth practitioners managing media buying, tracking, web development, and store scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialistMembers.map((member) => (
              <Card
                key={member.id}
                className="group rounded-3xl border border-border/80 hover:border-cyan-500/70 transition-all duration-300 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 bg-card flex flex-col justify-between overflow-hidden relative"
              >
                {/* Photo Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                  <img
                    src={member.defaultImages[0]?.url || `/images/team/${member.id}.webp`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-medium text-cyan-300 mb-0.5">
                      {member.role}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {member.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {member.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium bg-secondary/80 text-foreground dark:text-slate-200 px-2.5 py-0.5 rounded-lg border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                    <Link href={`/team/${member.id}`} className="flex items-center justify-between w-full">
                      <span>View Profile &amp; Strategy Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
