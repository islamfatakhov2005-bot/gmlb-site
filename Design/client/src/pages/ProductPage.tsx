/*
  GMLB Automation — Product Page
  Design: Dark glassmorphism, tabbed navigation, lead form
*/
import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, Bot, Search, Brain, MessageSquare, RefreshCw, BarChart2, Layers, ShoppingCart,
  CheckCircle2, Send, Phone, User, FileText, Star, ChevronDown, ChevronUp
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const PRODUCT_IMAGES: Record<string, string> = {
  "telegram-bot-resale-apple": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-telegram-bot-3ieRJKmRzNkKUnHTtvE7o3.webp",
  "parser-marketplaces": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-parser-7KmFwECTCkrjew4zYFi2zD.webp",
  "chatbot-marketplace": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-chatbot-JUxD9mqxi7MKNY2Lm9BZD6.webp",
};

const products: Record<string, {
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  tags: string[];
  priceFrom: number;
  priceTo: number;
  color: string;
  overview: string;
  pains: string[];
  solution: string;
  howItWorks: string[];
  faq: { q: string; a: string }[];
  pricing: { name: string; price: string; features: string[] }[];
}> = {
  "telegram-bot-resale-apple": {
    icon: Bot,
    title: "Telegram-бот для ресейла Apple",
    shortDescription: "Автоматический парсинг цен и наличия iPhone, наушников и других устройств Apple с обновлением каждые 15–60 минут.",
    tags: ["Telegram-бот", "Парсер", "Ресейл", "Apple"],
    priceFrom: 15000,
    priceTo: 50000,
    color: "#22C55E",
    overview: "Полностью автоматизированная система мониторинга и обновления цен для реселлеров Apple-техники. Бот парсит актуальные цены, отслеживает наличие товаров и автоматически обновляет ваши объявления в Telegram-канале.",
    pains: [
      "Тратите 4–5 часов в день на ручное обновление цен и наличия",
      "Пропускаете выгодные предложения из-за несвоевременного мониторинга",
      "Теряете клиентов из-за устаревших данных в объявлениях",
      "Сложно отслеживать изменения цен у конкурентов",
    ],
    solution: "Telegram-бот автоматически парсит цены и наличие каждые 15–60 минут, уведомляет вас об изменениях и обновляет объявления в вашем канале без вашего участия.",
    howItWorks: [
      "Парсинг категории Apple (iPhone 13/14/15, наушники, другие устройства)",
      "Сохранение в БД: цена, наличие, цвет, объём памяти",
      "Обновление каждые 15–60 минут (настраивается)",
      "Автоудаление устаревших позиций",
      "Уведомление при изменении цены на N рублей",
      "Автообновление объявлений в Telegram-канале",
    ],
    faq: [
      { q: "Как быстро бот начнёт работать?", a: "После настройки и тестирования бот запускается в течение 3–5 рабочих дней." },
      { q: "Можно ли настроить интервал обновления?", a: "Да, интервал парсинга настраивается от 15 минут до нескольких часов." },
      { q: "Что происходит при изменении структуры сайта-источника?", a: "Мы оперативно обновляем парсер. Техническая поддержка включена в стоимость." },
      { q: "Сколько товаров может отслеживать бот?", a: "Без ограничений — от нескольких десятков до тысяч позиций." },
    ],
    pricing: [
      { name: "Базовый", price: "15 000 ₽", features: ["До 100 позиций", "Обновление каждый час", "Уведомления в Telegram", "1 месяц поддержки"] },
      { name: "Стандарт", price: "30 000 ₽", features: ["До 500 позиций", "Обновление каждые 30 мин", "Автообновление канала", "3 месяца поддержки", "Аналитика изменений"] },
      { name: "Про", price: "50 000 ₽", features: ["Неограниченно позиций", "Обновление каждые 15 мин", "Мультиканальность", "6 месяцев поддержки", "Кастомная аналитика", "Приоритетная поддержка"] },
    ],
  },
  "parser-marketplaces": {
    icon: Search,
    title: "Парсер маркетплейсов",
    shortDescription: "Сбор данных о товарах, ценах и конкурентах с Wildberries, Ozon, Avito. Автоматическое обновление и уведомления.",
    tags: ["Парсер", "Маркетплейс", "Аналитика"],
    priceFrom: 20000,
    priceTo: 80000,
    color: "#8B5CF6",
    overview: "Профессиональный инструмент для мониторинга конкурентов и анализа рынка на крупнейших российских маркетплейсах. Собирает данные о ценах, рейтингах, отзывах и наличии товаров.",
    pains: [
      "Не знаете, по каким ценам продают конкуренты",
      "Теряете позиции в поиске из-за неоптимальных цен",
      "Нет времени на ручной анализ сотен товаров",
      "Сложно отслеживать тренды и новые товары на рынке",
    ],
    solution: "Автоматический парсер собирает данные о конкурентах каждые 2 часа и присылает структурированный отчёт в Telegram с рекомендациями по ценообразованию.",
    howItWorks: [
      "Настройка списка конкурентов и категорий для мониторинга",
      "Автоматический сбор данных: цена, рейтинг, количество отзывов, наличие",
      "Сравнение с вашими ценами и расчёт отклонений",
      "Формирование отчёта с рекомендациями",
      "Отправка отчёта в Telegram по расписанию",
      "Хранение истории изменений для анализа трендов",
    ],
    faq: [
      { q: "Какие маркетплейсы поддерживаются?", a: "Wildberries, Ozon, Avito. По запросу — другие площадки." },
      { q: "Как часто обновляются данные?", a: "По умолчанию каждые 2 часа. Можно настроить чаще." },
      { q: "Есть ли ограничения на количество конкурентов?", a: "В базовом тарифе — до 50 конкурентов, в расширенных — без ограничений." },
    ],
    pricing: [
      { name: "Старт", price: "20 000 ₽", features: ["До 50 конкурентов", "2 маркетплейса", "Ежедневный отчёт", "1 месяц поддержки"] },
      { name: "Бизнес", price: "45 000 ₽", features: ["До 200 конкурентов", "3 маркетплейса", "Отчёт каждые 2 часа", "История изменений", "3 месяца поддержки"] },
      { name: "Корпоратив", price: "80 000 ₽", features: ["Без ограничений", "Все маркетплейсы", "Реалтайм мониторинг", "API доступ", "6 месяцев поддержки"] },
    ],
  },
};

