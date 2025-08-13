"use client"
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'

export function Footer() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  return (
    <footer className="relative rounded-xs border-t border-white/10">
      <Container>
        <div className="py-8 sm:py-12 lg:py-16" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-200">
          <div className="space-y-6">
            <Logo />
            <div>
              <h3 className="font-semibold mb-2">{lang==='ko' ? t['footer2.customer.title'] : t['footer2.customer.title']}</h3>
              <p className="text-sm">{t['footer2.customer.email']}&nbsp;&nbsp; contact@cutple.ai</p>
              <p className="text-sm">{t['footer2.customer.hours']}&nbsp;&nbsp; 09:00 ~ 21:00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t['footer2.company.title']}</h3>
            <p className="text-sm">{t['footer2.company.company']}&nbsp; 두요</p>
            <p className="text-sm">{t['footer2.company.ceo']}&nbsp; 김진우</p>
            <p className="text-sm">{t['footer2.company.address']}&nbsp; 서울 동작구 상도로55길 6 304-2호</p>
            <p className="text-sm">{t['footer2.company.business']}&nbsp; 826-08-02196</p>
            <p className="text-sm">{t['footer2.company.privacy']}&nbsp; 김진우</p>
          </div>
        </div>

        <div className="py-6 sm:py-10">
          <p className="text-xs sm:text-sm text-gray-400 text-center">{t['footer2.copyright']}</p>
        </div>
      </Container>
    </footer>
  )
}
