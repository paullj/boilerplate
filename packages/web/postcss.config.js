const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.svelte', './public/**/*.html'],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const tailwind = require('tailwindcss');

const production = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: [tailwind, ...(production ? [purgecss] : [])],
};
