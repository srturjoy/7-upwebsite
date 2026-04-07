"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ArrowRight, Calendar, Clock, Search, FileText, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { fadeInUp, staggerContainer } from "@/components/ui/motion"

const categories = [
  "All",
  "Social Media",
  "SEO",
  "Paid Advertising",
  "Content Marketing",
  "AI & Technology",
  "Strategy",
]

const categoriesBn: { [key: string]: string } = {
  "All": "সব",
  "Social Media": "সোশ্যাল মিডিয়া",
  "SEO": "এসইও",
  "Paid Advertising": "পেইড বিজ্ঞাপন",
  "Content Marketing": "কন্টেন্ট মার্কেটিং",
  "AI & Technology": "AI ও প্রযুক্তি",
  "Strategy": "কৌশল",
}

const featuredPost = {
  title: "The Complete Guide to Facebook Ads in 2024: Everything You Need to Know",
  titleBn: "২০২৪ সালে ফেসবুক বিজ্ঞাপনের সম্পূর্ণ গাইড: আপনার যা জানা দরকার",
  excerpt: "Master Facebook advertising with our comprehensive guide covering targeting, creative best practices, budget optimization, and measuring success. Learn the strategies that top brands use to achieve exceptional ROAS with Meta Business Suite.",
  excerptBn: "টার্গেটিং, ক্রিয়েটিভ বেস্ট প্র্যাকটিস, বাজেট অপ্টিমাইজেশন এবং সাফল্য পরিমাপ সহ আমাদের সম্পূর্ণ গাইড দিয়ে ফেসবুক বিজ্ঞাপনে দক্ষতা অর্জন করুন।",
  image: "https://media.istockphoto.com/id/543077374/photo/popular-social-media-icons-printed-on-white-paper.jpg?s=2048x2048&w=is&k=20&c=py0PxMABTIotgnHyjs2VU823NZJIeciVk_pnRMDvYYk=",
  date: "March 20, 2024",
  dateBn: "২০ মার্চ, ২০২৪",
  readTime: "15 min read",
  readTimeBn: "১৫ মিনিট পড়ুন",
  category: "Paid Advertising",
  author: "Turjoy Ahmed",
  externalLinks: ["Meta Business Suite", "Facebook Ads Manager"],
  fullContent: `
    <h2>Understanding Facebook Advertising in 2024</h2>
    <p>Facebook advertising has evolved significantly over the years, and 2024 brings new opportunities and challenges for marketers. With over 3 billion monthly active users across Meta's platforms, the potential reach is unprecedented.</p>
    
    <h3>1. Setting Up Your Campaign Structure</h3>
    <p>The foundation of any successful Facebook advertising campaign lies in its structure. We recommend the following hierarchy:</p>
    <ul>
      <li><strong>Campaign Level:</strong> Define your objective (awareness, consideration, or conversion)</li>
      <li><strong>Ad Set Level:</strong> Target your audience, set budget, and schedule</li>
      <li><strong>Ad Level:</strong> Create compelling creatives and copy</li>
    </ul>
    
    <h3>2. Advanced Targeting Strategies</h3>
    <p>In 2024, targeting has become more sophisticated with AI-powered lookalike audiences and interest-based targeting. Here are the key strategies:</p>
    <ul>
      <li>Custom Audiences from website visitors, app users, and customer lists</li>
      <li>Lookalike Audiences based on your best customers</li>
      <li>Detailed targeting combining demographics, interests, and behaviors</li>
      <li>Advantage+ audience optimization for automated targeting</li>
    </ul>
    
    <h3>3. Creative Best Practices</h3>
    <p>Your ad creative is what captures attention in a crowded feed. Follow these guidelines:</p>
    <ul>
      <li>Use high-quality images and videos (1080x1080 or 1080x1920 for Stories)</li>
      <li>Include clear calls-to-action in both visuals and copy</li>
      <li>Test multiple creative variations (A/B testing)</li>
      <li>Leverage user-generated content for authenticity</li>
      <li>Keep video content under 15 seconds for optimal engagement</li>
    </ul>
    
    <h3>4. Budget Optimization</h3>
    <p>Smart budget allocation can make or break your campaign performance:</p>
    <ul>
      <li>Start with Campaign Budget Optimization (CBO) for automatic distribution</li>
      <li>Set realistic daily or lifetime budgets based on your goals</li>
      <li>Monitor cost per result and adjust accordingly</li>
      <li>Use bid caps strategically during high-competition periods</li>
    </ul>
    
    <h3>5. Measuring Success</h3>
    <p>Key metrics to track for Facebook advertising success:</p>
    <ul>
      <li><strong>ROAS (Return on Ad Spend):</strong> Revenue generated per dollar spent</li>
      <li><strong>CTR (Click-Through Rate):</strong> Engagement with your ads</li>
      <li><strong>CPA (Cost Per Acquisition):</strong> Cost to acquire each customer</li>
      <li><strong>Frequency:</strong> How often your audience sees your ads</li>
    </ul>
    
    <h3>Conclusion</h3>
    <p>Facebook advertising in 2024 requires a strategic approach combining data-driven targeting, compelling creative, and continuous optimization. By following these best practices, you can achieve exceptional results and maximize your advertising ROI.</p>
  `,
  fullContentBn: `
    <h2>২০২৪ সালে ফেসবুক বিজ্ঞাপন বোঝা</h2>
    <p>ফেসবুক বিজ্ঞাপন বছরের পর বছর উল্লেখযোগ্যভাবে বিবর্তিত হয়েছে, এবং ২০২৪ মার্কেটারদের জন্য নতুন সুযোগ ও চ্যালেঞ্জ নিয়ে এসেছে। মেটার প্ল্যাটফর্মগুলিতে ৩ বিলিয়নেরও বেশি মাসিক সক্রিয় ব্যবহারকারী সহ, সম্ভাব্য নাগাল অভূতপূর্ব।</p>
    
    <h3>১. আপনার ক্যাম্পেইন স্ট্রাকচার সেট আপ করা</h3>
    <p>যেকোনো সফল ফেসবুক বিজ্ঞাপন ক্যাম্পেইনের ভিত্তি এর স্ট্রাকচারে নিহিত। আমরা নিম্নলিখিত হায়ারার্কি সুপারিশ করি:</p>
    <ul>
      <li><strong>ক্যাম্পেইন লেভেল:</strong> আপনার উদ্দেশ্য সংজ্ঞায়িত করুন (সচেতনতা, বিবেচনা, বা রূপান্তর)</li>
      <li><strong>অ্যাড সেট লেভেল:</strong> আপনার অডিয়েন্স টার্গেট করুন, বাজেট সেট করুন এবং শিডিউল করুন</li>
      <li><strong>অ্যাড লেভেল:</strong> আকর্ষণীয় ক্রিয়েটিভ এবং কপি তৈরি করুন</li>
    </ul>
    
    <h3>২. অ্যাডভান্সড টার্গেটিং কৌশল</h3>
    <p>২০২৪ সালে, AI-পাওয়ার্ড লুকঅ্যালাইক অডিয়েন্স এবং ইন্টারেস্ট-বেসড টার্গেটিংয়ের সাথে টার্গেটিং আরও পরিশীলিত হয়েছে।</p>
    
    <h3>৩. ক্রিয়েটিভ বেস্ট প্র্যাকটিস</h3>
    <p>আপনার বিজ্ঞাপন ক্রিয়েটিভই একটি ভিড়ের ফিডে মনোযোগ আকর্ষণ করে। এই নির্দেশিকাগুলি অনুসরণ করুন।</p>
    
    <h3>৪. বাজেট অপ্টিমাইজেশন</h3>
    <p>স্মার্ট বাজেট বরাদ্দ আপনার ক্যাম্পেইন পারফরম্যান্স তৈরি বা ভাঙতে পারে।</p>
    
    <h3>উপসংহার</h3>
    <p>২০২৪ সালে ফেসবুক বিজ্ঞাপনের জন্য ডেটা-চালিত টার্গেটিং, আকর্ষণীয় ক্রিয়েটিভ এবং ক্রমাগত অপ্টিমাইজেশনের সমন্বয়ে একটি কৌশলগত পদ্ধতির প্রয়োজন।</p>
  `,
}

