const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}"
],
  theme: {
    colors:{
      'fuchsia':'#e879f9',
      'hot-pink':'#FF69B4',
    },
    extend: {},
  },
  plugins: [],
});