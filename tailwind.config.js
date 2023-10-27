/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        preloader: 0,
        root: 1,
        bgImage: 2,
        shootingStars: 3,
        fgImage: 4,
      },
    },
  },
  plugins: [
    "postcss-import",
    "tailwindcss/nesting",
    "tailwindcss",
    "autoprefixer",
  ],
};
