import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AFA Energy Brand Colors
        primary: '#18625F',      // Forest Green
        accent: '#FFCB00',       // Yellow
        secondary: '#28AFB0',    // Turquoise
        muted: '#F5F5F5',        // Muted Background
        'text-dark': '#0b1f1e',  // Dark Text
        white: '#ffffff',
        border: '#E0E0E0',
      },
      borderRadius: {
        '4px': '4px',
        '12px': '12px',
      },
      fontFamily: {
        sans: ['Montserrat', 'Open Sans', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        '800': '800',
      },
      boxShadow: {
        'header': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'mobile': '-20px 0 60px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        '28': '28px',
      },
      maxWidth: {
        '1200': '1200px',
        '360': '360px',
      },
      opacity: {
        '85': '0.85',
        '92': '0.92',
        '95': '0.95',
      },
    },
  },
  plugins: [],
}

export default config
