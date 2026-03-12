import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { categoryEmojis, categoryLabels } from "../data/schemes";
import { useSchemesStore } from "../store/schemesStore";

const categoryColors: Record<string, string> = {
  student: "#6C5CE7",
  farmer: "#00b894",
  women: "#fd79a8",
  labour: "#fdcb6e",
  business: "#0984E3",
  senior: "#a29bfe",
  "sc-st": "#e17055",
  disabled: "#74b9ff",
  general: "#00D4FF",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function CategoriesPage() {
  const { schemes } = useSchemesStore();

  const categoryList = Object.entries(categoryLabels).map(([k, v]) => ({
    key: k,
    label: v,
    emoji: categoryEmojis[k] ?? "🇮🇳",
    count: schemes.filter((s) => s.category === k).length,
    color: categoryColors[k] ?? "#6C5CE7",
  }));

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        {/* Header */}
        <div
          className="relative pt-24 pb-16 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.1) 0%, transparent 70%)",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{
                background: "rgba(108,92,231,0.15)",
                border: "1px solid rgba(108,92,231,0.3)",
                color: "#a78bfa",
              }}
            >
              🇮🇳 Browse by Category
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white mb-4"
              style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
            >
              Scheme{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Categories
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Browse government schemes by category. Find what's right for you.
            </motion.p>
          </div>
        </div>

        {/* Category grid */}
        <div className="container mx-auto px-4 pb-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {categoryList.map((c) => (
              <motion.div key={c.key} variants={item}>
                <Link
                  to="/search"
                  search={{ category: c.key } as any}
                  className="block p-8 rounded-2xl group transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      `${c.color}55`;
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      `0 0 40px ${c.color}18`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                  }}
                  data-ocid={`categories.item.${categoryList.indexOf(c) + 1}`}
                >
                  <div className="text-5xl mb-5">{c.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {c.label}
                  </h3>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {c.count > 0
                      ? `${c.count} schemes available`
                      : "Schemes available"}
                  </p>
                  <div
                    className="flex items-center gap-1 text-xs font-medium"
                    style={{ color: c.color }}
                  >
                    Browse schemes <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
