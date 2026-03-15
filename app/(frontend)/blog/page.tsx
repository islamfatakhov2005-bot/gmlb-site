import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import BlogList from './_components/BlogList'

export const metadata: Metadata = {
  title: 'Блог',
  description: 'Статьи об автоматизации бизнеса, Telegram-ботах и e-commerce.',
}

export const revalidate = 30

/** Извлечь первый непустой абзац из Lexical JSON */
function extractPreview(content: any): string {
  if (!content?.root?.children) return ''
  for (const node of content.root.children) {
    if (node.type === 'paragraph') {
      const text = (node.children ?? [])
        .filter((n: any) => n.type === 'text')
        .map((n: any) => n.text as string)
        .join('')
        .trim()
      if (text) return text
    }
  }
  return ''
}

/** ~200 слов/мин */
function readingTime(content: any): number {
  let words = 0
  function walk(node: any) {
    if (node?.type === 'text' && node.text) words += node.text.trim().split(/\s+/).length
    ;(node?.children ?? []).forEach(walk)
  }
  walk(content?.root)
  return Math.max(1, Math.round(words / 200))
}

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
    posts = result.docs.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      tags: p.tags ?? [],
      publishedAt: p.publishedAt ?? null,
      coverImage: p.coverImage?.url ? { url: p.coverImage.url } : null,
      // Excerpt из поля CMS, иначе первый абзац
      preview: (p.excerpt?.trim()) || extractPreview(p.content),
      readingTime: readingTime(p.content),
    }))
  } catch { /* use empty */ }

  return (
    <div
      className="page-light min-h-screen"
      style={{ background: '#ffffff', borderRadius: '0 0 85px 85px', overflow: 'hidden' }}
    >
      <BlogList posts={posts} />
    </div>
  )
}
