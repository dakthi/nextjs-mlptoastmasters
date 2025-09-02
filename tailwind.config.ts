import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        primary: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99cfff',
          300: '#66b7ff',
          400: '#339fff',
          500: '#004165', // Official Toastmasters Blue
          600: '#003a5c',
          700: '#003352',
          800: '#002d49',
          900: '#00263f',
          950: '#001f36',
        },
        accent: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d6',
          300: '#f5a8b5',
          400: '#ef7489',
          500: '#772432', // Official Toastmasters Burgundy
          600: '#6b202c',
          700: '#5f1c27',
          800: '#531822',
          900: '#47141d',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
              fontSize: "2.5rem",
              letterSpacing: "-0.02em",
            },
            p: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.75",
            },
            ul: {
              color: "#444",
              fontSize: "1.1rem",
              lineHeight: "1.60",
              textAlign: "left",
            },
            a: {
              color: "#3b82f6",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            code: {
              backgroundColor: "#f3f4f6",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              textAlign: "left",
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "system-ui", ...defaultTheme.fontFamily.sans],
      heading: ["Inter", "system-ui", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      tight: '1.1',
      snug: '1.2',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
