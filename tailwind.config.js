/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        'screen-2rem': 'calc(100dvh - 2rem)',
        "screen-3rem": "calc(100dvh - 3rem)",
        "screen-4rem": "calc(100dvh - 4rem)",
        "screen-15rem": "calc(100dvh - 15rem)",
      },
      colors: {
        gray: {
          100: '#F2F2F2',
          150: '#E5E5E5',
          200: '#C4C4C4',
          250: '#9da3a7',
          300: '#8A8A8A',
          400: '#3e4143',
          500: '#2d2f31',
          550: '#1c1d1f',
          600: '#101112',
        },
        red: {
          100: '#fbece9',
          150: '#fbd5c4',
          200: '#fcbca0',
          250: '#ef8e70',
          300: '#f4522d',
          400: '#b32d0f',
          500: '#612012',
        },
        blue: {
          100: '#eeeffc',
          150: '#d8e0fb',
          200: '#c0c4fc',
          250: '#8072e6',
          300: '#5624d0',
          400: '#371783',
          500: '#180a3d',
        }
      },
      // custom font weight
      fontWeight: {
        'light': 300,
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
        'extrabold': 800,
        'black': 900,
      },
    },
  },
  plugins: [],
}
