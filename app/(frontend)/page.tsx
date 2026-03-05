import { getPayloadClient } from '@/lib/payload'
import Hero from '@/components/sections/Hero'
import ProductsGrid from '@/components/sections/ProductsGrid'
import About from '@/components/sections/About'
import Cases from '@/components/sections/Cases'
import Advantages from '@/components/sections/Advantages'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'

export const revalidate = 300

export default async function HomePage() {
  let products: any[] = []
  let cases: any[] = []
  let reviews: any[] = []
  let advantages: any[] = []
  let s: any = null

  try {
    const payload = await getPayloadClient()
    const [productsResult, casesResult, reviewsResult, advantagesResult, settingsResult] =
      await Promise.allSettled([
        payload.find({ collection: 'products', where: { isPublished: { equals: true } }, limit: 6, sort: '-createdAt' }),
        payload.find({ collection: 'cases', limit: 3, sort: '-createdAt' }),
        payload.find({ collection: 'reviews', where: { isPublished: { equals: true } }, limit: 6 }),
        payload.find({ collection: 'advantages', limit: 6, sort: 'order' }),
        payload.findGlobal({ slug: 'site-settings' }),
      ])
    products = productsResult.status === 'fulfilled' ? productsResult.value.docs : []
    cases = casesResult.status === 'fulfilled' ? casesResult.value.docs : []
    reviews = reviewsResult.status === 'fulfilled' ? reviewsResult.value.docs : []
    advantages = advantagesResult.status === 'fulfilled' ? advantagesResult.value.docs : []
    s = settingsResult.status === 'fulfilled' ? (settingsResult.value as any) : null
  } catch { /* use defaults */ }

  const mappedProducts = products.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    tags: p.tags || [],
    priceFrom: p.priceFrom,
    coverImage: p.coverImage ? { url: p.coverImage.url, alt: p.coverImage.alt || p.title } : null,
    featured: p.featured || false,
    iconName: p.iconName || 'Bot',
    color: p.color || '#22C55E',
  }))

  const mappedCases = cases.map((c: any) => ({
    id: c.id,
    title: c.title,
    clientType: c.clientType,
    description: c.description || '',
    metrics: c.metrics || [],
    tags: c.tags || [],
    color: c.color || '#22C55E',
  }))

  const mappedReviews = reviews.map((r: any) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    text: r.text,
    rating: r.rating || 5,
    initials: r.initials,
    color: r.color || '#22C55E',
  }))

  const mappedAdvantages = advantages.map((a: any) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    iconName: a.iconName || 'Zap',
    color: a.color || '#22C55E',
  }))

  return (
    <>
      <Hero
        badgeText={s?.heroBadge}
        heading={s?.heroHeading}
        headingHighlight={s?.heroHeadingHighlight}
        headingEnd={s?.heroHeadingEnd}
        subheading={s?.heroSubheading}
        stat1Value={s?.stat1Value}
        stat1Label={s?.stat1Label}
        stat2Value={s?.stat2Value}
        stat2Label={s?.stat2Label}
        stat3Value={s?.stat3Value}
        stat3Label={s?.stat3Label}
      />
      <div className="section-divider" />
      <ProductsGrid products={mappedProducts} />
      <div className="section-divider" />
      <About
        heading={s?.aboutHeading}
        description={s?.aboutDescription}
        points={s?.aboutPoints?.length ? s.aboutPoints : undefined}
        imageUrl={s?.aboutImage?.url}
        statValue={s?.aboutStatValue}
        statLabel={s?.aboutStatLabel}
      />
      <div className="section-divider" />
      <Cases cases={mappedCases} />
      <div className="section-divider" />
      <Advantages advantages={mappedAdvantages} />
      <div className="section-divider" />
      <Reviews reviews={mappedReviews} />
      <div className="section-divider" />
      <Contact telegram={s?.telegram} />
    </>
  )
}
