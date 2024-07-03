import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      colors: {
      primary: 'oklch(66.28% 0.24 151.4 / <alpha-value>)',
      secondary: 'oklch(66.35% 0.299 7.04 / <alpha-value>)',
      tertiary: 'oklch(65.49% 0.1937998046114747 239.2963644488785 / <alpha-value>)',
    }
    },
  },
  plugins: [],
};
export default config;
