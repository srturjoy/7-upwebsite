import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
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
  title: 'Boosting Agency BD | Digital Marketing Agency in Bangladesh',
  description: 'Boosting Agency BD is a leading digital marketing agency in Bangladesh offering Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services.',
  keywords: ['digital marketing', 'facebook ads', 'google ads', 'seo', 'web design', 'bangladesh', 'dhaka', 'digital marketing agency', 'social media marketing', 'online marketing', 'ppc advertising', 'search engine optimization', 'web development bangladesh', 'branding agency dhaka'],
  authors: [{ name: 'Boosting Agency BD' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://boostingagencybd.com',
    siteName: 'Boosting Agency BD',
    title: 'Boosting Agency BD | Digital Marketing Agency in Bangladesh',
    description: 'Leading digital marketing agency in Bangladesh specializing in Facebook Ads, Google Ads, SEO, Web Design, and AI Automation.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boosting Agency BD | Digital Marketing Agency',
    description: 'Leading digital marketing agency in Bangladesh specializing in Facebook Ads, Google Ads, SEO, Web Design, and AI Automation.',
  },
  alternates: {
    canonical: 'https://boostingagencybd.com',
  },
}

// Comprehensive JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://boostingagencybd.com/#organization",
      "name": "Boosting Agency BD",
      "alternateName": ["Boosting Agency", "Boosting Agency Bangladesh"],
      "url": "https://boostingagencybd.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://boostingagencybd.com/logo.png",
        "width": 512,
        "height": 512
      },
      "description": "Boosting Agency BD is a leading digital marketing agency in Bangladesh, providing comprehensive digital marketing solutions including Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services to businesses worldwide.",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Siddiqur Rahman Turjoy",
        "jobTitle": "Founder & CEO"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House 12, Road 5, Sector 10",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "postalCode": "1230",
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
      "@type": "LocalBusiness",
      "@id": "https://boostingagencybd.com/#localbusiness",
      "name": "Boosting Agency BD",
      "image": "https://boostingagencybd.com/logo.png",
      "description": "Premier digital marketing agency in Dhaka, Bangladesh offering Facebook Ads, Google Ads, SEO, Web Design, Branding, and AI Automation services.",
      "@type": ["LocalBusiness", "ProfessionalService", "MarketingAgency"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "House 12, Road 5, Sector 10",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka Division",
        "postalCode": "1230",
        "addressCountry": "BD"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.8103,
        "longitude": 90.4125
      },
      "url": "https://boostingagencybd.com",
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
      "@id": "https://boostingagencybd.com/#website",
      "url": "https://boostingagencybd.com",
      "name": "Boosting Agency BD",
      "description": "Digital Marketing Agency in Bangladesh",
      "publisher": {
        "@id": "https://boostingagencybd.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://boostingagencybd.com/blog?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["en-US", "bn-BD"]
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === 'production'
  const enableTracking = isProduction && GTM_ID !== 'GTM-XXXXXXX'

  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
