'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  coverImage?: { url: string }
  tags?: Array<{ tag: string }>
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
        >
          Блог
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{ color: '#0F172A', letterSpacing: '-0.02em' }}
        >
          Статьи об автоматизации
        </h1>
        <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(15,23,42,0.55)' }}>
          Разбираем кейсы, делимся опытом и рассказываем как автоматизация помогает бизнесу расти
        </p>
      </motion.div>

      {/* Posts */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center py-24"
        >
          <p className="text-lg" style={{ color: 'rgba(15,23,42,0.35)' }}>Публикации скоро появятся</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.07 }}
              className="group"
            >
              <article
                className="rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-250"
                style={{
                  border: '1px solid rgba(15,23,42,0.08)',
                  background: '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 8px 32px rgba(34,197,94,0.1)'
                  el.style.borderColor = 'rgba(34,197,94,0.25)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                  el.style.borderColor = 'rgba(15,23,42,0.08)'
                }}
              >
                {/* Cover image */}
                {post.coverImage?.url && (
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                )}

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t.tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(34,197,94,0.08)', color: '#16A34A' }}
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <Link href={`/blog/${post.slug}`}>
                    <h2
                      className="text-lg font-bold mb-3 leading-snug transition-colors duration-200"
                      style={{ color: '#0F172A' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#16A34A' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#0F172A' }}
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'rgba(15,23,42,0.55)' }}>
                      {post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + '...' : post.excerpt}
                    </p>
                  )}

                  {/* Footer: date + read more */}
                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}>
                    {post.publishedAt ? (
                      <p className="text-xs" style={{ color: 'rgba(15,23,42,0.38)' }}>
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </p>
                    ) : <span />}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                      style={{ color: '#22C55E' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#16A34A' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#22C55E' }}
                    >
                      Читать далее <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}
