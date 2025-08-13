import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '@/styles/tailwind.css'
import ToolbarProvider from '@/components/ToolbarProvider'


export const metadata: Metadata = {
  title: {
    template: '%s - Cutple',
    default: 'Cutple - 텍스트 한 줄로 만드는 바이럴 숏폼',
  },
  description:
    '키워드를 입력하면 대본이 나오고, 목소리가 입혀지고, 이미지가 배치됩니다. 심지어 장면 간의 간격까지 AI가 조절합니다.',
  icons: {
    icon: '/favicon.png',
  },
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
        'bg-slate-950  relative h-full overflow-x-hidden scroll-smooth antialiased',
        inter.variable,
        lexend.variable,
        GeistMono.variable,
        GeistSans.variable
      )}
    >
      <body className="flex h-full flex-col">
        <ToolbarProvider>
          {children}
        </ToolbarProvider>
      </body>
    </html> 
  )
}
