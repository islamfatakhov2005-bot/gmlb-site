/*
  GMLB Automation — Contact Page
  Design: Full contact form with additional information
*/
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, Phone, MessageSquare, User, FileText, Clock } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const contactInfo = [
  {
    icon: MessageSquare,
    title: "Telegram",
    description: "Ответим в течение 15 минут",
    value: "@gmlb_automation",
    link: "https://t.me/gmlb_automation",
    color: "#22C55E",
  },
  {
    icon: Phone,
    title: "Телефон",
    description: "Звоните в рабочее время",
    value: "+7 (999) 000-00-00",
    link: "tel:+79990000000",
    color: "#10B981",
  },
  {
    icon: User,
    title: "Email",
    description: "Отправьте письмо",
    value: "hello@gmlb.ru",
    link: "mailto:hello@gmlb.ru",
    color: "#34D399",
  },
  {
    icon: Clock,
    title: "График работы",
    description: "Пн-Пт, 10:00-19:00 МСК",
    value: "Консультация бесплатна",
    link: null,
    color: "#6EE7B7",
  },
];

export default function ContactPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    telegram: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Введите ваше имя";
    if (!form.phone.trim()) e.phone = "Введите номер телефона";
    else if (!/^[\+\d\s\-\(\)]{7,}$/.test(form.phone)) e.phone = "Некорректный формат телефона";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
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
                Свяжитесь с нами
              </h1>
              <p className="text-base max-w-2xl mx-auto" style={{ color: "rgba(230,237,243,0.55)" }}>
                Оставьте заявку и мы обсудим вашу задачу
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="grid-bg py-16">
          <div className="container mx-auto">
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.link || undefined}
                  target={info.link?.startsWith("http") ? "_blank" : undefined}
                  rel={info.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card p-6 cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{
                      background: `${info.color}15`,
                      border: `1px solid ${info.color}25`,
                    }}
                  >
                    <info.icon size={20} style={{ color: info.color }} />
                  </div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "#E6EDF3",
                    }}
                  >
                    {info.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: "rgba(230,237,243,0.4)" }}>
                    {info.description}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: info.color }}>
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="grid-bg py-16">
          <div className="container mx-auto max-w-2xl">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "#22C55E" }} />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3" }}
                  >
                    Заявка отправлена!
                  </h3>
                  <p className="text-base" style={{ color: "rgba(230,237,243,0.55)" }}>
                    Мы свяжемся с вами в ближайшее время. Спасибо за интерес к GMLB!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2
                    className="text-2xl font-bold mb-6"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#E6EDF3" }}
                  >
                    Оставить заявку
                  </h2>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(230,237,243,0.6)" }}>
                      Имя *
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-dark"
                        style={{ paddingLeft: "38px" }}
                      />
                    </div>
                    {errors.name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(230,237,243,0.6)" }}>
                      Телефон *
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-dark"
                        style={{ paddingLeft: "38px" }}
                      />
                    </div>
                    {errors.phone && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(230,237,243,0.6)" }}>
                      Telegram (необязательно)
                    </label>
                    <div className="relative">
                      <Send size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <input
                        type="text"
                        placeholder="@username"
                        value={form.telegram}
                        onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                        className="input-dark"
                        style={{ paddingLeft: "38px" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: "rgba(230,237,243,0.6)" }}>
                      Сообщение (необязательно)
                    </label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3 top-3.5" style={{ color: "rgba(230,237,243,0.3)" }} />
                      <textarea
                        placeholder="Опишите вашу задачу..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-dark resize-none"
                        rows={4}
                        style={{ paddingLeft: "38px" }}
                      />
                    </div>
                  </div>

                  <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient w-full flex items-center justify-center gap-2"
                    style={{ padding: "14px 24px", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: "rgba(230,237,243,0.3)" }}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
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
