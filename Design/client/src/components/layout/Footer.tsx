/*
  GMLB Automation — Footer Component
  Design: Dark green unified palette, minimal, with gradient divider
*/
import { Zap, Send, Phone, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="grid-bg"
      style={{
        borderTop: "1px solid rgba(34, 197, 94, 0.1)",
      }}
    >
      <div className="container mx-auto py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #22C55E, #10B981)",
                  boxShadow: "0 0 16px rgba(34,197,94,0.4)",
                }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span
                className="text-lg font-bold"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#E6EDF3",
                }}
              >
                GMLB<span style={{ color: "#22C55E" }}>.</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(230,237,243,0.5)" }}>
              Автоматизация бизнеса для малого бизнеса и e-commerce. Telegram-боты, парсеры, RAG-решения и чат-боты для маркетплейсов.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/gmlb_automation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  color: "#22C55E",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,197,94,0.1)";
                }}
              >
                <Send size={15} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: "#E6EDF3" }}
            >
              Продукты
            </h4>
            <ul className="space-y-2.5">
              {[
                "Telegram-бот для ресейла",
                "Парсер маркетплейсов",
                "RAG-ассистент",
                "Чат-бот для магазина",
                "Автоматизация заказов",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/products"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(230,237,243,0.5)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#22C55E";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "rgba(230,237,243,0.5)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4
              className="text-sm font-semibold mb-4"
              style={{ color: "#E6EDF3" }}
            >
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(230,237,243,0.5)" }}>
                <Send size={14} style={{ color: "#22C55E", flexShrink: 0 }} />
                <a href="https://t.me/gmlb_automation" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(230,237,243,0.5)" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#22C55E"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(230,237,243,0.5)"; }}
                >
                  @gmlb_automation
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(230,237,243,0.5)" }}>
                <Mail size={14} style={{ color: "#22C55E", flexShrink: 0 }} />
                <span>info@gmlb.ru</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(230,237,243,0.5)" }}>
                <Phone size={14} style={{ color: "#22C55E", flexShrink: 0 }} />
                <span>+7 (XXX) XXX-XX-XX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(34,197,94,0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(230,237,243,0.3)" }}>
            © {year} GMLB Automation. Все права защищены.
          </p>
          <p className="text-xs" style={{ color: "rgba(230,237,243,0.3)" }}>
            Россия и СНГ
          </p>
        </div>
      </div>
    </footer>
  );
}
