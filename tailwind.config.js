/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#ecfdf3',
            100: '#d1fae1',
            200: '#a7f3c6',
            300: '#6ee7a4',
            400: '#34d37c',
            500: '#008744', // Logo primary green
            600: '#056839', // Logo deep emerald
            700: '#04522d',
            800: '#033b20',
            900: '#022414',
            950: '#01140b',
          },
          gold: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#e5a812', // Logo golden yellow
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
            950: '#422006',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 135, 68, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-gold': '0 4px 20px -2px rgba(229, 168, 18, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(5, 104, 57, 0.07), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 20px 40px -10px rgba(5, 104, 57, 0.16), 0 8px 16px -4px rgba(229, 168, 18, 0.12)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.4)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite'
      }
    },
  },
  plugins: [],
}
