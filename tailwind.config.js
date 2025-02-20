/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js}',  // Include all .vue and .js files in pages
    './components/**/*.{vue,js}',  // Include all .vue and .js files in components
    './layouts/**/*.{vue,js}',  // Include all .vue and .js files in layouts
    './plugins/**/*.{js}',  // Include .js files in plugins (if any)
    './nuxt.config.{js,ts}'  // Include nuxt.config.js and nuxt.config.ts
  ],
  theme: {
    extend: {},
  },
  colors: {
    cadetblue: '#5F9EA0',
  },
  plugins: [],
}

