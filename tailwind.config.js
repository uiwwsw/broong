// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    extend: {},
  },
  plugins: [
    // plugin(function ({ addVariant }) {
    //   addVariant('optional', '&:optional');
    //   addVariant('group-optional', ':merge(.group):optional &');
    //   addVariant('peer-optional', ':merge(.peer):optional ~ &');
    // }),
  ],
};
