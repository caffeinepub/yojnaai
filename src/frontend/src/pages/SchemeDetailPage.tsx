import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  FileText,
  Share2,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { categoryEmojis, categoryLabels } from "../data/schemes";
import { useSchemesStore } from "../store/schemesStore";

export default function SchemeDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { schemes } = useSchemesStore();
  const scheme = schemes.find((s) => s.slug === slug);

  useEffect(() => {
    if (scheme) {
      document.title = `${scheme.name} - YojnaAI`;
    }
  }, [scheme]);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: scheme?.name ?? "YojnaAI Scheme", url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!scheme) {
    return (
      <PageTransition>
        <main
          style={{ background: "#0B0F1A", minHeight: "100vh" }}
          className="pt-24"
        >
          <div className="container mx-auto px-4 text-center py-20">
            <p className="text-6xl mb-6">🔍</p>
            <h1 className="text-2xl font-bold text-white mb-4">
              Scheme Not Found
            </h1>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              This scheme doesn't exist or was removed.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#6C5CE7,#0984E3)" }}
              data-ocid="scheme.link"
            >
              <ArrowLeft size={16} /> Back to Search
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        {/* Hero */}
        <div
          className="relative pt-24 pb-12 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.05)",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.08) 0%, transparent 70%)",
          }}
        >
          <div className="container mx-auto px-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.45)" }}
              data-ocid="scheme.link"
            >
              <ArrowLeft size={14} /> Back to Search
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(108,92,231,0.15)",
                        color: "#a78bfa",
                        border: "1px solid rgba(108,92,231,0.25)",
                      }}
                    >
                      {categoryEmojis[scheme.category] ?? ""}{" "}
                      {categoryLabels[scheme.category] ?? scheme.category}
                    </span>
                    {scheme.state !== "all" && (
                      <span
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(0,212,255,0.08)",
                          color: "rgba(0,212,255,0.8)",
                          border: "1px solid rgba(0,212,255,0.15)",
                        }}
                      >
                        {scheme.state}
                      </span>
                    )}
                  </div>
                  <h1
                    className="font-display font-black text-white mb-3"
                    style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}
                  >
                    {scheme.name}
                  </h1>
                  <p
                    className="text-base mb-4"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {scheme.description}
                  </p>
                </div>

                <div
                  className="flex-shrink-0 p-5 rounded-2xl min-w-40"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.15)",
                  }}
                >
                  <p
                    className="text-xs mb-1"
                    style={{ color: "rgba(0,212,255,0.6)" }}
                  >
                    Benefit Amount
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{ color: "#00D4FF" }}
                  >
                    {scheme.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Body */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Eligibility */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} style={{ color: "#6C5CE7" }} />
                  <h2 className="text-base font-bold text-white">
                    Eligibility Criteria
                  </h2>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {scheme.eligibility}
                </p>
              </motion.div>

              {/* Required Documents */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={18} style={{ color: "#00D4FF" }} />
                  <h2 className="text-base font-bold text-white">
                    Required Documents
                  </h2>
                </div>
                <ul className="space-y-2">
                  {(Array.isArray(scheme.documents)
                    ? scheme.documents
                    : [scheme.documents]
                  ).map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "#00D4FF" }}
                      />
                      {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tags */}
              {scheme.tags && scheme.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={18} style={{ color: "#a78bfa" }} />
                    <h2 className="text-base font-bold text-white">Tags</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scheme.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Apply button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <a
                  href={scheme.apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 mb-3"
                  style={{
                    background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                    boxShadow: "0 0 20px rgba(108,92,231,0.3)",
                  }}
                  data-ocid="scheme.primary_button"
                >
                  Apply Now <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                  data-ocid="scheme.secondary_button"
                >
                  <Share2 size={14} /> Share Scheme
                </button>
              </motion.div>

              {/* Quick info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-5 rounded-2xl space-y-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3 className="text-sm font-bold text-white">Quick Info</h3>
                {[
                  {
                    label: "Category",
                    value: categoryLabels[scheme.category] ?? scheme.category,
                  },
                  {
                    label: "State",
                    value: scheme.state === "all" ? "All India" : scheme.state,
                  },
                  { label: "Benefit", value: scheme.benefit },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="flex justify-between text-xs"
                  >
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>
                      {info.label}
                    </span>
                    <span className="text-white font-medium">{info.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
