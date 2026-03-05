'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = { TrendingUp, Clock, DollarSign, Users }

interface Metric { label: string; value: string; iconName?: string }
interface Case {
  id: string; title: string; clientType?: string; description: string
  metrics?: Metric[]; tags?: Array<{ tag: string }>; color?: string
}
interface CasesProps { cases?: Case[] }

const DEFAULT_CASES: Case[] = [
  {
    id: '1', clientType: 'Реселлер Apple', title: 'Автоматизация ресейла iPhone',
    description: 'Владелец Telegram-магазина по продаже iPhone тратил 4–5 часов в день на мониторинг цен и обновление объявлений. После внедрения бота — 15 минут.',
    metrics: [
      { iconName: 'Clock', label: 'Экономия времени', value: '4+ ч/день' },
      { iconName: 'TrendingUp', label: 'Рост продаж', value: '+35%' },
      { iconName: 'DollarSign', label: 'ROI за 3 месяца', value: '+180%' },
    ],
    tags: [{ tag: 'Telegram-бот' }, { tag: 'Ресейл' }], color: '#22C55E',
  },
  {
    id: '2', clientType: 'Маркетплейс-продавец', title: 'Парсинг конкурентов на Wildberries',
    description: 'Продавец на WB не успевал следить за ценами конкурентов. Автоматический парсер собирает данные каждые 2 часа и присылает отчёт в Telegram.',
    metrics: [
      { iconName: 'Users', label: 'Конкурентов под контролем', value: '50+' },
      { iconName: 'TrendingUp', label: 'Рост позиций', value: 'ТОП-10' },
      { iconName: 'Clock', label: 'Обновление данных', value: 'каждые 2ч' },
    ],
    tags: [{ tag: 'Парсер' }, { tag: 'WB' }], color: '#8B5CF6',
  },
  {
    id: '3', clientType: 'Telegram-магазин', title: 'Чат-бот для продажи электроники',
    description: 'Магазин электроники в Telegram перевёл обработку заказов на бота. Теперь клиент сам выбирает товар, оплачивает и получает подтверждение без участия менеджера.',
    metrics: [
      { iconName: 'DollarSign', label: 'Средний чек', value: '+22%' },
      { iconName: 'Clock', label: 'Время обработки', value: '< 1 мин' },
      { iconName: 'Users', label: 'Заказов в месяц', value: '200+' },
    ],
    tags: [{ tag: 'Чат-бот' }, { tag: 'E-commerce' }], color: '#10B981',
  },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

function makeCardVariants(xDir: number) {
  return {
    hidden: { opacity: 0, x: xDir, scale: 0.88 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
  }
}

export default function Cases({ cases = DEFAULT_CASES }: CasesProps) {
  const displayCases = cases.length > 0 ? cases : DEFAULT_CASES

  return (
    <section id="cases" className="grid-bg py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34D399' }}>
            Кейсы клиентов
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
            Реальные результаты
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgba(230,237,243,0.55)' }}>
            Как наши продукты помогают бизнесу расти и экономить время
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {displayCases.map((c, i) => {
            const color = c.color || '#22C55E'
            return (
              <motion.div
                key={c.id}
                variants={makeCardVariants(i % 2 === 0 ? -50 : 50)}
                className="glass-card p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}>
                    {c.clientType}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-snug" style={{ color: '#E6EDF3' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'rgba(230,237,243,0.55)' }}>{c.description}</p>
                {c.metrics && c.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {c.metrics.map((m, j) => {
                      const IconComp = ICON_MAP[m.iconName || 'TrendingUp'] || TrendingUp
                      return (
                        <div key={j} className="rounded-xl p-3 text-center" style={{ background: `${color}08`, border: `1px solid ${color}15` }}>
                          <IconComp size={14} style={{ color, margin: '0 auto 4px' }} />
                          <div className="text-sm font-bold leading-none mb-1" style={{ color }}>{m.value}</div>
                          <div className="text-xs leading-tight" style={{ color: 'rgba(230,237,243,0.4)' }}>{m.label}</div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
