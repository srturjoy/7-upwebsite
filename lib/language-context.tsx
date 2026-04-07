"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react"

type Language = "en" | "bn"

interface Translations {
  [key: string]: {
    en: string
    bn: string
  }
}

// Main translations for the website
export const translations: Translations = {
  // Navigation
  home: { en: "Home", bn: "হোম" },
  about: { en: "About", bn: "আমাদের সম্পর্কে" },
  services: { en: "Services", bn: "সেবাসমূহ" },
  portfolio: { en: "Portfolio", bn: "পোর্টফোলিও" },
  blog: { en: "Blog", bn: "ব্লগ" },
  contact: { en: "Contact", bn: "যোগাযোগ" },
  getStarted: { en: "Get Started", bn: "শুরু করুন" },
  
  // Hero Section
  heroTagline: { en: "Digital Marketing Agency in Bangladesh", bn: "বাংলাদেশের ডিজিটাল মার্কেটিং এজেন্সি" },
  heroTitle1: { en: "Boost Your Business with", bn: "আপনার ব্যবসা বৃদ্ধি করুন" },
  heroTitleHighlight: { en: "Data-Driven", bn: "ডেটা-চালিত" },
  heroTitle2: { en: "Marketing", bn: "মার্কেটিং দিয়ে" },
  heroDescription: { 
    en: "We help businesses grow through strategic digital marketing, creative advertising, and cutting-edge AI automation. Transform your online presence and drive real results.",
    bn: "আমরা কৌশলগত ডিজিটাল মার্কেটিং, সৃজনশীল বিজ্ঞাপন এবং অত্যাধুনিক AI অটোমেশনের মাধ্যমে ব্যবসা বৃদ্ধিতে সহায়তা করি। আপনার অনলাইন উপস্থিতি রূপান্তর করুন।"
  },
  getFreeConsultation: { en: "Get Free Consultation", bn: "বিনামূল্যে পরামর্শ নিন" },
  viewOurWork: { en: "View Our Work", bn: "আমাদের কাজ দেখুন" },
  happyClients: { en: "Happy Clients", bn: "সন্তুষ্ট ক্লায়েন্ট" },
  clientRetention: { en: "Client Retention", bn: "ক্লায়েন্ট ধরে রাখা" },
  adSpendManaged: { en: "Ad Spend Managed", bn: "বিজ্ঞাপন খরচ পরিচালিত" },
  
  // Dynamic Hero Text Options
  dataDrivenMarketing: { en: "Data-Driven Marketing", bn: "ডেটা-চালিত মার্কেটিং" },
  seoOptimization: { en: "SEO Optimization", bn: "এসইও অপটিমাইজেশন" },
  paidAds: { en: "Paid Ads", bn: "পেইড বিজ্ঞাপন" },
  socialMedia: { en: "Social Media", bn: "সোশ্যাল মিডিয়া" },
  aiAutomation: { en: "AI Automation", bn: "এআই অটোমেশন" },
  
  // Services Section
  ourServices: { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
  servicesTitle: { en: "Everything You Need to Grow Online", bn: "অনলাইনে বৃদ্ধির জন্য যা কিছু প্রয়োজন" },
  servicesDescription: { 
    en: "From paid advertising to organic growth, we offer comprehensive digital marketing solutions tailored to your business needs.",
    bn: "পেইড বিজ্ঞাপন থেকে অর্গানিক গ্রোথ পর্যন্ত, আমরা আপনার ব্যবসার প্রয়োজন অনুযায়ী সম্পূর্ণ ডিজিটাল মার্কেটিং সমাধান প্রদান করি।"
  },
  learnMore: { en: "Learn more", bn: "আরও জানুন" },
  viewAllServices: { en: "View All Services", bn: "সব সেবা দেখুন" },
  
  // Service Names
  facebookInstagramAds: { en: "Facebook & Instagram Ads", bn: "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন" },
  googleAds: { en: "Google Ads", bn: "গুগল বিজ্ঞাপন" },
  seoServices: { en: "SEO Services", bn: "এসইও সেবা" },
  webDesignDevelopment: { en: "Web Design & Development", bn: "ওয়েব ডিজাইন ও ডেভেলপমেন্ট" },
  brandingDesign: { en: "Branding & Design", bn: "ব্র্যান্ডিং ও ডিজাইন" },
  digitalMarketingStrategy: { en: "Digital Marketing Strategy", bn: "ডিজিটাল মার্কেটিং কৌশল" },
  contentVideoProduction: { en: "Content & Video Production", bn: "কন্টেন্ট ও ভিডিও প্রোডাকশন" },
  aiAutomationService: { en: "AI Automation", bn: "এআই অটোমেশন" },
  
  // Why Choose Us
  whyChooseUs: { en: "Why Choose Us", bn: "কেন আমাদের বেছে নেবেন" },
  whyChooseUsTitle: { en: "We Are Different from Other Agencies", bn: "আমরা অন্যান্য এজেন্সি থেকে আলাদা" },
  whyChooseUsDescription: { 
    en: "At Boosting Agency BD, we combine creativity with data to deliver marketing campaigns that actually work. Our focus is always on your growth and success.",
    bn: "বুস্টিং এজেন্সি বিডিতে, আমরা সৃজনশীলতার সাথে ডেটা মিলিয়ে কার্যকর মার্কেটিং ক্যাম্পেইন প্রদান করি। আমাদের ফোকাস সবসময় আপনার বৃদ্ধি ও সাফল্যের উপর।"
  },
  dataDrivenApproach: { en: "Data-Driven Approach", bn: "ডেটা-চালিত পদ্ধতি" },
  experiencedTeam: { en: "Experienced Team", bn: "অভিজ্ঞ টিম" },
  provenResults: { en: "Proven Results", bn: "প্রমাণিত ফলাফল" },
  support24_7: { en: "24/7 Support", bn: "২৪/৭ সাপোর্ট" },
  whatYouGet: { en: "What You Get", bn: "আপনি যা পাবেন" },
  
  // Case Studies
  caseStudies: { en: "Case Studies", bn: "কেস স্টাডি" },
  ourSuccessStories: { en: "Our Success Stories", bn: "আমাদের সাফল্যের গল্প" },
  viewAllProjects: { en: "View All Projects", bn: "সব প্রজেক্ট দেখুন" },
  viewDetails: { en: "View Details", bn: "বিস্তারিত দেখুন" },
  strategy: { en: "Strategy", bn: "কৌশল" },
  execution: { en: "Execution", bn: "বাস্তবায়ন" },
  results: { en: "Results", bn: "ফলাফল" },
  close: { en: "Close", bn: "বন্ধ করুন" },
  
  // Testimonials
  testimonials: { en: "Testimonials", bn: "প্রশংসাপত্র" },
  whatOurClientsSay: { en: "What Our Clients Say", bn: "আমাদের ক্লায়েন্টরা কী বলেন" },
  testimonialsDescription: { 
    en: "Don't just take our word for it. Here's what our clients have to say about working with us.",
    bn: "শুধু আমাদের কথায় বিশ্বাস করবেন না। আমাদের সাথে কাজ করার অভিজ্ঞতা সম্পর্কে আমাদের ক্লায়েন্টরা কী বলেন দেখুন।"
  },
  
  // Blog
  ourBlog: { en: "Our Blog", bn: "আমাদের ব্লগ" },
  marketingInsights: { en: "Marketing Insights &", bn: "মার্কেটিং ইনসাইট ও" },
  industryTrends: { en: "Industry Trends", bn: "ইন্ডাস্ট্রি ট্রেন্ড" },
  blogDescription: { 
    en: "Stay updated with the latest digital marketing strategies, tips, and industry insights to help grow your business.",
    bn: "আপনার ব্যবসা বৃদ্ধিতে সাহায্য করার জন্য সর্বশেষ ডিজিটাল মার্কেটিং কৌশল, টিপস এবং ইন্ডাস্ট্রি ইনসাইট সম্পর্কে আপডেট থাকুন।"
  },
  searchArticles: { en: "Search articles...", bn: "আর্টিকেল খুঁজুন..." },
  latestArticles: { en: "Latest Articles", bn: "সর্বশেষ আর্টিকেল" },
  readArticle: { en: "Read Article", bn: "আর্টিকেল পড়ুন" },
  featured: { en: "Featured", bn: "ফিচার্ড" },
  noArticlesFound: { en: "No articles found", bn: "কোন আর্টিকেল পাওয়া যায়নি" },
  viewAllArticles: { en: "View All Articles", bn: "সব আর্টিকেল দেখুন" },
  clearFilters: { en: "Clear filters", bn: "ফিল্টার মুছুন" },
  
  // CTA Section
  readyToBoost: { en: "Ready to Boost Your Business?", bn: "আপনার ব্যবসা বৃদ্ধি করতে প্রস্তুত?" },
  ctaDescription: { 
    en: "Let's discuss how we can help you achieve your marketing goals. Get a free consultation today.",
    bn: "আসুন আলোচনা করি কিভাবে আমরা আপনার মার্কেটিং লক্ষ্য অর্জনে সাহায্য করতে পারি। আজই বিনামূল্যে পরামর্শ নিন।"
  },
  callUsNow: { en: "Call Us Now", bn: "এখনই কল করুন" },
  
  // Footer
  footerDescription: { 
    en: "We help businesses grow through strategic digital marketing, creative branding, and cutting-edge technology solutions.",
    bn: "আমরা কৌশলগত ডিজিটাল মার্কেটিং, সৃজনশীল ব্র্যান্ডিং এবং অত্যাধুনিক প্রযুক্তি সমাধানের মাধ্যমে ব্যবসা বৃদ্ধিতে সহায়তা করি।"
  },
  company: { en: "Company", bn: "কোম্পানি" },
  contactUs: { en: "Contact Us", bn: "যোগাযোগ করুন" },
  allRightsReserved: { en: "All rights reserved.", bn: "সর্বস্বত্ব সংরক্ষিত।" },
  
  // Contact Page
  letsStartConversation: { en: "Let's Start a Conversation", bn: "আসুন কথা বলি" },
  contactHeroDescription: { 
    en: "Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    bn: "কোনো প্রজেক্ট মাথায় আছে? আমরা আপনার কথা শুনতে চাই। আমাদের একটি বার্তা পাঠান এবং আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।"
  },
  getInTouch: { en: "Get in Touch", bn: "যোগাযোগ করুন" },
  phone: { en: "Phone", bn: "ফোন" },
  email: { en: "Email", bn: "ইমেইল" },
  address: { en: "Address", bn: "ঠিকানা" },
  businessHours: { en: "Business Hours", bn: "ব্যবসায়িক সময়" },
  followUs: { en: "Follow Us", bn: "আমাদের ফলো করুন" },
  fastestResponse: { en: "Fastest Response", bn: "দ্রুততম প্রতিক্রিয়া" },
  instantSupport: { en: "Get instant support on WhatsApp", bn: "হোয়াটসঅ্যাপে তাৎক্ষণিক সাপোর্ট পান" },
  chatOnWhatsApp: { en: "Chat on WhatsApp Now", bn: "এখনই হোয়াটসঅ্যাপে চ্যাট করুন" },
  sendUsMessage: { en: "Send Us a Message", bn: "আমাদের একটি বার্তা পাঠান" },
  formDescription: { en: "Fill out the form below and we'll get back to you within 24 hours.", bn: "নিচের ফর্মটি পূরণ করুন এবং আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব।" },
  firstName: { en: "First Name", bn: "প্রথম নাম" },
  lastName: { en: "Last Name", bn: "শেষ নাম" },
  emailAddress: { en: "Email Address", bn: "ইমেইল ঠিকানা" },
  phoneNumber: { en: "Phone Number", bn: "ফোন নম্বর" },
  companyName: { en: "Company Name", bn: "কোম্পানির নাম" },
  serviceInterested: { en: "Service Interested In", bn: "আগ্রহী সেবা" },
  selectService: { en: "Select a service", bn: "একটি সেবা নির্বাচন করুন" },
  estimatedBudget: { en: "Estimated Budget", bn: "আনুমানিক বাজেট" },
  selectBudget: { en: "Select your budget range", bn: "আপনার বাজেট রেঞ্জ নির্বাচন করুন" },
  yourMessage: { en: "Your Message", bn: "আপনার বার্তা" },
  messagePlaceholder: { en: "Tell us about your project, goals, and timeline...", bn: "আপনার প্রজেক্ট, লক্ষ্য এবং সময়সীমা সম্পর্কে বলুন..." },
  sending: { en: "Sending...", bn: "পাঠানো হচ্ছে..." },
  sendMessage: { en: "Send Message", bn: "বার্তা পাঠান" },
  thankYou: { en: "Thank You!", bn: "ধন্যবাদ!" },
  messageSent: { en: "Your message has been sent successfully. We'll get back to you soon.", bn: "আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।" },
  sendAnother: { en: "Send Another Message", bn: "আরেকটি বার্তা পাঠান" },
  faq: { en: "Frequently Asked Questions", bn: "প্রায়শই জিজ্ঞাসিত প্রশ্ন" },
  
  // About Page
  aboutUs: { en: "About Us", bn: "আমাদের সম্পর্কে" },
  weHelpBusinesses: { en: "We Help Businesses", bn: "আমরা ব্যবসায়িকদের সাহায্য করি" },
  growSucceed: { en: "Grow & Succeed", bn: "বৃদ্ধি ও সাফল্য অর্জনে" },
  aboutDescription: { 
    en: "Boosting Agency BD is a full-service digital marketing agency based in Dhaka, Bangladesh. We combine creativity, data, and technology to deliver exceptional marketing results.",
    bn: "বুস্টিং এজেন্সি বিডি ঢাকা, বাংলাদেশ ভিত্তিক একটি পূর্ণ-সেবা ডিজিটাল মার্কেটিং এজেন্সি। আমরা সৃজনশীলতা, ডেটা এবং প্রযুক্তি মিলিয়ে অসাধারণ মার্কেটিং ফলাফল প্রদান করি।"
  },
  projectsCompleted: { en: "Projects Completed", bn: "সম্পন্ন প্রজেক্ট" },
  happyClientsLabel: { en: "Happy Clients", bn: "সন্তুষ্ট ক্লায়েন্ট" },
  yearsExperience: { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" },
  adImpressions: { en: "Ad Impressions", bn: "বিজ্ঞাপন ইম্প্রেশন" },
  ourStory: { en: "Our Story", bn: "আমাদের গল্প" },
  ourMission: { en: "Our Mission", bn: "আমাদের মিশন" },
  ourVision: { en: "Our Vision", bn: "আমাদের ভিশন" },
  ourValues: { en: "Our Values", bn: "আমাদের মূল্যবোধ" },
  whatDrivesUs: { en: "What Drives Us Forward", bn: "যা আমাদের এগিয়ে নিয়ে যায়" },
  ourTeam: { en: "Our Team", bn: "আমাদের টিম" },
  meetExperts: { en: "Meet the Experts Behind Your Success", bn: "আপনার সাফল্যের পেছনের বিশেষজ্ঞদের সাথে পরিচিত হন" },
  readyToWork: { en: "Ready to Work Together?", bn: "একসাথে কাজ করতে প্রস্তুত?" },
  
  // Services Page
  ourServicesPage: { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
  comprehensiveDigital: { en: "Comprehensive", bn: "ব্যাপক" },
  digitalMarketing: { en: "Digital Marketing", bn: "ডিজিটাল মার্কেটিং" },
  solutions: { en: "Solutions", bn: "সমাধান" },
  servicesPageDescription: { 
    en: "From paid advertising to organic growth, we offer a full suite of digital marketing services to help your business thrive in the digital landscape.",
    bn: "পেইড বিজ্ঞাপন থেকে অর্গানিক গ্রোথ পর্যন্ত, ডিজিটাল ল্যান্ডস্কেপে আপনার ব্যবসা সমৃদ্ধ করতে আমরা পূর্ণাঙ্গ ডিজিটাল মার্কেটিং সেবা প্রদান করি।"
  },
  
  // Portfolio Page
  ourPortfolio: { en: "Our Portfolio", bn: "আমাদের পোর্টফোলিও" },
  successStories: { en: "Success Stories That", bn: "সাফল্যের গল্প যা" },
  inspireGrowth: { en: "Inspire Growth", bn: "বৃদ্ধিতে অনুপ্রাণিত করে" },
  portfolioDescription: { 
    en: "Explore our portfolio of successful digital marketing campaigns. Each project represents our commitment to delivering exceptional results for our clients.",
    bn: "আমাদের সফল ডিজিটাল মার্কেটিং ক্যাম্পেইনের পোর্টফোলিও দেখুন। প্রতিটি প্রজেক্ট আমাদের ক্লায়েন্টদের জন্য অসাধারণ ফলাফল প্রদানে আমাদের প্রতিশ্রুতি প্রতিফলিত করে।"
  },
  projectsDelivered: { en: "Projects Delivered", bn: "সরবরাহকৃত প্রজেক্ট" },
  revenueGenerated: { en: "Revenue Generated", bn: "উত্পন্ন রেভিনিউ" },
  clientSatisfaction: { en: "Client Satisfaction", bn: "ক্লায়েন্ট সন্তুষ্টি" },
  wantSimilarResults: { en: "Want Similar Results for Your Business?", bn: "আপনার ব্যবসার জন্য একই রকম ফলাফল চান?" },
  startYourProject: { en: "Start Your Project", bn: "আপনার প্রজেক্ট শুরু করুন" },
  viewOurServices: { en: "View Our Services", bn: "আমাদের সেবা দেখুন" },
  
  // Blog Page
  blogTitle: { en: "Marketing Insights & Industry Trends", bn: "মার্কেটিং ইনসাইট ও ইন্ডাস্ট্রি ট্রেন্ড" },
  blogPageDescription: { 
    en: "Stay updated with the latest digital marketing strategies, tips, and industry insights.",
    bn: "সর্বশেষ ডিজিটাল মার্কেটিং কৌশল, টিপস এবং ইন্ডাস্ট্রি ইনসাইট সম্পর্কে আপডেট থাকুন।"
  },
  subscribeNewsletter: { en: "Subscribe to Our Newsletter", bn: "আমাদের নিউজলেটার সাবস্ক্রাইব করুন" },
  newsletterDescription: { en: "Get the latest marketing tips and insights delivered straight to your inbox.", bn: "সর্বশেষ মার্কেটিং টিপস এবং ইনসাইট সরাসরি আপনার ইনবক্সে পান।" },
  enterEmail: { en: "Enter your email", bn: "আপনার ইমেইল দিন" },
  subscribe: { en: "Subscribe", bn: "সাবস্ক্রাইব করুন" },
  noSpam: { en: "No spam, unsubscribe at any time.", bn: "কোন স্প্যাম নেই, যেকোনো সময় আনসাবস্ক্রাইব করুন।" },
  
  // About Page Extended
  fromSmallTeam: { en: "From a Small Team to a Leading Agency", bn: "ছোট টিম থেকে শীর্ষস্থানীয় এজেন্সিতে" },
  aboutStoryP1: { 
    en: "Founded in 2014, Boosting Agency BD started with a simple mission: to help local businesses compete in the digital world. What began as a two-person operation has grown into a full-service digital marketing agency serving clients across Bangladesh and beyond.",
    bn: "২০১৪ সালে প্রতিষ্ঠিত, বুস্টিং এজেন্সি বিডি একটি সহজ মিশন নিয়ে শুরু হয়েছিল: স্থানীয় ব্যবসাগুলিকে ডিজিটাল বিশ্বে প্রতিযোগিতা করতে সাহায্য করা। দুই জনের একটি অপারেশন হিসাবে যা শুরু হয়েছিল তা বাংলাদেশ এবং তার বাইরে ক্লায়েন্টদের সেবা প্রদানকারী একটি পূর্ণ-সেবা ডিজিটাল মার্কেটিং এজেন্সিতে পরিণত হয়েছে।"
  },
  aboutStoryP2: { 
    en: "Over the years, we have helped hundreds of businesses transform their online presence, generate leads, and increase revenue through strategic digital marketing campaigns.",
    bn: "বছরের পর বছর ধরে, আমরা শত শত ব্যবসাকে তাদের অনলাইন উপস্থিতি রূপান্তর করতে, লিড জেনারেট করতে এবং কৌশলগত ডিজিটাল মার্কেটিং ক্যাম্পেইনের মাধ্যমে রাজস্ব বৃদ্ধি করতে সাহায্য করেছি।"
  },
  aboutStoryP3: { 
    en: "Today, our team of experts specializes in everything from paid advertising and SEO to web development and AI automation, providing comprehensive solutions that drive real business results.",
    bn: "আজ, আমাদের বিশেষজ্ঞ দল পেইড বিজ্ঞাপন এবং SEO থেকে শুরু করে ওয়েব ডেভেলপমেন্ট এবং AI অটোমেশন পর্যন্ত সবকিছুতে বিশেষজ্ঞ, যা প্রকৃত ব্যবসায়িক ফলাফল চালিত করে এমন সম্পূর্ণ সমাধান প্রদান করে।"
  },
  missionDescription: { 
    en: "To empower businesses of all sizes with innovative digital marketing solutions that drive growth, increase revenue, and build lasting brand value. We are committed to delivering measurable results through data-driven strategies and creative excellence.",
    bn: "সব আকারের ব্যবসাগুলিকে উদ্ভাবনী ডিজিটাল মার্কেটিং সমাধান দিয়ে ক্ষমতায়ন করা যা বৃদ্ধি চালায়, রাজস্ব বৃদ্ধি করে এবং দীর্ঘস্থায়ী ব্র্যান্ড মূল্য তৈরি করে। আমরা ডেটা-চালিত কৌশল এবং সৃজনশীল শ্রেষ্ঠত্বের মাধ্যমে পরিমাপযোগ্য ফলাফল প্রদানে প্রতিশ্রুতিবদ্ধ।"
  },
  visionDescription: { 
    en: "To become the most trusted digital marketing partner for businesses in South Asia, known for our innovative approach, exceptional client service, and transformative results. We envision a future where every business can thrive in the digital landscape.",
    bn: "দক্ষিণ এশিয়ার ব্যবসাগুলির জন্য সবচেয়ে বিশ্বস্ত ডিজিটাল মার্কেটিং অংশীদার হওয়া, আমাদের উদ্ভাবনী পদ্ধতি, ব্যতিক্রমী ক্লায়েন্ট সেবা এবং রূপান্তরমূলক ফলাফলের জন্য পরিচিত। আমরা এমন একটি ভবিষ্যতের কল্পনা করি যেখানে প্রতিটি ব্যবসা ডিজিটাল ল্যান্ডস্কেপে সমৃদ্ধ হতে পারে।"
  },
  innovation: { en: "Innovation", bn: "উদ্ভাবন" },
  innovationDesc: { en: "We stay ahead of trends and constantly explore new ways to drive results for our clients.", bn: "আমরা ট্রেন্ডের চেয়ে এগিয়ে থাকি এবং ক্রমাগত আমাদের ক্লায়েন্টদের জন্য ফলাফল চালানোর নতুন উপায় অন্বেষণ করি।" },
  transparency: { en: "Transparency", bn: "স্বচ্ছতা" },
  transparencyDesc: { en: "We believe in open communication and keeping our clients informed every step of the way.", bn: "আমরা খোলা যোগাযোগে বিশ্বাস করি এবং প্রতিটি পদক্ষেপে আমাদের ক্লায়েন্টদের অবহিত রাখি।" },
  excellence: { en: "Excellence", bn: "শ্রেষ্ঠত্ব" },
  excellenceDesc: { en: "We are committed to delivering the highest quality work and exceeding expectations.", bn: "আমরা সর্বোচ্চ মানের কাজ প্রদান এবং প্রত্যাশা অতিক্রম করতে প্রতিশ্রুতিবদ্ধ।" },
  collaboration: { en: "Collaboration", bn: "সহযোগিতা" },
  collaborationDesc: { en: "We work as an extension of your team, building strong partnerships for mutual success.", bn: "আমরা আপনার টিমের একটি এক্সটেনশন হিসাবে কাজ করি, পারস্পরিক সাফল্যের জন্য শক্তিশালী অংশীদারিত্ব তৈরি করি।" },
  getInTouchCta: { en: "Get in Touch", bn: "যোগাযোগ করুন" },
  
  // Services Page Extended
  advancedAudienceTargeting: { en: "Advanced audience targeting", bn: "অ্যাডভান্সড অডিয়েন্স টার্গেটিং" },
  abTesting: { en: "A/B testing and optimization", bn: "A/B টেস্টিং এবং অপ্টিমাইজেশন" },
  retargetingCampaigns: { en: "Retargeting campaigns", bn: "রিটার্গেটিং ক্যাম্পেইন" },
  leadGenAds: { en: "Lead generation ads", bn: "লিড জেনারেশন বিজ্ঞাপন" },
  ecommerceCatalogAds: { en: "E-commerce catalog ads", bn: "ই-কমার্স ক্যাটালগ বিজ্ঞাপন" },
  storyReelAds: { en: "Story and Reel ads", bn: "স্টোরি এবং রিল বিজ্ঞাপন" },
  
  // Contact Page Extended
  typicallyReplies: { en: "Typically replies within minutes", bn: "সাধারণত মিনিটের মধ্যে উত্তর দেয়" },
  chatOnWhatsAppNow: { en: "Chat on WhatsApp Now", bn: "এখনই হোয়াটসঅ্যাপে চ্যাট করুন" },
  
  // Portfolio Page Extended
  allCategories: { en: "All", bn: "সব" },
  ecommerce: { en: "E-commerce", bn: "ই-কমার্স" },
  leadGeneration: { en: "Lead Generation", bn: "লিড জেনারেশন" },
  brandAwareness: { en: "Brand Awareness", bn: "ব্র্যান্ড সচেতনতা" },
  localBusiness: { en: "Local Business", bn: "স্থানীয় ব্যবসা" },
  
  // Welcome Popup Extended
  freeConsultation: { en: "Free Consultation", bn: "বিনামূল্যে পরামর্শ" },
  growYourBusiness: { en: "Grow Your Business with Digital Marketing", bn: "ডিজিটাল মার্কেটিংয়ে আপনার ব্যবসা বাড়ান" },
  popupDescription: { 
    en: "Get a free consultation from our experts. Fill in your details and we'll reach out within 24 hours.",
    bn: "আমাদের বিশেষজ্ঞদের কাছ থেকে বিনামূল্যে পরামর্শ নিন। আপনার তথ্য দিন, আমরা ২৪ ঘন্টার মধ্যে যোগাযোগ করব।"
  },
  yourName: { en: "Your Name", bn: "আপনার নাম" },
  enterYourName: { en: "Enter your name", bn: "আপনার নাম লিখুন" },
  serviceInterestedIn: { en: "Service Interested In", bn: "আগ্রহী সেবা" },
  selectAService: { en: "Select a service", bn: "একটি সেবা নির্বাচন করুন" },
  getFreeCon: { en: "Get Free Consultation", bn: "বিনামূল্যে পরামর্শ নিন" },
  bySubmitting: { 
    en: "By submitting, you agree to receive a callback from our team.",
    bn: "জমা দেওয়ার মাধ্যমে, আপনি আমাদের টিমের কাছ থেকে কলব্যাক পেতে সম্মত হচ্ছেন।"
  },
  closePopup: { en: "Close", bn: "বন্ধ করুন" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback((key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
