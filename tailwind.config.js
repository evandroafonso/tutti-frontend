/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Verde principal
          light: '#a7f3d0',  // Verde claro
          dark: '#065f46'     // Verde escuro
        },
        gray: {
          100: '#f3f4f6', // Fundo do conteúdo principal
          200: '#e5e7eb', // Bordas sutis
          500: '#6b7280', // Texto secundário
          600: '#4b5563', // Ícones e botões
          700: '#374151', // Texto principal
          800: '#1f2937', // Títulos
        },
        emerald: {
          500: '#10b981', // Botão principal
          700: '#047857', // Hover do botão
        },
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}
