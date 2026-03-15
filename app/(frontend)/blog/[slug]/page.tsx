import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

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

/** Minimal Lexical JSON → JSX serializer */
function serializeNode(node: any, index: number): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'root':
      return <>{node.children?.map(serializeNode)}</>

    case 'paragraph':
      return (
        <p key={index} className="mb-5 leading-relaxed" style={{ color: 'rgba(15,23,42,0.75)', fontSize: '16px' }}>
          {node.children?.map(serializeNode)}
        </p>
      )

    case 'heading': {
      const Tag = `h${node.tag?.replace('h', '') || '2'}` as any
      const sizes: Record<string, string> = { h1: '2rem', h2: '1.5rem', h3: '1.25rem', h4: '1.1rem' }
      return (
        <Tag key={index} className="font-bold mt-8 mb-3 leading-snug" style={{ color: '#0F172A', fontSize: sizes[node.tag] || '1.25rem' }}>
          {node.children?.map(serializeNode)}
        </Tag>
      )
    }

    case 'list':
      return node.listType === 'number' ? (
        <ol key={index} className="list-decimal list-inside mb-5 space-y-1.5" style={{ color: 'rgba(15,23,42,0.75)' }}>
          {node.children?.map(serializeNode)}
        </ol>
      ) : (
        <ul key={index} className="list-disc list-inside mb-5 space-y-1.5" style={{ color: 'rgba(15,23,42,0.75)' }}>
          {node.children?.map(serializeNode)}
        </ul>
      )

    case 'listitem':
      return <li key={index}>{node.children?.map(serializeNode)}</li>

    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-6 pl-5 italic"
          style={{ borderLeft: '3px solid #22C55E', color: 'rgba(15,23,42,0.6)', fontSize: '15px' }}
        >
          {node.children?.map(serializeNode)}
        </blockquote>
      )

    case 'horizontalrule':
      return <hr key={index} className="my-8" style={{ borderColor: 'rgba(15,23,42,0.1)' }} />

    case 'linebreak':
      return <br key={index} />

    case 'text': {
      let content: React.ReactNode = node.text
      if (node.format & 1) content = <strong>{content}</strong>   // bold
      if (node.format & 2) content = <em>{content}</em>           // italic
      if (node.format & 8) content = <code className="px-1 py-0.5 rounded text-sm" style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}>{content}</code>
      if (node.format & 16) content = <s>{content}</s>            // strikethrough
      return <span key={index}>{content}</span>
    }

    case 'link':
      return (
        <a
          key={index}
          href={node.fields?.url || '#'}
          target={node.fields?.newTab ? '_blank' : undefined}
          rel="noopener noreferrer"
          style={{ color: '#22C55E', textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {node.children?.map(serializeNode)}
        </a>
      )

    default:
      if (node.children?.length) {
        return <span key={index}>{node.children.map(serializeNode)}</span>
      }
      return null
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
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-8 text-sm transition-colors duration-200"
            style={{ color: 'rgba(15,23,42,0.45)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#22C55E' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(15,23,42,0.45)' }}
          >
            <ArrowLeft size={15} />
            Все статьи
          </Link>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t: any) => (
                <span key={t.tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}>
                  {t.tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>

          {/* Date */}
          {post.publishedAt && (
            <p className="text-sm mb-8" style={{ color: 'rgba(15,23,42,0.4)' }}>
              {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          )}

          {/* Cover */}
          {post.coverImage?.url && (
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            {post.content?.root ? serializeNode(post.content.root, 0) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
