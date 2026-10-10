"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  FileText,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { fadeInUp, staggerContainer } from "@/components/ui/motion"
import { allBlogPosts, freshBlogPosts, type BlogPost } from "@/lib/blog-data"

const categories = [
  "All",
  "Paid Advertising",
  "Social Media",
  "SEO",
  "Content Marketing",
  "AI & Technology",
  "Strategy",
]

const categoriesBn: { [key: string]: string } = {
  "All": "সব",
  "Paid Advertising": "পেইড বিজ্ঞাপন",
  "Social Media": "সোশ্যাল মিডিয়া",
  "SEO": "এসইও",
  "Content Marketing": "কন্টেন্ট মার্কেটিং",
  "AI & Technology": "AI ও প্রযুক্তি",
  "Strategy": "কৌশল",
}

const POSTS_PER_PAGE = 8

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  // Primary featured post is the latest Meta Ads AI Update (October 6, 2026)
  const featuredPost: BlogPost = freshBlogPosts[0] || allBlogPosts[0]

  // All remaining posts for the grid
  const gridSourcePosts: BlogPost[] = useMemo(() => {
    return allBlogPosts.filter((p) => p.slug !== featuredPost.slug)
  }, [featuredPost.slug])

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return gridSourcePosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory
      const searchLower = searchQuery.toLowerCase().trim()
      const matchesSearch =
        searchLower === "" ||
        post.title.toLowerCase().includes(searchLower) ||
        (post.titleBn && post.titleBn.toLowerCase().includes(searchLower)) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        (post.excerptBn && post.excerptBn.toLowerCase().includes(searchLower)) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        post.targetKeywords?.some((k) => k.toLowerCase().includes(searchLower))

      return matchesCategory && matchesSearch
    })
  }, [gridSourcePosts, activeCategory, searchQuery])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Check if featured post matches filters
  const showFeaturedPost = useMemo(() => {
    const matchesCategory = activeCategory === "All" || featuredPost.category === activeCategory
    const searchLower = searchQuery.toLowerCase().trim()
    const matchesSearch =
      searchLower === "" ||
      featuredPost.title.toLowerCase().includes(searchLower) ||
      (featuredPost.titleBn && featuredPost.titleBn.toLowerCase().includes(searchLower)) ||
      featuredPost.excerpt.toLowerCase().includes(searchLower) ||
      (featuredPost.excerptBn && featuredPost.excerptBn.toLowerCase().includes(searchLower)) ||
      featuredPost.author.toLowerCase().includes(searchLower) ||
      featuredPost.category.toLowerCase().includes(searchLower) ||
      featuredPost.targetKeywords?.some((k) => k.toLowerCase().includes(searchLower))

    return matchesCategory && matchesSearch && currentPage === 1
  }, [activeCategory, searchQuery, currentPage, featuredPost])

  // Count posts per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return allBlogPosts.length
    return allBlogPosts.filter((p) => p.category === category).length
  }

  const totalResults = filteredPosts.length + (showFeaturedPost ? 1 : 0)

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    return pages
  }

  return (
    <>
      {/* Hero Section with Search */}
      <section className="relative py-20 lg:py-24 overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-background to-background pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {isEnglish ? "Digital Marketing Intelligence" : "ডিজিটাল মার্কেটিং ইনসাইট"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground text-balance">
              {isEnglish ? "Digital Marketing News &" : "ডিজিটাল মার্কেটিং সংবাদ ও"}{" "}
              <span className="text-gradient">
                {isEnglish ? "Strategic Guides" : "কৌশলগত গাইডলাইন"}
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {isEnglish
                ? "Official platform updates, algorithm breakthroughs, and tactical advertising analyses for businesses in Bangladesh and international growth brands."
                : "বাংলাদেশ এবং গ্লোবাল মার্কেটের জন্য অফিসিয়াল প্ল্যাটফর্ম আপডেট, অ্যালগরিদম বিশ্লেষণ এবং কার্যকরী অ্যাডভার্টাইজিং স্ট্র্যাটেজি।"}
            </p>

            {/* Functional Search Bar */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={isEnglish ? "Search updates, keywords, or topics..." : "নিবন্ধ, কীওয়ার্ড বা বিষয় দিয়ে খুঁজুন..."}
                className="pl-11 pr-4 h-12 rounded-full bg-card border-border/80 text-foreground placeholder:text-muted-foreground focus-visible:ring-cyan-500 shadow-lg"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Sticky Nav */}
      <section className="border-b border-border/80 sticky top-[73px] bg-background/95 backdrop-blur-md z-30">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3.5 scrollbar-hide items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                  activeCategory === category
                    ? "gradient-primary text-white shadow-md shadow-primary/20"
                    : "bg-card border border-border text-slate-700 dark:text-slate-300 hover:text-foreground hover:bg-secondary/70"
                )}
              >
                <span>{isEnglish ? category : categoriesBn[category]}</span>
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[11px] font-bold",
                    activeCategory === category
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      {(searchQuery || activeCategory !== "All") && (
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {isEnglish ? "Showing" : "দেখানো হচ্ছে"}{" "}
              <span className="font-bold text-foreground">{totalResults}</span>{" "}
              {isEnglish ? `article${totalResults !== 1 ? "s" : ""}` : "আর্টিকেল"}
              {activeCategory !== "All" && (
                <>
                  {" "}
                  {isEnglish ? "in" : "এ"}{" "}
                  <span className="font-bold text-primary dark:text-cyan-400">
                    {isEnglish ? activeCategory : categoriesBn[activeCategory]}
                  </span>
                </>
              )}
              {searchQuery && (
                <>
                  {" "}
                  {isEnglish ? "matching" : "মিলে"}{" "}
                  <span className="font-bold text-primary dark:text-cyan-400">
                    &quot;{searchQuery}&quot;
                  </span>
                </>
              )}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("All")
                setCurrentPage(1)
              }}
              className="text-xs"
            >
              {isEnglish ? "Clear Filters" : "ফিল্টার ক্লিয়ার করুন"}
            </Button>
          </div>
        </div>
      )}

      {/* Featured Headline Post (October 6, 2026 Meta Ads AI Update) */}
      {showFeaturedPost && (
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-card border border-border/80 hover:border-cyan-500/50 shadow-xl transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image Section */}
                <div className="relative lg:col-span-6 aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt || (isEnglish ? featuredPost.title : featuredPost.titleBn)}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured News
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {isEnglish ? featuredPost.category : categoriesBn[featuredPost.category] || featuredPost.category}
                    </Badge>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      {isEnglish ? featuredPost.date : featuredPost.dateBn}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-500" />
                      {isEnglish ? featuredPost.readTime : featuredPost.readTimeBn}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors leading-tight">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {isEnglish ? featuredPost.title : featuredPost.titleBn}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {isEnglish ? featuredPost.excerpt : featuredPost.excerptBn}
                  </p>

                  {/* Target keywords badge tags */}
                  {featuredPost.targetKeywords && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featuredPost.targetKeywords.slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded-md"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex items-center gap-4">
                    <Button asChild size="lg" className="gradient-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <span>{isEnglish ? "Read Full Article" : "সম্পূর্ণ আর্টিকেল পড়ুন"}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {featuredPost.officialSource && (
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        Verified Official Source
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Cards Grid */}
      <section className="py-12 lg:py-16 bg-secondary/20 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              {activeCategory === "All"
                ? isEnglish
                  ? "Latest Digital Marketing Articles"
                  : "সর্বশেষ ডিজিটাল মার্কেটিং আর্টিকেল"
                : `${isEnglish ? activeCategory : categoriesBn[activeCategory]} ${isEnglish ? "Articles" : "আর্টিকেল"}`}
            </h2>
            {totalPages > 1 && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {isEnglish ? `Page ${currentPage} of ${totalPages}` : `পৃষ্ঠা ${currentPage} এর ${totalPages}`}
              </p>
            )}
          </div>

          {paginatedPosts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}-${searchQuery}`}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
              >
                {paginatedPosts.map((post, index) => {
                  const isFreshPost = freshBlogPosts.some((f) => f.slug === post.slug)

                  return (
                    <motion.div key={post.slug} variants={fadeInUp} custom={index}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 hover:border-cyan-500/60 bg-card hover:bg-card/90 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1.5"
                      >
                        {/* Featured Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                          <Image
                            src={post.image}
                            alt={post.imageAlt || (isEnglish ? post.title : post.titleBn)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                          />

                          {/* News Badge for fresh 2026 articles */}
                          {isFreshPost && (
                            <div className="absolute top-3 left-3 z-10">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-600 text-white shadow-md">
                                <Sparkles className="w-3 h-3" />
                                2026 Update
                              </span>
                            </div>
                          )}

                          <div className="absolute top-3 right-3 z-10">
                            <Badge variant="secondary" className="text-[11px] font-semibold bg-slate-950/80 text-white border-0 backdrop-blur-md">
                              {isEnglish ? post.category : categoriesBn[post.category] || post.category}
                            </Badge>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                          <div>
                            {/* Date & Read time */}
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                                {isEnglish ? post.date : post.dateBn}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-cyan-500" />
                                {isEnglish ? post.readTime : post.readTimeBn}
                              </span>
                            </div>

                            {/* Headline */}
                            <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                              {isEnglish ? post.title : post.titleBn}
                            </h3>

                            {/* Short Excerpt */}
                            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                              {isEnglish ? post.excerpt : post.excerptBn}
                            </p>
                          </div>

                          {/* Read Article CTA Link */}
                          <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-cyan-400 group-hover:underline">
                              <span>{isEnglish ? "Read Article" : "আর্টিকেল পড়ুন"}</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">
                              {post.author}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-16 bg-card rounded-3xl border border-border/80 p-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {isEnglish ? "No Articles Found" : "কোনো আর্টিকেল পাওয়া যায়নি"}
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {isEnglish
                  ? "Try adjusting your search query or choosing another category."
                  : "সার্চ কীওয়ার্ড পরিবর্তন করুন অথবা অন্য ক্যাটাগরি বেছে নিন।"}
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setCurrentPage(1)
                }}
              >
                {isEnglish ? "View All Articles" : "সব আর্টিকেল দেখুন"}
              </Button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && paginatedPosts.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>{isEnglish ? "Prev" : "আগের"}</span>
              </Button>

              {getPageNumbers().map((pageNum, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof pageNum === "number" && setCurrentPage(pageNum)}
                  disabled={typeof pageNum !== "number"}
                  className={cn(
                    "h-9 min-w-9 px-3 rounded-full text-xs font-bold transition-colors cursor-pointer",
                    pageNum === currentPage
                      ? "gradient-primary text-white shadow-md"
                      : typeof pageNum === "number"
                      ? "bg-card border border-border text-foreground hover:bg-secondary"
                      : "text-muted-foreground cursor-default"
                  )}
                >
                  {pageNum}
                </button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full"
              >
                <span>{isEnglish ? "Next" : "পরের"}</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
