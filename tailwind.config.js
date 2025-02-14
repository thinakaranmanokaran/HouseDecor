/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#151515", 
        red: "#ef5a6f", 

        lblue: "#cceeff",
        bblue: "#bdf0ff",
        yellow: "#bdf0ff",
        yellow: "#fff59e",
        violet: "#9e91ff",
        green: "#7dff90",
        rose: "#ffc9ed",
      },
    },
  },
  plugins: [],
};
