import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: { max: "767px" },
    },
    extend: {
      colors: {
        thunderOrange: "#FE7E07",
        thunderYellow: "#FFDE67",
        border_color: "#667479",
        kakao_yellow: "#FEE500",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        thunder: "linear-gradient(to top left, #FE7E07, #FFC750)",
      },
      keyframes: {
        "skeleton-gradient": {
          "0%": {
            backgroundColor: "rgba(165, 165, 165, 0.1)",
          },
          "50%": {
            backgroundColor: "rgba(165, 165, 165, 0.3)",
          },
          "100%": {
            backgroundColor: "rgba(165, 165, 165, 0.1)",
          },
        },
      },
      animation: {
        "skeleton-gradient": "skeleton-gradient 1.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
