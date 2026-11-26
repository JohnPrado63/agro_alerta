/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#173D2A',
        leaf: '#2F7D4C',
        mint: '#EAF4ED',
        cream: '#F7F8F4',
        amberrisk: '#E99A32',
      },
    },
  },
  plugins: [],
}
