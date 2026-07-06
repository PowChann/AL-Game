/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4A9FD4',
        primaryDark: '#1A6FB5',
        darkBg: '#F0F7FF',
        cardBg: '#FFFFFF',
        surface: '#FFFFFF',
        textMain: '#1A1A2E',
        textMuted: '#6B7280',
        accent: '#F5A623',
        success: '#2ECC71',
        danger: '#E74C3C',
        borderLight: '#E5E7EB',
      },
    },
  },
  plugins: [],
}