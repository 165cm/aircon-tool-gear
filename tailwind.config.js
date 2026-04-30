/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#07141F',
          800: '#0B2233',
          900: '#06101A',
        },
        steel: {
          DEFAULT: '#0F6B8D',
          700: '#0A5875',
          800: '#08445C',
        },
        orange: {
          DEFAULT: '#F97316',
          500: '#F97316',
          600: '#EA580C',
        },
        metal: {
          DEFAULT: '#6F7A80',
          100: '#D9E0E4',
          200: '#C4CED4',
          300: '#9EABB3',
          700: '#3A454C',
        },
        paper: '#F4F7F8',
        charcoal: '#1B1F23',
      },
      backgroundImage: {
        'navy-radial':
          'radial-gradient(circle at 50% 0%, rgba(31,111,139,0.28), transparent 38%), linear-gradient(180deg, #07141F 0%, #06101A 100%)',
        'metal-line':
          'linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.02), rgba(255,255,255,0.16))',
      },
      boxShadow: {
        cta: '0 12px 24px rgba(249, 115, 22, 0.28), inset 0 1px 0 rgba(255,255,255,0.26)',
        metal: '0 16px 34px rgba(7, 20, 31, 0.24), inset 0 1px 0 rgba(255,255,255,0.12)',
        panel: '0 10px 26px rgba(7, 20, 31, 0.1)',
        steel: '0 12px 28px rgba(15, 107, 141, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-16deg)' },
          '100%': { transform: 'translateX(220%) skewX(-16deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 520ms ease-out both',
        sheen: 'sheen 2.8s ease-in-out infinite',
      },
      fontFamily: {
        sans: [
          '"Noto Sans JP"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          '"YuGothic"',
          '"Meiryo"',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
