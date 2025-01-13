import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(calendar|button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        lightgray: "var(--lightgray)",
        mediumgray: "var(--mediumgray)",
        darkgray: "var(--darkgray)",
        smallfont: "var(--smallfont)",
        mediumfont: "var(--mediumfont)",
        largefont: "var(--largefont)"
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
