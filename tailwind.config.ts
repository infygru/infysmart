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
        // Matches the "Infy" and "Solutions" orange
        brand: {
          orange: '#ea580c', // Primary Call-to-Action color
          light: '#fff7ed',  // Warm background tint
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

