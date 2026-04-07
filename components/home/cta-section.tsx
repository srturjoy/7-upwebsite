"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, staggerContainer } from "@/components/ui/motion"

export function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance"
          >
            {t("readyToBoost")}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="mt-4 text-lg text-primary-foreground/80"
          >
            {t("ctaDescription")}
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto group hover:shadow-xl hover:shadow-white/20 transition-all duration-300">
              <Link href="/contact">
                {t("getFreeConsultation")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 hover:shadow-lg transition-all duration-300">
              <a href="tel:+8801518961899">
                <Phone className="mr-2 h-4 w-4" />
                {t("callUsNow")}
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80"
          >
            <a href="tel:+8801518961899" className="flex items-center gap-2 hover:text-primary-foreground hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5" />
              +880 1518 961899
            </a>
            <span className="hidden sm:block">|</span>
            <a href="mailto:turjoy144@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground hover:scale-105 transition-all duration-300">
              <Mail className="h-5 w-5" />
              turjoy144@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
