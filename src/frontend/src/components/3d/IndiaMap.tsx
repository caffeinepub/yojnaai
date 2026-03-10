import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { Scheme } from "../../data/schemes";
import { filterSchemes } from "../../services/schemeFinder";
import { useSchemesStore } from "../../store/schemesStore";
import SchemeCard from "../SchemeCard";

interface StatePath {
  name: string;
  d: string;
  color: string;
  labelX?: number;
  labelY?: number;
}

const STATES: StatePath[] = [
  {
    name: "Jammu & Kashmir",
    d: "M 220 30 L 280 25 L 310 40 L 320 70 L 300 90 L 270 95 L 240 80 L 210 60 Z",
    color: "#E8A838",
    labelX: 260,
    labelY: 60,
  },
  {
    name: "Ladakh",
    d: "M 280 25 L 360 20 L 390 50 L 370 80 L 320 70 L 310 40 Z",
    color: "#C0392B",
    labelX: 335,
    labelY: 50,
  },
  {
    name: "Himachal Pradesh",
    d: "M 300 90 L 330 85 L 345 100 L 335 115 L 310 115 L 295 105 Z",
    color: "#27AE60",
    labelX: 320,
    labelY: 100,
  },
  {
    name: "Punjab",
    d: "M 240 80 L 270 95 L 285 105 L 275 125 L 250 130 L 230 115 L 225 95 Z",
    color: "#8E44AD",
    labelX: 255,
    labelY: 107,
  },
  {
    name: "Haryana",
    d: "M 275 125 L 295 120 L 310 130 L 305 150 L 285 155 L 270 145 Z",
    color: "#2980B9",
    labelX: 289,
    labelY: 138,
  },
  {
    name: "Delhi",
    d: "M 295 145 L 305 140 L 312 148 L 305 158 L 295 155 Z",
    color: "#E74C3C",
    labelX: 303,
    labelY: 150,
  },
  {
    name: "Uttarakhand",
    d: "M 335 100 L 375 95 L 385 115 L 365 130 L 340 125 L 330 112 Z",
    color: "#16A085",
    labelX: 357,
    labelY: 113,
  },
  {
    name: "Uttar Pradesh",
    d: "M 305 150 L 385 140 L 430 150 L 445 175 L 430 200 L 380 210 L 330 205 L 295 185 L 290 165 Z",
    color: "#D35400",
    labelX: 368,
    labelY: 178,
  },
  {
    name: "Rajasthan",
    d: "M 200 140 L 270 130 L 295 155 L 290 210 L 265 240 L 220 250 L 175 235 L 155 200 L 160 165 Z",
    color: "#F39C12",
    labelX: 225,
    labelY: 195,
  },
  {
    name: "Bihar",
    d: "M 430 160 L 475 155 L 490 170 L 485 195 L 455 205 L 430 200 L 420 180 Z",
    color: "#1ABC9C",
    labelX: 455,
    labelY: 182,
  },
  {
    name: "Jharkhand",
    d: "M 455 200 L 490 195 L 505 215 L 495 240 L 460 245 L 440 230 L 445 210 Z",
    color: "#9B59B6",
    labelX: 472,
    labelY: 222,
  },
  {
    name: "West Bengal",
    d: "M 490 165 L 530 160 L 545 180 L 540 230 L 520 255 L 495 245 L 505 215 L 490 195 Z",
    color: "#3498DB",
    labelX: 517,
    labelY: 210,
  },
  {
    name: "Sikkim",
    d: "M 530 150 L 545 148 L 548 162 L 535 165 Z",
    color: "#E91E63",
    labelX: 539,
    labelY: 157,
  },
  {
    name: "Assam",
    d: "M 545 160 L 605 155 L 625 168 L 615 185 L 575 192 L 545 182 Z",
    color: "#FF5722",
    labelX: 583,
    labelY: 173,
  },
  {
    name: "Arunachal Pradesh",
    d: "M 545 130 L 640 120 L 650 145 L 625 155 L 545 160 L 540 145 Z",
    color: "#795548",
    labelX: 595,
    labelY: 142,
  },
  {
    name: "Nagaland",
    d: "M 620 168 L 640 165 L 645 183 L 628 190 L 615 185 Z",
    color: "#607D8B",
    labelX: 630,
    labelY: 178,
  },
  {
    name: "Manipur",
    d: "M 625 185 L 645 182 L 648 200 L 632 210 L 618 203 Z",
    color: "#009688",
    labelX: 633,
    labelY: 197,
  },
  {
    name: "Mizoram",
    d: "M 618 205 L 635 202 L 638 222 L 620 225 Z",
    color: "#4CAF50",
    labelX: 628,
    labelY: 215,
  },
  {
    name: "Tripura",
    d: "M 575 195 L 595 192 L 600 212 L 580 215 Z",
    color: "#FF9800",
    labelX: 587,
    labelY: 204,
  },
  {
    name: "Meghalaya",
    d: "M 545 185 L 580 182 L 585 198 L 560 205 L 542 198 Z",
    color: "#673AB7",
    labelX: 563,
    labelY: 194,
  },
  {
    name: "Odisha",
    d: "M 495 245 L 535 238 L 545 265 L 535 295 L 505 300 L 480 285 L 475 260 Z",
    color: "#F44336",
    labelX: 510,
    labelY: 272,
  },
  {
    name: "Madhya Pradesh",
    d: "M 265 240 L 380 230 L 420 240 L 430 270 L 405 295 L 360 305 L 310 300 L 270 285 L 255 265 Z",
    color: "#FF6B35",
    labelX: 340,
    labelY: 270,
  },
  {
    name: "Chhattisgarh",
    d: "M 420 240 L 460 245 L 480 265 L 475 300 L 450 315 L 420 310 L 400 290 L 405 265 Z",
    color: "#2ECC71",
    labelX: 440,
    labelY: 280,
  },
  {
    name: "Gujarat",
    d: "M 130 235 L 200 230 L 230 250 L 235 285 L 210 305 L 170 310 L 135 290 L 120 265 Z",
    color: "#E67E22",
    labelX: 178,
    labelY: 272,
  },
  {
    name: "Maharashtra",
    d: "M 220 290 L 330 285 L 380 295 L 390 325 L 365 360 L 300 370 L 245 355 L 210 330 L 215 305 Z",
    color: "#8B5CF6",
    labelX: 300,
    labelY: 330,
  },
  {
    name: "Telangana",
    d: "M 380 300 L 450 295 L 460 320 L 440 350 L 395 355 L 372 335 Z",
    color: "#EC4899",
    labelX: 415,
    labelY: 328,
  },
  {
    name: "Andhra Pradesh",
    d: "M 380 355 L 450 348 L 480 370 L 470 410 L 430 425 L 385 415 L 360 390 L 362 368 Z",
    color: "#06B6D4",
    labelX: 420,
    labelY: 390,
  },
  {
    name: "Karnataka",
    d: "M 245 370 L 365 365 L 380 395 L 360 440 L 315 455 L 270 445 L 240 415 L 232 385 Z",
    color: "#F59E0B",
    labelX: 305,
    labelY: 412,
  },
  {
    name: "Goa",
    d: "M 232 380 L 248 375 L 255 390 L 240 397 Z",
    color: "#10B981",
    labelX: 243,
    labelY: 387,
  },
  {
    name: "Tamil Nadu",
    d: "M 330 455 L 395 448 L 415 475 L 400 530 L 360 550 L 330 535 L 310 500 L 315 470 Z",
    color: "#3B82F6",
    labelX: 362,
    labelY: 500,
  },
  {
    name: "Kerala",
    d: "M 285 450 L 330 445 L 335 475 L 320 530 L 290 540 L 270 510 L 272 475 Z",
    color: "#EF4444",
    labelX: 302,
    labelY: 495,
  },
  {
    name: "Andaman & Nicobar",
    d: "M 620 330 L 630 325 L 640 355 L 635 390 L 622 395 L 612 360 Z",
    color: "#14B8A6",
    labelX: 626,
    labelY: 360,
  },
  {
    name: "Lakshadweep",
    d: "M 225 480 L 232 475 L 235 488 L 228 492 Z",
    color: "#6366F1",
    labelX: 230,
    labelY: 484,
  },
];

