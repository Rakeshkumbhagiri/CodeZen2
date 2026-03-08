/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
      logo: ['Orbitron', 'sans-serif'],
    },
      keyframes: {
        fadeZoom: {
          "0%": { opacity: "0", transform: "scale(0.8) translate(var(--x), var(--y))" },
          "100%": { opacity: "1", transform: "scale(1) translate(var(--x), var(--y))" },
        },
      },
      animation: {
        fadeZoom: "fadeZoom 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
