/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D589F',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
  },
}
