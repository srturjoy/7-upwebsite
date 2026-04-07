"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  })
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  const contactInfo = [
    {
      icon: Phone,
      title: t("phone"),
      details: "+880 1518 961899",
      href: "tel:+8801518961899",
    },
    {
      icon: Mail,
      title: t("email"),
      details: "turjoy144@gmail.com",
      href: "mailto:turjoy144@gmail.com",
    },
    {
      icon: MapPin,
      title: t("address"),
      details: isEnglish 
        ? "Rupnagor R/A, Road-16, House-30, Mirpur-2, Dhaka-1216, Bangladesh"
        : "রূপনগর আ/এ, রোড-১৬, বাড়ি-৩০, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ",
      href: "https://maps.google.com/?q=Mirpur-2,Dhaka,Bangladesh",
    },
    {
      icon: Clock,
      title: t("businessHours"),
      details: isEnglish ? "Sat - Thu: 9:00 AM - 6:00 PM" : "শনি - বৃহঃ: সকাল ৯:০০ - সন্ধ্যা ৬:০০",
      href: null,
    },
  ]

  const services = [
    { en: "Facebook & Instagram Ads", bn: "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন" },
    { en: "Google Ads", bn: "গুগল বিজ্ঞাপন" },
    { en: "SEO Services", bn: "এসইও সেবা" },
    { en: "Web Design & Development", bn: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট" },
    { en: "Branding & Design", bn: "ব্র্যান্ডিং ও ডিজাইন" },
    { en: "Digital Marketing Strategy", bn: "ডিজিটাল মার্কেটিং কৌশল" },
    { en: "Content & Video Production", bn: "কন্টেন্ট ও ভিডিও প্রোডাকশন" },
    { en: "AI Automation", bn: "এআই অটোমেশন" },
    { en: "Other", bn: "অন্যান্য" },
  ]

  const budgets = [
    { en: "Under ৳25,000", bn: "৳২৫,০০০ এর নিচে" },
    { en: "৳25,000 - ৳50,000", bn: "৳২৫,০০০ - ৳৫০,০০০" },
    { en: "৳50,000 - ৳100,000", bn: "৳৫০,০০০ - ৳১,০০,০০০" },
    { en: "৳100,000 - ৳250,000", bn: "৳১,০০,০০০ - ৳২,৫০,০০০" },
    { en: "Over ৳250,000", bn: "৳২,৫০,০০০ এর উপরে" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const whatsappMessage = `
*${isEnglish ? "New Contact Form Submission" : "নতুন যোগাযোগ ফর্ম জমা"}*

*${isEnglish ? "Name" : "নাম"}:* ${formData.firstName} ${formData.lastName}
*${isEnglish ? "Email" : "ইমেইল"}:* ${formData.email}
*${isEnglish ? "Phone" : "ফোন"}:* ${formData.phone || (isEnglish ? "Not provided" : "দেওয়া হয়নি")}
*${isEnglish ? "Company" : "কোম্পানি"}:* ${formData.company || (isEnglish ? "Not provided" : "দেওয়া হয়নি")}
*${isEnglish ? "Service Interested" : "আগ্রহী সেবা"}:* ${formData.service || (isEnglish ? "Not specified" : "নির্দিষ্ট করা হয়নি")}
*${isEnglish ? "Budget" : "বাজেট"}:* ${formData.budget || (isEnglish ? "Not specified" : "নির্দিষ্ট করা হয়নি")}

*${isEnglish ? "Message" : "বার্তা"}:*
${formData.message}
    `.trim()
    
    const encodedMessage = encodeURIComponent(whatsappMessage)
    await new Promise((resolve) => setTimeout(resolve, 500))
    window.open(`https://wa.me/8801518961899?text=${encodedMessage}`, "_blank")
    setIsSubmitting(false)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("contactUs")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t("letsStartConversation")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("contactHeroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("getInTouch")}</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">{t("followUs")}</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, href: "https://www.facebook.com/boostingagencyofficial", label: "Facebook" },
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8">
                <Card className="border-2 border-[#25D366] bg-[#25D366]/10 shadow-lg shadow-[#25D366]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#25D366]/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg animate-pulse">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{t("fastestResponse")}</h3>
                        <p className="text-sm text-muted-foreground">{t("instantSupport")}</p>
                        <p className="text-xs text-[#25D366] font-medium mt-1">{t("typicallyReplies")}</p>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/8801518961899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/40 hover:scale-[1.02]"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      {t("chatOnWhatsAppNow")}
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl">{t("sendUsMessage")}</CardTitle>
                  <CardDescription>{t("formDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("firstName")} *</Label>
                        <Input 
                          id="firstName" 
                          placeholder={isEnglish ? "John" : "জন"} 
                          required 
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("lastName")} *</Label>
                        <Input 
                          id="lastName" 
                          placeholder={isEnglish ? "Doe" : "ডো"} 
                          required 
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("emailAddress")} *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          required 
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("phoneNumber")}</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="+880 1XXX XXXXXX" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">{t("companyName")}</Label>
                        <Input 
                          id="company" 
                          placeholder={isEnglish ? "Your Company" : "আপনার কোম্পানি"} 
                          value={formData.company}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">{t("serviceInterested")} *</Label>
                        <Select 
                          required 
                          value={formData.service}
                          onValueChange={(value) => handleSelectChange("service", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectService")} />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.en} value={service.en}>
                                {isEnglish ? service.en : service.bn}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t("estimatedBudget")}</Label>
                      <Select 
                        value={formData.budget}
                        onValueChange={(value) => handleSelectChange("budget", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectBudget")} />
                        </SelectTrigger>
                        <SelectContent>
                          {budgets.map((budget) => (
                            <SelectItem key={budget.en} value={budget.en}>
                              {isEnglish ? budget.en : budget.bn}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("yourMessage")} *</Label>
                      <Textarea
                        id="message"
                        placeholder={t("messagePlaceholder")}
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-primary text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </span>
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          {isEnglish ? "Send via WhatsApp" : "হোয়াটসঅ্যাপে পাঠান"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="aspect-[16/6] rounded-3xl overflow-hidden border border-border bg-secondary">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1234567890123!2d90.36543!3d23.8041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzE0LjgiTiA5MMKwMjEnNTUuNSJF!5e0!3m2!1sen!2sbd!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={isEnglish ? "Boosting Agency BD Location" : "বুস্টিং এজেন্সি বিডি লোকেশন"}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>
    </>
  )
}
