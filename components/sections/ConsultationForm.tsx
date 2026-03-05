'use client'

import { motion } from 'framer-motion'
import { LeadForm } from '@/components/ui/LeadForm'

export function ConsultationForm() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Фоновые элементы */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative">
        <div className="max-w-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <span className="text-[13px] font-semibold text-accent uppercase tracking-widest">Связаться</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Получить <span className="text-gradient">консультацию</span>
            </h2>
            <p className="mt-4 text-gray-400 text-[16px]">
              Оставьте заявку — мы свяжемся в Telegram и подберём решение
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="glass-card p-7 sm:p-8">
              <LeadForm source="homepage-consultation" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
