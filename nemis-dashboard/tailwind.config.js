/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#002333',
        'primary-dark': '#001822',
        'nemis-green': '#011340',
        'nemis-red': '#7b0b0d',
        'light-gray': '#F4F6F8',
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,35,51,0.06)',
        'card-hover': '0 4px 16px 0 rgba(0,35,51,0.10)',
      },
    },
  },
  plugins: [],
}