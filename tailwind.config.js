// const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard Variable'],
    },
    fontSize: {
      sm: ['12px', '14px'],
      // base: '1rem',
      // xl: '1.25rem',
      md: ['16px', '24px'],
      xl: ['20px', '30px'],
      // '2xl': '1.563rem',
      // '3xl': '1.953rem',
      // '4xl': '2.441rem',
      // '5xl': '3.052rem',
    },
    colors: {
      'gray-dark': '#323438',
      gray: '#85878C',
      'gray-light': '#E5E6E9',
      green: '#00C362',
      blue: '#2196F3',
      // purple: '#7e5bef',
      // pink: '#ff49db',
      // orange: '#ff7849',
      // yellow: '#ffc82c',
    },
    gridTemplateColumns: {
      'card-list': 'repeat(auto-fill, 294px)',
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
