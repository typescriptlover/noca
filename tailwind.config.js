const tailwindColors = require('tailwindcss/colors');
const colors = require('./tailwind.colors');

const fallback = [
   'system-ui',
   '-apple-system',
   'BlinkMacSystemFont',
   'Segoe UI',
   'Roboto',
   'Helvetica Neue',
   'Arial',
   'Noto Sans',
   'sans-serif',
   'Apple Color Emoji',
   'Segoe UI Emoji',
   'Segoe UI Symbol',
   'Noto Color Emoji',
];

/** @type {import('tailwindcss').Config} */
module.exports = {
   mode: 'jit',
   content: ['./index.html', './src/**/*.{ts,tsx}'],
   theme: {
      fontFamily: {
         inter: ['Inter var', ...fallback],
      },
      extend: {
         keyframes: {
            bump: {
               '0%': { transform: 'scale(1)' },
               '50%': { transform: 'scale(1.2)' },
               '100%': { transform: 'scale(1)' },
            },
         },
         animation: {
            bump: 'bump 0.3s ease-in-out',
         },
         colors: {
            ...tailwindColors,
            ...colors,
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [require('@tailwindcss/typography')],
};
