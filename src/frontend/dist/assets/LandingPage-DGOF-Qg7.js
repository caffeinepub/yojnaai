import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, S as Search, C as Calculator, r as reactExports } from "./index-Bx_LFD18.js";
import { P as PageTransition, F as Footer } from "./PageTransition-1HX18WxZ.js";
import { A as ArrowRight } from "./arrow-right-DO2K9KMq.js";
import { C as CircleCheckBig } from "./circle-check-big-C67fZGD2.js";
import { B as Bot } from "./bot-BJ7frEN_.js";
import { T as TrendingUp } from "./trending-up-n4B8WnMe.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function ParticleCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,92,231,${p.opacity})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,92,231,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      className: "absolute inset-0 pointer-events-none",
      style: { opacity: 0.6 }
    }
  );
}
const floatingIcons = [
  { emoji: "🎓", label: "Students", delay: 0 },
  { emoji: "🌾", label: "Farmers", delay: 0.5 },
  { emoji: "👩", label: "Women", delay: 1 },
  { emoji: "👷", label: "Labour", delay: 1.5 },
  { emoji: "💼", label: "Business", delay: 2 },
  { emoji: "👴", label: "Senior Citizens", delay: 2.5 }
];
const features = [
  {
    icon: Search,
    title: "Smart Scheme Finder",
    desc: "AI-powered search that understands your profile and finds the most relevant government schemes instantly.",
    color: "#6C5CE7"
  },
  {
    icon: CircleCheckBig,
    title: "Eligibility Checker",
    desc: "Know instantly if you qualify for a scheme with our intelligent eligibility verification system.",
    color: "#00D4FF"
  },
  {
    icon: Calculator,
    title: "Benefits Calculator",
    desc: "Calculate your total government benefits across all eligible schemes and maximize your entitlements.",
    color: "#a78bfa"
  }
];
const stats = [
  { value: "1000+", label: "Schemes" },
  { value: "28", label: "States" },
  { value: "6", label: "Categories" },
  { value: "AI", label: "Powered" }
];
const steps = [
  {
    n: "01",
    title: "Enter Your Profile",
    desc: "Tell us your state, age, occupation and income category."
  },
  {
    n: "02",
    title: "AI Analyzes",
    desc: "Our AI scans 1000+ schemes to find what matches your profile."
  },
  {
    n: "03",
    title: "Apply & Benefit",
    desc: "Get scheme details, eligibility and direct apply links."
  }
];
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { style: { background: "#0B0F1A" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(108,92,231,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,212,255,0.1) 0%, transparent 60%)",
            animation: "meshPulse 8s ease-in-out infinite"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 7s ease-in-out infinite"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none",
          style: {
            background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "float 9s ease-in-out infinite reverse"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleCanvas, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center relative z-10 pt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8",
            style: {
              background: "rgba(108,92,231,0.15)",
              border: "1px solid rgba(108,92,231,0.3)",
              color: "#a78bfa"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
              "AI-Powered Government Scheme Finder"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            className: "font-display font-black mb-6 leading-none",
            style: { fontSize: "clamp(2.5rem, 7vw, 4.5rem)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Discover Government" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    background: "linear-gradient(135deg, #6C5CE7 0%, #00D4FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },
                  children: "Schemes Instantly"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "text-lg mb-10 max-w-2xl mx-auto",
            style: { color: "#94A3B8" },
            children: "Find scholarships, farmer benefits, and government support programs across India. Powered by AI to match you with the right schemes."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.3 },
            className: "flex flex-col sm:flex-row gap-4 justify-center mb-16",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/search",
                  className: "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-base transition-all hover:scale-105",
                  style: {
                    background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                    boxShadow: "0 0 30px rgba(108,92,231,0.4), 0 4px 20px rgba(0,0,0,0.3)"
                  },
                  "data-ocid": "landing.primary_button",
                  children: [
                    "START NOW ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/categories",
                  className: "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:bg-white/10",
                  style: {
                    border: "1px solid rgba(108,92,231,0.5)",
                    color: "#a78bfa"
                  },
                  "data-ocid": "landing.secondary_button",
                  children: [
                    "BROWSE SCHEMES ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: container,
            initial: "hidden",
            animate: "show",
            className: "flex flex-wrap justify-center gap-3",
            children: floatingIcons.map((ic) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: item,
                className: "flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl cursor-default",
                style: {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  animation: `float ${6 + ic.delay}s ease-in-out infinite`,
                  animationDelay: `${ic.delay * 0.5}s`
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: ic.emoji }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-medium",
                      style: { color: "rgba(255,255,255,0.55)" },
                      children: ic.label
                    }
                  )
                ]
              },
              ic.label
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 border-y",
        style: { borderColor: "rgba(255,255,255,0.05)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: container,
            initial: "hidden",
            whileInView: "show",
            viewport: { once: true },
            className: "grid grid-cols-2 md:grid-cols-4 gap-8 text-center",
            children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: item, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-4xl font-black mb-1",
                  style: {
                    background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  },
                  children: s.value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-sm font-medium",
                  style: { color: "rgba(255,255,255,0.45)" },
                  children: s.label
                }
              )
            ] }, s.label))
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4",
                style: {
                  background: "rgba(108,92,231,0.1)",
                  border: "1px solid rgba(108,92,231,0.2)",
                  color: "#a78bfa"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 12 }),
                  " Features"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-black text-white mb-4",
                style: { fontSize: "clamp(1.8rem, 4vw, 2.5rem)" },
                children: "Everything you need to find your benefits"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-base max-w-xl mx-auto",
                style: { color: "rgba(255,255,255,0.5)" },
                children: "Our AI analyzes thousands of government schemes to find the ones you qualify for."
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          variants: container,
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true },
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: features.map((f) => {
            const Icon = f.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                variants: item,
                whileHover: { y: -4, scale: 1.01 },
                className: "p-8 rounded-2xl group cursor-default",
                style: {
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "box-shadow 0.3s ease"
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${f.color}22, 0 0 80px ${f.color}11`;
                  e.currentTarget.style.borderColor = `${f.color}44`;
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                },
                "data-ocid": "landing.card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                      style: { background: `${f.color}22`, color: f.color },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 22 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-3", children: f.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed",
                      style: { color: "rgba(255,255,255,0.5)" },
                      children: f.desc
                    }
                  )
                ]
              },
              f.title
            );
          })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4",
                style: {
                  background: "rgba(0,212,255,0.1)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#00D4FF"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 12 }),
                  " How It Works"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "font-display font-black text-white mb-4",
                style: { fontSize: "clamp(1.8rem, 4vw, 2.5rem)" },
                children: "Three steps to your benefits"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "flex gap-6 mb-12 last:mb-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0",
                style: {
                  background: "rgba(108,92,231,0.15)",
                  border: "1px solid rgba(108,92,231,0.3)",
                  color: "#a78bfa"
                },
                children: s.n
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white mb-2", children: s.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm",
                  style: { color: "rgba(255,255,255,0.5)" },
                  children: s.desc
                }
              )
            ] })
          ]
        },
        s.n
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "relative rounded-3xl p-12 md:p-16 text-center overflow-hidden",
        style: {
          background: "linear-gradient(135deg, rgba(108,92,231,0.2) 0%, rgba(0,212,255,0.1) 100%)",
          border: "1px solid rgba(108,92,231,0.3)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse at center, rgba(108,92,231,0.15) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendingUp,
            {
              className: "mx-auto mb-6",
              size: 40,
              style: { color: "#6C5CE7" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "font-display font-black text-white mb-4",
              style: { fontSize: "clamp(1.8rem, 4vw, 2.5rem)" },
              children: "Find your government benefits today"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-base mb-8 max-w-xl mx-auto",
              style: { color: "rgba(255,255,255,0.6)" },
              children: "Join thousands of Indians who discovered schemes they were eligible for using YojnaAI."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/search",
              className: "inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold transition-all hover:scale-105",
              style: {
                background: "linear-gradient(135deg, #6C5CE7, #0984E3)",
                boxShadow: "0 0 30px rgba(108,92,231,0.4)"
              },
              "data-ocid": "landing.primary_button",
              children: [
                "Get Started Free ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
              ]
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
export {
  LandingPage as default
};
