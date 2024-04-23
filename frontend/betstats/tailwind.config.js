/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        red: '#E73725',
        lightGray: '#d6d6d6',
        darkGray: '#414141',
        almostBlack: '#272626',
        almostWhite: '#f3f3f3',
        white: '#fff',
      }
    },
  },
  plugins: [],
}

