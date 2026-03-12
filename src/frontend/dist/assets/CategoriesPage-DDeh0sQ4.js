import { j as jsxRuntimeExports, m as motion, L as Link } from "./index-Bx_LFD18.js";
import { P as PageTransition, F as Footer } from "./PageTransition-1HX18WxZ.js";
import { u as useSchemesStore, c as categoryLabels, a as categoryEmojis } from "./schemesStore-HowxT_LG.js";
import { A as ArrowRight } from "./arrow-right-DO2K9KMq.js";
const categoryColors = {
  student: "#6C5CE7",
  farmer: "#00b894",
  women: "#fd79a8",
  labour: "#fdcb6e",
  business: "#0984E3",
  senior: "#a29bfe",
  "sc-st": "#e17055",
  disabled: "#74b9ff",
  general: "#00D4FF"
};
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
function CategoriesPage() {
  const { schemes } = useSchemesStore();
  const categoryList = Object.entries(categoryLabels).map(([k, v]) => ({
    key: k,
    label: v,
    emoji: categoryEmojis[k] ?? "🇮🇳",
    count: schemes.filter((s) => s.category === k).length,
    color: categoryColors[k] ?? "#6C5CE7"
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A", minHeight: "100vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "relative pt-24 pb-16 overflow-hidden",
        style: {
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,92,231,0.1) 0%, transparent 70%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              children: "🇮🇳 Browse by Category"
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
                "Scheme",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(135deg,#6C5CE7,#00D4FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    },
                    children: "Categories"
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
              children: "Browse government schemes by category. Find what's right for you."
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        variants: container,
        initial: "hidden",
        animate: "show",
        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6",
        children: categoryList.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: item, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/search",
            search: { category: c.key },
            className: "block p-8 rounded-2xl group transition-all",
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.borderColor = `${c.color}55`;
              e.currentTarget.style.boxShadow = `0 0 40px ${c.color}18`;
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.boxShadow = "none";
            },
            "data-ocid": `categories.item.${categoryList.indexOf(c) + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-5", children: c.emoji }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-1", children: c.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm mb-4",
                  style: { color: "rgba(255,255,255,0.4)" },
                  children: c.count > 0 ? `${c.count} schemes available` : "Schemes available"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1 text-xs font-medium",
                  style: { color: c.color },
                  children: [
                    "Browse schemes ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                  ]
                }
              )
            ]
          }
        ) }, c.key))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  CategoriesPage as default
};
