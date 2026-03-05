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
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,20,14,0.96)' : 'rgba(8,20,14,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.06)'}`,
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: '9px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #22C55E, #10B981)',
                  boxShadow: '0 0 16px rgba(34,197,94,0.4)',
                  flexShrink: 0,
                }}
              >
                <Zap size={16} style={{ color: 'white' }} />
              </div>
              <span style={{ color: '#E6EDF3', fontWeight: 700, fontSize: '17px', letterSpacing: '-0.02em' }}>
                GMLB<span style={{ color: '#22C55E' }}>.</span>
              </span>
            </div>
          </Link>

          {/* Nav — desktop center */}
          <nav className="hidden md:flex items-center" style={{ gap: '4px' }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  style={{
                    padding: '7px 16px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: location === link.href ? '#22C55E' : 'rgba(230,237,243,0.65)',
                    background: location === link.href ? 'rgba(34,197,94,0.1)' : 'transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLElement
                    el.style.color = '#E6EDF3'
                    el.style.background = 'rgba(255,255,255,0.06)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLElement
                    el.style.color = location === link.href ? '#22C55E' : 'rgba(230,237,243,0.65)'
                    el.style.background = location === link.href ? 'rgba(34,197,94,0.1)' : 'transparent'
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <span
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(230,237,243,0.65)',
                  cursor: 'pointer',
                  display: 'inline-block',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#E6EDF3' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(230,237,243,0.65)' }}
              >
                Войти
              </span>
            </Link>
            <Link href="/contact">
              <button className="btn-gradient" style={{ padding: '9px 22px', fontSize: '14px' }}>
                Получить консультацию
              </button>
            </Link>
          </div>

          {/* Burger — mobile */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#E6EDF3' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: 'rgba(8,20,14,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.1)' }}
          >
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      borderRadius: '10px',
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
                <button onClick={() => setMobileOpen(false)} className="btn-gradient mt-2 w-full" style={{ fontSize: '15px' }}>
                  Получить консультацию
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
