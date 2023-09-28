module.exports = {
  plugins: {
    'postcss-nesting': {}, // Place this before 'tailwindcss'
   'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
};