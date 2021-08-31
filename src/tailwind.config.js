
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
      height: {
          'px114': '114px',
      },
    },
    variants: {
      extend: {
          display: ["group-hover"],
      },
    },
    plugins: [],
  }