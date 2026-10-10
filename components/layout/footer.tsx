"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, MessageSquare, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  const navigation = {
    services: [
      { name: t("facebookInstagramAds"), href: "/services#social-ads" },
      { name: t("googleAds"), href: "/services#google-ads" },
      { name: t("seoServices"), href: "/services#seo" },
      { name: isEnglish ? "Web Design" : "ওয়েব ডিজাইন", href: "/services#web-design" },
      { name: t("aiAutomation"), href: "/services#ai-automation" },
    ],
    company: [
      { name: t("about"), href: "/about" },
      { name: t("portfolio"), href: "/portfolio" },
      { name: t("blog"), href: "/blog" },
      { name: isEnglish ? "Careers" : "ক্যারিয়ার", href: "/contact" },
      { name: t("contact"), href: "/contact" },
      { name: "T&C", href: "/terms" },
    ],
    social: [
      { name: "Facebook", href: "https://www.facebook.com/boostingagencyofficial", icon: Facebook },
      { name: "Instagram", href: "#", icon: Instagram },
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "LinkedIn", href: "#", icon: Linkedin },
    ],
  }

  return (
    <footer className="gradient-dark text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <Image
                src="/icon.png"
                alt="Boosting Agency BD Logo"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-2xl font-bold tracking-tight text-white">
                Boosting Agency BD
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              {t("footerDescription")}
            </p>
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">{t("services")}</h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">{t("company")}</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">{t("contactUs")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="tel:+8801518961899" className="flex items-start gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                  +880 1518 961899
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801518961899" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-slate-300 hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                  <span>{isEnglish ? "WhatsApp: +880 1518 961899" : "হোয়াটসঅ্যাপ: +৮৮০ ১৫১৮ ৯৬১৮৯৯"}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                  <span>{isEnglish ? "Rupnagor R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh" : "রূপনগর আ/এ, রোড-১৬, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Boosting Agency BD. {t("allRightsReserved")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <Link
              href="/terms"
              className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline"
            >
              T&C
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/terms#privacy-policy-and-data-protection"
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isEnglish ? "Privacy Policy" : "গোপনীয়তা নীতিমালা"}
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              href="/terms#refund-and-balance-policy"
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isEnglish ? "Refund Policy" : "রিফান্ড নীতিমালা"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
