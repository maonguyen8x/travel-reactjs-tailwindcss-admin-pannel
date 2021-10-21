module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './src/app/utils/AutoComplete.utils.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        0: '0',
        20: '5rem',
        40: '10rem',
        80: '20rem',
        96: '24rem',
        120: '30rem',
        160: '40rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
};
