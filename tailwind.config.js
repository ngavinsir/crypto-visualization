module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.svelte", "./src/**/*.html"],
  theme: {
    extend: {},
  },
  variants: ["responsive", "hover", "focus", "group-hover", "disabled"],
  plugins: [],
};
