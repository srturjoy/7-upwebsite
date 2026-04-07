"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Phone, Globe, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

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
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl sm:text-2xl font-bold text-gradient">Boosting Agency BD</span>
            </Link>
          </div>

          {/* Mobile menu button - visible on screens smaller than lg (1024px) */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Theme Toggle - Mobile */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
            {/* Language Toggle - Mobile */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 transition-colors"
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
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3 lg:items-center">
            {/* Theme Toggle - Desktop */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
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
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
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
                className="flex-shrink-0" 
                onClick={() => setMobileMenuOpen(false)}
              >
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
