/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Roboto', // <-- Roboto as default 
  'system-ui',
];


module.exports = {
  content:[
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bgBlue': '#9AB8BA',
        'darkGreen': '#045256'
      }
    },
    fontFamily: fontFamily,
  },
  plugins: [],
}