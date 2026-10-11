"use client"

import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, X, MessageCircle, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { fadeInUp, staggerContainer } from "@/components/ui/motion"
import { useLanguage } from "@/lib/language-context"

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const isClosingViaHistoryRef = useRef(false)
  const { language } = useLanguage()
  const isEnglish = language === "en"

  // Open modal and push history state so phone back button / swipe back gesture closes modal without leaving website
  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project)
    if (typeof window !== "undefined") {
      isClosingViaHistoryRef.current = false
      window.history.pushState({ modal: "portfolio-project", title: project.title }, "")
    }
  }, [])

  // Close modal and cleanly pop history state if it was pushed
  const handleCloseProject = useCallback(() => {
    setSelectedProject((current) => {
      if (!current) return null
      if (typeof window !== "undefined" && window.history.state?.modal === "portfolio-project") {
        isClosingViaHistoryRef.current = true
        window.history.back()
      }
      return null
    })
  }, [])

  // Browser Back button / mobile swipe back gesture listener
  useEffect(() => {
    const handlePopState = () => {
      if (isClosingViaHistoryRef.current) {
        isClosingViaHistoryRef.current = false
        return
      }
      // If modal was open, close it so user stays on the website
      setSelectedProject(null)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Keyboard Backspace ("back speacch") and Escape key listener
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)

      if ((e.key === "Backspace" && !isInput) || e.key === "Escape") {
        e.preventDefault()
        handleCloseProject()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedProject, handleCloseProject])

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
              className="grid grid-cols-2 gap-3.5 sm:gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  custom={index}
                  layout
                >
                  <Card 
                    onClick={() => handleOpenProject(project)}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/70 hover:border-cyan-500/60 transition-all duration-500 card-3d hover:shadow-2xl hover:shadow-cyan-500/15 h-full bg-card flex flex-col justify-between cursor-pointer"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                      <div className="absolute -top-10 -right-10 w-32 sm:w-44 h-32 sm:h-44 bg-cyan-500/20 rounded-full blur-3xl" />
                    </div>
                    <div>
                      <div className="aspect-[4/3] overflow-hidden relative rounded-t-2xl sm:rounded-t-3xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <CardContent className="p-3.5 sm:p-5 lg:p-6 relative">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                          <Badge 
                            variant="secondary" 
                            className="text-[10px] sm:text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20 px-2 py-0.5"
                          >
                            {project.category}
                          </Badge>
                          <span className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">{project.client}</span>
                        </div>
                        <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="mt-1.5 sm:mt-2 text-muted-foreground text-[11px] sm:text-xs lg:text-sm leading-snug sm:leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        
                        {/* Results */}
                        <div className="mt-3 sm:mt-5 grid grid-cols-3 gap-1 sm:gap-3 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-secondary/50 border border-border/50 group-hover:bg-secondary/70 transition-colors duration-300">
                          {project.results.map((result) => (
                            <div key={result.label} className="text-center">
                              <p className="text-xs sm:text-base lg:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center gap-0.5">
                                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-500" />
                                {result.value}
                              </p>
                              <p className="text-[9px] sm:text-[11px] text-muted-foreground leading-tight mt-0.5">{result.label}</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Services */}
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-1.5">
                          {project.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-[9px] sm:text-xs hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-colors duration-300 px-1.5 py-0.5">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
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

      {/* Project Detail Modal with Back Button & Backspace Protection */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => { if (!open) handleCloseProject() }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              {/* Hero Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex items-center rounded-full gradient-primary text-white px-4 py-1.5 text-sm font-medium mb-3">
                    {selectedProject.category}
                  </span>
                  <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-base sm:text-lg text-muted-foreground">
                      {selectedProject.client}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <button
                  type="button"
                  onClick={handleCloseProject}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 lg:p-8">
                {/* Overview */}
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Key Results */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">
                    {isEnglish ? "Key Campaign Results" : "প্রধান ক্যাম্পেইন ফলাফল"}
                  </h4>
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-secondary/60 border border-border/50">
                    {selectedProject.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <p className="text-base sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 flex items-center justify-center gap-1">
                          <TrendingUp className="h-4 w-4 text-cyan-500" />
                          {result.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services Delivered */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    {isEnglish ? "Services Delivered" : "প্রদত্ত সেবাসমূহ"}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((service) => (
                      <Badge key={service} variant="secondary" className="px-3 py-1 text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Consultation Action */}
                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    {isEnglish 
                      ? "Want similar results for your business? Chat with our growth specialists." 
                      : "আপনার ব্যবসার জন্যও কি অনুরূপ ফলাফল চান? আমাদের স্পেশালিস্টদের সাথে কথা বলুন।"}
                  </p>
                  <a
                    href={`https://wa.me/8801518961899?text=${encodeURIComponent(`Hello Boosting Agency BD, I saw your project "${selectedProject.title}" and would like a consultation.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-5 py-3 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{isEnglish ? "Discuss on WhatsApp" : "হোয়াটসঅ্যাপে আলোচনা করুন"}</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
