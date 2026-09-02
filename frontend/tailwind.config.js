/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2c3e50',
        success: '#27ae60',
        danger: '#e74c3c',
        warning: '#f39c12',
        line: '#e5e5e5',
        ink: '#2c3e50',
        paper: '#ffffff',
        stone: '#7f8c8d',
        olive: '#27ae60',
        'olive-dark': '#229954',
      }
    },
  },
  plugins: [],
}
