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
        lightbrown: "var(--lightbrown)",
        darkbrown: "var(--darkbrown)",
        lightgray: "var(--lightgray)",
        mediumgray: "var(--mediumgray)",
        darkgray: "var(--darkgray)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
