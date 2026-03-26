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
        bgn: {
          dark: "#071e49",
          green: "#92d05d",
          "light-blue": "#b5e0ea",
          gold: "#d1b06c",
          white: "#ffffff",
          "gray-bg": "#f5f7fa",
          text: "#1a202c",
        },
        risk: {
          high: "#ef4444",
          medium: "#f59e0b",
          low: "#22c55e",
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