/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        amber: { DEFAULT: '#f59e0b', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
        charcoal: { DEFAULT: '#1a1a2e', 900: '#1a1a2e' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
