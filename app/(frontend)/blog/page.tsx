import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'

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
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
          >
            Блог
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            Статьи об автоматизации
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Разбираем кейсы, делимся опытом и рассказываем как автоматизация помогает бизнесу расти
          </p>
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg" style={{ color: 'rgba(15,23,42,0.35)' }}>Публикации скоро появятся</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article
                  className="rounded-2xl overflow-hidden h-full transition-all duration-200"
                  style={{
                    border: '1px solid rgba(15,23,42,0.08)',
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(34,197,94,0.1)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(15,23,42,0.08)'
                  }}
                >
                  {post.coverImage?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((t: any) => (
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
                    <h2 className="text-lg font-bold mb-3 leading-snug" style={{ color: '#0F172A' }}>
                      {post.title}
                    </h2>
                    {post.publishedAt && (
                      <p className="text-xs mt-auto" style={{ color: 'rgba(15,23,42,0.38)' }}>
                        {new Date(post.publishedAt).toLocaleDateString('ru-RU', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
