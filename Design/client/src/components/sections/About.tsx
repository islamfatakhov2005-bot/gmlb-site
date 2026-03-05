/*
  GMLB Automation — About Section
  Design: Two-column layout, illustration right, text left
*/
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663400171428/CmK6FYfLeampov8DApb2uG/about-illustration-WS4fdBNujv9AVJdM8F7wqk.webp";

const points = [
  "Автоматизируем рутинные бизнес-процессы",
  "Интегрируемся с Telegram, маркетплейсами и CRM",
  "Разрабатываем под конкретные задачи бизнеса",
  "Поддержка и сопровождение после запуска",
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="grid-bg py-24 relative overflow-hidden"
    >

      <div className="container mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22C55E",
              }}
            >
              О компании
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#E6EDF3",
                letterSpacing: "-0.02em",
              }}
            >
              Мы делаем автоматизацию{" "}
              <span className="gradient-text">доступной</span> для малого бизнеса
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(230,237,243,0.6)" }}
            >
              GMLB — команда разработчиков, специализирующихся на автоматизации бизнес-процессов для малого бизнеса и e-commerce. Мы создаём инструменты, которые раньше были доступны только крупным компаниям.
            </p>

            <ul className="space-y-3 mb-8">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "rgba(230,237,243,0.75)" }}
                >
                  <CheckCircle2 size={17} style={{ color: "#22C55E", flexShrink: 0 }} />
                  {point}
                </motion.li>
              ))}
            </ul>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gradient"
            >
              Обсудить проект
            </button>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden animate-float"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 60px rgba(34,197,94,0.12), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={ABOUT_IMG}
                alt="GMLB Automation — схема автоматизации"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(13,17,23,0.9)",
                border: "1px solid rgba(34,197,94,0.25)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <div className="text-xl font-bold" style={{ color: "#22C55E", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                50+
              </div>
              <div className="text-xs" style={{ color: "rgba(230,237,243,0.5)" }}>
                продуктов к концу года
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
