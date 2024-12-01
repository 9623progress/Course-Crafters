/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Poppins", "sans-serif"], // Add your custom font
      },
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translate(0, 0)" }, // Start and end positions
        "50%": { transform: "translate(10px, -10px)" }, // Float diagonally
      },
    },
    animation: {
      float: "float 3s ease-in-out infinite", // Float animation with infinite loop
    },
  },
  plugins: [],
};
