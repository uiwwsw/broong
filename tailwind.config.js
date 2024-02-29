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
        'modal-in': 'modal-in 0.6s forwards',
        'modal-out': 'modal-out 0.5s forwards',
        ripple: 'ripple 0.6s linear forwards',
        'fade-in': 'fade-in 0.3s linear forwards',
        'fade-out': 'fade-out 0.3s linear forwards',
        rotate: 'rotate 2s linear infinite',
        dash: 'dash 1.5s ease-in-out infinite',
        'toast-in': 'toast-in 0.5s forwards',
        'toast-out': 'toast-out 0.3s forwards',
        'tooltip-in': 'tooltip-in 0.6s forwards',
        'tooltip-out': 'tooltip-out 0.5s forwards',
      },
      keyframes: {
        'modal-in': {
          '0%': {
            transform: 'scale(0.3) translate(-50%, -50%)',
          },
          '50%': {
            transform: 'scale(1.3) translate(-50%, -50%)',
          },
          '100%': {
            transform: 'scale(1) translate(-50%, -50%)',
          },
        },
        'modal-out': {
          '0%': {
            transform: 'scale(1) translate(-50%, -50%)',
          },
          '50%': {
            transform: 'scale(0.8) translate(-50%, -50%)',
          },
          '100%': {
            transform: 'scale(0) translate(-50%, -50%)',
          },
        },
        ripple: {
          '10%': {
            opacity: '1',
            transform: 'scale(1) translate(-50%, -50%)',
          },
          '80%': {
            opacity: '0.1',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(4) translate(-50%, -50%)',
          },
        },
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
        rotate: {
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg)',
          },
          '0%': {
            transform: 'translate(-50%, -50%)',
          },
        },
        dash: {
          '0%': {
            'stroke-dasharray': '1, 150',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-35',
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-124',
          },
        },
        'toast-in': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -200%)',
          },
        },
        'toast-out': {
          '0%': {
            opacity: '1',
            transform: 'translate(-50%, -200%)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(-50%, -100%)',
          },
        },

        'tooltip-in': {
          '0%': {
            transform: 'scale(0.3)',
          },
          '50%': {
            transform: 'scale(1.3)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'tooltip-out': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(0.8)',
          },
          '100%': {
            transform: 'scale(0)',
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
