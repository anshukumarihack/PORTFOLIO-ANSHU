/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: {
          blue:   '#3DD6C8', // jade mint     (primary accent)
          purple: '#F2A65A', // warm gold      (secondary accent)
          cyan:   '#A8E6CF', // soft mint      (highlight text)
          pink:   '#E8654E', // coral          (heart / special icons)
          green:  '#7FB069', // meadow         (success / positive states)
        },
        dark: {
          50:  '#E8F0EF',
          100: '#C5D5D2',
          200: '#A0B8B4',
          300: '#7B918E',
          400: '#5A6F6D',
          500: '#3F5450',
          600: '#2D3D3A',
          700: '#1F2B29',
          800: '#141E1C',
          900: '#0B1413',
          950: '#050A09',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'spin-slow':  'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'float':      'float 7s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'xp-fill':    'xp-fill 1.2s ease-out forwards',
        'glitch':     'glitch 0.4s ease-in-out',
        'scan-line':  'scan-line 4s linear infinite',
        'badge-pop':  'badge-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1',   boxShadow: '0 0 20px rgba(61,214,200,0.25)' },
          '50%':      { opacity: '0.8', boxShadow: '0 0 40px rgba(61,214,200,0.45)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'xp-fill': {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--xp-target)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%':      { transform: 'translate(-2px, 1px)' },
          '40%':      { transform: 'translate(2px, -1px)' },
          '60%':      { transform: 'translate(-1px, -1px)' },
          '80%':      { transform: 'translate(1px, 1px)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'badge-pop': {
          '0%':   { transform: 'scale(0) rotate(-15deg)' },
          '70%':  { transform: 'scale(1.15) rotate(5deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
