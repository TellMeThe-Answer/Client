/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"
            ,"./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      height: {
        '70%': '70%',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}