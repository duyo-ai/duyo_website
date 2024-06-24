import Image from 'next/image'
import dashboard from '/public/dashboard.png'
import bgback from '/public/bg-back.png'

const DashboardDemo = () => {
  return (
    <div className="absolute -top-[0] z-10 hidden min-h-screen md:block">
      <div key={12}>
        <div className="relative mx-auto mt-20 flex w-screen items-center justify-center">
          <div className="absolute left-0 right-0 mx-auto top-0 z-20">
            <div className="overflow-x-hidden overflow-y-hidden">
              <div
                className="absolute left-0 top-10 h-52 w-[90%] overflow-x-hidden bg-[rgb(54,157,253)] bg-opacity-60 blur-[337.4px]"
                style={{ transform: 'rotate(-30deg)' }}
              />
            </div>{' '}
          </div>
          *
          <img
            src={'https://projectplannerai.com/landing/hero1-dark.png'}
            width={2000}
            height={2000}
            className="z-30 mx-auto hidden h-full w-[calc(80%-10rem)] rounded-3xl  border-[2px] border-white/10 object-cover  shadow-lg sm:hidden md:block md:opacity-80"
            alt="Dashboard showcase"
          />
          {/* <BorderBeam size={250} duration={12} delay={9} /> */}
        </div>
      </div>
    </div>
  )
}

export default DashboardDemo
