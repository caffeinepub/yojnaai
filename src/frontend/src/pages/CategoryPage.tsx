import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Layers } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import SchemeCard from "../components/SchemeCard";
import { categoryEmojis, categoryLabels } from "../data/schemes";
import { useSchemesStore } from "../store/schemesStore";

export default function CategoryPage() {
  const params = useParams({ strict: false }) as { category?: string };
  const category = params.category ?? "general";
  const { schemes } = useSchemesStore();

  const label = categoryLabels[category] ?? category;
  const emoji = categoryEmojis[category] ?? "🇮🇳";

  const filtered = schemes.filter(
    (s) =>
      s.category === category ||
      (category === "general" && s.category === "general"),
  );

  useEffect(() => {
    document.title = `${label} Schemes - YojnaAI`;
    const desc = document.querySelector("meta[name='description']");
    if (desc)
      desc.setAttribute(
        "content",
        `Find all ${label} government schemes in India on YojnaAI`,
      );
  }, [label]);

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        {/* Hero */}
        <div className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 via-transparent to-[#00D4FF]/5 pointer-events-none" />
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors"
              data-ocid="category.link"
            >
              <ArrowLeft size={14} /> Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-6xl">{emoji}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white">
                  <span className="gradient-text">{label}</span> Schemes
                </h1>
                <p className="text-white/50 mt-2">
                  {filtered.length} government schemes for {label.toLowerCase()}{" "}
                  in India
                </p>
              </div>
            </motion.div>

            {/* Category nav */}
            <div className="flex flex-wrap gap-2 mt-6">
              {Object.entries(categoryLabels).map(([k, v]) => (
                <Link
                  key={k}
                  to="/schemes/$category"
                  params={{ category: k }}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                    k === category
                      ? "bg-[#6C5CE7] text-white"
                      : "glass text-white/60 hover:text-white"
                  }`}
                  data-ocid="category.tab"
                >
                  {categoryEmojis[k]} {v}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Schemes grid */}
        <div className="container mx-auto px-4 pb-24">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((scheme, i) => (
                <SchemeCard key={scheme.id} scheme={scheme} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="text-center py-24 glass rounded-2xl"
              data-ocid="category.empty_state"
            >
              <Layers size={48} className="text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-xl">
                No schemes found in this category
              </p>
              <p className="text-white/30 text-sm mt-2">
                Try browsing a different category
              </p>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
