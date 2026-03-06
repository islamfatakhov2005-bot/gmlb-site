'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import MatrixText from '@/components/ui/MatrixText'
import { renderGreen } from '@/lib/renderGreen'

interface Review { id: string; name: string; role: string; text: string; rating?: number; initials?: string; color?: string }
interface ReviewsProps { reviews?: Review[]; heading?: string }

const DEFAULT_REVIEWS: Review[] = [
  { id: '1', name: 'Алексей М.', role: 'Реселлер Apple, Москва', text: 'Бот для мониторинга цен Apple — это просто находка. Раньше тратил полдня на обновление объявлений, теперь всё автоматически. Окупился за первый месяц.', rating: 5, initials: 'АМ', color: '#3B82F6' },
  { id: '2', name: 'Дмитрий К.', role: 'Продавец WB, Екатеринбург', text: 'Парсер конкурентов помог поднять позиции в поиске. Теперь я всегда знаю, когда конкурент снижает цену, и могу оперативно реагировать.', rating: 5, initials: 'ДК', color: '#8B5CF6' },
  { id: '3', name: 'Ирина С.', role: 'Владелец Telegram-магазина', text: 'Чат-бот для магазина сделал обслуживание клиентов 24/7. Заказы приходят даже ночью, и клиенты сразу получают подтверждение без участия менеджера.', rating: 5, initials: 'ИС', color: '#10B981' },
  { id: '4', name: 'Павел Р.', role: 'E-commerce предприниматель', text: 'Команда GMLB быстро разобралась в нашей специфике и предложила решение, которое закрыло все наши боли. Поддержка отличная — всегда на связи.', rating: 5, initials: 'ПР', color: '#F59E0B' },
  { id: '5', name: 'Наталья В.', role: 'Маркетплейс-продавец, СПб', text: 'Автоматизация аналитики сэкономила нам 20+ часов в месяц. Теперь отчёты приходят сами в Telegram каждое утро. Рекомендую всем продавцам на маркетплейсах.', rating: 5, initials: 'НВ', color: '#EC4899' },
  { id: '6', name: 'Сергей Т.', role: 'Владелец интернет-магазина', text: 'Интеграция с Ozon и WB через API — это то, что нам было нужно. Теперь остатки синхронизируются автоматически, и мы больше не получаем заказы на отсутствующий товар.', rating: 5, initials: 'СТ', color: '#06B6D4' },
]

export default function Reviews({ reviews = [], heading = 'Что говорят **наши клиенты**' }: ReviewsProps) {
  const displayReviews = reviews.length > 0 ? reviews : DEFAULT_REVIEWS
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' })
  }

  return (
    <section id="reviews" className="grid-bg py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex items-end justify-between gap-4"
        >
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D' }}>
              Отзывы клиентов
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
              <MatrixText text={heading.replace(/\*\*(.*?)\*\*/g, '$1')} />
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-1 flex-shrink-0 pb-5">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
              style={{ color: 'rgba(15,23,42,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(15,23,42,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15,23,42,0.3)')}
            ><ChevronLeft size={22} /></button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
              style={{ color: 'rgba(15,23,42,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(15,23,42,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(15,23,42,0.3)')}
            ><ChevronRight size={22} /></button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-5 pb-3"
            style={{
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingTop: '8px',
            }}
          >
            {displayReviews.map((review) => (
              <div
                key={review.id}
                className="glass-card p-6 flex flex-col flex-shrink-0"
                style={{ minWidth: 'min(280px, 74vw)', width: 'min(280px, 74vw)', scrollSnapAlign: 'start' }}
              >
                <Quote size={20} className="mb-4" style={{ color: 'rgba(59,130,246,0.3)' }} />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating || 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'rgba(15,23,42,0.7)' }}>"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${review.color || '#22C55E'}20`, border: `1px solid ${review.color || '#22C55E'}30`, color: review.color || '#22C55E' }}
                  >
                    {review.initials || review.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#0F172A' }}>{review.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(15,23,42,0.45)' }}>{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
