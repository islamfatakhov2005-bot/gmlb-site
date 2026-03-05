'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Bot, TrendingUp, Zap } from 'lucide-react'

interface HeroProps {
  badgeText?: string
  heading?: string
  headingHighlight?: string
  headingEnd?: string
  subheading?: string
  stat1Value?: string
  stat1Label?: string
  stat2Value?: string
  stat2Label?: string
  stat3Value?: string
  stat3Label?: string
}

export default function Hero({
  badgeText = '✦ Автоматизация бизнеса нового поколения',
  heading = 'Автоматизируйте',
  headingHighlight = 'бизнес-процессы',
  headingEnd = 'с помощью умных ботов',
  subheading = 'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Профессиональные инструменты для малого бизнеса и e-commerce в России и СНГ.',
  stat1Value = '50+',
  stat1Label = 'Продуктов',
  stat2Value = '10+',
  stat2Label = 'Лидов в месяц',
  stat3Value = '24/7',
  stat3Label = 'Автоматизация',
}: HeroProps) {
  const stats = [
    { icon: Bot, value: stat1Value, label: stat1Label },
    { icon: TrendingUp, value: stat2Value, label: stat2Label },
    { icon: Zap, value: stat3Value, label: stat3Label },
  ]

  const scrollToProducts = () => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="grid-bg relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-blob" style={{ background: 'rgba(34,197,94,0.12)', filter: 'blur(60px)', zIndex: 2 }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full animate-blob animation-delay-2000" style={{ background: 'rgba(16,185,129,0.1)', filter: 'blur(60px)', zIndex: 2 }} />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full animate-blob animation-delay-4000" style={{ background: 'rgba(52,211,153,0.08)', filter: 'blur(50px)', zIndex: 2 }} />

      <div className="relative z-10 container mx-auto text-center px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-6 md:mb-8">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E' }}>
            {badgeText}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 md:mb-6"
          style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}
        >
          {heading}{' '}
          <span className="gradient-text">{headingHighlight}</span>
          <br />
          {headingEnd}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-2"
          style={{ color: 'rgba(230,237,243,0.6)' }}
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-16 w-full px-2"
        >
          <button onClick={scrollToContact} className="btn-gradient flex items-center gap-2 text-sm md:text-base w-full sm:w-auto" style={{ padding: '12px 24px' }}>
            Получить консультацию
            <ArrowRight size={18} />
          </button>
          <button onClick={scrollToProducts} className="btn-outline-green flex items-center gap-2 text-sm md:text-base w-full sm:w-auto" style={{ padding: '12px 24px' }}>
            Смотреть продукты
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 w-full px-2"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-lg md:rounded-xl w-full sm:w-auto justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                <stat.icon size={16} style={{ color: '#22C55E' }} />
              </div>
              <div className="text-left">
                <div className="text-lg md:text-xl font-bold leading-none" style={{ color: '#E6EDF3' }}>{stat.value}</div>
                <div className="text-xs mt-0.5 whitespace-nowrap" style={{ color: 'rgba(230,237,243,0.5)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={scrollToProducts}
      >
        <span className="text-xs" style={{ color: 'rgba(230,237,243,0.3)' }}>Прокрутите вниз</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} style={{ color: 'rgba(230,237,243,0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
