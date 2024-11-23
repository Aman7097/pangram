import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e6fe",
          300: "#7cd4fd",
          400: "#36bffa",
          500: "#0da2e7",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        azure: {
          50: "#f0fdff",
          100: "#ccf7fe",
          200: "#99ecfd",
          300: "#66d9fa",
          400: "#33c6f5",
          500: "#00b4f0",
          600: "#0090c1",
          700: "#006c91",
          800: "#004861",
          900: "#002430",
          950: "#001219",
        },
        sky: {
          50: "#f1f9fe",
          100: "#e3f3fd",
          200: "#c5e7fa",
          300: "#a7dbf8",
          400: "#89cff5",
          500: "#6bc3f3",
          600: "#4db7f0",
          700: "#2fabee",
          800: "#1199e7",
          900: "#0d77b6",
          950: "#065585",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
