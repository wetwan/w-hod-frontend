/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-2px 3px 5px 3px rgba(0, 0, 0, 0.3)'
      },
      screens:{
        'md': '820px'
      }
    },
  },
  plugins: [],
};
