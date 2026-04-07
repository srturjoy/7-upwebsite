"use client"

import { Input } from "@/components/ui/input"
import { BlogContent } from "@/components/blog/blog-content"
import { useLanguage } from "@/lib/language-context"

export default function BlogPage() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  return (
    <>
      {/* Blog Content with Search and Category Filters */}
      <BlogContent />

      {/* Newsletter Section */}
      <section className="py-24 gradient-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {t("subscribeNewsletter")}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t("newsletterDescription")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder={t("enterEmail")} 
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <button className="shrink-0 h-12 px-6 rounded-md bg-white text-primary font-semibold hover:bg-white/90 transition-colors">
                {t("subscribe")}
              </button>
            </div>
            <p className="mt-4 text-sm text-white/60">
              {t("noSpam")}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