const posts = [
  {
    title: "10 SEO Trends That Will Dominate 2024",
    titleBn: "২০২৪ সালে আধিপত্য বিস্তার করবে এমন ১০টি SEO ট্রেন্ড",
    excerpt: "Stay ahead of the competition with these emerging SEO trends and strategies that will shape search engine optimization.",
    excerptBn: "এই উদীয়মান SEO ট্রেন্ড এবং কৌশলগুলির সাথে প্রতিযোগিতায় এগিয়ে থাকুন যা সার্চ ইঞ্জিন অপ্টিমাইজেশনকে আকার দেবে।",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=600&h=400&fit=crop",
    date: "March 15, 2024",
    dateBn: "১৫ মার্চ, ২০২৪",
    readTime: "8 min read",
    readTimeBn: "৮ মিনিট পড়ুন",
    category: "SEO",
    author: "Sarah Rahman",
    externalLinks: ["Google Search Console", "Google Analytics"],
    fullContent: `
      <h2>The Evolution of SEO in 2024</h2>
      <p>Search engine optimization continues to evolve rapidly. Here are the top 10 trends shaping SEO this year:</p>
      
      <h3>1. AI-Generated Content Optimization</h3>
      <p>With the rise of AI content tools, Google has updated its algorithms to better evaluate content quality. Focus on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) to ensure your content stands out.</p>
      
      <h3>2. Voice Search Optimization</h3>
      <p>More users are searching via voice assistants. Optimize for conversational keywords and question-based queries to capture this growing traffic.</p>
      
      <h3>3. Core Web Vitals</h3>
      <p>Page experience signals remain crucial. Ensure your site meets Google's Core Web Vitals benchmarks for LCP, FID, and CLS.</p>
      
      <h3>4. Video SEO</h3>
      <p>Video content is dominating search results. Optimize your video titles, descriptions, and transcripts for better visibility.</p>
      
      <h3>5. Local SEO Enhancement</h3>
      <p>Local search continues to grow. Maintain accurate Google Business Profile listings and encourage customer reviews.</p>
      
      <h3>6. Mobile-First Indexing</h3>
      <p>Google uses mobile versions for indexing. Ensure your mobile site provides an excellent user experience.</p>
      
      <h3>7. Structured Data Markup</h3>
      <p>Schema markup helps search engines understand your content. Implement relevant structured data for rich snippets.</p>
      
      <h3>8. Zero-Click Searches</h3>
      <p>Featured snippets and knowledge panels are taking clicks from organic results. Optimize for position zero to maintain visibility.</p>
      
      <h3>9. Content Refresh Strategy</h3>
      <p>Updating existing content can boost rankings faster than creating new content. Regularly audit and refresh your top-performing pages.</p>
      
      <h3>10. Semantic Search</h3>
      <p>Search engines understand context better than ever. Focus on topic clusters and comprehensive content rather than individual keywords.</p>
    `,
    fullContentBn: `
      <h2>২০২৪ সালে SEO এর বিবর্তন</h2>
      <p>সার্চ ইঞ্জিন অপ্টিমাইজেশন দ্রুত বিবর্তিত হচ্ছে। এই বছর SEO কে আকার দিচ্ছে এমন শীর্ষ ১০টি ট্রেন্ড এখানে রয়েছে:</p>
      
      <h3>১. AI-জেনারেটেড কন্টেন্ট অপ্টিমাইজেশন</h3>
      <p>AI কন্টেন্ট টুলের উত্থানের সাথে, গুগল কন্টেন্ট কোয়ালিটি আরও ভালোভাবে মূল্যায়ন করতে তার অ্যালগরিদম আপডেট করেছে।</p>
      
      <h3>২. ভয়েস সার্চ অপ্টিমাইজেশন</h3>
      <p>আরও বেশি ব্যবহারকারী ভয়েস অ্যাসিস্ট্যান্টের মাধ্যমে সার্চ করছেন। এই ক্রমবর্ধমান ট্রাফিক ক্যাপচার করতে কথোপকথনমূলক কীওয়ার্ড এবং প্রশ্ন-ভিত্তিক কোয়েরির জন্য অপ্টিমাইজ করুন।</p>
      
      <h3>৩. কোর ওয়েব ভাইটালস</h3>
      <p>পেজ এক্সপেরিয়েন্স সিগন্যাল গুরুত্বপূর্ণ থাকছে। নিশ্চিত করুন যে আপনার সাইট LCP, FID এবং CLS এর জন্য গুগলের কোর ওয়েব ভাইটালস বেঞ্চমার্ক পূরণ করে।</p>
      
      <h3>৪. ভিডিও SEO</h3>
      <p>ভিডিও কন্টেন্ট সার্চ রেজাল্টে আধিপত্য বিস্তার করছে। আরও ভালো ভিজিবিলিটির জন্য আপনার ভিডিও টাইটেল, বিবরণ এবং ট্রান্সক্রিপ্ট অপ্টিমাইজ করুন।</p>
      
      <h3>৫. লোকাল SEO বর্ধন</h3>
      <p>লোকাল সার্চ ক্রমাগত বাড়ছে। সঠিক গুগল বিজনেস প্রোফাইল লিস্টিং বজায় রাখুন এবং কাস্টমার রিভিউ উৎসাহিত করুন।</p>
    `,
  },
  {
    title: "How AI is Transforming Digital Marketing",
    titleBn: "কিভাবে AI ডিজিটাল মার্কেটিংকে রূপান্তরিত করছে",
    excerpt: "Discover how artificial intelligence is revolutionizing marketing strategies. From ChatGPT to automated campaigns.",
    excerptBn: "আবিষ্কার করুন কিভাবে কৃত্রিম বুদ্ধিমত্তা মার্কেটিং কৌশলে বিপ্লব ঘটাচ্ছে।",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    date: "March 12, 2024",
    dateBn: "১২ মার্চ, ২০২৪",
    readTime: "6 min read",
    readTimeBn: "৬ মিনিট পড়ুন",
    category: "AI & Technology",
    author: "Arif Hassan",
    externalLinks: ["OpenAI", "Google AI"],
    fullContent: `
      <h2>The AI Revolution in Marketing</h2>
      <p>Artificial intelligence is no longer a futuristic concept—it's reshaping how businesses approach marketing today.</p>
      
      <h3>Content Creation and Optimization</h3>
      <p>AI tools like ChatGPT and Claude are helping marketers create content faster than ever. From blog posts to ad copy, AI can generate drafts that humans can refine and personalize.</p>
      
      <h3>Predictive Analytics</h3>
      <p>Machine learning algorithms analyze vast amounts of data to predict customer behavior, helping businesses make smarter decisions about targeting and budget allocation.</p>
      
      <h3>Personalization at Scale</h3>
      <p>AI enables hyper-personalized marketing experiences for millions of customers simultaneously, delivering the right message at the right time.</p>
      
      <h3>Chatbots and Customer Service</h3>
      <p>AI-powered chatbots provide 24/7 customer support, handling common queries and freeing human agents for complex issues.</p>
      
      <h3>Ad Campaign Optimization</h3>
      <p>Platforms like Google and Meta use AI to automatically optimize ad delivery, targeting, and bidding strategies for better performance.</p>
    `,
    fullContentBn: `
      <h2>মার্কেটিংয়ে AI বিপ্লব</h2>
      <p>কৃত্রিম বুদ্ধিমত্তা আর ভবিষ্যৎমুখী ধারণা নয়—এটি আজ ব্যবসাগুলি কিভাবে মার্কেটিংয়ে অ্যাপ্রোচ করে তা পুনর্গঠন করছে।</p>
      
      <h3>কন্টেন্ট তৈরি এবং অপ্টিমাইজেশন</h3>
      <p>ChatGPT এবং Claude এর মতো AI টুল মার্কেটারদের আগের চেয়ে দ্রুত কন্টেন্ট তৈরি করতে সাহায্য করছে।</p>
      
      <h3>প্রেডিক্টিভ অ্যানালিটিক্স</h3>
      <p>মেশিন লার্নিং অ্যালগরিদম গ্রাহকের আচরণ পূর্বাভাস দিতে বিপুল পরিমাণ ডেটা বিশ্লেষণ করে।</p>
      
      <h3>স্কেলে পার্সোনালাইজেশন</h3>
      <p>AI লক্ষ লক্ষ গ্রাহকের জন্য একসাথে হাইপার-পার্সোনালাইজড মার্কেটিং অভিজ্ঞতা সক্ষম করে।</p>
    `,
  },
  {
    title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
    titleBn: "গুগল বিজ্ঞাপন বনাম ফেসবুক বিজ্ঞাপন: আপনার ব্যবসার জন্য কোনটি ভালো?",
    excerpt: "A comprehensive comparison of two advertising giants. Learn when to use each platform for maximum ROI.",
    excerptBn: "দুটি বিজ্ঞাপন জায়ান্টের একটি সম্পূর্ণ তুলনা।",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    date: "March 10, 2024",
    dateBn: "১০ মার্চ, ২০২৪",
    readTime: "10 min read",
    readTimeBn: "১০ মিনিট পড়ুন",
    category: "Paid Advertising",
    author: "Turjoy Ahmed",
    externalLinks: ["Google Ads", "Meta Business"],
    fullContent: `
      <h2>Choosing the Right Advertising Platform</h2>
      <p>Both Google Ads and Facebook Ads are powerful advertising platforms, but they serve different purposes and audiences.</p>
      
      <h3>Google Ads: Intent-Based Marketing</h3>
      <p>Google Ads excels at capturing high-intent users who are actively searching for products or services. Best for:</p>
      <ul>
        <li>E-commerce businesses with clear product searches</li>
        <li>Service businesses targeting local customers</li>
        <li>B2B companies with specific solution queries</li>
      </ul>
      
      <h3>Facebook Ads: Interest-Based Marketing</h3>
      <p>Facebook Ads are ideal for creating demand and building brand awareness. Best for:</p>
      <ul>
        <li>Brand awareness campaigns</li>
        <li>Products with visual appeal</li>
        <li>Targeting specific demographics and interests</li>
      </ul>
      
      <h3>When to Use Both</h3>
      <p>Many successful businesses use both platforms in conjunction—Facebook for top-of-funnel awareness and Google for bottom-of-funnel conversions.</p>
    `,
    fullContentBn: `
      <h2>সঠিক বিজ্ঞাপন প্ল্যাটফর্ম বেছে নেওয়া</h2>
      <p>গুগল বিজ্ঞাপন এবং ফেসবুক বিজ্ঞাপন উভয়ই শক্তিশালী বিজ্ঞাপন প্ল্যাটফর্ম, কিন্তু তারা বিভিন্ন উদ্দেশ্য এবং অডিয়েন্স সেবা করে।</p>
      
      <h3>গুগল বিজ্ঞাপন: ইন্টেন্ট-ভিত্তিক মার্কেটিং</h3>
      <p>গুগল বিজ্ঞাপন উচ্চ-ইন্টেন্ট ব্যবহারকারীদের ক্যাপচার করতে দক্ষ যারা সক্রিয়ভাবে পণ্য বা সেবা খুঁজছেন।</p>
      
      <h3>ফেসবুক বিজ্ঞাপন: ইন্টারেস্ট-ভিত্তিক মার্কেটিং</h3>
      <p>ফেসবুক বিজ্ঞাপন চাহিদা তৈরি এবং ব্র্যান্ড সচেতনতা গড়ে তোলার জন্য আদর্শ।</p>
    `,
  },
  {
    title: "Content Marketing Strategy: A Step-by-Step Guide",
    titleBn: "কন্টেন্ট মার্কেটিং কৌশল: একটি ধাপে ধাপে গাইড",
    excerpt: "Learn how to create a content marketing strategy that drives traffic, generates leads, and builds brand authority.",
    excerptBn: "কিভাবে একটি কন্টেন্ট মার্কেটিং কৌশল তৈরি করতে হয় শিখুন যা ট্রাফিক চালায়, লিড জেনারেট করে এবং ব্র্যান্ড অথরিটি তৈরি করে।",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    date: "March 8, 2024",
    dateBn: "৮ মার্চ, ২০২৪",
    readTime: "12 min read",
    readTimeBn: "১২ মিনিট পড়ুন",
    category: "Content Marketing",
    author: "Nadia Khan",
    externalLinks: ["HubSpot", "SEMrush"],
    fullContent: `
      <h2>Building a Successful Content Marketing Strategy</h2>
      <p>Content marketing is one of the most effective ways to attract and engage your target audience. Here's how to create a strategy that works.</p>
      
      <h3>Step 1: Define Your Goals</h3>
      <p>What do you want to achieve? Common goals include increasing brand awareness, generating leads, and establishing thought leadership.</p>
      
      <h3>Step 2: Know Your Audience</h3>
      <p>Create detailed buyer personas to understand who you're creating content for. What are their pain points, interests, and preferred content formats?</p>
      
      <h3>Step 3: Content Audit</h3>
      <p>Review your existing content to identify what's working and what gaps exist in your content library.</p>
      
      <h3>Step 4: Create a Content Calendar</h3>
      <p>Plan your content production schedule, including topics, formats, and distribution channels.</p>
      
      <h3>Step 5: Measure and Optimize</h3>
      <p>Track key metrics like traffic, engagement, and conversions. Use data to continuously improve your content strategy.</p>
    `,
    fullContentBn: `
      <h2>একটি সফল কন্টেন্ট মার্কেটিং কৌশল তৈরি করা</h2>
      <p>কন্টেন্ট মার্কেটিং আপনার টার্গেট অডিয়েন্সকে আকৃষ্ট এবং এনগেজ করার সবচেয়ে কার্যকর উপায়গুলির মধ্যে একটি।</p>
      
      <h3>ধাপ ১: আপনার লক্ষ্য সংজ্ঞায়িত করুন</h3>
      <p>আপনি কী অর্জন করতে চান? সাধারণ লক্ষ্যগুলির মধ্যে রয়েছে ব্র্যান্ড সচেতনতা বৃদ্ধি, লিড জেনারেট করা এবং থট লিডারশিপ প্রতিষ্ঠা করা।</p>
      
      <h3>ধাপ ২: আপনার অডিয়েন্স জানুন</h3>
      <p>আপনি কার জন্য কন্টেন্ট তৈরি করছেন তা বুঝতে বিস্তারিত বায়ার পার্সোনা তৈরি করুন।</p>
    `,
  },
  {
    title: "Instagram Marketing: The Ultimate Guide for 2024",
    titleBn: "ইনস্টাগ্রাম মার্কেটিং: ২০২৪ এর জন্য চূড়ান্ত গাইড",
    excerpt: "Everything you need to know about marketing on Instagram, from content creation to influencer partnerships.",
    excerptBn: "ইনস্টাগ্রামে মার্কেটিং সম্পর্কে আপনার যা জানা দরকার সবকিছু।",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
    date: "March 5, 2024",
    dateBn: "৫ মার্চ, ২০২৪",
    readTime: "9 min read",
    readTimeBn: "৯ মিনিট ���ড়ুন",
    category: "Social Media",
    author: "Sarah Rahman",
    externalLinks: ["Instagram Business", "Meta Creator Studio"],
    fullContent: `
      <h2>Mastering Instagram Marketing</h2>
      <p>Instagram remains one of the most powerful platforms for brand marketing. Here's your complete guide to success.</p>
      
      <h3>Optimizing Your Profile</h3>
      <p>Your Instagram profile is your digital storefront. Ensure it clearly communicates who you are and what value you provide.</p>
      
      <h3>Content Strategy</h3>
      <p>Create a mix of content types: feed posts, Stories, Reels, and IGTV. Each format serves different purposes in your marketing funnel.</p>
      
      <h3>Hashtag Strategy</h3>
      <p>Use a combination of popular, niche, and branded hashtags to maximize your content's discoverability.</p>
      
      <h3>Engagement Tactics</h3>
      <p>Respond to comments, engage with your community, and use interactive features like polls and questions in Stories.</p>
      
      <h3>Instagram Shopping</h3>
      <p>For e-commerce brands, Instagram Shopping provides a seamless way to drive sales directly from your posts.</p>
    `,
    fullContentBn: `
      <h2>ইনস্টাগ্রাম মার্কেটিংয়ে দক্ষতা অর্জন</h2>
      <p>ইনস্টাগ্রাম ব্র্যান্ড মার্কেটিংয়ের জন্য সবচেয়ে শক্তিশালী প্ল্যাটফর্মগুলির মধ্যে একটি।</p>
      
      <h3>আপনার প্রোফাইল অপ্টিমাইজ করা</h3>
      <p>আপনার ইনস্টাগ্রাম প্রোফাইল আপনার ডিজিটাল স্টোরফ্রন্ট। নিশ্চিত করুন এটি স্পষ্টভাবে জানায় আপনি কে এবং আপনি কী মূল্য প্রদান করেন।</p>
      
      <h3>কন্টেন্ট কৌশল</h3>
      <p>কন্টেন্ট টাইপের মিশ্রণ তৈরি করুন: ফিড পোস্ট, স্টোরিজ, রিলস এবং IGTV।</p>
    `,
  },
  {
    title: "E-commerce Marketing Strategies That Actually Work",
    titleBn: "ই-কমার্স মার্কেটিং কৌশল যা আসলেই কাজ করে",
    excerpt: "Proven strategies to increase your e-commerce sales and build customer loyalty.",
    excerptBn: "আপনার ই-কমার্স বিক্রি বাড়াতে এবং গ্রাহক বিশ্বস্ততা তৈরি করতে প্রমাণিত কৌশল।",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop",
    date: "March 2, 2024",
    dateBn: "২ মার্চ, ২০২৪",
    readTime: "11 min read",
    readTimeBn: "১১ মিনিট পড়ুন",
    category: "Strategy",
    author: "Turjoy Ahmed",
    externalLinks: ["Shopify", "Meta Commerce"],
    fullContent: `
      <h2>E-commerce Marketing That Drives Results</h2>
      <p>In the competitive world of e-commerce, having a solid marketing strategy is essential for success.</p>
      
      <h3>Email Marketing Automation</h3>
      <p>Set up automated email sequences for abandoned cart recovery, post-purchase follow-ups, and customer win-back campaigns.</p>
      
      <h3>Retargeting Campaigns</h3>
      <p>Use pixel-based retargeting to show ads to visitors who didn't complete a purchase, reminding them of products they viewed.</p>
      
      <h3>User-Generated Content</h3>
      <p>Encourage customers to share photos and reviews. UGC builds trust and provides authentic social proof.</p>
      
      <h3>Loyalty Programs</h3>
      <p>Implement a rewards program to increase customer lifetime value and encourage repeat purchases.</p>
      
      <h3>Mobile Optimization</h3>
      <p>Ensure your store provides an excellent mobile shopping experience, as mobile commerce continues to grow.</p>
    `,
    fullContentBn: `
      <h2>ই-কমার্স মার্কেটিং যা ফলাফল দেয়</h2>
      <p>ই-কমার্সের প্রতিযোগিতামূলক বিশ্বে, একটি শক্ত মার্কেটিং কৌশল থাকা সাফল্যের জন্য অপরিহার্য।</p>
      
      <h3>ইমেইল মার্কেটিং অটোমেশন</h3>
      <p>পরিত্যক্ত কার্ট রিকভারি, পোস্ট-পার্চেজ ফলো-আপ এবং কাস্টমার উইন-ব্যাক ক্যাম্পেইনের জন্য অটোমেটেড ইমেইল সিকোয়েন্স সেট আপ করুন।</p>
      
      <h3>রিটার্গেটিং ক্যাম্পেইন</h3>
      <p>যে ভিজিটররা ক্রয় সম্পূর্ণ করেননি তাদের বিজ্ঞাপন দেখাতে পিক্সেল-বেসড রিটার্গেটিং ব্যবহার করুন।</p>
    `,
  },
]

