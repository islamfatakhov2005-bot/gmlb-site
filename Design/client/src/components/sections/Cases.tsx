/*
  GMLB Automation — Cases Section
  Design: Horizontal scrollable cards with metrics
*/
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

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
    color: "#8B5CF6",
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
    color: "#10B981",
  },
];

export default function Cases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cases"
      className="grid-bg py-24 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
              color: "#34D399",
            }}
          >
            Кейсы клиентов
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#E6EDF3",
              letterSpacing: "-0.02em",
            }}
          >
            Реальные результаты
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230,237,243,0.55)" }}
          >
            Как наши продукты помогают бизнесу расти и экономить время
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass-card p-6 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${c.color}15`,
                    border: `1px solid ${c.color}25`,
                    color: c.color,
                  }}
                >
                  {c.clientType}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-base font-bold mb-3 leading-snug"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#E6EDF3",
                }}
              >
                {c.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5 flex-1"
                style={{ color: "rgba(230,237,243,0.55)" }}
              >
                {c.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {c.metrics.map((m, j) => (
                  <div
                    key={j}
                    className="rounded-xl p-3 text-center"
                    style={{
                      background: `${c.color}08`,
                      border: `1px solid ${c.color}15`,
                    }}
                  >
                    <m.icon size={14} style={{ color: c.color, margin: "0 auto 4px" }} />
                    <div
                      className="text-sm font-bold leading-none mb-1"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
