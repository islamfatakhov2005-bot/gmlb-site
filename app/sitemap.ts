import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/cases`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  let productPages: MetadataRoute.Sitemap = []
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayloadClient()
    const [productsResult, blogResult] = await Promise.allSettled([
      payload.find({ collection: 'products', where: { isPublished: { equals: true } }, limit: 500 }),
      payload.find({ collection: 'blog', where: { isPublished: { equals: true } }, limit: 500 }),
    ])
    if (productsResult.status === 'fulfilled') {
      productPages = productsResult.value.docs.map((p: any) => ({
        url: `${siteUrl}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
    if (blogResult.status === 'fulfilled') {
      blogPages = blogResult.value.docs.map((p: any) => ({
        url: `${siteUrl}/blog/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      }))
    }
  } catch { /* return static pages only */ }

  return [...staticPages, ...productPages, ...blogPages]
}
