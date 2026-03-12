import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calculator,
  ChevronDown,
  Grid3X3,
  Home,
  Menu,
  Search,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Search", to: "/search", icon: Search },
  { label: "Categories", to: "/categories", icon: Grid3X3 },
  { label: "Calculator", to: "/calculator", icon: Calculator },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        background: scrolled ? "rgba(11,15,26,0.9)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
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
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{
              background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
              boxShadow: "0 0 20px rgba(108,92,231,0.4)",
            }}
          >
            Y
          </div>
          <span
            className="text-lg font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #6C5CE7 0%, #00D4FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            YojnaAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm px-3 py-1.5 rounded-lg transition-all duration-200 font-medium"
                style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  background: isActive
                    ? "rgba(108,92,231,0.15)"
                    : "transparent",
                }}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="text-xs px-2 py-1 rounded-md transition-colors"
            style={{ color: "rgba(255,255,255,0.3)" }}
            data-ocid="nav.link"
          >
            Admin
          </Link>
          <Link
            to="/search"
            className="text-sm font-bold px-5 py-2 rounded-xl text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
              boxShadow: "0 0 20px rgba(108,92,231,0.3)",
            }}
            data-ocid="nav.primary_button"
          >
            Start Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
          style={{
            color: "rgba(255,255,255,0.8)",
            background: "rgba(255,255,255,0.06)",
          }}
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden backdrop-blur-xl border-b px-4 py-4 flex flex-col gap-2"
            style={{
              background: "rgba(11,15,26,0.97)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-2.5 px-3 rounded-lg transition-colors font-medium text-sm"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/search"
              className="text-sm font-bold px-4 py-2.5 rounded-xl text-center mt-2 text-white"
              style={{
                background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
              }}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.primary_button"
            >
              Start Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
