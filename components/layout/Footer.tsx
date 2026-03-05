'use client'

import Link from 'next/link'
import { Zap, Send, Mail, Phone } from 'lucide-react'

interface FooterProps {
  telegram?: string
  email?: string
  phone?: string
}

export default function Footer({ telegram = 'gmlb_automation', email = 'info@gmlb.ru', phone = '+7 (XXX) XXX-XX-XX' }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="grid-bg" style={{ background: '#081410', borderTop: '1px solid rgba(34, 197, 94, 0.15)' }}>
      <div className="container mx-auto py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #22C55E, #10B981)', boxShadow: '0 0 16px rgba(34,197,94,0.4)' }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold" style={{ color: '#E6EDF3' }}>
                GMLB<span style={{ color: '#22C55E' }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(230,237,243,0.5)' }}>
              Автоматизация бизнеса для малого бизнеса и e-commerce. Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов.
            </p>
            <a
              href={`https://t.me/${telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.2)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.1)' }}
            >
              <Send size={15} />
            </a>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#E6EDF3' }}>Продукты</h4>
            <ul className="space-y-2.5">
              {['Telegram-бот для ресейла', 'Парсер маркетплейсов', 'RAG-ассистент', 'Чат-бот для магазина', 'Автоматизация заказов'].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(230,237,243,0.5)' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#22C55E' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(230,237,243,0.5)' }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: '#E6EDF3' }}>Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(230,237,243,0.5)' }}>
                <Send size={14} style={{ color: '#22C55E', flexShrink: 0 }} />
                <a
                  href={`https://t.me/${telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(230,237,243,0.5)' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#22C55E' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(230,237,243,0.5)' }}
                >
                  @{telegram}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(230,237,243,0.5)' }}>
                <Mail size={14} style={{ color: '#22C55E', flexShrink: 0 }} />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(230,237,243,0.5)' }}>
                <Phone size={14} style={{ color: '#22C55E', flexShrink: 0 }} />
                <span>{phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(34,197,94,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(230,237,243,0.3)' }}>
            © {year} GMLB Automation. Все права защищены.
          </p>
          <p className="text-xs" style={{ color: 'rgba(230,237,243,0.3)' }}>Россия и СНГ</p>
        </div>
      </div>
    </footer>
  )
}
