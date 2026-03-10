import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle,
  ExternalLink,
  FileText,
  IndianRupee,
  MapPin,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import SchemeCard from "../components/SchemeCard";
import { categoryEmojis, categoryLabels } from "../data/schemes";
import { useSchemesStore } from "../store/schemesStore";

export default function SchemePage() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug ?? "";
  const { schemes } = useSchemesStore();

  const scheme = schemes.find((s) => s.slug === slug);
  const related = scheme
    ? schemes
        .filter((s) => s.category === scheme.category && s.id !== scheme.id)
        .slice(0, 3)
    : [];

  useEffect(() => {
    // Scroll to top on every scheme page load / slug change
    window.scrollTo({ top: 0, behavior: "instant" });

    if (scheme) {
      document.title = `${scheme.name} - YojnaAI`;

      // Schema.org JSON-LD
      const existing = document.getElementById("scheme-jsonld");
      if (existing) existing.remove();

      const script = document.createElement("script");
      script.id = "scheme-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "GovernmentService",
        name: scheme.name,
        description: scheme.description,
        provider: {
          "@type": "GovernmentOrganization",
          name: "Government of India",
        },
        serviceType: categoryLabels[scheme.category] ?? scheme.category,
        areaServed: scheme.state === "all" ? "India" : scheme.state,
        url: scheme.apply_link,
      });
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById("scheme-jsonld");
      if (s) s.remove();
    };
  }, [scheme]);

  if (!scheme) {
    return (
      <main
        style={{ background: "#0B0F1A", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-white/40 text-2xl mb-4">Scheme not found</p>
          <Link
            to="/"
            className="text-[#6C5CE7] hover:text-[#00D4FF]"
            data-ocid="scheme.link"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
              <Link
                to="/"
                className="hover:text-white transition-colors"
                data-ocid="scheme.link"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                to="/schemes/$category"
                params={{ category: scheme.category }}
                className="hover:text-white transition-colors"
                data-ocid="scheme.link"
              >
                {categoryLabels[scheme.category]}
              </Link>
              <span>/</span>
              <span className="text-white/70 line-clamp-1">{scheme.name}</span>
            </nav>

            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 mb-8 border border-[#6C5CE7]/20"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge
                  variant="outline"
                  className="border-[#6C5CE7]/40 text-[#a78bfa]"
                >
                  {categoryEmojis[scheme.category]}{" "}
                  {categoryLabels[scheme.category]}
                </Badge>
                {scheme.state !== "all" && (
                  <Badge
                    variant="outline"
                    className="border-white/20 text-white/60"
                  >
                    <MapPin size={11} className="mr-1" /> {scheme.state}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
                {scheme.name}
              </h1>
              <p className="text-white/65 leading-relaxed mb-6">
                {scheme.description}
              </p>

              {/* Benefit highlight */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#6C5CE7]/20 to-[#00D4FF]/10 rounded-2xl px-6 py-4 mb-6 border border-[#6C5CE7]/20">
                <IndianRupee size={24} className="text-[#00D4FF]" />
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider">
                    Benefit Amount
                  </p>
                  <p className="text-[#00D4FF] text-xl font-bold">
                    {scheme.benefit}
                  </p>
                </div>
              </div>

              {/* Apply CTA */}
              <a
                href={scheme.apply_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className="btn-gradient px-8 py-3 text-base font-bold rounded-xl"
                  data-ocid="scheme.primary_button"
                >
                  Apply Now <ExternalLink size={16} className="ml-2" />
                </Button>
              </a>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Eligibility */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-[#6C5CE7]" />{" "}
                  Eligibility Criteria
                </h2>
                <p className="text-white/65 text-sm leading-relaxed">
                  {scheme.eligibility}
                </p>
              </motion.div>

              {/* Documents */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-2xl p-6"
              >
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-[#00D4FF]" /> Required
                  Documents
                </h2>
                <ul className="space-y-2">
                  {scheme.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-2 text-sm text-white/65"
                    >
                      <span className="text-[#6C5CE7] mt-0.5">•</span> {doc}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 mb-12"
            >
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Tag size={20} className="text-[#6C5CE7]" /> Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {scheme.tags.map((tag) => (
                  <span
                    key={tag}
                    className="glass px-3 py-1 rounded-full text-xs text-white/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Related schemes */}
            {related.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Related <span className="gradient-text">Schemes</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((s, i) => (
                    <SchemeCard key={s.id} scheme={s} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
