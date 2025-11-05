/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ff8800',      // main orange
        primaryDark: '#cc7000', // dark orange
        primaryDarker: '#994d00', // even darker orange
        dwPink: '#ff2a7a',
        dwPinkLight: '#ff4f8b',
        dwPurple: '#7c3aed',
        dwPurpleLight: '#a259ff',
        dwOrange: '#ffb700',
        dwWhiteGlass: 'rgba(255,255,255,0.7)',
      },
    },
  },
  plugins: [],
};
