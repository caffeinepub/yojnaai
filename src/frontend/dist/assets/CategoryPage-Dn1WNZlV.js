import { c as createLucideIcon, E as useTheme, j as jsxRuntimeExports, m as motion, L as Link, a as useParams, r as reactExports } from "./index-DTEjVTMM.js";
import { P as PageTransition, F as Footer } from "./PageTransition-DG5irCh7.js";
import { B as Badge } from "./badge-QSQkQ3eO.js";
import { a as categoryEmojis, c as categoryLabels, u as useSchemesStore } from "./schemesStore-CQWd7uf8.js";
import { A as ArrowRight } from "./arrow-right-CRgIAMjK.js";
import { A as ArrowLeft } from "./arrow-left-D7lDsGNM.js";
import "./utils-BaSa4wG6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m9 15 2 2 4-4", key: "1grp1n" }]
];
const FileCheck = createLucideIcon("file-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function SchemeCard({
  scheme,
  index = 0,
  showAIBadge = false
}) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  if (isLight) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.06 },
        whileHover: { y: -4, transition: { duration: 0.2 } },
        className: "rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group transition-all duration-300",
        style: {
          background: "#ffffff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,107,0,0.15)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: categoryEmojis[scheme.category] ?? "🇮🇳" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-semibold",
                style: {
                  borderColor: "rgba(255,107,0,0.4)",
                  color: "#FF6B00",
                  background: "rgba(255,107,0,0.06)"
                },
                children: categoryLabels[scheme.category] ?? scheme.category
              }
            ),
            scheme.state !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs",
                style: {
                  borderColor: "rgba(19,136,8,0.3)",
                  color: "#138808",
                  background: "rgba(19,136,8,0.05)"
                },
                children: scheme.state
              }
            ),
            showAIBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "text-xs",
                style: {
                  background: "rgba(19,136,8,0.1)",
                  color: "#138808",
                  border: "1px solid rgba(19,136,8,0.3)"
                },
                children: "✨ AI Suggested"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-base leading-snug transition-colors",
              style: { color: "#1a1a2e" },
              children: scheme.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 rounded-xl px-3 py-2 w-fit",
              style: { background: "rgba(19,136,8,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5", style: { color: "#138808" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", style: { color: "#138808" }, children: scheme.benefit })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm line-clamp-2 leading-relaxed",
              style: { color: "#666" },
              children: scheme.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 text-xs",
              style: { color: "#999" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileCheck,
                  {
                    className: "w-3.5 h-3.5 mt-0.5 shrink-0",
                    style: { color: "rgba(255,107,0,0.6)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: scheme.eligibility })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/scheme/$slug",
              params: { slug: scheme.slug },
              className: "inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
              style: { color: "#FF6B00" },
              "data-ocid": "scheme.card",
              children: [
                "View Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" })
              ]
            }
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.06 },
      whileHover: { y: -4, transition: { duration: 0.2 } },
      className: "glass rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group hover:border-[#6C5CE7]/40 transition-all duration-300 hover:glow-purple",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: categoryEmojis[scheme.category] ?? "🇮🇳" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-[#6C5CE7]/40 text-[#a78bfa] bg-[#6C5CE7]/10",
              children: categoryLabels[scheme.category] ?? scheme.category
            }
          ),
          scheme.state !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs border-white/20 text-white/60",
              children: scheme.state
            }
          ),
          showAIBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-[#00D4FF]/20 text-[#00D4FF] border-[#00D4FF]/30", children: "✨ AI Suggested" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white text-base leading-snug group-hover:text-[#a78bfa] transition-colors", children: scheme.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-[#6C5CE7]/10 rounded-xl px-3 py-2 w-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-3.5 h-3.5 text-[#00D4FF]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#00D4FF] font-semibold text-sm", children: scheme.benefit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm line-clamp-2 leading-relaxed", children: scheme.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-white/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileCheck, { className: "w-3.5 h-3.5 mt-0.5 shrink-0 text-[#6C5CE7]/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: scheme.eligibility })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/scheme/$slug",
            params: { slug: scheme.slug },
            className: "inline-flex items-center gap-1.5 text-sm font-medium text-[#6C5CE7] hover:text-[#00D4FF] transition-colors",
            "data-ocid": "scheme.card",
            children: [
              "View Details",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" })
            ]
          }
        ) })
      ]
    }
  );
}
function CategoryPage() {
  const params = useParams({ strict: false });
  const category = params.category ?? "general";
  const { schemes } = useSchemesStore();
  const label = categoryLabels[category] ?? category;
  const emoji = categoryEmojis[category] ?? "🇮🇳";
  const filtered = schemes.filter(
    (s) => s.category === category || category === "general" && s.category === "general"
  );
  reactExports.useEffect(() => {
    document.title = `${label} Schemes - YojnaAI`;
    const desc = document.querySelector("meta[name='description']");
    if (desc)
      desc.setAttribute(
        "content",
        `Find all ${label} government schemes in India on YojnaAI`
      );
  }, [label]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-24 pb-16 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 via-transparent to-[#00D4FF]/5 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm mb-8 transition-colors",
            "data-ocid": "category.link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
              " Home"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-4 mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-black text-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: label }),
                  " Schemes"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/50 mt-2", children: [
                  filtered.length,
                  " government schemes for ",
                  label.toLowerCase(),
                  " ",
                  "in India"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-6", children: Object.entries(categoryLabels).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/schemes/$category",
            params: { category: k },
            className: `px-4 py-1.5 rounded-full text-sm transition-all ${k === category ? "bg-[#6C5CE7] text-white" : "glass text-white/60 hover:text-white"}`,
            "data-ocid": "category.tab",
            children: [
              categoryEmojis[k],
              " ",
              v
            ]
          },
          k
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pb-24", children: filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((scheme, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SchemeCard, { scheme, index: i }, scheme.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24 glass rounded-2xl",
        "data-ocid": "category.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { size: 48, className: "text-white/20 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xl", children: "No schemes found in this category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm mt-2", children: "Try browsing a different category" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  CategoryPage as default
};
