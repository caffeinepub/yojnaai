import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart } from "lucide-react";

const schemeCategories = [
  { label: "Student Schemes", to: "/schemes/student" },
  { label: "Farmer Schemes", to: "/schemes/farmer" },
  { label: "Women Schemes", to: "/schemes/women" },
  { label: "SC/ST Schemes", to: "/schemes/sc-st" },
  { label: "Labour Schemes", to: "/schemes/labour" },
  { label: "Senior Citizen Schemes", to: "/schemes/senior" },
];

const platformLinks = [
  { label: "Search Schemes", to: "/search" },
  { label: "Categories", to: "/categories" },
  { label: "Benefits Calculator", to: "/calculator" },
  { label: "Admin Panel", to: "/admin" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "yojnaai.com";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="border-t pt-16 pb-8"
      style={{ borderColor: "rgba(255,255,255,0.05)", background: "#0B0F1A" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4"
              data-ocid="footer.link"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
                }}
              >
                Y
              </div>
              <span
                className="text-lg font-black"
                style={{
                  background: "linear-gradient(135deg, #6C5CE7, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YojnaAI
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              India's smartest AI-powered platform to discover and apply for
              government welfare schemes.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Made with{" "}
              <Heart
                className="inline w-3 h-3 text-red-400"
                fill="currentColor"
              />{" "}
              for India
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Scheme Categories
            </h4>
            <ul className="space-y-2.5">
              {schemeCategories.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    data-ocid="footer.link"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms & Conditions", href: "#" },
                { label: "Contact Us", href: "#" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {year} YojnaAI. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1.5 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Built with{" "}
            <Heart className="w-3 h-3 text-red-400" fill="currentColor" /> using
            caffeine.ai
            <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
