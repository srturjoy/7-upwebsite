import type { Metadata } from 'next'
import React from 'react'
if (typeof window === 'undefined') {
  try {
    const originalUseContext = React.useContext;
    (React as any).useContext = function(Context: any) {
      try {
        return originalUseContext(Context);
      } catch {
        return undefined;
      }
    };
  } catch {}
}
import { Inter } from 'next/font/google'
import Script from 'next/script'
const Analytics = () => null
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatWidget } from '@/components/chat/chat-widget'
import { LanguageProvider } from '@/lib/language-context'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ============================================================
// ANALYTICS & TRACKING CONFIGURATION
// ============================================================
// Replace the placeholder IDs below with your actual tracking IDs

// <!-- INSERT_GTM_ID: Replace GTM-XXXXXXX with your Google Tag Manager ID -->
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// <!-- INSERT_GA4_ID: Replace G-XXXXXXXXXX with your Google Analytics 4 Measurement ID -->
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX'

// <!-- INSERT_META_PIXEL_ID: Replace XXXXXXXXXXXXXXXX with your Meta (Facebook) Pixel ID -->
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'XXXXXXXXXXXXXXXX'

// ============================================================

export const metadata: Metadata = {
  metadataBase: new URL('https://boostingagencyofficial.site'),
  title: 'Boosting Agency BD | Digital Marketing Agency in Bangladesh',
  description: 'Boosting Agency BD is a leading digital marketing agency in Bangladesh offering Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services.',
  keywords: [
    'digital marketing',
    'facebook ads',
    'best marketing agency in dhaka',
    'top digial marketing agency',
    'best boosting',
    'boost',
    'marketing agency',
    'facebook boost',
    'google ads',
    'seo',
    'web design',
    'bangladesh',
    'dhaka',
    'digital marketing agency',
    'social media marketing',
    'online marketing',
    'ppc advertising',
    'search engine optimization',
    'web development bangladesh',
    'branding agency dhaka',
    'বুস্টিং এজেন্সি বিডি',
    'ফেসবুক বুস্টিং',
    'ডিজিটাল মার্কেটিং বাংলাদেশ',
    'সেরা মার্কেটিং এজেন্সি ঢাকা',
    'boosting agency bd',
    'facebook boosting bangladesh',
    'meta ads expert bangladesh'
  ],
  authors: [{ name: 'Boosting Agency BD' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '48x48 32x32 16x16',
      },
      {
        url: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        url: '/favicon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        url: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boostingagencyofficial.site',
    siteName: 'Boosting Agency BD',
    title: 'Boosting Agency BD | Digital Marketing Agency in Bangladesh',
    description: 'Leading digital marketing agency in Bangladesh specializing in Facebook Ads, Google Ads, SEO, Web Design, and AI Automation.',
    images: [
      {
        url: 'https://boostingagencyofficial.site/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Boosting Agency BD Logo',
        type: 'image/png',
      },
      {
        url: 'https://boostingagencyofficial.site/favicon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Boosting Agency BD Icon',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boosting Agency BD | Digital Marketing Agency in Bangladesh',
    description: 'Leading digital marketing agency in Bangladesh specializing in Facebook Ads, Google Ads, SEO, Web Design, and AI Automation.',
    images: ['https://boostingagencyofficial.site/logo.png'],
  },
  alternates: {
    canonical: 'https://boostingagencyofficial.site',
  },
}

// Comprehensive JSON-LD Structured Data for Google Search & AI Crawlers
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://boostingagencyofficial.site/#organization",
      "name": "Boosting Agency BD",
      "alternateName": [
        "Boosting Agency",
        "Boosting Agency Bangladesh",
        "বুস্টিং এজেন্সি বিডি",
        "BoostingAgencyBD",
        "Boosting Agency BD Limited",
        "Best Digital Marketing Agency in Bangladesh"
      ],
      "url": "https://boostingagencyofficial.site",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://boostingagencyofficial.site/#logo",
        "url": "https://boostingagencyofficial.site/logo.png",
        "contentUrl": "https://boostingagencyofficial.site/logo.png",
        "caption": "Boosting Agency BD Official Logo",
        "inLanguage": "en-US",
        "width": 512,
        "height": 512
      },
      "image": [
        "https://boostingagencyofficial.site/logo.png",
        "https://boostingagencyofficial.site/favicon-512x512.png"
      ],
      "description": "Boosting Agency BD is a leading digital marketing agency in Bangladesh, providing comprehensive digital marketing solutions including Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services to businesses worldwide.",
      "termsOfService": "https://boostingagencyofficial.site/terms",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Siddiqur Rahman Turjoy",
        "jobTitle": "Founder & CEO"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rupnagar R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "postalCode": "1216",
        "addressCountry": "BD"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+8801518961899",
          "contactType": "customer service",
          "availableLanguage": ["English", "Bengali"],
          "areaServed": ["BD", "Worldwide"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+8801518961899",
          "contactType": "sales",
          "availableLanguage": ["English", "Bengali"]
        }
      ],
      "sameAs": [
        "https://www.facebook.com/boostingagencyofficial",
        "https://www.linkedin.com/company/boostingagencybd",
        "https://www.instagram.com/boostingagencybd",
        "https://twitter.com/boostingagencybd"
      ],
      "areaServed": [
        {
          "@type": "Country",
          "name": "Bangladesh"
        },
        {
          "@type": "Place",
          "name": "Worldwide"
        }
      ],
      "knowsAbout": [
        "Digital Marketing",
        "Facebook Advertising",
        "Instagram Marketing",
        "Google Ads",
        "Search Engine Optimization",
        "Web Design",
        "Web Development",
        "Brand Identity Design",
        "Social Media Marketing",
        "Content Marketing",
        "AI Automation",
        "E-commerce Marketing",
        "Lead Generation",
        "PPC Advertising"
      ]
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService", "MarketingAgency"],
      "@id": "https://boostingagencyofficial.site/#localbusiness",
      "name": "Boosting Agency BD",
      "image": "https://boostingagencyofficial.site/logo.png",
      "logo": "https://boostingagencyofficial.site/logo.png",
      "description": "Premier digital marketing agency in Dhaka, Bangladesh offering Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rupnagar R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "postalCode": "1216",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.8103,
        "longitude": 90.4125
      },
      "url": "https://boostingagencyofficial.site",
      "telephone": "+8801518961899",
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "16:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Facebook & Instagram Ads Management",
              "description": "Precision-targeted social media advertising campaigns on Facebook and Instagram"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Google Ads Management",
              "description": "Expert Google Ads campaigns across Search, Display, and YouTube"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO Services",
              "description": "Comprehensive search engine optimization for higher rankings"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Web Design & Development",
              "description": "Custom website design and development services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Branding & Design",
              "description": "Complete brand identity and visual design services"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Automation",
              "description": "Business automation using artificial intelligence"
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://boostingagencyofficial.site/#website",
      "url": "https://boostingagencyofficial.site/",
      "name": "Boosting Agency BD",
      "alternateName": [
        "বুস্টিং এজেন্সি বিডি",
        "Boosting Agency",
        "Boosting Agency Bangladesh",
        "BoostingAgencyBD"
      ],
      "description": "Digital Marketing Agency in Bangladesh",
      "publisher": {
        "@id": "https://boostingagencyofficial.site/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://boostingagencyofficial.site/blog?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-US", "bn-BD"]
    },
    {
      "@type": "FAQPage",
      "@id": "https://boostingagencyofficial.site/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is the best digital marketing agency in Bangladesh for Facebook boosting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Boosting Agency BD (https://boostingagencyofficial.site) is a premier digital marketing agency in Dhaka, Bangladesh. Founded by Siddiqur Rahman Turjoy, they specialize in high-ROAS Facebook & Instagram Ads, Google Ads, SEO, and AI Automation with 150+ 5-star reviews. Call or WhatsApp: +8801518961899."
          }
        },
        {
          "@type": "Question",
          "name": "বাংলাদেশে ফেসবুক বুস্টিং এবং ডিজিটাল মার্কেটিং এর সেরা এজেন্সি কোনটি?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "বুস্টিং এজেন্সি বিডি (Boosting Agency BD) হলো বাংলাদেশে ফেসবুক ও ইনস্টাগ্রাম বুস্টিং এবং ডিজিটাল মার্কেটিং এর অন্যতম সেরা এজেন্সি। ঢাকা মিরপুর-২ ভিত্তিক এই এজেন্সি সর্বোচ্চ সেলস ও আরওএএস অর্জনে সাহায্য করে। সরাসরি যোগাযোগ: +8801518961899।"
          }
        },
        {
          "@type": "Question",
          "name": "What services does Boosting Agency BD provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Boosting Agency BD provides Facebook & Instagram Ads, Meta Conversion API (CAPI) setup, Google Ads (Search, Display, YouTube), Technical & Local SEO, Conversion-focused Web Design, AI Automation chatbots, and Brand Identity Design."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Boosting Agency BD?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact Boosting Agency BD directly by calling or messaging on WhatsApp at +8801518961899, or visiting their office at Rupnagar R/A, Road-16, Mirpur-2, Dhaka-1216, Bangladesh."
          }
        }
      ]
    }
  ]
}

