import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logoLaravel from '@/images/logos/laravel.svg'
import logoMirage from '@/images/logos/mirage.svg'
import logoStatamic from '@/images/logos/statamic.svg'
import logoStaticKit from '@/images/logos/statickit.svg'
import logoTransistor from '@/images/logos/transistor.svg'
import logoTuple from '@/images/logos/tuple.svg'
import AnimatedLogoCloud from './Company'

export function Hero() {
  return (
    <section className=" relative">
      <Container className="relative min-h-screen pb-10 pt-20 text-left lg:pt-30">
        <h1 className="mr-auto max-w-3xl font-display text-5xl  font-normal tracking-tighter text-gray-100 sm:text-7xl">
          Accounting{' '}
                          <span className="relative whitespace-nowrap text-[#6A14FF]">
            <span className="relative">made simple</span>
          </span>{' '}
          for small businesses and rising startups
        </h1>
        <p className="mr-auto text-left mt-6 max-w-2xl text-lg tracking-tight text-gray-200">
          Most bookkeeping software is accurate, but hard to use. We make the
          opposite trade-off, and hope you don’t get audited.
        </p>
        <div className="mt-10 flex justify-start gap-x-6">
          <Button
            className="font-geist flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-[#8B44FF] to-[#4A0FBF] px-4 py-3 text-center text-lg text-xl tracking-tighter text-zinc-50 ring-2 ring-[#6A14FF]/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-[#6A14FF]/70"
            href="/register"
          >
            Get Started with Click
          </Button>
        </div>
        <div className="mt-36 lg:mt-44">
          <p className="font-mono uppercase tracking-tighter text-base text-gray-100 bg-gradient-to-br from-[#8B44FF] via-[#6BA4FF] to-[#4A0FBF] bg-clip-text text-transparent">
            Trusted by these six companies so far
          </p>
          <AnimatedLogoCloud />
          {/* <ul
            role="list"
            className="mt-8 flex items-center justify-start gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
          >
            {[
              [
                { name: 'Transistor', logo: logoTransistor },
                { name: 'Tuple', logo: logoTuple },
                { name: 'StaticKit', logo: logoStaticKit },
              ],
              [
                { name: 'Mirage', logo: logoMirage },
                { name: 'Laravel', logo: logoLaravel },
                { name: 'Statamic', logo: logoStatamic },
              ],
            ].map((group, groupIndex) => (
              <li key={groupIndex}>
                <ul
                  role="list"
                  className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
                >
                  {group.map((company) => (
                    <li key={company.name} className="flex">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        unoptimized
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul> */}
        </div>
      </Container>
    </section>
  )
}
