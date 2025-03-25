/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // Matches your src structure
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
        letterSpacing: {
          tighter: "-0.025em",
        },
      },
    },
    darkMode: "class",
    plugins: [],
};