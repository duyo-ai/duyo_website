import RetroGrid from '../../components/farmui/RetroGrid'
import { ChevronRight } from 'lucide-react'
import { Button } from './Button'
import AnimatedLogoCloud from './Company'
const HeroMod = () => {
  return (
    <div className="relative z-10 mb-20">
      <section className=" relative mx-auto  max-w-full">
        <div className="  mx-auto max-w-screen-xl gap-12 px-4 py-10 text-gray-600 md:px-8">
          <div className="leading-0 mx-auto max-w-5xl  space-y-5 text-center lg:leading-5">
            <h1 className="font-geist group mx-auto w-fit rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent  px-5 py-2 text-sm text-gray-200">
              Build products for everyone
              <ChevronRight className="ml-2 inline h-4 w-4 duration-300 group-hover:translate-x-1" />
            </h1>

            <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]  bg-clip-text text-4xl tracking-tighter   text-transparent md:text-7xl">
              Designing your projects faster with{' '}
              <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent">
                the AI First project manager.
              </span>
            </h2>

            <p className="text-md md:text-md mx-auto max-w-2xl text-gray-300">
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
            {/* <div className="items-center  justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950  text-xs font-medium text-gray-50 backdrop-blur-3xl">
                    <a
                      href="javascript:void(0)"
                      className="inline-flex rounded-full text-center group items-center w-full justify-center   bg-gradient-to-tr from-zinc-300/5 via-purple-400/20 to-transparent    text-white border-input border-[1px] hover:bg-transparent/90 transition-colors sm:w-auto py-4 px-10"
                    >
                      Browse courses
                    </a>
                  </div>
                </span>
              </div> */}
          </div>
          <AnimatedLogoCloud />

          <div className="relative mx-10 mt-20 w-full">
            <img
              src="https://projectplannerai.com/landing/hero1-dark.png"
              className="w-full rounded-2xl z-10 border border-white/20  "
              alt=""
            />
            <img
              src="https://framerusercontent.com/images/0pkkUPiiBy68AdWhcnSLJijrCvQ.svg"
              className="w-full rounded-lg opacity-30  absolute -bottom-60 -z-10 w-full"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroMod
