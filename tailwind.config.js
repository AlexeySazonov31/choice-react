import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      animation: {
        'appear': 'appear 0.8s cubic-bezier(0.085, 0.900, 0.560, 1.225)',
        'modal-frame-appear': "modal-frame-appear .15s ease",
      },
      keyframes: {
        appear: {
          '0%, 65%': {
            transform: 'scale(3, 3)',
            opacity: "0",
          },
          '100%': {
            transform: 'scale(1, 1)',
            opacity: "1",
          },
        },
        'modal-frame-appear': {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}

