/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A3728", // Deep Wood
        secondary: "#D4AF37", // Gold
        accent: "#1A1A1A", // Black/Charcoal
        neutral: "#F5F5F0", // Off-White
      },
      fontFamily: {
        serif: ["Inria Serif", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
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
      animation: {
        reflection: "reflection 2.5s infinite linear",
        "spin-slow": 'spin 20s linear infinite',
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
