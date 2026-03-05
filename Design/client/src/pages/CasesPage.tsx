/*
  GMLB Automation — Cases Page
  Design: Full cases showcase with detailed metrics
*/
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cases = [
  {
    clientType: "Реселлер Apple",
    title: "Автоматизация ресейла iPhone",
    description: "Владелец Telegram-магазина по продаже iPhone тратил 4–5 часов в день на мониторинг цен и обновление объявлений. После внедрения бота — 15 минут.",
    metrics: [
      { icon: Clock, label: "Экономия времени", value: "4+ ч/день" },
      { icon: TrendingUp, label: "Рост продаж", value: "+35%" },
      { icon: DollarSign, label: "ROI за 3 месяца", value: "+180%" },
    ],
    tags: ["Telegram-бот", "Ресейл"],
    color: "#22C55E",
  },
  {
    clientType: "Маркетплейс-продавец",
    title: "Парсинг конкурентов на Wildberries",
    description: "Продавец на WB не успевал следить за ценами конкурентов. Автоматический парсер собирает данные каждые 2 часа и присылает отчёт в Telegram.",
    metrics: [
      { icon: Users, label: "Конкурентов под контролем", value: "50+" },
      { icon: TrendingUp, label: "Рост позиций", value: "ТОП-10" },
      { icon: Clock, label: "Обновление данных", value: "каждые 2ч" },
    ],
    tags: ["Парсер", "WB"],
    color: "#10B981",
  },
  {
    clientType: "Telegram-магазин",
    title: "Чат-бот для продажи электроники",
    description: "Магазин электроники в Telegram перевёл обработку заказов на бота. Теперь клиент сам выбирает товар, оплачивает и получает подтверждение без участия менеджера.",
    metrics: [
      { icon: DollarSign, label: "Средний чек", value: "+22%" },
      { icon: Clock, label: "Время обработки", value: "< 1 мин" },
      { icon: Users, label: "Заказов в месяц", value: "200+" },
    ],
    tags: ["Чат-бот", "E-commerce"],
    color: "#34D399",
  },
  {
    clientType: "E-commerce предприниматель",
    title: "Синхронизация остатков на маркетплейсах",
    description: "Продавец на нескольких маркетплейсах постоянно получал заказы на отсутствующий товар. Автоматическая синхронизация остатков решила проблему.",
    metrics: [
      { icon: Users, label: "Маркетплейсов", value: "3" },
      { icon: TrendingUp, label: "Снижение отказов", value: "-85%" },
      { icon: Clock, label: "Синхронизация", value: "реалтайм" },
    ],
    tags: ["Интеграция", "E-commerce"],
    color: "#6EE7B7",
  },
];

export default function CasesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main className="pt-20" style={{backgroundColor: '#08150d'}}>
        {/* Hero */}
        <section
          className="grid-bg py-16 relative overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
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
                Кейсы клиентов
              </h1>
              <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(230,237,243,0.55)" }}>
                Реальные результаты и истории успеха наших клиентов
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cases */}
        <section className="grid-bg py-16">
          <div className="container mx-auto">
            <div ref={ref} className="space-y-8">
              {cases.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Info */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            background: `${c.color}15`,
                            border: `1px solid ${c.color}25`,
                            color: c.color,
                          }}
                        >
                          {c.clientType}
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-bold mb-3 leading-snug"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          color: "#E6EDF3",
                        }}
                      >
                        {c.title}
                      </h3>
                      <p
                        className="text-base leading-relaxed mb-6"
                        style={{ color: "rgba(230,237,243,0.65)" }}
                      >
                        {c.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {c.tags.map(tag => (
                          <span key={tag} className="tag-badge">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Metrics */}
                    <div className="lg:col-span-1">
                      <div className="grid grid-cols-1 gap-3">
                        {c.metrics.map((m, j) => (
                          <div
                            key={j}
                            className="rounded-xl p-4 text-center"
                            style={{
                              background: `${c.color}08`,
                              border: `1px solid ${c.color}15`,
                            }}
                          >
                            <m.icon size={18} style={{ color: c.color, margin: "0 auto 6px" }} />
                            <div
                              className="text-lg font-bold leading-none mb-1"
                              style={{ color: c.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {m.value}
                            </div>
                            <div className="text-xs leading-tight" style={{ color: "rgba(230,237,243,0.4)" }}>
                              {m.label}
                            </div>
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
