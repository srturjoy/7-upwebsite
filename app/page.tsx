import { HeroSection } from "@/components/home/hero-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { IndustriesWeServe } from "@/components/home/industries-we-serve"
import { RealCampaignPerformanceSection } from "@/components/home/real-campaign-performance"
import { OurProcessSection } from "@/components/home/our-process"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { Testimonials } from "@/components/home/testimonials"
import { TeamPreview } from "@/components/home/team-preview"
import { FAQSection } from "@/components/home/faq-section"
import { CaseStudiesPreview } from "@/components/home/case-studies-preview"
import { BlogPreview } from "@/components/home/blog-preview"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <IndustriesWeServe />
      <RealCampaignPerformanceSection isHomePage={true} seeMoreHref="/services#campaign-performance" />
      <OurProcessSection />
      <WhyChooseUs />
      <Testimonials />
      <TeamPreview />
      <FAQSection />
      <CaseStudiesPreview />
      <BlogPreview />
      <CTASection />
    </>
  )
}
