/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              marginTop: '1rem',
              marginBottom: '0.75rem',
            },
            h3: {
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            p: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            ul: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
