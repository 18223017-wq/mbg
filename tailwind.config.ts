import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Color
        primary: {
          DEFAULT: "#071e49",
          darker: "#13151a",
          light: "#EAF0FA",
        },
        // Neutrals & Grays
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          150: "#f3f4f6",
          200: "#e2e8f0",
          300: "#e5e7eb",
          400: "#d1d5db",
          500: "#9ca3af",
          600: "#6b7280",
          700: "#4b5563",
          800: "#374151",
          900: "#1f2937",
          950: "#111827",
          black: "#18181b",
        },
        // Gold Palette (Extended) — Main Accent
        gold: {
          50: "#fffbf0",
          100: "#fef6e8",
          150: "#f6efe2",
          200: "#ece4d1",
          300: "#e5d5b4",
          400: "#dcc59e",
          500: "#d1b06c",
          600: "#c49a52",
          700: "#a8823f",
          800: "#8a6830",
          900: "#6b5226",
          950: "#4d3a1a",
        },
        // Status/Risk Colors
        risk: {
          high: "#ef4444",
          medium: "#f59e0b",
          low: "#22c55e",
        },
        // MBG Brand Palette
        bgn: {
          dark: "#071e49",
          green: "#92d05d",
          "light-blue": "#b5e0ea",
          gold: "#d1b06c",
          "gold-light": "#f6efe2",
          "gold-dark": "#8a6830",
          white: "#ffffff",
          "gray-bg": "#f5f7fa",
          text: "#1a202c",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;