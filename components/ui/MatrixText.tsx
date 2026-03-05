'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const MATRIX_CHARS = '01@#$%&*!<>?/|{}[]=+~'

interface MatrixTextProps {
  text: string
  className?: string
  delay?: number // ms before starting after entering view
}

export default function MatrixText({ text, className, delay = 300 }: MatrixTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isInView || done) return
    let intervalId: ReturnType<typeof setInterval>
    const startId = setTimeout(() => {
      let revealed = 0
      intervalId = setInterval(() => {
        const scrambled = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < revealed) return char
            if (i === revealed) return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            return ''
          })
          .join('')
        setDisplay(scrambled)
        revealed++
        if (revealed > text.length) {
          clearInterval(intervalId)
          setDisplay(text)
          setDone(true)
        }
      }, 35)
    }, delay)

    return () => {
      clearTimeout(startId)
      clearInterval(intervalId)
    }
  }, [isInView, done, text, delay])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', position: 'relative' }}>
      {/* invisible placeholder preserves layout dimensions */}
      <span style={{ visibility: 'hidden' }}>{text}</span>
      {/* animated overlay */}
      <span style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'pre' }}>
        {isInView ? display : ''}
        {!done && isInView && (
          <span
            style={{
              display: 'inline-block',
              width: '2px',
              height: '0.85em',
              background: 'currentColor',
              marginLeft: '2px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </span>
    </span>
  )
}
