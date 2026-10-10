export interface TermSection {
  id: string
  title_en: string
  title_bn: string
  category: "terms" | "privacy" | "payment" | "compliance"
  summary_en: string
  summary_bn: string
  points_en: string[]
  points_bn: string[]
  badge?: {
    en: string
    bn: string
  }
}

export const termsAndConditionsData: TermSection[] = [
  {
    id: "acceptance-of-terms",
    title_en: "1. Acceptance of Terms & Agency Scope",
    title_bn: "১. শর্তাবলীর গ্রহণযোগ্যতা ও সেবার পরিধি",
    category: "terms",
    badge: { en: "Binding Agreement", bn: "বাধ্যতামূলক চুক্তি" },
    summary_en: "By hiring Boosting Agency BD, purchasing ad top-ups, depositing campaign spend, or engaging any of our digital marketing services, you enter into a legally binding agreement under these Terms & Conditions.",
    summary_bn: "বুস্টিং এজেন্সি বিডি-র যে কোনো সেবা গ্রহণ, অ্যাড বাজেট টপ-আপ, ক্যাম্পেইন বাজেট ডিপোজিট বা মার্কেটিং চুক্তি সম্পন্ন করার মাধ্যমে আপনি এই সকল শর্তাবলী ও নিয়মাবলীর সাথে সম্পূর্ণ একমত পোষণ করছেন।",
    points_en: [
      "Boosting Agency BD ('Agency', 'We', 'Us') provides Meta Ads (Facebook & Instagram), Google Marketing, YouTube & TikTok promotion, Server-Side Tracking (CAPI & GA4), SEO, and Custom Web Design.",
      "The Client ('You', 'Advertiser') agrees to provide accurate business details and authorized access necessary for the execution of agreed campaigns.",
      "These terms apply to all service packages, monthly retainers, custom enterprise contracts, and ad balance top-ups."
    ],
    points_bn: [
      "বুস্টিং এজেন্সি বিডি ('এজেন্সি', 'আমরা') মেটা (ফেসবুক ও ইনস্টাগ্রাম) বিজ্ঞাপন, গুগল বিজ্ঞাপন, ইউটিউব ও টিকটক প্রোমোশন, সার্ভার-সাইড ট্র্যাকিং (CAPI ও GA4), এসইও এবং কাস্টম ওয়েব ডিজাইন সেবা প্রদান করে।",
      "ক্লায়েন্ট ('আপনি', 'বিজ্ঞাপনদাতা') ক্যাম্পেইন সফলভাবে পরিচালনার জন্য প্রয়োজনীয় সঠিক ব্যবসায়িক তথ্য এবং অনুমোদিত এক্সেস প্রদানে সম্মত হন।",
      "এই শর্তাবলী সকল প্রকার সার্ভিস প্যাকেজ, মাসিক রিটেইনার, কাস্টম এন্টারপ্রাইজ চুক্তি এবং অ্যাড ব্যালেন্স টপ-আপের ক্ষেত্রে সমভাবে প্রযোজ্য।"
    ]
  },
  {
    id: "payment-and-dollar-rates",
    title_en: "2. Payment Policy, Rates & Advance Requirement",
    title_bn: "২. পেমেন্ট নীতিমালা, রেট ও অগ্রিম বাজেট পরিশোধ",
    category: "payment",
    badge: { en: "100% Prepaid Ads", bn: "১০০% প্রিপেইড বাজেট" },
    summary_en: "All advertising platform spend (Meta/Google ad spend) must be 100% prepaid before campaigns go live. Agency retainers and service charges are billed upfront.",
    summary_bn: "বিজ্ঞাপন খরচের বাজেট (অ্যাড স্পেন্ড) ক্যাম্পেইন লাইভ করার আগেই সম্পূর্ণ প্রিপেইড বা অগ্রিম পরিশোধ করতে হবে। এজেন্সির মাসিক রিটেইনার ফি-ও কাজের শুরুতে প্রদেয়।",
    points_en: [
      "Ad Spend Advance: Media ad budgets for Meta, Google, or TikTok must be paid in full prior to launch. We do not advance ad credit or run debt-based ad spend.",
      "Agency Retainer: Monthly management fees (standard ৳10,000/month or agreed package cost) must be paid at the start of each service cycle.",
      "Commercial USD Service Rate: Boosting Agency BD's dollar conversion rate (৳145/USD for managed campaigns, ৳135/USD for top-up only, ৳155/USD for special categories) is a dedicated commercial service rate covering payment gateway costs, dual-currency international card endorsement, and ad account maintenance. It is NOT the raw interbank currency exchange rate.",
      "Payment Channels: We accept bKash Merchant/Personal, Nagad, Rocket, Direct Bank Transfer (City Bank, BRAC Bank, Dutch-Bangla Bank), and Cash at our Mirpur-2 office."
    ],
    points_bn: [
      "অ্যাড স্পেন্ড অগ্রিম পরিশোধ: মেটা, গুগল বা টিকটক বিজ্ঞাপনের প্ল্যাটফর্ম বাজেট ক্যাম্পেইন চালুর পূর্বেই শতভাগ পরিশোধ করতে হবে। বাকি বা বাকিতে বিজ্ঞাপন চালানো হয় না।",
      "এজেন্সি রিটেইনার ফি: মাসিক ম্যানেজমেন্ট ফি (স্ট্যান্ডার্ড ১০,০০০ টাকা/মাস বা চুক্তিকৃত প্যাকেজ ফি) প্রতি সার্ভিস মেয়াদের শুরুতে পরিশোধ করতে হবে।",
      "কমার্শিয়াল ডলার সার্ভিস রেট: বুস্টিং এজেন্সি বিডি-র ডলার রেট (ম্যানেজড ক্যাম্পেইনে ১৪৫ টাকা/ডলার, টপ-আপ অনলিতে ১৩৫ টাকা/ডলার, বিশেষ ক্যাটাগরিতে ১৫৫ টাকা/ডলার) একটি বাণিজ্যিক সার্ভিস রেট। এতে ডুয়াল কারেন্সি অ্যান্ডোর্সমেন্ট, কার্ড রক্ষণাবেক্ষণ ও গেটওয়ে চার্জ যুক্ত থাকে; এটি কেন্দ্রীয় ব্যাংকের সাধারণ ইন্টারব্যাংক রেট নয়।",
      "পেমেন্ট মাধ্যম: বিকাশ (মার্চেন্ট/পার্সোনাল), নগদ, রকেট, ব্যাংক ট্রান্সফার (সিটি ব্যাংক, ব্র্যাক ব্যাংক, ডাচ-বাংলা ব্যাংক) এবং মিরপুর-২ অফিসে সরাসরি ক্যাশ গ্রহণযোগ্য।"
    ]
  },
  {
    id: "campaign-setup-and-timeline",
    title_en: "3. Campaign Launch Timeline & Asset Handover",
    title_bn: "৩. ক্যাম্পেইন চালুর সময়সীমা ও প্রয়োজনীয় তথ্য",
    category: "terms",
    badge: { en: "24-48 Hours Launch", bn: "২৪-৪৮ ঘণ্টায় লাইভ" },
    summary_en: "Campaign setup begins immediately once payment is cleared and full creative assets and account accesses are handed over by the client.",
    summary_bn: "পেমেন্ট নিশ্চিতকরণ এবং ক্লায়েন্টের কাছ থেকে পেজ/অ্যাকাউন্ট অ্যাক্সেস ও কন্টেন্ট পাওয়ার পর সাধারণত ২৪ থেকে ৪৮ কার্যঘণ্টার মধ্যে ক্যাম্পেইন লাইভ হয়।",
    points_en: [
      "Launch SLA: Most standard campaigns launch within 24 to 48 business hours after receiving verified budget and operational access.",
      "Required Assets: Facebook Page Partner Access / Business Manager invite, high-resolution product photos/videos, offer descriptions, website URL, and verified target audience preferences.",
      "Creative Approvals: Ad copy and graphics developed by our team are shared with the client for review prior to launching public ads.",
      "Delays due to Asset Deficits: The 24-48 hour launch timeline begins only when all necessary assets and permissions are fully submitted by the client."
    ],
    points_bn: [
      "ক্যাম্পেইন লাইভ টাইমলাইন: সমস্ত তথ্য, অ্যাক্সেস ও পেমেন্ট কনফার্মেশনের পর ২৪ থেকে ৪৮ কার্যঘণ্টার মধ্যে ক্যাম্পেইন সম্পূর্ণ সেটআপ হয়ে লাইভ হয়।",
      "প্রয়োজনীয় উপকরণ: ফেসবুক পেজ পার্টনার অ্যাক্সেস / বিজনেস ম্যানেজার ইনভাইট, মানসম্মত ছবি/ভিডিও, অফারের বিবরণ, ওয়েবসাইট লিংক এবং টার্গেটেড অডিয়েন্সের দিকনির্দেশনা।",
      "কনটেন্ট অনুমোদন: আমাদের টিম দ্বারা তৈরি অ্যাড কপি এবং গ্রাফিক্স ক্লায়েন্টের কাছে চূড়ান্ত অনুমোদনের জন্য উপস্থাপন করা হয়।",
      "বিলম্বের কারণ: ক্লায়েন্টের পক্ষ থেকে প্রয়োজনীয় অ্যাক্সেস বা কনটেন্ট দিতে দেরি হলে ক্যাম্পেইন লাইভ হওয়ার সময়সীমা সেই অনুযায়ী বৃদ্ধি পাবে।"
    ]
  },
  {
    id: "refund-and-balance-policy",
    title_en: "4. Refund, Campaign Pause & Balance Rollover Policy",
    title_bn: "৪. রিফান্ড, ক্যাম্পেইন বিরতি ও ব্যালেন্স রিফান্ড নীতিমালা",
    category: "payment",
    badge: { en: "100% Unspent Refund", bn: "১০০% অব্যবহৃত রিফান্ড" },
    summary_en: "100% of any unspent ad budget on Meta or Google is fully refundable or can be paused and kept as store credit. Agency strategic service fees are non-refundable once work has commenced.",
    summary_bn: "প্ল্যাটফর্মে অব্যবহৃত যে কোনো বিজ্ঞাপন বাজেট ১০০% ফেরতযোগ্য অথবা পরবর্তী ক্যাম্পেইনের জন্য জমা রাখা যাবে। তবে সম্পাদিত স্ট্র্যাটেজি ও সার্ভিস ফি ফেরতযোগ্য নয়।",
    points_en: [
      "Unspent Ad Spend Refund: If you decide to cancel or pause your campaigns, 100% of the remaining unspent platform dollar/BDT budget will be refunded to your designated bank/bKash account within 3 to 5 business days upon written request.",
      "Non-Refundable Agency Fees: Strategic market research, audience structuring, pixel/CAPI technical setup, and custom ad creatives already completed by our team cannot be refunded once work has commenced.",
      "Pause & Resume Anytime: You can pause campaigns at any point. Your remaining balance stays strictly protected and can be resumed whenever you choose.",
      "Platform Account Restrictions: If Meta or Google restricts an ad account or page due to client-supplied prohibited content, any unspent ad budget remains 100% intact, but completed service work is non-refundable."
    ],
    points_bn: [
      "অব্যবহৃত অ্যাড বাজেট রিফান্ড: ক্যাম্পেইন বন্ধ করতে চাইলে প্ল্যাটফর্মে খরচ না হওয়া বাকি ডলার/টাকার সম্পূর্ণ বাজেট ৩ থেকে ৫ কার্যদিবসের মধ্যে আপনার ব্যাংক বা বিকাশ অ্যাকাউন্টে ফেরত দেওয়া হবে।",
      "অফেরতযোগ্য সার্ভিস ফি: স্ট্র্যাটেজি প্ল্যানিং, অডিয়েন্স রিসার্চ, পিক্সেল/CAPI টেকনিক্যাল সেটআপ এবং ক্রিয়েটিভ তৈরির কাজ শুরু হয়ে গেলে এজেন্সির সার্ভিস চার্জ ফেরতযোগ্য নয়।",
      "যেকোনো সময় পজ ও রিজিউম: আপনি ইচ্ছে করলেই ক্যাম্পেইন সাময়িক বন্ধ রাখতে পারেন। আপনার অবশিষ্ট ব্যালেন্স সম্পূর্ণ সুরক্ষিত থাকবে এবং পরবর্তী যেকোনো সময় তা ব্যবহার করা যাবে।",
      "প্ল্যাটফর্ম রেস্ট্রিকশন পলিসি: ক্লায়েন্টের নিষিদ্ধ পণ্য বা ফেসবুক/গুগলের পলিসি লঙ্ঘনের কারণে অ্যাকাউন্ট সাময়িক ব্লক হলে অব্যবহৃত বিজ্ঞাপন বাজেট ফেরতযোগ্য, কিন্তু এজেন্সির সেটআপ ফি ফেরত হয় না।"
    ]
  },
  {
    id: "ad-content-compliance",
    title_en: "5. Content Guidelines & Prohibited Categories",
    title_bn: "৫. বিজ্ঞাপনের কন্টেন্ট নীতিমালা ও নিষিদ্ধ পণ্য",
    category: "compliance",
    badge: { en: "Meta & Google Standards", bn: "প্ল্যাটফর্ম নীতিমালা" },
    summary_en: "All advertising must adhere strictly to Meta Advertising Standards, Google Ads Policies, TikTok Policies, and the laws of Bangladesh.",
    summary_bn: "সকল বিজ্ঞাপনী কনটেন্টকে মেটা অ্যাড পলিসি, গুগল পলিসি এবং বাংলাদেশের প্রচলিত ডিজিটাল আইনের সাথে সামঞ্জস্যপূর্ণ হতে হবে।",
    points_en: [
      "Strictly Prohibited Goods: We will NOT run campaigns for illegal narcotics, unauthorized weapons, counterfeit currency, adult content, fraudulent get-rich-quick schemes, or deceptive lottery promotions.",
      "Regulated & Permitted Categories: Permitted herbal products, supplements, or gaming/betting are subject to verified platform compliance and a specialized commercial dollar rate (৳155/USD).",
      "Client Truthfulness Guarantee: The client guarantees that all product claims, discounts, licenses, and marketing representations are authentic and truthful.",
      "Right to Refuse: Boosting Agency BD reserves the right to decline or terminate campaigns that promote hate speech, defamation, political unrest, or fraudulent activities."
    ],
    points_bn: [
      "সম্পূর্ণ নিষিদ্ধ পণ্য: অবৈধ মাদক, নকল কারেন্সি, অস্ত্র, অ্যাডাল্ট বা অশ্লীল সামগ্রী, ভুয়া লটারি বা প্রতারণামূলক স্কিমের কোনো বিজ্ঞাপন পরিচালনা করা হয় না।",
      "অনুমোদিত বিশেষ ক্যাটাগরি: অনুমোদিত ভেষজ/হার্বাল বা গেমিং ক্যাম্পেইনের ক্ষেত্রে প্ল্যাটফর্মের কঠোর যাচাই-বাছাই ও বিশেষ ডলার সার্ভিস রেট (১৫৫ টাকা/ডলার) প্রযোজ্য।",
      "সঠিক তথ্যের নিশ্চয়তা: ক্লায়েন্ট নিশ্চিত করবেন যে বিজ্ঞাপনে প্রচারিত অফার, মূল্যছাড় এবং পণ্যের বিবরণ ১০০% খাঁটি ও বৈধ।",
      "প্রত্যাখ্যানের অধিকার: মানহানিকর, উস্কানিমূলক, রাজনৈতিক অপপ্রচার বা গ্রাহক প্রতারণামূলক কোনো ক্যাম্পেইন বুস্টিং এজেন্সি বিডি প্রত্যাখ্যান করার পূর্ণ অধিকার রাখে।"
    ]
  },
  {
    id: "performance-disclaimer",
    title_en: "6. Performance Disclaimer & Realistic ROI",
    title_bn: "৬. পারফরম্যান্স ডিসক্লেইমার ও বিক্রয়ের নিশ্চয়তা",
    category: "terms",
    badge: { en: "Transparent Delivery", bn: "স্বচ্ছ ডেলিভারি" },
    summary_en: "We guarantee expert-level campaign setup, audience targeting, and data-driven ad optimization. Final sales and revenue depend on client product quality, pricing, and customer service.",
    summary_bn: "আমরা প্রফেশনাল ক্যাম্পেইন সেটআপ, নিখুঁত অডিয়েন্স টার্গেটিং এবং সর্বোচ্চ অপ্টিমাইজেশনের নিশ্চয়তা দিই। তবে চূড়ান্ত বিক্রয় নির্ভর করে ক্লায়েন্টের পণ্যের মান, মূল্য ও কাস্টমার রেসপন্সের উপর।",
    points_en: [
      "Our Commitment: Boosting Agency BD guarantees professional campaign structuring, precise demographic/interest targeting, pixel and conversion event tracking, and daily budget optimization.",
      "Conversion Variables: Ultimate purchase conversions depend on factors outside agency control: product pricing, market competition, delivery speed, customer inquiry response speed, checkout UX, and client reputation.",
      "No False Guarantees: We do not offer unrealistic promises such as 'guaranteed 100 sales per day'. We provide data-backed advertising that delivers the highest possible return on ad spend (ROAS) based on real market performance.",
      "Transparent Reporting: Clients receive full transparency on reach, impressions, link clicks, cost per result, and conversion data directly from ad manager dashboards."
    ],
    points_bn: [
      "আমাদের দায়িত্ব: বুস্টিং এজেন্সি বিডি সঠিক অডিয়েন্স সিলেকশন, ক্রিয়েটিভ টেস্টিং, কনভার্সন ট্র্যাকিং এবং সর্বোচ্চ কম খরচে সর্বোচ্চ রিচ ও লিড আনার নিশ্চয়তা দেয়।",
      "বিক্রয়ের শর্তাবলী: চূড়ান্ত সেলস ক্লায়েন্টের পণ্যের কোয়ালিটি, প্রাইসিং, ইনবক্সে দ্রুত মেসেজের রিপ্লাই দেওয়া এবং ক্যাশ অন ডেলিভারি সেবার সক্ষমতার উপর সরাসরি নির্ভরশীল।",
      "অবাস্তব প্রতিশ্রুতির অনুপস্থিতি: আমরা কোনো ভুয়া প্রতিশ্রুতি (যেমন: 'একদিনেই কোটি টাকার সেল') দিই না। আমরা ডেটা অ্যানালাইসিসের মাধ্যমে বাস্তবসম্মত সর্বোচ্চ ROAS এনে দিতে কাজ করি।",
      "স্বচ্ছ রিপোর্ট: অ্যাড ম্যানেজারের রিয়েল-টাইম ডাটা, রিচ, ইমপ্রেশন, ক্লিক ও পার-রেজাল্ট খরচের স্বচ্ছ রিপোর্ট ক্লায়েন্টকে প্রদান করা হয়।"
    ]
  },
  {
    id: "privacy-policy-and-data-protection",
    title_en: "7. Privacy Policy & Confidentiality",
    title_bn: "৭. গোপনীয়তা নীতিমালা ও ক্লায়েন্ট তথ্যের নিরাপত্তা",
    category: "privacy",
    badge: { en: "Strict NDA & Security", bn: "কঠোর তথ্য নিরাপত্তা" },
    summary_en: "Boosting Agency BD maintains absolute confidentiality regarding your customer records, lead data, sales metrics, and business strategies. We never sell or share your data.",
    summary_bn: "বুস্টিং এজেন্সি বিডি গ্রাহকদের যাবতীয় সেলস ডাটা, কাস্টমার লিড তালিকা ও ব্যবসায়িক কৌশলের সর্বোচ্চ গোপনীয়তা রক্ষা করে। আমরা কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করি না।",
    points_en: [
      "Data Collection: We collect only necessary business information: contact details, Facebook Page URLs, ad creatives, billing receipts, and analytics data required to run your campaigns.",
      "Zero Third-Party Sharing: Your customer databases, leads, sales numbers, and retargeting custom audiences are strictly protected under non-disclosure. We never sell, rent, or share your proprietary data with competitors or third parties.",
      "Pixel & Tracking Privacy: Tracking technologies (Meta Pixel, Google Tag Manager, GA4, CAPI) are deployed strictly to measure campaign efficiency in accordance with modern cookie compliance and data protection guidelines.",
      "Account Access Security: We utilize official Facebook Partner Business Manager access whenever possible so clients retain 100% administrative control over their digital assets at all times."
    ],
    points_bn: [
      "তথ্য সংগ্রহের ক্ষেত্র: ক্যাম্পেইন পরিচালনার জন্য কেবল প্রয়োজনীয় ব্যবসায়িক তথ্য (নাম, ফোন, পেজ লিংক, অ্যাড কনটেন্ট, ইনভয়েস এবং ট্র্যাকিং ডাটা) সংগ্রহ করা হয়।",
      "কোনো তথ্য হস্তান্তর নয়: আপনার কাস্টমার ডাটাবেস, ইনবক্স লিড, সেলস রেভিনিউ বা অডিয়েন্স ডাটা কোনো অবস্থাতেই তৃতীয় পক্ষ বা অন্য কোনো ব্যবসায়িক প্রতিদ্বন্দীর কাছে প্রকাশ করা হয় না।",
      "ট্র্যাকিং ও পিক্সেল নিরাপত্তা: মেটা পিক্সেল, গুগল ট্যাগ ম্যানেজার ও CAPI ট্র্যাকিং কোড আন্তর্জাতিক গোপনীয়তা বিধিমালা মেনে সম্পূর্ণ নিরাপদ ও সুরক্ষিত উপায়ে বসানো হয়।",
      "অ্যাকাউন্টের মালিকানা: আমরা অফিশিয়াল বিজনেস পার্টনার অ্যাক্সেসের মাধ্যমে কাজ করি, ফলে ক্লায়েন্টের নিজস্ব পেজ ও সম্পদের পূর্ণ মালিকানা সর্বদাই ক্লায়েন্টের হাতে সংরক্ষিত থাকে।"
    ]
  },
  {
    id: "limitation-of-liability",
    title_en: "8. Limitation of Liability & Force Majeure",
    title_bn: "৮. দায়বদ্ধতার সীমাবদ্ধতা ও অপ্রত্যাশিত পরিস্থিতি",
    category: "compliance",
    badge: { en: "Legal Protection", bn: "আইনি সুরক্ষা" },
    summary_en: "Agency liability is strictly limited to the value of agency service fees paid. We are not liable for third-party platform algorithm updates or national internet interruptions.",
    summary_bn: "এজেন্সির দায়বদ্ধতা শুধুমাত্র গৃহীত সার্ভিস চার্জের সীমার মধ্যে সীমাবদ্ধ। আন্তর্জাতিক প্ল্যাটফর্মের সার্ভার ডাউন বা জাতীয় ইন্টারনেট বিঘ্নতার ক্ষেত্রে এজেন্সি দায়ী নয়।",
    points_en: [
      "Platform Algorithmic Shifts: Meta, Google, and TikTok update their ad auction algorithms and review systems frequently. The agency is not liable for platform-wide outages, unexpected account verification flags, or policy overhauls imposed by tech giants.",
      "Force Majeure: Neither party shall be held liable for failure to deliver services during events beyond reasonable control, including nationwide internet blackouts, natural disasters, telecommunications outages, or government-mandated digital curfews.",
      "Liability Cap: Under no circumstances shall Boosting Agency BD's financial liability exceed the specific agency service management fee received from the client for the disputed billing cycle."
    ],
    points_bn: [
      "প্ল্যাটফর্ম অ্যালগরিদম পরিবর্তন: মেটা, গুগল বা টিকটকের নিজস্ব সার্ভার ডাউন, হঠাৎ সিস্টেম রিভিউ বা প্ল্যাটফর্মের নীতিগত পরিবর্তনের জন্য এজেন্সি দায়ী থাকবে না।",
      "অপ্রত্যাশিত পরিস্থিতি (Force Majeure): দেশব্যাপী ইন্টারনেট ব্ল্যাকআউট, সরকারি বিধিনিষেধ, প্রাকৃতিক দুর্যোগ বা টেলিকমিউনিকেশন বিভ্রাটের কারণে সেবা সাময়িক ব্যাহত হলে উভয় পক্ষ দায়মুক্ত থাকবে।",
      "সর্বোচ্চ ক্ষতিপূরণ সীমা: যে কোনো বিরোধের ক্ষেত্রে বুস্টিং এজেন্সি বিডি-র আর্থিক দায়বদ্ধতার সর্বোচ্চ সীমা সংশ্লিষ্ট মেয়াদের জন্য ক্লায়েন্টের পরিশোধিত এজেন্সি সার্ভিস ফি-র সমান হবে।"
    ]
  },
  {
    id: "governing-law-and-contact",
    title_en: "9. Governing Law, Termination & Dispute Resolution",
    title_bn: "৯. প্রচলিত আইন, চুক্তি বাতিল ও বিরোধ নিষ্পত্তি",
    category: "compliance",
    badge: { en: "Dhaka Jurisdiction", bn: "ঢাকা জুরিসডিকশন" },
    summary_en: "These Terms are governed by the laws of the People's Republic of Bangladesh. Disputes are resolved amicably through mutual consultation or in Dhaka courts.",
    summary_bn: "এই সকল শর্তাবলী গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইনের অধীনে পরিচালিত। যে কোনো বিরোধ পারস্পরিক সমঝোতা বা ঢাকার আদালতের মাধ্যমে নিষ্পত্তি হবে।",
    points_en: [
      "Termination Notice: Either party may terminate a monthly ongoing retainer by providing a 7-day written notice via official WhatsApp.",
      "Jurisdiction: These terms and policies are construed under the laws of Bangladesh. Any unresolved disputes fall under the jurisdiction of competent courts in Dhaka, Bangladesh.",
      "Official Grievance Contact: For any billing, privacy, or policy inquiries, please contact Boosting Agency BD directly via WhatsApp (+880 1518 961899) or Hotline (+880 1518 961899).",
      "Physical Office: Rupnagor R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh."
    ],
    points_bn: [
      "চুক্তি বাতিল নোটিশ: মাসিক রিটেইনার সার্ভিসের ক্ষেত্রে যে কোনো পক্ষ অফিশিয়াল হোয়াটসঅ্যাপে ৭ দিনের লিখিত নোটিশ দিয়ে সেবা সমাপ্ত করতে পারেন।",
      "আইনি এখতিয়ার: এই শর্তাবলী বাংলাদেশের প্রচলিত আইন অনুযায়ী ব্যাখ্যা করা হবে এবং যে কোনো আইনি বিষয়ের সমাধান ঢাকা আদালতের আওতাধীন থাকবে।",
      "অফিশিয়াল যোগাযোগের ঠিকানা: পলিসি বা বিলিং সংক্রান্ত যে কোনো তথ্যের জন্য বুস্টিং এজেন্সি বিডি-র অফিশিয়াল হোয়াটসঅ্যাপ (+৮৮০ ১৫১৮ ৯৬১৮৯৯) বা হটলাইনে যোগাযোগ করুন।",
      "অফিসের ঠিকানা: রূপনগর আ/এ, রোড-১৬, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ।"
    ]
  }
]
