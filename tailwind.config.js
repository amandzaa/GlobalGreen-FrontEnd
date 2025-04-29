/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#2E8B57',
        'eco-light': '#90EE90',
        'eco-dark': '#006400',
      },
    },
  },
  plugins: [],
} 