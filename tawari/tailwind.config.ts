/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your Primary Brand Color (#00b5e8) expanded into a palette
        brand: {
          50: '#f0f9ff',  // Perfect for subtle backgrounds
          100: '#e0f2fe', // Perfect for active states/tags
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00b5e8', // <--- YOUR BASE COLOR
          600: '#0284c7', // Darker for hover
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // The Gradient Partner (Royal Blue)
        accent: {
          500: '#0062ff',
          600: '#004ecb', // Hover state for gradient end
        },
        // Text Colors
        text: {
          main: '#0f172a',  // Dark Navy (Use for H1, H2, Titles)
          muted: '#475569', // Slate Grey (Use for p, span, excerpts)
        }
      },
      backgroundImage: {
        // Ready-to-use gradient class: 'bg-brand-gradient'
        'brand-gradient': 'linear-gradient(135deg, #00b5e8 0%, #0062ff 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #0284c7 0%, #004ecb 100%)',
      }
    },
  },
  plugins: [],
};

