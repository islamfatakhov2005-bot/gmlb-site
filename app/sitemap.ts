import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/cases`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  let productPages: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayloadClient()
    const { docs: products } = await payload.find({
      collection: 'products',
      where: { isPublished: { equals: true } },
      limit: 500,
    })
    productPages = products.map((p: any) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch { /* return static pages only */ }

  return [...staticPages, ...productPages]
}
