/*
  GMLB Automation — Reviews Page
  Design: Full testimonials showcase with detailed reviews
*/
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const reviews = [
  {
    name: "Алексей М.",
    role: "Реселлер Apple, Москва",
    text: "Бот для мониторинга цен Apple — это просто находка. Раньше тратил полдня на обновление объявлений, теперь всё автоматически. Окупился за первый месяц. Команда GMLB очень отзывчива и быстро решает любые вопросы.",
    rating: 5,
    initials: "АМ",
    color: "#22C55E",
  },
  {
    name: "Дмитрий К.",
    role: "Продавец WB, Екатеринбург",
    text: "Парсер конкурентов помог поднять позиции в поиске. Теперь я всегда знаю, когда конкурент снижает цену, и могу оперативно реагировать. Аналитика в Telegram очень удобная. Рекомендую всем продавцам на маркетплейсах.",
    rating: 5,
    initials: "ДК",
    color: "#10B981",
  },
  {
    name: "Ирина С.",
    role: "Владелец Telegram-магазина",
    text: "Чат-бот для магазина сделал обслуживание клиентов 24/7. Заказы приходят даже ночью, и клиенты сразу получают подтверждение. Очень доволен результатом. Продажи выросли на 40% за три месяца.",
    rating: 5,
    initials: "ИС",
    color: "#34D399",
  },
  {
    name: "Павел Р.",
    role: "E-commerce предприниматель",
    text: "Команда GMLB быстро разобралась в нашей специфике и предложила решение, которое закрыло все наши боли. Поддержка отличная — всегда на связи. Разработка заняла всего неделю, а результаты видны сразу.",
    rating: 5,
    initials: "ПР",
    color: "#6EE7B7",
  },
  {
    name: "Наталья В.",
    role: "Маркетплейс-продавец, СПб",
    text: "Автоматизация аналитики сэкономила нам 20+ часов в месяц. Теперь отчёты приходят сами в Telegram каждое утро. Рекомендую всем продавцам на маркетплейсах. Это просто must-have для серьёзного бизнеса.",
    rating: 5,
    initials: "НВ",
    color: "#22C55E",
  },
  {
    name: "Сергей Т.",
    role: "Владелец интернет-магазина",
    text: "Интеграция с Ozon и WB через API — это то, что нам было нужно. Теперь остатки синхронизируются автоматически, и мы больше не получаем заказы на отсутствующий товар. Цена адекватная, результат отличный.",
    rating: 5,
    initials: "СТ",
    color: "#10B981",
  },
  {
    name: "Мария Л.",
    role: "Владелец агентства маркетинга",
    text: "Используем GMLB для автоматизации процессов клиентов. Очень удобно, что можно кастомизировать под каждого клиента. Техподдержка отвечает быстро, решают проблемы оперативно.",
    rating: 5,
    initials: "МЛ",
    color: "#34D399",
  },
  {
    name: "Виктор Б.",
    role: "Основатель стартапа",
    text: "Как стартапу нам нужна была быстрая и дешёвая автоматизация. GMLB предложили оптимальное решение за разумную цену. Теперь мы можем сосредоточиться на развитии, а не на рутине.",
    rating: 5,
    initials: "ВБ",
    color: "#6EE7B7",
  },
];

export default function ReviewsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main className="pt-20">
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
                Отзывы клиентов
              </h1>
              <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(230,237,243,0.55)" }}>
                Что говорят наши клиенты о работе с GMLB
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="grid-bg py-16">
          <div className="container mx-auto">
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="glass-card p-6 flex flex-col"
                >
                  {/* Quote icon */}
                  <Quote size={20} className="mb-4" style={{ color: "rgba(34,197,94,0.3)" }} />

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
      </main>
      <Footer />
    </div>
  );
}
