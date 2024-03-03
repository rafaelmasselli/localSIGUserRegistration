/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: "387px",
        mine_mobile: "332px",
        table: "662px",
        "max-h-10": { raw: "(max-height: 684px)" },
        "max-h-5": { raw: "(max-height: 535px)" },
        "max-mobile": { raw: "(max-width: 387px)" },
        "max-mine_mobile": { raw: "(max-width: 332px)" },
        "max-table": { raw: "(max-width: 662px)" },
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
