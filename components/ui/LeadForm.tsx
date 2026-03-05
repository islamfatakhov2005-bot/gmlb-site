'use client'

import { useState } from 'react'
import { Button } from './Button'

interface LeadFormProps {
  productId?: string
  source?: string
  className?: string
}

export function LeadForm({ productId, source, className = '' }: LeadFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', telegram: '', message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productId,
          source: source || window.location.pathname,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      setStatus('success')
      setForm({ name: '', phone: '', telegram: '', message: '', website: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Произошла ошибка')
    }
  }

  if (status === 'success') {
    return (
      <div className={`glass-card p-8 text-center ${className}`}>
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
        <p className="text-gray-400">Мы свяжемся с вами в ближайшее время</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-accent hover:text-accent-light transition-colors"
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {/* Honeypot — скрытое поле от ботов */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <input
          type="text"
          placeholder="Ваше имя *"
          required
          minLength={2}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div>
        <input
          type="tel"
          placeholder="Телефон *"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Telegram (необязательно)"
          value={form.telegram}
          onChange={(e) => setForm({ ...form, telegram: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div>
        <textarea
          placeholder="Сообщение (необязательно)"
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Отправка...' : 'Оставить заявку'}
      </Button>
    </form>
  )
}
