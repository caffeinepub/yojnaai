import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, m as motion } from "./index-DTEjVTMM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
const schemeCategories = [
  { label: "Student Schemes", to: "/schemes/student" },
  { label: "Farmer Schemes", to: "/schemes/farmer" },
  { label: "Women Schemes", to: "/schemes/women" },
  { label: "SC/ST Schemes", to: "/schemes/sc-st" },
  { label: "Labour Schemes", to: "/schemes/labour" },
  { label: "Senior Citizen Schemes", to: "/schemes/senior" }
];
const platformLinks = [
  { label: "Search Schemes", to: "/search" },
  { label: "Categories", to: "/categories" },
  { label: "Benefits Calculator", to: "/calculator" },
  { label: "Admin Panel", to: "/admin" }
];
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "yojnaai.com";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "border-t pt-16 pb-8",
      style: { borderColor: "rgba(255,255,255,0.05)", background: "#0B0F1A" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                className: "flex items-center gap-2 mb-4",
                "data-ocid": "footer.link",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white",
                      style: {
                        background: "linear-gradient(135deg, #6C5CE7, #00D4FF)"
                      },
                      children: "Y"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-lg font-black",
                      style: {
                        background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      },
                      children: "YojnaAI"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm leading-relaxed mb-4",
                style: { color: "rgba(255,255,255,0.45)" },
                children: "India's smartest AI-powered platform to discover and apply for government welfare schemes."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.25)" }, children: [
              "Made with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Heart,
                {
                  className: "inline w-3 h-3 text-red-400",
                  fill: "currentColor"
                }
              ),
              " ",
              "for India"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: platformLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                className: "text-sm transition-colors hover:text-white",
                style: { color: "rgba(255,255,255,0.45)" },
                "data-ocid": "footer.link",
                children: l.label
              }
            ) }, l.to)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "Scheme Categories" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: schemeCategories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: c.to,
                className: "text-sm transition-colors hover:text-white",
                style: { color: "rgba(255,255,255,0.45)" },
                "data-ocid": "footer.link",
                children: c.label
              }
            ) }, c.to)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-white mb-4", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
              { label: "Privacy Policy", href: "#" },
              { label: "Terms & Conditions", href: "#" },
              { label: "Contact Us", href: "#" }
            ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: l.href,
                className: "text-sm transition-colors hover:text-white",
                style: { color: "rgba(255,255,255,0.45)" },
                children: l.label
              }
            ) }, l.label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4",
            style: { borderColor: "rgba(255,255,255,0.05)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.3)" }, children: [
                "© ",
                year,
                " YojnaAI. All rights reserved."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: caffeineUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-xs flex items-center gap-1.5 transition-colors hover:text-white",
                  style: { color: "rgba(255,255,255,0.3)" },
                  children: [
                    "Built with",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 text-red-400", fill: "currentColor" }),
                    " using caffeine.ai",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 })
                  ]
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function PageTransition({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      children
    }
  );
}
export {
  ExternalLink as E,
  Footer as F,
  PageTransition as P
};
