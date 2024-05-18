/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',

    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        "light-100": "#FFFFFF",
        "light-200": "#FFFAF1",
        "light-300": "#E1E1E6",
        "light-400": "#C4C4CC",
        "light-500": "#7C7C8A",
        "light-600": "#76797B",
        "light-700": "#4D585E",
        "dark-100": "#192227",
        "dark-200": "#0D1D25",
        "dark-300": "#0D161B",
        "dark-400": "#001119",
        "dark-500": "#00111A",
        "dark-600": "#000C12",
        "dark-700": "#000A0F",
        "dark-800": "#000204",
        "dark-900": "#00070A",
        "dark-1000": "#000405",
        "tint-tomato-100": "#AB4D55",
        "tint-tomato-200": "#AB222E",
        "tint-tomato-300": "#92000E",
        "tint-tomato-400": "#750310",
        "tint-mint-100": "#04D361",
        "tint-cake-100": "#82F3FF",
        "tint-cake-400": "#065E7C",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)']
      },
    },

    darkMode: "class",
    plugins: [nextui()]
  },
  plugins: [],
};
