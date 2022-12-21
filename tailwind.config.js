module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#ffdd09",
        orange: "#fd9808",
        black: "#222233",
      },
      screens: {
        xs: "560px",
      },
    },
  },
  plugins: [],
};
