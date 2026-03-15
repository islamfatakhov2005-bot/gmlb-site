'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { renderGreen } from '@/lib/renderGreen'

interface AboutProps {
  heading?: string
  description?: string
  points?: Array<{ text: string }>
  imageUrl?: string
  statValue?: string
  statLabel?: string
  ctaText?: string
}

const DEFAULT_POINTS = [
  { text: 'Автоматизируем рутинные бизнес-процессы' },
  { text: 'Интегрируемся с Telegram, маркетплейсами и CRM' },
  { text: 'Разрабатываем под конкретные задачи бизнеса' },
  { text: 'Поддержка и сопровождение после запуска' },
]

export default function About({
  heading = 'Мы делаем автоматизацию **доступной** для малого бизнеса',
  description = 'GMLB — команда разработчиков, специализирующихся на автоматизации бизнес-процессов для малого бизнеса и e-commerce. Мы создаём инструменты, которые раньше были доступны только крупным компаниям.',
  points = DEFAULT_POINTS,
  imageUrl,
  statValue = '50+',
  statLabel = 'продуктов к концу года',
  ctaText = 'Обсудить проект',
}: AboutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // Counter animation for statValue
  const sv = statValue ?? '50+'
  const statMatch = sv.match(/^(\d+)(.*)$/)
  const statTarget = statMatch ? parseInt(statMatch[1]) : 0
  const statSuffix = statMatch ? statMatch[2] : ''
  const isStatStatic = !statMatch
  const [statCount, setStatCount] = useState(0)

  useEffect(() => {
    if (!isInView || isStatStatic) return
    const duration = 1400
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setStatCount(Math.floor(eased * statTarget))
      if (progress < 1) requestAnimationFrame(animate)
      else setStatCount(statTarget)
    }
    requestAnimationFrame(animate)
  }, [isInView, isStatStatic, statTarget])

  return (
    <section id="about" className="grid-bg py-24 relative">
      <div className="container mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>
              {renderGreen(heading)}
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(15,23,42,0.6)' }}>{description}</p>

            <ul className="space-y-3 mb-8">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: 'rgba(15,23,42,0.75)' }}
                >
                  <CheckCircle2 size={17} style={{ color: '#22C55E', flexShrink: 0 }} />
                  {point.text}
                </motion.li>
              ))}
            </ul>

            <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-gradient">
              {ctaText}
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div
              className="rounded-2xl overflow-hidden animate-float"
              style={{ border: '1px solid rgba(34,197,94,0.15)', boxShadow: '0 0 60px rgba(34,197,94,0.1), 0 20px 60px rgba(0,0,0,0.06)' }}
            >
              {imageUrl ? (
                <Image src={imageUrl} alt="GMLB Automation" width={600} height={400} className="w-full h-auto" style={{ display: 'block' }} />
              ) : (
                <div className="w-full h-64 flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.05)' }}>
                  <div className="text-center">
                    <div className="text-6xl font-extrabold gradient-text mb-2">GMLB</div>
                    <div className="text-sm" style={{ color: 'rgba(15,23,42,0.45)' }}>Автоматизация бизнеса</div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(34,197,94,0.25)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
            >
              <div className="text-xl font-bold" style={{ color: '#22C55E' }}>
                {isStatStatic ? statValue : `${statCount}${statSuffix}`}
              </div>
              <div className="text-xs" style={{ color: 'rgba(15,23,42,0.55)' }}>{statLabel}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
