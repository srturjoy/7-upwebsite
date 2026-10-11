export interface TeamMember {
  id: string
  name: string
  nameBn?: string
  role: string
  roleBn?: string
  titles: string
  titlesBn?: string
  description: string
  descriptionBn?: string
  bio: string
  bioBn?: string
  expertise: string[]
  expertiseBn?: string[]
  strengths: string[]
  strengthsBn?: string[]
  whatsappMessage: string
  email?: string
  phone?: string
  website?: string
  defaultImages: {
    url: string
    caption: string
    captionBn: string
  }[]
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "siddiqur-rahman-turjoy",
    name: "Siddiqur Rahman Turjoy",
    nameBn: "সিদ্দিকুর রহমান তুরজয়",
    role: "Founder & CEO",
    roleBn: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা (CEO)",
    titles: "Digital Marketer | Facebook, Google & YouTube Ads Expert | Business Analyst | Software Engineer",
    titlesBn: "ডিজিটাল মার্কেটার | ফেসবুক, গুগল ও ইউটিউব অ্যাডস বিশেষজ্ঞ | বিজনেস অ্যানালিস্ট | সফটওয়্যার ইঞ্জিনিয়ার",
    description: "Founder & Lead Strategist driving scalable digital growth through high-performance Meta & Google advertising, full-funnel tracking, and business systems.",
    descriptionBn: "উচ্চ-কার্যক্ষমতার মেটা ও গুগল বিজ্ঞাপন, ফুল-ফানেল ট্র্যাকিং এবং শক্তিশালী বিজনেস সিস্টেমের মাধ্যমে স্কেলেবল ডিজিটাল গ্রোথ নিশ্চিতকারী প্রতিষ্ঠাতা ও লিড স্ট্র্যাটেজিস্ট।",
    bio: "Siddiqur Rahman Turjoy is the Founder & CEO of Boosting Agency BD. Combining advanced software engineering with performance marketing analytics, he has engineered profitable advertising architectures for 500+ businesses across Bangladesh and global markets. He specializes in high-ROI Meta & Google advertising campaigns, conversion-focused funnel design, and enterprise-grade server-side tracking (CAPI & GA4).",
    bioBn: "সিদ্দিকুর রহমান তুরজয় বুস্টিং এজেন্সি বিডি-এর প্রতিষ্ঠাতা ও সিইও। অ্যাডভান্সড সফটওয়্যার ইঞ্জিনিয়ারিং ও পারফরম্যান্স মার্কেটিং অ্যানালিটিক্স সমন্বয় করে তিনি বাংলাদেশ ও আন্তর্জাতিক বাজারে ৫০০+ ব্যবসার জন্য লাভজনক বিজ্ঞাপন আর্কিটেকচার তৈরি করেছেন। তিনি হাই-আরওআই মেটা ও গুগল বিজ্ঞাপন, কনভার্সন-ফোকাসড ফানেল ডিজাইন এবং সার্ভার-সাইড ট্র্যাকিং (CAPI ও GA4)-এ বিশেষজ্ঞ।",
    expertise: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads & YouTube Campaigns",
      "Performance Marketing Strategy",
      "Business Analytics & ROI Modeling",
      "Server-Side Tracking (CAPI & GA4)",
      "Software Engineering & MarTech",
      "Funnel Architecture & Conversion Optimization",
    ],
    expertiseBn: [
      "মেটা অ্যাডস (ফেসবুক ও ইনস্টাগ্রাম)",
      "গুগল অ্যাডস ও ইউটিউব ক্যাম্পেইন",
      "পারফরম্যান্স মার্কেটিং স্ট্র্যাটেজি",
      "বিজনেস অ্যানালিটিক্স ও ROI মডেলিং",
      "সার্ভার-সাইড ট্র্যাকিং (CAPI ও GA4)",
      "মার্কেটিং টেকনোলজি ও সফটওয়্যার আর্কিটেকচার",
      "ফানেল অপটিমাইজেশন ও কনভার্সন রেট গ্রোথ",
    ],
    strengths: [
      "Bridges technical software engineering with high-converting marketing strategies.",
      "Proven track record managing over ৳10M+ in profitable ad spend.",
      "Architects custom tracking and analytics systems for enterprise accuracy.",
      "Delivers end-to-end growth consulting with transparent performance metrics.",
    ],
    strengthsBn: [
      "প্রযুক্তিগত সফটওয়্যার ইঞ্জিনিয়ারিং ও উচ্চ-রূপান্তর মার্কেটিং কৌশলের নিখুঁত সমন্বয়।",
      "১ কোটি টাকার বেশি লাভজনক বিজ্ঞাপন বাজেট সফলভাবে পরিচালনার অভিজ্ঞতা।",
      "নির্ভুল ফলাফলের জন্য এন্টারপ্রাইজ-গ্রেড ট্র্যাকিং ও অ্যানালিটিক্স আর্কিটেকচার।",
      "স্বচ্ছ পারফরম্যান্স মেট্রিক্স ও ডেটা-চালিত প্রবৃদ্ধি নিশ্চিতকরণ।",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to schedule a strategy consultation with Founder Siddiqur Rahman Turjoy.",
    email: "srturjoy@gmail.com",
    phone: "+8801518961899",
    website: "https://turjoy.boostingagencyofficial.site/",
    defaultImages: [
      {
        url: "/images/team/siddiqur-rahman-turjoy.webp",
        caption: "Founder & Lead Marketing Architect",
        captionBn: "প্রতিষ্ঠাতা ও লিড মার্কেটিং আর্কিটেক্ট",
      },
    ],
  },
  {
    id: "joynal-abedin-joy",
    name: "Joynal Abedin (Joy)",
    nameBn: "জয়নাল আবেদিন (জয়)",
    role: "Marketing Technology & Creative Lead",
    roleBn: "মার্কেটিং টেকনোলজি ও ক্রিয়েটিভ লিড",
    titles: "Website Development · Video Marketing · Marketing Technology · Conversion Tracking",
    titlesBn: "ওয়েবসাইট ডেভেলপমেন্ট · ভিডিও মার্কেটিং · মার্কেটিং টেকনোলজি · কনভার্সন ট্র্যাকিং",
    description: "Combining creative marketing with technical expertise to build better digital experiences, engaging video content, and reliable tracking solutions.",
    descriptionBn: "সৃজনশীল মার্কেটিং এবং প্রযুক্তিগত দক্ষতার সমন্বয়ে চমৎকার ডিজিটাল অভিজ্ঞতা, আকর্ষণীয় ভিডিও কনটেন্ট এবং নির্ভরযোগ্য ট্র্যাকিং সমাধান তৈরি।",
    bio: "Joynal Abedin (Joy) works across website development, video marketing, and marketing technology. His combined creative and technical capabilities help businesses establish a stronger digital presence through professional websites, engaging marketing videos, and reliable tracking implementations.",
    bioBn: "জয়নাল আবেদিন (জয়) ওয়েবসাইট ডেভেলপমেন্ট, ভিডিও মার্কেটিং এবং মার্কেটিং টেকনোলজি নিয়ে কাজ করেন। তাঁর সৃজনশীল ও প্রযুক্তিগত দক্ষতার সমন্বয় ব্যবসা প্রতিষ্ঠানগুলোকে প্রফেশনাল ওয়েবসাইট, আকর্ষক মার্কেটিং ভিডিও এবং নির্ভরযোগ্য ট্র্যাকিং বাস্তবায়নের মাধ্যমে ডিজিটাল উপস্থিতি আরও মজবুত করতে সাহায্য করে।",
    expertise: [
      "Website Development",
      "Marketing Video Production",
      "Video Marketing Strategy",
      "Marketing Technology Implementation",
      "Conversion Tracking Setup",
      "Digital Marketing Technical Support",
      "Website & Marketing Integration",
    ],
    expertiseBn: [
      "ওয়েবসাইট ডেভেলপমেন্ট",
      "মার্কেটিং ভিডিও প্রোডাকশন",
      "ভিডিও মার্কেটিং স্ট্র্যাটেজি",
      "মার্কেটিং টেকনোলজি বাস্তবায়ন",
      "কনভার্সন ট্র্যাকিং সেটআপ",
      "ডিজিটাল মার্কেটিং টেকনিক্যাল সাপোর্ট",
      "ওয়েবসাইট ও মার্কেটিং সমন্বয়",
    ],
    strengths: [
      "Combines website development with creative marketing execution.",
      "Understands how website experiences and marketing content support customer acquisition.",
      "Can contribute to implementing tracking solutions that help businesses understand campaign performance.",
      "Bridges creative production and technical implementation.",
    ],
    strengthsBn: [
      "ওয়েবসাইট ডেভেলপমেন্টের সাথে সৃজনশীল মার্কেটিং এক্সিকিউশনের মেলবন্ধন তৈরি করেন।",
      "ওয়েবসাইট অভিজ্ঞতা ও ভিডিও কীভাবে নতুন গ্রাহক আকর্ষণে ভূমিকা রাখে তা গভীরভাবে বোঝেন।",
      "ক্যাম্পেইন পারফরম্যান্স ট্র্যাক করার জন্য নির্ভরযোগ্য সলিউশন বাস্তবায়নে পারদর্শী।",
      "সৃজনশীল প্রোডাকশন ও টেকনিক্যাল বাস্তবায়নের মধ্যে সেতুবন্ধন রচনা করেন।",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss website development and creative marketing solutions with Joynal Abedin (Joy).",
    email: "contact@boostingagencyofficial.site",
    phone: "+8801518961899",
    defaultImages: [
      {
        url: "/images/team/joynal-abedin-joy.webp",
        caption: "Creative & Marketing Technology Specialist",
        captionBn: "ক্রিয়েটিভ ও মার্কেটিং টেকনোলজি বিশেষজ্ঞ",
      },
    ],
  },
  {
    id: "mohidul-islam-sojib",
    name: "Mohidul Islam Sojib",
    nameBn: "মহিদুল ইসলাম সজীব",
    role: "Head of Performance Marketing & Strategy",
    roleBn: "হেড অব পারফরম্যান্স মার্কেটিং অ্যান্ড স্ট্র্যাটেজি",
    titles: "Meta Ads Campaign Management · Performance Marketing Strategy · Advertising Campaign Analysis · Sales-Focused Campaign Planning",
    titlesBn: "মেটা অ্যাডস ক্যাম্পেইন ম্যানেজমেন্ট · পারফরম্যান্স মার্কেটিং স্ট্র্যাটেজি · বিজ্ঞাপন ক্যাম্পেইন অ্যানালিসিস · সেলস-ফোকাসড প্ল্যানিং",
    description: "Approaching advertising as a performance-driven business activity with sales-focused Meta campaigns and strategic market analysis.",
    descriptionBn: "বিজ্ঞাপনকে একটি সেলস ও পারফরম্যান্স-চালিত ব্যবসায়িক মাধ্যম হিসেবে পরিচালনা এবং নিখুঁত বাজার বিশ্লেষণের মাধ্যমে কৌশল প্রণয়ন।",
    bio: "Mohidul Islam Sojib specializes in sales-oriented thinking, marketing analysis, idea generation, and Meta advertising. His strength lies in approaching advertising as a performance-driven business activity—analyzing campaign performance, identifying opportunities, developing marketing ideas, and shaping strategies around business objectives.",
    bioBn: "মহিদুল ইসলাম সজীব সেলস-ওরিয়েন্টেড চিন্তাধারা, মার্কেটিং অ্যানালিসিস, নতুন আইডিয়া জেনারেশন এবং মেটা বিজ্ঞাপনে বিশেষজ্ঞ। তাঁর অন্যতম শক্তি হলো বিজ্ঞাপনকে একটি ফলাফল-নির্ভর ব্যবসায়িক কার্যকলাপ হিসেবে পরিচালনা করা—ক্যাম্পেইন পারফরম্যান্স বিশ্লেষণ করা, নতুন সুযোগ শনাক্ত করা এবং ব্যবসায়িক লক্ষ্যের সাথে সামঞ্জস্য রেখে কৌশল তৈরি করা।",
    expertise: [
      "Meta Ads Campaign Management",
      "Facebook & Instagram Advertising",
      "Performance Marketing Strategy",
      "Advertising Campaign Analysis",
      "Audience & Campaign Research",
      "Marketing Idea Generation",
      "Sales-Focused Campaign Planning",
      "Campaign Optimization & Scaling",
    ],
    expertiseBn: [
      "মেটা অ্যাডস ক্যাম্পেইন ম্যানেজমেন্ট",
      "ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন",
      "পারফরম্যান্স মার্কেটিং স্ট্র্যাটেজি",
      "অ্যাডভার্টাইজিং ক্যাম্পেইন অ্যানালিসিস",
      "অডিয়েন্স ও মার্কেট রিসার্চ",
      "মার্কেটিং আইডিয়া ও ক্রিয়েটিভ অ্যাঙ্গেল জেনারেশন",
      "সেলস-ফোকাসড ক্যাম্পেইন প্ল্যানিং",
      "ক্যাম্পেইন অপটিমাইজেশন ও স্কেলিং",
    ],
    strengths: [
      "Approaches advertising as a performance-driven, profit-focused business activity.",
      "In-depth campaign analysis that identifies revenue opportunities and eliminates ad waste.",
      "Generates sales-oriented marketing ideas and audience angles tailored to real business goals.",
      "Executes systematic campaign optimization to maximize return on ad spend.",
    ],
    strengthsBn: [
      "বিজ্ঞাপনকে একটি প্রফিট ও আরওআই-চালিত ব্যবসায়িক কার্যকলাপ হিসেবে পরিচালনা করেন।",
      "গভীর ক্যাম্পেইন বিশ্লেষণের মাধ্যমে নতুন সেলস সুযোগ তৈরি এবং অপচয় রোধ করেন।",
      "বাস্তব ব্যবসায়িক লক্ষ্যের সাথে মিল রেখে সেলস-ওরিয়েন্টেড মার্কেটিং পরিকল্পনা দেন।",
      "সর্বোচ্চ রিটার্ন (ROAS) নিশ্চিত করতে সুশৃঙ্খল ক্যাম্পেইন অপটিমাইজেশন সম্পাদন করেন।",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss performance marketing and Meta advertising strategy with Mohidul Islam Sojib.",
    email: "contact@boostingagencyofficial.site",
    phone: "+8801518961899",
    defaultImages: [
      {
        url: "/images/team/mohidul-islam-sojib.webp",
        caption: "Performance Marketing & Meta Lead",
        captionBn: "পারফরম্যান্স মার্কেটিং ও মেটা লিড",
      },
    ],
  },
  {
    id: "abir-islam-joy",
    name: "Abir Islam Joy",
    nameBn: "আবির ইসলাম জয়",
    role: "Creative Media Buyer & Growth Strategist",
    roleBn: "ক্রিয়েটিভ মিডিয়া বায়ার ও গ্রোথ স্ট্র্যাটেজিস্ট",
    titles: "Media Buying · Creative Ad Strategy · Meta Campaign Management · Audience Research",
    titlesBn: "মিডিয়া বায়িং · ক্রিয়েটিভ অ্যাড স্ট্র্যাটেজি · মেটা ক্যাম্পেইন ম্যানেজমেন্ট · অডিয়েন্স রিসার্চ",
    description: "Driving brand reach and qualified customer acquisition through high-converting creative media buying and strategic campaign execution.",
    descriptionBn: "উচ্চ-রূপান্তর মিডিয়া বায়িং এবং কৌশলগত প্রচারণার মাধ্যমে ব্র্যান্ডের বিস্তার এবং সঠিক কাস্টমার অ্যাকুইজিশন বৃদ্ধি করা।",
    bio: "Abir Islam Joy specializes in creative media buying, high-intent audience research, and multi-channel campaign management. He combines creative storytelling with aggressive media buying tactics to scale customer acquisition, lower acquisition costs, and maximize return on ad spend for growing brands.",
    bioBn: "আবির ইসলাম জয় ক্রিয়েটিভ মিডিয়া বায়িং, হাই-ইনটেন্ট অডিয়েন্স রিসার্চ এবং মাল্টি-চ্যানেল ক্যাম্পেইন ম্যানেজমেন্টে বিশেষজ্ঞ। তিনি সৃজনশীল বিজ্ঞাপনের সাথে আধুনিক মিডিয়া বায়িং কৌশলের সমন্বয় ঘটিয়ে নতুন কাস্টমার অর্জন খরচ কমিয়ে ব্যবসা দ্রুত বৃদ্ধিতে সহায়তা করেন।",
    expertise: [
      "Media Buying & Budget Allocation",
      "Creative Ad Strategy & Storytelling",
      "Meta Campaign Management",
      "Audience Research & Demographic Targeting",
      "Retargeting & Lookalike Modeling",
      "High-Converting Ad Hooks & Copy",
      "Campaign Scaling & ROAS Optimization",
    ],
    expertiseBn: [
      "মিডিয়া বায়িং ও বাজেট বণ্টন",
      "ক্রিয়েটিভ অ্যাড স্ট্র্যাটেজি ও স্টোরিটেলিং",
      "মেটা ক্যাম্পেইন ম্যানেজমেন্ট",
      "অডিয়েন্স রিসার্চ ও ডেমোগ্রাফিক টার্গেটিং",
      "রিসার্চ-ভিত্তিক রিটার্গেটিং ও লুকঅ্যালাইক মডেলিং",
      "আকর্ষণীয় অ্যাড হুক ও কনভার্সন কপিরাইটিং",
      "ক্যাম্পেইন স্কেলিং ও ROAS অপটিমাইজেশন",
    ],
    strengths: [
      "Finds high-converting creative angles and ad hooks that capture audience attention.",
      "Executes disciplined media buying and budget pacing to sustain profitability.",
      "Deep audience research that uncovers untapped customer segments.",
      "Integrates compelling visuals with sales-focused ad copy.",
    ],
    strengthsBn: [
      "দর্শকদের দৃষ্টি আকর্ষণকারী উচ্চ-রূপান্তর বিজ্ঞাপন অ্যাঙ্গেল ও হুক তৈরিতে দক্ষ।",
      "লাভজনকতা বজায় রাখতে নিয়ন্ত্রিত মিডিয়া বায়িং এবং বাজেট পেসিং পরিচালনা করেন।",
      "গভীর অডিয়েন্স অ্যানালিসিসের মাধ্যমে অপ্রকাশিত কাস্টমার সেগমেন্ট উন্মোচন করেন।",
      "আকর্ষণীয় ভিজ্যুয়ালের সাথে সেলস-ফোকাসড বিজ্ঞাপনের চমৎকার সমন্বয় ঘটান।",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss creative media buying and ad campaigns with Abir Islam Joy.",
    email: "contact@boostingagencyofficial.site",
    phone: "+8801518961899",
    defaultImages: [
      {
        url: "/images/team/abir-islam-joy.webp",
        caption: "Creative Media Buyer & Campaign Strategist",
        captionBn: "ক্রিয়েটিভ মিডিয়া বায়ার ও ক্যাম্পেইন স্ট্র্যাটেজিস্ট",
      },
    ],
  },
  {
    id: "azom",
    name: "Azom",
    nameBn: "আজম",
    role: "Performance Marketing & eCommerce Specialist",
    roleBn: "পারফরম্যান্স মার্কেটিং ও ই-কমার্স স্পেশালিস্ট",
    titles: "eCommerce Advertising · Performance Marketing · Conversion Optimization · Campaign Scaling",
    titlesBn: "ই-কমার্স বিজ্ঞাপন · পারফরম্যান্স মার্কেটিং · কনভার্সন অপটিমাইজেশন · ক্যাম্পেইন স্কেলিং",
    description: "Scaling businesses and eCommerce brands with data-backed advertising strategies, conversion optimization, and measurable ROI.",
    descriptionBn: "ডেটা-ব্যাকড বিজ্ঞাপন কৌশল, কনভার্সন অপটিমাইজেশন এবং পরিমাপযোগ্য আরওআই সহ ই-কমার্স ও রিটেইল ব্র্যান্ড স্কেলিং।",
    bio: "Azom specializes in eCommerce growth, DTC brand scaling, and conversion rate optimization. He leverages performance data to optimize sales funnels, scale Meta and social ad campaigns, and drive sustainable revenue growth for retail, digital, and eCommerce businesses.",
    bioBn: "আজম ই-কমার্স গ্রোথ, ডিটিসি ব্র্যান্ড স্কেলিং এবং কনভার্সন রেট অপটিমাইজেশনে বিশেষজ্ঞ। তিনি পারফরম্যান্স ডেটা বিশ্লেষণ করে সেলস ফানেল অপটিমাইজ করেন, মেটা ও সোশ্যাল অ্যাড ক্যাম্পেইন স্কেল করেন এবং রিটেইল ও ই-কমার্স ব্যবসার জন্য টেকসই রেভিনিউ প্রবৃদ্ধি নিশ্চিত করেন।",
    expertise: [
      "eCommerce Advertising & Scaling",
      "Performance Marketing & DTC Growth",
      "Conversion Rate Optimization (CRO)",
      "Sales Funnel Architecture & Testing",
      "Ad Spend Efficiency & ROAS Maximization",
      "Campaign Analytics & Daily Performance Pacing",
      "Customer Retention & Repeat Purchase Strategy",
    ],
    expertiseBn: [
      "ই-কমার্স বিজ্ঞাপন ও স্কেলিং",
      "পারফরম্যান্স মার্কেটিং ও ডিটিসি গ্রোথ",
      "কনভার্সন রেট অপটিমাইজেশন (CRO)",
      "সেলস ফানেল আর্কিটেকচার ও এ/বি টেস্টিং",
      "অ্যাড স্পেন্ড কার্যকারিতা ও ROAS বৃদ্ধি",
      "ক্যাম্পেইন অ্যানালিটিক্স ও দৈনিক পেসিং",
      "কাস্টমার রিটেনশন ও রিপিট পারচেজ কৌশল",
    ],
    strengths: [
      "Extensive experience scaling eCommerce stores with profitable and sustainable ROAS.",
      "Deep understanding of consumer psychology and checkout conversion drivers.",
      "Data-driven scaling protocols that maintain profitability at high daily ad spend.",
      "Continuous funnel testing to eliminate friction and increase average order value.",
    ],
    strengthsBn: [
      "লাভজনক ও টেকসই ROAS সহ বিভিন্ন ই-কমার্স স্টোর স্কেল করার ব্যাপক বাস্তব অভিজ্ঞতা।",
      "ভোক্তা আচরণ ও চেকআউট কনভার্সন সাইকোলজি সম্পর্কে গভীর বোঝাপড়া।",
      "উচ্চ দৈনিক বাজেটেও লাভ বজায় রাখার ডেটা-চালিত স্কেলিং প্রটোকল প্রয়োগ।",
      "বাধা দূর করতে এবং গড় অর্ডার ভ্যালু (AOV) বাড়াতে নিয়মিত ফানেল টেস্টিং।",
    ],
    whatsappMessage: "Hello Boosting Agency BD, I would like to discuss eCommerce advertising and performance scaling with Azom.",
    email: "contact@boostingagencyofficial.site",
    phone: "+8801518961899",
    defaultImages: [
      {
        url: "/images/team/azom.webp",
        caption: "eCommerce Scaling & Growth Specialist",
        captionBn: "ই-কমার্স স্কেলিং ও গ্রোথ স্পেশালিস্ট",
      },
    ],
  },
]

export function getTeamMember(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id)
}
