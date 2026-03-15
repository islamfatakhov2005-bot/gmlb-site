import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'
import BlogPostClient from '../_components/BlogPostClient'

export const revalidate = 30

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog',
    where: { slug: { equals: slug }, isPublished: { equals: true } },
    limit: 1,
  })
  return result.docs[0] as any | undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPost(slug)
    if (!post) return {}
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || undefined,
      openGraph: post.coverImage?.url
        ? { images: [{ url: post.coverImage.url }] }
        : undefined,
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let post: any
  try {
    post = await getPost(slug)
  } catch {
    notFound()
  }
  if (!post) notFound()

  return (
    <div className="page-light min-h-screen pt-28 pb-24" style={{ background: '#ffffff' }}>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto">
          <BlogPostClient
            title={post.title}
            publishedAt={post.publishedAt}
            tags={post.tags}
            coverImageUrl={post.coverImage?.url}
            content={post.content}
          />
        </div>
      </div>
    </div>
  )
}