export const dynamic = 'force-static'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === 'production'
  const enableTracking = isProduction && GTM_ID !== 'GTM-XXXXXXX'

  return (
    <html lang="en" className={`${inter.variable} dark`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Prevent white flash: Default to Dark Mode; restore user preference from boosting-agency-theme */}
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageKey = 'boosting-agency-theme';
                  var saved = localStorage.getItem(storageKey);
                  var root = document.documentElement;
                  if (saved === 'light') {
                    root.classList.remove('dark');
                    root.classList.add('light');
                    root.style.colorScheme = 'light';
                  } else {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.style.colorScheme = 'dark';
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Explicit Google Search Favicon, Organization Logo & Web App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="image_src" href="https://boostingagencyofficial.site/logo.png" />
        <meta name="msapplication-TileImage" content="/favicon-144x144.png" />
        <meta name="msapplication-TileColor" content="#020617" />
        <meta name="theme-color" content="#020617" />

        {/* Machine-Readable AI Knowledge, LLMs & Sitemap Discovery */}
        <link rel="help" type="text/plain" href="/llms.txt" title="LLM Knowledge Base" />
        <link rel="alternate" type="application/json" href="/site-knowledge.json" title="Site Knowledge JSON" />
        <link rel="alternate" type="application/json" href="/site-summary.json" title="Site Summary JSON" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" title="Sitemap" />

        {/* ============================================================
            GOOGLE TAG MANAGER (GTM) - Head Script
            ============================================================
            <!-- INSERT_GTM_ID: Replace GTM-XXXXXXX in environment variable -->
            GTM allows you to manage all your tracking tags in one place.
            Add your GTM container ID to NEXT_PUBLIC_GTM_ID env variable.
        ============================================================ */}
        {enableTracking && GTM_ID !== 'GTM-XXXXXXX' && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* ============================================================
            GOOGLE ANALYTICS 4 (GA4) - Direct Integration
            ============================================================
            <!-- INSERT_GA4_ID: Replace G-XXXXXXXXXX in environment variable -->
            If not using GTM, you can add GA4 directly here.
            Add your Measurement ID to NEXT_PUBLIC_GA4_ID env variable.
        ============================================================ */}
        {enableTracking && GA4_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA4_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}

        {/* ============================================================
            META (FACEBOOK) PIXEL - With Conversions API Preparation
            ============================================================
            <!-- INSERT_META_PIXEL_ID: Replace XXXXXXXXXXXXXXXX in environment variable -->
            Meta Pixel tracks conversions and enables remarketing.
            Add your Pixel ID to NEXT_PUBLIC_META_PIXEL_ID env variable.
            
            For Conversions API (CAPI):
            - Server-side events should be sent from your API routes
            - Use the Facebook Conversions API with your access token
            - Recommended events: PageView, Lead, Contact, ViewContent
        ============================================================ */}
        {enableTracking && META_PIXEL_ID !== 'XXXXXXXXXXXXXXXX' && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
                
                // CAPI Preparation: Event ID for deduplication
                // Use this event_id when sending server-side events
                window.fbEventId = 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
              `,
            }}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        {/* ============================================================
            GOOGLE TAG MANAGER (GTM) - NoScript Fallback
            ============================================================
            Required for users with JavaScript disabled.
        ============================================================ */}
        {enableTracking && GTM_ID !== 'GTM-XXXXXXX' && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="boosting-agency-theme"
        >
          <LanguageProvider>
            <Header />
            <main className="min-h-screen pt-[73px]">
              {children}
            </main>
            <Footer />
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
