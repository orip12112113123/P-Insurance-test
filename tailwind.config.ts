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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0066CC",
          dark: "#004499",
          light: "#3388DD",
        },
        secondary: {
          DEFAULT: "#FF6B35",
          dark: "#CC5528",
          light: "#FF8C5C",
        },
      },
    },
  },
  plugins: [],
};
export default config;
