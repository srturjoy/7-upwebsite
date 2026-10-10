"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Phone, Globe, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? (resolvedTheme || theme) === "dark" : true

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("portfolio"), href: "/portfolio" },
    { name: t("blog"), href: "/blog" },
    { name: t("contact"), href: "/contact" },
  ]

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const toggleTheme = () => {
    const current = resolvedTheme || theme || "dark"
    setTheme(current === "dark" ? "light" : "dark")
  }

  const themeLabel = isDark
    ? language === "en"
      ? "Switch to Light Mode"
      : "লাইট মোড চালু করুন"
    : language === "en"
      ? "Switch to Dark Mode"
      : "ডার্ক মোড চালু করুন"

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2.5 sm:gap-3 group">
              <Image
                src="/icon.png"
                alt="Boosting Agency BD Logo"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-contain shadow-sm transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <span className="text-xl sm:text-2xl font-bold text-gradient">Boosting Agency BD</span>
            </Link>
          </div>

          {/* Mobile menu button - visible on screens smaller than lg (1024px) */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Theme Toggle - Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 hover:border-border transition-colors cursor-pointer"
              title={themeLabel}
              aria-label={themeLabel}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-600" />
              )}
            </button>
            {/* Language Toggle - Mobile */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 border border-border/50 transition-colors"
            >
              <Globe className="h-3 w-3 text-primary" />
              <span className="text-foreground">{language === "en" ? "EN" : "বাং"}</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-md p-2 text-foreground bg-secondary hover:bg-secondary/80 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3 lg:items-center">
            {/* Theme Toggle - Desktop */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center rounded-full p-2 text-slate-700 dark:text-slate-200 hover:text-foreground hover:bg-secondary border border-border/50 hover:border-border transition-colors cursor-pointer"
              title={themeLabel}
              aria-label={themeLabel}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-600" />
              )}
            </button>
            {/* Language Toggle - Desktop - Smaller & Elegant */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 transition-all border border-border"
            >
              <Globe className="h-3 w-3 text-primary" />
              <span className="text-foreground">{language === "en" ? "EN" : "বাং"}</span>
            </button>
            <a 
              href="tel:+8801518961899" 
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-cyan-400 transition-colors"
            >
              <Phone className="h-4 w-4 text-cyan-500" />
              +880 1518 961899
            </a>
            <Button asChild className="gradient-primary text-white btn-get-started">
              <Link href="/contact">{t("getStarted")}</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile menu - Portal-like rendering outside header */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile menu panel */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-y-0 right-0 w-full max-w-[300px] bg-background shadow-2xl flex flex-col"
          >
            {/* Menu header with logo and close button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background">
              <Link 
                href="/" 
                className="flex items-center gap-2.5 flex-shrink-0" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/icon.png"
                  alt="Boosting Agency BD Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg object-contain"
                />
                <span className="text-lg font-bold text-gradient">Boosting Agency BD</span>
              </Link>
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Drawer Theme & Language Quick Toggle */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
              <span className="text-xs font-medium text-muted-foreground">
                {language === "en" ? "Appearance" : "থিম ও ভাষা"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-background hover:bg-secondary border border-border shadow-2xs transition-colors cursor-pointer"
                  title={themeLabel}
                  aria-label={themeLabel}
                >
                  {isDark ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-foreground">{language === "en" ? "Dark" : "ডার্ক"}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-cyan-600" />
                      <span className="text-foreground">{language === "en" ? "Light" : "লাইট"}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-background hover:bg-secondary border border-border shadow-2xs transition-colors cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  <span className="text-foreground">{language === "en" ? "EN" : "বাং"}</span>
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex-1 overflow-y-auto py-6 px-5 bg-background">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center rounded-lg px-4 py-3.5 text-base font-medium text-foreground hover:bg-secondary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Menu footer with phone and CTA button */}
            <div className="border-t border-border px-5 py-6 bg-secondary/30">
              <a 
                href="tel:+8801518961899" 
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-foreground hover:bg-secondary transition-colors mb-4"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-medium">+880 1518 961899</span>
              </a>
              <Button 
                asChild 
                className="w-full gradient-primary text-white h-12 text-base font-semibold btn-get-started"
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t("getStarted")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
