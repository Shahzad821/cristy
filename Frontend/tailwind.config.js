/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "10px",
          sm: "10px",
          md: "20px",
          lg: "2rem",
          xl: "2rem",
        },
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"],
      },
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(circle, rgba(63,215,251,1) 0%, rgba(222,112,134,1) 96%)",
      },
      backgroundColor: {
        background: "rgb(63, 215, 251)",
      },
      borderRadius: {
        "custom-radius": "41% 59% 76% 24% / 38% 30% 70% 62% ",
      },
    },
  },
  plugins: [],
};
