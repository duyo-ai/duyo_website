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
        <div className="py-8 sm:py-12 lg:py-16">
          <nav className="text-sm" aria-label="사이트 링크">
            <div className="flex justify-end gap-x-6 flex-wrap text-gray-300">
              <Link href="#">{t['footer.links.company']}</Link>
              <Link href="#">{t['footer.links.terms']}</Link>
              <Link href="#">{t['footer.links.privacy']}</Link>
              <Link href="#">{t['footer.links.guide']}</Link>
            </div>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-gray-200">
          <div className="space-y-6">
            <Logo />
            <div>
              <h3 className="font-semibold mb-2">{t['footer.customer.title']}</h3>
              <p className="text-sm">{t['footer.customer.phone']}&nbsp;&nbsp; 070-7666-9891</p>
              <p className="text-sm">{t['footer.customer.email']}&nbsp;&nbsp; contact@duyo.ai</p>
              <p className="text-sm">{t['footer.customer.hours']}&nbsp;&nbsp; 09:00 ~ 21:00</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t['footer.payment.title']}</h3>
              <p className="text-sm">{t['footer.payment.account']}</p>
              <p className="text-sm">토스뱅크&nbsp;&nbsp; 100045939891&nbsp;&nbsp; 김진우</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t['footer.company.title']}</h3>
            <p className="text-sm">{t['footer.company.name']}&nbsp; 두오&nbsp;&nbsp; {t['footer.company.ceo']}&nbsp; 김진우</p>
            <p className="text-sm">{t['footer.company.address']}&nbsp; 06978 서울 동작구 상도로55길 6 304-2호</p>
            <p className="text-sm">{t['footer.company.phone']}&nbsp; 070-7666-9891&nbsp;&nbsp; {t['footer.company.business']}&nbsp; 826-08-02196</p>
            <p className="text-sm">{t['footer.company.license']}&nbsp; 2023-서울관악-2318 [사업자정보확인]</p>
            <p className="text-sm">{t['footer.company.privacy']}&nbsp; 김진우</p>
          </div>
        </div>

        <div className="py-6 sm:py-10">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            {t['footer.copyright']}
          </p>
        </div>
      </Container>
    </footer>
  )
}
