module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: 'tw-',
    theme: {
      extend: {
        keyframes: {
          'slidein': {
            '0%': { transform: 'translateY(-100vh)' },
            '100%': { transform: 'translateY(0px)' }
          },
          'fadein': { 
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          },
          'loading': { 
            '0%': {
              'border-left-color': '#6504B5',
              transform: 'rotate(0)'
            },
            '25%': {
              'border-left-color': 'rgb(7 89 133)',
              transform: 'rotate(90deg)'
            },
            '50%': {
              'border-left-color': '#065f46',
              transform: 'rotate(180deg)'
            },
            '75%': {
              'border-left-color': 'rgb(7 89 133)',
              transform: 'rotate(270deg)'
            },
            '100%': {
              'border-left-color': '#6504B5',
              transform: 'rotate(360deg)'
            }
          }
        },
        animation: {
          slidein: 'slidein 1s ease-in-out',
          fadein: 'fadein 1s ease-in-out',
          loading: 'loading 1.5s linear infinite'
        }
      },
    },
    plugins: [],
    important:true,
  }