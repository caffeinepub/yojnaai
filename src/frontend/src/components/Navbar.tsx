import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "Schemes", to: "/schemes/general" },
  { label: "Students", to: "/schemes/student" },
  { label: "Farmers", to: "/schemes/farmer" },
  { label: "Women", to: "/schemes/women" },
  { label: "SC/ST", to: "/schemes/sc-st" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        background: scrolled
          ? isLight
            ? "rgba(255,255,255,0.92)"
            : "rgba(5,8,22,0.85)"
          : "transparent",
        borderBottom: scrolled
          ? isLight
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/uploads/ChatGPT-Image-Mar-10-2026-08_29_10-AM-2.png"
            alt="YojnaAI"
            className="h-9 w-auto"
          />
          {!isLight && (
            <span
              className="text-lg font-black tracking-tight hidden sm:block"
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              YojnaAI
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm px-3 py-1.5 rounded-lg transition-all duration-200 font-medium"
              style={{
                color: isLight ? "#555" : "rgba(255,255,255,0.65)",
              }}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-2.5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-ocid="nav.toggle"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: isLight
                ? "rgba(255,107,0,0.08)"
                : "rgba(167,139,250,0.1)",
              color: isLight ? "#FF6B00" : "#a78bfa",
              border: isLight
                ? "1px solid rgba(255,107,0,0.2)"
                : "1px solid rgba(167,139,250,0.2)",
            }}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </motion.button>

          <Link
            to="/admin"
            className="text-sm transition-colors px-2"
            style={{ color: isLight ? "#999" : "rgba(255,255,255,0.4)" }}
            data-ocid="nav.link"
          >
            Admin
          </Link>

          <Link
            to="/"
            className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-all relative overflow-hidden group"
            style={{
              background: isLight
                ? "linear-gradient(135deg, #FF6B00, #e55b00)"
                : "linear-gradient(135deg, #6C5CE7, #0984E3)",
              boxShadow: isLight
                ? "0 0 20px rgba(255,107,0,0.3)"
                : "0 0 20px rgba(108,92,231,0.4), 0 0 40px rgba(9,132,227,0.15)",
            }}
            data-ocid="nav.primary_button"
          >
            <span className="relative z-10">Search Schemes</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-ocid="nav.toggle"
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              color: isLight ? "#FF6B00" : "#a78bfa",
              background: isLight
                ? "rgba(255,107,0,0.08)"
                : "rgba(167,139,250,0.1)",
            }}
          >
            {isLight ? <Moon size={16} /> : <Sun size={16} />}
          </motion.button>
          <button
            className="transition-colors"
            style={{ color: isLight ? "#333" : "rgba(255,255,255,0.8)" }}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden backdrop-blur-xl border-b px-4 py-4 flex flex-col gap-3"
            style={{
              background: isLight
                ? "rgba(255,255,255,0.97)"
                : "rgba(5,8,22,0.97)",
              borderColor: isLight
                ? "rgba(0,0,0,0.08)"
                : "rgba(255,255,255,0.06)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-2 transition-colors font-medium"
                style={{ color: isLight ? "#333" : "rgba(255,255,255,0.8)" }}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              className="text-sm font-bold px-4 py-2.5 rounded-xl text-center mt-2 text-white"
              style={{
                background: isLight
                  ? "linear-gradient(135deg, #FF6B00, #e55b00)"
                  : "linear-gradient(135deg, #6C5CE7, #0984E3)",
              }}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.primary_button"
            >
              Search Schemes
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
