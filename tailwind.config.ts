import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unified Brand Colors
        brand: {
          blue: '#1e40af',   // blue-800 — authoritative navy replaces the old teal
          dark: '#1e3a8a',   // blue-900
          orange: '#ea580c', // keep orange as secondary
          light: '#eff6ff',  // blue-50
        },
        // Matches the "Smart" green
        accent: {
          green: '#14532d', // Deep Forest Green for headings/footers
          leaf: '#16a34a',  // Lighter green for icons/success states
        },
        dark: {
          900: '#020617', // Richer than standard black
          800: '#0f172a',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, #1e3a8a, #1d4ed8, #2563eb)',
      },
      boxShadow: {
        modal: '0 20px 60px rgba(0,0,0,0.35)',
      }
    },
  },
  plugins: [],
};
export default config;

