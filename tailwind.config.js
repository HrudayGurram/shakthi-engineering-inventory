/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: "var(--font-sans), sans-serif",
        mono: "var(--font-mono), monospace",
      },
      fontSize: {
        body1: "var(--text-body-1, 16px)",
      },
      lineHeight: {
        body1: "var(--line-height-body-1, 24px)",
      },
    },
  },
  plugins: [],
}
