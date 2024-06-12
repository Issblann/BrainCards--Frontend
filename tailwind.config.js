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
    },

    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
});
