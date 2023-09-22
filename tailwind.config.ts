import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ["pretend", "system-ui"],
        pop: ["poppins", "sans-serif"],
        pop_b: ["poppins_bold", "sans-serif"],
        pop_sb: ["poppins_semibold", "sans-serif"],
        pretend: ["pretend", "system-ui"],
        pretend_b: ["pretend_bold", "system-ui"],
        pretend_sb: ["pretend_semibold", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