// Default product for unknown slugs
const defaultProduct = {
  icon: Layers,
  title: "Продукт GMLB",
  shortDescription: "Профессиональное решение для автоматизации бизнес-процессов.",
  tags: ["Автоматизация"],
  priceFrom: 15000,
  priceTo: 60000,
  color: "#22C55E",
  overview: "Профессиональное решение для автоматизации бизнес-процессов. Свяжитесь с нами для получения подробной информации.",
  pains: ["Ручные процессы занимают много времени", "Сложно масштабировать бизнес без автоматизации"],
  solution: "Мы разработаем индивидуальное решение под ваши задачи.",
  howItWorks: ["Анализ ваших бизнес-процессов", "Разработка решения", "Тестирование и запуск", "Поддержка"],
  faq: [{ q: "Как начать работу?", a: "Оставьте заявку и мы свяжемся с вами для обсуждения деталей." }],
  pricing: [{ name: "Индивидуально", price: "от 15 000 ₽", features: ["Под ваши задачи", "Гибкие условия", "Поддержка"] }],
};

const TABS = ["Обзор", "Боли", "Решение", "Как работает", "Тарифы", "FAQ"] as const;

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        style={{ background: "rgba(255,255,255,0.03)" }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium" style={{ color: "#E6EDF3" }}>{q}</span>
        {open ? <ChevronUp size={16} style={{ color: "#22C55E", flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: "rgba(230,237,243,0.4)", flexShrink: 0 }} />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "rgba(230,237,243,0.6)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products[slug as string] || defaultProduct;
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Обзор");
  const [form, setForm] = useState({ name: "", phone: "", telegram: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const image = PRODUCT_IMAGES[slug as string];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Введите имя";
    if (!form.phone.trim()) errs.phone = "Введите телефон";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Заявка отправлена!");
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="grid-bg py-16 relative overflow-hidden"
        >
          <div className="container mx-auto">
            <Link href="/">
              <button className="flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: "rgba(230,237,243,0.5)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#22C55E")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(230,237,243,0.5)")}
              >
                <ArrowLeft size={16} />
                Назад к продуктам
              </button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="tag-badge">{tag}</span>
                  ))}
                </div>
                <h1
                  className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3", letterSpacing: "-0.02em" }}
                >
                  {product.title}
                </h1>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(230,237,243,0.6)" }}>
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <span className="text-xs" style={{ color: "rgba(230,237,243,0.4)" }}>Стоимость от </span>
                    <span className="text-2xl font-bold" style={{ color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {product.priceFrom.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => document.querySelector("#lead-form")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn-gradient flex items-center gap-2"
                  >
                    Оставить заявку
                    <Send size={15} />
                  </button>
                  <a
                    href="https://t.me/gmlb_automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-blue flex items-center gap-2"
                  >
                    <Send size={15} />
                    Написать в Telegram
                  </a>
                </div>
              </div>

              {image ? (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: `0 0 60px ${product.color}15, 0 20px 60px rgba(0,0,0,0.5)`,
                  }}
                >
                  <img src={image} alt={product.title} className="w-full h-auto" />
                </div>
              ) : (
                <div
                  className="rounded-2xl flex items-center justify-center"
                  style={{
                    height: "280px",
                    background: `${product.color}08`,
                    border: `1px solid ${product.color}20`,
                  }}
                >
                  <product.icon size={80} style={{ color: `${product.color}40` }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="grid-bg py-12">
          <div className="container mx-auto">
            {/* Tab nav */}
            <div
              className="flex gap-1 mb-8 overflow-x-auto pb-2"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={{
                    color: activeTab === tab ? "#22C55E" : "rgba(230,237,243,0.5)",
                    background: activeTab === tab ? "rgba(34,197,94,0.1)" : "transparent",
                    border: activeTab === tab ? "1px solid rgba(34,197,94,0.2)" : "1px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl"
            >
              {activeTab === "Обзор" && (
                <div>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(230,237,243,0.7)" }}>
                    {product.overview}
                  </p>
                </div>
              )}

              {activeTab === "Боли" && (
                <div className="space-y-3">
                  <p className="text-sm mb-4" style={{ color: "rgba(230,237,243,0.5)" }}>
                    Проблемы, которые решает этот продукт:
                  </p>
                  {product.pains.map((pain, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.1)" }}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#EF4444" }} />
                      <p className="text-sm" style={{ color: "rgba(230,237,243,0.7)" }}>{pain}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Решение" && (
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
                >
                  <p className="text-base leading-relaxed" style={{ color: "rgba(230,237,243,0.7)" }}>
                    {product.solution}
                  </p>
                </div>
              )}

              {activeTab === "Как работает" && (
                <div className="space-y-3">
                  {product.howItWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: `${product.color}15`,
                          border: `1px solid ${product.color}25`,
                          color: product.color,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm pt-1" style={{ color: "rgba(230,237,243,0.7)" }}>{step}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Тарифы" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {product.pricing.map((plan, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-5 flex flex-col"
                      style={{
                        background: i === 1 ? `${product.color}08` : "rgba(255,255,255,0.03)",
                        border: i === 1 ? `1px solid ${product.color}30` : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: i === 1 ? `0 0 30px ${product.color}10` : "none",
                      }}
                    >
                      {i === 1 && (
                        <span
                          className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 self-start"
                          style={{ background: `${product.color}20`, color: product.color }}
                        >
                          Популярный
                        </span>
                      )}
                      <h4
                        className="text-base font-bold mb-1"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3" }}
                      >
                        {plan.name}
                      </h4>
                      <div
                        className="text-xl font-bold mb-4"
                        style={{ color: product.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {plan.price}
                      </div>
                      <ul className="space-y-2 flex-1 mb-5">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "rgba(230,237,243,0.65)" }}>
                            <CheckCircle2 size={14} style={{ color: product.color, flexShrink: 0 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => document.querySelector("#lead-form")?.scrollIntoView({ behavior: "smooth" })}
                        className={i === 1 ? "btn-gradient text-sm" : "btn-outline-blue text-sm"}
                        style={{ padding: "10px 20px" }}
                      >
                        Выбрать
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "FAQ" && (
                <div className="space-y-2">
                  {product.faq.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Lead form */}
        <section
          id="lead-form"
          className="grid-bg py-16"
        >
          <div className="container mx-auto max-w-xl">
            <h2
              className="text-2xl md:text-3xl font-extrabold text-center mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3", letterSpacing: "-0.02em" }}
            >
              Оставить заявку на{" "}
              <span className="gradient-text">{product.title}</span>
            </h2>

            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#34D399" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3" }}>
                    Заявка отправлена!
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(230,237,243,0.55)" }}>
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>Имя *</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input type="text" placeholder="Ваше имя" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="input-dark" style={{ paddingLeft: "38px" }} />
                    </div>
                    {errors.name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>Телефон *</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input type="tel" placeholder="+7 (999) 000-00-00" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="input-dark" style={{ paddingLeft: "38px" }} />
                    </div>
                    {errors.phone && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>Telegram</label>
                    <div className="relative">
                      <Send size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input type="text" placeholder="@username" value={form.telegram}
                        onChange={e => setForm({ ...form, telegram: e.target.value })}
                        className="input-dark" style={{ paddingLeft: "38px" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(230,237,243,0.6)" }}>Сообщение</label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3 top-3.5" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <textarea placeholder="Опишите вашу задачу..." value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="input-dark resize-none" rows={3} style={{ paddingLeft: "38px" }} />
                    </div>
                  </div>
                  <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} />
                  <button type="submit" disabled={loading} className="btn-gradient w-full flex items-center justify-center gap-2"
                    style={{ padding: "13px 24px", opacity: loading ? 0.7 : 1 }}>
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Отправляем...</>
                    ) : (
                      <>Оставить заявку <Send size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
