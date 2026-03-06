'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, HeadphonesIcon, Code2, TrendingUp, Clock, Brain, Bot, Star, Heart } from 'lucide-react'
import MatrixText from '@/components/ui/MatrixText'

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Shield, HeadphonesIcon, Code2, TrendingUp, Clock, Brain, Bot, Star, Heart,
}

interface Advantage { id: string; title: string; description: string; iconName?: string; color?: string }
interface AdvantagesProps { advantages?: Advantage[] }

const DEFAULT_ADVANTAGES: Advantage[] = [
  { id: '1', iconName: 'Zap', title: 'Быстрый запуск', description: 'Готовые решения запускаются за 3–7 дней. Никаких месяцев разработки с нуля.', color: '#F59E0B' },
  { id: '2', iconName: 'Code2', title: 'Индивидуальная разработка', description: 'Каждый продукт адаптируется под ваши бизнес-процессы и интегрируется с вашими системами.', color: '#22C55E' },
  { id: '3', iconName: 'TrendingUp', title: 'Измеримый результат', description: 'Чёткие KPI и метрики эффективности. Вы видите, сколько времени и денег экономит автоматизация.', color: '#10B981' },
  { id: '4', iconName: 'Shield', title: 'Надёжность и безопасность', description: 'Ваши данные защищены. Системы работают 24/7 с мониторингом и автоматическим восстановлением.', color: '#8B5CF6' },
  { id: '5', iconName: 'HeadphonesIcon', title: 'Поддержка после запуска', description: 'Техническая поддержка, обновления и доработки включены в стоимость обслуживания.', color: '#06B6D4' },
  { id: '6', iconName: 'Clock', title: 'Экономия времени', description: 'Автоматизация рутинных задач освобождает до 80% рабочего времени ваших сотрудников.', color: '#EC4899' },
] as any

export default function Advantages({ advantages = [] }: AdvantagesProps) {
  const displayAdvantages = advantages.length > 0 ? advantages : DEFAULT_ADVANTAGES
  // Double items for seamless infinite loop
  const doubled = [...displayAdvantages, ...displayAdvantages]

  const containerRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const pausedRef = useRef(false)
  const timeRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId: number
    let lastTime: number | null = null

    const animate = (ts: number) => {
      if (lastTime !== null && !pausedRef.current) {
        const delta = Math.min(ts - lastTime, 50)
        timeRef.current += delta

        // Sinusoidal speed: slow → fast → slow, period ~12.6s
        const BASE = 0.055 // px/ms
        const speed = BASE * (0.4 + 0.6 * Math.abs(Math.sin(timeRef.current / 4000)))
        posRef.current += speed * delta

        // Seamless loop: jump back when past the first half (original items)
        const half = container.scrollWidth / 2
        if (posRef.current >= half) posRef.current -= half

        container.scrollLeft = posRef.current
      }
      lastTime = ts
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handlePauseOn = () => { pausedRef.current = true }
  const handlePauseOff = () => {
    if (containerRef.current) posRef.current = containerRef.current.scrollLeft
    pausedRef.current = false
  }

  return (
    <section id="advantages" className="grid-bg py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
            Почему GMLB
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
            <MatrixText text="Наши преимущества" />
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgba(15,23,42,0.55)' }}>
            Мы не просто пишем код — мы решаем бизнес-задачи
          </p>
        </motion.div>

        {/* Auto-scroll carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            ref={containerRef}
            className="flex gap-5 pb-3"
            style={{
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
              userSelect: 'none',
            }}
            onMouseEnter={handlePauseOn}
            onMouseLeave={handlePauseOff}
            onTouchStart={handlePauseOn}
            onTouchEnd={handlePauseOff}
          >
            {doubled.map((adv: any, i: number) => {
              const color = adv.color || '#22C55E'
              const iconName = adv.iconName || (adv as any).icon || 'Zap'
              const IconComp = ICON_MAP[iconName] || Zap
              return (
                <div
                  key={`${adv.id || i}-${i}`}
                  className="glass-card p-6 flex-shrink-0"
                  style={{ minWidth: 'min(300px, 78vw)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <IconComp size={20} style={{ color }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: '#0F172A' }}>{adv.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(15,23,42,0.55)' }}>{adv.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
