import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import ProductDetail from '@/components/sections/ProductDetail'

export const revalidate = 30

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: { isPublished: { equals: true } },
      limit: 100,
    })
    return docs.map((p: any) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 })
  const product = docs[0] as any
  if (!product) return { title: 'Продукт не найден' }
  return {
    title: product.seoTitle || product.title,
    description: product.seoDescription || product.shortDescription,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const [{ docs }, settingsResult] = await Promise.all([
    payload.find({ collection: 'products', where: { slug: { equals: slug } }, limit: 1 }),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])
  const product = docs[0] as any
  if (!product) notFound()

  const settings = settingsResult as any
  const telegram: string = settings?.telegram || 'gmlb_automation'

  const mapped = {
    id: product.id,
    title: product.title,
    slug: product.slug,
    shortDescription: product.shortDescription,
    tags: (product.tags || []).map((t: any) => t.tag),
    priceFrom: product.priceFrom,
    priceTo: product.priceTo,
    coverImage: product.coverImage ? { url: product.coverImage.url, alt: product.coverImage.alt || product.title } : null,
    iconName: product.iconName || 'Bot',
    color: product.color || '#22C55E',
    overview: product.overview || '',
    pains: (product.pains || []).map((p: any) => p.text),
    solution: product.solution || '',
    howItWorks: (product.howItWorks || []).map((h: any) => h.step),
    pricingPlans: (product.pricingPlans || []).map((plan: any) => ({
      name: plan.name,
      price: plan.price,
      features: (plan.features || []).map((f: any) => f.feature),
    })),
    faq: (product.faq || []).map((f: any) => ({ q: f.question, a: f.answer })),
  }

  return (
    <div className="page-light min-h-screen pt-16" style={{ background: '#ffffff', borderRadius: '0 0 85px 85px', overflow: 'hidden' }}>
      <ProductDetail product={mapped} telegram={telegram} />
    </div>
  )
}
