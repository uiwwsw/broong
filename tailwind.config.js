// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    extend: {
      animation: {
        'fade-in': 'fade-in 0.6s linear',
        'fade-out': 'fade-out 0.6s linear',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    // plugin(function ({ addVariant }) {
    //   addVariant('optional', '&:optional');
    //   addVariant('group-optional', ':merge(.group):optional &');
    //   addVariant('peer-optional', ':merge(.peer):optional ~ &');
    // }),
  ],
};
