/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    extend: {
      animation: {
        'ripple-start': 'ripple-start 1s linear forwards',
        'ripple-end': 'ripple-end 0.6s linear',
      },
      keyframes: {
        'ripple-start': {
          '0%': {
            opacity: '0',
            transform: 'scale(0)',
          },
          '10%': {
            opacity: '0.7',
            transform: 'scale(0.2)',
          },
          '100%': {
            transform: 'scale(0.7)',
            opacity: '1',
          },
        },
        'ripple-end': {
          '0%': {
            transform: 'scale(0.7)',
            opacity: '1',
          },
          '10%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
