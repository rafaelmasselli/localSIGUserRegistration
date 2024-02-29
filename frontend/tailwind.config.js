/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        blue: {
          600: "#3482F6",
        },
      },
    },
  },
  plugins: [],
};
