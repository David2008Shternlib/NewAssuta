/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#283890", blue2: "#1437b2", dark: "#002d6a",
          green: "#86be56", greenDark: "#6fa544",
        },
        // Семантические токены (меняются по теме через CSS-переменные)
        page: "rgb(var(--page) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface2) / <alpha-value>)",
        body: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        title: "rgb(var(--title) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: { sans: ["Montserrat", "system-ui", "sans-serif"] },
      // btn — скругление кнопок и плиток из макета; pill оставлен для мелких
      // чипов вроде кода страны и переключателя языка.
      borderRadius: { pill: "60px", btn: "12px", card: "14px", xl2: "20px" },
      // Тени мягче и холоднее прежних: на светлом фоне прежние давали грязный
      // серый ореол под каждой карточкой.
      boxShadow: {
        soft: "0 18px 50px -24px rgba(19,48,107,0.22)",
        card: "0 2px 14px -6px rgba(19,48,107,0.14)",
        btn: "0 6px 18px -8px rgba(19,48,107,0.45)",
      },
      maxWidth: { wrap: "1330px" },
    },
  },
  plugins: [],
};
