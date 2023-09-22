import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        Lightning_orange: '#FE7E07',
        Lightning_yellow: '#FFDE67',
        border_color: '#667479',
        kakao_yellow: '#FEE500',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        thunder: 'linear-gradient(to top left, #FE7E07, #FFC750)',
      },
    },
  },
  plugins: [],
};
export default config;
