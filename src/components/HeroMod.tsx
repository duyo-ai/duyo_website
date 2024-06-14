import RetroGrid from '../../components/farmui/RetroGrid'
import { ChevronRight } from 'lucide-react'
import { Button } from './Button'
import AnimatedLogoCloud from './Company'
import TextRotate from '../../components/farmui/RotateText'
import DashboardDemo from './DashboardShowcase'
const HeroMod = () => {
  return (
    <div className="relative z-10 mb-20">
      <section className=" relative mx-auto min-h-screen  max-w-full">
        <div className="mx-auto  max-w-screen-xl gap-12 px-4 py-10 text-gray-600 md:px-8">
          <div className="leading-0 mx-auto max-w-6xl space-y-5  px-10 text-center lg:leading-5">
            <h1 className="font-geist  group mx-auto w-fit rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  px-5 py-2 text-sm text-gray-200">
              Build products for everyone
              <ChevronRight className="ml-2 inline h-4 w-4 duration-300 group-hover:translate-x-1" />
            </h1>

            <h2 className="font-geist  mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]  bg-clip-text text-4xl tracking-tighter   text-transparent md:text-7xl">
              Designing your projects faster with{' '}
              <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                the AI First project manager
              </span>
            </h2>

            <p className="text-md  md:text-md mx-auto max-w-2xl text-gray-300">
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <Button
              className="font-geist group flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-700 px-4 py-3 text-center text-lg text-xl tracking-tighter text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70"
              href="/register"
            >
              Get Started{' '}
              <ChevronRight className=" inline-flex items-center justify-center transition-all duration-500 group-hover:translate-x-1" />
            </Button>
          </div>
          <AnimatedLogoCloud />
        </div>
        <div className='relative max-w-full'>
          <DashboardDemo />

        </div>
      </section>
    </div>
  )
}

export default HeroMod
