import { clsx } from 'clsx'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(className, 'px-4 sm:px-6 lg:px-24')}>
      <div className="mx-auto max-w-[40rem] sm:max-w-2xl lg:max-w-6xl">{children}</div>
    </div>
  )
}
