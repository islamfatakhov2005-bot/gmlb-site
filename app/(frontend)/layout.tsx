import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

async function getSettings() {
  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    return (await payload.findGlobal({ slug: 'site-settings' })) as any
  } catch {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()

  const title = s?.seoTitle || 'GMLB — Автоматизация бизнеса'
  const description =
    s?.seoDescription ||
    'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Автоматизация бизнес-процессов для малого бизнеса и e-commerce.'
  const ogImageUrl: string | undefined = s?.ogImage?.url

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: '%s | GMLB' },
    description,
    keywords: s?.seoKeywords || undefined,
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: 'GMLB',
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
    },
    verification: {
      google: 'po9hkhBrunVc_q5OazHuJuBPZMmskw7hT3rQokibpho',
    },
    other: {
      'yandex-verification': 'ac517cc55887a958',
    },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const s = await getSettings()

  const telegram        = s?.telegram        || 'gmlb_automation'
  const email           = s?.email           || 'info@gmlb.ru'
  const phone           = s?.phone           || '+7 (XXX) XXX-XX-XX'
  const logoUrl: string | undefined = s?.logo?.url
  const headerCtaText   = s?.headerCtaText   || 'Консультация'
  const headerCtaUrl    = s?.headerCtaUrl    || '/contact'
  const footerDesc: string | undefined = s?.footerDescription || undefined
  const footerProducts: Array<{ label: string; href: string }> | undefined =
    s?.footerProducts?.length
      ? s.footerProducts.map((p: any) => ({ label: p.label, href: p.href }))
      : undefined

  const yandexMetrikaId: string | undefined = s?.yandexMetrikaId || undefined
  const googleAnalyticsId: string | undefined = s?.googleAnalyticsId || undefined

  return (
    <html lang="ru" className={inter.variable} style={{ overflowX: 'clip' }}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', overflowX: 'clip' }}>
        <Toaster theme="dark" position="bottom-right" />
        <Header
          logoUrl={logoUrl}
          ctaText={headerCtaText}
          ctaUrl={headerCtaUrl}
        />
        <main className="min-h-screen">{children}</main>
        <Footer
          telegram={telegram}
          email={email}
          phone={phone}
          description={footerDesc}
          products={footerProducts}
          logoUrl={logoUrl}
        />

        {/* Яндекс.Метрика */}
        {yandexMetrikaId && (
          <Script id="ym-init" strategy="afterInteractive">{`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(${yandexMetrikaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
          `}</Script>
        )}

        {/* Google Analytics 4 */}
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}</Script>
          </>
        )}
      </body>
    </html>
  )
}
