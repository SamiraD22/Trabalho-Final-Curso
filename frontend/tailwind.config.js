// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esta linha é crucial para escanear os seus ficheiros React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}