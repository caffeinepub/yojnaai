import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useSearch } from "@tanstack/react-router";
import { ArrowRight, Bot, Filter, Loader2, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
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

function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const processInline = (line: string): React.ReactNode => {
    if (!line.includes("**")) return line;
    const parts = line.split("**");
    return (
      <>
        {parts.map((p, i) => (i % 2 === 1 ? <strong key={p}>{p}</strong> : p))}
      </>
    );
  };
  const lines = text.split("\n");
  const els: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let lk = 0;
  const flushList = () => {
    if (listItems.length > 0) {
      els.push(
        <ul key={`ul-${lk++}`} className="list-disc pl-5 space-y-1 my-2">
          {listItems}
        </ul>,
      );
      listItems = [];
    }
  };
  for (const line of lines) {
    const t = line.trim();
    const k = els.length;
    if (t === "---") {
      flushList();
      els.push(<hr key={`hr-${k}`} className="border-white/10 my-3" />);
    } else if (t.startsWith("### ")) {
      flushList();
      els.push(
        <h3
          key={`h3-${k}`}
          className="font-bold text-base mt-3 mb-1"
          style={{ color: "#a78bfa" }}
        >
          {processInline(t.slice(4))}
        </h3>,
      );
    } else if (t.startsWith("## ")) {
      flushList();
      els.push(
        <h2
          key={`h2-${k}`}
          className="font-bold text-lg mt-4 mb-2"
          style={{ color: "#00D4FF" }}
        >
          {processInline(t.slice(3))}
        </h2>,
      );
    } else if (t.startsWith("# ")) {
      flushList();
      els.push(
        <h1 key={`h1-${k}`} className="font-bold text-xl mt-4 mb-2 text-white">
          {processInline(t.slice(2))}
        </h1>,
      );
    } else if (t.startsWith("- ")) {
      listItems.push(
        <li
          key={`li-${k}`}
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          {processInline(t.slice(2))}
        </li>,
      );
    } else if (t) {
      flushList();
      els.push(
        <p
          key={`p-${k}`}
          className="text-sm mb-1"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          {processInline(t)}
        </p>,
      );
    }
  }
  flushList();
  return <>{els}</>;
}

function SchemeResultCard({
  scheme,
  index,
}: { scheme: Scheme; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-6 rounded-2xl group"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(108,92,231,0.4)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 30px rgba(108,92,231,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      data-ocid={`search.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-white mb-1 text-base">{scheme.name}</h3>
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {scheme.description}
          </p>
        </div>
        <span
          className="text-sm font-bold whitespace-nowrap"
          style={{ color: "#00D4FF" }}
        >
          {scheme.benefit}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            background: "rgba(108,92,231,0.15)",
            color: "#a78bfa",
            border: "1px solid rgba(108,92,231,0.2)",
          }}
        >
          {categoryEmojis[scheme.category] ?? ""}{" "}
          {categoryLabels[scheme.category] ?? scheme.category}
        </span>
        {scheme.state !== "all" && (
          <span
            className="text-xs px-2.5 py-1 rounded-full"
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
      <Link
        to="/scheme/$slug"
        params={{ slug: scheme.slug }}
        className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white"
        style={{ color: "rgba(108,92,231,0.8)" }}
        data-ocid={`search.item.${index + 1}`}
      >
        View Details <ArrowRight size={12} />
      </Link>
    </motion.div>
  );
}

const categories = Object.entries(categoryLabels).map(([k, v]) => ({
  key: k,
  label: v,
  emoji: categoryEmojis[k] ?? "",
}));

