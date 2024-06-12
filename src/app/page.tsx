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

        <Testimonials />
        <div className="relative">
          <div className='absolute top-10 left-0 right-0 z-10'>
            <h1 className="mx-auto text-center font-nomral tracking-tighter  max-w-4xl font-sans text-5xl text-gray-100 sm:text-7xl">
              Happy peoples using {' '}
              <span className="relative whitespace-nowrap text-white">
                <span className="relative">our products</span>
              </span>{' '}
              for  businesses.
            </h1>
          </div>
          <div
            className={cn(
              'mask-radial-faded  z-2  -pointer-events-none relative -my-[6rem] h-[70rem] overflow-hidden bg-black',
              'before:bg-radial-faded [--color:#7877C6] before:absolute before:inset-0 before:opacity-[0.4]',
              'after:absolute after:-left-1/2 after:top-1/2 after:h-[142.8%] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgba(120,119,198,0.4)] after:bg-black',
            )}
          ></div>
        </div>
        <FUIPricingSectionWithBadge />
        {/* <Pricing /> */}
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
