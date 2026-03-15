import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Advantages from '@/components/sections/Advantages'
import Contact from '@/components/sections/Contact'
import MatrixText from '@/components/ui/MatrixText'

export const metadata: Metadata = {
  title: 'Преимущества',
  description: 'Почему клиенты выбирают GMLB для автоматизации бизнеса.',
}

export const revalidate = 30

export default async function AdvantagesPage() {
  let advantages: any[] = []
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'advantages', limit: 12, sort: 'order' })
    advantages = docs
  } catch { /* use defaults */ }

  const mappedAdvantages = advantages.map((a: any) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    iconName: a.iconName || 'Zap',
    color: a.color || '#22C55E',
  }))

  return (
    <div className="page-light min-h-screen pt-16" style={{ background: '#ffffff', borderRadius: '0 0 85px 85px', overflow: 'hidden' }}>
      <section className="grid-bg py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            <MatrixText text="Почему GMLB" />
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Мы не просто пишем код — мы решаем бизнес-задачи
          </p>
        </div>
      </section>
      <Advantages advantages={mappedAdvantages} />
      <div className="section-divider" />
      <Contact />
    </div>
  )
}
