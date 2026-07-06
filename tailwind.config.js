/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        darkBg: '#0F0E17',
        cardBg: '#1A1929',
        surface: '#252438',
        textMain: '#FFFFFE',
        textMuted: '#A7A9BE',
        accent: '#FF8906',
        success: '#2CB67D',
        danger: '#FF4D6D',
      },
    },
  },
  plugins: [],
}