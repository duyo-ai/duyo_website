import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { Testimonials } from './Testimonials'
import { cn } from '@/lib/utils'
import FUIFeatureSectionWithCards from '../../components/farmui/FUIFeatureCard'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative transform-gpu overflow-hidden bg-page-gradient pt-16 sm:pt-24 lg:pt-32"
    >
      <div className="-z-1 absolute inset-x-0 -top-0 h-screen  w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <Container className="relative z-10">
        
        <Testimonials />
      </Container>
      <div className="-z-1 relative mt-12 sm:mt-16 lg:mt-20 min-h-[100px]">
        <div className="absolute left-0 right-0 top-12 sm:top-16 lg:top-20 z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="font-normal mx-auto max-w-4xl text-center font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl tracking-tighter text-gray-100">
            Happy peoples using{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-br from-[#8B44FF] via-[#6BA4FF] to-[#4A0FBF] bg-clip-text text-transparent">
                {' '}
                our products
              </span>
            </span>{' '}
            for businesses.
          </h1>
          <p className="font-geist mx-auto mt-3 sm:mt-4 max-w-xl sm:max-w-2xl lg:max-w-3xl text-center text-sm sm:text-base lg:text-lg text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            congue, nisl eget molestie varius, enim ex faucibus purus.
          </p>
          <button className="font-geist z-10 mx-auto mt-4 sm:mt-5 flex w-fit items-center justify-center gap-2 rounded-md bg-gradient-to-br from-[#8B44FF] to-[#4A0FBF] px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 text-center text-sm sm:text-base lg:text-lg tracking-tighter text-zinc-50 ring-2 ring-[#6A14FF]/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-[#6A14FF]/70">
            Explore more
          </button>
        </div>
        <div
          className={cn(
            'mask-radial-faded  z-1  bg- -pointer-events-none relative -my-[6rem] h-[65rem] overflow-hidden rounded-4xl',
            '[--color:#7877C6] before:absolute before:inset-0 before:bg-radial-faded before:opacity-[0.4]',
            'after:left  after:absolute after:left-0  after:top-[17rem] after:mx-auto after:mt-[70px] after:h-full after:w-[100%] after:rounded-[500%] after:border-t after:border-[rgba(120,119,198,0.4)] after:bg-hero-gradient after:py-20',
          )}
        >
          <FUIFeatureSectionWithCards />
        </div>
      </div>
    </section>
  )
}
