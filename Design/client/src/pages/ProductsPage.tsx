/*
  GMLB Automation — Products Page
  Design: Full products catalog with filtering and search
*/
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Search, Bot, SearchIcon, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PRODUCT_IMAGES: Record<string, string> = {
  "telegram-bot-resale-apple": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-telegram-bot-3ieRJKmRzNkKUnHTtvE7o3.webp",
  "parser-marketplaces": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-parser-7KmFwECTCkrjew4zYFi2zD.webp",
  "chatbot-marketplace": "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/product-chatbot-JUxD9mqxi7MKNY2Lm9BZD6.webp",
};

const products = [
  {
    slug: "telegram-bot-resale-apple",
    icon: Bot,
    title: "Telegram-бот для ресейла Apple",
    shortDescription: "Автоматический парсинг цен и наличия iPhone, наушников и других устройств Apple с обновлением каждые 15–60 минут.",
    tags: ["Telegram-бот", "Парсер", "Ресейл"],
    priceFrom: 15000,
    priceTo: 50000,
    image: PRODUCT_IMAGES["telegram-bot-resale-apple"],
    featured: true,
  },
  {
    slug: "parser-marketplaces",
    icon: Search,
    title: "Парсер маркетплейсов",
    shortDescription: "Сбор данных о товарах, ценах и конкурентах с Wildberries, Ozon, Avito. Автоматическое обновление и уведомления.",
    tags: ["Парсер", "Маркетплейс", "Аналитика"],
    priceFrom: 20000,
    priceTo: 80000,
    image: PRODUCT_IMAGES["parser-marketplaces"],
    featured: false,
  },
  {
    slug: "rag-assistant",
    icon: Bot,
    title: "RAG-ассистент для бизнеса",
    shortDescription: "AI-ассистент на базе ваших документов и базы знаний. Отвечает на вопросы клиентов 24/7 без участия менеджера.",
    tags: ["AI", "RAG", "Чат-бот"],
    priceFrom: 30000,
    priceTo: 120000,
    image: null,
    featured: false,
  },
  {
    slug: "chatbot-marketplace",
    icon: Bot,
    title: "Чат-бот для Telegram-магазина",
    shortDescription: "Полноценный магазин в Telegram с каталогом, корзиной, оплатой и автоматической обработкой заказов.",
    tags: ["Telegram", "Магазин", "Оплата"],
    priceFrom: 25000,
    priceTo: 90000,
    image: PRODUCT_IMAGES["chatbot-marketplace"],
    featured: false,
  },
  {
    slug: "price-monitoring",
    icon: Bot,
    title: "Мониторинг цен конкурентов",
    shortDescription: "Автоматическое отслеживание цен конкурентов и уведомления при изменениях. Аналитика в удобном дашборде.",
    tags: ["Аналитика", "Мониторинг", "E-commerce"],
    priceFrom: 10000,
    priceTo: 40000,
    image: null,
    featured: false,
  },
  {
    slug: "order-automation",
    icon: Bot,
    title: "Автоматизация заказов",
    shortDescription: "Интеграция с маркетплейсами для автоматической обработки заказов, обновления остатков и синхронизации данных.",
    tags: ["Автоматизация", "Интеграция", "Заказы"],
    priceFrom: 35000,
    priceTo: 100000,
    image: null,
    featured: false,
  },
];

export default function ProductsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !selectedTag || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>
      <Header />
      <main className="pt-20" style={{backgroundColor: '#081510'}}>
        {/* Hero */}
        <section
          className="grid-bg py-16 relative overflow-hidden"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1
                className="text-4xl md:text-5xl font-extrabold mb-4"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#E6EDF3",
                  letterSpacing: "-0.02em",
                }}
              >
                Каталог продуктов
              </h1>
              <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(230,237,243,0.55)" }}>
                Готовые решения для автоматизации вашего бизнеса
              </p>
            </motion.div>

            {/* Search and filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="relative mb-6">
                <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                <input
                  type="text"
                  placeholder="Поиск по названию или описанию..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-dark w-full"
                  style={{ paddingLeft: "40px" }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTag === null
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-rgba(255,255,255,0.05) text-rgba(230,237,243,0.6) border border-rgba(255,255,255,0.08)"
                  }`}
                >
                  Все
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-rgba(255,255,255,0.05) text-rgba(230,237,243,0.6) border border-rgba(255,255,255,0.08)"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products grid */}
        <section className="grid-bg py-16">
          <div className="container mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg" style={{ color: "rgba(230,237,243,0.5)" }}>
                  Продукты не найдены
                </p>
              </div>
            ) : (
              <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div
                        className="glass-card h-full flex flex-col cursor-pointer overflow-hidden"
                        style={{ minHeight: "340px" }}
                      >
                        {/* Image or icon area */}
                        <div
                          className="relative overflow-hidden"
                          style={{
                            height: product.image ? "180px" : "120px",
                            background: product.image
                              ? "transparent"
                              : "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              style={{ opacity: 0.85 }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{
                                  background: "rgba(34,197,94,0.18)",
                                  border: "1px solid rgba(34,197,94,0.3)",
                                }}
                              >
                                <product.icon size={26} style={{ color: "#22C55E" }} />
                              </div>
                            </div>
                          )}
                          {product.featured && (
                            <div
                              className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                              style={{
                                background: "linear-gradient(135deg, #22C55E, #10B981)",
                                color: "white",
                              }}
                            >
                              Популярный
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {product.tags.map((tag) => (
                              <span key={tag} className="tag-badge" style={{ fontSize: "11px" }}>
                                {tag}
                              </span>
                            ))}
                          </div>

                          <h3
                            className="text-base font-bold mb-2 leading-snug"
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              color: "#E6EDF3",
                            }}
                          >
                            {product.title}
                          </h3>

                          <p
                            className="text-sm leading-relaxed flex-1 mb-4"
                            style={{ color: "rgba(230,237,243,0.55)" }}
                          >
                            {product.shortDescription}
                          </p>

                          <div className="flex items-center justify-between mt-auto">
                            <div>
                              <span className="text-xs" style={{ color: "rgba(230,237,243,0.4)" }}>
                                от{" "}
                              </span>
                              <span
                                className="text-sm font-bold"
                                style={{ color: "#22C55E" }}
                              >
                                {product.priceFrom.toLocaleString("ru-RU")} ₽
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                              style={{ color: "#22C55E" }}
                            >
                              Подробнее
                              <ArrowRight size={13} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
