import { useEffect } from "react";
import { useSchemesStore } from "../store/schemesStore";

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://yojnaai.com";

const staticRoutes = [
  "/",
  "/schemes/student",
  "/schemes/farmer",
  "/schemes/women",
  "/schemes/sc-st",
  "/schemes/labour",
  "/schemes/senior",
  "/schemes/disabled",
  "/schemes/general",
];

export default function SitemapPage() {
  const { schemes } = useSchemesStore();

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticRoutes.map(
      (route) =>
        `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
    ),
    ...schemes.map(
      (s) =>
        `  <url>\n    <loc>${BASE_URL}/scheme/${s.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    ),
    "</urlset>",
  ].join("\n");

  useEffect(() => {
    document.title = "Sitemap - YojnaAI";
  }, []);

  return (
    <div
      style={{
        background: "#0B0F1A",
        minHeight: "100vh",
        padding: "80px 20px 40px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 className="text-2xl font-bold text-white mb-6">Sitemap</h1>
        <pre
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "24px",
            color: "rgba(255,255,255,0.6)",
            fontSize: "12px",
            lineHeight: "1.8",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {xml}
        </pre>
      </div>
    </div>
  );
}
