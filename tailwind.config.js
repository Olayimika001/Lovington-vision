/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'earth': {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#64748b',
          500: '#94a3b8',
          400: '#cbd5e1'
        },
        'leaf-green': '#059669',
        'deep-forest': '#047857',
        'harvest-gold': '#f59e0b',
        'clay-terracotta': '#dc2626',
        'sky-blue': '#0ea5e9',
        'cream': '#ffffff',
        'sand': '#f1f5f9',
        'warm-white': '#f8fafc'
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
