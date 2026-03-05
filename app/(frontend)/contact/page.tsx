import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с нами для получения консультации по автоматизации бизнеса.',
}

export default async function ContactPage() {
  let settings: any = null
  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'site-settings' })
  } catch { /* use defaults */ }

  return (
    <div className="page-light min-h-screen pt-16" style={{ background: '#ffffff' }}>
      <Contact telegram={settings?.telegram} />
    </div>
  )
}
