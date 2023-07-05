
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require("tailwindcss/colors");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[ './src/views/*/*.vue',
             './views/**/*.vue' ,

],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        'vtd-secondary': colors.gray, // Dark mode Datepicker color
    },
    },
  },
  plugins: [],
}

