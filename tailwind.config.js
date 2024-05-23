/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'appear': 'appear 0.4s ease-in',
      },
      keyframes: {
        appear: {
          '0%': {
            transform: 'scale(3, 3)',
            opacity: "0",
          },
          '100%': {
            transform: 'scale(1, 1)',
            opacity: "1",
          },
        }
      }
    },
  },
  plugins: [],
}

