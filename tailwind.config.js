/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.tsx",
    "./src/features/**/components/**/*.tsx",
    "./src/features/**/sections/**/*.tsx",
    "./src/features/**/banners/**/*.tsx",
    "./src/features/**/pages/**/*.tsx",
  ],
  dark: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
