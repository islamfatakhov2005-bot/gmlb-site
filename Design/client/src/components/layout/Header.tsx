/*
  GMLB Automation — Header Component
  Design: Dark glassmorphism, sticky, mobile burger menu
  Colors: Unified green palette (#0A1A12 base, #22C55E accent)
*/
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Продукты", href: "/products" },
  { label: "Кейсы", href: "/cases" },
  { label: "Преимущества", href: "/advantages" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Контакты", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(8, 20, 12, 0.95)"
          : "rgba(8, 20, 12, 0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(34,197,94,0.08)",
      }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
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
                className="text-lg font-bold tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "#E6EDF3",
                }}
              >
                GMLB<span style={{ color: "#22C55E" }}>.</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer"
                  style={{
                    color: location === link.href ? "#22C55E" : "rgba(230,237,243,0.7)",
                    background: location === link.href ? "rgba(34,197,94,0.08)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#E6EDF3";
                    (e.target as HTMLElement).style.background = "rgba(34,197,94,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = location === link.href ? "#22C55E" : "rgba(230,237,243,0.7)";
                    (e.target as HTMLElement).style.background = location === link.href ? "rgba(34,197,94,0.08)" : "transparent";
                  }}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact">
              <button
                className="btn-gradient text-sm"
                style={{ padding: "9px 20px" }}
              >
                Получить консультацию
              </button>
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#E6EDF3" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(8, 20, 12, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(34,197,94,0.1)",
            }}
          >
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    onClick={() => setMobileOpen(false)}
                    className="block text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    style={{
                      color: location === link.href ? "#22C55E" : "rgba(230,237,243,0.8)",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="btn-gradient mt-2 text-sm text-center w-full"
                >
                  Получить консультацию
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
