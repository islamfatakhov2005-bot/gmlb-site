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
        background: scrolled ? 'rgba(8, 20, 12, 0.95)' : 'rgba(8, 20, 12, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(34,197,94,0.08)',
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)', boxShadow: '0 0 16px rgba(34,197,94,0.4)' }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: '#E6EDF3' }}>
                GMLB<span style={{ color: '#22C55E' }}>.</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  style={{
                    color: location === link.href ? '#22C55E' : 'rgba(230,237,243,0.7)',
                    background: location === link.href ? 'rgba(34,197,94,0.08)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.target as HTMLElement
                    el.style.color = '#E6EDF3'
                    el.style.background = 'rgba(34,197,94,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.target as HTMLElement
                    el.style.color = location === link.href ? '#22C55E' : 'rgba(230,237,243,0.7)'
                    el.style.background = location === link.href ? 'rgba(34,197,94,0.08)' : 'transparent'
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <button className="btn-gradient text-sm" style={{ padding: '9px 20px' }}>
                Получить консультацию
              </button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#E6EDF3' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: 'rgba(8, 20, 12, 0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(34,197,94,0.1)' }}
          >
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer"
                    style={{ color: location === link.href ? '#22C55E' : 'rgba(230,237,243,0.8)' }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <button onClick={() => setMobileOpen(false)} className="btn-gradient mt-2 text-sm w-full">
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
