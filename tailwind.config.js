/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0px 0px 10px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}

