export interface TeamMember {
  id: string
  name: string
  nameBn?: string
  preferredName?: string
  preferredNameBn?: string
  role: string
  roleBn?: string
  titles: string
  titlesBn?: string
  description: string
  descriptionBn?: string
  positioning?: string
  positioningBn?: string
  bio: string
  bioBn?: string
  yearsExperience?: string
  yearsExperienceBn?: string
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
  education?: {
    degree: string
    degreeBn: string
    institution: string
    institutionBn: string
    graduationYear: string
    graduationYearBn?: string
  }
  certifications?: {
    name: string
    nameBn?: string
    issuer: string
    issuerBn?: string
    description: string
    descriptionBn?: string
    badgeType?: string
  }[]
  experienceHistory?: {
    role: string
    roleBn?: string
    company: string
    companyBn?: string
    period: string
    periodBn?: string
    status?: "current" | "prior" | "review"
    verificationNote?: string
    verificationNoteBn?: string
    responsibilities: string[]
    responsibilitiesBn?: string[]
  }[]
  expertisePillars?: {
    id: string
    title: string
    titleBn: string
    description: string
    descriptionBn: string
    items: string[]
    itemsBn?: string[]
  }[]
  skillsByCategory?: {
    category: string
    categoryBn: string
    skills: string[]
  }[]
  featuredProjects?: {
    title: string
    titleBn: string
    type: "verified" | "demo" | "concept"
    typeLabel: string
    typeLabelBn: string
    industry: string
    industryBn: string
    role: string
    roleBn: string
    description: string
    descriptionBn: string
    keyHighlight: string
    keyHighlightBn: string
  }[]
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "siddiqur-rahman-turjoy",
    name: "Siddiqur Rahman",
    nameBn: "সিদ্দিকুর রহমান",
    preferredName: "Turjoy",
    preferredNameBn: "তুরজয়",
    role: "Founder & CEO",
    roleBn: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা (CEO)",
    titles: "Founder & CEO | Digital Marketing Strategist | Branding & Business Growth Consultant | AI Automation Specialist",
    titlesBn: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী (CEO) | ডিজিটাল মার্কেটিং স্ট্র্যাটেজিস্ট | ব্র্যান্ডিং ও বিজনেস গ্রোথ কনসালট্যান্ট | এআই অটোমেশন স্পেশালিস্ট",
    positioning: "I help businesses connect marketing strategy, brand development, intelligent automation, and marketing technology to build stronger digital operations and sustainable growth.",
    positioningBn: "আমি বিপণন কৌশল, ব্র্যান্ড উন্নয়ন, বুদ্ধিমান অটোমেশন এবং মার্কেটিং প্রযুক্তির সংযোগ ঘটিয়ে ব্যবসার ডিজিটাল অপারেশন ও টেকসই প্রবৃদ্ধি নিশ্চিত করতে সহায়তা করি।",
    yearsExperience: "5+ Years",
    yearsExperienceBn: "৫+ বছর",
    description: "Full-stack digital growth strategist connecting performance marketing, brand consulting, intelligent workflow automation, and conversion analytics.",
    descriptionBn: "পারফরম্যান্স মার্কেটিং, ব্র্যান্ড পরামর্শ, ইন্টেলিজেন্ট ওয়ার্কফ্লো অটোমেশন এবং কনভার্সন অ্যানালিটিক্সের সমন্বয়ে স্কেলেবল প্রবৃদ্ধি নিশ্চিতকারী লিড স্ট্র্যাটেজিস্ট।",
    bio: `Hello, I'm Siddiqur Rahman (Turjoy), Founder & CEO of Boosting Agency BD.

With a background in Computer Science & Engineering and over five years of stated professional experience, I work across digital marketing, brand strategy, business consulting, and AI-powered automation.

My approach connects business objectives with practical marketing strategies, performance advertising, conversion tracking, analytics, and technology-driven workflows.

I focus on helping businesses strengthen their digital presence, improve marketing operations, build more effective brand strategies, and make better-informed growth decisions.

Through Boosting Agency BD, my goal is to bring marketing, branding, analytics, and automation together in practical solutions tailored to business needs.`,
    bioBn: `হ্যালো, আমি সিদ্দিকুর রহমান (তুরজয়), বুস্টিং এজেন্সি বিডি-এর প্রতিষ্ঠাতা ও সিইও।

কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং ব্যাকগ্রাউন্ড এবং ৫ বছরের বেশি পেশাদার অভিজ্ঞতার আলোকে আমি ডিজিটাল মার্কেটিং, ব্র্যান্ড কৌশল, বিজনেস কনসালটিং এবং এআই-চালিত অটোমেশন নিয়ে কাজ করি।

আমার কাজের মূল ভিত্তি হলো ব্যবসার লক্ষ্যমাত্রার সাথে বাস্তবমুখী মার্কেটিং কৌশল, পারফরম্যান্স বিজ্ঞাপন, নিখুঁত কনভার্সন ট্র্যাকিং, ডেটা অ্যানালিটিক্স এবং প্রযুক্তিনির্ভর ওয়ার্কফ্লোর মেলবন্ধন ঘটানো।

ব্যবসা প্রতিষ্ঠানগুলোর ডিজিটাল উপস্থিতি আরও শক্তিশালী করা, মার্কেটিং অপারেশন উন্নত করা, কার্যকরী ব্র্যান্ড কৌশল সাজানো এবং ডেটা-চালিত সিদ্ধান্ত গ্রহণে সহায়তা করাই আমার মূল লক্ষ্য।

বুস্টিং এজেন্সি বিডি-এর মাধ্যমে আমার প্রয়াস হলো মার্কেটিং, ব্র্যান্ডিং, অ্যানালিটিক্স এবং অটোমেশনকে ব্যবসার বাস্তব প্রয়োজন অনুযায়ী একটি সমন্বিত সমাধানে রূপ দেওয়া।`,
    expertise: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads & YouTube Campaigns",
      "Brand Strategy & Positioning",
      "Business Growth Consulting",
      "AI Automation & Intelligent Agents",
      "Server-Side Tracking (CAPI & GA4)",
      "Conversion Rate Optimization (CRO)",
      "Web & Software Technology",
    ],
    expertiseBn: [
      "মেটা অ্যাডস (ফেসবুক ও ইনস্টাগ্রাম)",
      "গুগল অ্যাডস ও ইউটিউব ক্যাম্পেইন",
      "ব্র্যান্ড কৌশল ও পজিশনিং",
      "বিজনেস গ্রোথ কনসালটিং",
      "এআই অটোমেশন ও ইন্টেলিজেন্ট এজেন্টস",
      "সার্ভার-সাইড ট্র্যাকিং (CAPI ও GA4)",
      "কনভার্সন রেট অপটিমাইজেশন (CRO)",
      "ওয়েব ও সফটওয়্যার টেকনোলজি",
    ],
    strengths: [
      "Bridges technical Computer Science fundamentals with high-converting digital marketing strategies.",
      "Comprehensive mastery across Meta Ads, Google Ads, TikTok advertising, and multi-channel acquisition funnels.",
      "Architects robust server-side data infrastructure using Meta CAPI, GA4, and Google Tag Manager.",
      "Designs practical AI workflows, autonomous support agents, and business process automation.",
    ],
    strengthsBn: [
      "কম্পিউটার সায়েন্সের প্রযুক্তিগত ভিত্তির সাথে উচ্চ-রূপান্তর ডিজিটাল মার্কেটিং কৌশলের সমন্বয়।",
      "মেটা অ্যাডস, গুগল অ্যাডস, টিকটক বিজ্ঞাপন এবং মাল্টি-চ্যানেল অ্যাকুইজিশন ফানেলে গভীর অভিজ্ঞতা।",
      "মেটা CAPI, GA4 এবং গুগল ট্যাগ ম্যানেজার ব্যবহারে নির্ভুল সার্ভার-সাইড ট্র্যাকিং আর্কিটেকচার।",
      "ব্যবসায়িক কার্যক্ষমতা বৃদ্ধিতে বাস্তবমুখী এআই ওয়ার্কফ্লো ও গ্রাহক সেবা অটোমেশন সিস্টেম ডিজাইন।",
    ],
    education: {
      degree: "Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)",
      degreeBn: "বিএসসি ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (B.Sc. in CSE)",
      institution: "Bangladesh University of Business and Technology (BUBT)",
      institutionBn: "বাংলাদেশ ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি (বিইউবিটি)",
      graduationYear: "2024",
      graduationYearBn: "২০২৪",
    },
    certifications: [
      {
        name: "Meta Blueprint Certification",
        nameBn: "মেটা ব্লুপ্রিন্ট সার্টিফিকেশন",
        issuer: "Meta",
        issuerBn: "মেটা",
        description: "Advanced campaign planning, full-funnel audience architecture, Meta catalog setup, and ad optimization standards.",
        descriptionBn: "উন্নত ক্যাম্পেইন প্ল্যানিং, ফুল-ফানেল অডিয়েন্স আর্কিটেকচার, মেটা ক্যাটালগ সেটআপ এবং অ্যাড অপটিমাইজেশন স্ট্যান্ডার্ড।",
        badgeType: "Advertising Standard",
      },
      {
        name: "Google Ads Certification",
        nameBn: "গুগল অ্যাডস সার্টিফিকেশন",
        issuer: "Google",
        issuerBn: "গুগল",
        description: "Expertise across Google Search, Display, Measurement, Video, and Performance Max campaign execution.",
        descriptionBn: "গুগল সার্চ, ডিসপ্লে, মেজারমেন্ট, ভিডিও এবং পারফরম্যান্স ম্যাক্স ক্যাম্পেইন পরিচালনায় পেশাদার দক্ষতা।",
        badgeType: "Paid Search & Video",
      },
      {
        name: "Google Data Analytics Professional Certificate",
        nameBn: "গুগল ডেটা অ্যানালিটিক্স প্রফেশনাল সার্টিফিকেট",
        issuer: "Google / Coursera",
        issuerBn: "গুগল / কোরসেরা",
        description: "Data exploration, cleaning, statistical analysis, dashboard reporting, and business metrics synthesis.",
        descriptionBn: "ডেটা এক্সপ্লোরেশন, ক্লিনিং, পরিসংখ্যানগত বিশ্লেষণ, ড্যাশবোর্ড রিপোর্টিং এবং ব্যবসায়িক মেট্রিক্স সিন্থেসিস।",
        badgeType: "Data & Analytics",
      },
      {
        name: "HubSpot Marketing Software Certification",
        nameBn: "হাবস্পট মার্কেটিং সফটওয়্যার সার্টিফিকেশন",
        issuer: "HubSpot Academy",
        issuerBn: "হাবস্পট একাডেমি",
        description: "Inbound marketing methodology, email automation, CRM workflows, and lead nurturing pipeline management.",
        descriptionBn: "ইনবাউন্ড মার্কেটিং মেথোডোলজি, ইমেইল অটোমেশন, সিআরএম ওয়ার্কফ্লো এবং লিড নার্চারিং পাইপলাইন ব্যবস্থাপনা।",
        badgeType: "Inbound & CRM",
      },
      {
        name: "Ethical Hacking Certification",
        nameBn: "এথিক্যাল হ্যাকিং সার্টিফিকেশন",
        issuer: "Creative IT Institute",
        issuerBn: "ক্রিয়েটিভ আইটি ইনস্টিটিউট",
        description: "Cybersecurity fundamentals, network scanning, web vulnerability assessment, and digital asset security hygiene.",
        descriptionBn: "সাইবার সিকিউরিটি ফান্ডামেন্টালস, নেটওয়ার্ক স্ক্যানিং, ওয়েব দুর্বলতা মূল্যায়ন এবং ডিজিটাল অ্যাসেট নিরাপত্তা।",
        badgeType: "Cybersecurity",
      },
    ],
    experienceHistory: [
      {
        role: "Founder & CEO",
        roleBn: "প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা (CEO)",
        company: "Boosting Agency BD",
        companyBn: "বুস্টিং এজেন্সি বিডি",
        period: "2021 – Present",
        periodBn: "২০২১ – বর্তমান",
        status: "current",
        responsibilities: [
          "Directing agency strategy, business growth, client consulting, and high-performance execution teams.",
          "Engineering full-funnel Meta and Google advertising strategies for e-commerce, retail, and corporate brands.",
          "Architecting enterprise-grade conversion tracking, Meta Conversion API (CAPI), and GA4 measurement systems.",
          "Designing intelligent AI customer service agents, automated inquiry routing, and business workflow integrations.",
          "Consulting brand owners on positioning, creative visual identity, and sustainable digital customer acquisition.",
        ],
        responsibilitiesBn: [
          "এজেন্সির সার্বিক কৌশল, ব্যবসায়িক প্রবৃদ্ধি, ক্লায়েন্ট পরামর্শ এবং উচ্চ-পারফরম্যান্স এক্সিকিউশন দল পরিচালনা।",
          "ই-কমার্স, রিটেইল ও করপোরেট ব্র্যান্ডের জন্য ফুল-ফানেল মেটা ও গুগল বিজ্ঞাপন কৌশল প্রণয়ন।",
          "এন্টারপ্রাইজ-গ্রেড কনভার্সন ট্র্যাকিং, মেটা কনভার্সন এপিআই (CAPI) এবং GA4 মেজারমেন্ট সিস্টেম আর্কিটেকচার।",
          "বুদ্ধিমান এআই কাস্টমার সার্ভিস এজেন্ট, ইনকোয়ারি রাউটিং এবং ব্যবসায়িক ওয়ার্কফ্লো অটোমেশন তৈরি।",
          "ব্র্যান্ড পজিশনিং, ক্রিয়েটিভ ভিজ্যুয়াল আইডেন্টিটি এবং টেকসই কাস্টমার অ্যাকুইজিশনে পরামর্শ প্রদান।",
        ],
      },
      {
        role: "Senior Social Media Marketer & Brand Strategist",
        roleBn: "সিনিয়র সোশ্যাল মিডিয়া মার্কেটার ও ব্র্যান্ড স্ট্র্যাটেজিস্ট",
        company: "Algonest",
        companyBn: "অ্যালগোনেস্ট",
        period: "Prior Experience",
        periodBn: "পূর্ববর্তী অভিজ্ঞতা",
        status: "prior",
        responsibilities: [
          "Developed cross-platform social media strategy and digital brand presence for client portfolios.",
          "Directed market research, audience segment profiling, and content marketing framework planning.",
          "Monitored social media campaign performance, engagement metrics, and growth analytics reporting.",
        ],
        responsibilitiesBn: [
          "ক্লায়েন্ট পোর্টফোলিওর জন্য ক্রস-প্ল্যাটফর্ম সোশ্যাল মিডিয়া কৌশল এবং ডিজিটাল ব্র্যান্ড উপস্থিতি তৈরি।",
          "মার্কেট রিসার্চ, অডিয়েন্স সেগমেন্ট প্রোফাইলিং এবং কনটেন্ট মার্কেটিং ফ্রেমওয়ার্ক পরিকল্পনা পরিচালনা।",
          "সোশ্যাল মিডিয়া ক্যাম্পেইন পারফরম্যান্স, এনগেজমেন্ট মেট্রিক্স এবং গ্রোথ অ্যানালিটিক্স মনিটরিং।",
        ],
      },
      {
        role: "Digital Marketing Specialist",
        roleBn: "ডিজিটাল মার্কেটিং স্পেশালিস্ট",
        company: "Robo Tech Valley",
        companyBn: "রোবো টেক ভ্যালি",
        period: "Prior Experience",
        periodBn: "পূর্ববর্তী অভিজ্ঞতা",
        status: "prior",
        responsibilities: [
          "Executed multi-channel digital advertising campaigns targeting niche technical and student demographics.",
          "Implemented search engine optimization (SEO) best practices and organic presence enhancements.",
          "Analyzed digital acquisition channels and optimized conversion pathways to reduce acquisition costs.",
        ],
        responsibilitiesBn: [
          "টেকনিক্যাল এবং স্টুডেন্ট ডেমোগ্রাফিক টার্গেট করে মাল্টি-চ্যানেল ডিজিটাল বিজ্ঞাপন ক্যাম্পেইন পরিচালনা।",
          "সার্চ ইঞ্জিন অপটিমাইজেশন (SEO) এবং অর্গানিক উপস্থিতি বৃদ্ধির কৌশল বাস্তবায়ন।",
          "ডিজিটাল অ্যাকুইজিশন চ্যানেল বিশ্লেষণ এবং কাস্টমার অ্যাকুইজিশন খরচ কমানোর পথ অপটিমাইজেশন।",
        ],
      },
      {
        role: "Software Engineer & AI Automation Specialist",
        roleBn: "সফটওয়্যার ইঞ্জিনিয়ার ও এআই অটোমেশন স্পেশালিস্ট",
        company: "Tech Innovations Ltd",
        companyBn: "টেক ইনোভেশনস লিমিটেড",
        period: "2022 – 2023",
        periodBn: "২০২২ – ২০২৩",
        status: "review",
        verificationNote: "Information preserved from profile history; flagged for review against formal employment records.",
        verificationNoteBn: "প্রোফাইল ইতিহাস থেকে সংরক্ষিত; আনুষ্ঠানিক কর্মসংস্থান রেকর্ডের সাথে যাচাইয়ের জন্য চিহ্নিত।",
        responsibilities: [
          "Developed software logic, web components, and API integrations using modern JavaScript and frameworks.",
          "Integrated AI automation routines and webhooks to streamline repetitive data entry and operational workflows.",
          "Maintained backend endpoints, database interactions, and system security fundamentals.",
        ],
        responsibilitiesBn: [
          "আধুনিক জাভাস্ক্রিপ্ট এবং ফ্রেমওয়ার্ক ব্যবহার করে সফটওয়্যার লজিক, ওয়েব কম্পোনেন্ট এবং এপিআই ইন্টিগ্রেশন তৈরি।",
          "অপারেশনাল ওয়ার্কফ্লো সহজতর করতে এআই অটোমেশন রুটিন এবং ওয়েবহুক সংযুক্তকরণ।",
          "ব্যাকএন্ড এন্ডপয়েন্ট, ডাটাবেস ইন্টারঅ্যাকশন এবং সিস্টেম সিকিউরিটি রক্ষণাবেক্ষণ।",
        ],
      },
    ],
    expertisePillars: [
      {
        id: "performance-marketing",
        title: "Performance Marketing",
        titleBn: "পারফরম্যান্স মার্কেটিং",
        description: "Data-driven advertising designed for measurable return on investment, full-funnel acquisition, and scalable revenue.",
        descriptionBn: "পরিমাপযোগ্য আরওআই, ফুল-ফানেল কাস্টমার অ্যাকুইজিশন এবং স্কেলেবল আয়ের জন্য ডেটা-চালিত বিজ্ঞাপন কৌশল।",
        items: [
          "Meta Ads (Facebook & Instagram)",
          "Google Ads (Search, Display, PMax)",
          "YouTube Advertising",
          "TikTok Advertising",
          "Paid Advertising Strategy",
          "Campaign Optimization",
          "High-Intent Lead Generation",
          "E-commerce Marketing & Scaling",
          "Retargeting & Multi-Stage Funnels",
          "Conversion Rate Optimization (CRO)",
          "Marketing Analytics & ROI Reporting",
        ],
        itemsBn: [
          "মেটা অ্যাডস (ফেসবুক ও ইনস্টাগ্রাম)",
          "গুগল অ্যাডস (সার্চ, ডিসপ্লে, পি-ম্যাক্স)",
          "ইউটিউব বিজ্ঞাপন",
          "টিকটক বিজ্ঞাপন",
          "পেইড বিজ্ঞাপন কৌশল",
          "ক্যাম্পেইন অপটিমাইজেশন",
          "কোয়ালিফাইড লিড জেনারেশন",
          "ই-কমার্স মার্কেটিং ও স্কেলিং",
          "রিটার্গেটিং ও মাল্টি-স্টেজ ফানেল",
          "কনভার্সন রেট অপটিমাইজেশন (CRO)",
          "মার্কেটিং অ্যানালিটিক্স ও ROI রিপোর্টিং",
        ],
      },
      {
        id: "branding-consulting",
        title: "Branding & Business Consulting",
        titleBn: "ব্র্যান্ডিং ও বিজনেস কনসালটিং",
        description: "Transforming businesses into recognizable, defensible market presences through cohesive strategy and positioning.",
        descriptionBn: "সুনির্দিষ্ট কৌশল ও পজিশনিংয়ের মাধ্যমে ব্যবসাকে বাজারে একটি শক্তিশালী ব্র্যান্ড হিসেবে প্রতিষ্ঠিত করা।",
        items: [
          "Brand Strategy & Core Pillars",
          "Brand Positioning & Differentiation",
          "Brand Identity & Visual Direction",
          "Digital Brand Presence & Authority",
          "Marketing Strategy Consulting",
          "Business Growth & Expansion Advisory",
          "Competitor & Market Landscape Analysis",
          "Social Media Content Strategy",
          "Customer Acquisition Strategy",
        ],
        itemsBn: [
          "ব্র্যান্ড কৌশল ও কোর পিলার্স",
          "ব্র্যান্ড পজিশনিং ও স্বাতন্ত্র্য",
          "ব্র্যান্ড আইডেন্টিটি ও ভিজ্যুয়াল ডিরেকশন",
          "ডিজিটাল ব্র্যান্ড কর্তৃত্ব প্রতিষ্ঠা",
          "মার্কেটিং কৌশল পরামর্শ",
          "বিজনেস গ্রোথ ও সম্প্রসারণ গাইডেন্স",
          "প্রতিযোগী ও বাজার বিশ্লেষণ",
          "সোশ্যাল মিডিয়া কনটেন্ট কৌশল",
          "কাস্টমার অ্যাকুইজিশন কৌশল",
        ],
      },
      {
        id: "ai-automation",
        title: "AI & Business Automation",
        titleBn: "এআই ও বিজনেস অটোমেশন",
        description: "Deploying intelligent autonomous agents and automated workflows to eliminate manual bottlenecks and accelerate growth.",
        descriptionBn: "কাজের গতি বাড়াতে এবং ঝামেলা কমাতে ইন্টেলিজেন্ট এআই এজেন্ট ও স্বয়ংক্রিয় ওয়ার্কফ্লো স্থাপন।",
        items: [
          "AI-Powered Customer Support Agents",
          "Autonomous FAQ & Inbound Chatbots",
          "Business Workflow Automation",
          "Marketing Operations Automation",
          "API & Webhook Integrations",
          "Automated Reporting & Data Sync",
          "Lead Management & CRM Routing",
          "Internal Process Optimization",
        ],
        itemsBn: [
          "এআই-চালিত কাস্টমার সাপোর্ট এজেন্টস",
          "অটোনোমাস এফএকিউ ও চ্যাটবট",
          "বিজনেস ওয়ার্কফ্লো অটোমেশন",
          "মার্কেটিং অপারেশন অটোমেশন",
          "এপিআই ও ওয়েবহুক ইন্টিগ্রেশন",
          "অটোমেটেড রিপোর্টিং ও ডেটা সিঙ্ক",
          "লিড ম্যানেজমেন্ট ও সিআরএম রাউটিং",
          "অভ্যন্তরীণ প্রক্রিয়া অপটিমাইজেশন",
        ],
      },
      {
        id: "martech-software",
        title: "Marketing Technology & Software",
        titleBn: "মার্কেটিং টেকনোলজি ও সফটওয়্যার",
        description: "Robust data architectures, server-side tracking, and web foundations that ensure clean attribution and data privacy.",
        descriptionBn: "নির্ভুল অ্যাট্রিবিউশন ও ডেটা নিরাপত্তার জন্য শক্তিশালী সার্ভার-সাইড ট্র্যাকিং ও আধুনিক ওয়েব ভিত্তি।",
        items: [
          "Meta Pixel & Advanced Events",
          "Meta Conversion API (CAPI)",
          "Google Analytics 4 (GA4)",
          "Google Tag Manager (GTM Server-Side)",
          "Conversion Tracking & Attribution",
          "Data Analytics & Custom Dashboards",
          "High-Converting Landing Page Architecture",
          "E-commerce Technology Infrastructure",
          "Software & Web Engineering Principles",
          "Cybersecurity & Data Privacy Fundamentals",
        ],
        itemsBn: [
          "মেটা পিক্সেল ও অ্যাডভান্সড ইভেন্টস",
          "মেটা কনভার্সন এপিআই (CAPI)",
          "গুগল অ্যানালিটিক্স ৪ (GA4)",
          "গুগল ট্যাগ ম্যানেজার (GTM সার্ভার-সাইড)",
          "কনভার্সন ট্র্যাকিং ও অ্যাট্রিবিউশন",
          "ডেটা অ্যানালিটিক্স ও ড্যাশবোর্ড",
          "উচ্চ-রূপান্তর ল্যান্ডিং পেজ আর্কিটেকচার",
          "ই-কমার্স প্রযুক্তি অবকাঠামো",
          "সফটওয়্যার ও ওয়েব ইঞ্জিনিয়ারিং নীতি",
          "সাইবার সিকিউরিটি ও ডেটা প্রাইভেসি",
        ],
      },
    ],
    skillsByCategory: [
      {
        category: "Advertising Platforms",
        categoryBn: "বিজ্ঞাপন প্ল্যাটফর্ম",
        skills: ["Meta Ads Manager", "Google Ads", "YouTube Advertising", "TikTok Ads Manager", "Meta Commerce Manager"],
      },
      {
        category: "Analytics & Tracking",
        categoryBn: "অ্যানালিটিক্স ও ট্র্যাকিং",
        skills: ["Meta Conversion API (CAPI)", "Meta Pixel", "Google Analytics 4 (GA4)", "Google Tag Manager (GTM)", "Server-Side Tracking", "Stape.io / Cloud GTM"],
      },
      {
        category: "Branding & Strategy",
        categoryBn: "ব্র্যান্ডিং ও কৌশল",
        skills: ["Brand Positioning", "Visual Brand Identity", "Full-Funnel Architecture", "Conversion Rate Optimization (CRO)", "Customer Acquisition", "Competitive Benchmarking"],
      },
      {
        category: "AI & Workflow Automation",
        categoryBn: "এআই ও ওয়ার্কফ্লো অটোমেশন",
        skills: ["AI Autonomous Agents", "AI Customer Service Bots", "Zapier / Make Automation", "Webhook Integrations", "Automated Performance Reports", "Lead Pipeline Automation"],
      },
      {
        category: "Web & Software Engineering",
        categoryBn: "ওয়েব ও সফটওয়্যার ইঞ্জিনিয়ারিং",
        skills: ["TypeScript", "React", "Next.js", "Node.js", "Python Fundamentals", "RESTful APIs", "SQL & Relational Databases", "Tailwind CSS"],
      },
      {
        category: "Cybersecurity Fundamentals",
        categoryBn: "সাইবার সিকিউরিটি ফান্ডামেন্টালস",
        skills: ["Ethical Hacking Fundamentals", "Web Application Security", "API Token & Secret Management", "Data Privacy Hygiene"],
      },
    ],
    featuredProjects: [
      {
        title: "Fashion & Retail Multi-Channel Growth",
        titleBn: "ফ্যাশন ও রিটেইল মাল্টি-চ্যানেল গ্রোথ",
        type: "verified",
        typeLabel: "Verified Client Project",
        typeLabelBn: "যাচাইকৃত ক্লায়েন্ট প্রজেক্ট",
        industry: "E-Commerce & Fashion",
        industryBn: "ই-কমার্স ও ফ্যাশন",
        role: "Lead Growth Strategist & Paid Media Buyer",
        roleBn: "লিড গ্রোথ স্ট্র্যাটেজিস্ট ও মিডিয়া বায়ার",
        description: "Implemented catalog-based Meta Ads retargeting, localized Google Shopping, and automated purchase events to scale customer orders consistently.",
        descriptionBn: "ক্যাটালগ-ভিত্তিক মেটা অ্যাডস রিটার্গেটিং, গুগল শপিং এবং অটোমেটেড পারচেজ ইভেন্ট বাস্তবায়নের মাধ্যমে অর্ডার নিয়মিত বৃদ্ধি করা হয়েছে।",
        keyHighlight: "Attributable positive ROI and restored signal accuracy via Meta CAPI.",
        keyHighlightBn: "মেটা CAPI-এর মাধ্যমে নির্ভুল ডেটা ট্র্যাকিং ও টেকসই আরওআই অর্জন।",
      },
      {
        title: "Enterprise Server-Side CAPI & GA4 Tracking Infrastructure",
        titleBn: "এন্টারপ্রাইজ সার্ভার-সাইড CAPI ও GA4 ট্র্যাকিং অবকাঠামো",
        type: "verified",
        typeLabel: "Verified Client Project",
        typeLabelBn: "যাচাইকৃত ক্লায়েন্ট প্রজেক্ট",
        industry: "Digital Services & Retail",
        industryBn: "ডিজিটাল সার্ভিসেস ও রিটেইল",
        role: "Technical Tracking Architect",
        roleBn: "টেকনিক্যাল ট্র্যাকিং আর্কিটেক্ট",
        description: "Engineered complete server-side Google Tag Manager and Meta Conversion API infrastructure to recover signal loss caused by browser ad-blockers and iOS restrictions.",
        descriptionBn: "ব্রাউজার অ্যাড-ব্লকার ও আইওএস সীমাবদ্ধতা কাটিয়ে উঠতে সম্পূর্ণ সার্ভার-সাইড গুগল ট্যাগ ম্যানেজার ও মেটা সিএপিআই অবকাঠামো স্থাপন।",
        keyHighlight: "Near 100% event delivery match rate with deduplication.",
        keyHighlightBn: "ইভেন্ট ডিডুপ্লিকেশনের সাথে শতভাগ কাছাকাছি ডেটা ডেলিভারি ম্যাচ রেট।",
      },
      {
        title: "Furniture & Lifestyle Omnichannel Lead Generation",
        titleBn: "ফার্নিচার ও লাইফস্টাইল ওমনিচ্যানেল লিড জেনারেশন",
        type: "verified",
        typeLabel: "Verified Client Project",
        typeLabelBn: "যাচাইকৃত ক্লায়েন্ট প্রজেক্ট",
        industry: "Home Decor & Furnishing",
        industryBn: "হোম ডেকর ও ফার্নিচার",
        role: "Consultant & Media Buyer",
        roleBn: "কনসালট্যান্ট ও মিডিয়া বায়ার",
        description: "Targeted high-intent local homeowners via Meta visual carousel formats and Google Search intent campaigns, driving direct WhatsApp and showroom consultations.",
        descriptionBn: "মেটা ভিজ্যুয়াল ক্যারোসেল এবং গুগল সার্চ ক্যাম্পেইনের মাধ্যমে সম্ভাব্য ক্রেতাদের সরাসরি হোয়াটসঅ্যাপ ও শোরুম পরামর্শে রূপান্তর।",
        keyHighlight: "Consistent weekly qualified showroom appointments.",
        keyHighlightBn: "সাপ্তাহিক নিয়মিত কোয়ালিফাইড শোরুম অ্যাপয়েন্টমেন্ট বৃদ্ধি।",
      },
      {
        title: "SaaS Multi-Stage Automated Lead Engine",
        titleBn: "SaaS মাল্টি-স্টেজ অটোমেটেড লিড ইঞ্জিন",
        type: "demo",
        typeLabel: "Demonstration Project",
        typeLabelBn: "ডেমোস্ট্রেশন প্রজেক্ট",
        industry: "Software & Technology",
        industryBn: "সফটওয়্যার ও টেকনোলজি",
        role: "Architecture & Framework Designer",
        roleBn: "আর্কিটেকচার ও ফ্রেমওয়ার্ক ডিজাইনার",
        description: "Sample demonstration framework modeling multi-channel paid acquisition linked with automated CRM lead scoring, email nurturing sequences, and live webhook routing.",
        descriptionBn: "মাল্টি-চ্যানেল পেইড বিজ্ঞাপন, সিআরএম লিড স্কোরিং, ইমেইল নার্চারিং এবং লাইভ ওয়েবহুকের সমন্বয়ে তৈরি ডেমোস্ট্রেশন ফ্রেমওয়ার্ক।",
        keyHighlight: "Simulated end-to-end inbound marketing automation blueprint.",
        keyHighlightBn: "ইনবাউন্ড মার্কেটিং অটোমেশনের সমন্বিত সিমুলেটেড ব্লুপ্রিন্ট।",
      },
      {
        title: "Multi-Location Healthcare & Clinic Funnel",
        titleBn: "মাল্টি-লোকেশন হেলথকেয়ার ও ক্লিনিক ফানেল",
        type: "concept",
        typeLabel: "Concept Project",
        typeLabelBn: "কনসেপ্ট প্রজেক্ট",
        industry: "Healthcare & Specialized Clinics",
        industryBn: "স্বাস্থ্যসেবা ও বিশেষায়িত ক্লিনিক",
        role: "Growth Strategy & Concept Designer",
        roleBn: "গ্রোথ স্ট্র্যাটেজি ও কনসেপ্ট ডিজাইনার",
        description: "Conceptual blueprint demonstrating geo-radius patient acquisition campaigns paired with automated WhatsApp appointment scheduling and reminder workflows.",
        descriptionBn: "নির্দিষ্ট ভৌগোলিক এলাকার মধ্যে রোগী আকৃষ্টকরণ এবং অটোমেটেড হোয়াটসঅ্যাপ অ্যাপয়েন্টমেন্ট শিডিউলিংয়ের ধারণাগত মডেল।",
        keyHighlight: "Structured patient journey from localized ad to confirmed booking.",
        keyHighlightBn: "বিজ্ঞাপন থেকে নিশ্চিত বুকিং পর্যন্ত সুসংগঠিত পেশেন্ট জার্নি মডেল।",
      },
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
      "রিসearch-ভিত্তিক রিটার্গেটিং ও লুকঅ্যালাইক মডেলিং",
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
