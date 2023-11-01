/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionDelay: {
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
        5000: "5000ms",
      },
      zIndex: {
        preloader: 0,
        root: 1,
        bgImage: 2,
        shootingStars: 3,
        welcomeText: 4,
        fgImage: 5,
        aboutText: 6,
        hyperdrive: 7,
        spaceShip: 8,
        countdown: 9,
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
