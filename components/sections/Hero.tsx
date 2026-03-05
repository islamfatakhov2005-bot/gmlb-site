'use client'

import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const MATRIX_CHARS = '01@#$%&*!<>?/|{}[]=+~01100101011011000110'

const CYCLING_WORDS = [
  'Telegram-боты',
  'парсеры данных',
  'RAG-решения',
  'маркетплейс-боты',
  'AI-агенты',
  'нейросети',
  'умная автоматизация',
]

function MatrixWord() {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'reveal' | 'hold' | 'erase'>('reveal')

  useEffect(() => {
    const targetWord = CYCLING_WORDS[wordIndex]
    let timerId: ReturnType<typeof setInterval> | ReturnType<typeof setTimeout>

    if (phase === 'reveal') {
      let revealed = 0
      timerId = setInterval(() => {
        // typewriter: correct chars typed so far + scramble cursor + nothing after
        const display = targetWord
          .split('')
          .map((char, i) => {
            if (i < revealed) return char === ' ' ? ' ' : char
            if (i === revealed) return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            return ''
          })
          .join('')
        setDisplayText(display)
        revealed++
        if (revealed > targetWord.length) {
          clearInterval(timerId as ReturnType<typeof setInterval>)
          setDisplayText(targetWord)
          setPhase('hold')
        }
      }, 75)
    } else if (phase === 'hold') {
      timerId = setTimeout(() => setPhase('erase'), 2200)
    } else if (phase === 'erase') {
      let remaining = targetWord.length
      timerId = setInterval(() => {
        remaining--
        setDisplayText(targetWord.slice(0, Math.max(0, remaining)))
        if (remaining <= 0) {
          clearInterval(timerId as ReturnType<typeof setInterval>)
          setDisplayText('')
          setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length)
          setPhase('reveal')
        }
      }, 50)
    }

    return () => {
      clearInterval(timerId as ReturnType<typeof setInterval>)
      clearTimeout(timerId as ReturnType<typeof setTimeout>)
    }
  }, [phase, wordIndex])

  return (
    <span
      className="font-mono"
      style={{
        color: '#22C55E',
        textShadow: '0 0 20px rgba(34,197,94,0.5)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.8em',
          background: '#22C55E',
          marginLeft: '3px',
          verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  )
}

interface HeroProps {
  badgeText?: string
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
  subheading = 'Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов. Профессиональные инструменты для малого бизнеса и e-commerce в России и СНГ.',
  stat1Value = '50+',
  stat1Label = 'Продуктов',
  stat2Value = '10+',
  stat2Label = 'Лидов в месяц',
  stat3Value = '24/7',
  stat3Label = 'Автоматизация',
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const blurAmount = useTransform(scrollYProgress, [0, 0.8], [0, 14])
  const filterStyle = useMotionTemplate`blur(${blurAmount}px)`

  const stats = [
    { value: stat1Value, label: stat1Label },
    { value: stat2Value, label: stat2Label },
    { value: stat3Value, label: stat3Label },
  ]

  const scrollToProducts = () => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.section
      ref={heroRef}
      className="grid-bg relative min-h-screen flex flex-col items-start justify-center overflow-hidden"
      style={{ scale: heroScale, opacity: heroOpacity, filter: filterStyle, background: '#081410' }}
    >
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full animate-blob" style={{ background: 'rgba(34,197,94,0.12)', filter: 'blur(60px)', zIndex: 2 }} />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full animate-blob animation-delay-2000" style={{ background: 'rgba(16,185,129,0.1)', filter: 'blur(60px)', zIndex: 2 }} />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full animate-blob animation-delay-4000" style={{ background: 'rgba(52,211,153,0.08)', filter: 'blur(50px)', zIndex: 2 }} />

      <div className="relative z-10 container mx-auto text-left px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 md:mb-8"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E' }}>
            {badgeText}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full mb-4 md:mb-6"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}
          >
            Автоматизация бизнеса
            <br />
            <span style={{ display: 'block', minHeight: '1.2em', overflow: 'hidden' }}>
              <MatrixWord />
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-sm md:text-base lg:text-lg max-w-xl mb-6 md:mb-10 leading-relaxed"
          style={{ color: 'rgba(230,237,243,0.6)' }}
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-10 md:mb-16 w-full"
        >
          <button onClick={scrollToContact} className="btn-gradient flex items-center gap-2 text-sm md:text-base w-full sm:w-auto">
            Получить консультацию
            <ArrowRight size={18} />
          </button>
          <button onClick={scrollToProducts} className="btn-outline-green flex items-center gap-2 text-sm md:text-base w-full sm:w-auto">
            Смотреть продукты
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start gap-3 md:gap-6 w-full"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl w-full sm:w-auto"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)' }}
            >
              <div className="text-left">
                <div className="text-lg md:text-xl font-bold leading-none" style={{ color: '#22C55E' }}>{stat.value}</div>
                <div className="text-xs mt-0.5 whitespace-nowrap" style={{ color: 'rgba(230,237,243,0.5)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={scrollToProducts}
      >
        <span className="text-xs" style={{ color: 'rgba(230,237,243,0.3)' }}>Прокрутите вниз</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} style={{ color: 'rgba(230,237,243,0.3)' }} />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
