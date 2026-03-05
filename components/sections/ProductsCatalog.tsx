'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Search, Bot, Brain, MessageSquare, RefreshCw, BarChart2, Layers, ShoppingCart, TrendingUp, Zap, X } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Search, Brain, MessageSquare, RefreshCw, BarChart2, Layers, ShoppingCart, TrendingUp, Zap,
}

interface Product {
  id: string
  title: string
  slug: string
  shortDescription: string
  tags?: Array<{ tag: string }>
  priceFrom?: number
  coverImage?: { url?: string; alt?: string } | null
  featured?: boolean
  iconName?: string
  color?: string
}

export default function ProductsCatalog({ products }: { products: Product[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = Array.from(new Set(products.flatMap(p => (p.tags || []).map(t => t.tag))))

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase())
    const matchesTag = !selectedTag || (p.tags || []).some(t => t.tag === selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div style={{ background: '#081410' }}>
      {/* Hero header */}
      <section className="grid-bg py-16">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
              Каталог продуктов
            </h1>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'rgba(230,237,243,0.55)' }}>
              Готовые решения для автоматизации вашего бизнеса
            </p>
          </motion.div>

          {/* Search + filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-2xl mx-auto mb-8">
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(230,237,243,0.3)' }} />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark w-full"
                style={{ paddingLeft: '40px' }}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(230,237,243,0.4)' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: selectedTag === null ? 'linear-gradient(135deg, #22C55E, #10B981)' : 'rgba(255,255,255,0.05)',
                    color: selectedTag === null ? 'white' : 'rgba(230,237,243,0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  Все
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: selectedTag === tag ? 'linear-gradient(135deg, #22C55E, #10B981)' : 'rgba(255,255,255,0.05)',
                      color: selectedTag === tag ? 'white' : 'rgba(230,237,243,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid-bg py-12">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: 'rgba(230,237,243,0.5)' }}>Продукты не найдены</p>
            </div>
          ) : (
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((product, i) => {
                const IconComp = ICON_MAP[product.iconName || 'Bot'] || Bot
                const color = product.color || '#22C55E'
                const tags = (product.tags || []).map(t => t.tag)
                const imageUrl = product.coverImage?.url
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="glass-card h-full flex flex-col cursor-pointer overflow-hidden" style={{ minHeight: '340px' }}>
                        <div className="relative overflow-hidden" style={{ height: imageUrl ? '180px' : '120px', background: imageUrl ? 'transparent' : `linear-gradient(135deg, ${color}15, ${color}05)`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.coverImage?.alt || product.title} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                                <IconComp size={26} style={{ color }} />
                              </div>
                            </div>
                          )}
                          {product.featured && (
                            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)', color: 'white' }}>
                              Популярный
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {tags.map((tag) => <span key={tag} className="tag-badge" style={{ fontSize: '11px' }}>{tag}</span>)}
                          </div>
                          <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: '#E6EDF3' }}>{product.title}</h3>
                          <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'rgba(230,237,243,0.55)' }}>{product.shortDescription}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <div>
                              {product.priceFrom ? (
                                <><span className="text-xs" style={{ color: 'rgba(230,237,243,0.4)' }}>от </span><span className="text-sm font-bold" style={{ color: '#22C55E' }}>{product.priceFrom.toLocaleString('ru-RU')} ₽</span></>
                              ) : null}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#22C55E' }}>
                              Подробнее <ArrowRight size={13} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
