/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0B1120',
        'surface': '#111827',
        'surface-elevated': '#1F2937',
        'accent-primary': '#F97316',
        'accent-secondary': '#06B6D4',
        'text-primary': '#F9FAFB',
        'text-muted': '#9CA3AF',
        'success': '#22C55E',
        'warning': '#EAB308',
        'danger': '#EF4444',
        'extreme-danger': '#991B1B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
