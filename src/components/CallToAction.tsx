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
      className="relative transform-gpu overflow-hidden   bg-page-gradient pt-32 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#798ef9_inset]"
    >
      <div className="-z-1 absolute inset-x-0 -top-0 h-full  w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-6xl">
            <span className="bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent">
              Get{' '}
            </span>{' '}
            started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your books. Buy our software so you can
            feel like you’re doing something productive.
          </p>
          <Button
            className="font-geist text-md mt-3 flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-700 px-4 py-3 text-center tracking-tighter text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70"
            href="/register"
          >
            Get Started with Click
          </Button>
        </div>
        <Testimonials />
      </Container>
      <div className="-z-1 relative  mt-20 min-h-[100px]">
        <div className="absolute  left-0 right-0 top-20 z-10">
          <h1 className="font-nomral  mx-auto max-w-4xl  text-center  font-sans text-5xl tracking-tighter text-gray-100 sm:text-7xl">
            Happy peoples using{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative  bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent">
                {' '}
                our products
              </span>
            </span>{' '}
            for businesses.
          </h1>
          <p className="font-geist mx-auto mt-3 max-w-3xl  text-center text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            congue, nisl eget molestie varius, enim ex faucibus purus.
          </p>
          <button className="font-geist text-md mx-auto mt-5 flex w-fit items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-400  to-indigo-700 px-10 py-2 text-center text-lg tracking-tighter text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70">
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
