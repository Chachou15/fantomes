import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        encre: "#1B1A17",
        creme: "#F6F1E7",
        braise: "#D94B2B",
        sable: "#E9E1D0",
      },
      fontFamily: {
        titre: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
