import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import MatrixText from '@/components/ui/MatrixText'

export const metadata: Metadata = {
  title: 'Отзывы клиентов',
  description: 'Что говорят наши клиенты о продуктах GMLB.',
}

export const revalidate = 300

export default async function ReviewsPage() {
  let reviews: any[] = []
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({ collection: 'reviews', where: { isPublished: { equals: true } }, limit: 30 })
    reviews = docs
  } catch { /* use defaults */ }

  const mappedReviews = reviews.map((r: any) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    text: r.text,
    rating: r.rating || 5,
    initials: r.initials,
    color: r.color || '#22C55E',
  }))

  return (
    <div className="min-h-screen pt-16" style={{ background: '#081410' }}>
      <section className="grid-bg py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
            <MatrixText text="Отзывы клиентов" />
          </h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(230,237,243,0.55)' }}>
            Что говорят о нас те, кто уже автоматизировал свой бизнес
          </p>
        </div>
      </section>
      <Reviews reviews={mappedReviews} />
      <div className="section-divider" />
      <Contact />
    </div>
  )
}
