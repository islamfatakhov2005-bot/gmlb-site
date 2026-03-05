/*
  GMLB Automation — Advantages Page
  Design: Full advantages showcase with detailed descriptions
*/
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, HeadphonesIcon, Code2, TrendingUp, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const advantages = [
  {
    icon: Zap,
    title: "Быстрый запуск",
    description: "Готовые решения запускаются за 3–7 дней. Никаких месяцев разработки с нуля.",
    fullDescription: "Мы используем проверенные шаблоны и готовые компоненты, которые адаптируются под вашу задачу. Это позволяет сократить время разработки с месяцев до дней.",
    color: "#F59E0B",
    benefits: [
      "Быстрое внедрение",
      "Минимум задержек",
      "Готовые интеграции",
      "Тестирование включено",
    ],
  },
  {
    icon: Code2,
    title: "Индивидуальная разработка",
    description: "Каждый продукт адаптируется под ваши бизнес-процессы и интегрируется с вашими системами.",
    fullDescription: "Мы не просто продаём готовый код — мы разрабатываем решение, которое идеально подходит вашему бизнесу. Каждый проект уникален и требует индивидуального подхода.",
    color: "#22C55E",
    benefits: [
      "Кастомизация под ваши нужды",
      "Интеграция с существующими системами",
      "Гибкая архитектура",
      "Возможность расширения",
    ],
  },
  {
    icon: TrendingUp,
    title: "Измеримый результат",
    description: "Чёткие KPI и метрики эффективности. Вы видите, сколько времени и денег экономит автоматизация.",
    fullDescription: "Мы отслеживаем все метрики и предоставляем подробные отчёты о работе системы. Вы всегда знаете ROI вашей инвестиции.",
    color: "#10B981",
    benefits: [
      "Детальная аналитика",
      "Еженедельные отчёты",
      "Расчёт ROI",
      "Оптимизация процессов",
    ],
  },
  {
    icon: Shield,
    title: "Надёжность и безопасность",
    description: "Ваши данные защищены. Системы работают 24/7 с мониторингом и автоматическим восстановлением.",
    fullDescription: "Мы используем лучшие практики безопасности и надёжности. Все системы резервируются, мониторятся и имеют автоматическое восстановление при сбоях.",
    color: "#8B5CF6",
    benefits: [
      "Шифрование данных",
      "Резервные копии",
      "Мониторинг 24/7",
      "SLA гарантии",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка после запуска",
    description: "Техническая поддержка, обновления и доработки включены в стоимость обслуживания.",
    fullDescription: "После запуска мы не исчезаем. Наша команда всегда на связи для поддержки, обновлений и доработок. Вы получаете полное сопровождение.",
    color: "#06B6D4",
    benefits: [
      "Техническая поддержка",
      "Регулярные обновления",
      "Доработки и улучшения",
      "Консультации",
    ],
  },
  {
    icon: Clock,
    title: "Экономия времени",
    description: "Автоматизация рутинных задач освобождает до 80% рабочего времени ваших сотрудников.",
    fullDescription: "Вместо того чтобы тратить часы на рутину, ваша команда может сосредоточиться на стратегических задачах и развитии бизнеса.",
    color: "#EC4899",
    benefits: [
      "Освобождение времени",
      "Фокус на развитие",
      "Снижение ошибок",
      "Повышение производительности",
    ],
  },
];

export default function AdvantagesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main className="pt-20" style={{backgroundColor: '#081410'}}>
        {/* Hero */}
        <section
          className="grid-bg py-16 relative overflow-hidden"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#E6EDF3",
                  letterSpacing: "-0.02em",
                }}
              >
                Наши преимущества
              </h1>
              <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(230,237,243,0.55)" }}>
                Почему выбирают GMLB для автоматизации своего бизнеса
              </p>
            </motion.div>
          </div>
        </section>

        {/* Advantages */}
        <section className="grid-bg py-16">
          <div className="container mx-auto">
            <div ref={ref} className="space-y-8">
              {advantages.map((adv, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="glass-card p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Icon and title */}
                    <div className="lg:col-span-1">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                          background: `${adv.color}15`,
                          border: `1px solid ${adv.color}25`,
                        }}
                      >
                        <adv.icon size={24} style={{ color: adv.color }} />
                      </div>
                      <h3
                        className="text-xl font-bold"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          color: "#E6EDF3",
                        }}
                      >
                        {adv.title}
                      </h3>
                    </div>

                    {/* Middle: Description */}
                    <div className="lg:col-span-1">
                      <p className="text-base leading-relaxed mb-4" style={{ color: "rgba(230,237,243,0.65)" }}>
                        {adv.fullDescription}
                      </p>
                    </div>

                    {/* Right: Benefits */}
                    <div className="lg:col-span-1">
                      <div className="space-y-2">
                        {adv.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: adv.color }}
                            />
                            <span className="text-sm" style={{ color: "rgba(230,237,243,0.7)" }}>
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
