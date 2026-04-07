"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { fadeInUp, staggerContainer } from "@/components/ui/motion"

const categories = ["All", "E-commerce", "Lead Generation", "Branding", "SEO", "Social Media"] as const

type Category = typeof categories[number]

interface ProjectResult {
  label: string
  value: string
}

interface Project {
  title: string
  client: string
  category: Exclude<Category, "All">
  description: string
  image: string
  results: ProjectResult[]
  services: string[]
}

const projects: Project[] = [
  {
    title: "Fashion E-commerce Revenue Boost",
    client: "StyleHub Bangladesh",
    category: "E-commerce",
    description: "Transformed an underperforming e-commerce store into a revenue-generating machine through strategic Facebook and Google Ads campaigns.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    results: [
      { label: "Revenue Increase", value: "+450%" },
      { label: "ROAS", value: "5.2x" },
      { label: "Conversion Rate", value: "+180%" },
    ],
    services: ["Facebook Ads", "Google Ads", "SEO"],
  },
  {
    title: "SaaS Lead Generation Campaign",
    client: "TechSolve BD",
    category: "Lead Generation",
    description: "Generated high-quality B2B leads for a SaaS company through LinkedIn ads and content marketing strategies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    results: [
      { label: "Leads/Month", value: "2,000+" },
      { label: "Cost Per Lead", value: "-65%" },
      { label: "Sales Pipeline", value: "+320%" },
    ],
    services: ["LinkedIn Ads", "Content Marketing", "Email Marketing"],
  },
  {
    title: "Restaurant Chain Local SEO",
    client: "Spice Kitchen",
    category: "SEO",
    description: "Achieved top search rankings for 50+ local keywords, dramatically increasing foot traffic and online orders.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
    results: [
      { label: "Keyword Rankings", value: "Top 3" },
      { label: "Organic Traffic", value: "+400%" },
      { label: "Online Orders", value: "+200%" },
    ],
    services: ["Local SEO", "Google My Business", "Content Strategy"],
  },
  {
    title: "Fitness Brand Social Growth",
    client: "FitLife BD",
    category: "Social Media",
    description: "Built a thriving social media community and generated consistent leads through engaging content and targeted ads.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    results: [
      { label: "Followers", value: "100K+" },
      { label: "Engagement Rate", value: "8.5%" },
      { label: "Monthly Leads", value: "500+" },
    ],
    services: ["Social Media Management", "Content Creation", "Influencer Marketing"],
  },
  {
    title: "Real Estate Brand Identity",
    client: "HomeSpace Properties",
    category: "Branding",
    description: "Created a premium brand identity that positioned the client as a leader in luxury real estate in Dhaka.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    results: [
      { label: "Brand Recognition", value: "+250%" },
      { label: "Lead Quality", value: "+180%" },
      { label: "Average Deal Size", value: "+45%" },
    ],
    services: ["Brand Identity", "Web Design", "Digital Strategy"],
  },
  {
    title: "Healthcare Lead Generation",
    client: "MediCare Clinic",
    category: "Lead Generation",
    description: "Developed a multi-channel marketing strategy that tripled patient appointments for a healthcare clinic.",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
    results: [
      { label: "Appointments", value: "+300%" },
      { label: "Cost Per Lead", value: "-50%" },
      { label: "Patient Retention", value: "+85%" },
    ],
    services: ["Google Ads", "Facebook Ads", "Landing Pages"],
  },
  {
    title: "Online Education Platform",
    client: "EduLearn BD",
    category: "E-commerce",
    description: "Scaled an online education platform from 500 to 10,000+ active students through performance marketing.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    results: [
      { label: "Student Growth", value: "20x" },
      { label: "Course Revenue", value: "+850%" },
      { label: "Completion Rate", value: "+40%" },
    ],
    services: ["Facebook Ads", "Email Marketing", "Content Marketing"],
  },
  {
    title: "Jewelry Brand E-commerce Launch",
    client: "Golden Touch",
    category: "E-commerce",
    description: "Launched a new jewelry e-commerce brand and achieved profitability within the first 3 months.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
    results: [
      { label: "Month 1 Revenue", value: "৳15L+" },
      { label: "ROAS", value: "4.8x" },
      { label: "Repeat Customers", value: "35%" },
    ],
    services: ["E-commerce Strategy", "Facebook Ads", "Instagram Marketing"],
  },
  {
    title: "Tech Startup Brand Launch",
    client: "InnovateTech BD",
    category: "Branding",
    description: "Developed a complete brand identity and digital presence for a tech startup entering the Bangladesh market.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    results: [
      { label: "Brand Awareness", value: "+500%" },
      { label: "Website Traffic", value: "+350%" },
      { label: "Investor Interest", value: "12 Meetings" },
    ],
    services: ["Brand Strategy", "Logo Design", "Web Development"],
  },
  {
    title: "Travel Agency SEO Domination",
    client: "Wanderlust BD",
    category: "SEO",
    description: "Achieved page 1 rankings for 100+ high-value travel keywords, becoming the top organic result in Bangladesh.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
    results: [
      { label: "Keywords Ranked", value: "100+" },
      { label: "Organic Traffic", value: "+600%" },
      { label: "Bookings", value: "+280%" },
    ],
    services: ["Technical SEO", "Content Marketing", "Link Building"],
  },
  {
    title: "Fashion Influencer Campaign",
    client: "Trendy Threads",
    category: "Social Media",
    description: "Executed a viral influencer marketing campaign that generated massive brand awareness and sales.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
    results: [
      { label: "Reach", value: "5M+" },
      { label: "Engagement", value: "450K" },
      { label: "Sales Increase", value: "+220%" },
    ],
    services: ["Influencer Marketing", "Content Creation", "Social Ads"],
  },
  {
    title: "B2B Software Lead Gen",
    client: "CloudSync Solutions",
    category: "Lead Generation",
    description: "Built a comprehensive lead generation funnel for enterprise software, targeting C-level executives.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    results: [
      { label: "Qualified Leads", value: "150/month" },
      { label: "Demo Bookings", value: "+400%" },
      { label: "Deal Size", value: "+65%" },
    ],
    services: ["LinkedIn Ads", "ABM Strategy", "Email Sequences"],
  },
]

export function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects
    }
    return projects.filter((project) => project.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      {/* Category Filter */}
      <section className="border-b border-border sticky top-[73px] bg-background/95 backdrop-blur-sm z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === category
                    ? "bg-gradient-to-r from-primary to-cyan-500 text-white shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                )}
              >
                {category}
                {activeCategory === category && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    {category === "All" ? projects.length : projects.filter(p => p.category === category).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Results count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <span> in <span className="font-semibold text-primary">{activeCategory}</span></span>
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  custom={index}
                  layout
                >
                  <Card 
                    className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 h-full"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                    </div>
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {project.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.client}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Results */}
                      <div className="mt-6 grid grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/50 group-hover:bg-secondary/70 transition-colors duration-300">
                        {project.results.map((result) => (
                          <div key={result.label} className="text-center">
                            <p className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {result.value}
                            </p>
                            <p className="text-xs text-muted-foreground">{result.label}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Services */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors duration-300">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-primary hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
