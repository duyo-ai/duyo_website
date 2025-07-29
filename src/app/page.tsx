import { CallToAction } from '@/components/CallToAction'
import DashboardDemo from '@/components/DashboardShowcase'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import HeroMod from '@/components/HeroMod'
import { Pricing } from '@/components/Pricing'
import FUIPricingSectionWithBadge from '@/components/PricingMod'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { DarkBentoSection } from '@/components/dark-bento-section'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroMod />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <DarkBentoSection />
        
        <CallToAction />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
