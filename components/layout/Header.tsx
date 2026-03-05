'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Продукты', href: '/products' },
  { label: 'Кейсы', href: '/cases' },
  { label: 'Преимущества', href: '/advantages' },
  { label: 'Отзывы', href: '/reviews' },
  { label: 'Контакты', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-3 px-4">
      {/* Floating pill — mooon.ai style */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 28px',
          borderRadius: '20px',
          background: scrolled ? 'rgba(8,20,14,0.96)' : 'rgba(8,20,14,0.75)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          border: `1px solid ${scrolled ? 'rgba(34,197,94,0.22)' : 'rgba(34,197,94,0.1)'}`,
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.55)' : '0 2px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div
              style={{
                width: 30, height: 30, borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #22C55E, #10B981)',
                boxShadow: '0 0 14px rgba(34,197,94,0.4)',
                flexShrink: 0,
              }}
            >
              <Zap size={15} style={{ color: 'white' }} />
            </div>
            <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '17px', letterSpacing: '-0.01em' }}>
              GMLB<span style={{ color: '#22C55E' }}>.</span>
            </span>
          </div>
        </Link>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center" style={{ gap: '2px' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                style={{
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: location === link.href ? '#22C55E' : 'rgba(230,237,243,0.7)',
                  background: location === link.href ? 'rgba(34,197,94,0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement
                  el.style.color = '#E6EDF3'
                  el.style.background = 'rgba(34,197,94,0.08)'
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement
                  el.style.color = location === link.href ? '#22C55E' : 'rgba(230,237,243,0.7)'
                  el.style.background = location === link.href ? 'rgba(34,197,94,0.1)' : 'transparent'
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* CTA — desktop */}
        <div className="hidden md:flex items-center">
          <Link href="/contact">
            <button className="btn-gradient" style={{ padding: '8px 18px', fontSize: '14px' }}>
              Консультация
            </button>
          </Link>
        </div>

        {/* Burger — mobile */}
        <button
          className="md:hidden"
          style={{
            color: '#E6EDF3',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '9999px',
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile dropdown card */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            style={{
              width: '100%',
              maxWidth: '1200px',
              marginTop: '8px',
              borderRadius: '16px',
              background: 'rgba(8,20,14,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(34,197,94,0.14)',
              padding: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: location === link.href ? '#22C55E' : 'rgba(230,237,243,0.8)',
                    background: location === link.href ? 'rgba(34,197,94,0.08)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <button
                onClick={() => setMobileOpen(false)}
                className="btn-gradient w-full mt-2"
                style={{ fontSize: '15px' }}
              >
                Получить консультацию
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