const LARGE_STATES = [
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Rajasthan",
  "Maharashtra",
  "Karnataka",
  "Andhra Pradesh",
  "Tamil Nadu",
  "Gujarat",
  "Odisha",
  "Chhattisgarh",
  "Bihar",
  "Assam",
  "West Bengal",
];

export default function IndiaMap() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { schemes } = useSchemesStore();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [stateSchemes, setStateSchemes] = useState<Scheme[]>([]);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);

  const handleStateClick = (name: string) => {
    if (selectedState === name) {
      setSelectedState(null);
      setStateSchemes([]);
      return;
    }
    setSelectedState(name);
    const filtered = filterSchemes({ state: name }, schemes);
    setStateSchemes(
      filtered.length > 0 ? filtered : filterSchemes({}, schemes).slice(0, 4),
    );
  };

  const handleMouseMove = (
    e: React.MouseEvent<SVGPathElement>,
    name: string,
  ) => {
    const svg = e.currentTarget.closest("svg") as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    const svgWidth = svg.viewBox.baseVal.width;
    const svgHeight = svg.viewBox.baseVal.height;
    const scaleX = svgWidth / rect.width;
    const scaleY = svgHeight / rect.height;
    setTooltip({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY - 10,
      name,
    });
  };

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #0B0F1A 0%, #0d1428 50%, #0B0F1A 100%)"
          : "#FFF8F0",
      }}
    >
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,92,231,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: isDark ? "#00D4FF" : "#FF6B00" }}
          >
            Interactive Map
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: isDark ? "white" : "#1a1a2e" }}
          >
            Explore Schemes{" "}
            <span
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #6C5CE7, #00D4FF)"
                  : "linear-gradient(135deg, #FF6B00, #138808)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              by State
            </span>
          </h2>
          <p
            className="max-w-lg mx-auto text-base"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "#666" }}
          >
            Click any state on the map to discover government schemes available
            there.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* SVG Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:flex-1 rounded-3xl overflow-hidden relative"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.02)",
              border: `1px solid ${
                isDark ? "rgba(108,92,231,0.2)" : "rgba(255,107,0,0.15)"
              }`,
            }}
          >
            <svg
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              style={{ display: "block", minHeight: 340 }}
              aria-label="Interactive map of India - click a state to explore government schemes"
              role="img"
              onMouseLeave={() => {
                setHoveredState(null);
                setTooltip(null);
              }}
            >
              {/* Ocean/background */}
              <rect
                width="800"
                height="600"
                fill={isDark ? "#090d1a" : "#e8f4fc"}
              />

              {/* State paths */}
              {STATES.map((state) => {
                const isSelected = selectedState === state.name;
                const isHovered = hoveredState === state.name;
                let fill = state.color;
                if (isDark) {
                  fill =
                    isSelected || isHovered ? state.color : `${state.color}99`;
                } else {
                  fill =
                    isSelected || isHovered ? state.color : `${state.color}cc`;
                }

                return (
                  <g key={state.name}>
                    <path
                      d={state.d}
                      fill={fill}
                      stroke={
                        isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.7)"
                      }
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                      style={{
                        cursor: "pointer",
                        filter: isSelected
                          ? `drop-shadow(0 0 8px ${state.color})`
                          : isHovered
                            ? `drop-shadow(0 0 4px ${state.color}88)`
                            : "none",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => handleStateClick(state.name)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          handleStateClick(state.name);
                      }}
                      onMouseEnter={() => setHoveredState(state.name)}
                      onMouseMove={(e) => handleMouseMove(e, state.name)}
                      onMouseLeave={() => {
                        setHoveredState(null);
                        setTooltip(null);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${state.name} - click to view schemes`}
                      data-ocid="map.map_marker"
                    />
                    {/* Label for larger states */}
                    {state.labelX &&
                      state.labelY &&
                      LARGE_STATES.includes(state.name) && (
                        <text
                          x={state.labelX}
                          y={state.labelY}
                          textAnchor="middle"
                          fontSize="7"
                          fontWeight="600"
                          fill={
                            isDark
                              ? "rgba(255,255,255,0.85)"
                              : "rgba(0,0,0,0.75)"
                          }
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {state.name.length > 14
                            ? state.name.split(" ").slice(0, 2).join(" ")
                            : state.name}
                        </text>
                      )}
                  </g>
                );
              })}

              {/* Tooltip */}
              {tooltip && (
                <g>
                  <rect
                    x={Math.min(tooltip.x - 40, 650)}
                    y={tooltip.y - 28}
                    width={Math.min(tooltip.name.length * 6 + 16, 160)}
                    height={22}
                    rx={6}
                    fill={
                      isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)"
                    }
                    stroke={
                      isDark ? "rgba(108,92,231,0.4)" : "rgba(255,107,0,0.3)"
                    }
                    strokeWidth={1}
                  />
                  <text
                    x={
                      Math.min(tooltip.x - 40, 650) +
                      Math.min(tooltip.name.length * 6 + 16, 160) / 2
                    }
                    y={tooltip.y - 13}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill={isDark ? "#ffffff" : "#1a1a2e"}
                    style={{ pointerEvents: "none" }}
                  >
                    {tooltip.name}
                  </text>
                </g>
              )}
            </svg>

            {!selectedState && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-3 py-1.5 rounded-full whitespace-nowrap"
                style={{
                  background: isDark
                    ? "rgba(0,0,0,0.6)"
                    : "rgba(255,255,255,0.9)",
                  color: isDark ? "rgba(255,255,255,0.5)" : "#888",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                  }`,
                }}
              >
                Click a state to explore its schemes
              </div>
            )}
          </motion.div>

          {/* Side panel */}
          <AnimatePresence>
            {selectedState && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.35 }}
                className="w-full lg:w-96 rounded-3xl p-6 flex flex-col gap-4"
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                  border: `1px solid ${
                    isDark ? "rgba(108,92,231,0.25)" : "rgba(255,107,0,0.15)"
                  }`,
                  boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.08)",
                  maxHeight: "520px",
                  overflowY: "auto",
                }}
                data-ocid="map.panel"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: isDark ? "#00D4FF" : "#FF6B00" }}
                    >
                      Schemes in
                    </p>
                    <h3
                      className="text-xl font-black"
                      style={{ color: isDark ? "white" : "#1a1a2e" }}
                    >
                      {selectedState}
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedState(null);
                      setStateSchemes([]);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                      color: isDark ? "rgba(255,255,255,0.6)" : "#666",
                    }}
                    type="button"
                    data-ocid="map.close_button"
                  >
                    ✕
                  </button>
                </div>

                <p
                  className="text-sm"
                  style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#888" }}
                >
                  {stateSchemes.length} schemes available
                </p>

                <div className="flex flex-col gap-3">
                  {stateSchemes.slice(0, 4).map((s, i) => (
                    <SchemeCard key={s.id} scheme={s} index={i} />
                  ))}
                  {stateSchemes.length === 0 && (
                    <p
                      className="text-sm py-4 text-center"
                      style={{
                        color: isDark ? "rgba(255,255,255,0.4)" : "#aaa",
                      }}
                      data-ocid="map.empty_state"
                    >
                      No specific schemes for this state.
                    </p>
                  )}
                </div>

                <Link
                  to="/schemes/$category"
                  params={{ category: "general" }}
                  className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: isDark
                      ? "linear-gradient(135deg, #6C5CE7, #00D4FF)"
                      : "linear-gradient(135deg, #FF6B00, #138808)",
                    color: "white",
                  }}
                  data-ocid="map.primary_button"
                >
                  View All Schemes →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
