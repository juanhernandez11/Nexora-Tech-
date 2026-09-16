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
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a5f8',
          500: '#0071e3',
          600: '#0071e3',
          700: '#005bb5',
          800: '#004c99',
          900: '#003366',
        },
        accent: {
          400: '#2997ff',
          500: '#0071e3',
          600: '#0077ed',
        },
      },
      boxShadow: {
        brand: '0 8px 30px rgba(0,113,227,0.18)',
        'brand-lg': '0 20px 60px rgba(0,113,227,0.22)',
      },
      animation: {
        meteor: 'meteor 5s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        shimmer: 'shimmer 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        'border-beam': {
          '100%': {
            offsetDistance: '100%',
          },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
