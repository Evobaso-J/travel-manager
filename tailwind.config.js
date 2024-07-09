/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,vue,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF2F7', // Lightest
          100: '#FCD4E4',
          200: '#F9A9C9',
          300: '#F67EAE',
          400: '#F35393',
          500: '#F85E9F', // Base color
          600: '#DF5590',
          700: '#C64C81',
          800: '#AD4372',
          900: '#943A63', // Darkest
        },
        secondary: {
          50: '#F3F9FB', // Lightest
          100: '#E0F7FD',
          200: '#B3EFFB',
          300: '#86E7F9',
          400: '#59DFF7',
          500: '#5EE1F8', // Base color
          600: '#4CC3D9',
          700: '#3AA5BA',
          800: '#28879B',
          900: '#16697C', // Darkest
        },
        tertiary: {
          50: '#F9F9F9', // Lightest
          100: '#fef9e7',
          200: '#FDF3CF',
          300: '#FCECB7',
          400: '#FBE59F',
          500: '#F8D75E', // Base color
          600: '#E0C054',
          700: '#C8A94A',
          800: '#B09240',
          900: '#987B36', // Darkest
        },
      },
    },
  },
  plugins: [],
}
