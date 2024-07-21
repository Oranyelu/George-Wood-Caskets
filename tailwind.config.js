/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '900px', // Custom breakpoint (ensure this fits your design needs)
        'md': '1200px', // Custom breakpoint
        'lg': '1500px', // Custom breakpoint
        'xl': '1700px', // Custom breakpoint
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #135B3A, #F0B52E)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
