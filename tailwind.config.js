/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Updated Brand Guidelines
        primary: {
          DEFAULT: "#135B3A", // Deep Green (Light Mode Secondary Text / Buttons)
          dark: "#011309",   // Green-Black (Dark Mode Background)
          light: "#E8F5E9",  // Very light tint (Optional)
        },
        secondary: {
          DEFAULT: "#D4AF37", // Gold (Legacy/Base)
          bronze: "#A37E2C", // Bronze (Dark Mode Accents)
          gold: "#F0B52E",   // Golden Yellow (Highlights)
        },
        brand: {
          black: "#011309", // Deep Green-Black (Light Mode Text)
          white: "#FFFFFF", // White (Dark Mode Text)
          cream: "#F9F9F7", // Soft Off-White (Light Mode Surface)
        },
        accent: "#1A1A1A",
        neutral: "#F5F5F0",
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
