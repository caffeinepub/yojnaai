import { r as reactExports, j as jsxRuntimeExports, m as motion, C as Calculator, A as AnimatePresence, L as Link, b as ue } from "./index-DTEjVTMM.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-qtE_7Jfq.js";
import { P as PageTransition, F as Footer } from "./PageTransition-DG5irCh7.js";
import { u as useSchemesStore, i as indianStates, a as categoryEmojis, c as categoryLabels } from "./schemesStore-CQWd7uf8.js";
import { f as filterSchemes } from "./schemeFinder-DllB_Yka.js";
import { T as TrendingUp } from "./trending-up-E7eQjlbX.js";
import { S as Share2 } from "./share-2-CTmNx5z_.js";
import "./utils-BaSa4wG6.js";
const occupationOptions = [
  { value: "student", label: "Student" },
  { value: "farmer", label: "Farmer" },
  { value: "labour", label: "Labour / Worker" },
  { value: "business", label: "Business Owner" },
  { value: "women", label: "Women / Homemaker" },
  { value: "senior", label: "Senior Citizen" },
  { value: "government", label: "Government Employee" },
  { value: "other", label: "Other" }
];
const incomeOptions = [
  { value: "0-50000", label: "Below ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-250000", label: "₹1,00,000 – ₹2,50,000" },
  { value: "250000-500000", label: "₹2,50,000 – ₹5,00,000" },
  { value: "500000+", label: "Above ₹5,00,000" }
];
function parseIncome(range) {
  if (!range) return 0;
  const [lo] = range.split("-");
  return Number(lo.replace("+", "")) || 0;
}
function CalculatorPage() {
  const { schemes } = useSchemesStore();
  const [state, setState] = reactExports.useState("");
  const [age, setAge] = reactExports.useState("");
  const [occupation, setOccupation] = reactExports.useState("");
  const [incomeRange, setIncomeRange] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [calculated, setCalculated] = reactExports.useState(false);
  const calculate = () => {
    const income = parseIncome(incomeRange);
    const filtered = filterSchemes(
      {
        state: state || void 0,
        category: occupation || void 0,
        income: income || void 0
      },
      schemes
    );
    setResults(filtered);
    setCalculated(true);
  };
  const totalBenefit = results.reduce(
    (acc, s) => acc + (s.benefit_amount_numeric ?? 0),
    0
  );
  const handleShare = () => {
    const text = `I may be eligible for ₹${totalBenefit.toLocaleString("en-IN")} worth of government benefits! Find yours at YojnaAI.`;
    if (navigator.share) {
      navigator.share({ title: "My Government Benefits", text });
    } else {
      navigator.clipboard.writeText(text);
      ue.success("Copied to clipboard!");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative pt-24 pb-16 overflow-hidden",
        style: {
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.1) 0%, transparent 70%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6",
              style: {
                background: "rgba(108,92,231,0.15)",
                border: "1px solid rgba(108,92,231,0.3)",
                color: "#a78bfa"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 12 }),
                " Benefits Calculator"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              className: "font-display font-black text-white mb-4",
              style: { fontSize: "clamp(2rem,5vw,3rem)" },
              children: [
                "Check Your",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    },
                    children: "Government Benefits"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              className: "text-base max-w-lg mx-auto",
              style: { color: "rgba(255,255,255,0.5)" },
              children: "Enter your details to calculate total government benefits you may be eligible for."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "p-8 rounded-2xl mb-8",
          style: {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block text-xs font-medium mb-2",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: "State"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: state, onValueChange: setState, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "text-sm h-10",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: state ? "white" : "rgba(255,255,255,0.35)"
                      },
                      "data-ocid": "calculator.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select state" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All India" }),
                    indianStates.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block text-xs font-medium mb-2",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: "Age"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "number",
                    placeholder: "Your age",
                    value: age,
                    onChange: (e) => setAge(e.target.value),
                    className: "w-full px-3 py-2.5 rounded-lg text-white text-sm outline-none",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)"
                    },
                    "data-ocid": "calculator.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block text-xs font-medium mb-2",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: "Occupation"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: occupation, onValueChange: setOccupation, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "text-sm h-10",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: occupation ? "white" : "rgba(255,255,255,0.35)"
                      },
                      "data-ocid": "calculator.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select occupation" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: occupationOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "block text-xs font-medium mb-2",
                    style: { color: "rgba(255,255,255,0.45)" },
                    children: "Annual Income"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: incomeRange, onValueChange: setIncomeRange, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "text-sm h-10",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: incomeRange ? "white" : "rgba(255,255,255,0.35)"
                      },
                      "data-ocid": "calculator.select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select income range" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: incomeOptions.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: calculate,
                className: "w-full py-3.5 rounded-xl text-white font-bold transition-all hover:scale-[1.01] flex items-center justify-center gap-2",
                style: {
                  background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                  boxShadow: "0 0 30px rgba(108,92,231,0.3)"
                },
                "data-ocid": "calculator.submit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 18 }),
                  " Calculate My Benefits"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: calculated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0 },
          "data-ocid": "calculator.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-8 rounded-2xl mb-6 text-center",
                style: {
                  background: "linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(0,212,255,0.08) 100%)",
                  border: "1px solid rgba(108,92,231,0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TrendingUp,
                    {
                      className: "mx-auto mb-4",
                      size: 36,
                      style: { color: "#6C5CE7" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mb-2",
                      style: { color: "rgba(255,255,255,0.6)" },
                      children: "You may be eligible for"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-black mb-2",
                      style: {
                        fontSize: "clamp(2rem,5vw,3rem)",
                        background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      },
                      children: [
                        "₹",
                        totalBenefit.toLocaleString("en-IN")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm mb-6",
                      style: { color: "rgba(255,255,255,0.5)" },
                      children: [
                        "worth of government benefits across ",
                        results.length,
                        " ",
                        "scheme",
                        results.length !== 1 ? "s" : ""
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleShare,
                      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10",
                      style: {
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.7)"
                      },
                      "data-ocid": "calculator.secondary_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
                        " Share My Results"
                      ]
                    }
                  )
                ]
              }
            ),
            results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-6 rounded-2xl",
                style: {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white mb-4", children: "Matched Schemes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: results.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between py-3 border-b last:border-b-0",
                      style: { borderColor: "rgba(255,255,255,0.05)" },
                      "data-ocid": `calculator.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/scheme/$slug",
                              params: { slug: s.slug },
                              className: "text-sm font-medium text-white hover:text-purple-400 transition-colors",
                              "data-ocid": `calculator.item.${i + 1}`,
                              children: s.name
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-xs mt-0.5",
                              style: { color: "rgba(255,255,255,0.4)" },
                              children: [
                                categoryEmojis[s.category],
                                " ",
                                categoryLabels[s.category] ?? s.category
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-sm font-bold",
                            style: { color: "#00D4FF" },
                            children: s.benefit
                          }
                        )
                      ]
                    },
                    s.id
                  )) })
                ]
              }
            ),
            results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-10 rounded-2xl",
                style: {
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)"
                },
                "data-ocid": "calculator.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "No exact matches found. Try adjusting your filters."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/search",
                      className: "inline-flex items-center gap-1.5 mt-4 text-sm font-medium transition-colors",
                      style: { color: "#6C5CE7" },
                      "data-ocid": "calculator.link",
                      children: "Try AI Search"
                    }
                  )
                ]
              }
            )
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  CalculatorPage as default
};
