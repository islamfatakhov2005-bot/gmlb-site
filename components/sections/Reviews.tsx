'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'

interface Review {
  id: string
  name: string
  role: string
  text: string
  rating?: number
  initials?: string
  color?: string
}

interface ReviewsProps {
  reviews?: Review[]
}

const DEFAULT_REVIEWS: Review[] = [
  { id: '1', name: 'Алексей М.', role: 'Реселлер Apple, Москва', text: 'Бот для мониторинга цен Apple — это просто находка. Раньше тратил полдня на обновление объявлений, теперь всё автоматически. Окупился за первый месяц.', rating: 5, initials: 'АМ', color: '#3B82F6' },
  { id: '2', name: 'Дмитрий К.', role: 'Продавец WB, Екатеринбург', text: 'Парсер конкурентов помог поднять позиции в поиске. Теперь я всегда знаю, когда конкурент снижает цену, и могу оперативно реагировать.', rating: 5, initials: 'ДК', color: '#8B5CF6' },
  { id: '3', name: 'Ирина С.', role: 'Владелец Telegram-магазина', text: 'Чат-бот для магазина сделал обслуживание клиентов 24/7. Заказы приходят даже ночью, и клиенты сразу получают подтверждение без участия менеджера.', rating: 5, initials: 'ИС', color: '#10B981' },
  { id: '4', name: 'Павел Р.', role: 'E-commerce предприниматель', text: 'Команда GMLB быстро разобралась в нашей специфике и предложила решение, которое закрыло все наши боли. Поддержка отличная — всегда на связи.', rating: 5, initials: 'ПР', color: '#F59E0B' },
  { id: '5', name: 'Наталья В.', role: 'Маркетплейс-продавец, СПб', text: 'Автоматизация аналитики сэкономила нам 20+ часов в месяц. Теперь отчёты приходят сами в Telegram каждое утро. Рекомендую всем продавцам на маркетплейсах.', rating: 5, initials: 'НВ', color: '#EC4899' },
  { id: '6', name: 'Сергей Т.', role: 'Владелец интернет-магазина', text: 'Интеграция с Ozon и WB через API — это то, что нам было нужно. Теперь остатки синхронизируются автоматически, и мы больше не получаем заказы на отсутствующий товар.', rating: 5, initials: 'СТ', color: '#06B6D4' },
]

export default function Reviews({ reviews = [] }: ReviewsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const displayReviews = reviews.length > 0 ? reviews : DEFAULT_REVIEWS

  return (
    <section id="reviews" className="grid-bg py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D' }}>
            Отзывы клиентов
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
            Что говорят наши клиенты
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <Quote size={20} className="mb-4" style={{ color: 'rgba(59,130,246,0.3)' }} />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating || 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'rgba(230,237,243,0.7)' }}>"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: `${review.color || '#22C55E'}20`, border: `1px solid ${review.color || '#22C55E'}30`, color: review.color || '#22C55E' }}
                >
                  {review.initials || review.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#E6EDF3' }}>{review.name}</div>
                  <div className="text-xs" style={{ color: 'rgba(230,237,243,0.4)' }}>{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
