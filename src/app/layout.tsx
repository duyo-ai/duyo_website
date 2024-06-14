import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/tailwind.css'
import BackgroundPlus from '@/components/PlusGrid'

export const metadata: Metadata = {
  title: {
    template: '%s - Curves',
    default: 'Curves - Mkae a easy and simply your curves at stant',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        ' bg-slate-950 relative h-full overflow-x-hidden scroll-smooth antialiased',
        inter.variable,
        lexend.variable,
        GeistMono.variable,
        GeistSans.variable
      )}
    >
      <div className="absolute top-10 z-30 max-h-full w-screen bg-indigo-950/20  bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <BackgroundPlus />
      <body className="flex h-full flex-col bg-hero-gradient">{children}</body>
    </html> 
  )
}
