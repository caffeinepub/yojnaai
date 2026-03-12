import { c as createLucideIcon, a as useParams, r as reactExports, j as jsxRuntimeExports, L as Link, m as motion, b as ue } from "./index-DTEjVTMM.js";
import { P as PageTransition, E as ExternalLink, F as Footer } from "./PageTransition-DG5irCh7.js";
import { u as useSchemesStore, a as categoryEmojis, c as categoryLabels } from "./schemesStore-CQWd7uf8.js";
import { A as ArrowLeft } from "./arrow-left-D7lDsGNM.js";
import { C as CircleCheckBig } from "./circle-check-big-Dm1u98UV.js";
import { S as Share2 } from "./share-2-CTmNx5z_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function SchemeDetailPage() {
  const { slug } = useParams({ strict: false });
  const { schemes } = useSchemesStore();
  const scheme = schemes.find((s) => s.slug === slug);
  reactExports.useEffect(() => {
    if (scheme) {
      document.title = `${scheme.name} - YojnaAI`;
    }
  }, [scheme]);
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: (scheme == null ? void 0 : scheme.name) ?? "YojnaAI Scheme", url });
    } else {
      navigator.clipboard.writeText(url);
      ue.success("Link copied to clipboard!");
    }
  };
  if (!scheme) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        style: { background: "#0B0F1A", minHeight: "100vh" },
        className: "pt-24",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl mb-6", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white mb-4", children: "Scheme Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8", style: { color: "rgba(255,255,255,0.5)" }, children: "This scheme doesn't exist or was removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all",
              style: { background: "linear-gradient(135deg,#6C5CE7,#0984E3)" },
              "data-ocid": "scheme.link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
                " Back to Search"
              ]
            }
          )
        ] })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative pt-24 pb-12 border-b",
        style: {
          borderColor: "rgba(255,255,255,0.05)",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.08) 0%, transparent 70%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              className: "inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-white",
              style: { color: "rgba(255,255,255,0.45)" },
              "data-ocid": "scheme.link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                " Back to Search"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-start md:justify-between gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs px-3 py-1 rounded-full font-medium",
                        style: {
                          background: "rgba(108,92,231,0.15)",
                          color: "#a78bfa",
                          border: "1px solid rgba(108,92,231,0.25)"
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
                        className: "text-xs px-3 py-1 rounded-full",
                        style: {
                          background: "rgba(0,212,255,0.08)",
                          color: "rgba(0,212,255,0.8)",
                          border: "1px solid rgba(0,212,255,0.15)"
                        },
                        children: scheme.state
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      className: "font-display font-black text-white mb-3",
                      style: { fontSize: "clamp(1.6rem,4vw,2.2rem)" },
                      children: scheme.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-base mb-4",
                      style: { color: "rgba(255,255,255,0.6)" },
                      children: scheme.description
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex-shrink-0 p-5 rounded-2xl min-w-40",
                    style: {
                      background: "rgba(0,212,255,0.08)",
                      border: "1px solid rgba(0,212,255,0.15)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mb-1",
                          style: { color: "rgba(0,212,255,0.6)" },
                          children: "Benefit Amount"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xl font-black",
                          style: { color: "#00D4FF" },
                          children: scheme.benefit
                        }
                      )
                    ]
                  }
                )
              ] })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "p-6 rounded-2xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 18, style: { color: "#6C5CE7" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-white", children: "Eligibility Criteria" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed",
                  style: { color: "rgba(255,255,255,0.65)" },
                  children: scheme.eligibility
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "p-6 rounded-2xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 18, style: { color: "#00D4FF" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-white", children: "Required Documents" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: (Array.isArray(scheme.documents) ? scheme.documents : [scheme.documents]).map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2 text-sm",
                  style: { color: "rgba(255,255,255,0.65)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                        style: { background: "#00D4FF" }
                      }
                    ),
                    doc
                  ]
                },
                doc
              )) })
            ]
          }
        ),
        scheme.tags && scheme.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2 },
            className: "p-6 rounded-2xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { size: 18, style: { color: "#a78bfa" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-white", children: "Tags" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: scheme.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs px-2.5 py-1 rounded-full",
                  style: {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)"
                  },
                  children: [
                    "#",
                    tag
                  ]
                },
                tag
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "p-5 rounded-2xl",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: scheme.apply_link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 mb-3",
                  style: {
                    background: "linear-gradient(135deg,#6C5CE7,#0984E3)",
                    boxShadow: "0 0 20px rgba(108,92,231,0.3)"
                  },
                  "data-ocid": "scheme.primary_button",
                  children: [
                    "Apply Now ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 14 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleShare,
                  className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/10",
                  style: {
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)"
                  },
                  "data-ocid": "scheme.secondary_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
                    " Share Scheme"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 },
            className: "p-5 rounded-2xl space-y-3",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: "Quick Info" }),
              [
                {
                  label: "Category",
                  value: categoryLabels[scheme.category] ?? scheme.category
                },
                {
                  label: "State",
                  value: scheme.state === "all" ? "All India" : scheme.state
                },
                { label: "Benefit", value: scheme.benefit }
              ].map((info) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.4)" }, children: info.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: info.value })
                  ]
                },
                info.label
              ))
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  SchemeDetailPage as default
};
