'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import MatrixText from '@/components/ui/MatrixText'
import { ArrowRight, Bot, Search, Brain, MessageSquare, RefreshCw, BarChart2, Layers, ShoppingCart, TrendingUp, Zap } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Search, Brain, MessageSquare, RefreshCw, BarChart2, Layers, ShoppingCart, TrendingUp, Zap,
}

interface Product {
  id: string; title: string; slug: string; shortDescription: string
  tags?: Array<{ tag: string }>; priceFrom?: number
  coverImage?: { url?: string; alt?: string } | null
  featured?: boolean; iconName?: string; color?: string
}
interface ProductsGridProps { products?: Product[]; showHeader?: boolean }

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.93 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function ProductCard({ product }: { product: Product }) {
  const IconComp = ICON_MAP[product.iconName || 'Bot'] || Bot
  const color = product.color || '#22C55E'
  const tags = product.tags?.map(t => t.tag) || []
  const imageUrl = product.coverImage?.url

  return (
    <motion.div variants={cardVariants}>
      <Link href={`/products/${product.slug}`}>
        <div className="glass-card h-full flex flex-col cursor-pointer overflow-hidden" style={{ minHeight: '340px' }}>
          <div
            className="relative overflow-hidden"
            style={{
              height: imageUrl ? '180px' : '120px',
              background: imageUrl ? 'transparent' : `linear-gradient(135deg, ${color}15, ${color}05)`,
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
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
              {tags.map((tag) => (
                <span key={tag} className="tag-badge" style={{ fontSize: '11px' }}>{tag}</span>
              ))}
            </div>
            <h3 className="text-base font-bold mb-2 leading-snug" style={{ color: '#0F172A' }}>{product.title}</h3>
            <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'rgba(15,23,42,0.55)' }}>{product.shortDescription}</p>
            <div className="flex items-center justify-between mt-auto">
              <div>
                {product.priceFrom ? (
                  <>
                    <span className="text-xs" style={{ color: 'rgba(15,23,42,0.4)' }}>от </span>
                    <span className="text-sm font-bold" style={{ color: '#22C55E' }}>{product.priceFrom.toLocaleString('ru-RU')} ₽</span>
                  </>
                ) : null}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#22C55E' }}>
                Подробнее
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ProductsGrid({ products = [], showHeader = true }: ProductsGridProps) {
  return (
    <section id="products" className="grid-bg py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mb-10 md:mb-14"
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
              Каталог продуктов
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-3 md:mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
              <MatrixText text="Решения для вашего бизнеса" />
            </h2>
            <p className="text-sm md:text-base max-w-xl" style={{ color: 'rgba(15,23,42,0.55)' }}>
              Готовые инструменты автоматизации, которые экономят время и увеличивают прибыль
            </p>
          </motion.div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg" style={{ color: 'rgba(15,23,42,0.5)' }}>Продукты скоро появятся</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            variants={gridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
