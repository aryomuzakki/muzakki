/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to left top, #041d34, #051a2d, #061626, #05121f, #020d18)",
        "gradient-primary-2":
          "linear-gradient(to left bottom, #041d34, #051a2d, #061626, #05121f, #020d18)",
        "gradient-primary-2/75":
          "linear-gradient(to left bottom, #041d34bf, #051a2dbf, #061626bf, #05121fbf, #020d18bf)",
      },
      colors: {
        primary: {
          50: "#E7F3FD",
          100: "#D4E9FC",
          200: "#A5D0F8",
          300: "#7ABAF5",
          400: "#50A3F2",
          500: "#238CEE",
          600: "#1071CC",
          700: "#0C5498",
          800: "#083763",
          900: "#041D34",
          950: "#020D18",
        },
      },
    },
  },
  prefix: "tw-",
  plugins: [require("daisyui")],
  daisyui: {
    prefix: "du-",
  },
};
