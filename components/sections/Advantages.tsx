'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Shield, HeadphonesIcon, Code2, TrendingUp, Clock, Brain, Bot, Star, Heart } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Shield, HeadphonesIcon, Code2, TrendingUp, Clock, Brain, Bot, Star, Heart,
}

interface Advantage {
  id: string
  title: string
  description: string
  iconName?: string
  color?: string
}

interface AdvantagesProps {
  advantages?: Advantage[]
}

const DEFAULT_ADVANTAGES: Advantage[] = [
  { id: '1', icon: 'Zap', title: 'Быстрый запуск', description: 'Готовые решения запускаются за 3–7 дней. Никаких месяцев разработки с нуля.', color: '#F59E0B' },
  { id: '2', icon: 'Code2', title: 'Индивидуальная разработка', description: 'Каждый продукт адаптируется под ваши бизнес-процессы и интегрируется с вашими системами.', color: '#22C55E' },
  { id: '3', icon: 'TrendingUp', title: 'Измеримый результат', description: 'Чёткие KPI и метрики эффективности. Вы видите, сколько времени и денег экономит автоматизация.', color: '#10B981' },
  { id: '4', icon: 'Shield', title: 'Надёжность и безопасность', description: 'Ваши данные защищены. Системы работают 24/7 с мониторингом и автоматическим восстановлением.', color: '#8B5CF6' },
  { id: '5', icon: 'HeadphonesIcon', title: 'Поддержка после запуска', description: 'Техническая поддержка, обновления и доработки включены в стоимость обслуживания.', color: '#06B6D4' },
  { id: '6', icon: 'Clock', title: 'Экономия времени', description: 'Автоматизация рутинных задач освобождает до 80% рабочего времени ваших сотрудников.', color: '#EC4899' },
] as any

export default function Advantages({ advantages = [] }: AdvantagesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const displayAdvantages = advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES

  return (
    <section id="advantages" className="grid-bg py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
            Почему GMLB
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
            Наши преимущества
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(230,237,243,0.55)' }}>
            Мы не просто пишем код — мы решаем бизнес-задачи
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayAdvantages.map((adv: any, i: number) => {
            const color = adv.color || '#22C55E'
            const iconName = adv.iconName || (adv as any).icon || 'Zap'
            const IconComp = ICON_MAP[iconName] || Zap
            return (
              <motion.div
                key={adv.id || i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-card p-6"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <IconComp size={20} style={{ color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#E6EDF3' }}>{adv.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(230,237,243,0.55)' }}>{adv.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
