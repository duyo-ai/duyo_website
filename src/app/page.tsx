import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import FUIPricingSectionWithBadge from '@/components/PricingMod'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />

        
        <FUIPricingSectionWithBadge />
        {/* <Pricing /> */}
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
