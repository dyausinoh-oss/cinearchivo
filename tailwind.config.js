/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0a0a0c",
          900: "#111114",
          800: "#1a1a1f",
          700: "#26262e",
        },
        accent: {
          DEFAULT: "#2563eb", // azul eléctrico
          hover: "#3b82f6",
        },
      },
      boxShadow: {
        glow: "0 0 25px rgba(37, 99, 235, 0.35)",
      },
    },
  },
  plugins: [],
};
