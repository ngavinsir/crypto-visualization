const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        ibm: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: ["responsive", "hover", "focus", "group-hover", "disabled"],
  plugins: [],
};
