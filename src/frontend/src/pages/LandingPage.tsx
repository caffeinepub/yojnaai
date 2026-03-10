import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Calculator,
  CheckCircle,
  ChevronRight,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy, useEffect, useState } from "react";
import { toast } from "sonner";
import AnimatedCounter from "../components/AnimatedCounter";
import Footer from "../components/Footer";
import { SchemeGridSkeleton } from "../components/LoadingSkeleton";
import PageTransition from "../components/PageTransition";
import SchemeCard from "../components/SchemeCard";
import { useTheme } from "../context/ThemeContext";
import {
  type Scheme,
  categoryEmojis,
  categoryLabels,
  indianStates,
} from "../data/schemes";
import {
  type FindSchemeParams,
  filterSchemes,
  findSchemes,
} from "../services/schemeFinder";
import { useSchemesStore } from "../store/schemesStore";

// ─── Markdown Renderer ────────────────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const processInline = (line: string): React.ReactNode => {
    if (!line.includes("**")) return line;
    const boldParts = line.split("**");
    const nodes: React.ReactNode[] = [];
    for (let idx = 0; idx < boldParts.length; idx++) {
      const part = boldParts[idx];
      if (idx % 2 === 1) {
        nodes.push(
          <strong key={`b${idx}`} className="font-bold">
            {part}
          </strong>,
        );
      } else if (part) {
        nodes.push(part);
      }
    }
    return <>{nodes}</>;
  };

  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      const k = listKey;
      listKey += 1;
      elements.push(
        <ul key={`ul-${k}`} className="list-disc pl-5 space-y-1 my-2">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const ek = elements.length;

    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushList();
      elements.push(
        <hr key={`hr-${ek}`} className="border-current opacity-20 my-3" />,
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${ek}`}
          className="font-bold text-base mt-3 mb-1 ai-heading-3"
        >
          {processInline(trimmed.slice(4))}
        </h3>,
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${ek}`}
          className="font-bold text-lg mt-4 mb-1 ai-heading-2"
        >
          {processInline(trimmed.slice(3))}
        </h2>,
      );
    } else if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={`h1-${ek}`}
          className="font-bold text-xl mt-4 mb-2 ai-heading-1"
        >
          {processInline(trimmed.slice(2))}
        </h1>,
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(
        <li key={`li-${listItems.length}`} className="leading-relaxed">
          {processInline(trimmed.slice(2))}
        </li>,
      );
    } else if (trimmed === "") {
      flushList();
      elements.push(<div key={`sp-${ek}`} className="my-1" />);
    } else {
      flushList();
      elements.push(
        <p key={`p-${ek}`} className="leading-relaxed my-1">
          {processInline(trimmed)}
        </p>,
      );
    }
  }

  flushList();
  return <>{elements}</>;
}
const ParticleField = lazy(() => import("../components/3d/ParticleField"));

const IndiaMap = lazy(() => import("../components/3d/IndiaMap"));

// ─── Ashoka Chakra SVG ────────────────────────────────────────────────────────
function AshokaChakra({
  size = 200,
  color = "#FF6B00",
  opacity = 0.15,
}: { size?: number; color?: string; opacity?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => i);
  return (
    <svg
      role="img"
      aria-label="Ashoka Chakra"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ opacity }}
      className="chakra-spin"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke={color}
        strokeWidth="3"
      />
      <circle cx="100" cy="100" r="12" fill={color} />
      {spokes.map((i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 100 + 12 * Math.cos(angle);
        const y1 = 100 + 12 * Math.sin(angle);
        const x2 = 100 + 87 * Math.cos(angle);
        const y2 = 100 + 87 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
          />
        );
      })}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke={color}
        strokeWidth="6"
      />
    </svg>
  );
}

// ─── DARK MODE SECTIONS ───────────────────────────────────────────────────────

function DarkHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const { schemes } = useSchemesStore();
  const [results, setResults] = useState<Scheme[]>([]);
  const [aiText, setAiText] = useState("");
  const [noLocalMatch, setNoLocalMatch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearched(true);
    setAiText("");
    setNoLocalMatch(false);
    const result = await findSchemes({ query: searchQuery }, schemes);
    setResults(result.schemes.slice(0, 3));
    setAiText(result.aiText ?? "");
    setNoLocalMatch(result.noLocalMatch ?? false);
    setIsSearching(false);
  };

  // Decorative mock preview items for the floating card
  const previewSchemes = [
    {
      name: "PM Kisan Samman",
      badge: "Farmer",
      amount: "₹6,000/yr",
      color: "#22d3ee",
    },
    {
      name: "Ayushman Bharat",
      badge: "Health",
      amount: "₹5L cover",
      color: "#a78bfa",
    },
    {
      name: "PM Scholarship",
      badge: "Student",
      amount: "₹25,000/yr",
      color: "#34d399",
    },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* Background particle layer */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </div>

      {/* Glowing orb blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(108,92,231,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(9,132,227,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          right: "30%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(0,206,201,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column — text + search */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-sm font-semibold"
              style={{
                background: "rgba(108,92,231,0.12)",
                border: "1px solid rgba(108,92,231,0.35)",
                color: "#a78bfa",
              }}
            >
              <Sparkles size={13} className="text-[#22d3ee]" />
              India's #1 AI Scheme Finder
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight mb-5"
            >
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                सरकारी योजनाएं
              </span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                खोजें AI से
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg"
            >
              India's smartest platform to discover every government benefit you
              qualify for. Just describe yourself — AI does the rest.
            </motion.p>

            {/* Glowing search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-8"
            >
              <div
                className="flex gap-2 rounded-2xl p-2 transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  boxShadow: "0 0 0 0 rgba(108,92,231,0)",
                }}
              >
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search size={17} className="text-[#a78bfa] shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. I am a 22-year-old farmer in Bihar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/30 text-sm py-2"
                    data-ocid="hero.search_input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                  style={{
                    background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                    boxShadow: "0 0 20px rgba(108,92,231,0.5)",
                    opacity: isSearching ? 0.7 : 1,
                  }}
                  data-ocid="hero.primary_button"
                >
                  {isSearching ? "Searching..." : "Find Schemes"}
                </button>
              </div>

              {/* Search results */}
              {searched && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {isSearching ? (
                    <div>
                      <SchemeGridSkeleton count={3} />
                      <p className="text-white/40 text-sm text-center mt-3 flex items-center justify-center gap-2">
                        <Sparkles
                          size={13}
                          className="text-[#22d3ee] animate-pulse"
                        />
                        AI se puch raha hun...
                      </p>
                    </div>
                  ) : noLocalMatch && aiText ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl p-5"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(34,211,238,0.25)",
                      }}
                      data-ocid="hero.ai_answer.panel"
                    >
                      <h3 className="text-[#22d3ee] font-semibold mb-3 flex items-center gap-2 text-sm">
                        <Sparkles size={14} /> AI Answer
                      </h3>
                      <div className="text-white/75 text-sm leading-relaxed ai-answer-body">
                        {renderMarkdown(aiText)}
                      </div>
                    </motion.div>
                  ) : noLocalMatch ? (
                    <p
                      className="text-white/40 text-center py-4"
                      data-ocid="hero.empty_state"
                    >
                      Koi scheme nahi mila. AI se try karna...
                    </p>
                  ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {results.map((s, i) => (
                        <SchemeCard key={s.id} scheme={s} index={i} />
                      ))}
                      {aiText && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl p-5 mt-1"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(34,211,238,0.2)",
                          }}
                        >
                          <h3 className="text-[#22d3ee] font-semibold mb-3 flex items-center gap-2 text-sm">
                            <Sparkles size={14} /> AI Additional Suggestions
                          </h3>
                          <div className="text-white/65 text-sm leading-relaxed ai-answer-body">
                            {renderMarkdown(aiText)}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <p
                      className="text-white/40 text-center py-4"
                      data-ocid="hero.empty_state"
                    >
                      No schemes found.
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Stats bar */}
            {!searched && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6"
              >
                {[
                  { num: "150+", label: "Schemes" },
                  { num: "28", label: "States" },
                  { num: "10L+", label: "Users" },
                  { num: "Free", label: "Always" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{
                        background: "rgba(108,92,231,0.15)",
                        color: "#a78bfa",
                        border: "1px solid rgba(108,92,231,0.2)",
                      }}
                    >
                      {s.num.length <= 3 ? s.num : "✓"}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        {s.num}
                      </div>
                      <div className="text-white/40 text-xs">{s.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right column — floating glassmorphism preview card */}
          {!searched && (
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Glow behind card */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(108,92,231,0.25) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    transform: "scale(1.1)",
                  }}
                />

                {/* Main floating card */}
                <div
                  className="relative rounded-3xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-white font-bold text-base">
                        AI Scheme Results
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">
                        Matching your profile
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(34,211,238,0.12)",
                        border: "1px solid rgba(34,211,238,0.25)",
                        color: "#22d3ee",
                      }}
                    >
                      <Sparkles size={11} />
                      AI Active
                    </div>
                  </div>

                  {/* Scheme preview items */}
                  <div className="space-y-3 mb-5">
                    {previewSchemes.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-center justify-between rounded-xl px-4 py-3"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                            style={{
                              background: `${item.color}18`,
                              border: `1px solid ${item.color}35`,
                              color: item.color,
                            }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-white text-sm font-semibold">
                              {item.name}
                            </div>
                            <div
                              className="text-xs px-1.5 py-0.5 rounded-md inline-block mt-0.5"
                              style={{
                                background: `${item.color}15`,
                                color: item.color,
                              }}
                            >
                              {item.badge}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-sm">
                            {item.amount}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="text-white/40 text-xs">
                      Total eligible benefit
                    </div>
                    <div
                      className="font-black text-lg"
                      style={{
                        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ₹5,36,000/yr
                    </div>
                  </div>
                </div>

                {/* Floating badge pill */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 rounded-full px-3 py-1.5 text-xs font-bold text-white flex items-center gap-1.5"
                  style={{
                    background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                    boxShadow: "0 8px 24px rgba(108,92,231,0.5)",
                  }}
                >
                  <TrendingUp size={11} />
                  35+ Schemes
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function DarkSchemeFinderSection() {
  const { schemes } = useSchemesStore();
  const [params, setParams] = useState<FindSchemeParams>({});
  const [nlQuery, setNlQuery] = useState("");
  const [results, setResults] = useState<Scheme[]>([]);
  const [aiText, setAiText] = useState("");
  const [aiSuggested, setAiSuggested] = useState(false);
  const [noLocalMatch, setNoLocalMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleFind = async () => {
    setLoading(true);
    setSearched(true);
    setAiText("");
    setNoLocalMatch(false);
    try {
      const result = await findSchemes(
        { ...params, query: nlQuery || undefined },
        schemes,
      );
      setResults(result.schemes);
      setAiSuggested(result.aiSuggested);
      setAiText(result.aiText ?? "");
      setNoLocalMatch(result.noLocalMatch ?? false);
    } catch {
      toast.error("Search failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section className="py-24 relative" id="finder">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3 block">
            AI Scheme Finder
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Find Your <span className="gradient-text">Perfect Schemes</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Fill in your details or describe yourself — our AI matches you with
            schemes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  State
                </p>
                <Select
                  onValueChange={(v) => setParams((p) => ({ ...p, state: v }))}
                >
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white"
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f30] border-white/10">
                    <SelectItem value="all">All India</SelectItem>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Age
                </p>
                <Input
                  type="number"
                  placeholder="Your age"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      age: Number(e.target.value) || undefined,
                    }))
                  }
                  data-ocid="finder.input"
                />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Category
                </p>
                <Select
                  onValueChange={(v) =>
                    setParams((p) => ({ ...p, category: v }))
                  }
                >
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white"
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f30] border-white/10">
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Occupation
                </p>
                <Select
                  onValueChange={(v) =>
                    setParams((p) => ({ ...p, occupation: v }))
                  }
                >
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white"
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Occupation" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f30] border-white/10">
                    {[
                      "Student",
                      "Farmer",
                      "Labour/Worker",
                      "Business Owner",
                      "Government Employee",
                      "Self Employed",
                      "Homemaker",
                      "Unemployed",
                    ].map((o) => (
                      <SelectItem key={o} value={o.toLowerCase()}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Monthly Income (₹)
                </p>
                <Input
                  type="number"
                  placeholder="e.g. 15000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      income: Number(e.target.value) || undefined,
                    }))
                  }
                  data-ocid="finder.input"
                />
              </div>
            </div>
            <div className="mb-6">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                Or describe yourself in natural language
              </p>
              <Textarea
                placeholder="e.g. I am a 25-year-old SC student from Maharashtra..."
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none min-h-[80px]"
                data-ocid="finder.textarea"
              />
            </div>
            <Button
              onClick={handleFind}
              disabled={loading}
              className="w-full btn-gradient py-3 text-base font-bold rounded-xl"
              data-ocid="finder.submit_button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Sparkles size={18} className="animate-spin" /> Searching with
                  AI...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search size={18} /> Find My Schemes
                </span>
              )}
            </Button>
          </motion.div>

          {loading && <SchemeGridSkeleton count={6} />}
          {!loading && searched && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {noLocalMatch && aiText ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-6 border border-[#00D4FF]/30"
                  data-ocid="finder.ai_answer.panel"
                >
                  <h3 className="text-[#00D4FF] font-semibold mb-3 flex items-center gap-2">
                    <Sparkles size={16} /> AI Answer
                  </h3>
                  <div className="text-white/80 text-sm leading-relaxed ai-answer-body">
                    {renderMarkdown(aiText)}
                  </div>
                </motion.div>
              ) : noLocalMatch ? (
                <div
                  className="text-center py-16"
                  data-ocid="finder.empty_state"
                >
                  <p className="text-white/40 text-lg">
                    No schemes found for your profile.
                  </p>
                  <p className="text-white/30 text-sm mt-2">
                    Try adjusting your filters or using natural language search.
                  </p>
                </div>
              ) : results.length > 0 ? (
                <>
                  <p className="text-white/60 mb-6">
                    Found{" "}
                    <span className="text-white font-semibold">
                      {results.length}
                    </span>{" "}
                    matching schemes
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((s, i) => (
                      <SchemeCard key={s.id} scheme={s} index={i} />
                    ))}
                  </div>
                  {aiSuggested && aiText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 glass rounded-2xl p-6 border border-[#00D4FF]/20"
                    >
                      <h3 className="text-[#00D4FF] font-semibold mb-3 flex items-center gap-2">
                        <Sparkles size={16} /> AI Additional Suggestions
                      </h3>
                      <div className="text-white/70 text-sm leading-relaxed ai-answer-body">
                        {renderMarkdown(aiText)}
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <div
                  className="text-center py-16"
                  data-ocid="finder.empty_state"
                >
                  <p className="text-white/40 text-lg">
                    No schemes found for your profile.
                  </p>
                  <p className="text-white/30 text-sm mt-2">
                    Try adjusting your filters or using natural language search.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function DarkCategoriesSection() {
  const { schemes } = useSchemesStore();
  const categories = Object.entries(categoryLabels)
    .filter(([k]) => k !== "general")
    .map(([key, label]) => ({
      key,
      label,
      emoji: categoryEmojis[key] ?? "🇮🇳",
      count: schemes.filter((s) => s.category === key).length,
    }));

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6C5CE7]/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3 block">
            Browse by Category
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Find Schemes <span className="gradient-text">For You</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <Link
                to="/schemes/$category"
                params={{ category: cat.key }}
                className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#6C5CE7]/40 transition-all duration-300 hover:glow-purple block"
                data-ocid="category.link"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {cat.label}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {cat.count} schemes
                  </p>
                </div>
                <ChevronRight size={14} className="text-[#6C5CE7]/60" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkFeaturedSection() {
  const { schemes } = useSchemesStore();
  const featured = schemes
    .filter((s) => s.benefit_amount_numeric >= 10000)
    .slice(0, 6);
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3 block">
            Most Popular
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Popular <span className="gradient-text">Government Schemes</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s, i) => (
            <SchemeCard key={s.id} scheme={s} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/schemes/$category"
            params={{ category: "general" }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl text-white/80 hover:text-white hover:border-[#6C5CE7]/40 transition-all"
            data-ocid="featured.link"
          >
            View All Schemes <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DarkBenefitsCalculator() {
  const { schemes } = useSchemesStore();
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const [matched, setMatched] = useState<Scheme[]>([]);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const filtered = filterSchemes(
      {
        state: state || undefined,
        age: age ? Number(age) : undefined,
        category: category || undefined,
        income: income ? Number(income) : undefined,
      },
      schemes,
    );
    setMatched(filtered);
    setTotal(filtered.reduce((sum, s) => sum + s.benefit_amount_numeric, 0));
    setCalculated(true);
  };

  const handleShare = async () => {
    if (total === null) return;
    const text = `🇮🇳 I discovered I'm eligible for ₹${total.toLocaleString("en-IN")} worth of Indian government benefits via YojnaAI!\n\n📊 ${matched.length} schemes matched my profile.\n✅ Top scheme: ${matched[0]?.name ?? ""}\n\n🔗 Check your benefits: ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Share text copied! 🎉", { duration: 3000 });
    } catch {
      toast.error("Could not copy.");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/5 via-transparent to-[#00D4FF]/5 pointer-events-none" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-[#00D4FF] text-sm">
            <Calculator size={14} />
            Viral Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Check Your{" "}
            <span className="gradient-text">Government Benefits</span>
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Discover the total value of government schemes you're eligible for.
          </p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 mb-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  State
                </p>
                <Select onValueChange={setState}>
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white"
                    data-ocid="calculator.select"
                  >
                    <SelectValue placeholder="Your state" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f30] border-white/10">
                    <SelectItem value="all">All India</SelectItem>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Age
                </p>
                <Input
                  type="number"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  data-ocid="calculator.input"
                />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Category
                </p>
                <Select onValueChange={setCategory}>
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white"
                    data-ocid="calculator.select"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f30] border-white/10">
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1.5">
                  Monthly Income (₹)
                </p>
                <Input
                  type="number"
                  placeholder="e.g. 15000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  data-ocid="calculator.input"
                />
              </div>
            </div>
            <Button
              onClick={handleCalculate}
              className="w-full btn-gradient py-3 text-base font-bold rounded-xl"
              data-ocid="calculator.submit_button"
            >
              <Calculator size={18} className="mr-2" /> Calculate My Benefits
            </Button>
          </motion.div>
          {calculated && total !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 border border-[#6C5CE7]/20"
              data-ocid="calculator.success_state"
            >
              <div className="text-center mb-8">
                <p className="text-white/60 text-sm mb-2">
                  You are eligible for
                </p>
                <div className="text-5xl md:text-6xl font-black gradient-text mb-2">
                  ₹{total.toLocaleString("en-IN")}
                </div>
                <p className="text-white/60 text-sm">
                  worth of government benefits
                </p>
                <p className="text-white/40 text-xs mt-1">
                  across {matched.length} schemes
                </p>
              </div>
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                {matched.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        size={14}
                        className="text-[#6C5CE7] shrink-0"
                      />
                      <span className="text-white/70 text-sm">{s.name}</span>
                    </div>
                    <span className="text-[#00D4FF] text-sm font-semibold">
                      ₹{s.benefit_amount_numeric.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full border-[#6C5CE7]/40 text-[#6C5CE7] hover:bg-[#6C5CE7]/10"
                data-ocid="calculator.secondary_button"
              >
                <Share2 size={16} className="mr-2" /> Share My Benefits
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function DarkHowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Enter Your Profile",
      description:
        "Fill in your state, age, occupation, income, and category — or just describe yourself in natural language.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Matches Schemes",
      description:
        "Our AI engine scans 35+ government schemes and intelligently matches them to your unique profile.",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Apply & Benefit",
      description:
        "Get step-by-step guidance on eligibility, required documents, and direct links to official apply portals.",
    },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#00D4FF] text-sm font-semibold uppercase tracking-widest mb-3 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            3 Steps to <span className="gradient-text">Your Benefits</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute top-16 left-[16.666%] right-[16.666%] h-px bg-gradient-to-r from-[#6C5CE7] via-[#00D4FF] to-[#6C5CE7] opacity-30" />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-8 text-center relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#00D4FF] flex items-center justify-center mx-auto mb-4">
                <step.icon size={22} className="text-white" />
              </div>
              <div className="text-5xl font-black gradient-text opacity-30 mb-3">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LIGHT MODE SECTIONS ──────────────────────────────────────────────────────

function LightHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const { schemes } = useSchemesStore();
  const [results, setResults] = useState<Scheme[]>([]);
  const [aiText, setAiText] = useState("");
  const [noLocalMatch, setNoLocalMatch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearched(true);
    setAiText("");
    setNoLocalMatch(false);
    const result = await findSchemes({ query: searchQuery }, schemes);
    setResults(result.schemes.slice(0, 3));
    setAiText(result.aiText ?? "");
    setNoLocalMatch(result.noLocalMatch ?? false);
    setIsSearching(false);
  };

  const stats = [
    { value: 35, suffix: "+", label: "Schemes" },
    { value: 28, suffix: "", label: "States" },
    { value: 7, suffix: "", label: "Categories" },
    { value: 50, prefix: "₹", suffix: "L+" },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fffdf9 0%, #fff8f0 50%, #f0fff4 100%)",
      }}
    >
      {/* Decorative floating circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full float-slow"
          style={{
            background:
              "radial-gradient(circle, rgba(19,136,8,0.07) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,26,46,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Ashoka Chakra - top right */}
      <div className="absolute top-16 right-8 md:right-16 pointer-events-none">
        <AshokaChakra size={220} color="#FF6B00" opacity={0.12} />
      </div>
      {/* Small Chakra - bottom left */}
      <div className="absolute bottom-16 left-8 pointer-events-none">
        <AshokaChakra size={120} color="#138808" opacity={0.1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-sm font-medium"
            style={{
              background: "rgba(255,107,0,0.1)",
              color: "#FF6B00",
              border: "1px solid rgba(255,107,0,0.25)",
            }}
          >
            <Sparkles size={14} />
            भारत सरकार की योजनाएं — AI-Powered
          </motion.div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            style={{ color: "#1a1a2e" }}
          >
            अपनी सरकारी <span className="gradient-text-light">योजनाएं</span>
            <br />
            <span style={{ color: "#1a1a2e" }}>खोजें </span>
            <span className="gradient-text-light">AI से</span>
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#555" }}
          >
            India's most powerful platform to discover all government schemes
            you qualify for. Just describe yourself — our AI does the rest.
          </p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div
              className="flex gap-2 rounded-2xl p-2"
              style={{
                background: "white",
                boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                border: "2px solid transparent",
              }}
            >
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search
                  size={18}
                  style={{ color: "#FF6B00" }}
                  className="shrink-0"
                />
                <input
                  type="text"
                  placeholder="e.g. I am a 22-year-old farmer in Bihar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 bg-transparent border-none outline-none text-sm py-2"
                  style={{ color: "#1a1a2e" }}
                  data-ocid="hero.search_input"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="btn-saffron rounded-xl px-6 font-semibold shrink-0 text-sm text-white"
                data-ocid="hero.primary_button"
              >
                {isSearching ? "Searching..." : "Find Schemes"}
              </button>
            </div>

            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-left"
              >
                {isSearching ? (
                  <div>
                    <SchemeGridSkeleton count={3} />
                    <p
                      className="text-sm text-center mt-3 flex items-center justify-center gap-2"
                      style={{ color: "#138808" }}
                    >
                      <Sparkles size={13} className="animate-pulse" />
                      AI se puch raha hun...
                    </p>
                  </div>
                ) : noLocalMatch && aiText ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-5"
                    style={{
                      background: "#fff",
                      border: "1px solid rgba(19,136,8,0.25)",
                      boxShadow: "0 4px 20px rgba(19,136,8,0.1)",
                    }}
                    data-ocid="hero.ai_answer.panel"
                  >
                    <h3
                      className="font-semibold mb-3 flex items-center gap-2 text-sm"
                      style={{ color: "#138808" }}
                    >
                      <Sparkles size={14} /> AI Answer
                    </h3>
                    <div
                      className="text-sm leading-relaxed ai-answer-body"
                      style={{ color: "#444" }}
                    >
                      {renderMarkdown(aiText)}
                    </div>
                  </motion.div>
                ) : noLocalMatch ? (
                  <p
                    className="text-center py-4"
                    style={{ color: "#aaa" }}
                    data-ocid="hero.empty_state"
                  >
                    Koi scheme nahi mila. Neeche detailed finder try karo.
                  </p>
                ) : results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {results.map((s, i) => (
                      <SchemeCard key={s.id} scheme={s} index={i} />
                    ))}
                    {aiText && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl p-5 mt-1"
                        style={{
                          background: "#fff",
                          border: "1px solid rgba(19,136,8,0.2)",
                          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                      >
                        <h3
                          className="font-semibold mb-3 flex items-center gap-2 text-sm"
                          style={{ color: "#138808" }}
                        >
                          <Sparkles size={14} /> AI Additional Suggestions
                        </h3>
                        <div
                          className="text-sm leading-relaxed ai-answer-body"
                          style={{ color: "#555" }}
                        >
                          {renderMarkdown(aiText)}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <p
                    className="text-center py-4"
                    style={{ color: "#aaa" }}
                    data-ocid="hero.empty_state"
                  >
                    No schemes found. Try the detailed finder below.
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-2xl"
                style={{
                  background: "white",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="text-3xl font-black"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(135deg, #FF6B00, #e55b00)"
                        : "linear-gradient(135deg, #138808, #0e6a06)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix ?? ""}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm mt-1" style={{ color: "#888" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function LightSchemeFinderSection() {
  const { schemes } = useSchemesStore();
  const [params, setParams] = useState<FindSchemeParams>({});
  const [nlQuery, setNlQuery] = useState("");
  const [results, setResults] = useState<Scheme[]>([]);
  const [aiText, setAiText] = useState("");
  const [aiSuggested, setAiSuggested] = useState(false);
  const [noLocalMatch, setNoLocalMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleFind = async () => {
    setLoading(true);
    setSearched(true);
    setAiText("");
    setNoLocalMatch(false);
    try {
      const result = await findSchemes(
        { ...params, query: nlQuery || undefined },
        schemes,
      );
      setResults(result.schemes);
      setAiSuggested(result.aiSuggested);
      setAiText(result.aiText ?? "");
      setNoLocalMatch(result.noLocalMatch ?? false);
    } catch {
      toast.error("Search failed.");
    }
    setLoading(false);
  };

  return (
    <section className="py-24" id="finder" style={{ background: "#FFF8F0" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#FF6B00" }}
          >
            AI Scheme Finder
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#1a1a2e" }}
          >
            Find Your{" "}
            <span className="gradient-text-light">Perfect Schemes</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "#666" }}>
            Fill in your details — our AI matches you with the right schemes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 mb-8"
            style={{
              background: "white",
              boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  State
                </p>
                <Select
                  onValueChange={(v) => setParams((p) => ({ ...p, state: v }))}
                >
                  <SelectTrigger
                    className="border-2"
                    style={{ borderColor: "rgba(255,107,0,0.2)" }}
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Age
                </p>
                <Input
                  type="number"
                  placeholder="Your age"
                  className="border-2"
                  style={{ borderColor: "rgba(255,107,0,0.2)" }}
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      age: Number(e.target.value) || undefined,
                    }))
                  }
                  data-ocid="finder.input"
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Category
                </p>
                <Select
                  onValueChange={(v) =>
                    setParams((p) => ({ ...p, category: v }))
                  }
                >
                  <SelectTrigger
                    className="border-2"
                    style={{ borderColor: "rgba(255,107,0,0.2)" }}
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Occupation
                </p>
                <Select
                  onValueChange={(v) =>
                    setParams((p) => ({ ...p, occupation: v }))
                  }
                >
                  <SelectTrigger
                    className="border-2"
                    style={{ borderColor: "rgba(255,107,0,0.2)" }}
                    data-ocid="finder.select"
                  >
                    <SelectValue placeholder="Occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Student",
                      "Farmer",
                      "Labour/Worker",
                      "Business Owner",
                      "Government Employee",
                      "Self Employed",
                      "Homemaker",
                      "Unemployed",
                    ].map((o) => (
                      <SelectItem key={o} value={o.toLowerCase()}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Monthly Income (₹)
                </p>
                <Input
                  type="number"
                  placeholder="e.g. 15000"
                  className="border-2"
                  style={{ borderColor: "rgba(255,107,0,0.2)" }}
                  onChange={(e) =>
                    setParams((p) => ({
                      ...p,
                      income: Number(e.target.value) || undefined,
                    }))
                  }
                  data-ocid="finder.input"
                />
              </div>
            </div>
            <div className="mb-6">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "#888" }}
              >
                Or describe yourself in natural language
              </p>
              <Textarea
                placeholder="e.g. I am a 25-year-old SC student from Maharashtra..."
                value={nlQuery}
                onChange={(e) => setNlQuery(e.target.value)}
                className="border-2 resize-none min-h-[80px]"
                style={{ borderColor: "rgba(255,107,0,0.2)" }}
                data-ocid="finder.textarea"
              />
            </div>
            <button
              type="button"
              onClick={handleFind}
              disabled={loading}
              className="w-full btn-saffron py-3 text-base font-bold rounded-xl"
              data-ocid="finder.submit_button"
            >
              {loading ? "Searching with AI..." : "Find My Schemes"}
            </button>
          </motion.div>

          {loading && <SchemeGridSkeleton count={6} />}
          {!loading && searched && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {noLocalMatch && aiText ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: "white",
                    border: "1px solid rgba(19,136,8,0.25)",
                    boxShadow: "0 4px 20px rgba(19,136,8,0.1)",
                  }}
                  data-ocid="finder.ai_answer.panel"
                >
                  <h3
                    className="font-semibold mb-3 flex items-center gap-2"
                    style={{ color: "#138808" }}
                  >
                    <Sparkles size={16} /> AI Answer
                  </h3>
                  <div
                    className="text-sm leading-relaxed ai-answer-body"
                    style={{ color: "#444" }}
                  >
                    {renderMarkdown(aiText)}
                  </div>
                </motion.div>
              ) : noLocalMatch ? (
                <div
                  className="text-center py-16"
                  data-ocid="finder.empty_state"
                >
                  <p className="text-lg" style={{ color: "#aaa" }}>
                    No schemes found for your profile.
                  </p>
                  <p className="text-sm mt-2" style={{ color: "#bbb" }}>
                    Try adjusting your filters.
                  </p>
                </div>
              ) : results.length > 0 ? (
                <>
                  <p className="mb-6" style={{ color: "#666" }}>
                    Found{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "#1a1a2e" }}
                    >
                      {results.length}
                    </span>{" "}
                    matching schemes
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((s, i) => (
                      <SchemeCard key={s.id} scheme={s} index={i} />
                    ))}
                  </div>
                  {aiSuggested && aiText && (
                    <div
                      className="mt-8 rounded-2xl p-6"
                      style={{
                        background: "white",
                        border: "1px solid rgba(19,136,8,0.2)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      }}
                    >
                      <h3
                        className="font-semibold mb-3 flex items-center gap-2"
                        style={{ color: "#138808" }}
                      >
                        <Sparkles size={16} /> AI Additional Suggestions
                      </h3>
                      <div
                        className="text-sm leading-relaxed ai-answer-body"
                        style={{ color: "#555" }}
                      >
                        {renderMarkdown(aiText)}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="text-center py-16"
                  data-ocid="finder.empty_state"
                >
                  <p className="text-lg" style={{ color: "#aaa" }}>
                    No schemes found for your profile.
                  </p>
                  <p className="text-sm mt-2" style={{ color: "#bbb" }}>
                    Try adjusting your filters.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function LightCategoriesSection() {
  const { schemes } = useSchemesStore();
  const categories = Object.entries(categoryLabels)
    .filter(([k]) => k !== "general")
    .map(([key, label]) => ({
      key,
      label,
      emoji: categoryEmojis[key] ?? "🇮🇳",
      count: schemes.filter((s) => s.category === key).length,
    }));

  const borderColors = [
    "#FF6B00",
    "#138808",
    "#1a1a2e",
    "#c0392b",
    "#FF6B00",
    "#138808",
    "#1a1a2e",
  ];

  return (
    <section className="py-24" style={{ background: "white" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#FF6B00" }}
          >
            Browse by Category
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: "#1a1a2e" }}
          >
            Find Schemes <span className="gradient-text-light">For You</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to="/schemes/$category"
                params={{ category: cat.key }}
                className="rounded-2xl p-5 flex flex-col items-center text-center gap-3 block transition-all"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderLeft: `4px solid ${borderColors[i % borderColors.length]}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 30px rgba(255,107,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.06)";
                }}
                data-ocid="category.link"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#1a1a2e" }}
                  >
                    {cat.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#aaa" }}>
                    {cat.count} schemes
                  </p>
                </div>
                <ChevronRight
                  size={14}
                  style={{ color: borderColors[i % borderColors.length] }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LightFeaturedSection() {
  const { schemes } = useSchemesStore();
  const featured = schemes
    .filter((s) => s.benefit_amount_numeric >= 10000)
    .slice(0, 6);
  return (
    <section className="py-24" style={{ background: "#F0FFF4" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#138808" }}
          >
            Most Popular
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: "#1a1a2e" }}
          >
            Popular{" "}
            <span className="gradient-text-light">Government Schemes</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s, i) => (
            <SchemeCard key={s.id} scheme={s} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/schemes/$category"
            params={{ category: "general" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-white"
            style={{ background: "linear-gradient(135deg, #138808, #0e6a06)" }}
            data-ocid="featured.link"
          >
            View All Schemes <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LightBenefitsCalculator() {
  const { schemes } = useSchemesStore();
  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [income, setIncome] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const [matched, setMatched] = useState<Scheme[]>([]);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const filtered = filterSchemes(
      {
        state: state || undefined,
        age: age ? Number(age) : undefined,
        category: category || undefined,
        income: income ? Number(income) : undefined,
      },
      schemes,
    );
    setMatched(filtered);
    setTotal(filtered.reduce((sum, s) => sum + s.benefit_amount_numeric, 0));
    setCalculated(true);
  };

  const handleShare = async () => {
    if (total === null) return;
    const text = `🇮🇳 I discovered I'm eligible for ₹${total.toLocaleString("en-IN")} worth of Indian government benefits via YojnaAI!\n\n📊 ${matched.length} schemes matched.\n✅ Top: ${matched[0]?.name ?? ""}\n\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied! 🎉");
    } catch {
      toast.error("Could not copy.");
    }
  };

  return (
    <section className="py-24" style={{ background: "white" }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-sm"
            style={{
              background: "rgba(255,107,0,0.08)",
              color: "#FF6B00",
              border: "1px solid rgba(255,107,0,0.2)",
            }}
          >
            <Calculator size={14} />
            Benefits Calculator
          </div>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "#1a1a2e" }}
          >
            Check Your{" "}
            <span className="gradient-text-light">Government Benefits</span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "#666" }}>
            Discover the total value of government schemes you're eligible for.
          </p>
        </motion.div>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 mb-6"
            style={{
              background: "#FAFAFA",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  State
                </p>
                <Select onValueChange={setState}>
                  <SelectTrigger data-ocid="calculator.select">
                    <SelectValue placeholder="Your state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All India</SelectItem>
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Age
                </p>
                <Input
                  type="number"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  data-ocid="calculator.input"
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Category
                </p>
                <Select onValueChange={setCategory}>
                  <SelectTrigger data-ocid="calculator.select">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "#888" }}
                >
                  Monthly Income (₹)
                </p>
                <Input
                  type="number"
                  placeholder="e.g. 15000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  data-ocid="calculator.input"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full btn-saffron py-3 text-base font-bold rounded-xl"
              data-ocid="calculator.submit_button"
            >
              Calculate My Benefits
            </button>
          </motion.div>

          {calculated && total !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-8"
              style={{
                background: "white",
                border: "1px solid rgba(19,136,8,0.2)",
                boxShadow: "0 4px 24px rgba(19,136,8,0.1)",
              }}
              data-ocid="calculator.success_state"
            >
              <div className="text-center mb-8">
                <p className="text-sm mb-2" style={{ color: "#666" }}>
                  You are eligible for
                </p>
                <div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{
                    background: "linear-gradient(135deg, #FF6B00, #138808)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ₹{total.toLocaleString("en-IN")}
                </div>
                <p className="text-sm" style={{ color: "#666" }}>
                  worth of government benefits across {matched.length} schemes
                </p>
              </div>
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                {matched.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        size={14}
                        style={{ color: "#138808" }}
                        className="shrink-0"
                      />
                      <span className="text-sm" style={{ color: "#555" }}>
                        {s.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#138808" }}
                    >
                      ₹{s.benefit_amount_numeric.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all"
                style={{
                  border: "2px solid #138808",
                  color: "#138808",
                  background: "transparent",
                }}
                data-ocid="calculator.secondary_button"
              >
                <Share2 size={16} className="inline mr-2" /> Share My Benefits
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function LightHowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Enter Your Profile",
      description:
        "Fill in your state, age, occupation, income, and category — or just describe yourself in natural language.",
      color: "#FF6B00",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Matches Schemes",
      description:
        "Our AI engine scans 35+ government schemes and intelligently matches them to your unique profile.",
      color: "#138808",
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Apply & Benefit",
      description:
        "Get step-by-step guidance on eligibility, required documents, and direct links to official apply portals.",
      color: "#1a1a2e",
    },
  ];
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#FFF8F0" }}
    >
      {/* Timeline connector */}
      <div
        className="hidden md:block absolute top-[calc(50%)] left-[20%] right-[20%] h-1 rounded-full"
        style={{
          background: "linear-gradient(90deg, #FF6B00, #138808)",
          opacity: 0.3,
        }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: "#FF6B00" }}
          >
            How It Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: "#1a1a2e" }}
          >
            3 Steps to{" "}
            <span className="gradient-text-light">Your Benefits</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-8 text-center"
              style={{
                background: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: `2px solid ${step.color}20`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `${step.color}15`,
                  border: `2px solid ${step.color}30`,
                }}
              >
                <step.icon size={24} style={{ color: step.color }} />
              </div>
              <div
                className="text-4xl font-black mb-3"
                style={{ color: `${step.color}30` }}
              >
                {step.number}
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#1a1a2e" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    document.title = "YojnaAI - Discover Indian Government Schemes with AI";
  }, []);

  return (
    <PageTransition>
      <main style={{ background: isDark ? "#0B0F1A" : "#FAFAFA" }}>
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DarkHeroSection />
              <DarkSchemeFinderSection />
              <DarkCategoriesSection />
              <DarkFeaturedSection />
              <Suspense fallback={<div style={{ height: 500 }} />}>
                <IndiaMap />
              </Suspense>
              <DarkBenefitsCalculator />
              <DarkHowItWorks />
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LightHeroSection />
              <LightSchemeFinderSection />
              <LightCategoriesSection />
              <LightFeaturedSection />
              <Suspense
                fallback={
                  <div style={{ height: 500, background: "#FFF8F0" }} />
                }
              >
                <IndiaMap />
              </Suspense>
              <LightBenefitsCalculator />
              <LightHowItWorks />
            </motion.div>
          )}
        </AnimatePresence>
        <Footer />
      </main>
    </PageTransition>
  );
}
