/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'homeBg': "url('/images/homeBg.png')"
      },
      fontFamily: {
        'main': ['"Amatic SC"'],
        'body': ['"Patrick Hand"']
      },
      colors: {
        'beige': '#F8F4E3',
        'warm-brown': '#5A3E2B',
        'pastel-blue': '#B4D3E7',
        'charcoal-gray': '#3C3C3B',
        'blush-pink': '#F2AFAF',
        'pastel-orange': '#E7C7A2',
        'pastel-green': '#A8C3A3',
        'golden-yellow': '#F7D488',
        'warm-gray': '#A8A19E'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