const POSTS_PER_PAGE = 8

export function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | typeof featuredPost | null>(null)
  const { language, t } = useLanguage()
  const isEnglish = language === "en"

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory
      const searchLower = searchQuery.toLowerCase().trim()
      const matchesSearch = searchLower === "" || 
        post.title.toLowerCase().includes(searchLower) ||
        post.titleBn.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.excerptBn.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower)
      
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [filteredPosts, currentPage])

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Check if featured post matches filters
  const showFeaturedPost = useMemo(() => {
    const matchesCategory = activeCategory === "All" || featuredPost.category === activeCategory
    const searchLower = searchQuery.toLowerCase().trim()
    const matchesSearch = searchLower === "" || 
      featuredPost.title.toLowerCase().includes(searchLower) ||
      featuredPost.titleBn.toLowerCase().includes(searchLower) ||
      featuredPost.excerpt.toLowerCase().includes(searchLower) ||
      featuredPost.excerptBn.toLowerCase().includes(searchLower) ||
      featuredPost.author.toLowerCase().includes(searchLower) ||
      featuredPost.category.toLowerCase().includes(searchLower)
    
    return matchesCategory && matchesSearch && currentPage === 1
  }, [activeCategory, searchQuery, currentPage])

  // Count posts per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return posts.length + 1
    return posts.filter((p) => p.category === category).length + 
      (featuredPost.category === category ? 1 : 0)
  }

  const totalResults = filteredPosts.length + (showFeaturedPost ? 1 : 0)

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    return pages
  }

  return (
    <>
      {/* Hero Section with Search */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">{t("ourBlog")}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              {t("marketingInsights")}{" "}
              <span className="text-gradient">{t("industryTrends")}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t("blogDescription")}
            </p>
            
            {/* Functional Search */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder={t("searchArticles")}
                className="pl-10 h-12 rounded-full"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border sticky top-[73px] bg-background/95 backdrop-blur-sm z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === category
                    ? "gradient-primary text-white shadow-md"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {isEnglish ? category : categoriesBn[category]}
                <span
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
                    activeCategory === category
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {getCategoryCount(category)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      {(searchQuery || activeCategory !== "All") && (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isEnglish ? "Showing" : "দেখানো হচ্ছে"} <span className="font-semibold text-foreground">{totalResults}</span> {isEnglish ? `article${totalResults !== 1 ? "s" : ""}` : "আর্টিকেল"}
              {activeCategory !== "All" && (
                <> {isEnglish ? "in" : "এ"} <span className="font-semibold text-primary">{isEnglish ? activeCategory : categoriesBn[activeCategory]}</span></>
              )}
              {searchQuery && (
                <> {isEnglish ? "matching" : "মিলে"} <span className="font-semibold text-primary">&quot;{searchQuery}&quot;</span></>
              )}
            </p>
            {(searchQuery || activeCategory !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setCurrentPage(1)
                }}
              >
                {t("clearFilters")}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Featured Post - only on first page */}
      {showFeaturedPost && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="group relative overflow-hidden rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={isEnglish ? featuredPost.title : featuredPost.titleBn}
                    width={1200}
                    height={600}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="gradient-primary text-white">{t("featured")}</Badge>
                    <Badge variant="secondary">{isEnglish ? featuredPost.category : categoriesBn[featuredPost.category]}</Badge>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {isEnglish ? featuredPost.title : featuredPost.titleBn}
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {isEnglish ? featuredPost.excerpt : featuredPost.excerptBn}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredPost.externalLinks.map((link) => (
                      <span key={link} className="text-xs text-primary/80 bg-primary/10 px-2 py-1 rounded">
                        {link}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {isEnglish ? featuredPost.date : featuredPost.dateBn}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {isEnglish ? featuredPost.readTime : featuredPost.readTimeBn}
                    </span>
                  </div>
                  <div className="mt-8">
                    <Button 
                      className="gradient-primary text-white btn-get-started"
                      onClick={() => setSelectedPost(featuredPost)}
                    >
                      {t("readArticle")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {activeCategory === "All" ? t("latestArticles") : `${isEnglish ? activeCategory : categoriesBn[activeCategory]} ${isEnglish ? "Articles" : "আর্টিকেল"}`}
            </h2>
            {totalPages > 1 && (
              <p className="text-sm text-muted-foreground">
                {isEnglish ? `Page ${currentPage} of ${totalPages}` : `পৃষ্ঠা ${currentPage} এর ${totalPages}`}
              </p>
            )}
          </div>
          
          {paginatedPosts.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${activeCategory}-${currentPage}`}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {paginatedPosts.map((post, index) => (
                  <motion.div
                    key={post.title}
                    variants={fadeInUp}
                    custom={index}
                  >
                    <Card 
                      className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 bg-background cursor-pointer h-full"
                      onClick={() => setSelectedPost(post)}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                      </div>
                      <div className="aspect-[3/2] overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={isEnglish ? post.title : post.titleBn}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                      <CardContent className="p-5 relative">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {isEnglish ? post.category : categoriesBn[post.category]}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {isEnglish ? post.title : post.titleBn}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {isEnglish ? post.excerpt : post.excerptBn}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {post.externalLinks.slice(0, 2).map((link) => (
                            <span key={link} className="text-xs text-primary/70 bg-primary/5 px-1.5 py-0.5 rounded hover:bg-primary/10 transition-colors">
                              {link}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {isEnglish ? post.date : post.dateBn}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {isEnglish ? post.readTime : post.readTimeBn}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-16">
              <FileText className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h3 className="mt-4 text-xl font-semibold text-foreground">{t("noArticlesFound")}</h3>
              <p className="mt-2 text-muted-foreground">
                {isEnglish ? "Try adjusting your search or filter to find what you're looking for." : "আপনি যা খুঁজছেন তা খুঁজে পেতে আপনার সার্চ বা ফিল্টার অ্যাডজাস্ট করে দেখুন।"}
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setCurrentPage(1)
                }}
              >
                {t("viewAllArticles")}
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && paginatedPosts.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                {isEnglish ? "Previous" : "আগের"}
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  typeof page === "number" ? (
                    <Button
                      key={index}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-10",
                        currentPage === page && "gradient-primary text-white"
                      )}
                    >
                      {page}
                    </Button>
                  ) : (
                    <span key={index} className="px-2 text-muted-foreground">
                      {page}
                    </span>
                  )
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                {isEnglish ? "Next" : "পরের"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Article Reading Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedPost && (
            <>
              {/* Hero Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src={selectedPost.image}
                  alt={isEnglish ? selectedPost.title : (selectedPost as typeof posts[0]).titleBn}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="gradient-primary text-white mb-3">
                    {isEnglish ? selectedPost.category : categoriesBn[selectedPost.category]}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-2xl lg:text-3xl font-bold text-foreground">
                      {isEnglish ? selectedPost.title : (selectedPost as typeof posts[0]).titleBn}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                      {isEnglish ? selectedPost.excerpt : (selectedPost as typeof posts[0]).excerptBn}
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                {/* Meta info - without author image/link */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {isEnglish ? selectedPost.date : (selectedPost as typeof posts[0]).dateBn}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {isEnglish ? selectedPost.readTime : (selectedPost as typeof posts[0]).readTimeBn}
                  </span>
                </div>

                {/* Article Content */}
                <article 
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ 
                    __html: isEnglish 
                      ? selectedPost.fullContent 
                      : (selectedPost as typeof posts[0]).fullContentBn 
                  }}
                />

                {/* External Links */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">{isEnglish ? "Related Tools & Resources:" : "সম্পর্কিত টুল ও রিসোর্স:"}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.externalLinks.map((link) => (
                      <span key={link} className="text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                        {link}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gradient-primary text-white" asChild>
                    <a href="/contact">{t("getFreeConsultation")}</a>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedPost(null)}>
                    {t("close")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
