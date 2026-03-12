import { c as createLucideIcon, u as useSearch, r as reactExports, j as jsxRuntimeExports, S as Search, m as motion, L as Link } from "./index-Bx_LFD18.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D-J-hpVl.js";
import { P as PageTransition, F as Footer } from "./PageTransition-1HX18WxZ.js";
import { u as useSchemesStore, i as indianStates, c as categoryLabels, a as categoryEmojis } from "./schemesStore-HowxT_LG.js";
import { f as filterSchemes, a as findSchemes } from "./schemeFinder-B3S683R9.js";
import { B as Bot } from "./bot-BJ7frEN_.js";
import { A as ArrowRight } from "./arrow-right-DO2K9KMq.js";
import "./utils-DkbBva97.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function renderMarkdown(text) {
  if (!text) return null;
  const processInline = (line) => {
    if (!line.includes("**")) return line;
    const parts = line.split("**");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: parts.map((p, i) => i % 2 === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p }, p) : p) });
  };
  const lines = text.split("\n");
  const els = [];
  let listItems = [];
  let lk = 0;
  const flushList = () => {
    if (listItems.length > 0) {
      els.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 space-y-1 my-2", children: listItems }, `ul-${lk++}`)
      );
      listItems = [];
    }
  };
  for (const line of lines) {
    const t = line.trim();
    const k = els.length;
    if (t === "---") {
      flushList();
      els.push(/* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-white/10 my-3" }, `hr-${k}`));
    } else if (t.startsWith("### ")) {
      flushList();
      els.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-bold text-base mt-3 mb-1",
            style: { color: "#a78bfa" },
            children: processInline(t.slice(4))
          },
          `h3-${k}`
        )
      );
    } else if (t.startsWith("## ")) {
      flushList();
      els.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-bold text-lg mt-4 mb-2",
            style: { color: "#00D4FF" },
            children: processInline(t.slice(3))
          },
          `h2-${k}`
        )
      );
    } else if (t.startsWith("# ")) {
      flushList();
      els.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl mt-4 mb-2 text-white", children: processInline(t.slice(2)) }, `h1-${k}`)
      );
    } else if (t.startsWith("- ")) {
      listItems.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "li",
          {
            className: "text-sm",
            style: { color: "rgba(255,255,255,0.75)" },
            children: processInline(t.slice(2))
          },
          `li-${k}`
        )
      );
    } else if (t) {
      flushList();
      els.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm mb-1",
            style: { color: "rgba(255,255,255,0.7)" },
            children: processInline(t)
          },
          `p-${k}`
        )
      );
    }
  }
  flushList();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: els });
}
function SchemeResultCard({
  scheme,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "p-6 rounded-2xl group",
      style: {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.2s ease"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.borderColor = "rgba(108,92,231,0.4)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(108,92,231,0.1)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      },
      "data-ocid": `search.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white mb-1 text-base", children: scheme.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs leading-relaxed line-clamp-2",
                style: { color: "rgba(255,255,255,0.5)" },
                children: scheme.description
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-sm font-bold whitespace-nowrap",
              style: { color: "#00D4FF" },
              children: scheme.benefit
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs px-2.5 py-1 rounded-full font-medium",
              style: {
                background: "rgba(108,92,231,0.15)",
                color: "#a78bfa",
                border: "1px solid rgba(108,92,231,0.2)"
              },
              children: [
                categoryEmojis[scheme.category] ?? "",
                " ",
                categoryLabels[scheme.category] ?? scheme.category
              ]
            }
          ),
          scheme.state !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs px-2.5 py-1 rounded-full",
              style: {
                background: "rgba(0,212,255,0.08)",
                color: "rgba(0,212,255,0.8)",
                border: "1px solid rgba(0,212,255,0.15)"
              },
              children: scheme.state
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/scheme/$slug",
            params: { slug: scheme.slug },
            className: "inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-white",
            style: { color: "rgba(108,92,231,0.8)" },
            "data-ocid": `search.item.${index + 1}`,
            children: [
              "View Details ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
            ]
          }
        )
      ]
    }
  );
}
const categories = Object.entries(categoryLabels).map(([k, v]) => ({
  key: k,
  label: v,
  emoji: categoryEmojis[k] ?? ""
}));
function SearchPage() {
  const searchParams = useSearch({ strict: false });
  const initCategory = (searchParams == null ? void 0 : searchParams.category) ?? "";
  const [query, setQuery] = reactExports.useState("");
  const [selectedState, setSelectedState] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(initCategory);
  const [ageInput, setAgeInput] = reactExports.useState("");
  const [occupationInput, setOccupationInput] = reactExports.useState("");
  const [incomeInput, setIncomeInput] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [aiText, setAiText] = reactExports.useState("");
  const [aiError, setAiError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [searched, setSearched] = reactExports.useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = reactExports.useState(false);
  const { schemes } = useSchemesStore();
  const doSearch = async () => {
    setLoading(true);
    setSearched(true);
    setAiText("");
    setAiError("");
    const params = {
      query: query.trim() || void 0,
      state: selectedState || void 0,
      category: selectedCategory || void 0,
      age: ageInput ? Number(ageInput) : void 0,
      occupation: occupationInput || void 0,
      income: incomeInput ? Number(incomeInput) : void 0
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
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pt-24 pb-8 border-b",
        style: { borderColor: "rgba(255,255,255,0.05)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h1",
            {
              className: "font-display font-black text-white mb-2",
              style: { fontSize: "clamp(1.8rem,4vw,2.5rem)" },
              children: [
                "Search",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    },
                    children: "Schemes"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.45)" }, children: "Find government schemes matching your profile using AI-powered search." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              className: "absolute left-4 top-1/2 -translate-y-1/2",
              size: 16,
              style: { color: "rgba(255,255,255,0.3)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Search schemes, e.g. PM Kisan, student scholarship...",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && doSearch(),
              className: "w-full pl-11 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all",
              style: {
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)"
              },
              "data-ocid": "search.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: doSearch,
            disabled: loading,
            className: "px-6 py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2",
            style: {
              background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
              boxShadow: "0 0 20px rgba(108,92,231,0.3)"
            },
            "data-ocid": "search.submit_button",
            children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 }),
              loading ? "Searching..." : "Search"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMobileFiltersOpen(!mobileFiltersOpen),
            className: "md:hidden px-3 py-3 rounded-xl transition-all",
            style: {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)"
            },
            "data-ocid": "search.toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedCategory(""),
            className: "text-xs px-3 py-1.5 rounded-full transition-all",
            style: {
              background: selectedCategory === "" ? "rgba(108,92,231,0.3)" : "rgba(255,255,255,0.04)",
              border: selectedCategory === "" ? "1px solid rgba(108,92,231,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: selectedCategory === "" ? "#a78bfa" : "rgba(255,255,255,0.5)"
            },
            "data-ocid": "search.tab",
            children: "All"
          }
        ),
        categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedCategory(c.key),
            className: "text-xs px-3 py-1.5 rounded-full transition-all",
            style: {
              background: selectedCategory === c.key ? "rgba(108,92,231,0.3)" : "rgba(255,255,255,0.04)",
              border: selectedCategory === c.key ? "1px solid rgba(108,92,231,0.5)" : "1px solid rgba(255,255,255,0.08)",
              color: selectedCategory === c.key ? "#a78bfa" : "rgba(255,255,255,0.5)"
            },
            "data-ocid": "search.tab",
            children: [
              c.emoji,
              " ",
              c.label
            ]
          },
          c.key
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "aside",
          {
            className: `w-64 flex-shrink-0 ${mobileFiltersOpen ? "block" : "hidden"} md:block`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-5 rounded-2xl sticky top-20",
                style: {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: "Filters" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: clearFilters,
                        className: "text-xs transition-colors",
                        style: { color: "rgba(108,92,231,0.7)" },
                        "data-ocid": "search.secondary_button",
                        children: "Clear all"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "block text-xs font-medium mb-2",
                          style: { color: "rgba(255,255,255,0.45)" },
                          children: "State"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Select,
                        {
                          value: selectedState,
                          onValueChange: setSelectedState,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              SelectTrigger,
                              {
                                className: "text-sm h-9",
                                style: {
                                  background: "rgba(255,255,255,0.05)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                  color: selectedState ? "white" : "rgba(255,255,255,0.4)"
                                },
                                "data-ocid": "search.select",
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select state" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All States" }),
                              indianStates.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
                            ] })
                          ]
                        }
                      )
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
                          value: ageInput,
                          onChange: (e) => setAgeInput(e.target.value),
                          className: "w-full px-3 py-2 rounded-lg text-white text-sm outline-none",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)"
                          },
                          "data-ocid": "search.input"
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          placeholder: "e.g. Farmer, Student",
                          value: occupationInput,
                          onChange: (e) => setOccupationInput(e.target.value),
                          className: "w-full px-3 py-2 rounded-lg text-white text-sm outline-none",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)"
                          },
                          "data-ocid": "search.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "block text-xs font-medium mb-2",
                          style: { color: "rgba(255,255,255,0.45)" },
                          children: "Annual Income (₹)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          placeholder: "e.g. 200000",
                          value: incomeInput,
                          onChange: (e) => setIncomeInput(e.target.value),
                          className: "w-full px-3 py-2 rounded-lg text-white text-sm outline-none",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)"
                          },
                          "data-ocid": "search.input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: doSearch,
                        className: "w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all",
                        style: {
                          background: "linear-gradient(135deg,#6C5CE7,#0984E3)"
                        },
                        "data-ocid": "search.submit_button",
                        children: "Apply Filters"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-20",
              "data-ocid": "search.loading_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LoaderCircle,
                  {
                    className: "animate-spin mx-auto mb-3",
                    size: 32,
                    style: { color: "#6C5CE7" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm",
                    style: { color: "rgba(255,255,255,0.5)" },
                    children: "Searching with AI..."
                  }
                )
              ] })
            }
          ),
          aiError && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-4 rounded-xl mb-6 text-sm",
              style: {
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#fca5a5"
              },
              "data-ocid": "search.error_state",
              children: [
                "⚠️ ",
                aiError
              ]
            }
          ),
          aiText && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              className: "p-6 rounded-2xl mb-6",
              style: {
                background: "rgba(108,92,231,0.08)",
                border: "1px solid rgba(108,92,231,0.2)"
              },
              "data-ocid": "search.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 16, style: { color: "#6C5CE7" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-bold",
                      style: { color: "#a78bfa" },
                      children: "AI Answer"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderMarkdown(aiText) })
              ]
            }
          ),
          !loading && searched && !aiText && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm mb-4",
                style: { color: "rgba(255,255,255,0.45)" },
                children: [
                  results.length,
                  " scheme",
                  results.length !== 1 ? "s" : "",
                  " ",
                  "found"
                ]
              }
            ),
            results.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: results.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SchemeResultCard, { scheme: s, index: i }, s.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-16 rounded-2xl",
                style: {
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)"
                },
                "data-ocid": "search.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      size: 32,
                      className: "mx-auto mb-3",
                      style: { color: "rgba(255,255,255,0.2)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "No schemes found. Try different keywords."
                    }
                  )
                ]
              }
            )
          ] }),
          !searched && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20 rounded-2xl",
              style: {
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    size: 40,
                    className: "mx-auto mb-4",
                    style: { color: "rgba(255,255,255,0.15)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-white mb-2", children: "Start your search" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm",
                    style: { color: "rgba(255,255,255,0.4)" },
                    children: "Enter keywords above or apply filters to find relevant schemes."
                  }
                )
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  SearchPage as default
};
