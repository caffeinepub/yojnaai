import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calculator,
  CheckCircle,
  ChevronRight,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

// Canvas particle field
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,92,231,${p.opacity})`;
        ctx.fill();
      }
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,92,231,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

const floatingIcons = [
  { emoji: "🎓", label: "Students", delay: 0 },
  { emoji: "🌾", label: "Farmers", delay: 0.5 },
  { emoji: "👩", label: "Women", delay: 1 },
  { emoji: "👷", label: "Labour", delay: 1.5 },
  { emoji: "💼", label: "Business", delay: 2 },
  { emoji: "👴", label: "Senior Citizens", delay: 2.5 },
];

const features = [
  {
    icon: Search,
    title: "Smart Scheme Finder",
    desc: "AI-powered search that understands your profile and finds the most relevant government schemes instantly.",
    color: "#6C5CE7",
  },
  {
    icon: CheckCircle,
    title: "Eligibility Checker",
    desc: "Know instantly if you qualify for a scheme with our intelligent eligibility verification system.",
    color: "#00D4FF",
  },
  {
    icon: Calculator,
    title: "Benefits Calculator",
    desc: "Calculate your total government benefits across all eligible schemes and maximize your entitlements.",
    color: "#a78bfa",
  },
];

const stats = [
  { value: "1000+", label: "Schemes" },
  { value: "28", label: "States" },
  { value: "6", label: "Categories" },
  { value: "AI", label: "Powered" },
];

const steps = [
  {
    n: "01",
    title: "Enter Your Profile",
    desc: "Tell us your state, age, occupation and income category.",
  },
  {
    n: "02",
    title: "AI Analyzes",
    desc: "Our AI scans 1000+ schemes to find what matches your profile.",
  },
  {
    n: "03",
    title: "Apply & Benefit",
    desc: "Get scheme details, eligibility and direct apply links.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function LandingPage() {
  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A" }}>
        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient mesh */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(108,92,231,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,212,255,0.1) 0%, transparent 60%)",
              animation: "meshPulse 8s ease-in-out infinite",
            }}
          />
          {/* Glow orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "float 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "float 9s ease-in-out infinite reverse",
            }}
          />
          <ParticleCanvas />

          <div className="container mx-auto px-4 text-center relative z-10 pt-20">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8"
              style={{
                background: "rgba(108,92,231,0.15)",
                border: "1px solid rgba(108,92,231,0.3)",
                color: "#a78bfa",
              }}
            >
              <Sparkles size={14} />
              AI-Powered Government Scheme Finder
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black mb-6 leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              <span className="text-white">Discover Government</span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #6C5CE7 0%, #00D4FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Schemes Instantly
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg mb-10 max-w-2xl mx-auto"
              style={{ color: "#94A3B8" }}
            >
              Find scholarships, farmer benefits, and government support
              programs across India. Powered by AI to match you with the right
              schemes.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-base transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                  boxShadow:
                    "0 0 30px rgba(108,92,231,0.4), 0 4px 20px rgba(0,0,0,0.3)",
                }}
                data-ocid="landing.primary_button"
              >
                START NOW <ArrowRight size={16} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(108,92,231,0.5)",
                  color: "#a78bfa",
                }}
                data-ocid="landing.secondary_button"
              >
                BROWSE SCHEMES <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Floating category icons */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center gap-3"
            >
              {floatingIcons.map((ic) => (
                <motion.div
                  key={ic.label}
                  variants={item}
                  className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    animation: `float ${6 + ic.delay}s ease-in-out infinite`,
                    animationDelay: `${ic.delay * 0.5}s`,
                  }}
                >
                  <span className="text-2xl">{ic.emoji}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {ic.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Stats ──────────────────────────────────── */}
        <section
          className="py-16 border-y"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {stats.map((s) => (
                <motion.div key={s.label} variants={item}>
                  <div
                    className="text-4xl font-black mb-1"
                    style={{
                      background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Features ──────────────────────────────── */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  background: "rgba(108,92,231,0.1)",
                  border: "1px solid rgba(108,92,231,0.2)",
                  color: "#a78bfa",
                }}
              >
                <Zap size={12} /> Features
              </div>
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                Everything you need to find your benefits
              </h2>
              <p
                className="text-base max-w-xl mx-auto"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Our AI analyzes thousands of government schemes to find the ones
                you qualify for.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    variants={item}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="p-8 rounded-2xl group cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      transition: "box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        `0 0 40px ${f.color}22, 0 0 80px ${f.color}11`;
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        `${f.color}44`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        "none";
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                    data-ocid="landing.card"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background: `${f.color}22`, color: f.color }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {f.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {f.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ──────────────────────────── */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#00D4FF",
                }}
              >
                <Bot size={12} /> How It Works
              </div>
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                Three steps to your benefits
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 mb-12 last:mb-0"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{
                      background: "rgba(108,92,231,0.15)",
                      border: "1px solid rgba(108,92,231,0.3)",
                      color: "#a78bfa",
                    }}
                  >
                    {s.n}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {s.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────── */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(108,92,231,0.2) 0%, rgba(0,212,255,0.1) 100%)",
                border: "1px solid rgba(108,92,231,0.3)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(108,92,231,0.15) 0%, transparent 70%)",
                }}
              />
              <TrendingUp
                className="mx-auto mb-6"
                size={40}
                style={{ color: "#6C5CE7" }}
              />
              <h2
                className="font-display font-black text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                Find your government benefits today
              </h2>
              <p
                className="text-base mb-8 max-w-xl mx-auto"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Join thousands of Indians who discovered schemes they were
                eligible for using YojnaAI.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                  boxShadow: "0 0 30px rgba(108,92,231,0.4)",
                }}
                data-ocid="landing.primary_button"
              >
                Get Started Free <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
