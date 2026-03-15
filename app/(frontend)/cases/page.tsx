import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Cases from '@/components/sections/Cases'
import Contact from '@/components/sections/Contact'
import MatrixText from '@/components/ui/MatrixText'

export const metadata: Metadata = {
  title: 'Кейсы клиентов',
  description: 'Реальные результаты наших клиентов. Как автоматизация помогает бизнесу расти.',
}

export const revalidate = 30

export default async function CasesPage() {
  let cases: any[] = []
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'cases', limit: 20, sort: '-createdAt' })
    cases = docs
  } catch { /* use defaults */ }

  const mappedCases = cases.map((c: any) => ({
    id: c.id,
    title: c.title,
    clientType: c.clientType,
    description: c.description || '',
    metrics: c.metrics || [],
    tags: c.tags || [],
    color: c.color || '#22C55E',
  }))

  return (
    <div className="page-light min-h-screen pt-16" style={{ background: '#ffffff', borderRadius: '0 0 85px 85px', overflow: 'hidden' }}>
      <section className="grid-bg py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            <MatrixText text="Кейсы клиентов" />
          </h1>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Реальные результаты от внедрения автоматизации
          </p>
        </div>
      </section>
      <Cases cases={mappedCases} />
      <div className="section-divider" />
      <Contact />
    </div>
  )
}
