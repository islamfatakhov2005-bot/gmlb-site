'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, CheckCircle2, Phone, MessageSquare, User, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface ContactProps {
  telegram?: string
}

export default function Contact({ telegram = 'gmlb_automation' }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', phone: '', telegram: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Введите ваше имя'
    if (!form.phone.trim()) e.phone = 'Введите номер телефона'
    else if (!/^[\+\d\s\-\(\)]{7,}$/.test(form.phone)) e.phone = 'Некорректный формат телефона'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, telegram: form.telegram, message: form.message, source: 'contact-page' }),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Ошибка отправки. Попробуйте ещё раз.')
      }
    } catch {
      toast.error('Ошибка соединения. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="grid-bg py-24 relative overflow-hidden">
      <div className="container mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
              Связаться с нами
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight" style={{ color: '#E6EDF3', letterSpacing: '-0.02em' }}>
              Готовы автоматизировать{' '}
              <span className="gradient-text">ваш бизнес?</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(230,237,243,0.6)' }}>
              Оставьте заявку и мы свяжемся с вами в течение 2 часов. Обсудим ваши задачи и предложим оптимальное решение.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: MessageSquare, text: 'Ответим в Telegram за 15 минут', color: '#22C55E' },
                { icon: Phone, text: 'Бесплатная консультация 30 минут', color: '#10B981' },
                { icon: CheckCircle2, text: 'Без обязательств и скрытых платежей', color: '#8B5CF6' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(230,237,243,0.7)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <a href={`https://t.me/${telegram}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-outline-blue">
              <Send size={16} />
              Написать в Telegram
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <CheckCircle2 size={32} style={{ color: '#34D399' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#E6EDF3' }}>Заявка отправлена!</h3>
                  <p className="text-sm" style={{ color: 'rgba(230,237,243,0.55)' }}>Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold mb-5" style={{ color: '#E6EDF3' }}>Оставить заявку</h3>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(230,237,243,0.6)' }}>Имя *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(230,237,243,0.3)' }} />
                      <input type="text" placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-dark" style={{ paddingLeft: '38px' }} />
                    </div>
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(230,237,243,0.6)' }}>Телефон *</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(230,237,243,0.3)' }} />
                      <input type="tel" placeholder="+7 (999) 000-00-00" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-dark" style={{ paddingLeft: '38px' }} />
                    </div>
                    {errors.phone && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(230,237,243,0.6)' }}>Telegram (необязательно)</label>
                    <div className="relative">
                      <Send size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(230,237,243,0.3)' }} />
                      <input type="text" placeholder="@username" value={form.telegram} onChange={(e) => setForm({ ...form, telegram: e.target.value })} className="input-dark" style={{ paddingLeft: '38px' }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(230,237,243,0.6)' }}>Сообщение (необязательно)</label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3 top-3.5" style={{ color: 'rgba(230,237,243,0.3)' }} />
                      <textarea placeholder="Опишите вашу задачу..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-dark resize-none" rows={3} style={{ paddingLeft: '38px' }} />
                    </div>
                  </div>
                  <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} />
                  <button type="submit" disabled={loading} className="btn-gradient w-full flex items-center justify-center gap-2" style={{ padding: '13px 24px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Отправляем...</>
                    ) : (
                      <>Оставить заявку <Send size={16} /></>
                    )}
                  </button>
                  <p className="text-xs text-center" style={{ color: 'rgba(230,237,243,0.3)' }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
