// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        gradient: "gradientMove 3s linear infinite",
      },
      keyframes: {
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
};
