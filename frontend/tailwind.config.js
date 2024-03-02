/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "387px",
        mine_mobile: "332px",
      },

      backgroundColor: {
        blue: {
          600: "#3482F6",
        },
      },
    },
  },
  plugins: [],
};
