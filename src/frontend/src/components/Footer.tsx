import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart } from "lucide-react";

const schemeCategories = [
  { label: "Student Schemes", to: "/schemes/student" },
  { label: "Farmer Schemes", to: "/schemes/farmer" },
  { label: "Women Schemes", to: "/schemes/women" },
  { label: "SC/ST Schemes", to: "/schemes/sc-st" },
  { label: "Labour Schemes", to: "/schemes/labour" },
  { label: "Senior Citizen Schemes", to: "/schemes/senior" },
  { label: "Differently Abled", to: "/schemes/disabled" },
];

const popularSchemes = [
  { label: "PM Kisan Samman Nidhi", slug: "pm-kisan-samman-nidhi" },
  { label: "Ayushman Bharat", slug: "ayushman-bharat-pm-jay" },
  { label: "PM Awas Yojana Urban", slug: "pm-awas-yojana-urban" },
  { label: "MNREGA", slug: "mnrega-mahatma-gandhi-nregs" },
  { label: "Sukanya Samriddhi", slug: "sukanya-samriddhi-yojana" },
  { label: "PM Scholarship", slug: "pm-scholarship-scheme" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "yojnaai.com";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="border-t border-white/5 bg-[#0B0F1A] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 mb-4"
              data-ocid="footer.link"
            >
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-10-2026-08_29_10-AM-2.png"
                alt="YojnaAI"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              India's smartest AI-powered platform to discover and apply for
              government welfare schemes.
            </p>
            <p className="text-white/30 text-xs">
              Made with{" "}
              <Heart
                className="inline w-3 h-3 text-red-400"
                fill="currentColor"
              />{" "}
              for India
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
              Schemes by Category
            </h4>
            <ul className="flex flex-col gap-2">
              {schemeCategories.map((cat) => (
                <li key={cat.to}>
                  <Link
                    to={cat.to}
                    className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors"
                    data-ocid="footer.link"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Schemes */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
              Popular Schemes
            </h4>
            <ul className="flex flex-col gap-2">
              {popularSchemes.map((scheme) => (
                <li key={scheme.slug}>
                  <Link
                    to="/scheme/$slug"
                    params={{ slug: scheme.slug }}
                    className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors"
                    data-ocid="footer.link"
                  >
                    {scheme.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white/90 mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors"
                  data-ocid="footer.link"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap.xml"
                  className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors"
                  data-ocid="footer.link"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <a
                  href="https://www.india.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors inline-flex items-center gap-1"
                >
                  India.gov.in <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://scholarships.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 hover:text-[#6C5CE7] transition-colors inline-flex items-center gap-1"
                >
                  NSP Portal <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            &copy; {year} YojnaAI. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Built with{" "}
            <Heart
              className="inline w-3 h-3 text-[#6C5CE7]"
              fill="currentColor"
            />{" "}
            using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6C5CE7] hover:text-[#00D4FF] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
