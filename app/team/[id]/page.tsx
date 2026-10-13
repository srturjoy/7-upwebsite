import { notFound } from "next/navigation"
import { getTeamMember, TEAM_MEMBERS } from "@/data/team"
import { MemberProfileView } from "@/components/team/member-profile-view"
import type { Metadata } from "next"

export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    id: member.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const member = getTeamMember(id)
  if (!member) {
    return { title: "Team Member Not Found | Boosting Agency BD" }
  }

  const isFounder = member.id === "siddiqur-rahman-turjoy"

  const title = isFounder 
    ? "Siddiqur Rahman Turjoy | Founder & CEO, Boosting Agency BD"
    : `${member.name} — ${member.role} | Boosting Agency BD`

  const description = isFounder
    ? "Official professional profile of Siddiqur Rahman Turjoy, Founder & CEO of Boosting Agency BD. Full-stack digital growth strategist, performance marketing consultant, and AI automation specialist based in Bangladesh."
    : member.description

  const canonicalUrl = isFounder
    ? "https://turjoy.boostingagencyofficial.site/"
    : `https://boostingagencyofficial.site/team/${member.id}`

  const imageUrl = isFounder
    ? "https://boostingagencyofficial.site/images/team/siddiqur-rahman-turjoy.webp"
    : (member.defaultImages[0]?.url 
        ? (member.defaultImages[0].url.startsWith("http") 
            ? member.defaultImages[0].url 
            : `https://boostingagencyofficial.site${member.defaultImages[0].url}`)
        : "https://boostingagencyofficial.site/logo.png")

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Boosting Agency BD",
      type: "profile",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: isFounder 
            ? "Siddiqur Rahman Turjoy, Founder and CEO of Boosting Agency BD" 
            : `${member.name} — ${member.role}`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const member = getTeamMember(id)

  if (!member) {
    notFound()
  }

  const isFounder = member.id === "siddiqur-rahman-turjoy"

  const personStructuredData = isFounder ? {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://turjoy.boostingagencyofficial.site/#person",
    "name": "Siddiqur Rahman",
    "givenName": "Siddiqur",
    "familyName": "Rahman",
    "additionalName": "Turjoy",
    "alternateName": [
      "Turjoy",
      "Siddiqur Rahman Turjoy",
      "Turjoy Siddiqur Rahman",
      "Turjoy — Founder & CEO of Boosting Agency BD"
    ],
    "url": "https://turjoy.boostingagencyofficial.site/",
    "jobTitle": "Founder & CEO",
    "description": "Founder & CEO of Boosting Agency BD. Full-stack digital growth strategist, performance marketing consultant, branding advisor, and AI automation specialist.",
    "worksFor": {
      "@type": "Organization",
      "@id": "https://boostingagencyofficial.site/#organization",
      "name": "Boosting Agency BD",
      "url": "https://boostingagencyofficial.site/",
      "logo": "https://boostingagencyofficial.site/logo.png"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Bangladesh University of Business and Technology (BUBT)",
      "url": "https://www.bubt.edu.bd"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressCountry": "BD"
    },
    "nationality": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "image": {
      "@type": "ImageObject",
      "@id": "https://boostingagencyofficial.site/images/team/siddiqur-rahman-turjoy.webp#primaryimage",
      "url": "https://boostingagencyofficial.site/images/team/siddiqur-rahman-turjoy.webp",
      "contentUrl": "https://boostingagencyofficial.site/images/team/siddiqur-rahman-turjoy.webp",
      "caption": "Siddiqur Rahman Turjoy, Founder and CEO of Boosting Agency BD",
      "description": "Official portrait of Siddiqur Rahman Turjoy, Founder & CEO of Boosting Agency BD",
      "width": 800,
      "height": 1000,
      "encodingFormat": "image/webp"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Bangladesh University of Business and Technology (BUBT)"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Meta Blueprint Certification",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Meta"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Ads Certification",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Google"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Google Data Analytics Professional Certificate",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Google"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "HubSpot Marketing Software Certification",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "HubSpot Academy"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Ethical Hacking Certification",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Creative IT Institute"
        }
      }
    ],
    "knowsAbout": [
      "Performance Marketing",
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search, Display, Video, PMax)",
      "YouTube Advertising",
      "TikTok Advertising",
      "Brand Strategy & Positioning",
      "Business Growth Consulting",
      "AI Automation & Intelligent Agents",
      "Customer Support Automation",
      "Meta Conversion API (CAPI)",
      "Google Analytics 4 (GA4)",
      "Google Tag Manager (GTM)",
      "Conversion Rate Optimization (CRO)",
      "Server-Side Tracking",
      "Computer Science & Engineering Fundamentals"
    ],
    "sameAs": [
      "https://turjoy.boostingagencyofficial.site/",
      "https://boostingagencyofficial.site/team/siddiqur-rahman-turjoy",
      "https://boostingagencyofficial.site/about"
    ],
    "mainEntityOfPage": {
      "@type": "ProfilePage",
      "@id": "https://turjoy.boostingagencyofficial.site/"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.role,
    "description": member.description,
    "worksFor": {
      "@type": "Organization",
      "name": "Boosting Agency BD",
      "url": "https://boostingagencyofficial.site/"
    },
    "image": member.defaultImages[0]?.url ? `https://boostingagencyofficial.site${member.defaultImages[0].url}` : undefined,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <MemberProfileView member={member} />
    </>
  )
}
