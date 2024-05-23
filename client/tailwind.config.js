/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        Manrope: ["Manrope"]
      },
      colors: {
        text: '#deddf1',
        background: '#070714',
        primary: '#9d9be1',
        secondary: '#262287',
        accent: '#524cda',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.button': {
          '@apply bg-primary hover:bg-accent hover:text-text transition duration-300 text-secondary py-2 px-4 rounded-lg': {},
        },
      });
    },
  ],
}

