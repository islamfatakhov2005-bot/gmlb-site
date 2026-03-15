import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import BlogGrid from './_components/BlogGrid'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Статьи об автоматизации бизнеса, Telegram-ботах и e-commerce.',
}

export const revalidate = 30

export default async function BlogPage() {
  let posts: any[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blog',
      where: { isPublished: { equals: true } },
      sort: '-publishedAt',
      limit: 30,
    })
    posts = result.docs
  } catch { /* use empty */ }

  return (
    <div className="page-light min-h-screen pt-28 pb-24" style={{ background: '#ffffff' }}>
      <div className="container mx-auto">
        <BlogGrid posts={posts} />
      </div>
    </div>
  )
}
