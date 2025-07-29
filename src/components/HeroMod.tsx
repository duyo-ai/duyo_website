import RetroGrid from '../../components/farmui/RetroGrid'
import { ChevronRight } from 'lucide-react'
import { Button } from './Button'
import AnimatedLogoCloud from './Company'
import TextRotate from '../../components/farmui/RotateText'
import DashboardDemo from './DashboardShowcase'
import GridBackground from './GridBackground'

const HeroMod = () => {
  return (
    <>
      <section 
        className="min-h-screen w-full relative mb-0"
        style={{
          background: 'radial-gradient(ellipse 50% 80% at 20% 40%, rgba(93, 52, 221, 0.1), transparent), radial-gradient(ellipse 50% 80% at 50% 80%, rgba(0, 160, 255, 0.3), transparent)'
        }}
      >
        <GridBackground />
        
        <div className="relative z-10 mx-auto max-w-screen-xl gap-12 px-4 py-6 sm:py-10 text-gray-600 md:px-8">
          <div className="leading-0 mx-auto max-w-6xl space-y-6 sm:space-y-10 px-4 sm:px-6 lg:px-10 text-center lg:leading-5">
            <h1 className="font-geist group mx-auto w-fit rounded-2xl sm:rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent px-3 py-2 sm:px-5 text-xs sm:text-sm text-gray-200">
              Welcome to Cutple
              <ChevronRight className="ml-1 sm:ml-2 inline h-3 w-3 sm:h-4 sm:w-4 duration-300 group-hover:translate-x-1" />
            </h1>

            <h2 className="font-semibold mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-transparent mb-6 sm:mb-10 leading-tight">
              
              텍스트 한
              줄로 만드는 바이럴 숏폼{' '}<br/>
              <span className="bg-gradient-to-r from-purple-300 to-blue-200 bg-clip-text text-transparent block mt-3 sm:mt-6">
                대본, 목소리, 이미지까지,<br className="sm:hidden"/>
                클릭 몇 번으로 쉽게.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg mx-auto max-w-xl sm:max-w-2xl text-gray-300 px-4 sm:px-0">
            키워드를 입력하면 대본이 나오고, 목소리가 입혀지고, 이미지가 배치됩니다. <br className="hidden sm:block"/>심지어 장면 간의 간격까지 AI가 조절합니다.
            </p>
            <Button
              className="font-geist group z-50 flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-700 px-6 py-3 sm:px-8 sm:py-4 text-center text-base sm:text-lg lg:text-xl tracking-tighter text-zinc-50 ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-indigo-500/70 w-fit mx-auto"
              href="/register"
            >
              지금 시작하기{' '}
              <ChevronRight className="inline-flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
                    </div>
          <AnimatedLogoCloud />
        </div>
        <div className="relative max-w-full">
          <DashboardDemo />
        </div>
      </section>
    </>
  )
}

export default HeroMod
