import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GMLB — Автоматизация бизнеса',
    template: '%s | GMLB',
  },
  description:
    'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Автоматизация бизнес-процессов для малого бизнеса и e-commerce.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'GMLB',
  },
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let telegram = 'gmlb_automation'
  let email = 'info@gmlb.ru'
  let phone = '+7 (XXX) XXX-XX-XX'

  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const s = await payload.findGlobal({ slug: 'site-settings' }) as any
    if (s?.telegram) telegram = s.telegram
    if (s?.email) email = s.email
    if (s?.phone) phone = s.phone
  } catch {
    // используем дефолтные значения
  }

  return (
    <html lang="ru" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <Toaster theme="dark" position="bottom-right" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer telegram={telegram} email={email} phone={phone} />
      </body>
    </html>
  )
}
