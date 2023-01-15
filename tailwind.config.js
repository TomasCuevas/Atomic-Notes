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
        green: "#008f26",
        greenLight: "#00a82d",
      },
      screens: {
        xs: "560px",
      },
    },
  },
  plugins: [],
};
