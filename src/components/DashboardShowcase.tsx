

const DashboardDemo = () => {
  return (
    <div className="relative mt-6 sm:mt-8 pb-12 sm:pb-20 flex justify-center px-4 sm:px-0">
      <div className="relative mx-auto max-w-xs sm:max-w-4xl lg:max-w-6xl w-full rounded-2xl sm:rounded-3xl border-[1px] sm:border-[2px] border-white/10 shadow-lg opacity-90 sm:opacity-80 overflow-hidden">
        <video
          src={'/mainvideo.mp4'}
          width={1400}
          height={950}
          className="w-full h-auto"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* 이미지 가장자리 블렌드 마스크 */}
      </div>
    </div>
  )
}

export default DashboardDemo