export default function SearchPage() {
  const searchParams = useSearch({ strict: false }) as { category?: string };
  const initCategory = searchParams?.category ?? "";

  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initCategory);
  const [ageInput, setAgeInput] = useState("");
  const [occupationInput, setOccupationInput] = useState("");
  const [incomeInput, setIncomeInput] = useState("");
  const [results, setResults] = useState<Scheme[]>([]);
  const [aiText, setAiText] = useState("");
  const [aiError, setAiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { schemes } = useSchemesStore();

  const doSearch = async () => {
    setLoading(true);
    setSearched(true);
    setAiText("");
    setAiError("");
    const params: FindSchemeParams = {
      query: query.trim() || undefined,
      state: selectedState || undefined,
      category: selectedCategory || undefined,
      age: ageInput ? Number(ageInput) : undefined,
      occupation: occupationInput || undefined,
      income: incomeInput ? Number(incomeInput) : undefined,
    };
    try {
      const result = await findSchemes(params, schemes);
      setResults(result.schemes);
      if (result.aiText) setAiText(result.aiText);
      if (result.aiError) setAiError(result.aiError);
    } catch {
      setAiError("Search failed. Please try again.");
    }
    setLoading(false);
  };

  // Init with category filter
  useEffect(() => {
    if (initCategory) {
      const filtered = filterSchemes({ category: initCategory }, schemes);
      setResults(filtered);
      setSearched(true);
    }
  }, [initCategory, schemes]);

  const clearFilters = () => {
    setQuery("");
    setSelectedState("");
    setSelectedCategory("");
    setAgeInput("");
    setOccupationInput("");
    setIncomeInput("");
    setResults([]);
    setSearched(false);
    setAiText("");
    setAiError("");
  };

  return (
    <PageTransition>
      <main style={{ background: "#0B0F1A", minHeight: "100vh" }}>
        {/* Header */}
        <div
          className="pt-24 pb-8 border-b"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="container mx-auto px-4">
            <h1
              className="font-display font-black text-white mb-2"
              style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)" }}
            >
              Search{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Schemes
              </span>
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Find government schemes matching your profile using AI-powered
              search.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Main search bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={16}
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
              <input
                type="text"
                placeholder="Search schemes, e.g. PM Kisan, student scholarship..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doSearch()}
                className="w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                data-ocid="search.search_input"
              />
            </div>
            <button
              type="button"
              onClick={doSearch}
              disabled={loading}
              className="px-6 py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                boxShadow: "0 0 20px rgba(108,92,231,0.3)",
              }}
              data-ocid="search.submit_button"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Search size={16} />
              )}
              {loading ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden px-3 py-3 rounded-xl transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
              data-ocid="search.toggle"
            >
              <Filter size={16} />
            </button>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{
                background:
                  selectedCategory === ""
                    ? "rgba(108,92,231,0.3)"
                    : "rgba(255,255,255,0.04)",
                border:
                  selectedCategory === ""
                    ? "1px solid rgba(108,92,231,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                color:
                  selectedCategory === "" ? "#a78bfa" : "rgba(255,255,255,0.5)",
              }}
              data-ocid="search.tab"
            >
              All
            </button>
            {categories.map((c) => (
              <button
                type="button"
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background:
                    selectedCategory === c.key
                      ? "rgba(108,92,231,0.3)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    selectedCategory === c.key
                      ? "1px solid rgba(108,92,231,0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                  color:
                    selectedCategory === c.key
                      ? "#a78bfa"
                      : "rgba(255,255,255,0.5)",
                }}
                data-ocid="search.tab"
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <div className="flex gap-8">
            {/* Sidebar filters */}
            <aside
              className={`w-64 flex-shrink-0 ${mobileFiltersOpen ? "block" : "hidden"} md:block`}
            >
              <div
                className="p-5 rounded-2xl sticky top-20"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-white">Filters</h3>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs transition-colors"
                    style={{ color: "rgba(108,92,231,0.7)" }}
                    data-ocid="search.secondary_button"
                  >
                    Clear all
                  </button>
                </div>

                <div className="space-y-5">
                  {/* State */}
                  <div>
                    <span
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      State
                    </span>
                    <Select
                      value={selectedState}
                      onValueChange={setSelectedState}
                    >
                      <SelectTrigger
                        className="text-sm h-9"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: selectedState
                            ? "white"
                            : "rgba(255,255,255,0.4)",
                        }}
                        data-ocid="search.select"
                      >
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        {indianStates.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Age */}
                  <div>
                    <span
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Age
                    </span>
                    <input
                      type="number"
                      placeholder="Your age"
                      value={ageInput}
                      onChange={(e) => setAgeInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      data-ocid="search.input"
                    />
                  </div>

                  {/* Occupation */}
                  <div>
                    <span
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Occupation
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Farmer, Student"
                      value={occupationInput}
                      onChange={(e) => setOccupationInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      data-ocid="search.input"
                    />
                  </div>

                  {/* Income */}
                  <div>
                    <span
                      className="block text-xs font-medium mb-2"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Annual Income (₹)
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 200000"
                      value={incomeInput}
                      onChange={(e) => setIncomeInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-white text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      data-ocid="search.input"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={doSearch}
                    className="w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all"
                    style={{
                      background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                    }}
                    data-ocid="search.submit_button"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Loading */}
              {loading && (
                <div
                  className="flex items-center justify-center py-20"
                  data-ocid="search.loading_state"
                >
                  <div className="text-center">
                    <Loader2
                      className="animate-spin mx-auto mb-3"
                      size={32}
                      style={{ color: "#6C5CE7" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      Searching with AI...
                    </p>
                  </div>
                </div>
              )}

              {/* AI Error */}
              {aiError && !loading && (
                <div
                  className="p-4 rounded-xl mb-6 text-sm"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#fca5a5",
                  }}
                  data-ocid="search.error_state"
                >
                  ⚠️ {aiError}
                </div>
              )}

              {/* AI Answer */}
              {aiText && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl mb-6"
                  style={{
                    background: "rgba(108,92,231,0.08)",
                    border: "1px solid rgba(108,92,231,0.2)",
                  }}
                  data-ocid="search.success_state"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Bot size={16} style={{ color: "#6C5CE7" }} />
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#a78bfa" }}
                    >
                      AI Answer
                    </span>
                  </div>
                  <div>{renderMarkdown(aiText)}</div>
                </motion.div>
              )}

              {/* Scheme results */}
              {!loading && searched && !aiText && (
                <>
                  <p
                    className="text-sm mb-4"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {results.length} scheme{results.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                  {results.length > 0 ? (
                    <div className="space-y-4">
                      {results.map((s, i) => (
                        <SchemeResultCard key={s.id} scheme={s} index={i} />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="text-center py-16 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      data-ocid="search.empty_state"
                    >
                      <Search
                        size={32}
                        className="mx-auto mb-3"
                        style={{ color: "rgba(255,255,255,0.2)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        No schemes found. Try different keywords.
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Initial state */}
              {!searched && !loading && (
                <div
                  className="text-center py-20 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Search
                    size={40}
                    className="mx-auto mb-4"
                    style={{ color: "rgba(255,255,255,0.15)" }}
                  />
                  <p className="text-base font-medium text-white mb-2">
                    Start your search
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Enter keywords above or apply filters to find relevant
                    schemes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
}
