import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { allBlogPosts, freshBlogPosts } from "@/lib/blog-data"
import { Calendar, Clock, ArrowRight, ExternalLink, ShieldCheck, Tag, ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamicParams = false

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found | Boosting Agency BD",
      description: "The requested digital marketing blog article could not be found.",
    }
  }

  const canonicalUrl = `https://boostingagencyofficial.site/blog/${post.slug}`

  return {
    title: `${post.title} | Boosting Agency BD`,
    description: post.metaDescription,
    keywords: post.targetKeywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: "Boosting Agency BD",
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 675,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const postUrl = `https://boostingagencyofficial.site/blog/${post.slug}`

  // Schema.org Article / BlogPosting + Breadcrumbs JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": [post.image],
    "datePublished": post.isoDate,
    "dateModified": post.isoDate,
    "author": {
      "@type": "Organization",
      "name": "Boosting Agency BD",
      "url": "https://boostingagencyofficial.site",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Boosting Agency BD",
      "url": "https://boostingagencyofficial.site",
      "logo": {
        "@type": "ImageObject",
        "url": "https://boostingagencyofficial.site/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl,
    },
    "keywords": post.targetKeywords.join(", "),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://boostingagencyofficial.site",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://boostingagencyofficial.site/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl,
      },
    ],
  }

  // Related other posts (prioritizing fresh news posts)
  const otherPosts = allBlogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article className="min-h-screen bg-background text-foreground py-12 lg:py-20">
      {/* JSON-LD Schemas */}
      <script
        key="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        key="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Articles</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground text-balance leading-tight">
            {post.title}
          </h1>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300 border-y border-border/80 py-3.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-4 w-4 text-cyan-500" />
              <span>Published: {post.date}</span>
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-cyan-500" />
              <span>{post.readTime}</span>
            </span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="font-medium text-foreground">
              By {post.author}
            </span>
          </div>

          {/* Prominent Official Source Citation Banner (if available) */}
          {post.officialSource && (
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Official Source Citation:</p>
                  <p className="text-xs sm:text-sm text-muted-foreground dark:text-slate-300">{post.officialSource.name}</p>
                </div>
              </div>
              <a
                href={post.officialSource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0 bg-background/80 px-3 py-1.5 rounded-lg border border-cyan-500/20"
              >
                <span>View Source</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        </header>

        {/* Article Body Content */}
        <div
          className="mt-10 prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-bold 
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-800 dark:prose-p:text-slate-200 prose-p:leading-relaxed prose-p:mb-5
            prose-li:text-slate-800 dark:prose-li:text-slate-200 prose-li:my-1.5
            prose-strong:text-foreground prose-strong:font-bold
            prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:font-semibold prose-a:underline hover:prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.fullContentHtml }}
        />

        {/* Structured FAQ Section (if available) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-6 w-6 text-cyan-500" />
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs"
                >
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Agency Action Banner / Verified CTA */}
        <section className="mt-14 rounded-3xl gradient-primary p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">Boosting Agency BD — Strategic Execution</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Upgrade Your Digital Marketing Performance?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed">
              Our certified digital marketing specialists in Bangladesh can help you architect high-ROAS Meta campaigns, scale YouTube and Search ads, set up rock-solid conversion tracking (Pixel & CAPI), and build conversion-optimized landing pages.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-slate-900 font-bold hover:bg-white/90 shadow-lg">
                <Link href="/contact">
                  <span>Get Free Consultation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10">
                <a
                  href="https://service.boostingagencyofficial.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Explore Service Website</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">More Recent Digital Marketing Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-3">
                    <Image
                      src={related.image}
                      alt={related.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                    {related.date}
                  </span>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                    {related.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center text-xs font-semibold text-primary">
                  <span>Read Article</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
