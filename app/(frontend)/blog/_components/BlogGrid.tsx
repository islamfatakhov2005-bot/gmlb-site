'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'

interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  publishedAt?: string
  coverImage?: { url: string }
  tags?: Array<{ tag: string }>
}

const TAG_COLORS = ['#22C55E', '#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EC4899']

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
}
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65 }}
        className="mb-14"
      >
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
        >
          Блог
        </span>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
          style={{ color: '#0F172A', letterSpacing: '-0.02em' }}
        >
          Статьи об автоматизации
        </h1>
        <p className="text-base max-w-xl" style={{ color: 'rgba(15,23,42,0.55)' }}>
          Разбираем кейсы, делимся опытом и рассказываем как автоматизация помогает бизнесу расти
        </p>
      </motion.div>

      {/* Posts */}
      {posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="py-24"
        >
          <p className="text-lg" style={{ color: 'rgba(15,23,42,0.35)' }}>Публикации скоро появятся</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map((post, i) => {
            const color = TAG_COLORS[i % TAG_COLORS.length]
            const firstTag = post.tags?.[0]?.tag

            return (
              <motion.div key={post.id} variants={cardVariants}>
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <article className="glass-card p-6 flex flex-col h-full transition-all duration-200"
                    style={{ minHeight: 260 }}
                  >
                    {/* Cover image — compact */}
                    {post.coverImage?.url && (
                      <div className="relative h-36 rounded-xl overflow-hidden mb-4 -mx-2">
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Tag badge */}
                    {firstTag && (
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
                        >
                          {firstTag}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2
                      className="text-base font-bold mb-3 leading-snug transition-colors duration-200"
                      style={{ color: '#0F172A' }}
                    >
                      {post.title}
                    </h2>

                    {/* Excerpt with fade */}
                    {post.excerpt && (
                      <div className="relative flex-1 mb-5 overflow-hidden" style={{ maxHeight: '4.5rem' }}>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>
                          {post.excerpt}
                        </p>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
                          style={{ background: 'linear-gradient(to bottom, transparent, white)' }}
                        />
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-auto">
                      {post.publishedAt ? (
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: 'rgba(15,23,42,0.38)' }}>
                          <Calendar size={11} />
                          {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })}
                        </span>
                      ) : <span />}

                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold"
                        style={{ color }}
                      >
                        Читать далее <ArrowRight size={13} />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </>
  )
}
