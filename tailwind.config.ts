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
          blue: '#2563eb',   // Primary Brand Color (Blue-600)
          dark: '#1e3a8a',   // Darker shade for accents (Blue-900)
          orange: '#ea580c', // Secondary Action Color (Orange-600)
          light: '#eff6ff',  // Light Blue Background (Blue-50)
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
        'hero-gradient': 'linear-gradient(to right bottom, #020617, #0f172a, #14532d)', // Dark to Green fade
      },
      boxShadow: {
        modal: '0 20px 60px rgba(0,0,0,0.35)',
      }
    },
  },
  plugins: [],
};
export default config;

