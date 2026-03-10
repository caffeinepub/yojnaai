import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, FileCheck, IndianRupee } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";
import { type Scheme, categoryEmojis, categoryLabels } from "../data/schemes";

interface SchemeCardProps {
  scheme: Scheme;
  index?: number;
  showAIBadge?: boolean;
}

export default function SchemeCard({
  scheme,
  index = 0,
  showAIBadge = false,
}: SchemeCardProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  if (isLight) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300"
        style={{
          background: "#ffffff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 30px rgba(255,107,0,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 2px 12px rgba(0,0,0,0.08)";
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl">
              {categoryEmojis[scheme.category] ?? "🇮🇳"}
            </span>
            <Badge
              variant="outline"
              className="text-xs font-semibold"
              style={{
                borderColor: "rgba(255,107,0,0.4)",
                color: "#FF6B00",
                background: "rgba(255,107,0,0.06)",
              }}
            >
              {categoryLabels[scheme.category] ?? scheme.category}
            </Badge>
            {scheme.state !== "all" && (
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: "rgba(19,136,8,0.3)",
                  color: "#138808",
                  background: "rgba(19,136,8,0.05)",
                }}
              >
                {scheme.state}
              </Badge>
            )}
            {showAIBadge && (
              <Badge
                className="text-xs"
                style={{
                  background: "rgba(19,136,8,0.1)",
                  color: "#138808",
                  border: "1px solid rgba(19,136,8,0.3)",
                }}
              >
                ✨ AI Suggested
              </Badge>
            )}
          </div>
        </div>

        {/* Name */}
        <h3
          className="font-bold text-base leading-snug transition-colors"
          style={{ color: "#1a1a2e" }}
        >
          {scheme.name}
        </h3>

        {/* Benefit amount */}
        <div
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 w-fit"
          style={{ background: "rgba(19,136,8,0.08)" }}
        >
          <IndianRupee className="w-3.5 h-3.5" style={{ color: "#138808" }} />
          <span className="font-semibold text-sm" style={{ color: "#138808" }}>
            {scheme.benefit}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "#666" }}
        >
          {scheme.description}
        </p>

        {/* Eligibility */}
        <div
          className="flex items-start gap-2 text-xs"
          style={{ color: "#999" }}
        >
          <FileCheck
            className="w-3.5 h-3.5 mt-0.5 shrink-0"
            style={{ color: "rgba(255,107,0,0.6)" }}
          />
          <span className="line-clamp-1">{scheme.eligibility}</span>
        </div>

        {/* Action */}
        <div className="pt-1 mt-auto">
          <Link
            to="/scheme/$slug"
            params={{ slug: scheme.slug }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: "#FF6B00" }}
            data-ocid="scheme.card"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    );
  }

  // Dark mode
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group hover:border-[#6C5CE7]/40 transition-all duration-300 hover:glow-purple"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl">
            {categoryEmojis[scheme.category] ?? "🇮🇳"}
          </span>
          <Badge
            variant="outline"
            className="text-xs border-[#6C5CE7]/40 text-[#a78bfa] bg-[#6C5CE7]/10"
          >
            {categoryLabels[scheme.category] ?? scheme.category}
          </Badge>
          {scheme.state !== "all" && (
            <Badge
              variant="outline"
              className="text-xs border-white/20 text-white/60"
            >
              {scheme.state}
            </Badge>
          )}
          {showAIBadge && (
            <Badge className="text-xs bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30">
              ✨ AI Suggested
            </Badge>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#a78bfa] transition-colors">
        {scheme.name}
      </h3>

      {/* Benefit amount */}
      <div className="flex items-center gap-1.5 bg-[#6C5CE7]/10 rounded-xl px-3 py-2 w-fit">
        <IndianRupee className="w-3.5 h-3.5 text-[#00D4FF]" />
        <span className="text-[#00D4FF] font-semibold text-sm">
          {scheme.benefit}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
        {scheme.description}
      </p>

      {/* Eligibility snippet */}
      <div className="flex items-start gap-2 text-xs text-white/50">
        <FileCheck className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#6C5CE7]/70" />
        <span className="line-clamp-1">{scheme.eligibility}</span>
      </div>

      {/* Action */}
      <div className="pt-1 mt-auto">
        <Link
          to="/scheme/$slug"
          params={{ slug: scheme.slug }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6C5CE7] hover:text-[#00D4FF] transition-colors"
          data-ocid="scheme.card"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
