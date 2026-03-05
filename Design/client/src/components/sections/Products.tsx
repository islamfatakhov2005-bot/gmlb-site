/*
  GMLB Automation — Products Section
  Design: Glassmorphism cards, 3-column grid, hover effects
*/
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Bot, Search, Brain, ShoppingCart, MessageSquare, RefreshCw, BarChart2, Layers } from "lucide-react";
import { Link } from "wouter";

const PRODUCT_IMAGES = {
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
    icon: Brain,
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
    icon: MessageSquare,
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
    icon: BarChart2,
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
    icon: RefreshCw,
    title: "Автоматизация заказов",
    shortDescription: "Интеграция с маркетплейсами для автоматической обработки заказов, обновления остатков и синхронизации данных.",
    tags: ["Автоматизация", "Интеграция", "Заказы"],
    priceFrom: 35000,
    priceTo: 100000,
    image: null,
    featured: false,
  },
  {
    slug: "marketplace-analytics",
    icon: Layers,
    title: "Аналитика маркетплейсов",
    shortDescription: "Комплексная аналитика продаж, трендов и конкурентов на Wildberries и Ozon. Еженедельные отчёты в Telegram.",
    tags: ["Аналитика", "WB", "Ozon"],
    priceFrom: 15000,
    priceTo: 60000,
    image: null,
    featured: false,
  },
  {
    slug: "ecommerce-bot",
    icon: ShoppingCart,
    title: "Бот для e-commerce",
    shortDescription: "Автоматизация работы интернет-магазина: уведомления о заказах, обновление статусов, ответы на частые вопросы.",
    tags: ["E-commerce", "Telegram-бот", "Уведомления"],
    priceFrom: 18000,
    priceTo: 55000,
    image: null,
    featured: false,
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const iconColors = [
    "#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899", "#6366F1"
  ];
  const color = iconColors[index % iconColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
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
                : `linear-gradient(135deg, ${color}15, ${color}05)`,
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
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <product.icon size={26} style={{ color }} />
                </div>
              </div>
            )}
            {product.featured && (
              <div
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  color: "white",
                }}
              >
                Популярный
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.tags.map((tag) => (
                <span key={tag} className="tag-badge" style={{ fontSize: "11px" }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className="text-base font-bold mb-2 leading-snug"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#E6EDF3",
              }}
            >
              {product.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed flex-1 mb-4"
              style={{ color: "rgba(230,237,243,0.55)" }}
            >
              {product.shortDescription}
            </p>

            {/* Price + CTA */}
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
  );
}

export default function Products() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="products" className="grid-bg py-16 md:py-24">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              color: "#22C55E",
            }}
          >
            Каталог продуктов
          </span>
          <h2
            className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-3 md:mb-4"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "#E6EDF3",
              letterSpacing: "-0.02em",
            }}
          >
            Решения для вашего бизнеса
          </h2>
          <p
            className="text-sm md:text-base max-w-xl mx-auto px-2"
            style={{ color: "rgba(230,237,243,0.55)" }}
          >
            Готовые инструменты автоматизации, которые экономят время и увеличивают прибыль
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
