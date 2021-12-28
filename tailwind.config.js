const colors = require('tailwindcss/colors');

module.exports = {
   mode: 'jit',
   content: ['./src/**/*.{ts,tsx}'],
   theme: {
      fontFamily: {
         inter: [
            'Inter var',
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
         ],
      },
      extend: {
         keyframes: {
            bump: {
               '0%': { transform: 'scale(1)' },
               '50%': { transform: 'scale(1.15)' },
               '100%': { transform: 'scale(1)' },
            },
         },
         animation: {
            bump: 'bump 0.2s ease-in-out',
         },
         colors: {
            main: '#0b0f12',
            gray: colors.trueGray,
            sister: '#080b0d',
            brother: '#040607',
            brotherLight: '#0D1214',
            sisterLight: '#111416',
            sisterLighter: '#292c2d',
            ...colors,
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
