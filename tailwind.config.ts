import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        accent: "#C41E3A",
        dark: "#121212",
        black: "#0A0A0A",
        white: "#F5F5F0",
        "bg-light": "#1a1a1a",
        "bg-subtle": "rgba(212, 175, 55, 0.04)",
        "text-primary": "#F5F5F0",
        "text-secondary": "#B0B0A8",
        "text-tertiary": "#999999",
        border: "rgba(212, 175, 55, 0.1)",
        "border-accent": "rgba(212, 175, 55, 0.15)",
      },
      fontFamily: {
        serif: ['"EB Garamond"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "13px",
        md: "14px",
        lg: "15px",
        xl: "16px",
        "2xl": "18px",
        "3xl": "28px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "56px",
      },
      spacing: {
        xs: "6px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "60px",
        "5xl": "80px",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        pill: "20px",
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        base: "0 4px 6px rgba(0, 0, 0, 0.1)",
        md: "0 12px 28px rgba(0, 0, 0, 0.15)",
        lg: "0 24px 48px rgba(196, 30, 58, 0.2)",
      },
      letterSpacing: {
        tighter: "-1px",
        tight: "-0.5px",
        normal: "0px",
        wide: "0.5px",
        wider: "1px",
        widest: "2px",
        "3x": "3px",
      },
      dropShadow: {
        lg: "0 20px 40px rgba(212, 175, 55, 0.15)",
      },
      zIndex: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        auto: "auto",
        sticky: "999",
      },
    },
  },
  plugins: [],
};

export default config;
