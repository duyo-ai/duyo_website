import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { Testimonials } from './Testimonials'
import { cn } from '@/lib/utils'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="bg-page-gradient relative transform-gpu  overflow-hidden py-32 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#798ef9_inset]"
    >
      <div className="-z-1 absolute inset-x-0 -top-0 h-[600px]  w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

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
        <div className="relative  mt-20">
          <div className='absolute  top-20 left-0 right-0 z-10'>
            <h1 className="mx-auto  text-center font-nomral tracking-tighter  max-w-4xl font-sans text-5xl text-gray-100 sm:text-8xl">
              Happy peoples using {' '}
              <span className="relative whitespace-nowrap">
                <span className="relative  bg-gradient-to-br from-indigo-400 via-indigo-300 to-indigo-700 bg-clip-text text-transparent">our products</span>
              </span>{' '}
              for  businesses.
            </h1>
            <button className="w-fit mx-auto mt-5 px-10 font-geist tracking-tighter text-center rounded-md text-md bg-gradient-to-br from-indigo-400 to-indigo-700  py-2 text-lg text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70 flex items-center justify-center gap-2">
                  Explore more
                </button>
          </div>
          <div
            className={cn(
              'mask-radial-faded  z-2  -pointer-events-none relative -my-[6rem] h-[40rem] rounded-4xl overflow-hidden bg-',
              'before:bg-radial-faded [--color:#7877C6] before:absolute before:inset-0 before:opacity-[0.4]',
              'after:absolute  after:top-[17rem] after:left-0 after:right-1/2 after:mt-[70px] after:h-[120.8%] after:py-20 after:w-[100%] after:mx-auto after:rounded-[500%] after:border-t after:border-[rgba(120,119,198,0.4)] after:bg-hero-gradient',
            )}
          ></div>
        </div>
    </section>
  )
}
