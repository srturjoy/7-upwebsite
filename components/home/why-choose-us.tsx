"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, Users, Award, Clock, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/components/ui/motion"

const features = [
  {
    name: "Data-Driven Approach",
    nameBn: "ডেটা-চালিত পদ্ধতি",
    description: "Every decision is backed by analytics and real performance data.",
    descriptionBn: "প্রতিটি সিদ্ধান্ত অ্যানালিটিক্স এবং প্রকৃত পারফরম্যান্স ডেটা দ্বারা সমর্থিত।",
    icon: Target,
  },
  {
    name: "Experienced Team",
    nameBn: "অভিজ্ঞ টিম",
    description: "Our team has 10+ years of combined digital marketing experience.",
    descriptionBn: "আমাদের টিমের ১০+ বছরের সম্মিলিত ডিজিটাল মার্কেটিং অভিজ্ঞতা রয়েছে।",
    icon: Users,
  },
  {
    name: "Proven Results",
    nameBn: "প্রমাণিত ফলাফল",
    description: "We have a track record of delivering exceptional ROI for our clients.",
    descriptionBn: "আমাদের ক্লায়েন্টদের জন্য অসাধারণ ROI প্রদানের ট্র্যাক রেকর্ড রয়েছে।",
    icon: Award,
  },
  {
    name: "24/7 Support",
    nameBn: "২৪/৭ সাপোর্ট",
    description: "Get dedicated support whenever you need it, day or night.",
    descriptionBn: "দিন বা রাত যখনই প্রয়োজন, ডেডিকেটেড সাপোর্ট পান।",
    icon: Clock,
  },
]

const benefits = [
  { en: "Transparent reporting and analytics", bn: "স্বচ্ছ রিপোর্টিং এবং অ্যানালিটিক্স" },
  { en: "Custom strategies for your business", bn: "আপনার ব্যবসার জন্য কাস্টম কৌশল" },
  { en: "No long-term contracts required", bn: "দীর্ঘমেয়াদী চুক্তির প্রয়োজন নেই" },
  { en: "Free initial consultation", bn: "বিনামূল্যে প্রাথমিক পরামর্শ" },
  { en: "Regular strategy reviews", bn: "নিয়মিত কৌশল পর্যালোচনা" },
  { en: "Dedicated account manager", bn: "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার" },
]

export function WhyChooseUs() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          <ScrollReveal variants={slideInLeft}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("whyChooseUs")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {t("whyChooseUsTitle")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t("whyChooseUsDescription")}
            </p>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name} 
                  variants={fadeInUp}
                  className="flex gap-4 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {isEnglish ? feature.name : feature.nameBn}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {isEnglish ? feature.description : feature.descriptionBn}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal variants={slideInRight} className="relative">
            <motion.div 
              className="relative aspect-[4/3] overflow-hidden rounded-3xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt={isEnglish ? "Team collaboration in modern office" : "আধুনিক অফিসে টিম সহযোগিতা"}
                width={800}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </motion.div>
            {/* Benefits card */}
            <motion.div 
              initial={{ opacity: 0, y: 30, x: 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute -bottom-8 -right-4 lg:-right-8 rounded-2xl bg-card p-6 shadow-xl border border-border max-w-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <h4 className="font-semibold text-foreground mb-4">{t("whatYouGet")}</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={benefit.en} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {isEnglish ? benefit.en : benefit.bn}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
