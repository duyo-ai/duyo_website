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
      className="relative transform-gpu overflow-hidden bg-page-gradient pt-16 sm:pt-24 lg:pt-32 mb-20"
    >
      <div className="-z-1 absolute inset-x-0 -top-0 h-screen  w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]  bg-[size:6rem_4rem] opacity-15 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <Container className="relative z-10">
        
        <Testimonials />
      </Container>
      
    </section>
  )
}
