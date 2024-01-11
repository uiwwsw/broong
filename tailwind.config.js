/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    extend: {
      animation: {
        ripple: 'ripple 0.6s linear forwards',
      },
      keyframes: {
        ripple: {
          '10%': {
            opacity: '1',
            transform: 'scale(1) translate(-50%, -50%)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(4) translate(-50%, -50%)',
          },
        },
      },
    },
  },
  plugins: [],
};
