/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#283890", blue2: "#1437b2", dark: "#002d6a",
          green: "#86be56", greenDark: "#6fa544",
          ink: "#333333", bg: "#f4f5f9", bg2: "#f8f8f8"
        }
      },
      fontFamily: { sans: ["Montserrat", "system-ui", "sans-serif"] },
      borderRadius: { pill: "60px", card: "16px", xl2: "24px" },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(40,56,144,0.18)",
        card: "0 4px 24px -8px rgba(40,56,144,0.12)"
      },
      maxWidth: { wrap: "1330px" }
    }
  },
  plugins: []
};
