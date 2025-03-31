/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, white, white)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        reflection: "reflection 2.5s infinite linear",
      },
      keyframes: {
        reflection: {
          "0%": { transform: "translateX(-100%)", opacity: 0.3 },
          "50%": { opacity: 0.6 },
          "100%": { transform: "translateX(100%)", opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
};
