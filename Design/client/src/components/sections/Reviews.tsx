/*
  GMLB Automation — Reviews Section
  Design: Glassmorphism testimonial cards with star ratings
*/
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Алексей М.",
    role: "Реселлер Apple, Москва",
    text: "Бот для мониторинга цен Apple — это просто находка. Раньше тратил полдня на обновление объявлений, теперь всё автоматически. Окупился за первый месяц.",
    rating: 5,
    initials: "АМ",
    color: "#3B82F6",
  },
  {
    name: "Дмитрий К.",
    role: "Продавец WB, Екатеринбург",
    text: "Парсер конкурентов помог поднять позиции в поиске. Теперь я всегда знаю, когда конкурент снижает цену, и могу оперативно реагировать.",
    rating: 5,
    initials: "ДК",
    color: "#8B5CF6",
  },
  {
    name: "Ирина С.",
    role: "Владелец Telegram-магазина",
    text: "Чат-бот для магазина сделал обслуживание клиентов 24/7. Заказы приходят даже ночью, и клиенты сразу получают подтверждение. Очень доволен результатом.",
    rating: 5,
    initials: "ИС",
    color: "#10B981",
  },
  {
    name: "Павел Р.",
    role: "E-commerce предприниматель",
    text: "Команда GMLB быстро разобралась в нашей специфике и предложила решение, которое закрыло все наши боли. Поддержка отличная — всегда на связи.",
    rating: 5,
    initials: "ПР",
    color: "#F59E0B",
  },
  {
    name: "Наталья В.",
    role: "Маркетплейс-продавец, СПб",
    text: "Автоматизация аналитики сэкономила нам 20+ часов в месяц. Теперь отчёты приходят сами в Telegram каждое утро. Рекомендую всем продавцам на маркетплейсах.",
    rating: 5,
    initials: "НВ",
    color: "#EC4899",
  },
  {
    name: "Сергей Т.",
    role: "Владелец интернет-магазина",
    text: "Интеграция с Ozon и WB через API — это то, что нам было нужно. Теперь остатки синхронизируются автоматически, и мы больше не получаем заказы на отсутствующий товар.",
    rating: 5,
    initials: "СТ",
    color: "#06B6D4",
  },
];

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="reviews"
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
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
              color: "#FCD34D",
            }}
          >
            Отзывы клиентов
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#E6EDF3",
              letterSpacing: "-0.02em",
            }}
          >
            Что говорят наши клиенты
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={20} className="mb-4" style={{ color: "rgba(59,130,246,0.3)" }} />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} size={14} fill="#F59E0B" style={{ color: "#F59E0B" }} />
                ))}
              </div>

              {/* Text */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "rgba(230,237,243,0.7)" }}
              >
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: `${review.color}20`,
                    border: `1px solid ${review.color}30`,
                    color: review.color,
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#E6EDF3" }}>
                    {review.name}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(230,237,243,0.4)" }}>
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
