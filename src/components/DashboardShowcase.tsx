import Image from 'next/image'
import dashboard from '/public/dashboard.png'
import bgback from '/public/bg-back.png'

const DashboardDemo = () => {
  return (
    <div className="absolute -top-[0] z-50 min-h-screen">
      <div key={12}>
        <img
          src="https://framerusercontent.com/images/0pkkUPiiBy68AdWhcnSLJijrCvQ.svg"
          className="absolute -top-[52rem] left-0 right-0 z-30 mx-auto opacity-40 overflow-hidden  hidden w-full bg-center shadow-lg sm:hidden md:block"
          alt=""
        />
        <div className="relative mx-auto mt-20 flex w-screen items-center justify-center overflow-x-hidden">
          <img
            src={'https://projectplannerai.com/landing/hero1-dark.png'}
            width={2000}
            height={2000}
            className="z-30  mx-auto hidden max-w-7xl  object-cover shadow-lg sm:hidden md:block"
            alt="Dashboard showcase"
          />
          {/* <BorderBeam size={250} duration={12} delay={9} /> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardDemo
