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
      className="relative transform-gpu overflow-hidden bg-page-gradient mb-20"
    >

      
        
        <Testimonials />
      
    </section>
  )
}
