const color = require('tailwindcss/colors')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark_red: '#ff3300',
        dark_green: '#56c596',
        light_green: '#e2f5ed',
        dark_orange: '#fb6c04',
        light_orange: '#fee7d6',
        dark_violet: '#2f2e41',
        light_violet: '#f9f7fe',
        black: '#181818',
        black_soft: '#222222',
        white: color.white,
        white_soft:'#f5f5f5'
      },
     fontFamily:{
       app_font: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
       'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', "Helvetica Neue",
       'sans-serif']
     } 
    },
  },
  plugins: [],
  corePlugins:{
    //preflight: true
  }
}
