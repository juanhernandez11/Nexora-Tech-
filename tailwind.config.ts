import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#F0F8D9',
          100: '#DDF4A8',
          400: '#D7F59B',
          500: '#B9E95B',
          600: '#91C83E',
          700: '#6E9E2D',
          800: '#4A7022',
          900: '#2D471A',
        },
        accent: {
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      boxShadow: {
        brand:    '0 8px 30px rgba(145,200,62,0.22)',
        'brand-lg': '0 20px 60px rgba(145,200,62,0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
