
const DashboardDemo = () => {
  return (
    <div className="relative px-4 sm:px-0 pb-12 sm:pb-20 flex justify-center">
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Responsive frame with preserved aspect ratio to avoid cropping on mobile */}
        <div className="relative aspect-video rounded-xl sm:rounded-3xl border border-white/10 bg-black/40 overflow-hidden shadow-lg">
          <video
            src={'/background-image.mp4'}
            width={1400}
            height={950}
            className="absolute inset-0 h-full w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardDemo

