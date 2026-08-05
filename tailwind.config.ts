import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A14",
        surface: {
          DEFAULT: "#12121F",
          hover: "#1A1A2E",
          card: "#11111E",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(139, 92, 246, 0.3)",
        },
        accent: {
          purple: "#8B5CF6",
          blue: "#3B82F6",
          magenta: "#A855F7",
          cyan: "#00F0FF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(to right, #8B5CF6, #3B82F6)",
        "gradient-accent-vertical": "linear-gradient(to bottom, #8B5CF6, #3B82F6)",
        "gradient-radial-purple":
          "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        "gradient-radial-blue":
          "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.3)",
        "glow-cyan": "0 0 25px -5px rgba(0, 240, 255, 0.3)",
        "card-hover": "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
