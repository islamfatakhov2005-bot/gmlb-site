import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import ProductsCatalog from '@/components/sections/ProductsCatalog'

export const metadata: Metadata = {
  title: 'Каталог продуктов',
  description: 'Готовые решения для автоматизации бизнеса: Telegram-боты, парсеры, RAG-ассистенты и чат-боты.',
}

export const revalidate = 300

export default async function ProductsPage() {
  let products: any[] = []
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: { isPublished: { equals: true } },
      limit: 50,
      sort: '-createdAt',
    })
    products = docs
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

  return (
    <div className="page-light min-h-screen pt-16" style={{ background: '#ffffff', borderRadius: '0 0 85px 85px', overflow: 'hidden' }}>
      <ProductsCatalog products={mappedProducts} />
    </div>
  )
}
