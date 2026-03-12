import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { Calculator, Share2, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { categoryEmojis, categoryLabels, indianStates } from "../data/schemes";
import type { Scheme } from "../data/schemes";
import { filterSchemes } from "../services/schemeFinder";
import { useSchemesStore } from "../store/schemesStore";

const occupationOptions = [
  { value: "student", label: "Student" },
  { value: "farmer", label: "Farmer" },
  { value: "labour", label: "Labour / Worker" },
  { value: "business", label: "Business Owner" },
  { value: "women", label: "Women / Homemaker" },
  { value: "senior", label: "Senior Citizen" },
  { value: "government", label: "Government Employee" },
  { value: "other", label: "Other" },
];

const incomeOptions = [
  { value: "0-50000", label: "Below ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-250000", label: "₹1,00,000 – ₹2,50,000" },
  { value: "250000-500000", label: "₹2,50,000 – ₹5,00,000" },
  { value: "500000+", label: "Above ₹5,00,000" },
];

function parseIncome(range: string): number {
  if (!range) return 0;
  const [lo] = range.split("-");
  return Number(lo.replace("+", "")) || 0;
}

export default function CalculatorPage() {
  const { schemes } = useSchemesStore();

  const [state, setState] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [incomeRange, setIncomeRange] = useState("");
  const [results, setResults] = useState<Scheme[]>([]);
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    const income = parseIncome(incomeRange);
    const filtered = filterSchemes(
      {
        state: state || undefined,
        age: age ? Number(age) : undefined,
        category: occupation || undefined,
        income: income || undefined,
      },
      schemes,
    );
    setResults(filtered);
    setCalculated(true);
  };

  const totalBenefit = results.reduce(
    (acc, s) => acc + (s.benefit_amount_numeric ?? 0),
    0,
  );

  const handleShare = () => {
    const text = `I may be eligible for ₹${totalBenefit.toLocaleString("en-IN")} worth of government benefits! Find yours at YojnaAI.`;
    if (navigator.share) {
      navigator.share({ title: "My Government Benefits", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

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
              <Calculator size={12} /> Benefits Calculator
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white mb-4"
              style={{ fontSize: "clamp(2rem,5vw,3rem)" }}
            >
              Check Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Government Benefits
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Enter your details to calculate total government benefits you may
              be eligible for.
            </motion.p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-24">
          <div className="max-w-2xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl mb-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {/* State */}
                <div>
                  <span
                    className="block text-xs font-medium mb-2"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    State
                  </span>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger
                      className="text-sm h-10"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: state ? "white" : "rgba(255,255,255,0.35)",
                      }}
                      data-ocid="calculator.select"
                    >
                      <SelectValue placeholder="Select state" />
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
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg text-white text-sm outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    data-ocid="calculator.input"
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
                  <Select value={occupation} onValueChange={setOccupation}>
                    <SelectTrigger
                      className="text-sm h-10"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: occupation ? "white" : "rgba(255,255,255,0.35)",
                      }}
                      data-ocid="calculator.select"
                    >
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Income */}
                <div>
                  <span
                    className="block text-xs font-medium mb-2"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Annual Income
                  </span>
                  <Select value={incomeRange} onValueChange={setIncomeRange}>
                    <SelectTrigger
                      className="text-sm h-10"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: incomeRange ? "white" : "rgba(255,255,255,0.35)",
                      }}
                      data-ocid="calculator.select"
                    >
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      {incomeOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                type="button"
                onClick={calculate}
                className="w-full py-3.5 rounded-xl text-white font-bold transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                  boxShadow: "0 0 30px rgba(108,92,231,0.3)",
                }}
                data-ocid="calculator.submit_button"
              >
                <Calculator size={18} /> Calculate My Benefits
              </button>
            </motion.div>

            {/* Results */}
            <AnimatePresence>
              {calculated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  data-ocid="calculator.success_state"
                >
                  {/* Total benefit card */}
                  <div
                    className="p-8 rounded-2xl mb-6 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(0,212,255,0.08) 100%)",
                      border: "1px solid rgba(108,92,231,0.3)",
                    }}
                  >
                    <TrendingUp
                      className="mx-auto mb-4"
                      size={36}
                      style={{ color: "#6C5CE7" }}
                    />
                    <p
                      className="text-sm mb-2"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      You may be eligible for
                    </p>
                    <p
                      className="font-black mb-2"
                      style={{
                        fontSize: "clamp(2rem,5vw,3rem)",
                        background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ₹{totalBenefit.toLocaleString("en-IN")}
                    </p>
                    <p
                      className="text-sm mb-6"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      worth of government benefits across {results.length}{" "}
                      scheme{results.length !== 1 ? "s" : ""}
                    </p>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
                      style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                      data-ocid="calculator.secondary_button"
                    >
                      <Share2 size={14} /> Share My Results
                    </button>
                  </div>

                  {/* Matched schemes */}
                  {results.length > 0 && (
                    <div
                      className="p-6 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <h3 className="text-sm font-bold text-white mb-4">
                        Matched Schemes
                      </h3>
                      <div className="space-y-3">
                        {results.map((s, i) => (
                          <div
                            key={s.id}
                            className="flex items-center justify-between py-3 border-b last:border-b-0"
                            style={{ borderColor: "rgba(255,255,255,0.05)" }}
                            data-ocid={`calculator.item.${i + 1}`}
                          >
                            <div className="flex-1">
                              <Link
                                to="/scheme/$slug"
                                params={{ slug: s.slug }}
                                className="text-sm font-medium text-white hover:text-purple-400 transition-colors"
                                data-ocid={`calculator.item.${i + 1}`}
                              >
                                {s.name}
                              </Link>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                              >
                                {categoryEmojis[s.category]}{" "}
                                {categoryLabels[s.category] ?? s.category}
                              </p>
                            </div>
                            <span
                              className="text-sm font-bold"
                              style={{ color: "#00D4FF" }}
                            >
                              {s.benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.length === 0 && (
                    <div
                      className="text-center py-10 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      data-ocid="calculator.empty_state"
                    >
                      <p
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        No exact matches found. Try adjusting your filters.
                      </p>
                      <Link
                        to="/search"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-colors"
                        style={{ color: "#6C5CE7" }}
                        data-ocid="calculator.link"
                      >
                        Try AI Search
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
}
