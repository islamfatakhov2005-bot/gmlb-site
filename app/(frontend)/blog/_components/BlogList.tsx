'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import MatrixText from '@/components/ui/MatrixText'

interface Post {
  id: string
  slug: string
  title: string
  preview?: string
  publishedAt?: string | null
  coverImage?: { url: string } | null
  tags?: Array<{ tag: string }>
  readingTime?: number
}

const TAG_COLORS = ['#22C55E', '#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EC4899']

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <>
      {/* Hero header — grid-bg like other pages */}
      <section className="grid-bg pt-28 pb-16">
        <div className="container mx-auto text-center">
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
            <MatrixText text="Статьи об автоматизации" />
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Разбираем кейсы, делимся опытом и рассказываем как автоматизация помогает бизнесу расти
          </p>
        </div>
      </section>

      {/* Articles list */}
      <section className="py-16">
        <div className="container mx-auto" style={{ maxWidth: '720px' }}>
          {posts.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-lg"
              style={{ color: 'rgba(15,23,42,0.35)' }}
            >
              Публикации скоро появятся
            </motion.p>
          ) : (
            <div>
              {posts.map((post, i) => {
                const color = TAG_COLORS[i % TAG_COLORS.length]
                const firstTag = post.tags?.[0]?.tag

                return (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.07 }}
                    className="py-10"
                    style={{
                      borderBottom: '1px solid rgba(15,23,42,0.07)',
                    }}
                  >
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      {firstTag && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
                        >
                          {firstTag}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-xs" style={{ color: 'rgba(15,23,42,0.38)' }}>
                          {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: 'rgba(15,23,42,0.38)' }}>
                          <Clock size={11} />
                          {post.readingTime} мин
                        </span>
                      )}
                    </div>

                    {/* Cover image */}
                    {post.coverImage?.url && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-5 group">
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

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                      <h2
                        className="text-2xl font-bold mb-4 leading-snug transition-colors duration-200"
                        style={{ color: '#0F172A', letterSpacing: '-0.01em' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = color }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#0F172A' }}
                      >
                        {post.title}
                      </h2>
                    </Link>

                    {/* Preview — first paragraph, 3 lines max with fade */}
                    {post.preview && (
                      <div className="relative mb-5 overflow-hidden" style={{ maxHeight: '4.8rem' }}>
                        <p
                          className="text-base leading-relaxed"
                          style={{ color: 'rgba(15,23,42,0.6)', wordBreak: 'break-word', overflowWrap: 'break-word' }}
                        >
                          {post.preview}
                        </p>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                          style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
                        />
                      </div>
                    )}

                    {/* Read more */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group"
                      style={{ color }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.gap = '8px'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.gap = '6px'
                      }}
                    >
                      Читать далее
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
