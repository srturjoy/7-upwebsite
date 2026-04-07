"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"
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
            <Link href="/" className="text-2xl font-bold">
              Boosting Agency BD
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              {t("footerDescription")}
            </p>
            <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">{t("services")}</h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">{t("company")}</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">{t("contactUs")}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="tel:+8801518961899" className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                  +880 1518 961899
                </a>
              </li>
              <li>
                <a href="mailto:turjoy144@gmail.com" className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                  turjoy144@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{isEnglish ? "Rupnagor R/A, Road-16, House-30, Mirpur-2, Dhaka-1216, Bangladesh" : "রূপনগর আ/এ, রোড-১৬, বাড়ি-৩০, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ"}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Boosting Agency BD. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
