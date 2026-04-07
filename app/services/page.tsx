"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Search, Globe, Palette, Lightbulb, Video, Bot, TrendingUp, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { ScrollReveal, fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/components/ui/motion"

export default function ServicesPage() {
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  const services = [
    {
      id: "social-ads",
      title: isEnglish ? "Facebook & Instagram Ads" : "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন",
      description: isEnglish 
        ? "Reach your target audience with precision-targeted social media advertising campaigns that drive real results."
        : "প্রকৃত ফলাফল চালানো সঠিক-টার্গেটেড সোশ্যাল মিডিয়া বিজ্ঞাপন ক্যাম্পেইন দিয়ে আপনার টার্গেট অডিয়েন্সে পৌঁছান।",
      icon: "social-ads-svg",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Advanced audience targeting",
        "A/B testing and optimization",
        "Retargeting campaigns",
        "Lead generation ads",
        "E-commerce catalog ads",
        "Story and Reel ads",
      ] : [
        "অ্যাডভান্সড অডিয়েন্স টার্গেটিং",
        "A/B টেস্টিং এবং অপ্টিমাইজেশন",
        "রিটার্গেটিং ক্যাম্পেইন",
        "লিড জেনারেশন বিজ্ঞাপন",
        "ই-কমার্স ক্যাটালগ বিজ্ঞাপন",
        "স্টোরি এবং রিল বিজ্ঞাপন",
      ],
      benefits: isEnglish 
        ? "Our social media advertising experts create campaigns that not only reach your target audience but convert them into paying customers."
        : "আমাদের সোশ্যাল মিডিয়া বিজ্ঞাপন বিশেষজ্ঞরা এমন ক্যাম্পেইন তৈরি করেন যা শুধু আপনার টার্গেট অডিয়েন্সে পৌঁছায় না বরং তাদের পেইং কাস্টমারে রূপান্তর করে।",
    },
    {
      id: "google-ads",
      title: isEnglish ? "Google Ads Management" : "গুগল বিজ্ঞাপন ম্যানেজমেন্ট",
      description: isEnglish 
        ? "Drive qualified traffic and conversions with expertly managed Google Ads campaigns across Search, Display, and YouTube."
        : "সার্চ, ডিসপ্লে এবং ইউটিউব জুড়ে দক্ষভাবে পরিচালিত গুগল বিজ্ঞাপন ক্যাম্পেইন দিয়ে যোগ্য ট্রাফিক এবং কনভার্সন চালান।",
      icon: Search,
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Search campaign optimization",
        "Display network advertising",
        "YouTube video ads",
        "Shopping campaigns",
        "Performance Max campaigns",
        "Remarketing strategies",
      ] : [
        "সার্চ ক্যাম্পেইন অপ্টিমাইজেশন",
        "ডিসপ্লে নেটওয়ার্ক বিজ্ঞাপন",
        "ইউটিউব ভিডিও বিজ্ঞাপন",
        "শপিং ক্যাম্পেইন",
        "পারফরম্যান্স ম্যাক্স ক্যাম্পেইন",
        "রিমার্কেটিং কৌশল",
      ],
      benefits: isEnglish 
        ? "We help you capture high-intent customers actively searching for your products or services on Google."
        : "আমরা আপনাকে গুগলে সক্রিয়ভাবে আপনার পণ্য বা সেবা খুঁজছেন এমন উচ্চ-ইন্টেন্ট গ্রাহকদের ক্যাপচার করতে সাহায্য করি।",
    },
    {
      id: "seo",
      title: isEnglish ? "SEO Services" : "এসইও সেবা",
      description: isEnglish 
        ? "Improve your search rankings and drive organic traffic with our proven SEO strategies and techniques."
        : "আমাদের প্রমাণিত এসইও কৌশল এবং কৌশল দিয়ে আপনার সার্চ র‍্যাংকিং উন্নত করুন এবং অর্গানিক ট্রাফিক চালান।",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Technical SEO audits",
        "On-page optimization",
        "Content strategy & creation",
        "Link building",
        "Local SEO",
        "E-commerce SEO",
      ] : [
        "টেকনিক্যাল SEO অডিট",
        "অন-পেজ অপ্টিমাইজেশন",
        "কন্টেন্ট কৌশল ও তৈরি",
        "লিংক বিল্ডিং",
        "লোকাল SEO",
        "ই-কমার্স SEO",
      ],
      benefits: isEnglish 
        ? "Achieve sustainable growth with organic search traffic that compounds over time and reduces dependency on paid advertising."
        : "অর্গানিক সার্চ ট্রাফিক দিয়ে টেকসই বৃদ্ধি অর্জন করুন যা সময়ের সাথে বাড়ে এবং পেইড বিজ্ঞাপনের উপর নির্ভরতা কমায়।",
    },
    {
      id: "web-design",
      title: isEnglish ? "Web Design & Development" : "ওয়েব ডিজাইন ও ডেভেলপমেন্ট",
      description: isEnglish 
        ? "Create stunning, high-converting websites that represent your brand and deliver exceptional user experiences."
        : "আশ্চর্যজনক, উচ্চ-রূপান্তরকারী ওয়েবসাইট তৈরি করুন যা আপনার ব্র্যান্ডের প্রতিনিধিত্ব করে এবং ব্যতিক্রমী ব্যবহারকারীর অভিজ্ঞতা প্রদান করে।",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Custom website design",
        "E-commerce development",
        "Landing page creation",
        "Mobile-responsive design",
        "Speed optimization",
        "CMS integration",
      ] : [
        "কাস্টম ওয়েবসাইট ডিজাইন",
        "ই-কমার্স ডেভেলপমেন্ট",
        "ল্যান্ডিং পেজ তৈরি",
        "মোবাইল-রেসপন্সিভ ডিজাইন",
        "স্পিড অপ্টিমাইজেশন",
        "CMS ইন্টিগ্রেশন",
      ],
      benefits: isEnglish 
        ? "Your website is your digital storefront. We create websites that not only look beautiful but convert visitors into customers."
        : "আপনার ওয়েবসাইট আপনার ডিজিটাল স্টোরফ্রন্ট। আমরা এমন ওয়েবসাইট তৈরি করি যা শুধু সুন্দর দেখায় না বরং ভিজিটরদের গ্রাহকে রূপান্তর করে।",
    },
    {
      id: "strategy",
      title: isEnglish ? "Digital Marketing Strategy" : "ডিজিটাল মার্কেটিং কৌশল",
      description: isEnglish 
        ? "Comprehensive strategies to achieve your business goals through integrated digital marketing channels."
        : "সমন্বিত ডিজিটাল মার্কেটিং চ্যানেলের মাধ্যমে আপনার ব্যবসায়িক লক্ষ্য অর্জনের জন্য সম্পূর্ণ কৌশল।",
      icon: Lightbulb,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Market research & analysis",
        "Competitor analysis",
        "Channel strategy",
        "Budget allocation",
        "KPI development",
        "Growth roadmap",
      ] : [
        "মার্কেট রিসার্চ ও বিশ্লেষণ",
        "প্রতিযোগী বিশ্লেষণ",
        "চ্যানেল কৌশল",
        "বাজেট বরাদ্দ",
        "KPI ডেভেলপমেন্ট",
        "গ্রোথ রোডম্যাপ",
      ],
      benefits: isEnglish 
        ? "Get a clear roadmap to achieve your marketing goals with strategies tailored to your specific business needs."
        : "আপনার নির্দিষ্ট ব্যবসায়িক প্রয়োজনের জন্য তৈরি কৌশল সহ আপনার মার্কেটিং লক্ষ্য অর্জনের জন্য একটি স্পষ্ট রোডম্যাপ পান।",
    },
    {
      id: "branding",
      title: isEnglish ? "Branding & Design" : "ব্র্যান্ডিং ও ডিজাইন",
      description: isEnglish 
        ? "Build a memorable brand identity that resonates with your target audience and stands out from competitors."
        : "একটি স্মরণীয় ব্র্যান্ড পরিচয় তৈরি করুন যা আপনার টার্গেট অডিয়েন্সের সাথে অনুরণিত হয় এবং প্রতিযোগীদের থেকে আলাদা।",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Logo design",
        "Brand identity systems",
        "Brand guidelines",
        "Marketing collateral",
        "Social media graphics",
        "Packaging design",
      ] : [
        "লোগো ডিজাইন",
        "ব্র্যান্ড আইডেন্টিটি সিস্টেম",
        "ব্র্যান্ড গাইডলাইন",
        "মার্কেটিং ম্যাটেরিয়াল",
        "সোশ্যাল মিডিয়া গ্রাফিক্স",
        "প্যাকেজিং ডিজাইন",
      ],
      benefits: isEnglish 
        ? "Create a cohesive brand experience that builds trust and recognition across all customer touchpoints."
        : "সমস্ত গ্রাহক টাচপয়েন্ট জুড়ে বিশ্বাস এবং স্বীকৃতি তৈরি করে এমন একটি সুসংগত ব্র্যান্ড অভিজ্ঞতা তৈরি করুন।",
    },
    {
      id: "content",
      title: isEnglish ? "Content & Video Production" : "কন্টেন্ট ও ভিডিও প্রোডাকশন",
      description: isEnglish 
        ? "Engaging content that tells your story and connects with your audience across all platforms."
        : "আকর্ষণীয় কন্টেন্ট যা আপনার গল্প বলে এবং সমস্ত প্ল্যাটফর্ম জুড়ে আপনার অডিয়েন্সের সাথে সংযুক্ত হয়।",
      icon: Video,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Video production",
        "Social media content",
        "Blog & article writing",
        "Copywriting",
        "Photography",
        "Animation & motion graphics",
      ] : [
        "ভিডিও প্রোডাকশন",
        "সোশ্যাল মিডিয়া কন্টেন্ট",
        "ব্লগ ও আর্টিকেল লেখা",
        "কপিরাইটিং",
        "ফটোগ্রাফি",
        "অ্যানিমেশন ও মোশন গ্রাফিক্স",
      ],
      benefits: isEnglish 
        ? "Content is king. We create compelling content that engages your audience and drives them to take action."
        : "কন্টেন্ট রাজা। আমরা আকর্ষণীয় কন্টেন্ট তৈরি করি যা আপনার অডিয়েন্সকে এনগেজ করে এবং তাদের অ্যাকশন নিতে চালিত করে।",
    },
    {
      id: "ai-automation",
      title: isEnglish ? "AI Automation for Business" : "ব্যবসার জন্য এআই অটোমেশন",
      description: isEnglish 
        ? "Leverage AI to automate workflows, improve efficiency, and scale your business operations."
        : "ওয়ার্কফ্লো অটোমেট করতে, দক্ষতা উন্নত করতে এবং আপনার ব্যবসায়িক অপারেশন স্কেল করতে AI ব্যবহার করুন।",
      icon: Bot,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      features: isEnglish ? [
        "Chatbot development",
        "Marketing automation",
        "AI-powered analytics",
        "Customer service automation",
        "Email automation",
        "CRM integration",
      ] : [
        "চ্যাটবট ডেভেলপমেন্ট",
        "মার্কেটিং অটোমেশন",
        "AI-পাওয়ার্ড অ্যানালিটিক্স",
        "কাস্টমার সার্ভিস অটোমেশন",
        "ইমেইল অটোমেশন",
        "CRM ইন্টিগ্রেশন",
      ],
      benefits: isEnglish 
        ? "Stay ahead of the competition by leveraging cutting-edge AI technology to streamline operations and improve customer experience."
        : "অপারেশন সুগম করতে এবং গ্রাহক অভিজ্ঞতা উন্নত করতে অত্যাধুনিক AI প্রযুক্তি ব্যবহার করে প্রতিযোগিতায় এগিয়ে থাকুন।",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourServicesPage")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t("comprehensiveDigital")}{" "}
              <span className="text-gradient">{t("digitalMarketing")}</span> {t("solutions")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("servicesPageDescription")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={`grid grid-cols-1 gap-12 lg:grid-cols-2 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <motion.div 
                  className={index % 2 === 1 ? "lg:order-2" : ""}
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {service.icon === "social-ads-svg" ? (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1877F2] via-[#E1306C] to-[#F77737] text-white shrink-0 shadow-lg hover:scale-110 transition-transform duration-300">
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white" fillOpacity="0.2"/>
                          <path d="M16 8H14C13.45 8 13 8.45 13 9V10H16L15.5 13H13V20H10V13H8V10H10V8.5C10 6.57 11.57 5 13.5 5H16V8Z" fill="white"/>
                          <circle cx="17" cy="7" r="3" fill="white" fillOpacity="0.3"/>
                          <path d="M17 5.5V8.5M15.5 7H18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    ) : service.icon && typeof service.icon !== "string" ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shrink-0 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                        <service.icon className="h-6 w-6" />
                      </div>
                    ) : null}
                    <h2 className="text-3xl font-bold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <p className="text-foreground font-medium mb-6">
                    {service.benefits}
                  </p>
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
                  >
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={feature} 
                        variants={fadeInUp}
                        className="flex items-center gap-2 group"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <Button asChild className="gradient-primary text-primary-foreground btn-get-started group">
                    <Link href="/contact">
                      {t("getStarted")}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div 
                  className={index % 2 === 1 ? "lg:order-1" : ""}
                  variants={index % 2 === 0 ? slideInRight : slideInLeft}
                >
                  <motion.div 
                    className="relative aspect-[16/10] overflow-hidden rounded-3xl group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary relative overflow-hidden">
        {/* Animated glow orbs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {t("readyToBoost")}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {t("ctaDescription")}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 hover:shadow-xl hover:shadow-white/20 group transition-all duration-300">
                <Link href="/contact">
                  {t("getFreeConsultation")}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
