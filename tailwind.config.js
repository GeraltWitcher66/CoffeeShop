/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,mdx}', './components/**/*.{js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0EA',
        'cream-dark': '#EDE4D8',
        brown: '#3E2723',
        'brown-light': '#6B4F43',
        caramel: '#C68B59',
        'caramel-dark': '#A9713F',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -24px rgba(62, 39, 35, 0.35)',
      },
    },
  },
  plugins: [],
};
