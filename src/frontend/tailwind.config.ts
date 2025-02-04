import type { Config } from "tailwindcss";
import { heroui } from '@heroui/react';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightbrown: "var(--lightbrown)",
        darkbrown: "var(--darkbrown)",
        lightgray: "var(--lightgray)",
        mediumgray: "var(--mediumgray)",
        darkgray: "var(--darkgray)",
      },
    },
  },
  darkMode:"class",
  plugins: [heroui()],
} satisfies Config;
