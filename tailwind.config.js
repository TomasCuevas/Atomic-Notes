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
        green: "#008f26",
        greenLight: "#00a82d",
        background: "#15202b",
        backgroundHover: "#1c2732",
        backgroundContrast: "#1e2732",
        backgroundContrastHover: "#252e38",
      },
      screens: {
        xxs: "363px",
        xs: "450px",
        mdx: "900px",
      },
    },
  },
  plugins: [],
};
