'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

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
      if (node.format & 1) content = <strong>{content}</strong>
      if (node.format & 2) content = <em>{content}</em>
      if (node.format & 8) content = <code className="px-1 py-0.5 rounded text-sm" style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}>{content}</code>
      if (node.format & 16) content = <s>{content}</s>
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

interface Props {
  title: string
  publishedAt?: string
  tags?: Array<{ tag: string }>
  coverImageUrl?: string
  content?: any
}

export default function BlogPostClient({ title, publishedAt, tags, coverImageUrl, content }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
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
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span key={t.tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}>
              {t.tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
        {title}
      </h1>

      {/* Date */}
      {publishedAt && (
        <p className="text-sm mb-8" style={{ color: 'rgba(15,23,42,0.4)' }}>
          {new Date(publishedAt).toLocaleDateString('ru-RU', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>
      )}

      {/* Cover */}
      {coverImageUrl && (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10">
          <Image src={coverImageUrl} alt={title} fill style={{ objectFit: 'cover' }} priority />
        </div>
      )}

      {/* Content */}
      <div
        className="prose-custom"
        style={{ wordBreak: 'break-word', overflowWrap: 'break-word', minWidth: 0 }}
      >
        {content?.root ? serializeNode(content.root, 0) : null}
      </div>
    </motion.div>
  )
}
