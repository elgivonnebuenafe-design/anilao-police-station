/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        police: {
          dark: '#1e3a5f',
          blue: '#2563eb',
          light: '#3b82f6',
          accent: '#f59e0b'
        }
      }
    },
  },
  plugins: [],
}
