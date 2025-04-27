/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#F5F5F5',
      },
      textColor: {
        black: '#353839',
      },
      colors: {
        lavender: {
          background: '#fbf8fc',
          100: '#f6eef9',
          200: '#efe0f4',
          300: '#e3c7eb',
          400: '#d0a2de',
          primary: '#be81cf',
          600: '#aa61bc',
          700: '#924ea2',
          80: '#7a4386',
          900: '#63376c',
          950: '#441f4c',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out'
      },
    },

    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
});
